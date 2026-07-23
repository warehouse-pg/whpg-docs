---
title: External components
description: Separately installed tools and frameworks that integrate with WarehousePG but are not database extensions.

---

These components are installed and managed independently from WarehousePG, and aren't activated with `CREATE EXTENSION`.

-   [WarehousePG Platform Extension Framework (PXF)](../../../install_guide/data_sci_pkgs/install_pxf.md) - Provides connectors for accessing data stored in external sources such as object storage and Hadoop.
-   whpg-backup - Provides parallel backup and restore for WarehousePG clusters.
-   whpg-backup-s3-plugin - Adds Amazon S3 support to whpg-backup.
