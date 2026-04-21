---
title: pg_inherits

---

The `pg_inherits` system catalog table records information about table and index inheritance hierarchies. There is one entry for each direct parent-child table or index relationship in the database. (Indirect inheritance can be determined by following chains of entries.)

In WarehousePG, inheritance relationships are created by both the `INHERITS` clause (standalone inheritance) and the `PARTITION BY` clause (partitioned child table inheritance) of `CREATE TABLE`.

| column      | type    | references                  | description                                                                                                                                                                                                                                                                                          |
| ----------- | ------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inhrelid`  | oid     | [pg_class](pg_class.md).oid | The object identifier of the child table.                                                                                                                                                                                                                                                            |
| `inhparent` | oid     | [pg_class](pg_class.md).oid | The object identifier of the parent table.                                                                                                                                                                                                                                                           |
| `inhseqno`  | integer |                             | If there is more than one direct parent for a child table (multiple inheritance), this number tells the order in which the inherited columns are to be arranged. The count starts at 1.  Indexes can not have multiple inheritance, since they can only inherit when using declarative partitioning. |

**Parent topic:** [System Catalogs Definitions](index.md)
