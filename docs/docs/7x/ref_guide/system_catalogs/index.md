---
title: System Catalogs
navigation:
  - catalog_ref-tables
  - catalog_ref-views
  - system_catalogs_definitions
  - catalog_ref-functions

---

This reference describes the WarehousePG cluster catalog tables, views, and functions. System tables prefixed with `gp_` relate to the parallel features of WarehousePG. Tables prefixed with `pg_` are either standard PostgreSQL system catalog tables supported in WarehousePG, or are related to features WarehousePG that provides to enhance PostgreSQL for data warehousing workloads. Note that the global system catalog for WarehousePG resides on the coordinator instance.

> **Caution** Changes to WarehousePG cluster catalog tables or views are not supported. If a catalog table or view is changedby the customer, the WarehousePG cluster is not supported. The cluster must be reinitialized and restored by the customer.

-   [System Tables](catalog_ref-tables.md)
-   [System Views](catalog_ref-views.md)
-   [System Catalogs Definitions](system_catalogs_definitions/index.md)
-   [System Catalog Functions](catalog_ref-functions.md)

**Parent topic:** [WarehousePG Reference Guide](../index.md)
