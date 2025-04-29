# System Catalogs 

This reference describes the WarehousePG Database system catalog tables, views, and functions. System tables prefixed with `gp_` relate to the parallel features of WarehousePG Database. Tables prefixed with `pg_` are either standard PostgreSQL system catalog tables supported in WarehousePG Database, or are related to features WarehousePG that provides to enhance PostgreSQL for data warehousing workloads. Note that the global system catalog for WarehousePG Database resides on the coordinator instance.

> **Caution** Changes to WarehousePG Database system catalog tables or views are not supported. If a catalog table or view is changedby the customer, the VMware WarehousePG cluster is not supported. The cluster must be reinitialized and restored by the customer.

-   [System Tables](catalog_ref-tables.html)
-   [System Views](catalog_ref-views.html)
-   [System Catalogs Definitions](catalog_ref-html.html)
-   [System Catalog Functions](catalog_ref-functions.html)

**Parent topic:** [WarehousePG Database Reference Guide](../ref_guide.html)

