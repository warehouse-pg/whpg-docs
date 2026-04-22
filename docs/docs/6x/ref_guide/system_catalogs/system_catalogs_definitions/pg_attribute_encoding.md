---
title: pg_attribute_encoding

---

<a id="topic1"></a><a id="gb143896"></a>

The `pg_attribute_encoding` system catalog table contains column storage information.

| column       | type      | modifers | storage  | description                            |
| ------------ | --------- | -------- | -------- | -------------------------------------- |
| `attrelid`   | oid       | not null | plain    | Foreign key to `pg_attribute.attrelid` |
| `attnum`     | smallint  | not null | plain    | Foreign key to `pg_attribute.attnum`   |
| `attoptions` | text \[ ] |          | extended | The options                            |

**Parent topic:** [System Catalogs Definitions](index.md)
