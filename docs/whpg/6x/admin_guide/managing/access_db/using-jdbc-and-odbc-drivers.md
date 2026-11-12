---
title: Using JDBC and ODBC Drivers

---

Connect Java and ODBC applications to WarehousePG with a standard PostgreSQL driver such as pgJDBC or psqlODBC. Point the driver at the coordinator, allow the connection in `pg_hba.conf`, and apply the practices that suit a massively parallel processing (MPP) database. To choose a driver, see [Database Application Interfaces](database-application-interfaces.md). To anticipate behaviors that differ from PostgreSQL, see [PostgreSQL Application Compatibility](jdbc-and-odbc-differences.md).

## Connecting to WarehousePG

Connect applications to the WarehousePG coordinator, never to a segment, because segments don't accept client connections. Gather the connection settings, allow the client on the coordinator, and then configure the driver.

### Preparing to Connect

Collect the following information before you configure a driver:

| Setting  | Value                                                  |
| -------- | ------------------------------------------------------ |
| Host     | The host name or IP address of the coordinator.        |
| Port     | The coordinator port. The default is 5432.             |
| Database | The name of the database to connect to.                |
| User     | A role that has the `LOGIN` privilege, and its password. |

WarehousePG reports a PostgreSQL 9.4 version number to drivers, and drivers use it to decide which features to enable. For the full list of connection parameters, see [Establishing a Database Session](establishing-a-database-session.md).

### Allowing the Connection

To allow a client application to connect, add an entry to the `pg_hba.conf` file on the coordinator and reload the configuration:

1.  On the coordinator host, log in as the `gpadmin` user and open the `$MASTER_DATA_DIRECTORY/pg_hba.conf` file in a text editor.

2.  Add an entry for the client host, database, and role. For example, this entry lets the role `appuser` connect to any database from the 192.0.2.0/24 network with password authentication:

    ```
    host    all    appuser    192.0.2.0/24    md5
    ```

3.  Save and close the file.

4.  Reload the configuration so the change takes effect. This doesn't restart WarehousePG:

    ```
    gpstop -u
    ```

The authentication method must match how the password of the role is stored, and the driver version must support it. For details, see [Allowing Connections to WarehousePG](../../manage_access/client_auth/index.md).

To encrypt the connection, enable SSL on the coordinator as described in [Encrypting Data and Database Connections](../../../security-guide/Encryption.md), and then require SSL in the driver with the `sslmode` setting shown in the following examples. Remove the setting if you haven't enabled SSL.

### Connecting with pgJDBC

Add the pgJDBC jar file to the class path and use the PostgreSQL JDBC URL format. This example connects to the coordinator over SSL and prints the server version:

```java
import java.sql.*;
import java.util.Properties;

public class WhpgConnect {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:postgresql://coordinator_host:5432/mydb";
        Properties props = new Properties();
        props.setProperty("user", "appuser");
        props.setProperty("password", "your_password");
        props.setProperty("sslmode", "require");
        try (Connection conn = DriverManager.getConnection(url, props);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT version()")) {
            while (rs.next()) {
                System.out.println(rs.getString(1));
            }
        }
    }
}
```

### Connecting with psqlODBC

Install unixODBC and the psqlODBC driver, register the driver in the `odbcinst.ini` file, and define a data source name (DSN) in the `odbc.ini` file. The location of the psqlODBC library depends on your platform. Replace `/path/to/psqlodbcw.so` with the path on your system.

`odbcinst.ini`:

```
[PostgreSQL Unicode]
Description = psqlODBC Unicode driver
Driver      = /path/to/psqlodbcw.so
```

`odbc.ini`:

```
[whpg]
Description = WarehousePG coordinator
Driver      = PostgreSQL Unicode
Servername  = coordinator_host
Port        = 5432
Database    = mydb
UserName    = appuser
SSLmode     = require
```

Test the data source with the unixODBC `isql` utility:

```
isql -v whpg appuser your_password
```

## Using Drivers with WarehousePG

Design applications for WarehousePG, which spreads each table across many segments.

### Ordering Results

Each segment returns its rows independently, so a query without an `ORDER BY` clause returns rows in no fixed order, and the order can change between runs. Add `ORDER BY` to every query where the order matters, and put it on the outermost query. WarehousePG ignores `ORDER BY` in a view or subquery unless a `LIMIT` clause is also used. For example:

```sql
-- The ORDER BY in the subquery is ignored
SELECT * FROM (SELECT * FROM orders ORDER BY created_at) o;

-- The ORDER BY on the outer query is applied
SELECT * FROM (SELECT * FROM orders) o ORDER BY created_at;
```

### Loading Data

Single-row `INSERT` statements are inefficient in an MPP database, especially for append-optimized tables. Send inserts in batches, for example with `executeBatch` in JDBC. The `COPY` command runs in a single process on the coordinator, so use it, including through the pgJDBC `CopyManager`, only for small loads. To load large volumes in parallel, use external tables with `gpfdist` or the `gpload` utility. See [Loading Data with COPY](../../load/loading-data-with-copy.md) and [Using the WarehousePG Parallel File Server (gpfdist)](../../external/using-gpfdist.md).

### Reading Large Result Sets

By default, drivers read an entire result set into client memory. To read a large result in pieces, use a cursor. In pgJDBC, turn off autocommit and set a fetch size on the statement. In psqlODBC, set the `UseDeclareFetch` option. WarehousePG cursors move forward only.

### Managing Connections and Queueing

Each statement counts against the resource queue of the connecting role. If you enabled resource groups, it counts against the resource group of the role instead. When the role reaches the limit of its queue or group, new statements wait until a slot is free. See [Using Resource Queues](../../performance/wlmgmt/workload_mgmt.md). Set a limit on how long an application waits by canceling the statement (`Statement.cancel` in JDBC, `SQLCancel` in ODBC) or by setting the `statement_timeout` configuration parameter.

Size application connection pools below the `max_connections` limit of the coordinator. See [Troubleshooting Connection Problems](troubleshooting-connection-problems.md). You can also place the [PgBouncer connection pooler](pgbouncer.md) between the application and WarehousePG.

**Parent topic:** [Accessing the Database](index.md)
