# Activating and Deactivating GPORCA
---

By default, WarehousePG uses GPORCA instead of the Postgres-based planner. Server configuration parameters activate or deactivate GPORCA.

Although GPORCA is on by default, you can configure GPORCA usage at the system, database, session, or query level using the optimizer parameter. Refer to one of the following sections if you want to change the default behavior:

-   [Enabling GPORCA for a System](#topic_byp_lqk_br)
-   [Enabling GPORCA for a Database](#topic_pzr_3db_3r)
-   [Enabling GPORCA for a Session or a Query](#topic_lx4_vqk_br)

> **Note** You can deactivate the ability to activate or deactivate GPORCA with the server configuration parameter optimizer\_control. For information about the server configuration parameters, see the *WarehousePG Reference Guide*.

**Parent topic:** [About GPORCA](../../query/topics/query-piv-optimizer.html)

## <a id="topic_byp_lqk_br"></a>Enabling GPORCA for a System

Set the server configuration parameter optimizer for the WarehousePG cluster.

1.  Log into the WarehousePG coordinator host as `gpadmin`, the WarehousePG administrator.
2.  Set the values of the server configuration parameters. These WarehousePG gpconfig utility commands sets the value of the parameters to `on`:

    ```
    $ gpconfig -c optimizer -v on --coordinatoronly
    ```

3.  Restart WarehousePG. This WarehousePG gpstop utility command reloads the `postgresql.conf` files of the coordinator and segments without shutting down WarehousePG.

    ```
    gpstop -u
    ```


## <a id="topic_pzr_3db_3r"></a>Enabling GPORCA for a Database

Set the server configuration parameter optimizer for individual WarehousePGs with the ALTER DATABASE command. For example, this command enables GPORCA for the database *test\_db*.

```
> ALTER DATABASE test_db SET OPTIMIZER = ON ;
```

## <a id="topic_lx4_vqk_br"></a>Enabling GPORCA for a Session or a Query

You can use the SET command to set optimizer server configuration parameter for a session. For example, after you use the psql utility to connect to WarehousePG, this SET command enables GPORCA:

```
> set optimizer = on ;
```

To set the parameter for a specific query, include the SET command prior to running the query.

