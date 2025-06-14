# pgbouncer.ini
---

PgBouncer configuration file.

## <a id="syn"></a>Synopsis

```
[databases]
db = ...

[pgbouncer]
...

[users]
...
```

## <a id="desc"></a>Description

You specify PgBouncer configuration parameters and identify user-specific configuration parameters in a configuration file.

The PgBouncer configuration file \(typically named `pgbouncer.ini`\) is specified in `.ini` format. Files in `.ini` format are composed of sections, parameters, and values. Section names are enclosed in square brackets, for example, `[<section_name>]`. Parameters and values are specified in `key=value` format. Lines beginning with a semicolon \(`;`\) or pound sign \(`#`\) are considered comment lines and are ignored.

The PgBouncer configuration file can contain `%include` directives, which specify another file to read and process. This enables you to split the configuration file into separate parts. For example:

```
%include filename
```

If the filename provided is not an absolute path, the file system location is taken as relative to the current working directory.

The PgBouncer configuration file includes the following sections, described in detail below:

-   [\[databases\] Section](#topic_fmd_ckd_gs)
-   [\[pgbouncer\] Section](#topic_orc_gkd_gs)
-   [\[users\] Section](#topic_lzk_zjd_gs)
-   [\[peers\] Section](#topic_peers)

## <a id="topic_fmd_ckd_gs"></a>\[databases\] Section

The `[databases]` section contains `key=value` pairs, where the `key` is a database name and the `value` is a `libpq` connect-string list of `key`=`value` pairs. Not all features known from `libpq` can be used (service=, .pgpass), since the actual `libpq` is not used.

A database name can contain characters `[0-9A-Za-z_.-]` without quoting. Names that contain other characters must be quoted with standard SQL identifier quoting:

-   Enclose names in double quotes \(`" "`\).
-   Represent a double-quote within an identifier with two consecutive double quote characters.

The database name `*` is the fallback database. PgBouncer uses the value for this key as a connect string for the requested database. Automatically-created database entries such as these are cleaned up if they remain idle longer than the time specified in `autodb_idle_timeout` parameter.

### <a id="dbconn"></a>Database Connection Parameters

The following parameters may be included in the `value` to specify the location of the database.

dbname
The destination database name.

    Default: the client-specified database name

host
The name or IP address of the WarehousePG coordinator host. Host names are resolved at connect time. If DNS returns several results, they are used in a round-robin manner. The DNS result is cached and the `dns_max_ttl` parameter determines when the cache entry expires.

When a host name’s resolution changes, any existing server connections are automatically closed when they are released (according to the pooling mode).

If the value begins with `/`, then a Unix socket in the file-system namespace is used. If the value begins with `@`, then a Unix socket in the abstract namespace is used.

You may specify a comma-separated list of host names or addresses. In that case, connections are made in a round-robin manner. If a host list contains host names that in turn resolve via DNS to multiple addresses, the round-robin systems operate independently. Note that in a list, all hosts must be available at all times: There are no mechanisms to skip unreachable hosts or to select only available hosts from a list. Also note that this only affects how the destinations of new connections are chosen. See also the setting `server_round_robin` in the `[pgbouncer]` section for how clients are assigned to already established server connections.

Examples:

    ```
    host=localhost
    host=127.0.0.1
    host=2001:0db8:85a3:0000:0000:8a2e:0370:7334
    host=/var/run/postgresql
    host=192.168.0.1,192.168.0.2,192.168.0.3
    ```

Default: not set; the connection is made through a Unix socket

port
The WarehousePG coordinator port.

Default: 5432

user
If `user=` is set, all connections to the destination database are initiated as the specified user, resulting in a single connection pool for the database.

If the `user=` parameter is not set, PgBouncer attempts to log in to the destination database with the user name passed by the client. In this situation, there will be one pool for each user who connects to the database.

password
If no password is specified here, the password from the `auth_file` or `auth_query` will be used.

auth\_user
Override of the global `auth_user` setting, if specified.

client\_encoding
Ask for specific `client_encoding` from server.

datestyle
Ask for specific `datestyle` from server.

timezone
Ask for specific `timezone` from server.

### <a id="poolconfig"></a>Pool Configuration

You can use the following parameters for database-specific pool configuration.

pool\_size
Set the maximum size of pools for this database. If not set, the `default_pool_size` is used.

min\_pool\_size
Set the minimum pool size for this database. If not set, the global `min_pool_size` is used.

It is only enforced if at least one of the following is true:
    - This entry in the `[database]` section has a value set for the `user`.
    - There i at least one client connected to the pool.

reserve\_pool
Set additional connections for this database. If not set, `reserve_pool_size` is used.

connect\_query
Query to be run after a connection is established, but before allowing the connection to be used by any clients. If the query raises errors, they are logged but ignored otherwise.

pool\_mode
Set the pool mode specific to this database. If not set, the default `pool_mode` is used.

max\_db\_connections
Set a database-wide maximum number of PgBouncer connections for this database. The total number of connections for all pools for this database will not exceed this value.

## <a id="topic_orc_gkd_gs"></a>\[pgbouncer\] Section

### <a id="genset"></a>Generic Settings

logfile
The location of the log file. For daemonization (`-d`), either this or `syslog` need to be set. The log file is kept open. After log rotation, run `kill -HUP pgbouncer` or run the `RELOAD` command in the PgBouncer Administration Console.

Note that setting `logfile` does not by itself turn off logging to `stderr`. Use the command-line option `-q` or `-d` for that.

    Default: not set

pidfile
The name of the pid file. Without a `pidfile`, you cannot run PgBouncer as a background \(daemon\) process.

    Default: not set

listen\_addr
Specifies a list of comma-separated interface addresses where PgBouncer listens for TCP connections. You may also use `*`, which means to listen on all interfaces. If not set, only Unix socket connections are accepted.

    Specify addresses numerically \(IPv4/IPv6\) or by name.

    Default: not set

listen\_port
The port PgBouncer listens on. Applies to both TCP and Unix sockets.

    Default: 6432

unix\_socket\_dir
Specifies the location for the Unix sockets. Applies to both listening socket and server connections. If set to an empty string, Unix sockets are deactivated. A value that starts with @ specifies that a Unix socket in the abstract namespace should be created.

For online reboot (`-R`) to work, a Unix socket needs to be configured, and it needs to be in the file-system namespace.

    Default: `/tmp`

unix\_socket\_mode
Filesystem mode for the Unix socket. Ignored for sockets in the abstract namespace.

    Default: 0777

unix\_socket\_group
Group name to use for Unix socket. Ignored for sockets in the abstract namespace.

    Default: not set

user
If set, specifies the Unix user to change to after startup. This works only if PgBouncer is started as root or if it is already running as the given user.

    Default: not set

pool\_mode
Specifies when a server connection can be reused by other clients.

    - `session`: Connection is returned to the pool when the client disconnects. Default.
    - `transaction`: Connection is returned to the pool when the transaction finishes.
    - `statement`: Connection is returned to the pool when the current query finishes. Transactions spanning multiple statements are disallowed in this mode.

max\_client\_conn
Maximum number of client connections allowed. When increased, you should also increase the file descriptor limits. The actual number of file descriptors used is more than `max_client_conn`. The theoretical maximum used, when each user connects with its own username to the server is:

    ```
    max_client_conn + (max pool_size * total databases * total users)
    ```

If a database user is specified in the connect string, all users connect using the same username. Then the theoretical maximum connections is:

    ```
    max_client_conn + (max pool_size * total databases)
    ```

    The theoretical maximum should be never reached, unless someone deliberately crafts a special load for it. Still, it means you should set the number of file descriptors to a safely high number. Search for `ulimit` in your operating system documentation.

    Default: 100

default\_pool\_size
The number of server connections to allow per user/database pair. This can be overridden in the per-database configuration.

    Default: 20

min\_pool\_size
Add more server connections to the pool when it is lower than this number. This improves behavior when the usual load drops and then returns suddenly after a period of total inactivity. The value is effectively capped at the pool size.

    Default: 0 \(deactivated\)

reserve\_pool\_size
The number of additional connections to allow for a pool (see `reserve_pool_timeout`). `0` deactivates.

    Default: 0 \(deactivated\)

reserve\_pool\_timeout
If a client has not been serviced in this many seconds, PgBouncer enables use of additional connections from the reserve pool. `0` deactivates.

    Default: 5.0

max\_db\_connections
Do not allow more than this many server connections per database (regardless of user). This considers the PgBouncer database that the client has connected to, not the PostgreSQL database of the outgoing connection.

This can also be set per database in the `[databases]` section.

Note that when you hit the limit, closing a client connection to one pool will not immediately allow a server connection to be established for another pool, because the server connection for the first pool is still open. Once the server connection closes (due to idle timeout), a new server connection will immediately be opened for the waiting pool.

Default: 0 (unlimited)

max\_user\_connections
Do not allow more than this many server connections per user (regardless of database). This considers the PgBouncer user that is associated with a pool, which is either the user specified for the server connection or in absence of that the user the client has connected as.

This can also be set per user in the `[users]` section.

Note that when you hit the limit, closing a client connection to one pool will not immediately allow a server connection to be established for another pool, because the server connection for the first pool is still open. Once the server connection closes (due to idle timeout), a new server connection will immediately be opened for the waiting pool.

Default: 0 (unlimited)

server\_round\_robin
By default, PgBouncer reuses server connections in LIFO \(last-in, first-out\) order, so that a few connections get the most load. This provides the best performance when a single server serves a database. But if there is TCP round-robin behind a database IP, then it is better if PgBouncer also uses connections in that manner to achieve uniform load.

    Default: 0

track\_extra\_parameters
By default, PgBouncer tracks the `client_encoding`, `datestyle`, `timezone`, `standard_conforming_strings`, and `application_name` parameters per client. To allow other parameters to be tracked, you may specify them under this parameter, so that PgBouncer knows that they should be maintained in the client variable cache and restored in the server whenever the client becomes active.

If you need to specify multiple values, use a comma-separated list.

Note that most parameters cannot be tracked this way. The only parameters that can be tracked are ones that WarehousePG reports to the client. WarehousePG has [an official list of parameters that it reports to the client](https://www.postgresql.org/docs/15/protocol-flow.html#PROTOCOL-ASYNC). WarehousePG extensions can change this list though, they can add parameters themselves that they also report, and they can start reporting already existing parameters that WarehousePG does not report.

The WarehousePG protocol allows specifying parameters settings, both directly as a parameter in the startup packet, or inside the options startup packet. Parameters specified using both of these methods are supported by track_extra_parameters. However, it is not possible to include options itself in `track_extra_parameters`, only the parameters contained in `options`.

Default: IntervalStyle

ignore\_startup\_parameters
By default, PgBouncer allows only parameters it can keep track of in startup packets: `client_encoding`, `datestyle`, `timezone`, and `standard_conforming_strings`. All others parameters raise an error. To allow other parameters, specify them here so that PgBouncer knows that they are handled by the admin and it can ignore them.

If you need to specify multiple values, use a comma-separated list.

The WarehousePG protocol allows specifying parameters settings, both directly as a parameter in the startup packet, or inside the `options` startup packet. Parameters specified using both of these methods are supported by `ignore_startup_parameters`. It is even possible to include `options` itself in `track_extra_parameters`, which results in any unknown parameters contained inside `options` to be ignored.

    Default: empty

peer_id
The peer id used to identify this PgBouncer process in a group of PgBouncer processes that are peered together. The `peer_id` value should be unique within a group of peered PgBouncer processes. When set to 0, PgBouncer peering is disabled. See the `[peers]` section for more information. The maximum value that can be used for the `peer_id` is 16383.

Default: 0

disable\_pqexec
Deactivates Simple Query protocol \(PQexec\). Unlike Extended Query protocol, Simple Query protocol allows multiple queries in one packet, which allows some classes of SQL-injection attacks. Deactivating it can improve security. This means that only clients that exclusively use Extended Query protocol will work.

    Default: 0

application\_name\_add\_host
Add the client host address and port to the application name setting set on connection start. This helps in identifying the source of bad queries. This logic applies only on start of connection. If `application_name` is later changed with `SET`, PgBouncer does not change it again.

    Default: 0

conffile
Show location of the current configuration file. Changing this parameter will result in PgBouncer using another config file for next `RELOAD` / `SIGHUP`.

    Default: file from command line

service\_name
Used during win32 service registration.

    Default: pgbouncer

job\_name
Alias for `service_name`.

stats\_period
Sets how often the averages shown in various `SHOW` commands are updated and how often aggregated statistics are written to the log (but see `log_stats`). [seconds]

    Default: 60

max\_prepared\_statements

When set to a non-zero value, PgBouncer tracks protocol-level named prepared statements related commands sent by the client in transaction and statement pooling mode. PgBouncer makes sure that any statement prepared by a client is available on the backing server connection, even when the statement was originally prepared on another server connection.

PgBouncer internally examines all the queries that are sent as a prepared statement by clients and gives each unique query string an internal name with the format `PGBOUNCER_{unique_id}`. Prepared statements are only prepared using this name on the corresponding WarehousePG cluster. PgBouncer keeps track of the name that the client gave to each prepared statement. It rewrites each command that uses a prepared statement to use the matching internal name (for example, `PGBOUNCER_123`) before forwarding that command to the server. More importantly, if the prepared statement that the client wants to use is not prepared on the server yet, it automatically prepares that statement before forwarding the command that the client sent.

Note that this tracking and rewriting of prepared statement commands does not work for SQL-level prepared statement commands such as `PREPARE`, `EXECUTE`, `DEALLOCATE`, `DEALLOCATE ALL`, and `DISCARD ALL`. Running `DEALLOCATE ALL` and `DISCARD ALL` is especially problematic, since those commands appear to run successfully, but they interfere with the state of the server connection significantly without PgBouncer noticing, which in turn will very likely break the execution of any further prepared statements on that server connection.

The actual value of this setting controls the number of prepared statements kept active on a single server connection. When the setting is set to 0, prepared statement support for transaction and statement pooling is disabled. To get the best performance, you should try to ensure that this setting is larger than the amount of commonly used prepared statements in your application. Keep in mind that the higher this value, the larger the memory footprint of each PgBouncer connection will have on your WarehousePG coordinator, because it will keep more queries prepared on those connections. It also increases the memory footprint of PgBouncer itself, because it now needs to keep track of query strings.

The impact on PgBouncer memory usage is not that big:
    - Each unique query is stored once in a global query cache.
    - Each client connection keeps a buffer that it uses to rewrite packets. This is at most four times the size of `pkt_buf`. This limit is often not reached though, it only happens when the queries in your prepared statements are between two and four times the size of `pkt_buf`.

Consider the following example scenario:
    - There are 1000 active clients.
    - The clients prepare 200 unique queries.
    - The average size of a query is 5 kB.
    - `pkt_buf` is set to the default of 4096 (4kB).

In this scenario, PgBouncer needs at most the following amount of memory to handle these prepared statements:

    ```
    200 x 5kB + 1000 x 4 x 4kB = ~17MB of memory.
    ```

Tracking prepared statements does not only come with a memory cost, but also with increased CPU usage, because PgBouncer needs to inspect and rewrite the queries. Multiple PgBouncer instances can listen on the same port to use more than one core for processing, see the `so_reuseport` option for details.

There are also performance benefits to prepared statements. Just as when connecting to WarehousePG directly, by preparing a query that is executed many times, it reduces the total amount of parsing and planning that needs to be done. The way that PgBouncer tracks prepared statements is especially beneficial to performance when multiple clients prepare the same queries. Because client connections automatically reuse a prepared statement on a server connection even if it was prepared by another client. As an example, if you have a `pool_size` of 20 and you have 100 clients that all prepare the exact same query, then the query is prepared (and thus parsed) only 20 times on the WarehousePG coordinator.

The reuse of prepared statements has one downside. If the return or argument types of a prepared statement changes across executions, WarehousePG throws an error such as:

    ```
    ERROR:  cached plan must not change result type
    ```

You can avoid such errors by not having multiple clients that use the exact same query string in a prepared statement, but expecting different argument or result types. One of the most common ways of running into this issue is during a DDL migration where you add a new column or change a column type on an existing table. In those cases you can run `RECONNECT` on the PgBouncer admin console after doing the migration to force a re-prepare of the query and make the error goes away.

Default: 0

### <a id="authset"></a>Authentication Settings

auth\_file
The name of the file containing the user names and passwords to load. The file format is the same as the WarehousePG pg\_auth file. Refer to the [PgBouncer Authentication File Format](../../admin_guide/access_db/topics/pgbouncer.html#pgb_auth) for more information.

    Default: not set

auth\_hba\_file
HBA configuration file to use when `auth_type` is `hba`. Refer to the [Configuring HBA-based Authentication for PgBouncer](../../admin_guide/access_db/topics/pgbouncer.html#pgb_hba) and [Configuring LDAP-based Authentication for PgBouncer](../../admin_guide/access_db/topics/pgbouncer.html#pgb_ldap) for more information.

    Default: not set

auth\_type
How to authenticate users.

    - `pam`: Use PAM to authenticate users. `auth_file` is ignored. This method is not compatible with databases using the `auth_user` option. The service name reported to PAM is `pgbouncer`. PAM is not supported in the HBA configuration file.
    - `hba`:  The actual authentication type is loaded from the `auth_hba_file`. This setting allows different authentication methods for different access paths, for example: connections over Unix socket use the `peer` auth method, connections over TCP must use TLS.
    - `cert`:  Clients must connect with TLS using a valid client certificate. The client's username is taken from CommonName field in the certificate.
    - `md5`: Use MD5-based password check. `auth_file` may contain both MD5-encrypted or plain-text passwords. If `md5` is configured and a user has a SCRAM secret, then SCRAM authentication is used automatically instead. This is the default authentication method.
    - `scram-sha-256`: Use password check with SCRAM-SHA-256. `auth_file` has to contain SCRAM secrets or plain-text passwords.
    - `plain`:  Clear-text password is sent over wire. *Deprecated*.
    - `trust`: No authentication is performed. The username must still exist in the `auth_file`.
    - `any`: Like the `trust` method, but the username supplied is ignored. Requires that all databases are configured to log in with a specific user. Additionally, the console database allows any user to log in as admin.

auth_key_file
If you are connecting to LDAP with an encrypted password, `auth_key_file` identifies the file system location of the encryption key. Refer to [About Specifying an Encrypted LDAP Password](../../admin_guide/access_db/topics/pgbouncer.html#pgb_ldap_encrypt_passwd) for more information.

    Default: not set

auth_cipher
If you are connecting to LDAP with an encrypted password, `auth_cipher` identifies the cipher algorithm for password authentication. PgBouncer accepts any cipher supported by OpenSSL on the system. When FIPS mode is enabled, specify only a cipher that is considered safe in FIPS mode. Refer to [About Specifying an Encrypted LDAP Password](../../admin_guide/access_db/topics/pgbouncer.html#pgb_ldap_encrypt_passwd) for more information.

    Default: `aes-256-cbc`

auth\_query
Query to load a user's password from the database.

Direct access to pg_shadow requires admin rights. It's preferable to use a non-superuser that calls a `SECURITY DEFINER` function instead.

Note that the query is run inside target database, so if a function is used it needs to be installed into each database.

    Default: `SELECT usename, passwd FROM pg_shadow WHERE usename=$1`

auth\_user
If `auth_user` is set, any user who is not specified in `auth_file` is authenticated through the `auth_query` query from the `pg_shadow` database view. PgBouncer performs this query as the `auth_user` WarehousePG user. `auth_user`'s password must be set in the `auth_file`. (If the `auth_user` does not require a password then it does not need to be defined in `auth_file`.)

Direct access to `pg_shadow` requires WarehousePG administrative privileges. It is preferable to use a non-admin user that calls `SECURITY DEFINER` function instead.

 Default: not set

auth\_dbname
Database name in the `[database]` section to be used for authentication purposes. This option can be either global or overridden in the connection string if this parameter is specified.

### <a id="logset"></a>Log Settings

syslog
Toggles syslog on and off.

    Default: 0

syslog\_ident
Under what name to send logs to syslog.

    Default: `pgbouncer` (program name)

syslog\_facility
Under what facility to send logs to syslog. Some possibilities are: `auth`, `authpriv`, `daemon`, `user`, `local0-7`.

    Default: `daemon`

log\_connections
Log successful logins.

    Default: 1

log\_disconnections
Log disconnections, with reasons.

    Default: 1

log\_pooler\_errors
Log error messages that the pooler sends to clients.

    Default: 1

log\_stats
Write aggregated statistics into the log, every `stats_period`. This can be deactivated if external monitoring tools are used to grab the same data from `SHOW` commands.

    Default: 1

verbose
Increase verbosity. Mirrors the `-v` switch on the command line. Using `-v -v` on the command line is the same as `verbose=2`.

    Default: 0

### <a id="consaccess"></a>Console Access Control

admin\_users
Comma-separated list of database users that are allowed to connect and run all commands on the PgBouncer Administration Console. Ignored when `auth_type=any`, in which case any username is allowed in as admin.

    Default: empty

stats\_users
Comma-separated list of database users that are allowed to connect and run read-only queries on the console. This includes all `SHOW` commands except `SHOW FDS`.

    Default: empty

### <a id="connsan"></a>Connection Sanity Checks, Timeouts

server\_reset\_query
Query sent to server on connection release, before making it available to other clients. At that moment no transaction is in progress so it should not include `ABORT` or `ROLLBACK`.

    The query should clean any changes made to a database session so that the next client gets a connection in a well-defined state. Default is `DISCARD ALL` which cleans everything, but that leaves the next client no pre-cached state. It can be made lighter, e.g. `DEALLOCATE ALL` to just drop prepared statements, if the application does not break when some state is kept around.

    > **Note** WarehousePG does not support `DISCARD ALL`.

    When transaction pooling is used, the `server_reset_query` is not used, as clients must not use any session-based features as each transaction ends up in a different connection and thus gets a different session state.

    Default: `DISCARD ALL;` \(Not supported by WarehousePG.\)

server\_reset\_query\_always
Whether `server_reset_query` should be run in all pooling modes. When this setting is off \(default\), the `server_reset_query` will be run only in pools that are in sessions-pooling mode. Connections in transaction-pooling mode should not have any need for reset query.

    This setting is for working around broken setups that run applications that use session features over a transaction-pooled PgBouncer. It changes non-deterministic breakage to deterministic breakage: Clients always lose their state after each transaction.

    Default: 0

server\_check\_delay
How long to keep released connections available for immediate re-use, without running sanity-check queries on it. If `0`, then the query is run always.

    Default: 30.0

server\_check\_query
A simple do-nothing query to test the server connection.

    If an empty string, then sanity checking is deactivated.

    Default: SELECT 1;

server\_fast\_close
Disconnect a server in session pooling mode immediately or after the end of the current transaction if it is in “close\_needed” mode \(set by `RECONNECT`, `RELOAD` that changes connection settings, or DNS change\), rather than waiting for the session end. In statement or transaction pooling mode, this has no effect since that is the default behavior there.

    If because of this setting a server connection is closed before the end of the client session, the client connection is also closed. This ensures that the client notices that the session has been interrupted.

    This setting makes connection configuration changes take effect sooner if session pooling and long-running sessions are used. The downside is that client sessions are liable to be interrupted by a configuration change, so client applications will need logic to reconnect and reestablish session state. But note that no transactions will be lost, because running transactions are not interrupted, only idle sessions.

    Default: 0

server\_lifetime
The pooler will close an unused server connections that has been connected longer than this number of seconds. Setting it to `0` means the connection is to be used only once, then closed. \[seconds\]

    Default: 3600.0

server\_idle\_timeout
If a server connection has been idle more than this many seconds it is dropped. If this parameter is set to `0`, timeout is deactivated. \[seconds\]

    Default: 600.0

server\_connect\_timeout
If connection and login will not finish in this amount of time, the connection will be closed. \[seconds\]

    Default: 15.0

server\_login\_retry
If a login fails due to failure from `connect()` or authentication, that pooler waits this much before retrying to connect. \[seconds\]

    Default: 15.0

client\_login\_timeout
If a client connects but does not manage to login in this amount of time, it is disconnected. This is needed to avoid dead connections stalling `SUSPEND` and thus online restart. \[seconds\]

    Default: 60.0

autodb\_idle\_timeout
If database pools created automatically \(via `*`\) have been unused this many seconds, they are freed. Their statistics are also forgotten. \[seconds\]

    Default: 3600.0

dns\_max\_ttl
How long to cache DNS lookups, in seconds. If a DNS lookup returns several answers, PgBouncer round-robins between them in the meantime. The actual DNS TTL is ignored. \[seconds\]

    Default: 15.0

dns\_nxdomain\_ttl
How long error and NXDOMAIN DNS lookups can be cached. \[seconds\]

    Default: 15.0

dns\_zone\_check\_period
Period to check if zone serial numbers have changed.

    PgBouncer can collect DNS zones from hostnames \(everything after first dot\) and then periodically check if the zone serial numbers change. If changes are detected, all hostnames in that zone are looked up again. If any host IP changes, its connections are invalidated.

    Works only with UDNS and c-ares backend \(`--with-udns` or `--with-cares` to configure\).

    Default: 0.0 \(deactivated\)

resolv\_conf
The location of a custom `resolv.conf` file. This is to allow specifying custom DNS servers and perhaps other name resolution options, independent of the global operating system configuration.

    Requires evdns (>= 2.0.3) or c-ares (>= 1.15.0) backend.

    The parsing of the file is done by the DNS backend library, not PgBouncer, so see the library's documentation for details on allowed syntax and directives.

    Default: empty (use operating system defaults)


### <a id="tlsset"></a>TLS settings

client\_tls\_sslmode
TLS mode to use for connections from clients. TLS connections are deactivated by default. When enabled, `client_tls_key_file` and `client_tls_cert_file` must be also configured to set up the key and certificate PgBouncer uses to accept client connections.

    -   `disable`: Plain TCP. If client requests TLS, it’s ignored. Default.
    -   `allow`: If client requests TLS, it is used. If not, plain TCP is used. If client uses client-certificate, it is not validated.
    -   `prefer`: Same as `allow`.
    -   `require`: Client must use TLS. If not, client connection is rejected. If client presents a client-certificate, it is not validated.
    -   `verify-ca`: Client must use TLS with valid client certificate.
    -   `verify-full`: Same as `verify-ca`.

client\_tls\_key\_file
Private key for PgBouncer to accept client connections.

Default: not set

client\_tls\_cert\_file
Certificate for private key. CLients can validate it.

Default: unset

client\_tls\_ca\_file
Root certificate to validate client certificates.

Default: unset

client\_tls\_protocols
Which TLS protocol versions are allowed.

Valid values: are `tlsv1.0`, `tlsv1.1`, `tlsv1.2`, `tlsv1.3`.

Shortcuts: `all` \(`tlsv1.0`, `tlsv1.1`, `tlsv1.2`, `tlsv1.3`\), `secure` \(`tlsv1.2`, `tlsv1.3`\), `legacy` \(`all`\).

Default: `secure`

client\_tls\_ciphers
Allowed TLS ciphers, in OpenSSL syntax. Shortcuts: `default`/`secure`, `compat`/`legacy`, `insecure`/`all`, `normal`, `fast`.

    Only connections using TLS version 1.2 and lower are affected. There is currently no setting that controls the cipher choices used by TLS version 1.3 connections.

    Default: `fast`

client\_tls\_ecdhcurve
Elliptic Curve name to use for ECDH key exchanges.

Allowed values: `none` \(DH is deactivated\), `auto` \(256-bit ECDH\), curve name.

Default: `auto`

client\_tls\_dheparams
DHE key exchange type.

Allowed values: `none` \(DH is deactivated\), `auto` \(2048-bit DH\), `legacy` \(1024-bit DH\).

Default: `auto`

server\_tls\_sslmode
TLS mode to use for connections to WarehousePG and PostgreSQL servers. TLS connections are deactivated by default.

    -   `disable`: Plain TCP. TLS is not requested from the server. Default.
    -   `allow`: If server rejects plain, try TLS. \(*PgBouncer Documentation is speculative on this.*\)
    -   `prefer`: TLS connection is always requested first. When connection is refused, plain TPC is used. Server certificate is not validated.
    -   `require`: Connection must use TLS. If server rejects it, plain TCP is not attempted. Server certificate is not validated.
    -   `verify-ca`: Connection must use TLS and server certificate must be valid according to `server_tls_ca_file`. The server hostname is not verfied against the certificate.
    -   `verify-full`: Connection must use TLS and the server certificate must be valid according to `server_tls_ca_file`. The server hostname must match the hostname in the certificate.

server\_tls\_ca\_file
Root certificate file used to validate WarehousePG and PostgreSQL server certificates.

Default: unset

server\_tls\_key\_file
Private key for PgBouncer to authenticate against WarehousePG or PostgreSQL server.

Default: not set

server\_tls\_cert\_file
Certificate for private key. WarehousePG or PostgreSQL servers can validate it.

Default: not set

server\_tls\_protocols
Which TLS protocol versions are allowed. Allowed values: `tlsv1.0`, `tlsv1.1`, `tlsv1.2`, `tlsv1.3`. Shortcuts: `all` \(`tlsv1.0`, `tlsv1.1`, `tlsv1.2`, `tlsv1.3`\); `secure` \(`tlsv1.2`, `tlsv1.3`\); `legacy` \(`all`\).

Default: `secure`

server\_tls\_ciphers
Allowed TLS ciphers, in OpenSSL syntax. Shortcuts: `default`/`secure`, `compat`/`legacy`, `insecure`/`all`, `normal`, `fast`.

    Only connections using TLS version 1.2 and lower are affected. There is currently no setting that controls the cipher choices used by TLS version 1.3 connections.

    Default: `fast`

### <a id="dangtimeouts"></a>Dangerous Timeouts

Setting the following timeouts can cause unexpected errors.

query\_timeout
Queries running longer than this \(seconds\) are canceled. This parameter should be used only with a slightly smaller server-side `statement_timeout`, to apply only for network problems. \[seconds\]

    Default: 0.0 \(deactivated\)

query\_wait\_timeout
The maximum time, in seconds, queries are allowed to wait for execution. If the query is not assigned to a server during that time, the client is disconnected. This is used to prevent unresponsive servers from grabbing up connections. \[seconds\]

    Default: 120

cancel\_wait\_timeout
The maximum time, in seconds, cancellation requests are allowed to spend waiting for execution. If the cancel request is not assigned to a server during that time, the client is disconnected. A value of 0 disables the timeout. If it is disabled, cancel requests will be queued indefinitely.

This setting is used to prevent a client locking up when a cancel cannot be forwarded due to the server being down.

Default: 10.0

client\_idle\_timeout
Client connections idling longer than this many seconds are closed. This should be larger than the client-side connection lifetime settings, and only used for network problems. \[seconds\]

    Default: 0.0 \(deactivated\)

idle\_transaction\_timeout
If client has been in "idle in transaction" state longer than this \(seconds\), it is disconnected. \[seconds\]

    Default: 0.0 \(deactivated\)

suspend\_timeout
How many seconds to wait for buffer flush during `SUSPEND` or reboot (`-R`). A connection is dropped if the flush does not succeed.

    Default: 10


### <a id="llnet"></a>Low-level Network Settings

pkt\_buf
Internal buffer size for packets. Affects the size of TCP packets sent and general memory usage. Actual `libpq` packets can be larger than this so there is no need to set it large.

    Default: 4096

max\_packet\_size
Maximum size for packets that PgBouncer accepts. One packet is either one query or one result set row. A full result set can be larger.

    Default: 2147483647

listen\_backlog
Backlog argument for the `listen(2)` system call. It determines how many new unanswered connection attempts are kept in queue. When the queue is full, further new connection attempts are dropped.

    Default: 128

sbuf\_loopcnt
How many times to process data on one connection, before proceeding. Without this limit, one connection with a big result set can stall PgBouncer for a long time. One loop processes one `pkt_buf` amount of data. 0 means no limit.

    Default: 5

so\_reuseport
Specifies whether to set the socket option `SO_REUSEPORT` on TCP listening sockets. On some operating systems, this allows running multiple PgBouncer instances on the same host listening on the same port and having the kernel distribute the connections automatically. This option is a way to get PgBouncer to use more CPU cores. \(PgBouncer is single-threaded and uses one CPU core per instance.\)

    The behavior in detail depends on the operating system kernel. As of this writing, this setting has the desired effect on (sufficiently recent versions of) Linux, DragonFlyBSD, and FreeBSD. (On FreeBSD, it applies the socket option `SO_REUSEPORT_LB` instead.). Some other operating systems support the socket option but it won't have the desired effect: It will allow multiple processes to bind to the same port but only one of them will get the connections. See your operating system's `setsockopt()` documentation for details.

    On systems that don’t support the socket option at all, turning this setting on will result in an error.

    Each PgBouncer instance on the same host needs different settings for at least `unix_socket_dir` and `pidfile`, as well as `logfile` if that is used. Also note that if you make use of this option, you can no longer connect to a specific PgBouncer instance via TCP/IP, which might have implications for monitoring and metrics collection.

    Default: 0

tcp\_defer\_accept
For details on this and other TCP options, please see the tcp\(7\) man page.

    Default: 45 on Linux, otherwise 0

tcp\_socket\_buffer
Default: not set

tcp\_keepalive
Turns on basic keepalive with OS defaults.

    On Linux, the system defaults are `tcp_keepidle=7200`, `tcp_keepintvl=75`, `tcp_keepcnt=9`. They are probably similar on other operating systems.

    Default: 1

tcp\_keepcnt
Default: not set

tcp\_keepidle
Default: not set

tcp\_keepintvl
Default: not set

tcp\_user\_timeout
Sets the `TCP_USER_TIMEOUT` socket option. This specifies the maximum amount of time in milliseconds that transmitted data may remain unacknowledged before the TCP connection is forcibly closed. If set to `0`, then the operating system’s default is used.

 Default: 0

## <a id="topic_lzk_zjd_gs"></a>\[users\] Section

This section contains `key`=`value` pairs, where the `key` is a user name and the `value` is a `libpq` connect-string list of `key`=`value` pairs of configuration settings specific for this user. Only a few settings are available here.

pool\_mode
Set the pool mode for all connections from this user. If not set, the database or default `pool_mode` is used.

max\_user\_connection
Configure a maximum for the user (i.e. all pools with the user will not have more than this many server connections).

For example:

```
[users]

user1 = pool_mode=transaction max_user_connections=10
```

## <a id="topic_peers"></a>\[peers\] Section

This section defines the peers that PgBouncer can forward cancellation requests to and where those cancellation requests will be routed.

PgBouncer processes can be peered together in a group by defining a `peer_id` value and a `[peers]` section in the configurations of all the PgBouncer processes. These PgBouncer processes can then forward cancellations requests to the process that it originated from. This is needed to make cancellations work when multiple PgBouncer processes, possibly on different servers, are behind the same TCP load balancer. Cancellation requests are sent over different TCP connections than the query they are cancelling, so a TCP load balancer might send the cancellation request connection to a different process than the one that it was meant for. By peering them these cancellation requests eventually end up at the right process.

The section contains key=value lines like

```
peer_id = connection string
```

Where the key will be taken as a `peer_id` and the value as a connection string, consisting of key=value pairs of connection parameters, described below (similar to `libpq`, but the actual `libpq` is not used and the set of available features is different). For example:

```
1 = host=host1.example.com
2 = host=/tmp/pgbouncer-2  port=5555
```

Note that for peering to work, the `peer_id` of each PgBouncer process in the group must be unique within the peered group. And the `[peers]` section should contain entries for each of those peer ids. It is allowed, but not necessary, for the i`[peers]` section to contain the `peer_id` of the PgBouncer that the configuration is for. Such an entry will be ignored, but it is allowed to make configuration management easy, because it allows using the exact same `[peers]` section for multiple configurations.

Note that cross-version peering is supported as long as all peers are on running 1.21.0 version or higher. In 1.21.0 some breaking changes were made in how we encode the cancellation tokens that made them incompatible with the ones created by earlier versions.

host
Host name or IP address to connect to. Host names are resolved at connection time, the result is cached per the `dns_max_ttl` parameter. If DNS returns several results, they are used in a round-robin manner. But in general it is not recommended to use a hostname that resolves to multiple IPs, because then the cancel request might still be forwarded to the wrong node and it would need to be forwarded again (which is only allowed up to three times).

If the value begins with `/`, a Unix socket in the file-system namespace is used. If the value begins with `@`, a Unix socket in the abstract namespace is used.

Examples:

    ```
    host=localhost
    host=127.0.0.1
    host=2001:0db8:85a3:0000:0000:8a2e:0370:7334
    host=/var/run/pgbouncer-1
    ```

port
The port to connect to.
Default: 6432

pool_size
Set the maximum number of cancel requests that can be in flight to the peer at the same time. It is quite normal for cancel requests to arrive in bursts, for example, when the backing Postgres server slows down. So it is important for `pool_size` to not be so low that it cannot handle these bursts.

If not set, the `default_pool_size` is used.

## <a id="topic_xw4_dtc_gs"></a>Example Configuration Files

**Minimal Configuration**

```
[databases]
postgres = host=127.0.0.1 dbname=postgres auth_user=gpadmin

[pgbouncer]
pool_mode = session
listen_port = 6543
listen_addr = 127.0.0.1
auth_type = md5
auth_file = users.txt
logfile = pgbouncer.log
pidfile = pgbouncer.pid
admin_users = someuser
stats_users = stat_collector

```

Use connection parameters passed by the client:

```
[databases]
* =

[pgbouncer]
listen_port = 6543
listen_addr = 0.0.0.0
auth_type = trust
auth_file = bouncer/users.txt
logfile = pgbouncer.log
pidfile = pgbouncer.pid
ignore_startup_parameters=options
```

**Database Defaults**

```
[databases]

; foodb over unix socket
foodb =

; redirect bardb to bazdb on localhost
bardb = host=127.0.0.1 dbname=bazdb

; access to destination database will go with single user
forcedb = host=127.0.0.1 port=300 user=baz password=foo client_encoding=UNICODE datestyle=ISO

```

Example of a secure function for `auth_query`:

``` sql
CREATE OR REPLACE FUNCTION pgbouncer.user_lookup(in i_username text, out uname text, out phash text)
RETURNS record AS $$
BEGIN
    SELECT usename, passwd FROM pg_catalog.pg_shadow
    WHERE usename = i_username INTO uname, phash;
    RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
REVOKE ALL ON FUNCTION pgbouncer.user_lookup(text) FROM public, pgbouncer;
GRANT EXECUTE ON FUNCTION pgbouncer.user_lookup(text) TO pgbouncer;
```

Example configuration for two peered PgBouncer processes to create a multi-core PgBouncer setup using `so_reuseport`. The configuration for the first process is:

```
[databases]
postgres = host=localhost dbname=postgres

[peers]
1 = host=/tmp/pgbouncer1
2 = host=/tmp/pgbouncer2

[pgbouncer]
listen_addr=127.0.0.1
auth_file=auth_file.conf
so_reuseport=1
unix_socket_dir=/tmp/pgbouncer1
peer_id=1
```

The configuration for the second process is:

```
[databases]
postgres = host=localhost dbname=postgres

[peers]
1 = host=/tmp/pgbouncer1
2 = host=/tmp/pgbouncer2

[pgbouncer]
listen_addr=127.0.0.1
auth_file=auth_file.conf
so_reuseport=1
; only unix_socket_dir and peer_id are different
unix_socket_dir=/tmp/pgbouncer2
peer_id=2
```

## <a id="seealso"></a>See Also

[pgbouncer](pgbouncer.html), [pgbouncer-admin](pgbouncer-admin.html), [PgBouncer Configuration Page](https://pgbouncer.github.io/config.html)

