---
title: System Catalogs
navigation:
  - system_catalogs_definitions
  - catalog_ref-functions

---

<a id="topic1"></a><a id="eu135496"></a>

This reference describes the WarehousePG cluster catalog tables and views. System tables prefixed with `gp_` relate to the parallel features of WarehousePG. Tables prefixed with `pg_` are either standard PostgreSQL system catalog tables supported in WarehousePG, or are related to features WarehousePG that provides to enhance PostgreSQL for data warehousing workloads. Note that the global system catalog for WarehousePG resides on the coordinator instance.

> **Caution** Changes to WarehousePG cluster catalog tables or views are not supported. If a catalog table or view is changedby the customer, the WarehousePG cluster is not supported. The cluster must be reinitialized and restored by the customer.

<a id="ul_lyl_np1_1q"></a>

-   [System Tables](catalog_ref-tables.md)
-   [System Views](catalog_ref-views.md)
-   [System Catalogs Definitions](system_catalogs_definitions/index.md)

**Parent topic:** [WarehousePG Reference Guide](../index.md)
