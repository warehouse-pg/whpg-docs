# Incremental Backups using `gpbackup` and `gprestore`


:::tip Associated Topics
- [gpbackup & gprestore user guide](/docs/7x/admin_guide/backup_restore/gpbackup_gprestore.html)
- [gpbackup syntax reference](/docs/7x/utility_guide/ref/gpbackup.html)
- [gprestore syntax reference](/docs/7x/utility_guide/ref/gprestore.html) 
:::





The [gpbackup](/docs/7x/utility_guide/ref/gpbackup.html) and [gprestore](/docs/7x/utility_guide/ref/gprestore.html) utilities support creating
incremental backups of append-optimized tables and restoring from incremental backups. An
incremental backup backs up all specified heap tables and backs up append-optimized tables
(including append-optimized, column-oriented tables) only if the tables have changed.

For example, if a row of an append-optimized table has changed, the table is backed up. For
partitioned append-optimized tables, only the changed leaf partitions are backed up. 


Incremental backups are efficient when the total amount of data in append-optimized tables or
table partitions that changed is small compared to the data that has not changed since the
last backup.


An incremental backup backs up an append-optimized table only if one of the following
operations was performed on the table after the last full or incremental backup:

- `ALTER TABLE`
- `DELETE`
- `INSERT`
- `TRUNCATE`
- `UPDATE`
- `DROP` and then re-create the table


Restoring data from incremental backups requires a complete incremental backup file set.


## <a id="incra_sets"></a>Understanding Incremental Backup Sets


An incremental backup set includes the following backups:

- A full backup. This is the full backup that the incremental backups are based on. 
- The set of incremental backups that capture the changes to the database from the time
of the full backup.



For example, you can create a full backup (Sunday) and then create three daily incremental backups(Monday, Wednesday, Friday).
The full backup and all three incremental backups are the backup set. 

:::tip Incremental Backup Set
- Full: Sunday
- Incremental: Monday
- Incremental: Wednesday
- Incremental: Friday
::: 

When you create or add to an incremental backup set, `gpbackup` ensures that the backups in the set are created with a consistent set of backup options to ensure that
the backup set can be used in a restore operation. 


When you create an incremental backup you include these options with the other
`gpbackup` options to create a backup:

##### `--leaf-partition-data`
- Required for all backups in the incremental backup set.
- Required when you create a full backup that will be the base backup for an
incremental backup set.

##### `--incremental`
- Required when you create an incremental backup.

:::tip Note
`--data-only` and `--metadata-only` are not compatible with the `--incremental` option
:::


##### `--from-timestamp` 
- Optional. This option can be used with `--incremental`. The timestamp you specify if of an existing backup. The
timestamp can be either an incremental backup or the initial full backup of the set. 

The backup being created
must be have the same command line options as the with the backup specified with the `--from-timestamp`
option.

If you do not specify `--from-timestamp`, `gpbackup` attempts to find a compatible backup based on information
in the `gpbackup` history database. 


When you add an incremental backup to a backup set, `gpbackup` ensures that
the full backup and the incremental backups are consistent by checking these
`gpbackup` options:

##### `--dbname` - The database must be the same.

#####  `--backup-dir` - The directory must be the same. The backup set, the
full backup and the incremental backups, must be in the same location.

##### `--single-data-file` - This option must be either specified or absent
for all backups in the set.

##### `--plugin-config` - If this option is specified, it must be specified
for all backups in the backup set. The configuration must reference the same plugin
binary.

##### `--include-table-file`, `--include-schema`, or any other
options that filter tables and schemas must be the same. 


**When checking schema filters**, only the schema names are checked, not the objects contained in the
schemas.

##### `--no-compression` - If this option is specified, it must be specified
for all backups in the backup set. 

If compression is used on the on the full backup,
compression must be used on the incremental backups. Different compression levels are
allowed for the backups in the backup set. For a backup, the default is compression
level 1.

:::warning
If you try to add an `--incremental` backup to a backup set, the backup operation fails if the
`gpbackup` command line options options are not consistent.
:::

:::tip Associated Topics
- [gpbackup & gprestore user guide](7x/admin_guide/backup_restore/gpbackup_gprestore.html)
- [gpbackup syntax reference](7x/utility_guide/ref/gpbackup.html)
- [gprestore syntax reference](7x/utility_guide/ref/gprestore.html) 
:::

