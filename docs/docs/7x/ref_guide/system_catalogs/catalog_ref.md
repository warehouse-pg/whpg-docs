# System Catalogs 

This reference describes the WarehousePG cluster catalog tables, views, and functions. System tables prefixed with `gp_` relate to the parallel features of WarehousePG. Tables prefixed with `pg_` are either standard PostgreSQL system catalog tables supported in WarehousePG, or are related to features WarehousePG that provides to enhance PostgreSQL for data warehousing workloads. Note that the global system catalog for WarehousePG resides on the coordinator instance.

> **Caution** Changes to WarehousePG cluster catalog tables or views are not supported. If a catalog table or view is changedby the customer, the WarehousePG cluster is not supported. The cluster must be reinitialized and restored by the customer.

-   [System Tables](catalog_ref-tables.html)
-   [System Views](catalog_ref-views.html)
-   [System Catalogs Definitions](catalog_ref-html.html)
-   [System Catalog Functions](catalog_ref-functions.html)

**Parent topic:** [WarehousePG Reference Guide](../ref_guide.html)

