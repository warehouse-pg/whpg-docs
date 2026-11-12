---
title: PostgreSQL Application Compatibility

---

Account for the distributed nature of WarehousePG when you connect PostgreSQL clients and drivers, such as pgJDBC and psqlODBC, to it. As a massively parallel processing (MPP) system, WarehousePG changes the behavior of some PostgreSQL features and doesn't support others. Each difference has a workaround. For complete SQL support, see [Summary of WarehousePG Features](../../../ref_guide/misc/feature_summary.md). For connection details, see [Using JDBC and ODBC Drivers](using-jdbc-and-odbc-drivers.md).

## Queries and Results

### Row Order

Each segment returns its rows independently, so a query without an `ORDER BY` clause returns rows in no fixed order, and the order can change between runs. Add `ORDER BY` wherever the order matters. See [Ordering Results](using-jdbc-and-odbc-drivers.md#ordering-results).

### Writable CTEs

A data-modifying statement whose `WITH` clause is also data-modifying, such as `WITH x AS (INSERT ... RETURNING ...) INSERT ...`, fails with `writable CTE queries cannot be themselves writable`. Use a data-modifying `WITH` clause only under a `SELECT`, or run the statements separately. See [WITH Queries (Common Table Expressions)](../../query/CTE-query.md).

### Sequence Functions

The `currval()` function fails with `currval() not supported`, and `lastval()` isn't supported either. A driver or application that reads a generated key with them fails. Use `INSERT ... RETURNING` instead. In JDBC, `getGeneratedKeys` works with it.

### Error Details

In releases earlier than WarehousePG 6.27.8, errors raised on a segment, which includes most constraint violations on `INSERT` and `UPDATE`, reach the driver without the schema, table, column, data type, and constraint name fields. For example, `getConstraint` on the JDBC `ServerErrorMessage` returns `null`. Upgrade to WarehousePG 6.27.8 or later, or read the error message text instead of the detail fields.

### LIKE Patterns That End with the Escape Character

A catalog lookup with a `LIKE` pattern that ends with the escape character, such as `getTables` with the pattern `a\` in JDBC, fails with `LIKE pattern must not end with escape character`. Don't end a pattern with the escape character.

## Tables and Constraints

### Multiple Unique Keys

Creating a table fails with `UNIQUE or PRIMARY KEY definitions are incompatible with each other` when the table has several `UNIQUE` or `PRIMARY KEY` constraints that have no column in common. Every such constraint must also include all the columns of the distribution key. Give all the constraints a column in common, and include the distribution key columns. See [Creating and Managing Tables](../../ddl/ddl-table.md).

### Foreign Keys

WarehousePG accepts foreign key constraints but doesn't enforce them, so a row that violates the constraint is accepted. Enforce referential integrity in the application or in the load process.

### Large Objects

The large object APIs, such as `LargeObjectManager` in JDBC, fail with `large objects are not supported`. In ODBC, creating a large object fails with an error such as `Couldn't create (in-line) large object`. Store binary data in `bytea` columns and text in `text` columns instead.

### Exclusion Constraints

Creating a table with an exclusion constraint fails with `GPDB does not support exclusion constraints`. Use another constraint type, or use WarehousePG 7, which supports them.

## Transactions

### Isolation Level

A transaction that requests `SERIALIZABLE` runs as `REPEATABLE READ`, and drivers report `REPEATABLE READ`. Don't rely on serializable behavior. See [Inserting, Updating, and Deleting Data](../../dml.md).

### Prepared Transactions and XA

`PREPARE TRANSACTION` fails with `PREPARE TRANSACTION is not yet supported in Greenplum Database`, so `XADataSource` and other XA transaction managers can't use WarehousePG. Use local transactions instead.

## Cursors

### Backward Cursor Scans

Moving backward on a server-side cursor fails with `backward scan is not supported`. Read cursors forward only.

### ODBC Keyset Cursors

Some keyset-cursor operations fail with `function currtid2 is not supported by GPDB`. Avoid keyset-cursor operations.

### Positioned and Bulk Updates and Deletes in ODBC

ODBC positioned and bulk operations, which are `SQLSetPos` and `SQLBulkOperations` with the update or delete options, identify rows by their `ctid`. A `ctid` identifies a row only within one segment, so WarehousePG requires the `gp_segment_id` column alongside it.

- Updates fail because WarehousePG rejects the statement with an error that says the `ctid` column is used without the necessary companion column `gp_segment_id`.
- Deletes can remove more rows than requested because, when the ORCA optimizer plans the statement, WarehousePG doesn't reject it and the statement deletes the row with that `ctid` on every segment.

:::tip Important
Don't use `SQLSetPos` or `SQLBulkOperations` to delete rows in WarehousePG. In autocommit mode, which is the ODBC default, the extra rows are already deleted when the call reports an error.
:::

If an application can't avoid these calls, turn off ORCA for its sessions by adding `SET optimizer=off` to the connection settings, for example with the `ConnSettings` DSN option in psqlODBC. The Postgres-based planner then rejects the delete with an error and no rows are removed. Otherwise, run explicit `UPDATE` and `DELETE` statements with a `WHERE` clause on the primary key.

### Refcursors and Resource Queues

In releases earlier than WarehousePG 6.27.8, fetching from a refcursor that a `STABLE` function opens through a named portal, for example in JDBC with a fetch size, can fail with `duplicate portal id` and a resource queue error. The failed statements don't release their resource queue slots. When the role holds all the slots of its queue, every later statement by that role waits indefinitely.

:::tip Important
On a release earlier than 6.27.8, declare such functions `VOLATILE`, or call them without a fetch size.
:::

## Server Features

### System Catalog Updates

`INSERT`, `UPDATE`, and `DELETE` statements on system catalog tables are rejected unless the `allow_system_table_mods` configuration parameter is set. Use DDL commands to change database objects instead.

### Replication

The replication API of the driver doesn't work. Logical replication, which includes publications, subscriptions, and logical decoding, isn't supported, and replication slots are reserved for the management tools. A slot that a client creates covers only the coordinator. Don't use the replication API of the driver.

**Parent topic:** [Accessing the Database](index.md)
