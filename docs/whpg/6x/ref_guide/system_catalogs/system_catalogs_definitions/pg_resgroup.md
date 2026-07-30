---
title: pg_resgroup

---

<a id="topic1"></a><a id="hi141670"></a>

> **Note** The `pg_resgroup` system catalog table is valid only when resource group-based resource management is active.

The `pg_resgroup` system catalog table contains information about WarehousePG resource groups, which are used for managing concurrent statements, CPU, and memory resources. This table, defined in the `pg_global` tablespace, is globally shared across all databases in the system.

| column    | type | references | description                      |
| --------- | ---- | ---------- | -------------------------------- |
| `rsgname` | name |            | The name of the resource group.  |
| `parent`  | oid  |            | Unused; reserved for future use. |

**Parent topic:** [System Catalogs Definitions](index.md)
