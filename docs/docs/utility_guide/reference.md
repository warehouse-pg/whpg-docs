# Cluster Utilities Guide 

The command-line utilities provided with WarehousePG Database.

WarehousePG Database uses the standard PostgreSQL client and server programs and provides additional management utilities for administering a distributed WarehousePG Database DBMS.

Several utilities are installed when you install the WarehousePG Database server. These utilities reside in `$GPHOME/bin`. 

Other utilities such as clients and backup/restore may be found at [Warehouse PG Github Repo](https://github.com/warehouse-pg)

WarehousePG Database provides the following utility programs. Superscripts identify those utilities that require separate downloads, as well as those utilities that are also installed with the Client and Loader Tools Packages. \(See the Note following the table.\) All utilities are installed when you install the WarehousePG Database server, unless specifically identified by a superscript.




- [analyzedb](ref/analyzedb.html)
- [clusterdb](ref/clusterdb.html)
- [createdb](ref/createdb.html)<sup>1</sup>
- [createuser](ref/createuser.html)<sup>1</sup>
- [dropdb](ref/dropdb.html)<sup>1</sup>
- [dropuser](ref/dropuser.html)<sup>1</sup>
- [gpactivatestandby](ref/gpactivatestandby.html)
- [gpaddmirrors](ref/gpaddmirrors.html)
- [gpbackup](https://docs.vmware.com/en/VMware-WarehousePG-Backup-and-Restore/index.html)<sup>2</sup>
- [gpcheckcat](ref/gpcheckcat.html)
- [gpcheckperf](ref/gpcheckperf.html)
- [gpconfig](ref/gpconfig.html)
- [gpdeletesystem](ref/gpdeletesystem.html)
- [gpexpand](ref/gpexpand.html)
- [gpfdist](ref/gpfdist.html)<sup>1</sup>
- [gpinitstandby](ref/gpinitstandby.html)
- [gpinitsystem](ref/gpinitsystem.html)
- [gpload](ref/gpload.html)<sup>1</sup>
- [gplogfilter](ref/gplogfilter.html)
- [gpmovemirrors](ref/gpmovemirrors.html)
- [gprecoverseg](ref/gprecoverseg.html)
- [gpreload](ref/gpreload.html)
- [gprestore](https://docs.vmware.com/en/VMware-WarehousePG-Backup-and-Restore/index.html)<sup>1</sup>
- [gpssh](ref/gpssh.html)
- [gpssh-exkeys](ref/gpssh-exkeys.html)
- [gpstart](ref/gpstart.html)
- [gpstate](ref/gpstate.html)
- [gpstop](ref/gpstop.html)
- [gpsync](ref/gpsync.html)
- [gpv](ref/gpv.html)
- [pg\_config](ref/pg_config.html)
- [pg\_dump](ref/pg_dump.html)<sup>1</sup>
- [pg\_dumpall](ref/pg_dumpall.html)<sup>1</sup>
- [pg_filedump](ref/pg_filedump.html)
- [pg\_restore](ref/pg_restore.html)
- [pgbouncer](ref/pgbouncer.html)
- [pgbouncer.ini](ref/pgbouncer-ini.html)
- [pgbouncer-admin](ref/pgbouncer-admin.html)
- [plcontainer](ref/plcontainer.html)
- [plcontainer Configuration File](ref/plcontainer-configuration.html)
- [psql](ref/psql.html)<sup>1</sup>
- [pxf](https://docs.vmware.com/en/VMware-WarehousePG-Platform-Extension-Framework/6.6/greenplum-platform-extension-framework/ref-pxf.html)
- [pxf cluster](https://docs.vmware.com/en/VMware-WarehousePG-Platform-Extension-Framework/6.6/greenplum-platform-extension-framework/ref-pxf-cluster.html)
- [reindexdb](ref/reindexdb.html)
- [vacuumdb](ref/vacuumdb.html)


> **Note** 

> <sup>1</sup> The utility program is also installed with the **WarehousePG Client and Loader Tools Package**

><sup>2</sup> The utility program can be obtained from the **WarehousePG Backup and Restore** 

Additional utilities may be found at [Warehouse PG Github Repo](https://github.com/warehouse-pg)


**Parent topic:** [WarehousePG Database Utility Guide](../utility_guide/)

