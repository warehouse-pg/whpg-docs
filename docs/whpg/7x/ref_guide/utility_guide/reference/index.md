---
title: Utility Reference
navigation:
  - analyzedb
  - clusterdb
  - createdb
  - createuser
  - dropdb
  - dropuser
  - gpactivatestandby
  - gpaddmirrors
  - gpbackup_manager
  - gpbackup
  - gpcheckcat
  - gpcheckperf
  - gpconfig
  - gpdeletesystem
  - gpexpand
  - gpfdist
  - gpinitstandby
  - gpinitsystem
  - gpload
  - gplogfilter
  - gpmemreport
  - gpmemwatcher
  - gpmovemirrors
  - gprecoverseg
  - gpreload
  - gprestore
  - gpssh
  - gpssh-exkeys
  - gpstart
  - gpstate
  - gpstop
  - gpsync
  - pg_config
  - pg_dump
  - pg_dumpall
  - pg_restore
  - psql
  - reindexdb
  - vacuumdb

---

The command-line utilities provided with WarehousePG.

WarehousePG uses the standard PostgreSQL client and server programs and provides additional management utilities for administering a distributed WarehousePG DBMS.

Several utilities are installed when you install the WarehousePG server. These utilities reside in `$GPHOME/bin`. 

Other utilities such as clients and backup/restore may be found at [Warehouse PG Github Repo](https://github.com/warehouse-pg)

WarehousePG provides the following utility programs. Superscripts identify those utilities that require separate downloads, as well as those utilities that are also installed with the Client and Loader Tools Packages. (See the Note following the table.) All utilities are installed when you install the WarehousePG server, unless specifically identified by a superscript.

-   [analyzedb](analyzedb.md)
-   [clusterdb](clusterdb.md)
-   [createdb](createdb.md)<sup>1</sup>
-   [createuser](createuser.md)<sup>1</sup>
-   [dropdb](dropdb.md)<sup>1</sup>
-   [dropuser](dropuser.md)<sup>1</sup>
-   [gpactivatestandby](gpactivatestandby.md)
-   [gpaddmirrors](gpaddmirrors.md)
-   [gpbackup](gpbackup.md)<sup>2</sup>
-   [gpcheckcat](gpcheckcat.md)
-   [gpcheckperf](gpcheckperf.md)
-   [gpconfig](gpconfig.md)
-   [gpdeletesystem](gpdeletesystem.md)
-   [gpexpand](gpexpand.md)
-   [gpfdist](gpfdist.md)<sup>1</sup>
-   [gpinitstandby](gpinitstandby.md)
-   [gpinitsystem](gpinitsystem.md)
-   [gpload](gpload.md)<sup>1</sup>
-   [gplogfilter](gplogfilter.md)
-   [gpmovemirrors](gpmovemirrors.md)
-   [gprecoverseg](gprecoverseg.md)
-   [gpreload](gpreload.md)
-   [gprestore](gprestore.md)<sup>2</sup>
-   [gpssh](gpssh.md)
-   [gpssh-exkeys](gpssh-exkeys.md)
-   [gpstart](gpstart.md)
-   [gpstate](gpstate.md)
-   [gpstop](gpstop.md)
-   [gpsync](gpsync.md)
-   [pg_config](pg_config.md)
-   [pg_dump](pg_dump.md)<sup>1</sup>
-   [pg_dumpall](pg_dumpall.md)<sup>1</sup>
-   [pg_restore](pg_restore.md)
-   [pgbouncer](pgbouncer.md)
-   [pgbouncer.ini](pgbouncer-ini.md)
-   [pgbouncer-admin](pgbouncer-admin.md)
-   [psql](psql.md)<sup>1</sup>
-   [reindexdb](reindexdb.md)
-   [vacuumdb](vacuumdb.md)

> **Note** 

> <sup>1</sup> The utility program is also installed with the **WarehousePG Client and Loader Tools Package**

> <sup>2</sup> The utility program can be obtained from the **WarehousePG Backup and Restore**

Additional utilities may be found at [Warehouse PG Github Org Repo](https://github.com/warehouse-pg)

**Parent topic:** [WarehousePG Utility Guide](index.md)
