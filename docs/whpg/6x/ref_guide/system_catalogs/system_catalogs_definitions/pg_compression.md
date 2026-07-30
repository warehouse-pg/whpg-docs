---
title: pg_compression

---

<a id="topic1"></a><a id="gg143896"></a>

The `pg_compression` system catalog table describes the compression methods available.

| column             | type    | modifers | storage | description                       |
| ------------------ | ------- | -------- | ------- | --------------------------------- |
| `compname`         | name    | not null | plain   | Name of the compression           |
| `compconstructor`  | regproc | not null | plain   | Name of compression constructor   |
| `compdestructor`   | regproc | not null | plain   | Name of compression destructor    |
| `compcompressor`   | regproc | not null | plain   | Name of the compressor            |
| `compdecompressor` | regproc | not null | plain   | Name of the decompressor          |
| `compvalidator`    | regproc | not null | plain   | Name of the compression validator |
| `compowner`        | oid     | not null | plain   | oid from pg_authid                |

**Parent topic:** [System Catalogs Definitions](index.md)
