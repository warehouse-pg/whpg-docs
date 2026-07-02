---
title: pg_partman

---

The `pg_partman` extension provides partition management for WarehousePG. Use it to create and maintain time-based, range-based, and list-based table partition sets.

## Installing pg_partman

Download and install the `pg_partman` package. See [Installing Additional Modules](../../../install_guide/additional_modules/index.md) for details.

After installing, register the extension in each database where you want to use it:

```sql
CREATE EXTENSION pg_partman;
```
