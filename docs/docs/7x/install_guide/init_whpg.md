# Initializing WarehousePG
---

Describes how to initialize a WarehousePG database system.

The instructions in this chapter assume you have already prepared your hosts as described in [Configure Operating System](config_os.html) and installed the WarehousePG software on all of the hosts in the system according to the instructions in [Installing WarehousePG](install_whpg.html).

This chapter contains the following topics:

-   [Overview](#topic2)
-   [Initializing WarehousePG](#topic3)
-   [Setting WarehousePG Environment Variables](#topic8)
-   [Next Steps](#topic9)

**Parent topic:** [Installing and Upgrading WarehousePG](install_guide/)

## <a id="topic2"></a>Overview

Because WarehousePG is distributed, the process for initializing a WarehousePG management system \(DBMS\) involves initializing several individual PostgreSQL database instances \(called *segment instances* in WarehousePG\).

Each database instance \(the coordinator and all segments\) must be initialized across all of the hosts in the system in such a way that they can all work together as a unified DBMS. WarehousePG provides its own version of `initdb` called [gpinitsystem](../utility_guide/ref/gpinitsystem.html), which takes care of initializing the database on the coordinator and on each segment instance, and starting each instance in the correct order.

After the WarehousePG database system has been initialized and started, you can then create and manage databases as you would in a regular PostgreSQL DBMS by connecting to the WarehousePG coordinator.

## <a id="topic3"></a>Initializing WarehousePG

These are the high-level tasks for initializing WarehousePG:

1.  Make sure you have completed all of the installation tasks described in [Configure Operating System](config_os.html) and [Installing WarehousePG](install_whpg.html).
2.  Create a host file that contains the host addresses of your segments. See [Creating the Initialization Host File](#topic4).
3.  Create your WarehousePG cluster configuration file. See [Creating the WarehousePG Configuration File](#topic5).
4.  By default, WarehousePG will be initialized using the locale of the coordinator host system. Make sure this is the correct locale you want to use, as some locale options cannot be changed after initialization. See [Configuring Timezone and Localization Settings](localization.html) for more information.
5.  Run the WarehousePG initialization utility on the coordinator host. See [Running the Initialization Utility](#topic6).
6.  Set the WarehousePG timezone. See [Setting the WarehousePG Timezone](#topic_xkd_d1q_l2b).
7.  Set environment variables for the WarehousePG user. See [Setting WarehousePG Environment Variables](#topic8).

When performing the following initialization tasks, you must be logged into the coordinator host as the `gpadmin` user, and to run WarehousePG utilities, you must source the `greenplum_path.sh` file to set WarehousePG environment variables. For example, if you are logged into the coordinator, run these commands.

```
$ su - gpadmin
$ source /usr/local/greenplum-db/greenplum_path.sh
```

### <a id="topic4"></a>Creating the Initialization Host File

The [gpinitsystem](../utility_guide/ref/gpinitsystem.html) utility requires a host file that contains the list of addresses for each segment host. The initialization utility determines the number of segment instances per host by the number host addresses listed per host times the number of data directory locations specified in the `gpinitsystem_config` file.

This file should only contain segment host addresses \(not the coordinator or standby coordinator\). For segment machines with multiple, unbonded network interfaces, this file should list the host address names for each interface — one per line.

> **Note** The WarehousePG segment host naming convention is sdwN where sdw is a prefix and N is an integer. For example, `sdw2` and so on. If hosts have multiple unbonded NICs, the convention is to append a dash \(`-`\) and number to the host name. For example, `sdw1-1` and `sdw1-2` are the two interface names for host `sdw1`. However, NIC bonding is recommended to create a load-balanced, fault-tolerant network.

#### <a id="jm138608"></a>To create the initialization host file

1.  Create a file named `hostfile_gpinitsystem`. In this file add the host address name\(s\) of your *segment* host interfaces, one name per line, no extra lines or spaces. For example, if you have four segment hosts with two unbonded network interfaces each:

    ```
    sdw1-1
    sdw1-2
    sdw2-1
    sdw2-2
    sdw3-1
    sdw3-2
    sdw4-1
    sdw4-2
    ```

2.  Save and close the file.

> **Note** If you are not sure of the host names and/or interface address names used by your machines, look in the `/etc/hosts` file.

### <a id="topic5"></a>Creating the WarehousePG Configuration File

Your WarehousePG configuration file tells the [gpinitsystem](../utility_guide/ref/gpinitsystem.html) utility how you want to configure your WarehousePG cluster. An example configuration file can be found in `$GPHOME/docs/cli_help/gpconfigs/gpinitsystem_config`.

#### <a id="jm138725"></a>To create a gpinitsystem\_config file

1.  Make a copy of the `gpinitsystem_config` file to use as a starting point. For example:

    ```
    $ cp $GPHOME/docs/cli_help/gpconfigs/gpinitsystem_config \
         /home/gpadmin/gpconfigs/gpinitsystem_config
    ```

2.  Open the file you just copied in a text editor.

    Set all of the required parameters according to your environment. See [gpinitsystem](../utility_guide/ref/gpinitsystem.html) for more information. A WarehousePG cluster must contain a coordinator instance and at *least two* segment instances \(even if setting up a single node system\).

    The `DATA_DIRECTORY` parameter is what determines how many segments per host will be created. If your segment hosts have multiple network interfaces, and you used their interface address names in your host file, the number of segments will be evenly spread over the number of available interfaces.

    To specify `PORT_BASE`, review the port range specified in the `net.ipv4.ip_local_port_range` parameter in the `/etc/sysctl.conf` file. See [Recommended OS Parameters Settings](config_os.html).

    Here is an example of the *required* parameters in the `gpinitsystem_config` file:

    ```
    SEG_PREFIX=gpseg
    PORT_BASE=6000 
    declare -a DATA_DIRECTORY=(/data1/primary /data1/primary /data1/primary /data2/primary /data2/primary /data2/primary)
    COORDINATOR_HOSTNAME=cdw 
    COORDINATOR_DIRECTORY=/data/coordinator 
    COORDINATOR_PORT=5432 
    TRUSTED SHELL=ssh
    CHECK_POINT_SEGMENTS=8
    ENCODING=UNICODE
    ```

3.  \(Optional\) If you want to deploy mirror segments, uncomment and set the mirroring parameters according to your environment. To specify `MIRROR_PORT_BASE`, review the port range specified under the `net.ipv4.ip_local_port_range` parameter in the `/etc/sysctl.conf` file. Here is an example of the *optional* mirror parameters in the `gpinitsystem_config` file:

    ```
    MIRROR_PORT_BASE=7000
    declare -a MIRROR_DATA_DIRECTORY=(/data1/mirror /data1/mirror /data1/mirror /data2/mirror /data2/mirror /data2/mirror)
    ```

    > **Note** You can initialize your WarehousePG cluster with primary segments only and deploy mirrors later using the [gpaddmirrors](../utility_guide/ref/gpaddmirrors.html) utility.

4.  Save and close the file.

### <a id="topic6"></a>Running the Initialization Utility

The [gpinitsystem](../utility_guide/ref/gpinitsystem.html) utility will create a WarehousePG cluster using the values defined in the configuration file.

These steps assume you are logged in as the `gpadmin` user and have sourced the `greenplum_path.sh` file to set WarehousePG environment variables.

#### <a id="jm138821"></a>To run the initialization utility

1.  Run the following command referencing the path and file name of your initialization configuration file \(`gpinitsystem_config`\) and host file \(`hostfile_gpinitsystem`\). For example:

    ```
    $ cd ~
    $ gpinitsystem -c gpconfigs/gpinitsystem_config -h gpconfigs/hostfile_gpinitsystem
    ```

    For a fully redundant system \(with a standby coordinator and a *spread* mirror configuration\) include the `-s` and `--mirror-mode=spread` options. For example:

    ```
    $ gpinitsystem -c gpconfigs/gpinitsystem_config -h gpconfigs/hostfile_gpinitsystem \
      -s <standby_coordinator_hostname> --mirror-mode=spread
    ```

    During a new cluster creation, you may use the `-O output\_configuration\_file` option to save the cluster configuration details in a file. For example:

    ```
    $ gpinitsystem -c gpconfigs/gpinitsystem_config -O gpconfigs/config_template 
    ```

    This output file can be edited and used at a later stage as the input file of the `-I` option, to create a new cluster or to recover from a backup. See [gpinitsystem](../utility_guide/ref/gpinitsystem.html) for further details.

    > **Note** Calling `gpinitsystem` with the `-O` option does not initialize the WarehousePG cluster; it merely generates and saves a file with cluster configuration details.

2.  The utility will verify your setup information and make sure it can connect to each host and access the data directories specified in your configuration. If all of the pre-checks are successful, the utility will prompt you to confirm your configuration. For example:

    ```
    => Continue with WarehousePG creation? Yy/Nn
    ```

3.  Press `y` to start the initialization.
4.  The utility will then begin setup and initialization of the coordinator instance and each segment instance in the system. Each segment instance is set up in parallel. Depending on the number of segments, this process can take a while.
5.  At the end of a successful setup, the utility will start your WarehousePG cluster. You should see:

    ```
    => WarehousePG instance successfully created.
    ```


#### <a id="topic7"></a>Troubleshooting Initialization Problems

If the utility encounters any errors while setting up an instance, the entire process will fail, and could possibly leave you with a partially created system. Refer to the error messages and logs to determine the cause of the failure and where in the process the failure occurred. Log files are created in `~/gpAdminLogs`.

Depending on when the error occurred in the process, you may need to clean up and then try the `gpinitsystem` utility again. For example, if some segment instances were created and some failed, you may need to stop `postgres` processes and remove any utility-created data directories from your data storage area\(s\). A backout script is created to help with this cleanup if necessary.

##### <a id="jm139087"></a>Using the Backout Script

If the gpinitsystem utility fails, it will create the following backout script if it has left your system in a partially installed state:

`~/gpAdminLogs/backout_gpinitsystem_<user>_<timestamp>`

You can use this script to clean up a partially created WarehousePG cluster. This backout script will remove any utility-created data directories, `postgres` processes, and log files. After correcting the error that caused `gpinitsystem` to fail and running the backout script, you should be ready to retry initializing your WarehousePG cluster.

The following example shows how to run the backout script:

```
$ bash ~/gpAdminLogs/backout_gpinitsystem_gpadmin_20071031_121053
```

### <a id="topic_xkd_d1q_l2b"></a>Setting the WarehousePG Timezone

As a best practice, configure WarehousePG and the host systems to use a known, supported timezone. WarehousePG uses a timezone from a set of internally stored PostgreSQL timezones. Setting the WarehousePG timezone prevents WarehousePG from selecting a timezone each time the cluster is restarted and sets the timezone for the WarehousePG coordinator and segment instances.

Use the [gpconfig](../utility_guide/ref/gpconfig.html) utility to show and set the WarehousePG timezone. For example, these commands show the WarehousePG timezone and set the timezone to `US/Pacific`.

```
$ gpconfig -s TimeZone
$ gpconfig -c TimeZone -v 'US/Pacific'
```

You must restart WarehousePG after changing the timezone. The command `gpstop -ra` restarts WarehousePG. The catalog view `pg_timezone_names` provides WarehousePG timezone information.

For more information about the WarehousePG timezone, see [Configuring Timezone and Localization Settings](localization.html).

## <a id="topic8"></a>Setting WarehousePG Environment Variables

You must set environment variables in the WarehousePG user \(`gpadmin`\) environment that runs WarehousePG on the WarehousePG coordinator and standby coordinator hosts. A `greenplum_path.sh` file is provided in the WarehousePG installation directory with environment variable settings for WarehousePG.

The WarehousePG management utilities also require that the `COORDINATOR_DATA_DIRECTORY` environment variable be set. This should point to the directory created by the `gpinitsystem` utility in the coordinator data directory location.

> **Note** The `greenplum_path.sh` script changes the operating environment in order to support running the WarehousePG-specific utilities. These same changes to the environment can negatively affect the operation of other system-level utilities, such as `ps` or `yum`. Use separate accounts for performing system administration and database administration, instead of attempting to perform both functions as `gpadmin`.

These steps ensure that the environment variables are set for the `gpadmin` user after a system reboot.

### <a id="jm144961"></a>To set up the gpadmin environment for WarehousePG

1.  Open the `gpadmin` profile file \(such as `.bashrc`\) in a text editor. For example:

    ```
    $ vi ~/.bashrc
    ```

2.  Add lines to this file to source the `greenplum_path.sh` file and set the `COORDINATOR_DATA_DIRECTORY` environment variable. For example:

    ```
    source /usr/local/greenplum-db/greenplum_path.sh
    export COORDINATOR_DATA_DIRECTORY=/data/coordinator/gpseg-1
    ```

3.  \(Optional\) You may also want to set some client session environment variables such as `PGPORT`, `PGUSER` and `PGDATABASE` for convenience. For example:

    ```
    export PGPORT=5432
    export PGUSER=gpadmin
    export PGDATABASE=gpadmin
    ```

4.  \(Optional\) If you use RHEL/Oracle/Rocky Linux, add the following line to the end of the `.bashrc` file to enable using the `ps` command in the `greenplum_path.sh` environment:

    ```
    export LD_PRELOAD=/lib64/libz.so.1 ps
    ```

5.  Save and close the file.
6.  After editing the profile file, source it to make the changes active. For example:

    ```
    $ source ~/.bashrc
    
    ```

7.  If you have a standby coordinator host, copy your environment file to the standby coordinator as well. For example:

    ```
    $ cd ~
    $ scp .bashrc <standby_hostname>:`pwd`
    ```


> **Note** The `.bashrc` file should not produce any output. If you wish to have a message display to users upon logging in, use the `.bash_profile` file instead.

## <a id="topic9"></a>Next Steps

After your system is up and running, the next steps are:

-   [Allowing Client Connections](#topic10)
-   [Creating Databases and Loading Data](#topic11)

### <a id="topic10"></a>Allowing Client Connections

After a WarehousePG is first initialized it will only allow local connections to the database from the `gpadmin` role \(or whatever system user ran `gpinitsystem`\). If you would like other users or client machines to be able to connect to WarehousePG, you must give them access. See the *WarehousePG Administrator Guide* for more information.

### <a id="topic11"></a>Creating Databases and Loading Data

After verifying your installation, you may want to begin creating databases and loading data. See [DDL: Defining Database Objects](../admin_guide/ddl/ddl.html) and [Loading and Unloading Data](../admin_guide/load/topics/g-loading-and-unloading-data.html) in the *WarehousePG Administrator Guide* for more information about creating databases, schemas, tables, and other database objects in WarehousePG and loading your data.

