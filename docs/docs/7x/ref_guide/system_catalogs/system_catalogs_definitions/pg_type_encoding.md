---
title: pg_type_encoding

---

The `pg_type_encoding` system catalog table contains the column storage type information.

| column       | type      | modifers | storage  | description                                    |
| ------------ | --------- | -------- | -------- | ---------------------------------------------- |
| `typeid`     | oid       | not null | plain    | Foreign key to [pg_attribute](pg_attribute.md) |
| `typoptions` | text \[ ] |          | extended | The actual options                             |

**Parent topic:** [System Catalogs Definitions](index.md)
