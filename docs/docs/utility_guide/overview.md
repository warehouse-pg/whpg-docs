# About the WarehousePG Database Utilities 

General information about using the WarehousePG Database utility programs.



## <a id="ipv6"></a>Referencing IP Addresses 

When you reference IPv6 addresses in WarehousePG Database utility programs, or when you use numeric IP addresses instead of hostnames in any management utility, always enclose the IP address in brackets. When specifying an IP address at the command line, the best practice is to escape any brackets or enclose them in single quotes. For example, use either:

```
\[2620:0:170:610::11\]
```

Or:

```
'[2620:0:170:610::11]'
```

## <a id="topic_zqp_5xm_cp"></a>Running Backend Server Programs 

WarehousePG Database has modified certain PostgreSQL backend server programs to handle the parallelism and distribution of a WarehousePG Database system. You access these programs only through the WarehousePG Database management tools and utilities. *Do not run these programs directly.*

The following table identifies certain PostgreSQL backend server programs and the WarehousePG Database utility command to run instead.

|PostgreSQL Program Name|Description|Use Instead|
|-----------------------|-----------|-----------|
|`initdb`|This program is called by `gpinitsystem` when initializing a WarehousePG Database array. It is used internally to create the individual segment instances and the coordinator instance.|[gpinitsystem](ref/gpinitsystem.html)|
|`ipcclean`|Not used in WarehousePG Database|N/A|
|`pg_basebackup`|This program makes a binary copy of a single database instance. WarehousePG Database uses it for tasks such as creating a standby coordinator instance, or recovering a mirror segment when a full copy is needed. Do not use this utility to back up WarehousePG Database segment instances because it does not produce MPP-consistent backups.|[gpinitstandby](ref/gpinitstandby.html), `[gprecoverseg](ref/gprecoverseg.html)`|
|`pg_controldata`|Not used in WarehousePG Database|[gpstate](ref/gpstate.html)|
|`pg_ctl`|This program is called by `gpstart` and `gpstop` when starting or stopping a WarehousePG Database array. It is used internally to stop and start the individual segment instances and the coordinator instance in parallel and with the correct options.|[gpstart](ref/gpstart.html), [gpstop](ref/gpstop.html)|
|`pg_resetwal`|DO NOT USE<br/><br/>> **Caution** This program might cause data loss or cause data to become unavailable. If this program is used, the VMware WarehousePG cluster is not supported. Thecluster must be reinitialized and restoredby the customer.|N/A|
|`postgres`|The `postgres` executable is the actual PostgreSQL server process that processes queries.|The main `postgres` process \(postmaster\) creates other `postgres` subprocesses and `postgres` session as needed to handle client connections.|
|`postmaster`|`postmaster` starts the `postgres` database server listener process that accepts client connections. In WarehousePG Database, a `postgres` database listener process runs on the WarehousePG coordinator Instance and on each Segment Instance.|In WarehousePG Database, you use [gpstart](ref/gpstart.html) and [gpstop](ref/gpstop.html) to start all postmasters \(`postgres` processes\) in the system at once in the correct order and with the correct options.|

**Parent topic:** [WarehousePG Database Utility Guide](../utility_guide/)