## <a id="examples"></a>Examples

The following example shows a backup strategy using weekly Full + daily Incremental backups.



The following command creates the first full backup of the backup set: 

**Sunday**
```
$ gpbackup --dbname ww_sales --backup-dir /nfsmount/whpg_backups/ww_sales --leaf-partition-data
```

Resulting in the example backup set

`20250518010000 (full backup, Sunday 1am)`


:::tip
Each backup has a timestamp taken when the backup is created, and is used in the naming of the backup set files.

`YYYYMMDDhhmmss` is the format. 

For example, a backup on May 18,2025 at 1:00:00am local time, the backup file names contain
`20250527` for the day and `010000` representing 1:00:00am. 


Resulting in a naming convention of `20250518010000` for the backup file set


When you specify the `--backup-dir` option, the backups are created in the corresponding directory on each WarehousePG host, `/nfsmount/whpg_backups/ww_sales` in this example.

:::


The next backup will be an incremental backup, based on the full backup above

**Monday**
```
$ gpbackup --dbname ww_sales --incremental --backup-dir /nfsmount/whpg_backups/ww_sales --leaf-partition-data 
```

Resulting in a second backup belonging to the backup set. 

```
20250518010000 (full backup, Sunday 1am)
20250519020000 (incremental backup, Monday 2am)
```

Subsequent backups are run on 
- **Tuesday**
- **Wednesday**
- **Thursday** 
- **Friday**
- **Saturday** 

**resulting in this complete set.**

```
20250518010000 (full backup, Sunday 1am)
20250519020000 (incremental backup, Monday 2am)
20250520030000 (incremental backup, Tuesday 3am)
20250521040000 (incremental backup, Wedndesday 4am)
20250522050000 (incremental backup, Thursday 5am)
20250523060000 (incremental backup, Friday 6am)
20250524070000 (incremental backup, Saturday 7am)
```


## Full vs Incremental Backup Strategy

The advantage of Full backups is that they contain every object in the database, allowing for a simple restore (filtered, or complete).  One disadvantage may be the size & duration of this backup. 

Incremental backups decrease the time and volume of data backed up, but they will backup `HEAP` tables every time.  To mitigate this, using a partitioned `AO/CO` table approach will greatly reduce incremental backups to only those partitions which have seen changes since the previous backup. 

Given the Sunday-Saturday example above, the user has a choice of how to handle the next round of backups. 


## Weekly Full Backup + Incrementals Example

The user / DBA may choose to run a full backup again on Sunday (no `--incremental` flag)


```
$ gpbackup --dbname ww_sales --backup-dir /nfsmount/whpg_backups/ww_sales --leaf-partition-data 
```

Resulting in a new full backup.  
```
20250518010000 (full backup, Sunday 1am)
20250519020000 (incremental backup, Monday 2am)
20250520030000 (incremental backup, Tuesday 3am)
20250521040000 (incremental backup, Wedndesday 4am)
20250522050000 (incremental backup, Thursday 5am)
20250523060000 (incremental backup, Friday 6am)
20250524070000 (incremental backup, Saturday 7am)
20250525010000 (full backup, Sunday 1am)
```

The choice then could be made to retain the prior seven backups, or purge the data to convserve disk space.




## Aggregated Incrementals Example using --from-timestamp

An alternative approach would be to take an incremental backup on the next Sunday using `--from-timestamp`  which creates a single incremental backup set from the basis of the initial full backup on the previous Sunday.

For example: 

```
$ gpbackup --dbname ww_sales --incremental --from-timestamp 20250518010000 --backup-dir /nfsmount/whpg_backups/ww_sales --leaf-partition-data 
```

Resulting in the following backup sets

```
20250518010000 (full backup, Sunday 1am)
20250519020000 (incremental backup, Monday 2am)
20250520030000 (incremental backup, Tuesday 3am)
20250521040000 (incremental backup, Wedndesday 4am)
20250522050000 (incremental backup, Thursday 5am)
20250523060000 (incremental backup, Friday 6am)
20250524070000 (incremental backup, Saturday 7am)
20250525010000 (incremental backup, Sunday 1am)
```

