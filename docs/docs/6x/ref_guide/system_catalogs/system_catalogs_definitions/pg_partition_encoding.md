---
title: pg_partition_encoding

---

<a id="topic1"></a><a id="hb143896"></a>

The `pg_partition_encoding` system catalog table describes the available column compression options for a partition template.

| column             | type      | modifers | storage  | description |
| ------------------ | --------- | -------- | -------- | ----------- |
| `parencoid`        | oid       | not null | plain    |             |
| `parencattnum`     | snallint  | not null | plain    |             |
| `parencattoptions` | text \[ ] |          | extended |             |

**Parent topic:** [System Catalogs Definitions](index.md)
