---
title: Installing Additional Supplied Modules

---

The WarehousePG distribution includes several PostgreSQL- and WarehousePG-sourced `contrib` modules that you have the option to install.

Each module is typically packaged as a WarehousePG extension. You must register these modules in each database in which you want to use it. For example, to register the `dblink` module in the database named `testdb`, use the command:

```
$ psql -d testdb -c 'CREATE EXTENSION dblink;'
```

To remove a module from a database, drop the associated extension. For example, to remove the `dblink` module from the `testdb` database:

```
$ psql -d testdb -c 'DROP EXTENSION dblink;'
```

> **Note** When you drop a module extension from a database, any user-defined function that you created in the database that references functions defined in the module will no longer work. If you created any database objects that use data types defined in the module, WarehousePG will notify you of these dependencies when you attempt to drop the module extension.

You can register the following modules in this manner:

| - [btree_gin](../ref_guide/modules/bundled/btree_gin.md)<br>- [citext](../ref_guide/modules/bundled/citext.md)<br>- [dblink](../ref_guide/modules/bundled/dblink.md)<br>- [diskquota](../ref_guide/modules/extensions/diskquota.md)<br>- [fuzzystrmatch](../ref_guide/modules/bundled/fuzzystrmatch.md)<br>- [gp_array_agg](../ref_guide/modules/bundled/gp_array_agg.md)<br>- [gp_check_functions](../ref_guide/modules/bundled/gp_check_functions.md)<br>- [gp_parallel_retrieve_cursor](../ref_guide/modules/bundled/gp_parallel_retrieve_cursor.md)<br>- [gp_percentile_agg](../ref_guide/modules/bundled/gp_percentile_agg.md)<br>- [gp_sparse_vector](../ref_guide/modules/bundled/gp_sparse_vector.md)<br>- [greenplum_fdw](../ref_guide/modules/bundled/greenplum_fdw.md)<br>- [hstore](../ref_guide/modules/bundled/hstore.md) | - [ip4r](../ref_guide/modules/bundled/ip4r.md)<br>- [ltree](../ref_guide/modules/bundled/ltree.md)<br>- [orafce](../ref_guide/modules/bundled/orafce_ref.md) (WarehousePG only)<br>- [pageinspect](../ref_guide/modules/bundled/pageinspect.md)<br>- [pg_trgm](../ref_guide/modules/bundled/pg_trgm.md)<br>- [pgcrypto](../ref_guide/modules/bundled/pgcrypto.md)<br>- [postgres_fdw](../ref_guide/modules/bundled/postgres_fdw.md)<br>- [postgresql-hll](../ref_guide/modules/extensions/postgresql-hll.md)<br>- [sslinfo](../ref_guide/modules/bundled/sslinfo.md)<br>- [tablefunc](../ref_guide/modules/bundled/tablefunc.md)<br>- [timestamp9](../ref_guide/modules/bundled/timestamp9.md)<br>- [uuid-ossp](../ref_guide/modules/bundled/uuid-ossp.md) |
| --- | --- |

For additional information about the modules supplied with WarehousePG, refer to [Additional Supplied Modules](../ref_guide/modules/index.md) in the *WarehousePG Reference Guide*.

**Parent topic:** [Installing and Upgrading WarehousePG](index.md)
