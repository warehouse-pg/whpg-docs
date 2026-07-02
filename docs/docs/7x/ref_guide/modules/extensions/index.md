---
title: Extensions
description: Open source extensions for WarehousePG that require a separate package install on each host.
navigation:
  - diskquota
  - pg_partman
  - postgresql-hll

---

These extensions require installing a package on each host in your cluster before you can enable them with `CREATE EXTENSION`. See [Installing Additional Modules](../../../install_guide/additional_modules/index.md) for installation steps.

-   [diskquota](diskquota.md) - Allows administrators to set disk usage quotas for WarehousePG roles and schemas.
-   [MADlib](../../../admin_guide/analytics/madlib.md) - Provides machine learning and deep learning functions, including feature engineering, model training, evaluation, and scoring.
-   [pg_partman](pg_partman.md) - Provides partition management for creating and maintaining time-based, range-based, and list-based table partition sets.
-   pgsphere - Provides spherical data types and operators for astronomical data.
-   pgvector - Provides vector similarity search capabilities for storing and querying machine learning embeddings.
-   [PostGIS](../../../admin_guide/analytics/postGIS.md) - Provides spatial and geographic data types, indexes, and functions for WarehousePG.
-   [postgresql-hll](postgresql-hll.md) - Provides HyperLogLog data types for approximate distinct counting.
-   q3c - Provides spherical indexing for astronomical catalogues.
