---
title: WarehousePG Backup and Restore
navTitle: WarehousePG Backup and Restore
description: Back up and restore WarehousePG tables in parallel with whpg-backup.

---

Use WarehousePG Backup and Restore (`whpg-backup`) to create and restore logical backups of your WarehousePG tables in parallel. By default, backups are written to local disk on the coordinator and segment hosts, though you can consolidate them in a shared directory or write them directly to S3-compatible storage. `whpg-backup` writes the metadata and DDL for a backup to the coordinator host, while each segment writes its own table data to CSV files, so backup and restore performance scales with your cluster.

## Key capabilities

- Parallel backup and restore across the coordinator and all segment hosts
- Full database backups, plus [incremental backups](incremental.md) that include every heap table but back up append-optimized tables only if they changed
- [Filtering](using.md#filtering-backups-and-restores) backups and restores by schema, table, or leaf partition
- [Email notifications](using.md#setting-up-email-alerts) when a backup or restore completes
- Backing up directly to [Amazon S3 or S3-compatible storage](s3-plugin.md)