While this last backup was incremental, it was incremental from the last full backup's timestamp.  
This means all the previous incremental backup sets are now redundant, and not required.

:::tip redundant backup sets
These backup sets can now be deleted to reclaim storage space 
```
20250519020000 (incremental backup, Monday 2am)
20250520030000 (incremental backup, Tuesday 3am)
20250521040000 (incremental backup, Wedndesday 4am)
20250522050000 (incremental backup, Thursday 5am)
20250523060000 (incremental backup, Friday 6am)
20250524070000 (incremental backup, Saturday 7am)
```
:::

Resulting in the following two backups covering the entire week

```
20250518010000 (full backup, Sunday 1am)
20250525010000 (incremental backup, Sunday 1am)
```


## <a id="restoring"></a>Restoring Incremental Backup Sets

Based on the previous examples of full and incremental backups

```
20250518010000 (full backup, Sunday 1am)
20250519020000 (incremental backup, Monday 2am)
20250520030000 (incremental backup, Tuesday 3am)
20250521040000 (incremental backup, Wedndesday 4am)
20250522050000 (incremental backup, Thursday 5am)
20250523060000 (incremental backup, Friday 6am)
20250524070000 (incremental backup, Saturday 7am)
```

The following `gprestore` command specifies the timestamp `20250521040000` (Wednesday) as the restore to point. 

```
$ gprestore --timestamp 20250521040000 --redirect-db www_sales_pitr --create-db
```

The incremental backup with the timestamps 
- `20250520030000` (Tuesday)
-  `20250519020000` (Monday) 

And the full backup 
- `20250518010000` (Sunday) 

**must be available to perform a succesful restore.**


## <a id="notes"></a>Tips & Notes

:::tip Choices
- The amount of backups (full or incremental) retained is a choice for each user.  Some enterprises may have regulatory requirements to keep `x of days` of backups. 


- `RPO` (Recovery Point Objective)  1 day, 1 week, 1 month for example, may play a role in how you develop your backup strategy. 

- Using `--incremental` backups, effective partitioning of `AO/CO` tables, and the use of the `--include` and `--exclude` table and schema filters, allow for a flexible and performant approach to your backup strategy.
:::





To create an incremental backup, or to restore data from an incremental backup set, you
need the complete backup set. When you archive incremental backups, the complete backup
set must be archived. You must archive all the files created on the master and all
segments. 

Each time `gpbackup` runs, the utility adds backup information to the
backup history database `gpbackup_history.db` located in the WarehousePG `$COORDINATORY_DATA_DIRECTORY`.
This sqlite database contains metadata details of the backup set, such as timestamp, flags used, object contents.
To bypass the inserting of this metadata into the history database, the `--no-history` flag can be included in your `gpbakcup` command. 

When using the `--incremental` flag without the `--from-timestamp` option,  `gpbackup` will attempt to find the most recent backup with the same command line options, in the `gpbackup_history.db`. If `gpbackup` cannot find a backup with a consistent
set of options, `gpbackup` displays a warning indicating a full backup must be created before an incremental can be created. 

When using the `--from-timestamp` option with `--incremental`, `gpbackup` ensures that the command line options of the current backup match the options of the previously created incremental backup with the specified timestamp.

The `gpbackup` option `--with-stats` is not required to be the same for all backups in the backup set. However, to perform a restore operation with
the `gprestore` option `--with-stats` to restore statistics, the backup you specify must have must have used the `--with-stats` when
taking the backup. 

Restore operations can be performed from any backup in the backup set. However, changes
captured in incremental backups later than the backup use to restore database data will
not be restored.

When restoring from an incremental backup set, `gprestore` checks the
backups and restores each append-optimized table from the most recent version of the
append-optimized table in the backup set. 

Heap tables are always restored from the latest backup in the incremental backup set.

The incremental back up set, a full backup and associated incremental backups, must be on
a single device. For example, the backups in a backup set must all be on the local filesystem, S3 compatible bucket or a NFS mount point accessible my all hosts in the WarehousePG cluster.

:::warning
Changes to the WarehousePG segment configuration invalidate
incremental backups. After you change the segment configuration (add or remove segment
instances), you must create a full backup before you can create an incremental
backup.
:::

