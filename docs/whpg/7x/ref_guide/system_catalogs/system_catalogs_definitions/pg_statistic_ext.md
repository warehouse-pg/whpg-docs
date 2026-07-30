---
title: pg_statistic_ext

---

The `pg_statistic_ext` system catalog table holds definitions of extended planner statistics. Each row in this catalog corresponds to a *statistics object* created with [CREATE STATISTICS](../../sql_commands/CREATE_STATISTICS.md).

| column         | type       | references                           | description                                                                                                                                                                                                 |                                                                             |
| -------------- | ---------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `oid`          | oid        |                                      | The object ID                                                                                                                                                                                               |                                                                             |
| `stxrelid`     | oid        | [pg_class](pg_class.md).oid          | The table containing the columns described by this object                                                                                                                                                   |                                                                             |
| `stxname`      | name       |                                      | The name of the statistics object                                                                                                                                                                           |                                                                             |
| `stxnamespace` | oid        | [pg_namespace](pg_namespace.md).oid  |                                                                                                                                                                                                             | The object identifier of the namespace that contains this statistics object |
| `stxowner`     | oid        | [pg_authid](pg_authid.md).oid        | The owner of the statistics object                                                                                                                                                                          |                                                                             |
| `stxkeys`      | int2vector | [pg_attribute](pg_attribute.md).oid  | An array of attribute numbers, indicating which table columns are covered by this statistics object; for example, a value of `1 3` would mean that the first and the third table columns are covered        |                                                                             |
| `stxkind`      | char\[]    |                                      | An array containing codes for the enabled statistics kinds; valid values are: `d` for n-distinct statistics, `f` for functional dependency statistics, and `m` for most common values (MCV) list statistics |                                                                             |

The `pg_statistic_ext` entry is filled in completely during `CREATE STATISTICS`, but the actual statistical values are not computed then. Subsequent `ANALYZE` commands compute the desired values and populate an entry in the [pg_statistic_ext_data](pg_statistic_ext_data.md) catalog.

**Parent topic:** [System Catalogs Definitions](index.md)
