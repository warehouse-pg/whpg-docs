# Upgrading from WarehousePG 6 to WarehousePG 7
---

This topic walks you through upgrading from WarehousePG 6 to WarehousePG 7.

>**WARNING**
>There are a substantial number of changes between WarehousePG 6 and WarehousePG 7 that could potentially affect your existing application when you move to WarehousePG 7. Before going any further, familiarize yourself with all of these changes [Important Changes between WHPG 6 and WHPG 7](./6x_7x_changes.html).

>**Note**
>You cannot upgrade to WarehousePG 7.0.0 using the `gpupgrade` utility.

## <a id="preparing"></a>Preparing to Upgrade

To prepare for upgrading from WarehousePG 6 to WarehousePG 7:

- Read carefully through [Important Changes between WHPG 6 and WHPG 7](./6x_7x_changes.html) to identify changes you may need to make in your application before upgrading to WarehousePG 7.

- Before using `gpbackup`/`gprestore` to move your data, read carefully through [Backup and Restore Caveats](#br-caveats) to avert problems that can arise.  

## <a id="steps"></a>Steps to Upgrade

Follow the steps in this section to upgrade from WarehousePG 6 to WarehousePG 7.

When upgrading,  the `gpbackup/gprestore` utilities are the recomended tools for data loading.

### <a id="steps_br"></a>Steps to Upgrade Using Backup/Restore

Review [Backup and Restore Caveats](#br-caveats) before starting the upgrade.

To upgrade while moving data using `gpbackup/gprestore`:

1. If not already installed, install the latest release of the WarehousePG Backup and Restore utilities

2. Run the `gpbackup` utility to back up the data from your WarehousePG 6 cluster to an external data storage location, such as mounted directories, cloud storage, or Data Domain.

3. Initalize a WarehousePG 7 cluster on the destination hardware, by issuing the [`gpinitsystem` command](../utility_guide/ref/gpinitsystem.html).

4. Install any external modules used in your WarehousePG 6 system in the WarehousePG 7 system before you restore the backup, for example MADlib or PostGIS. If versions of the external modules are not compatible, you may need to exclude tables that reference them when restoring the WarehousePG 6 backup to WarehousePG 7.

5. Run the `gprestore` utility to restore your data to the WarehousePG 7 cluster from the external data storage location. 


## <a id="completing"></a>Completing the Upgrade

Migrate any tables you skipped during the restore using other methods, for example using the `COPY TO` command to create an external file and then loading the data from the external file into WarehousePG 6 with the `COPY FROM` command.

Recreate any objects you dropped in the WarehousePG 6 database to enable migration, such as external tables, indexes, user-defined functions, or user-defined aggregates.

After migrating data you may need to modify SQL scripts, administration scripts, and user-defined functions as necessary to account for changes in WarehousePG version 7. Review the WarehousePG Release Notes and [Important Changes between WHPG 6 and WHPG 7](./6x_7x_changes.html) for features and changes that may necessitate post-migration tasks.

## <a id="br-caveats"></a>Backup and Restore Caveats

There are a number of caveats with respect to backing up and restoring your data as part of upgrading from WarehousePG 6 to WarehousePG 7.

- Before you do an actual backup, use `gpbackup` to create a `--metadata-only` backup from the source WarehousePG and restore it to the WarehousePG 7 system. Review the `gprestore` log file for error messages and correct any remaining problems in the source WarehousePG.

- If you intend to install WarehousePG 7 on the same hardware as your 6 system, you will need enough disk space to accommodate over five times the original data set (two full copies of the primary and mirror data sets, plus the original backup data in ASCII format) in order to migrate data with `gpbackup` and `gprestore`. Keep in mind that the ASCII backup data will require more disk space than the original data, which may be stored in compressed binary format. Offline backup solutions such as Dell PowerProtect (Data Domain) can reduce the required disk space on each host. 

    If you do not have the disk space, then:

    - Run `gpbackup` on your WarehousePG 6 cluster to back up your data
    - Run `gpdeletesystem` to remove the existing WarehousePG 6 cluster
    - Proceed with initializing the new cluster, as described above

- When restoring language-based user-defined functions, the shared object file must be in the location specified in the `CREATE FUNCTION` SQL command and must have been recompiled on the WarehousePG 7 system. This applies to user-defined functions, user-defined types, and any other objects that use custom functions, such as aggregates created with the `CREATE AGGREGATE` command.

- `gpbackup` saves the distribution policy and distribution key for each table in the backup so that data can be restored to the same segment. If a table's distribution key in the WarehousePG 6 database is incompatible with WarehousePG 7, `gprestore` cannot restore the table to the correct segment in the WarehousePG 6 database. This can happen if the distribution key in the older WarehousePG release has columns with data types not allowed in WarehousePG 7 distribution keys, or if the data representation for data types has changed or is insufficient for WarehousePG 7 to generate the same hash value for a distribution key. You should correct these kinds of problems by altering distribution keys in the tables before you back up the WarehousePG.

**Parent topic:** [Installing and Upgrading WarehousePG](install_guide/)