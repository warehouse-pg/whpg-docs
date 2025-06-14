# Configuration Parameters 

Descriptions of the WarehousePG server configuration parameters listed alphabetically.

## <a id="application_name"></a>application\_name 

Sets the application name for a client session. For example, if connecting via `psql`, this will be set to `psql`. Setting an application name allows it to be reported in log messages and statistics views.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string| |coordinator, session, reload|

## <a id="array_nulls"></a>array\_nulls 

This controls whether the array input parser recognizes unquoted NULL as specifying a null array element. By default, this is on, allowing array values containing null values to be entered. WarehousePG versions before 3.0 did not support null values in arrays, and therefore would treat NULL as specifying a normal array element with the string value 'NULL'.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="authentication_timeout"></a>authentication\_timeout 

Maximum time to complete client authentication. This prevents hung clients from occupying a connection indefinitely.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Any valid time expression \(number and unit\)|1min|local, system, restart|

## <a id="autovacuum"></a>autovacuum 

When enabled, WarehousePG starts up the autovacuum daemon, which operates at the database level. When the daemon is running, WarehousePG:

- Automatically vacuums catalog tables and possibly auxiliary tables (determined by the [gp_autovacuum_scope](#gp_autovacuum_scope) configuration parameter setting).
- Automatically analyzes the vacuumed tables.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, system, restart|

## <a id="autovacuum_analyze_scale_factor"></a>autovacuum_analyze_scale_factor

Specifies a fraction of the table size to add to `autovacuum_analyze_threshold` when deciding whether or not to trigger an `ANALYZE`. The default is 0.1 (10% of table size). This parameter may be set only in the `postgresql.conf file` or on the server command line; but the setting can be overridden for individual tables by changing table storage parameters.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Floating point|0.1|coordinator, system, restart|

## <a id="autovacuum_analyze_threshold"></a>autovacuum_analyze_threshold

Specifies the minimum number of inserted, updated or deleted tuples needed to trigger an `ANALYZE` in any one table. The default is 50 tuples. This parameter may be set only in the `postgresql.conf` file or on the server command line; but the setting can be overridden for individual tables by changing table storage parameters.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Integer|50|coordinator, system, restart|

## <a id="autovacuum_freeze_max_age"></a>autovacuum_freeze_max_age

Specifies the maximum age at which to automatically vacuum a table to prevent transaction ID wraparound. Note that the system will launch autovacuum processes to prevent wraparound even when `autovacuum=off`. The default value is 200 million transactions. 

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|100000 < integer < 2000000000|200000000|local, system, restart|

## <a id="autovacuum_max_workers"></a>autovacuum_max_workers

Specifies the maximum number of autovacuum processes (other than the autovacuum launcher) that may be running at any one time. The default is three. This parameter may be set only at server start.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Integer|3|coordinator, system, restart|

## <a id="autovacuum_multixact_freeze_max_age"></a>autovacuum_multixact_freeze_max_age

Specifies the maximum age (in multixacts) that a table's `pg_class.relminmxid` field can attain before a `VACUUM` operation is forced to prevent multixact ID wraparound within the table. Note that the system will launch autovacuum processes to prevent wraparound even when autovacuum is otherwise disabled.

Vacuuming multixacts also allows removal of old files from the `pg_multixact/members` and `pg_multixact/offsets subdirectories`, which is why the default is a relatively low 400 million multixacts. This parameter may be set only at server start, but the setting can be reduced for individual tables by changing table storage parameters.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Integer|400000000|coordinator, system, restart|

## <a id="autovacuum_naptime"></a>autovacuum\_naptime

When `autovacuum=on` (the default), specifies the minimum delay between autovacuum runs. In each round, the daemon issues `VACUUM` and `ANALYZE` commands as needed for catalog (and possibly auxiliary) tables.

A value without units is taken to be seconds. The default is one minute.

This parameter may be set only in the `postgresql.conf` file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1 < integer < INT_MAX/1000 | 60 |coordinator, system, restart|

## <a id="autovacuum_vacuum_cost_delay"></a>autovacuum_vacuum_cost_delay

Specifies the cost delay value in milliseconds for automatic vacuum operations. If set to -1, the value of this parameter is the set by [`vacuum_cost_delay`](#vacuum_cost_delay).

A value without units is taken to be milliseconds. The default is 2 milliseconds. This parameter may be set only in the `postgresql.conf` file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
| floating point < 100 | 2 |local, system, reload|

## <a id="autovacuum_vacuum_cost_limit"></a>autovacuum_vacuum_cost_limit

Specifies the cost limit value that will be used in automatic `VACUUM` operations. If -1 is specified (which is the default), the regular `vacuum_cost_limit` value will be used. Note that the value is distributed proportionally among the running autovacuum workers, if there is more than one, so that the sum of the limits for each worker does not exceed the value of this variable. This parameter may be set only in the `postgresql.conf` file or on the server command line; but the setting can be overridden for individual tables by changing table storage parameters.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
| Integer | -1 |local, system, reload|

## <a id="autovacuum_vacuum_scale_factor"></a>autovacuum_vacuum_scale_factor

Specifies a fraction of the table size to add to [`autovacuum_vacuum_threshold`](#autovacuum_vacuum_threshold) when deciding whether to trigger a `VACUUM`. The default is 0.2 (20% of table size). This parameter may be set only in the `postgresql.conf` file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
| floating point (%) | 0.05 |local, system, reload|

## <a id="autovacuum_vacuum_threshold"></a>autovacuum_vacuum_threshold

Specifies the minimum number of updated or deleted tuples needed to trigger a `VACUUM` in any one table. The default is 50 tuples. This parameter can only be set in the postgresql.conf file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
| 0 < integer < INT_MAX | 500 |local, system, reload|

## <a id="backslash_quote"></a>backslash\_quote 

This controls whether a quote mark can be represented by \\' in a string literal. The preferred, SQL-standard way to represent a quote mark is by doubling it \(''\) but PostgreSQL has historically also accepted \\'. However, use of \\' creates security risks because in some client character set encodings, there are multibyte characters in which the last byte is numerically equivalent to ASCII \\.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|on \(allow \\' always\), off \(reject always\), safe\_encoding \(allow only if client encoding does not allow ASCII \\ within a multibyte character\)|safe\_encoding|coordinator, session, reload|

## <a id="block_size"></a>block\_size 

Reports the size of a disk block.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of bytes|32768|read only|

## <a id="bonjour_name"></a>bonjour\_name 

Specifies the Bonjour broadcast name. By default, the computer name is used, specified as an empty string. This option is ignored if the server was not compiled with Bonjour support.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string|unset|coordinator, system, restart|

## <a id="check_function_bodies"></a>check\_function\_bodies 

When set to off, deactivates validation of the function body string during `CREATE FUNCTION`. Deactivating validation is occasionally useful to avoid problems such as forward references when restoring function definitions from a dump.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="checkpoint_completion_target"></a>checkpoint\_completion\_target

Specifies the target of checkpoint completion, as a fraction of the total time between checkpoints. The default is `0.5`.

You can set this parameter only in the `postgresql.conf` file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0.0 - 1.0 (floating point) |0.5|local, system, reload|

## <a id="checkpoint_flush_after"></a>checkpoint\_flush\_after

Specifies the number of pages after which WarehousePG flushes previously performed writes to disk. Whenever more than the specified amount of data has been written while performing a checkpoint, WarehousePG attempts to force the operating system to issue these writes to the underlying storage. Doing so limits the amount of dirty data in the kernel's page cache, reducing the likelihood of stalls when an `fsync` is issued at the end of the checkpoint, or when the OS writes data back in larger batches in the background. Often that results in greatly reduced transaction latency, but note that there are some cases where performance may degrade, especially with workloads that are bigger than [shared\_buffers](#shared_buffers), but smaller than the OS's page cache.

If you specify this value without units, it is taken as blocks, that is `BLCKSZ` bytes (typically 32kB). The valid range is between `0`, which disables forced writeback, and `256`. The default is `32`.

You can set this parameter only in the `postgresql.conf` file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - 256 (integer)|32|local, system, reload|

## <a id="checkpoint_timeout"></a>checkpoint\_timeout

Specifies the maximum time between automatic WAL checkpoints.

If you specify this value without units, it is taken as seconds. The valid range is between 30 seconds and one day. The default value is five minutes (`5min` or `300`).

Increasing this parameter can increase the amount of time needed for crash recovery.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|30 - 86400 (integer) |300|local, system, reload|

## <a id="checkpoint_warning"></a>checkpoint\_warning

Enables warnings if checkpoint segments are filled more frequently than the specified value. WarehousePG writes a message to the server log if checkpoints caused by the filling of WAL segment files happen closer together than this amount of time (which suggests that you should raise [max_wal_size](#max_wal_size)).

If you specify this value without units, it is taken as seconds. The default is 30 seconds (`30`). The value zero (`0`) disables the warning.

WarehousePG generates no warnings if [checkpoint_timeout](#checkpoint_timeout) is less than `checkpoint_warning`.

You can set this parameter only in the `postgresql.conf` file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - `INT_MAX` (integer) |30|local, system, reload|

## <a id="client_connection_check_interval"></a>client\_connection\_check\_interval 

Sets the time interval between optional checks that the client is still connected, while running queries. 0 deactivates connection checks.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of milliseconds|0|coordinator, session, reload|

## <a id="client_encoding"></a>client\_encoding 

Sets the client-side encoding \(character set\). The default is to use the same as the database encoding. See [Supported Character Sets](https://www.postgresql.org/docs/12/multibyte.html#MULTIBYTE-CHARSET-SUPPORTED) in the PostgreSQL documentation.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|character set|UTF8|coordinator, session, reload|

## <a id="client_min_messages"></a>client\_min\_messages 

Controls which message levels are sent to the client. Each level includes all the levels that follow it. The later the level, the fewer messages are sent.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|DEBUG5, DEBUG4, DEBUG3, DEBUG2, DEBUG1, LOG, NOTICE, WARNING, ERROR, FATAL, PANIC|NOTICE|coordinator, session, reload|

`INFO` level messages are always sent to the client.

## <a id="cpu_index_tuple_cost"></a>cpu\_index\_tuple\_cost 

For the Postgres-based planner, sets the estimate of the cost of processing each index row during an index scan. This is measured as a fraction of the cost of a sequential page fetch.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|0.005|coordinator, session, reload|

## <a id="cpu_operator_cost"></a>cpu\_operator\_cost 

For the Postgres-based planner, sets the estimate of the cost of processing each operator in a WHERE clause. This is measured as a fraction of the cost of a sequential page fetch.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|0.0025|coordinator, session, reload|

## <a id="cpu_tuple_cost"></a>cpu\_tuple\_cost 

For the Postgres-based planner, Sets the estimate of the cost of processing each row during a query. This is measured as a fraction of the cost of a sequential page fetch.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|0.01|coordinator, session, reload|

## <a id="cursor_tuple_fraction"></a>cursor\_tuple\_fraction 

Tells the Postgres-based planner how many rows are expected to be fetched in a cursor query, thereby allowing the Postgres-based planner to use this information to optimize the query plan. The default of 1 means all rows will be fetched.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|1|coordinator, session, reload|

## <a id="data_checksums"></a>data\_checksums 

Reports whether checksums are enabled for heap data storage in the database system. Checksums for heap data are enabled or deactivated when the database system is initialized and cannot be changed.

Heap data pages store heap tables, catalog tables, indexes, and database metadata. Append-optimized storage has built-in checksum support that is unrelated to this parameter.

WarehousePG uses checksums to prevent loading data corrupted in the file system into memory managed by database processes. When heap data checksums are enabled, WarehousePG computes and stores checksums on heap data pages when they are written to disk. When a page is retrieved from disk, the checksum is verified. If the verification fails, an error is generated and the page is not permitted to load into managed memory.

If the `ignore_checksum_failure` configuration parameter has been set to on, a failed checksum verification generates a warning, but the page is allowed to be loaded into managed memory. If the page is then updated, it is flushed to disk and replicated to the mirror. This can cause data corruption to propagate to the mirror and prevent a complete recovery. Because of the potential for data loss, the `ignore_checksum_failure` parameter should only be enabled when needed to recover data. See [ignore\_checksum\_failure](#ignore_checksum_failure) for more information.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|read only|

## <a id="DateStyle"></a>DateStyle 

Sets the display format for date and time values, as well as the rules for interpreting ambiguous date input values. This variable contains two independent components: the output format specification and the input/output specification for year/month/day ordering.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|<format\>, <date style\><br/><br/>where:<br/><br/><format\> is ISO, Postgres, SQL, or German<br/><br/><date style\> is DMY, MDY, or YMD|ISO, MDY|coordinator, session, reload|

## <a id="db_user_namespace"></a>db\_user\_namespace 

This enables per-database user names. If on, you should create users as *username@dbname*. To create ordinary global users, simply append @ when specifying the user name in the client.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|local, system, restart|

## <a id="deadlock_timeout"></a>deadlock\_timeout 

The time to wait on a lock before checking to see if there is a deadlock condition. On a heavily loaded server you might want to raise this value. Ideally the setting should exceed your typical transaction time, so as to improve the odds that a lock will be released before the waiter decides to check for deadlock.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Any valid time expression \(number and unit\)|1s|local, system, restart|

## <a id="debug_assertions"></a>debug\_assertions 

Turns on various assertion checks.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|local, system, restart|

## <a id="debug_pretty_print"></a>debug\_pretty\_print 

Indents debug output to produce a more readable but much longer output format. *client\_min\_messages* or *log\_min\_messages* must be DEBUG1 or lower.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="debug_print_parse"></a>debug\_print\_parse 

For each query run, prints the resulting parse tree. *client\_min\_messages* or *log\_min\_messages* must be DEBUG1 or lower.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="debug_print_plan"></a>debug\_print\_plan 

For each query run, prints the WarehousePG parallel query execution plan. *client\_min\_messages* or *log\_min\_messages* must be DEBUG1 or lower.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="debug_print_prelim_plan"></a>debug\_print\_prelim\_plan 

For each query run, prints the preliminary query plan. *client\_min\_messages* or *log\_min\_messages* must be DEBUG1 or lower.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="debug_print_rewritten"></a>debug\_print\_rewritten 

For each query run, prints the query rewriter output. *client\_min\_messages* or *log\_min\_messages* must be DEBUG1 or lower.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="debug_print_slice_table"></a>debug\_print\_slice\_table 

For each query run, prints the WarehousePG query slice plan. *client\_min\_messages* or *log\_min\_messages* must be DEBUG1 or lower.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="debug_shareinput_xslice"></a>debug_shareinput_xslice

Prints cross-slice share input scan information to the server log.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload, superuser|

## <a id="default_statistics_target"></a>default\_statistics\_target 

Sets the default statistics sampling target \(the number of values that are stored in the list of common values\) for table columns that have not had a column-specific target set via `ALTER TABLE SET STATISTICS`. Larger values may improve the quality of the Postgres-based planner estimates, particularly for columns with irregular data distributions, at the expense of consuming more space in `pg_statistic` and slightly more time to compute the estimates. Conversely, a lower limit might be sufficient for columns with simple data distributions. The default is 100.

For more information on the use of statistics by the Postgres-based planner, refer to [Statistics Used by the Planner](https://www.postgresql.org/docs/12/planner-stats.html) in the PostgreSQL documentation.


|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 \> Integer \> 10000|100|coordinator, session, reload|

## <a id="default_table_access_method"></a>default_table_access_method

Sets the default table access method when a `CREATE TABLE` command does not explicitly specify an access method.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|heap, ao_row, ao_column|heap|coordinator, session|

## <a id="default_tablespace"></a>default\_tablespace 

The default tablespace in which to create objects \(tables and indexes\) when a `CREATE` command does not explicitly specify a tablespace.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|name of a tablespace|unset|coordinator, session, reload|

## <a id="default_text_search_config"></a>default\_text\_search\_config 

Selects the text search configuration that is used by those variants of the text search functions that do not have an explicit argument specifying the configuration. See [Using Full Text Search](../../admin_guide/textsearch/full-text-search.html#full-text-search) for further information. The built-in default is `pg_catalog.simple`, but `initdb` will initialize the configuration file with a setting that corresponds to the chosen `lc_ctype` locale, if a configuration matching that locale can be identified.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|The name of a text search configuration.|`pg_catalog.simple`|coordinator, session, reload|

## <a id="default_transaction_deferrable"></a>default\_transaction\_deferrable 

When running at the `SERIALIZABLE` isolation level, a deferrable read-only SQL transaction may be delayed before it is allowed to proceed. However, once it begins running it does not incur any of the overhead required to ensure serializability; so serialization code will have no reason to force it to abort because of concurrent updates, making this option suitable for long-running read-only transactions.

This parameter controls the default deferrable status of each new transaction. It currently has no effect on read-write transactions or those operating at isolation levels lower than `SERIALIZABLE`. The default is `off`.

> **Note** Setting `default_transaction_deferrable` to `on` has no effect in WarehousePG. Only read-only, `SERIALIZABLE` transactions can be deferred. However, WarehousePG does not support the `SERIALIZABLE` transaction isolation level. See [SET TRANSACTION](../sql_commands/SET_TRANSACTION.html).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="default_transaction_isolation"></a>default\_transaction\_isolation 

Controls the default isolation level of each new transaction. WarehousePG treats `read uncommitted` the same as `read committed`, and treats `serializable` the same as `repeatable read`.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|read committed, read uncommitted, repeatable read, serializable|read committed|coordinator, session, reload|

## <a id="default_transaction_read_only"></a>default\_transaction\_read\_only 

Controls the default read-only status of each new transaction. A read-only SQL transaction cannot alter non-temporary tables.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="dynamic_library_path"></a>dynamic\_library\_path 

If a dynamically loadable module needs to be opened and the file name specified in the `CREATE FUNCTION` or `LOAD` command does not have a directory component \(i.e. the name does not contain a slash\), the system will search this path for the required file. The compiled-in PostgreSQL package library directory is substituted for $libdir. This is where the modules provided by the standard PostgreSQL distribution are installed.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|a list of absolute directory paths separated by colons|$libdir|local, system, reload|

## <a id="effective_cache_size"></a>effective\_cache\_size 

Sets the assumption about the effective size of the disk cache that is available to a single query for the Postgres-based planner. This is factored into estimates of the cost of using an index; a higher value makes it more likely index scans will be used, a lower value makes it more likely sequential scans will be used. When setting this parameter, you should consider both WarehousePG's shared buffers and the portion of the kernel's disk cache that will be used for data files \(though some data might exist in both places\). Take also into account the expected number of concurrent queries on different tables, since they will have to share the available space. This parameter has no effect on the size of shared memory allocated by a WarehousePG server instance, nor does it reserve kernel disk cache; it is used only for estimation purposes.

Set this parameter to a number of [block\_size](#backslash_quote) blocks \(default 32K\) with no units; for example, `262144` for 8GB. You can also directly specify the size of the effective cache; for example, `'1GB'` specifies a size of 32768 blocks. The `gpconfig` utility and `SHOW` command display the effective cache size value in units such as 'GB', 'MB', or 'kB'.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1 - INT\_MAX *or* number and unit|524288 \(16GB\)|coordinator, session, reload|

## <a id="enable_bitmapscan"></a>enable\_bitmapscan 

 Activates or deactivates  the use of bitmap-scan plan types by the Postgres-based planner. Note that this is different than a Bitmap Index Scan. A Bitmap Scan means that indexes will be dynamically converted to bitmaps in memory when appropriate, giving faster index performance on complex queries against very large tables. It is used when there are multiple predicates on different indexed columns. Each bitmap per column can be compared to create a final list of selected tuples.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="enable_groupagg"></a>enable\_groupagg 

 Activates or deactivates  the use of group aggregation plan types by the Postgres-based planner.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="enable_hashagg"></a>enable\_hashagg 

 Activates or deactivates  the use of hash aggregation plan types by the Postgres-based planner.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="enable_hashjoin"></a>enable\_hashjoin 

 Activates or deactivates  the use of hash-join plan types by the Postgres-based planner.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="enable_indexscan"></a>enable\_indexscan 

 Activates or deactivates  the use of index-scan plan types by the Postgres-based planner.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="enable_mergejoin"></a>enable\_mergejoin 

 Activates or deactivates  the use of merge-join plan types by the Postgres-based planner. Merge join is based on the idea of sorting the left- and right-hand tables into order and then scanning them in parallel. So, both data types must be capable of being fully ordered, and the join operator must be one that can only succeed for pairs of values that fall at the 'same place' in the sort order. In practice this means that the join operator must behave like equality.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="enable_nestloop"></a>enable\_nestloop 

 Activates or deactivates  the use of nested-loop join plans by the Postgres-based planner. It's not possible to suppress nested-loop joins entirely, but turning this variable off discourages the Postgres-based planner from using one if there are other methods available.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="enable_partition_pruning"></a>enable_partition_pruning 

 Enables or disables the query planner's ability to eliminate a partitioned table's partitions from query plans. This also controls the planner's ability to generate query plans which allow the query executor to remove (ignore) partitions during query execution. 

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|


## <a id="enable_seqscan"></a>enable\_seqscan 

 Activates or deactivates  the use of sequential scan plan types by the Postgres-based planner. It's not possible to suppress sequential scans entirely, but turning this variable off discourages the Postgres-based planner from using one if there are other methods available.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="enable_sort"></a>enable\_sort 

 Activates or deactivates  the use of explicit sort steps by the Postgres-based planner. It's not possible to suppress explicit sorts entirely, but turning this variable off discourages the Postgres-based planner from using one if there are other methods available.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="enable_tidscan"></a>enable\_tidscan 

 Activates or deactivates  the use of tuple identifier \(TID\) scan plan types by the Postgres-based planner.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="escape_string_warning"></a>escape\_string\_warning 

When on, a warning is issued if a backslash \(\\\) appears in an ordinary string literal \('...' syntax\). Escape string syntax \(E'...'\) should be used for escapes, because in future versions, ordinary strings will have the SQL standard-conforming behavior of treating backslashes literally.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="explain_pretty_print"></a>explain\_pretty\_print 

Determines whether EXPLAIN VERBOSE uses the indented or non-indented format for displaying detailed query-tree dumps.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="extra_float_digits"></a>extra\_float\_digits 

Adjusts the number of digits displayed for floating-point values, including float4, float8, and geometric data types. The parameter value is added to the standard number of digits. The value can be set as high as 3, to include partially-significant digits; this is especially useful for dumping float data that needs to be restored exactly. Or it can be set negative to suppress unwanted digits.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \(-15 to 3\)|0|coordinator, session, reload|

## <a id="from_collapse_limit"></a>from\_collapse\_limit 

The Postgres-based planner will merge sub-queries into upper queries if the resulting FROM list would have no more than this many items. Smaller values reduce planning time but may yield inferior query plans.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1-*n*|20|coordinator, session, reload|

## <a id="gin_pending_list_limit"></a>gin\_pending\_list\_limit

Sets the maximum size of a GIN index's pending list, which is used when `fastupdate` is enabled. If the list grows larger than this maximum size, it is cleaned up by moving the entries in it to the index's main GIN data structure in bulk.

A value specified without units is taken to be kilobytes. The default is four megabytes (4MB).

You can override this setting for individual GIN indexes by changing index storage parameters.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|64 - `MAX_KILOBYTES` |4096|coordinator, session, reload|

## <a id="gp_adjust_selectivity_for_outerjoins"></a>gp\_adjust\_selectivity\_for\_outerjoins 

Enables the selectivity of NULL tests over outer joins.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_appendonly_compaction"></a>gp\_appendonly\_compaction 

Enables compacting segment files during `VACUUM` commands. When deactivated, `VACUUM` only truncates the segment files to the EOF value, as is the current behavior. The administrator may want to deactivate compaction in high I/O load situations or low space situations.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_appendonly_compaction_threshold"></a>gp\_appendonly\_compaction\_threshold 

Specifies the threshold ratio \(as a percentage\) of hidden rows to total rows that triggers compaction of the segment file when VACUUM is run without the FULL option \(a lazy vacuum\). If the ratio of hidden rows in a segment file on a segment is less than this threshold, the segment file is not compacted, and a log message is issued.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \(%\)|10|coordinator, session, reload|

## <a id="gp_autostats_allow_nonowner"></a>gp\_autostats\_allow\_nonowner 

The `gp_autostats_allow_nonowner` server configuration parameter determines whether or not to allow WarehousePG to trigger automatic statistics collection when a table is modified by a non-owner.

The default value is `false`; WarehousePG does not trigger automatic statistics collection on a table that is updated by a non-owner.

When set to `true`, WarehousePG will also trigger automatic statistics collection on a table when:

-   `gp_autostats_mode=on_change` and the table is modified by a non-owner.
-   `gp_autostats_mode=on_no_stats` and the first user to `INSERT` or `COPY` into the table is a non-owner.

The `gp_autostats_allow_nonowner` configuration parameter can be changed only by a superuser.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload, superuser|

## <a id="gp_autostats_lock_wait"></a>gp_autostats_lock_wait 

The `gp_autostats_lock_wait` server configuration parameter allows you to control whether `ANALYZE` commands triggered by autostats collection will block if they cannot acquire the table lock.

The default value is `off`; `ANALYZE` commands will attempt locks on tables and, if unsuccessful, will proceed without possession of the table lock. 

Keeping this parameter turned off will prevent deadlocks and make automatic statistics collection sessions finish in a more timely and predictable fashion.

When set to `on`, the `ANALYZE` command will block until the table lock is acquired.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, session, reload|

## <a id="gp_autostats_mode"></a>gp\_autostats\_mode 

Specifies the mode for triggering automatic statistics collection with `ANALYZE`. The `on_no_stats` option triggers statistics collection for `CREATE TABLE AS SELECT`, `INSERT`, or `COPY` operations on any table that has no existing statistics.

The `on_change` option triggers statistics collection only when the number of rows affected exceeds the threshold defined by `gp_autostats_on_change_threshold`. Operations that can trigger automatic statistics collection with `on_change` are:

`CREATE TABLE AS SELECT`

`UPDATE`

`DELETE`

`INSERT`

`COPY`

Default is `none`.

> **Note** For partitioned tables, automatic statistics collection is not triggered if data is inserted from the top-level parent table of a partitioned table.

Automatic statistics collection is triggered if data is inserted directly in a leaf table \(where the data is stored\) of the partitioned table. Statistics are collected only on the leaf table.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|none, on\_change, none, |on\_no\_ stats|coordinator, session, reload|

## <a id="gp_autostats_mode_in_functions"></a>gp\_autostats\_mode\_in\_functions 

Specifies the mode for triggering automatic statistics collection with `ANALYZE` for statements in procedural language functions. The `none` option deactivates statistics collection. The `on_no_stats` option triggers statistics collection for `CREATE TABLE AS SELECT`, `INSERT`, or `COPY` operations that are run in functions on any table that has no existing statistics.

The `on_change` option triggers statistics collection only when the number of rows affected exceeds the threshold defined by `gp_autostats_on_change_threshold`. Operations in functions that can trigger automatic statistics collection with `on_change` are:

`CREATE TABLE AS SELECT`

`UPDATE`

`DELETE`

`INSERT`

`COPY`

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|none, on\_change, on\_no\_stats, |none|coordinator, session, reload|

## <a id="gp_autostats_on_change_threshold"></a>gp\_autostats\_on\_change\_threshold 

Specifies the threshold for automatic statistics collection when `gp_autostats_mode` is set to `on_change`. When a triggering table operation affects a number of rows exceeding this threshold, `ANALYZE` is added and statistics are collected for the table.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|2147483647|coordinator, session, reload|

## <a id="gp_autovacuum_scope"></a>gp\_autovacuum\_scope

When `autovacuum=on` (the default), specifies the types of tables that are eligible for automatic vacuuming of dead tuples. WarehousePG supports two `gp_autovacuum_scope` values:

- `catalog` - WarehousePG autovacuums catalog tables only (`pg_catalog` relations).
- `catalog_ao_aux` - WarehousePG autovacuums catalog tables and append-optimized auxiliary tables (`pg_catalog`, `pg_toast`, and `pg_aoseg` relations).

Only superusers can change this setting.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|catalog, catalog_ao_aux | catalog |coordinator, system, reload|

## <a id="gp_cached_segworkers_threshold"></a>gp\_cached\_segworkers\_threshold 

When a user starts a session with WarehousePG and issues a query, the system creates groups or 'gangs' of worker processes on each segment to do the work. After the work is done, the segment worker processes are destroyed except for a cached number which is set by this parameter. A lower setting conserves system resources on the segment hosts, but a higher setting may improve performance for power-users that want to issue many complex queries in a row.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \> 0|5|coordinator, session, reload|

## <a id="gp_command_count"></a>gp\_command\_count 

Shows how many commands the coordinator has received from the client. Note that a single SQLcommand might actually involve more than one command internally, so the counter may increment by more than one for a single query. This counter also is shared by all of the segment processes working on the command.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \> 0|1|read only|

## <a id="gp_connection_send_timeout"></a>gp\_connection\_send\_timeout 

Timeout for sending data to unresponsive WarehousePG user clients during query processing. A value of 0 deactivates the timeout, WarehousePG waits indefinitely for a client. When the timeout is reached, the query is cancelled with this message:

```
Could not send data to client: Connection timed out.
```

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of seconds|3600 \(1 hour\)|coordinator, system, reload|

## <a id="gp_content"></a>gp\_content 

The local content id if a segment.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer| |read only|

## <a id="gp_create_table_random_default_distribution"></a>gp\_create\_table\_random\_default\_distribution 

Controls table creation when a WarehousePG table is created with a CREATE TABLE or CREATE TABLE AS command that does not contain a DISTRIBUTED BY clause.

For CREATE TABLE, if the value of the parameter is `off` \(the default\), and the table creation command does not contain a DISTRIBUTED BY clause, WarehousePG chooses the table distribution key based on the command:

-   If a `LIKE` or `INHERITS` clause is specified, then WarehousePG copies the distribution key from the source or parent table.
-   If a `PRIMARY KEY` or `UNIQUE` constraints are specified, then WarehousePG chooses the largest subset of all the key columns as the distribution key.
-   If neither constraints nor a `LIKE` or `INHERITS` clause is specified, then WarehousePG chooses the first suitable column as the distribution key. \(Columns with geometric or user-defined data types are not eligible as WarehousePG distribution key columns.\)

If the value of the parameter is set to `on`, WarehousePG follows these rules to create a table when the DISTRIBUTED BY clause is not specified:

-   If PRIMARY KEY or UNIQUE columns are not specified, the distribution of the table is random \(DISTRIBUTED RANDOMLY\). Table distribution is random even if the table creation command contains the LIKE or INHERITS clause.
-   If PRIMARY KEY or UNIQUE columns are specified, a DISTRIBUTED BY clause must also be specified. If a DISTRIBUTED BY clause is not specified as part of the table creation command, the command fails.

For a CREATE TABLE AS command that does not contain a distribution clause:

-   If the Postgres-based planner creates the table, and the value of the parameter is `off`, the table distribution policy is determined based on the command.
-   If the Postgres-based planner creates the table, and the value of the parameter is `on`, the table distribution policy is random.
-   If GPORCA creates the table, the table distribution policy is random. The parameter value has no affect.

For information about the Postgres-based planner and GPORCA, see "SQL: Querying Data" in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|off|coordinator, session, reload|

## <a id="gp_dbid"></a>gp\_dbid 

The local content dbid of a segment.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer| |read only|

## <a id="gp_debug_linger"></a>gp\_debug\_linger 

Number of seconds for a WarehousePG process to linger after a fatal internal error.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Any valid time expression \(number and unit\)|0|coordinator, session, reload|

## <a id="gp_default_storage_options"></a>gp\_default\_storage\_options 

Set the default values for the following table storage options when a table is created with the `CREATE TABLE` command.

-   appendoptimized

    > **Note** You use the `appendoptimized=value` syntax to specify the append-optimized table storage type. `appendoptimized` is a thin alias for the `appendonly` legacy storage option. WarehousePG stores `appendonly` in the catalog, and displays the same when listing the storage options for append-optimized tables.

-   blocksize
-   checksum
-   compresstype
-   compresslevel
-   orientation

Specify multiple storage option values as a comma separated list.

You can set the storage options with this parameter instead of specifying the table storage options in the `WITH` of the `CREATE TABLE` command. The table storage options that are specified with the `CREATE TABLE` command override the values specified by this parameter.

Not all combinations of storage option values are valid. If the specified storage options are not valid, an error is returned. See the `CREATE TABLE` command for information about table storage options.

The defaults can be set for a database and user. If the server configuration parameter is set at different levels, this the order of precedence, from highest to lowest, of the table storage values when a user logs into a database and creates a table:

1.  The values specified in a `CREATE TABLE` command with the `WITH` clause or `ENCODING` clause
2.  The value of `gp_default_storage_options` that set for the user with the `ALTER ROLE...SET` command
3.  The value of `gp_default_storage_options` that is set for the database with the `ALTER DATABASE...SET` command
4.  The value of `gp_default_storage_options` that is set for the WarehousePG cluster with the `gpconfig` utility

The parameter value is not cumulative. For example, if the parameter specifies the `appendoptimized` and `compresstype` options for a database and a user logs in and sets the parameter to specify the value for the `orientation` option, the `appendoptimized`, and `compresstype` values set at the database level are ignored.

This example `ALTER DATABASE` command sets the default `orientation` and `compresstype` table storage options for the database `mytest`.

```
ALTER DATABASE mytest SET gp_default_storage_options = 'orientation=column, compresstype=rle_type'
```

To create an append-optimized table in the `mytest` database with column-oriented table and RLE compression. The user needs to specify only `appendoptimized=TRUE` in the `WITH` clause.

This example `gpconfig` utility command sets the default storage option for a WarehousePG cluster. If you set the defaults for multiple table storage options, the value must be enclosed in single quotes.

```
gpconfig -c 'gp_default_storage_options' -v 'appendoptimized=true, orientation=column'
```

This example `gpconfig` utility command shows the value of the parameter. The parameter value must be consistent across the WarehousePG coordinator and all segments.

```
gpconfig -s 'gp_default_storage_options'
```

|Value Range|Default|Set Classifications<sup>1</sup>|
|-----------|-------|---------------------|
|`appendoptimized`= `TRUE` or `FALSE`<br/><br/>`blocksize`= integer between 8192 and 2097152<br/><br/>`checksum`= `TRUE` or `FALSE`<br/><br/>`compresstype`= `ZLIB` or `ZSTD` or `RLE`\_`TYPE` or `NONE`<br/><br/>`compresslevel`= integer between 0 and 19<br/><br/>`orientation`= `ROW` \| `COLUMN`|`appendoptimized`=`FALSE`<br/><br/>`blocksize`=`32768`<br/><br/>`checksum`=`TRUE`<br/><br/>`compresstype`=`none`<br/><br/>`compresslevel`=`0`<br/><br/>`orientation`=`ROW`|coordinator, session, reload|

> **Note** <sup>1</sup>The set classification when the parameter is set at the system level with the `gpconfig` utility.

## <a id="gp_dispatch_keepalives_count"></a>gp\_dispatch\_keepalives\_count 

Maximum number of TCP keepalive retransmits from a WarehousePG Query Dispatcher to its Query Executors. It controls the number of consecutive keepalive retransmits that can be lost before a connection between a Query Dispatcher and a Query Executor is considered dead.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 to 127|0 \(it uses the system default\)|coordinator, system, restart|

## <a id="gp_dispatch_keepalives_idle"></a>gp\_dispatch\_keepalives\_idle 

Time in seconds between issuing TCP keepalives from a WarehousePG Query Dispatcher to its Query Executors.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 to 32767|0 \(it uses the system default\)|coordinator, system, restart|

## <a id="gp_dispatch_keepalives_interval"></a>gp\_dispatch\_keepalives\_interval 

Time in seconds between TCP keepalive retransmits from a WarehousePG Query Dispatcher to its Query Executors.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 to 32767|0 \(it uses the system default\)|coordinator, system, restart|

## <a id="gp_dynamic_partition_pruning"></a>gp\_dynamic\_partition\_pruning 

Enables plans that can dynamically eliminate the scanning of partitions.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_eager_two_phase_agg"></a>gp\_eager\_two\_phase\_agg

Activates or deactivates two-phase aggregation for the Postgres-based planner.

The default value is `off`; the Postgres-based planner chooses the best aggregate path for a query based on the cost. When set to `on`, the Postgres-based planner adds a disable cost to each of the first stage aggregate paths, which in turn forces the Postgres-based planner to generate and choose a multi-stage aggregate path.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="gp_enable_agg_distinct"></a>gp\_enable\_agg\_distinct 

 Activates or deactivates  two-phase aggregation to compute a single distinct-qualified aggregate. This applies only to subqueries that include a single distinct-qualified aggregate function.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_agg_distinct_pruning"></a>gp\_enable\_agg\_distinct\_pruning 

 Activates or deactivates  three-phase aggregation and join to compute distinct-qualified aggregates. This applies only to subqueries that include one or more distinct-qualified aggregate functions.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_direct_dispatch"></a>gp\_enable\_direct\_dispatch 

 Activates or deactivates  the dispatching of targeted query plans for queries that access data on a single segment. When on, queries that target rows on a single segment will only have their query plan dispatched to that segment \(rather than to all segments\). This significantly reduces the response time of qualifying queries as there is no interconnect setup involved. Direct dispatch does require more CPU utilization on the coordinator.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_fast_sri"></a>gp\_enable\_fast\_sri 

When set to `on`, the Postgres-based planner plans single row inserts so that they are sent directly to the correct segment instance \(no motion operation required\). This significantly improves performance of single-row-insert statements.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_global_deadlock_detector"></a>gp\_enable\_global\_deadlock\_detector 

Controls whether the WarehousePG Global Deadlock Detector is enabled to manage concurrent `UPDATE` and `DELETE` operations on heap tables to improve performance. See [DML: Inserting, Updating and Deleting](../../admin_guide/dml.html#topic_gdd) in the *WarehousePG Administrator Guide*. The default is `off`, the Global Deadlock Detector is deactivated.

If the Global Deadlock Detector is deactivated \(the default\), WarehousePG runs concurrent update and delete operations on a heap table serially.

If the Global Deadlock Detector is enabled, concurrent updates are permitted and the Global Deadlock Detector determines when a deadlock exists, and breaks the deadlock by cancelling one or more backend processes associated with the youngest transaction\(s\) involved.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, system, restart|

## <a id="gp_enable_groupext_distinct_gather"></a>gp\_enable\_groupext\_distinct\_gather 

 Activates or deactivates  gathering data to a single node to compute distinct-qualified aggregates on grouping extension queries. When this parameter and `gp_enable_groupext_distinct_pruning` are both enabled, the Postgres-based planner uses the cheaper plan.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_groupext_distinct_pruning"></a>gp\_enable\_groupext\_distinct\_pruning 

 Activates or deactivates  three-phase aggregation and join to compute distinct-qualified aggregates on grouping extension queries. Usually, enabling this parameter generates a cheaper query plan that the Postgres-based planner will use in preference to existing plan.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_multiphase_agg"></a>gp\_enable\_multiphase\_agg 

 Activates or deactivates  the use of two or three-stage parallel aggregation plans Postgres-based planner. This approach applies to any subquery with aggregation. If `gp_enable_multiphase_agg` is off, then`gp_enable_agg_distinct` and `gp_enable_agg_distinct_pruning` are deactivated.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_predicate_propagation"></a>gp\_enable\_predicate\_propagation 

When enabled, the Postgres-based planner applies query predicates to both table expressions in cases where the tables are joined on their distribution key column\(s\). Filtering both tables prior to doing the join \(when possible\) is more efficient.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_preunique"></a>gp\_enable\_preunique 

Enables two-phase duplicate removal for `SELECT DISTINCT` queries \(not `SELECT COUNT(DISTINCT)`\). When enabled, it adds an extra `SORT DISTINCT` set of plan nodes before motioning. In cases where the distinct operation greatly reduces the number of rows, this extra `SORT DISTINCT` is much cheaper than the cost of sending the rows across the Interconnect.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_enable_relsize_collection"></a>gp\_enable\_relsize\_collection 

Enables GPORCA and the Postgres-based planner to use the estimated size of a table \(`pg_relation_size` function\) if there are no statistics for the table. By default, GPORCA and the planner use a default value to estimate the number of rows if statistics are not available. The default behavior improves query optimization time and reduces resource queue usage in heavy workloads, but can lead to suboptimal plans.

This parameter is ignored for a root partitioned table. When GPORCA is enabled and the root partition does not have statistics, GPORCA always uses the default value. You can use `ANALZYE ROOTPARTITION` to collect statistics on the root partition. See [ANALYZE](../sql_commands/ANALYZE.html).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="gp_enable_segment_copy_checking"></a>gp\_enable\_segment\_copy\_checking 

Controls whether the distribution policy for a table \(from the table `DISTRIBUTED` clause\) is checked when data is copied into the table with the `COPY FROM...ON SEGMENT` command. If true, an error is returned if a row of data violates the distribution policy for a segment instance. The default is `true`.

If the value is `false`, the distribution policy is not checked. The data added to the table might violate the table distribution policy for the segment instance. Manual redistribution of table data might be required. See the `ALTER TABLE` clause `WITH REORGANIZE`.

The parameter can be set for a database system or a session. The parameter cannot be set for a specific database.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="gp_enable_sort_limit"></a>gp\_enable\_sort\_limit 

Enable `LIMIT` operation to be performed while sorting. Sorts more efficiently when the plan requires the first *limit\_number* of rows at most.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_external_enable_exec"></a>gp\_external\_enable\_exec 

 Activates or deactivates  the use of external tables that run OS commands or scripts on the segment hosts \(`CREATE EXTERNAL TABLE EXECUTE` syntax\). 

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, system, restart|

## <a id="gp_explain_jit"></a>gp\_explain\_jit

Prints summarized JIT information from all query executions when JIT compilation is enabled.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|on|coordinator, session, reload |

## <a id="gp_external_max_segs"></a>gp\_external\_max\_segs 

Sets the number of segments that will scan external table data during an external table operation, the purpose being not to overload the system with scanning data and take away resources from other concurrent operations. This only applies to external tables that use the `gpfdist://` protocol to access external table data.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|64|coordinator, session, reload|

## <a id="gp_external_enable_filter_pushdown"></a>gp\_external\_enable\_filter\_pushdown 

Enable filter pushdown when reading data from external tables. If pushdown fails, a query is run without pushing filters to the external data source \(instead, WarehousePG applies the same constraints to the result\). See [Defining External Tables](../../admin_guide/external/external-tables.html#topic3) for more information.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_fts_probe_interval"></a>gp\_fts\_probe\_interval 

Specifies the polling interval for the fault detection process \(`ftsprobe`\). The `ftsprobe` process will take approximately this amount of time to detect a segment failure.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|10 - 3600 seconds|1min|coordinator, system, reload|

## <a id="gp_fts_probe_retries"></a>gp\_fts\_probe\_retries 

Specifies the number of times the fault detection process \(`ftsprobe`\) attempts to connect to a segment before reporting segment failure.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|5|coordinator, system, reload|

## <a id="gp_fts_probe_timeout"></a>gp\_fts\_probe\_timeout 

Specifies the allowed timeout for the fault detection process \(`ftsprobe`\) to establish a connection to a segment before declaring it down.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|10 - 3600 seconds|20 secs|coordinator, system, reload|

## <a id="gp_fts_replication_attempt_count"></a>gp\_fts\_replication\_attempt\_count 

Specifies the maximum number of times that WarehousePG attempts to establish a primary-mirror replication connection. When this count is exceeded, the fault detection process \(`ftsprobe`\) stops retrying and marks the mirror down.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - 100|10|coordinator, system, reload|

## <a id="gp_global_deadlock_detector_period"></a>gp\_global\_deadlock\_detector\_period 

Specifies the executing interval \(in seconds\) of the global deadlock detector background worker process.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|5 - `INT_MAX` secs|120 secs|coordinator, system, reload|

## <a id="gp_log_endpoints"></a>gp\_log\_endpoints

Controls the amount of parallel retrieve cursor endpoint detail that WarehousePG writes to the server log file.

The default value is `false`, WarehousePG does not log endpoint details to the log file. When set to `true`, WarehousePG writes endpoint detail information to the log file.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload|


## <a id="gp_log_fts"></a>gp\_log\_fts 

Controls the amount of detail the fault detection process \(`ftsprobe`\) writes to the log file.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|OFF, TERSE, VERBOSE, DEBUG|TERSE|coordinator, system, restart|

## <a id="gp_log_interconnect"></a>gp\_log\_interconnect 

Controls the amount of information that is written to the log file about communication between WarehousePG segment instance worker processes. The default value is `terse`. The log information is written to both the coordinator and segment instance logs.

Increasing the amount of logging could affect performance and increase disk space usage.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|off,  terse,  verbose,  debug|terse|coordinator, session, reload|

## <a id="gp_log_gang"></a>gp\_log\_gang 

Controls the amount of information that is written to the log file about query worker process creation and query management. The default value is `OFF`, do not log information.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|OFF, TERSE, VERBOSE, DEBUG|OFF|coordinator, session, restart|

## <a id="gp_hashjoin_tuples_per_bucket"></a>gp\_hashjoin\_tuples\_per\_bucket 

Sets the target density of the hash table used by HashJoin operations. A smaller value will tend to produce larger hash tables, which can increase join performance.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|5|coordinator, session, reload|

## <a id="gp_ignore_error_table"></a>gp\_ignore\_error\_table 

Controls WarehousePG behavior when the deprecated `INTO ERROR TABLE` clause is specified in a `CREATE EXTERNAL TABLE` or `COPY` command.

> **Note** The `INTO ERROR TABLE` clause was deprecated and removed in WarehousePG 5. In WarehousePG 7, this parameter will be removed as well, causing all `INTO ERROR TABLE` invocations be yield a syntax error.

The default value is `false`, WarehousePG returns an error if the `INTO ERROR TABLE` clause is specified in a command.

If the value is `true`, WarehousePG ignores the clause, issues a warning, and runs the command without the `INTO ERROR TABLE` clause. In WarehousePG 6.x and later, you access the error log information with built-in SQL functions. See the [CREATE EXTERNAL TABLE](../sql_commands/CREATE_EXTERNAL_TABLE.html) or [COPY](../sql_commands/COPY.html) command.

You can set this value to `true` to avoid the WarehousePG error when you run applications that run `CREATE EXTERNAL TABLE` or `COPY` commands that include the unsupoorted `INTO ERROR TABLE` clause.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload|

## <a id="topic_lvm_ttc_3p"></a>gp\_initial\_bad\_row\_limit 

For the parameter value *n*, WarehousePG stops processing input rows when you import data with the `COPY` command or from an external table if the first *n* rows processed contain formatting errors. If a valid row is processed within the first *n* rows, WarehousePG continues processing input rows.

Setting the value to 0 deactivates this limit.

The `SEGMENT REJECT LIMIT` clause can also be specified for the `COPY` command or the external table definition to limit the number of rejected rows.

`INT_MAX` is the largest value that can be stored as an integer on your system.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer 0 - `INT_MAX`|1000|coordinator, session, reload|


## <a id="gp_interconnect_address_type"></a>gp_interconnect_address_type

Specifies the type of address binding strategy WarehousePG uses for communication between segment host sockets. There are two types: `unicast` and `wildcard`. The default is `unicast`.

- When this parameter is set to `unicast`, WarehousePG uses the `gp_segment_configuration.address` field to perform address binding. This reduces port usage on segment hosts and prevents interconnect traffic from being routed through unintended (and possibly slower) network interfaces. This is the recommended option.

- When this parameter is set to `wildcard`, WarehousePG uses a wildcard address for binding, enabling the use of any network interface compliant with routing rules.

> **Note** In some cases, inter-segment communication using the unicast strategy may not be possible. One example is if the source segment's address field and the destination segment's address field are on different subnets and/or existing routing rules do not allow for such
communication. In these cases, we recommend you use a single subnet for all segment addresses, or fix routing rules to allow communication between subnets. If neither is possible, you will need to configure this parameter to `wildcard` for wildcard address binding.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|wildcard,unicast|unicast|local, system, reload|

## <a id="gp_interconnect_debug_retry_interval"></a>gp_interconnect_debug_retry_interval 

Specifies the interval, in seconds, to log WarehousePG interconnect debugging messages when the server configuration parameter [gp\_log\_interconnect](#gp_log_interconnect) is set to `DEBUG`. The default is 10 seconds.

The log messages contain information about the interconnect communication between WarehousePG segment instance worker processes. The information can be helpful when debugging network issues between segment instances.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1 =< Integer < 4096|10|coordinator, session, reload|

## <a id="gp_interconnect_fc_method"></a>gp\_interconnect\_fc\_method 

Specifies the flow control method used for the default WarehousePG UDPIFC interconnect.

For capacity based flow control, senders do not send packets when receivers do not have the capacity.

Loss based flow control is based on capacity based flow control, and also tunes the sending speed according to packet losses.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|CAPACITY, LOSS|LOSS|coordinator, session, reload|

## <a id="gp_interconnect_proxy_addresses"></a>gp\_interconnect\_proxy\_addresses 

Sets the proxy ports that WarehousePG uses when the server configuration parameter [gp\_interconnect\_type](#gp_interconnect_type) is set to `proxy`. Otherwise, this parameter is ignored. The default value is an empty string \(""\).

When the `gp_interconnect_type` parameter is set to `proxy`, You must specify a proxy port for the coordinator, standby coordinator, and all primary and mirror segment instances in this format:

```
<db_id>:<cont_id>:<seg_address>:<port>[, ... ]
```

For the coordinator, standby coordinator, and segment instance, the first three fields, db\_id, cont\_id, and seg\_address can be found in the [gp\_segment\_configuration](../system_catalogs/gp_segment_configuration.html) catalog table. The fourth field, port, is the proxy port for the WarehousePG coordinator or a segment instance.

-   db\_id is the `dbid` column in the catalog table.
-   cont\_id is the `content` column in the catalog table.
-   seg\_address is the IP address or hostname corresponding to tge `address` column in the catalog table.
-   port is the TCP/IP port for the segment instance proxy that you specify.

> **Important** If a segment instance hostname is bound to a different IP address at runtime, you must run `gpstop -U` to re-load the `gp_interconnect_proxy_addresses` value.

You must specify the value as a single-quoted string. This `gpconfig` command sets the value for `gp_interconnect_proxy_addresses` as a single-quoted string. The WarehousePG cluster consists of a coordinator and a single segment instance.

```
gpconfig --skipvalidation -c gp_interconnect_proxy_addresses -v "'1:-1:192.168.180.50:35432,2:0:192.168.180.54:35000'"
```

For an example of setting `gp_interconnect_proxy_addresses`, see [Configuring Proxies for the WarehousePG Interconnect](../../admin_guide/managing/proxy-ic.html).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string \(maximum length - 16384 bytes\)| |local, system, reload|

## <a id="gp_interconnect_queue_depth"></a>gp\_interconnect\_queue\_depth 

Sets the amount of data per-peer to be queued by the WarehousePG interconnect on receivers \(when data is received but no space is available to receive it the data will be dropped, and the transmitter will need to resend it\) for the default UDPIFC interconnect. Increasing the depth from its default value will cause the system to use more memory, but may increase performance. It is reasonable to set this value between 1 and 10. Queries with data skew potentially perform better with an increased queue depth. Increasing this may radically increase the amount of memory used by the system.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1-2048|4|coordinator, session, reload|

## <a id="gp_interconnect_setup_timeout"></a>gp\_interconnect\_setup\_timeout 

Specifies the amount of time, in seconds, that WarehousePG waits for the interconnect to complete setup before it times out.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - 7200 seconds|7200 seconds \(2 hours\)|coordinator, session, reload|

## <a id="gp_interconnect_snd_queue_depth"></a>gp\_interconnect\_snd\_queue\_depth 

Sets the amount of data per-peer to be queued by the default UDPIFC interconnect on senders. Increasing the depth from its default value will cause the system to use more memory, but may increase performance. Reasonable values for this parameter are between 1 and 4. Increasing the value might radically increase the amount of memory used by the system.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1 - 4096|2|coordinator, session, reload|

## <a id="gp_interconnect_transmit_timeout"></a>gp\_interconnect\_transmit\_timeout 

Specifies the amount of time, in seconds, that WarehousePG waits for network transmission of interconnect traffic to complete before it times out.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1 - 7200 seconds|3600 seconds \(1 hour\)|coordinator, session, reload|

## <a id="gp_interconnect_type"></a>gp_interconnect_type 

Sets the networking protocol used for WarehousePG interconnect traffic. UDPIFC specifies using UDP with flow control for interconnect traffic, and is the only value supported.

UDPIFC \(the default\) specifies using UDP with flow control for interconnect traffic. Specify the interconnect flow control method with [gp\_interconnect\_fc\_method](#gp_interconnect_fc_method).

With TCP as the interconnect protocol, WarehousePG has an upper limit of 1000 segment instances - less than that if the query workload involves complex, multi-slice queries.

The `PROXY` value specifies using the TCP protocol, and when running queries, using a proxy for WarehousePG interconnect communication between the coordinator instance and segment instances and between two segment instances. When this parameter is set to `PROXY`, you must specify the proxy ports for the coordinator and segment instances with the server configuration parameter [gp\_interconnect\_proxy\_addresses](#gp_interconnect_proxy_addresses). For information about configuring and using proxies with the WarehousePG interconnect, see [Configuring Proxies for the WarehousePG Interconnect](../../admin_guide/managing/proxy-ic.html).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|UDPIFC, TCP, PROXY|UDPIFC|local, session, reload|

## <a id="gp_log_format"></a>gp\_log\_format 

Specifies the format of the server log files. If using *gp\_toolkit* administrative schema, the log files must be in CSV format.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|csv, text|csv|local, system, restart|

## <a id="gp_max_local_distributed_cache"></a>gp\_max\_local\_distributed\_cache 

Sets the maximum number of distributed transaction log entries to cache in the backend process memory of a segment instance.

The log entries contain information about the state of rows that are being accessed by an SQL statement. The information is used to determine which rows are visible to an SQL transaction when running multiple simultaneous SQL statements in an MVCC environment. Caching distributed transaction log entries locally improves transaction processing speed by improving performance of the row visibility determination process.

The default value is optimal for a wide variety of SQL processing environments.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|1024|local, system, restart|

## <a id="gp_max_packet_size"></a>gp\_max\_packet\_size 

Sets the tuple-serialization chunk size for the WarehousePG interconnect.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|512-65536|8192|coordinator, system, reload|

## <a id="gp_max_parallel_cursors"></a>gp\_max\_parallel\_cursors

Specifies the maximum number of active parallel retrieve cursors allowed on a WarehousePG cluster. A parallel retrieve cursor is considered active after it has been `DECLARE`d, but before it is `CLOSE`d or returns an error.

The default value is `-1`; there is no limit on the number of open parallel retrieve cursors that may be concurrently active in the cluster \(up to the maximum value of 1024\).

Each parallel retrieve cursor creates upto `N` endpoints, where N is the number of primary segments (including the coordinator) in the cluster. On each primary segment, each endpoint costs a small amount of shared memory and consumes one `retrieve` connection that contributes towards the `max_connections` limit.

This GUC is a way to limit that consumption.

You must be a superuser to change the `gp_max_parallel_cursors` setting.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|-1 - 1024 | -1 | coordinator, superuser, session, reload|

## <a id="gp_max_plan_size"></a>gp\_max\_plan\_size 

Specifies the total maximum uncompressed size of a query execution plan multiplied by the number of Motion operators \(slices\) in the plan. If the size of the query plan exceeds the value, the query is cancelled and an error is returned. A value of 0 means that the size of the plan is not monitored.

You can specify a value in `kB`, `MB`, or `GB`. The default unit is `kB`. For example, a value of `200` is 200kB. A value of `1GB` is the same as `1024MB` or `1048576kB`.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|0|coordinator, superuser, session, reload|

## <a id="gp_max_slices"></a>gp\_max\_slices 

Specifies the maximum number of slices \(portions of a query plan that are run on segment instances\) that can be generated by a query. If the query generates more than the specified number of slices, WarehousePG returns an error and does not run the query. The default value is `0`, no maximum value.

Running a query that generates a large number of slices might affect WarehousePG performance. For example, a query that contains `UNION` or `UNION ALL` operators over several complex views can generate a large number of slices. You can run `EXPLAIN ANALYZE` on the query to view slice statistics for the query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - INT\_MAX|0|coordinator, session, reload|

## <a id="gp_max_system_slices"></a>gp\_max\_system\_slices 

>**NOTE**
> This parameter is identical in behavior to `gp_max_slices`, except that it requires superuser privileges. In addition, it takes precedence over `gp_max_slices` if `gp_max_slices` is greater than its value.

Specifies the maximum number of slices \(portions of a query plan that are run on segment instances\) that can be generated by a query. If the query generates more than the specified number of slices, WarehousePG returns an error and does not run the query. The default value is `0`, no maximum value.

Running a query that generates a large number of slices might affect WarehousePG performance. For example, a query that contains `UNION` or `UNION ALL` operators over several complex views can generate a large number of slices. You can run `EXPLAIN ANALYZE` on the query to view slice statistics for the query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - INT\_MAX|0|coordinator, session, reload, superuser|

## <a id="gp_motion_cost_per_row"></a>gp\_motion\_cost\_per\_row 

Sets the Postgres-based planner cost estimate for a Motion operator to transfer a row from one segment to another, measured as a fraction of the cost of a sequential page fetch. If 0, then the value used is two times the value of *cpu\_tuple\_cost*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|0|coordinator, session, reload|

## <a id="gp_postmaster_address_family"></a>gp\_postmaster\_address\_family

When starting a cluster, this server configuration parameter tells a node which type of IP address to use. When set to `auto`, WarehousePG loops through all the ipv4 and ipv6 addresses specified in `listen_addresses`, trying to open a “listening” port on each one.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|auto, ipv4, ipv6|auto|local, system, restart, superuser|

## <a id="gp_print_create_gang_time"></a>gp\_print\_create\_gang\_time 

When a user starts a session with WarehousePG and issues a query, the system creates groups or 'gangs' of worker processes on each segment to do the work. `gp_print_create_gang_time` controls the display of additional information about gang creation, including gang reuse status and the shortest and longest connection establishment time to the segment.

The default value is `false`, WarehousePG does not display the additional gang creation information.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload|

## <a id="gp_quickz_fallback"></a>gp\_quickz\_fallback

Determines how WarehousePG handles legacy SQL that specifies a compression type of QuickLZ, which is not supported in WarehousePG 7 and later. When set to `true`, if legacy SQL specifies a compression type of QuickLZ, WarehousePG will apply a compression type of zstd. When set to `false` -- the default -- specifying a compression type of QuickLZ will result in an error.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="gp_recursive_cte"></a>gp\_recursive\_cte 

Controls the availability of the `RECURSIVE` keyword in the `WITH` clause of a `SELECT [INTO]` command, or a `DELETE`, `INSERT` or `UPDATE` command. The keyword allows a subquery in the `WITH` clause of a command to reference itself. The default value is `true`, the `RECURSIVE` keyword is allowed in the `WITH` clause of a command.

For information about the `RECURSIVE` keyword, see the [SELECT](../sql_commands/SELECT.html) command and [WITH Queries \(Common Table Expressions\)](../../admin_guide/query/topics/CTE-query.html).

The parameter can be set for a database system, an individual database, or a session or query.

> **Note** This parameter was previously named `gp_recursive_cte_prototype`, but has been renamed to reflect the current status of the implementation.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, restart|

## <a id="gp_reject_percent_threshold"></a>gp\_reject\_percent\_threshold 

For single row error handling on COPY and external table SELECTs, sets the number of rows processed before SEGMENT REJECT LIMIT *n* PERCENT starts calculating.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1-*n*|300|coordinator, session, reload|

## <a id="gp_reraise_signal"></a>gp\_reraise\_signal 

If enabled, will attempt to dump core if a fatal server error occurs.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="gp_resgroup_memory_policy"></a>gp\_resgroup\_memory\_policy 

> **Note** The `gp_resgroup_memory_policy` server configuration parameter is enforced only when resource group-based resource management is active.

Used by a resource group to manage memory allocation to query operators.

When set to `auto`, WarehousePG uses resource group memory limits to distribute memory across query operators, allocating a fixed size of memory to non-memory-intensive operators and the rest to memory-intensive operators.

When you specify `eager_free`, WarehousePG distributes memory among operators more optimally by re-allocating memory released by operators that have completed their processing to operators in a later query stage.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|auto, eager\_free|eager\_free|local, system, superuser, reload|

## <a id="gp_resgroup_memory_query_fixed_mem"></a>gp_resgroup_memory_query_fixed_mem

> **Note** The `gp_resgroup_memory_query_fixed_mem` server configuration parameter is enforced only when resource group-based resource management is active.

Specifies a fixed amount of memory, in MB, reserved for all queries in a resource group **for the scope of a session**. When this parameter is set to `0`, the default, the `MEMORY_QUOTA` resource group attribute determines this instead. 

While `MEMORY_QUOTA` applies to queries across sessions, `gp_resgroup_memory_query_fixed_mem` overrides that limit at a session level. Thus, you can use this configuration parameter to adjust query memory budget for a particular session, on an ad hoc basis. 

The value of `gp_resgroup_memory_query_fixed_mem` must be lower than `max_statement_mem`.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 < integer < INT_MAX| 0 |coordinator, session, user|

## <a id="gp_resource_group_bypass"></a>gp\_resource\_group\_bypass 

> **Note** The `gp_resource_group_bypass` server configuration parameter is enforced only when resource group-based resource management is active.

 Activates or deactivates  the enforcement of resource group concurrent transaction limits on WarehousePG resources. The default value is `false`, which enforces resource group transaction limits. Resource groups manage resources such as CPU, memory, and the number of concurrent transactions that are used by queries.

You can set this parameter to `true` to bypass resource group concurrent transaction limitations so that a query can run immediately. If you set this parameter to true, the query no longer enforces the CPU or memory limits assigned to its resource group. Instead, the memory quota assigned to this query is `statement_mem` per query. If there is not enough memory to satisfy the memory allocation request, the query will fail.

This parameter can be set for a session. The parameter cannot be set within a transaction or a function.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|local, session, reload|

## <a id="gp_resource_group_bypass_catalog_query"></a>gp_resource_group_bypass_catalog_query

> **Note** The `gp_resource_group_bypass_catalog_query` server configuration parameter is enforced only when resource group-based resource management is active.

When set to `true` -- the default -- WarehousePG's resource group scheduler bypasses all queries that fulfill both of the following criteria:

- They read exclusively from system catalogs
- They contain in their query text `pg_catalog` schema tables only

>**Note**
>If a query contains a mix of `pg_catalog` and any other schema tables the scheduler will **not** bypass the query.

When this configuration parameter is set to `false` and the database has reached the maximum amount of concurrent transactions, the scheduler can block queries that exclusively read from system catalogs. 

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|local, session, reload|

## <a id="gp_resource_group_bypass_direct_dispatch"></a>gp_resource_group_bypass_direct_dispatch

> **Note** 
>The `gp_resource_group_bypass_direct_dispatch` server configuration parameter is enforced only when resource group-based resource management is active.

When set to `true` (the default) WarehousePG's resource group scheduler bypasses the resource group's limits for a direct dispatch query so it can run immediately. A direct dispatch query is a special type of query that only requires a single segment to participate in the execution. In order to improve efficiency, WarehousePG optimizes this type of query, called Direct Dispatch optimization. The system sends the query plan to the execution of a single segment that needs to execute the plan, instead of sending it to all segments for execution. The query uses resources outside the resource groups to allocate memory. If there is not enough memory to satisfy the memory allocation request, the query will fail. You may only set this parameter for a single session, not within a transaction or a function.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|local, session, reload|

## <a id="gp_resource_group_cgroup_parent"></a>gp_resource_group_cgroup_parent

> **Note** The `gp_resource_group_cgroup_parent` server configuration parameter is enforced only when resource group-based resource management is active and cgroup v2 is used.

Identifies the root path of the `gpdb` cgroup hierarchy.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|char|"gpdb.service"|local, system, restart, superuser|

## <a id="gp_resource_group_cpu_limit"></a>gp\_resource\_group\_cpu\_limit 

> **Note** The `gp_resource_group_cpu_limit` server configuration parameter is enforced only when resource group-based resource management is active.

Identifies the maximum percentage of system CPU resources to allocate to resource groups on each WarehousePG segment node.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0.1 - 1.0|0.9|local, system, restart|

## <a id="gp_resource_group_cpu_priority"></a>gp_resource_group_cpu_priority

Sets the CPU priority for WarehousePG processes relative to non-WarehousePG processes when resource groups are enabled. For example, setting this parameter to `10` sets the ratio of allotted CPU resources for WarehousePG processes to non-WarehousePG processes to 10:1. 

> **Note** 
> This ratio calculation applies only when the machine's CPU usage is at 100%.


|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1 - 50|10|local, system, restart|

## <a id="gp_resource_group_move_timeout"></a>gp\_resource\_group\_move\_timeout

> **Note** The `gp_resource_group_move_timeout` server configuration parameter is enforced only when resource group-based resource management is active.

Cancels the `pg_resgroup_move_query()` function, which moves a running query from one resouce group to another, if it waits longer than the specified number of miliseconds.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|10 - `INT_MAX` millisecs|3000 millisecs|coordinator, session, reload|

## <a id="gp_resource_group_queuing_timeout"></a>gp\_resource\_group\_queuing\_timeout 

> **Note** The `gp_resource_group_queuing_timeout` server configuration parameter is enforced only when resource group-based resource management is active.

Cancels a transaction queued in a resource group that waits longer than the specified number of milliseconds. The time limit applies separately to each transaction. The default value is zero; transactions are queued indefinitely and never time out.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - `INT_MAX` millisecs|0 millisecs|coordinator, session, reload|

## <a id="gp_resource_manager"></a>gp\_resource\_manager 

Identifies the resource management scheme currently enabled in the WarehousePG cluster. For information about WarehousePG resource management, see [Managing Resources](../../admin_guide/wlmgmt.html).

- `none` - configures WarehousePG to not use any resource manager. This is the default.

- `group` - configures WarehousePG to use resource groups and base resource group behavior on the cgroup v1 version of Linux cgroup functionality. 

- `group-v2` - configures WarehousePG to use resource groups and base resource group behavior on the cgroup v2 version of Linux cgroup functionality. 

- `queue` - configures WarehousePG to use resource queues. 

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|none, group, group-v2, queue|none|local, system, restart|

## <a id="gp_resqueue_memory_policy"></a>gp\_resqueue\_memory\_policy 

> **Note** The `gp_resqueue_memory_policy` server configuration parameter is enforced only when resource queue-based resource management is active.

Enables WarehousePG memory management features. The distribution algorithm `eager_free` takes advantage of the fact that not all operators run at the same time\(in WarehousePG 4.2 and later\). The query plan is divided into stages and WarehousePG eagerly frees memory allocated to a previous stage at the end of that stage's execution, then allocates the eagerly freed memory to the new stage.

When set to `none`, memory management is the same as in WarehousePG releases prior to 4.1.

When set to `auto`, query memory usage is controlled by [statement\_mem](#statement_mem) and resource queue memory limits.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|none, auto, eager\_free|eager\_free|local, system, restart/reload|

## <a id="gp_resqueue_priority"></a>gp\_resqueue\_priority 

> **Note** The `gp_resqueue_priority` server configuration parameter is enforced only when resource queue-based resource management is active.

 Activates or deactivates  query prioritization. When this parameter is deactivated, existing priority settings are not evaluated at query run time.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|local, system, restart|

## <a id="gp_resqueue_priority_cpucores_per_segment"></a>gp\_resqueue\_priority\_cpucores\_per\_segment 

> **Note** The `gp_resqueue_priority_cpucores_per_segment` server configuration parameter is enforced only when resource queue-based resource management is active.

Specifies the number of CPU units allocated to each segment instance on a segment host. If the segment is configured with primary-mirror segment instance pairs, use the number of primary segment instances on the host in the calculation. Include any CPU core that is available to the operating system, including virtual CPU cores, in the total number of available cores.

For example, if a WarehousePG cluster has 10-core segment hosts that are configured with four primary segments, set the value to 2.5 on each segment host \(10 divided by 4\). A coordinator host typically has only a single running coordinator instance, so set the value on the coordinator and standby maaster hosts to reflect the usage of all available CPU cores, in this case 10.

Incorrect settings can result in CPU under-utilization or query prioritization not working as designed.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0.1 - 512.0|4|local, system, restart|

## <a id="gp_resqueue_priority_sweeper_interval"></a>gp\_resqueue\_priority\_sweeper\_interval 

> **Note** The `gp_resqueue_priority_sweeper_interval` server configuration parameter is enforced only when resource queue-based resource management is active.

Specifies the interval at which the sweeper process evaluates current CPU usage. When a new statement becomes active, its priority is evaluated and its CPU share determined when the next interval is reached.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|500 - 15000 ms|1000|local, system, restart|

## <a id="gp_retrieve_conn"></a>gp\_retrieve\_conn 

A session that you initiate with `PGOPTIONS='-c gp_retrieve_conn=true'` is a retrieve session. You use a retrieve session to retrieve query result tuples from a specific endpoint instantiated for a parallel retrieve cursor.

The default value is `false`.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|read only|

## <a id="gp_role"></a>gp\_role 

The role of this server process is set to *dispatch* for the coordinator and *execute* for a segment.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|dispatchexecute, utility| |read only|

## <a id="gp_segment_connect_timeout"></a>gp\_segment\_connect\_timeout 

Time that the WarehousePG interconnect will try to connect to a segment instance over the network before timing out. Controls the network connection timeout between coordinator and primary segments, and primary to mirror segment replication processes.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Any valid time expression \(number and unit\)|3min|local, session, reload|

## <a id="gp_segments_for_planner"></a>gp\_segments\_for\_planner 

Sets the number of primary segment instances for the Postgres-based planner to assume in its cost and size estimates. If 0, then the value used is the actual number of primary segments. This variable affects the Postgres-based planner's estimates of the number of rows handled by each sending and receiving process in Motion operators.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0-*n*|0|coordinator, session, reload|

## <a id="gp_server_version"></a>gp\_server\_version 

Reports the version number of the server as a string. A version modifier argument might be appended to the numeric portion of the version string, example: *5.0.0 beta*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|String. Examples: *5.0.0*|n/a|read only|

## <a id="gp_server_version_num"></a>gp\_server\_version\_num 

Reports the version number of the server as an integer. The number is guaranteed to always be increasing for each version and can be used for numeric comparisons. The major version is represented as is, the minor and patch versions are zero-padded to always be double digit wide.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|*Mmmpp* where *M* is the major version, *mm* is the minor version zero-padded and *pp* is the patch version zero-padded. Example: 50000|n/a|read only|

## <a id="gp_session_id"></a>gp\_session\_id 

A system assigned ID number for a client session. Starts counting from 1 when the coordinator instance is first started.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1-*n*|14|read only|

## <a id="gp_set_proc_affinity"></a>gp\_set\_proc\_affinity 

If enabled, when a WarehousePG server process \(postmaster\) is started it will bind to a CPU.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, system, restart|

## <a id="gp_set_read_only"></a>gp\_set\_read\_only 

Set to on to deactivate writes to the database. Any in progress transactions must finish before read-only mode takes affect.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, system, restart|

## <a id="gp_statistics_pullup_from_child_partition"></a>gp\_statistics\_pullup\_from\_child\_partition 

This parameter directs the Postgres-based planner on where to obtain statistics when it plans a query on a partitioned table.

The default value is `off`, the Postgres-based planner uses the statistics of the root partitioned table, if it has any, when it plans a query. If the root partitioned table has no statistics, the Postgres-based planner attempts to use the statistics from the largest child partition.

When set to `on`, the Postgres-based planner attempts to use the statistics from the largest child partition when it plans a query on a partitioned table.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="gp_statistics_use_fkeys"></a>gp\_statistics\_use\_fkeys 

When enabled, the Postgres-based planner will use the statistics of the referenced column in the parent table when a column is foreign key reference to another table instead of the statistics of the column itself.

> **Note** This parameter is deprecated and will be removed in a future WarehousePG release.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="gp_use_legacy_hashops"></a>gp\_use\_legacy\_hashops 

For a table that is defined with a `DISTRIBUTED BY key\_column` clause, this parameter controls the hash algorithm that is used to distribute table data among segment instances. The default value is `false`, use the jump consistent hash algorithm.

Setting the value to `true` uses the modulo hash algorithm.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload|

## <a id="gp_vmem_idle_resource_timeout"></a>gp\_vmem\_idle\_resource\_timeout 

If a database session is idle for longer than the time specified, the session will free system resources \(such as shared memory\), but remain connected to the database. This allows more concurrent connections to the database at one time.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Any valid time expression \(number and unit\)|18s|coordinator, session, reload|

## <a id="gp_vmem_protect_limit"></a>gp\_vmem\_protect\_limit 

When resource queue-based or resource-group based resource management is active, the parameter sets the amount of memory \(in number of MBs\) that all `postgres` processes of an active segment instance can consume. If a query causes this limit to be exceeded, memory will not be allocated and the query will fail. Note that this is a local parameter and must be set for every segment in the system \(primary and mirrors\). When setting the parameter value, specify only the numeric value. For example, to specify 4096MB, use the value `4096`. Do not add the units `MB` to the value.

To prevent over-allocation of memory, these calculations can estimate a safe `gp_vmem_protect_limit` value.

First calculate the value of `gp_vmem`. This is the WarehousePG memory available on a host.

-   If the total system memory is less than 256 GB, use this formula:

    ```
    gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.7
    ```

-   If the total system memory is equal to or greater than 256 GB, use this formula:

    ```
    gp_vmem = ((SWAP + RAM) – (7.5GB + 0.05 * RAM)) / 1.17
    ```

where SWAP is the host swap space and RAM is the RAM on the host in GB.

Next, calculate the `max_acting_primary_segments`. This is the maximum number of primary segments that can be running on a host when mirror segments are activated due to a failure. With mirrors arranged in a 4-host block with 8 primary segments per host, for example, a single segment host failure would activate two or three mirror segments on each remaining host in the failed host's block. The `max_acting_primary_segments` value for this configuration is 11 \(8 primary segments plus 3 mirrors activated on failure\).

This is the calculation for `gp_vmem_protect_limit`. The value should be converted to MB.

```
gp_vmem_protect_limit = <gp_vmem> / <acting_primary_segments>
```

For scenarios where a large number of workfiles are generated, this is the calculation for `gp_vmem` that accounts for the workfiles.

-   If the total system memory is less than 256 GB:

    ```
    <gp_vmem> = ((<SWAP> + <RAM>) – (7.5GB + 0.05 * <RAM> - (300KB * <total_#_workfiles>))) / 1.7
    ```

-   If the total system memory is equal to or greater than 256 GB:

    ```
    <gp_vmem> = ((<SWAP> + <RAM>) – (7.5GB + 0.05 * <RAM> - (300KB * <total_#_workfiles>))) / 1.17
    ```

For information about monitoring and managing workfile usage, see the *WarehousePG Administrator Guide*.

Based on the `gp_vmem` value you can calculate the value for the `vm.overcommit_ratio` operating system kernel parameter. This parameter is set when you configure each WarehousePG host.

```
vm.overcommit_ratio = (<RAM> - (0.026 * <gp_vmem>)) / <RAM>
```

> **Note** The default value for the kernel parameter `vm.overcommit_ratio` in Red Hat Enterprise Linux is 50.

For information about the kernel parameter, see the *WarehousePG Installation Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|8192|local, system, restart|

## <a id="gp_vmem_protect_segworker_cache_limit"></a>gp\_vmem\_protect\_segworker\_cache\_limit 

If a query executor process consumes more than this configured amount, then the process will not be cached for use in subsequent queries after the process completes. Systems with lots of connections or idle processes may want to reduce this number to free more memory on the segments. Note that this is a local parameter and must be set for every segment.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of megabytes|500|local, system, restart|

## <a id="gp_workfile_compression"></a>gp\_workfile\_compression 

Specifies whether the temporary files created, when a hash aggregation or hash join operation spills to disk, are compressed.

If your WarehousePG installation uses serial ATA \(SATA\) disk drives, enabling compression might help to avoid overloading the disk subsystem with IO operations.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="gp_workfile_limit_files_per_query"></a>gp\_workfile\_limit\_files\_per\_query 

Sets the maximum number of temporary spill files \(also known as workfiles\) allowed per query per segment. Spill files are created when running a query that requires more memory than it is allocated. The current query is terminated when the limit is exceeded.

Set the value to 0 \(zero\) to allow an unlimited number of spill files. coordinator session reload

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|100000|coordinator, session, reload|

## <a id="gp_workfile_limit_per_query"></a>gp\_workfile\_limit\_per\_query 

Sets the maximum disk size an individual query is allowed to use for creating temporary spill files at each segment. The default value is 0, which means a limit is not enforced.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|kilobytes|0|coordinator, session, reload|

## <a id="gp_workfile_limit_per_segment"></a>gp\_workfile\_limit\_per\_segment 

Sets the maximum total disk size that all running queries are allowed to use for creating temporary spill files at each segment. The default value is 0, which means a limit is not enforced.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|kilobytes|0|local, system, restart|

## <a id="gpfdist_retry_timeout"></a>gpfdist\_retry\_timeout 

Controls the time \(in seconds\) that WarehousePG waits before returning an error when WarehousePG is attempting to connect or write to a [gpfdist](../../utility_guide/ref/gpfdist.html) server and `gpfdist` does not respond. The default value is 300 \(5 minutes\). A value of 0 deactivates the timeout.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - `INT_MAX` \(2147483647\)|300|local, session, reload|

## <a id="ignore_checksum_failure"></a>ignore\_checksum\_failure 

Only has effect if [data\_checksums](#data_checksums) is enabled.

WarehousePG uses checksums to prevent loading data that has been corrupted in the file system into memory managed by database processes.

By default, when a checksum verify error occurs when reading a heap data page, WarehousePG generates an error and prevents the page from being loaded into managed memory. When `ignore_checksum_failure` is set to on and a checksum verify failure occurs, WarehousePG generates a warning, and allows the page to be read into managed memory. If the page is then updated it is saved to disk and replicated to the mirror. If the page header is corrupt an error is reported even if this option is enabled.

> **Caution** Setting `ignore_checksum_failure` to on may propagate or hide data corruption or lead to other serious problems. However, if a checksum failure has already been detected and the page header is uncorrupted, setting `ignore_checksum_failure` to on may allow you to bypass the error and recover undamaged tuples that may still be present in the table.

The default setting is off, and it can only be changed by a superuser.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|local, session, reload|

## <a id="integer_datetimes"></a>integer\_datetimes 

Reports whether PostgreSQL was built with support for 64-bit-integer dates and times.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|read only|

## <a id="IntervalStyle"></a>IntervalStyle 

Sets the display format for interval values. The value *sql\_standard* produces output matching SQL standard interval literals. The value *postgres* produces output matching PostgreSQL releases prior to 8.4 when the [DateStyle](#DateStyle) parameter was set to ISO.

The value *postgres\_verbose* produces output matching WarehousePG releases prior to 3.3 when the [DateStyle](#DateStyle) parameter was set to non-ISO output.

The value *iso\_8601* will produce output matching the time interval *format with designators* defined in section 4.4.3.2 of ISO 8601. See the [PostgreSQL 9.4 documentation](https://www.postgresql.org/docs/12/datatype-datetime.html) for more information.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|postgres, postgres\_verbose, sql\_standard, iso\_8601|postgres|coordinator, session, reload|

## <a id="jit"></a>jit

Determines whether JIT compilation may be used by WarehousePG. It enables or disables JIT for both GPORCA and Postgres-based planner.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|off|coordinator, session, reload|

## <a id="jit_above_cost"></a>jit\_above\_cost

When using Postgres-based planner, sets the query cost above which JIT compilation is activated when JIT is enabled. Performing JIT compilation costs planning time but can accelerate query execution. Note that setting the JIT cost parameters to ‘0’ forces all queries to be JIT-compiled and, as a result, slows down queries. Setting it to a negative value disables JIT compilation.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|100000|coordinator, session, reload|

## <a id="jit_debugging_support"></a>jit_debugging_support

If LLVM has the required functionality, register generated functions with GDB. This makes debugging easier. The default setting is `off`. This parameter can only be set at server start or when a client connection starts (for example using `PGOPTIONS`).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|off|coordinator, session, reload, superuser|

## <a id="jit_dump_bitcode"></a>jit_dump_bitcode

Writes the generated LLVM IR out to the file system, inside [data_directory](../../install_guide/create_data_dirs.html). This is only useful for working on the internals of the JIT implementation. The default setting is `off`. Only superusers and users with the appropriate `SET` privilege can change this setting.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|off|coordinator, session, reload|

## <a id="jit_expressions"></a>jit_expressions
 
Allows JIT compilation of expressions, when JIT compilation is activated.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|on|coordinator, session, reload|

## <a id="jit_inline_above_cost"></a>jit_inline_above_cost

When using Postgres-based planner, sets the query cost above which JIT compilation attempts to inline functions and operators. Inlining adds planning time, but can improve execution speed. It is not meaningful to set this to less than `jit_above_cost`. Note that setting the JIT cost parameters to ‘0’ forces all queries to be JIT-compiled and, as a result, slows down queries. Setting it to a negative value disables inlining.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|500000|coordinator, session, reload|

## <a id="jit_optimize_above_cost"></a>jit_optimize_above_cost

When using Postgres-based planner, sets the query cost above which JIT compilation applies expensive optimizations. Such optimization adds planning time, but can improve execution speed. It is not meaningful to set this to less than `jit_above_cost`, and it is unlikely to be beneficial to set it to more than `jit_inline_above_cost`. Note that setting the JIT cost parameters to ‘0’ forces all queries to be JIT-compiled and, as a result, slows down queries. Setting it to a negative value disables expensive optimizations.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|500000|coordinator, session, reload|

## <a id="jit_profiling_support"></a>jit_profiling_support

If LLVM has the required functionality, emit the data needed to allow `perf` command to profile functions generated by JIT. This writes out files to `~/.debug/jit/`. If you have set and loaded the environment variable `JITDUMPDIR`, it will write to `JITDUMPDIR/debug/jit` instead. You are responsible for performing cleanup when desired. The default setting is `off`. This parameter can only be set at server start or when a client connection starts (for example using `PGOPTIONS`).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|off|coordinator, session, reload, superuser|

## <a id="jit_provider"></a>jit_provider

Indicates the name of the JIT provider (library of JIT driver) to load. The default is `llvmjit`, any other value is not officially supported. This parameter can only be set at server start.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string|llvmjit|local, session, restart, superuser|

## <a id="jit_tuple_deforming"></a>jit_tuple_deforming
 
Allows JIT compilation of tuple deforming, when JIT compilation is activated.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|on|coordinator, session, reload|

## <a id="join_collapse_limit"></a>join\_collapse\_limit 

The Postgres-based planner will rewrite explicit inner `JOIN` constructs into lists of `FROM` items whenever a list of no more than this many items in total would result. By default, this variable is set the same as *from\_collapse\_limit*, which is appropriate for most uses. Setting it to 1 prevents any reordering of inner JOINs. Setting this variable to a value between 1 and *from\_collapse\_limit* might be useful to trade off planning time against the quality of the chosen plan \(higher values produce better plans\).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|1-*n*|20|coordinator, session, reload|

## <a id="krb_caseins_users"></a>krb\_caseins\_users 

Sets whether Kerberos user names should be treated case-insensitively. The default is case sensitive \(off\).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, system, reload|

## <a id="krb_server_keyfile"></a>krb\_server\_keyfile 

Sets the location of the Kerberos server key file.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|path and file name|unset|coordinator, system, restart|

## <a id="lc_collate"></a>lc\_collate 

Reports the locale in which sorting of textual data is done. The value is determined when the WarehousePG cluster is initialized.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|<system dependent\>| |read only|

## <a id="lc_ctype"></a>lc\_ctype 

Reports the locale that determines character classifications. The value is determined when the WarehousePG cluster is initialized.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|<system dependent\>| |read only|

## <a id="lc_messages"></a>lc\_messages 

Sets the language in which messages are displayed. The locales available depends on what was installed with your operating system - use *locale -a* to list available locales. The default value is inherited from the execution environment of the server. On some systems, this locale category does not exist. Setting this variable will still work, but there will be no effect. Also, there is a chance that no translated messages for the desired language exist. In that case you will continue to see the English messages.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|<system dependent\>| |local, session, reload|

## <a id="lc_monetary"></a>lc\_monetary 

Sets the locale to use for formatting monetary amounts, for example with the *to\_char* family of functions. The locales available depends on what was installed with your operating system - use *locale -a* to list available locales. The default value is inherited from the execution environment of the server.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|<system dependent\>| |local, session, reload|

## <a id="lc_numeric"></a>lc\_numeric 

Sets the locale to use for formatting numbers, for example with the *to\_char* family of functions. The locales available depends on what was installed with your operating system - use *locale -a* to list available locales. The default value is inherited from the execution environment of the server.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|<system dependent\>| |local, system, restart|

## <a id="lc_time"></a>lc\_time 

This parameter currently does nothing, but may in the future.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|<system dependent\>| |local, system, restart|

## <a id="listen_addresses"></a>listen\_addresses 

Specifies the TCP/IP address\(es\) on which the server is to listen for connections from client applications - a comma-separated list of host names and/or numeric IP addresses. The special entry \* corresponds to all available IP interfaces. If the list is empty, only UNIX-domain sockets can connect.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|localhost, host names, IP addresses, \* \(all available IP interfaces\)|\*|coordinator, system, restart|

## <a id="local_preload_libraries"></a>local\_preload\_libraries 

Comma separated list of shared library files to preload at the start of a client session.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
| | |local, system, restart|

## <a id="lock_timeout"></a>lock\_timeout 

Abort any statement that waits longer than the specified number of milliseconds while attempting to acquire a lock on a table, index, row, or other database object. The time limit applies separately to each lock acquisition attempt. The limit applies both to explicit locking requests \(such as `LOCK TABLE`, or `SELECT FOR UPDATE` without `NOWAIT`\) and to implicitly-acquired locks. If `log_min_error_statement` is set to `ERROR` or lower, WarehousePG logs the statement that timed out. A value of zero \(the default\) turns off this lock wait monitoring.

Unlike [statement\_timeout](#statement_timeout), this timeout can only occur while waiting for locks. Note that if `statement_timeout` is nonzero, it is rather pointless to set `lock_timeout` to the same or larger value, since the statement timeout would always trigger first.

WarehousePG uses the [deadlock\_timeout](#deadlock_timeout) and [gp\_global\_deadlock\_detector\_period](#gp_global_deadlock_detector_period) to trigger local and global deadlock detection. Note that if `lock_timeout` is turned on and set to a value smaller than these deadlock detection timeouts, WarehousePG will abort a statement before it would ever trigger a deadlock check in that session.

> **Note** Setting `lock_timeout` in `postgresql.conf` is not recommended because it would affect all sessions

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - `INT_MAX` millisecs|0 millisecs|coordinator, session, reload|

## <a id="log_autostats"></a>log\_autostats 

Logs information about automatic `ANALYZE` operations related to [gp\_autostats\_mode](#gp_autostats_mode)and [gp\_autostats\_on\_change\_threshold](#gp_autostats_on_change_threshold).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload, superuser|

## <a id="log_connections"></a>log\_connections 

This outputs a line to the server log detailing each successful connection. Some client programs, like psql, attempt to connect twice while determining if a password is required, so duplicate "connection received" messages do not always indicate a problem.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|local, system, reload|

## <a id="log_checkpoints"></a>log\_checkpoints

Causes checkpoints and restartpoints to be logged in the server log. Some statistics are included in the log messages, including the number of buffers written and the time spent writing them.

|Value Range| Default | Set Classifications    |
|-----------|---------|------------------------|
|Boolean| on| local, system, reload  |

## <a id="log_directory"></a>log\_directory

Sets the destination directory for log files. You may specify its value as relative to the coordinator and segments data directory or as absolute path. Only superusers and users privilege can change this setting. The default value, `log`, indicates that the logs are located in the `log` directory under the coordinator and segment data directory.

When you specify the value as an absolute path, or as a relative path that is outside the data directory, WarehousePG appends a subdirectory with a unique identifier (DBID) to the directory specified by this parameter. The unique identifier matches the value of `dbid` from `gp_segment_configuration`. For example, if you set `log_directory` as `/tmp/logs`, WarehousePG creates the directories: `/tmp/logs/1` for the coordinator, `/tmp/logs/2` for seg0, `/tmp/logs/3` for seg1, etcetera. 

> **Important** Do not remove the default log directories as some WarehousePG utilities will still need them during initialization.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|String|log|coordinator, system, reload, superuser|

## <a id="log_disconnections"></a>log\_disconnections 

This outputs a line in the server log at termination of a client session, and includes the duration of the session.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|local, system, reload|

## <a id="log_dispatch_stats"></a>log\_dispatch\_stats 

When set to "on," this parameter adds a log message with verbose information about the dispatch of the statement.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|local, system, reload|

## <a id="log_duration"></a>log\_duration 

Causes the duration of every completed statement which satisfies *log\_statement* to be logged.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload, superuser|

## <a id="log_error_verbosity"></a>log\_error\_verbosity 

Controls the amount of detail written in the server log for each message that is logged.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|TERSE, DEFAULT, VERBOSE|DEFAULT|coordinator, session, reload, superuser|

## <a id="log_executor_stats"></a>log\_executor\_stats 

For each query, write performance statistics of the query executor to the server log. This is a crude profiling instrument. Cannot be enabled together with *log\_statement\_stats*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|local, system, restart|

## <a id="log_file_mode"></a>log\_file\_mode 

On Unix systems this parameter sets the permissions for log files when `logging_collector` is enabled. The parameter value is expected to be a numeric mode specified in the format accepted by the `chmod` and `umask` system calls.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|numeric UNIX file permission mode \(as accepted by the *chmod* or *umask* commands\)|0600|local, system, reload|

## <a id="log_hostname"></a>log\_hostname 

By default, connection log messages only show the IP address of the connecting host. Turning on this option causes logging of the IP address and host name of the WarehousePG coordinator. Note that depending on your host name resolution setup this might impose a non-negligible performance penalty.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, system, reload|

## <a id="log_min_duration_statement"></a>log\_min\_duration\_statement 

Logs the statement and its duration on a single log line if its duration is greater than or equal to the specified number of milliseconds. Setting this to 0 will print all statements and their durations. -1 deactivates the feature. For example, if you set it to 250 then all SQL statements that run 250ms or longer will be logged. Enabling this option can be useful in tracking down unoptimized queries in your applications.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of milliseconds, 0, -1|-1|coordinator, session, reload, superuser|

## <a id="log_min_error_statement"></a>log\_min\_error\_statement 

Controls whether or not the SQL statement that causes an error condition will also be recorded in the server log. All SQL statements that cause an error of the specified level or higher are logged. The default is ERROR. To effectively turn off logging of failing statements, set this parameter to PANIC.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|DEBUG5, DEBUG4, DEBUG3, DEBUG2, DEBUG1, INFO, NOTICE, WARNING, ERROR, FATAL, PANIC|ERROR|coordinator, session, reload, superuser|

## <a id="log_min_messages"></a>log\_min\_messages 

Controls which message levels are written to the server log. Each level includes all the levels that follow it. The later the level, the fewer messages are sent to the log.


|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|DEBUG5, DEBUG4, DEBUG3, DEBUG2, DEBUG1, INFO, NOTICE, WARNING, LOG, ERROR, FATAL, PANIC|WARNING|coordinator, session, reload, superuser|

## <a id="log_parser_stats"></a>log\_parser\_stats 

For each query, write performance statistics of the query parser to the server log. This is a crude profiling instrument. Cannot be enabled together with *log\_statement\_stats*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload, superuser|

## <a id="log_planner_stats"></a>log\_planner\_stats 

For each query, write performance statistics of the Postgres-based planner to the server log. This is a crude profiling instrument. Cannot be enabled together with *log\_statement\_stats*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload, superuser|

## <a id="log_rotation_age"></a>log\_rotation\_age 

Determines the amount of time WarehousePG writes messages to the active log file. When this amount of time has elapsed, the file is closed and a new log file is created. Set to zero to deactivate time-based creation of new log files.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Any valid time expression \(number and unit\)|1d|local, system, restart|

## <a id="log_rotation_size"></a>log\_rotation\_size 

Determines the size of an individual log file that triggers rotation. When the log file size is equal to or greater than this size, the file is closed and a new log file is created. Set to zero to deactivate size-based creation of new log files.

The maximum value is INT\_MAX/1024. If an invalid value is specified, the default value is used. INT\_MAX is the largest value that can be stored as an integer on your system.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of kilobytes|1048576|local, system, restart|

## <a id="log_statement"></a>log\_statement 

Controls which SQL statements are logged. DDL logs all data definition commands like CREATE, ALTER, and DROP commands. MOD logs all DDL statements, plus INSERT, UPDATE, DELETE, TRUNCATE, and COPY FROM. PREPARE and EXPLAIN ANALYZE statements are also logged if their contained command is of an appropriate type.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|NONE, DDL, MOD, ALL|ALL|coordinator, session, reload, superuser|

## <a id="log_statement_stats"></a>log\_statement\_stats 

For each query, write total performance statistics of the query parser, planner, and executor to the server log. This is a crude profiling instrument.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload, superuser|

## <a id="log_temp_files"></a>log\_temp\_files 

Controls logging of temporary file names and sizes. Temporary files can be created for sorts, hashes, temporary query results and spill files. A log entry is made in `log` for each temporary file when it is deleted. Depending on the source of the temporary files, the log entry could be created on either the coordinator and/or segments. A `log_temp_files` value of zero logs all temporary file information, while positive values log only files whose size is greater than or equal to the specified number of kilobytes. The default setting is `-1`, which deactivates logging. Only superusers can change this setting.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Integer|-1|local, session, reload|

## <a id="log_timezone"></a>log\_timezone 

Sets the time zone used for timestamps written in the log. Unlike [TimeZone](#TimeZone), this value is system-wide, so that all sessions will report timestamps consistently. The default is `unknown`, which means to use whatever the system environment specifies as the time zone.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string|unknown|local, system, restart|

## <a id="log_truncate_on_rotation"></a>log\_truncate\_on\_rotation 

Truncates \(overwrites\), rather than appends to, any existing log file of the same name. Truncation will occur only when a new file is being opened due to time-based rotation. For example, using this setting in combination with a log\_filename such as `gpseg#-%H.log` would result in generating twenty-four hourly log files and then cyclically overwriting them. When off, pre-existing files will be appended to in all cases.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|local, system, reload|

## <a id="maintenance_work_mem"></a>maintenance\_work\_mem 

Specifies the maximum amount of memory to be used in maintenance operations, such as `VACUUM` and `CREATE INDEX`. It defaults to 16 megabytes \(16MB\). Larger settings might improve performance for vacuuming and for restoring database dumps.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Integer|16|local, system, reload|

## <a id="max_connections"></a>max\_connections 

The maximum number of concurrent connections to the database server. In a WarehousePG cluster, user client connections go through the WarehousePG coordinator instance only. Segment instances should allow 3-10 times the amount as the coordinator. When you increase this parameter, [max\_prepared\_transactions](#max_prepared_transactions) must be increased as well. For more information about limiting concurrent connections, see "Configuring Client Authentication" in the *WarehousePG Administrator Guide*.

Increasing this parameter may cause WarehousePG to request more shared memory. See [shared\_buffers](#shared_buffers) for information about WarehousePG server instance shared memory buffers.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|10 - 262143|250 on coordinator750 on segments

|local, system, restart|

## <a id="max_files_per_process"></a>max\_files\_per\_process 

Sets the maximum number of simultaneously open files allowed to each server subprocess. If the kernel is enforcing a safe per-process limit, you don't need to worry about this setting. Some platforms such as BSD, the kernel will allow individual processes to open many more files than the system can really support.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|1000|local, system, restart|

## <a id="max_function_args"></a>max\_function\_args 

Reports the maximum number of function arguments.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|100|read only|

## <a id="max_identifier_length"></a>max\_identifier\_length 

Reports the maximum identifier length.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|63|read only|

## <a id="max_index_keys"></a>max\_index\_keys 

Reports the maximum number of index keys.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|32|read only|

## <a id="max_locks_per_transaction"></a>max\_locks\_per\_transaction 

The shared lock table is created with room to describe locks on *max\_locks\_per\_transaction* \* \(*max\_connections* + *max\_prepared\_transactions*\) objects, so no more than this many distinct objects can be locked at any one time. This is not a hard limit on the number of locks taken by any one transaction, but rather a maximum average value. You might need to raise this value if you have clients that touch many different tables in a single transaction.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|128|local, system, restart|

## <a id="max_prepared_transactions"></a>max\_prepared\_transactions 

Sets the maximum number of transactions that can be in the prepared state simultaneously. WarehousePG uses prepared transactions internally to ensure data integrity across the segments. This value must be at least as large as the value of [max\_connections](#max_connections) on the coordinator. Segment instances should be set to the same value as the coordinator.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|250 on coordinator, 250 on segments|local, system, restart|

## <a id="max_resource_portals_per_transaction"></a>max\_resource\_portals\_per\_transaction 

> **Note** The `max_resource_portals_per_transaction` server configuration parameter is enforced only when resource queue-based resource management is active.

Sets the maximum number of simultaneously open user-declared cursors allowed per transaction. Note that an open cursor will hold an active query slot in a resource queue. Used for resource management.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|64|coordinator, system, restart|

## <a id="max_resource_queues"></a>max\_resource\_queues 

> **Note** The `max_resource_queues` server configuration parameter is enforced only when resource queue-based resource management is active.

Sets the maximum number of resource queues that can be created in a WarehousePG cluster. Note that resource queues are system-wide \(as are roles\) so they apply to all databases in the system.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|9|coordinator, system, restart|

## <a id="max_slot_wal_keep_size"></a>max_slot_wal_keep_size 

Sets the maximum size in megabytes of Write-Ahead Logging (WAL) files on disk per segment instance that can be reserved when WarehousePG streams data to the mirror segment instance or standby coordinator to keep it synchronized with the corresponding primary segment instance or coordinator. The default is -1; when set to the default, WarehousePG can retain an unlimited amount of WAL files on disk.

If the file size exceeds the maximum size, the files are released and are available for deletion. A mirror or standby may no longer be able to continue replication due to removal of required WAL files.

In WarehousePG, replication slots exist internally by default for primary/mirror pairs. Consequently, even if you do not configure this parameter, that functionality is available by default. 

>> **CAUTION** If `max_slot_wal_keep_size` is set to a non-default value for acting primaries, full and incremental recovery of their mirrors may not be possible. Depending on the workload on the primary running concurrently with a full recovery, the recovery may fail with a missing WAL error. Therefore, you must ensure that `max_slot_wal_keep_size` is set to the default of `-1` or a high enough value before running full recovery. Similarly, depending on how behind the downed mirror is, an incremental recovery of it may fail with a missing WAL error. In this case, full recovery would be the only recourse.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Integer|-1|local, system, reload|

## <a id="max_stack_depth"></a>max\_stack\_depth 

Specifies the maximum safe depth of the server's execution stack. The ideal setting for this parameter is the actual stack size limit enforced by the kernel \(as set by *ulimit -s* or local equivalent\), less a safety margin of a megabyte or so. Setting the parameter higher than the actual kernel limit will mean that a runaway recursive function can crash an individual backend process.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of kilobytes|2MB|local, session, reload|

## <a id="max_statement_mem"></a>max\_statement\_mem 

Sets the maximum memory limit for a query. Helps avoid out-of-memory errors on a segment host during query processing as a result of setting [statement\_mem](#statement_mem) too high.

Taking into account the configuration of a single segment host, calculate `max_statement_mem` as follows:

`(seghost_physical_memory) / (average_number_concurrent_queries)`

When changing both `max_statement_mem` and `statement_mem`, `max_statement_mem` must be changed first, or listed first in the postgresql.conf file.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of kilobytes|2000MB|coordinator, session, reload, superuser|

## <a id="max_wal_size"></a>max\_wal\_size

Sets the WAL size at which to trigger a checkpoint. This is the maximum size WarehousePG allows the WAL to grow during automatic checkpoints. This is a soft limit; WAL size can exceed `max_wal_size` under special circumstances, such as heavy load, a failing archive_command, or a high `wal_keep_segments` setting.

If you specify this value without units, it is taken as megabytes. The default is 1 GB.

Increasing this parameter can increase the amount of time needed for crash recovery.

You can set this parameter only in the `postgresql.conf` file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|2 - `MAX_KILOBYTES` (integer) |1024|local, system, reload|

## <a id="min_wal_size"></a>min\_wal\_size

Sets the minimum size to which to shrink the WAL. As long as WAL disk usage stays below this setting, WarehousePG always recycles old WAL files for future use at a checkpoint, rather than remove them. You can use this parameter to ensure that enough WAL space is reserved to handle spikes in WAL usage, for example when running large batch jobs.

If you specify this value without units, it is taken as megabytes. The default is `320` MB.

You can set this parameter only in the `postgresql.conf` file or on the server command line.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|2 - `MAX_KILOBYTES` (integer) |320|local, system, reload|

## <a id="optimizer"></a>optimizer 

 Activates or deactivates  GPORCA when running SQL queries. The default is `on`. If you deactivate GPORCA, WarehousePG uses only the Postgres-based planner.

GPORCA co-exists with the Postgres-based planner. With GPORCA enabled, WarehousePG uses GPORCA to generate an execution plan for a query when possible. If GPORCA cannot be used, then the Postgres-based planner is used.

The optimizer parameter can be set for a database system, an individual database, or a session or query.

For information about the Postgres-based planner and GPORCA, see [SQL: Querying Data](../../admin_guide/query/topics/query.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="optimizer_analyze_root_partition"></a>optimizer\_analyze\_root\_partition 

For a partitioned table, controls whether the `ROOTPARTITION` keyword is required to collect root partition statistics when the `ANALYZE` command is run on the table. GPORCA uses the root partition statistics when generating a query plan. The Postgres-based planner does not use these statistics.

The default setting for the parameter is `on`, the `ANALYZE` command can collect root partition statistics without the `ROOTPARTITION` keyword. Root partition statistics are collected when you run `ANALYZE` on the root partition, or when you run `ANALYZE` on a leaf partition of the partitioned table and the other leaf partitions have statistics. When the value is `off`, you must run `ANALZYE ROOTPARTITION` to collect root partition statistics.

When the value of the server configuration parameter [optimizer](#optimizer) is `on` \(the default\), the value of this parameter should also be `on`. For information about collecting table statistics on partitioned tables, see [ANALYZE](../sql_commands/ANALYZE.html).

For information about the Postgres-based planner and GPORCA, see [SQL: Querying Data](../../admin_guide/query/topics/query.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="optimizer_array_expansion_threshold"></a>optimizer\_array\_expansion\_threshold 

When GPORCA is enabled \(the default\) and is processing a query that contains a predicate with a constant array, the `optimizer_array_expansion_threshold` parameter limits the optimization process based on the number of constants in the array. If the array in the query predicate contains more than the number elements specified by parameter, GPORCA deactivates the transformation of the predicate into its disjunctive normal form during query optimization.

The default value is 20.

For example, when GPORCA is running a query that contains an `IN` clause with more than 20 elements, GPORCA does not transform the predicate into its disjunctive normal form during query optimization to reduce optimization time consume less memory. The difference in query processing can be seen in the filter condition for the `IN` clause of the query `EXPLAIN` plan.

Changing the value of this parameter changes the trade-off between a shorter optimization time and lower memory consumption, and the potential benefits from constraint derivation during query optimization, for example conflict detection and partition elimination.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Integer \> 0|20|coordinator, session, reload|

## <a id="optimizer_control"></a>optimizer\_control 

Controls whether the server configuration parameter optimizer can be changed with SET, the RESET command, or the WarehousePG utility gpconfig. If the `optimizer_control` parameter value is `on`, users can set the optimizer parameter. If the `optimizer_control` parameter value is `off`, the optimizer parameter cannot be changed.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload, superuser|

## <a id="optimizer_cost_model"></a>optimizer\_cost\_model 

When GPORCA is enabled \(the default\), this parameter controls the cost model that GPORCA chooses for bitmap scans used with bitmap indexes or with btree indexes on AO tables.

-   `legacy` - preserves the calibrated cost model used by GPORCA in WarehousePG releases 6.13 and earlier
-   `calibrated` - improves cost estimates for indexes
-   `experimental` - reserved for future experimental cost models; currently equivalent to the `calibrated` model

The default cost model, `calibrated`, is more likely to choose a faster bitmap index with nested loop joins instead of hash joins.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|legacy, calibrated, experimental|calibrated|coordinator, session, reload|

## <a id="optimizer_cte_inlining_bound"></a>optimizer\_cte\_inlining\_bound 

When GPORCA is enabled \(the default\), this parameter controls the amount of inlining performed for common table expression \(CTE\) queries \(queries that contain a `WITH` clause\). The default value, 0, deactivates inlining.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Decimal \>= 0|0|coordinator, session, reload|

## <a id="optimizer_dpe_stats"></a>optimizer\_dpe\_stats 

When GPORCA is enabled \(the default\) and this parameter is `true` \(the default\), GPORCA derives statistics that allow it to more accurately estimate the number of rows to be scanned during dynamic partition elimination.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="optimizer_discard_redistribute_hashjoin"></a>optimizer\_discard\_redistribute\_hashjoin

When GPORCA is enabled \(the default\), this parameter specifies whether the query optimizer should eliminate plans that include a HashJoin operator with a Redistribute Motion child. Eliminating such plans can improve performance in cases where the data being joined exhibits high skewness in the join keys.

The default setting is `off`, GPORCA considers all plan alternatives, including those with a Redistribute Motion child, in the HashJoin operator. If you observe performance issues with queries that use a HashJoin with highly skewed data, you may want to consider setting `optimizer_discard_redistribute_hashjoin` to `on` to instruct GPORCA to discard such plans.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|


## <a id="optimizer_enable_associativity"></a>optimizer\_enable\_associativity 

When GPORCA is enabled \(the default\), this parameter controls whether the join associativity transform is enabled during query optimization. The transform analyzes join orders. For the default value `off`, only the GPORCA dynamic programming algorithm for analyzing join orders is enabled. The join associativity transform largely duplicates the functionality of the newer dynamic programming algorithm.

If the value is `on`, GPORCA can use the associativity transform during query optimization.

The parameter can be set for a database system, an individual database, or a session or query.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="optimizer_enable_dml"></a>optimizer\_enable\_dml 

When GPORCA is enabled \(the default\) and this parameter is `true` \(the default\), GPORCA attempts to run DML commands such as `INSERT`, `UPDATE`, and `DELETE`. If GPORCA cannot run the command, WarehousePG falls back to the Postgres-based planner.

When set to `false`, WarehousePG always falls back to the Postgres-based planner when performing DML commands.

The parameter can be set for a database system, an individual database, or a session or query.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="optimizer_enable_dynamicindexonlyscan"></a>optimizer\_enable\_dynamicindexonlyscan

When GPORCA is enabled \(the default\), the `optimizer_enable_dynamicindexonlyscan` parameter controls generation of dynamic index-only scan plan types.

The default value is `on`, GPORCA may generate a dynamic index only scan alternative when planning a query on a partitioned table that does not include single row volatile (SIRV) functions.

When set to `off`, GPORCA does not generate dynamic index-only scan plan alternatives.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="optimizer_enable_foreign_table"></a>optimizer\_enable\_foreign\_table

When GPORCA is enabled \(the default\) and this configuration parameter is `true` \(the default\), GPORCA generates plans for queries that involve foreign tables. When `false`, queries that include foreign tables fall back to the Postgres-based planner.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="optimizer_enable_indexonlyscan"></a>optimizer\_enable\_indexonlyscan 

When GPORCA is enabled \(the default\) and this parameter is `true` \(the default\), GPORCA can generate index-only scan plan types for B-tree indexes and any index type that contains all of the columns used by the query inside the index. (GiST indexes support index-only scans for some operator classes but not others.) GPORCA accesses the index values only, not the data blocks of the relation. This provides a query execution performance improvement, particularly when the table has been vacuumed, has wide columns, and GPORCA does not need to fetch any data blocks \(for example, they are visible\).

When deactivated \(`false`\), GPORCA does not generate index-only scan plan types.

The parameter can be set for a database system, an individual database, or a session or query.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="optimizer_enable_coordinator_only_queries"></a>optimizer\_enable\_coordinator\_only\_queries 

When GPORCA is enabled \(the default\), this parameter allows GPORCA to run catalog queries that run only on the WarehousePG coordinator. For the default value `off`, only the Postgres-based planner can run catalog queries that run only on the WarehousePG coordinator.

The parameter can be set for a database system, an individual database, or a session or query.

> **Note** Enabling this parameter decreases performance of short running catalog queries. To avoid this issue, set this parameter only for a session or a query.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="optimizer_enable_multiple_distinct_aggs"></a>optimizer\_enable\_multiple\_distinct\_aggs 

When GPORCA is enabled \(the default\), this parameter allows GPORCA to support Multiple Distinct Qualified Aggregates, such as `SELECT count(DISTINCT a),sum(DISTINCT b) FROM foo`. This parameter is deactivated by default because its plan is generally suboptimal in comparison to the plan generated by the Postgres-based planner.

The parameter can be set for a database system, an individual database, or a session or query.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="optimizer_enable_orderedagg"></a>optimizer\_enable\_orderedagg 

When GPORCA is enabled \(the default\), this parameter determines whether or not GPORCA generates a query plan for ordered aggregates.

The default value is `on`, GPORCA generates a plan for a query that includes an ordered aggregate. When `off`, the query falls back to the Postgres-based planner.

You can set this parameter for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="optimizer_enable_push_join_below_union_all"></a>optimizer\_enable\_push\_join\_below\_union\_all

When GPORCA is enabled \(the default\), the `optimizer_enable_push_join_below_union_all` parameter controls GPORCA's behaviour when it encounters a query that includes a `JOIN` of a `UNION ALL`.

The default value is `off`, GPORCA performs no transforms when a query includes a `JOIN` of a `UNION ALL`.

When set to `on` and the plan cost makes it eligible, GPORCA transforms a `JOIN` of `UNION ALL` to a `UNION ALL` of `JOIN`s. This transform may improve join performance when the `UNION ALL` children can benefit from join operations for which they are not eligible. Such an example is an indexed nested loop join, which is highly performant when the inner side is large and indexed, and the outer side is small. When the `UNION ALL` of multiple indexed large tables is joined with a small table, this transform pushes the join condition down as the index condition, and generates a more performant query than that utilizing a hash join.

Enabling this transform may increase planning time, so be sure to run and examine `EXPLAIN` output for the query with both parameter settings.

The `optimizer_enable_push_join_below_union_all` parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="optimizer_enable_replicated_table"></a>optimizer\_enable\_replicated\_table 

When GPORCA is enabled \(the default\), this parameter controls GPORCA's behavior when it encounters DML operations on a replicated table.

The default value is `on`, GPORCA attempts to plan and execute operations on replicated tables. When `off`, GPORCA immediately falls back to the Postgres-based planner when it detects replicated table operations.

The parameter can be set for a database system, an individual database, or a session or query.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="optimizer_enable_right_outer_join"></a>optimizer_enable_right_outer_join 

When GPORCA is enabled (the default), this parameter allows you to control whether GPORCA generates right outer joins. 

When set to the default value of `on`, GPORCA may both generate right outer joins and convert left outer joins to right outer joins if the situation calls for it. By setting this to `off`, you force GPORCA to generate equivalent left outer joins for incoming right outer joins and never generate right outer joins. 

In situations in which you are observing poor performance related to right outer joins you may choose to suppress their use by setting this parameter to `off`.

You may set this parameter for a database system, an individual database, or a session or query. However, we recommend that you set this parameter at the query level, as there are a number of use cases where right outer join is the correct query plan alternative to choose.

For information about GPORCA, see the [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) topic.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="optimizer_force_agg_skew_avoidance"></a>optimizer\_force\_agg\_skew\_avoidance 

When GPORCA is enabled \(the default\), this parameter affects the query plan alternatives that GPORCA considers when 3 stage aggregate plans are generated. When the value is `true`, the default, GPORCA considers only 3 stage aggregate plans where the intermediate aggregation uses the `GROUP BY` and `DISTINCT` columns for distribution to reduce the effects of processing skew.

If the value is `false`, GPORCA can also consider a plan that uses `GROUP BY` columns for distribution. These plans might perform poorly when processing skew is present.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="optimizer_force_comprehensive_join_implementation"></a>optimizer\_force\_comprehensive\_join\_implementation 

When GPORCA is enabled \(the default\), this parameter affects its consideration of nested loop join and hash join alternatives.

The default value is `false`, GPORCA does not consider nested loop join alternatives when a hash join is available, which significantly improves optimization performance for most queries. When set to `true`, GPORCA will explore nested loop join alternatives even when a hash join is possible.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload|

## <a id="optimizer_force_multistage_agg"></a>optimizer\_force\_multistage\_agg 

For the default settings, GPORCA is enabled and this parameter is `false`, GPORCA makes a cost-based choice between a one- or two-stage aggregate plan for a scalar distinct qualified aggregate. When `true`, GPORCA chooses a multi-stage aggregate plan when such a plan alternative is generated.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload|

## <a id="optimizer_force_three_stage_scalar_dqa"></a>optimizer\_force\_three\_stage\_scalar\_dqa 

For the default settings, GPORCA is enabled and this parameter is `true`, GPORCA chooses a plan with multistage aggregates when such a plan alternative is generated. When the value is `false`, GPORCA makes a cost based choice rather than a heuristic choice.

The parameter can be set for a database system, an individual database, or a session, or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="optimizer_jit_above_cost"></a>optimizer_jit_above_cost

When using GPORCA, sets the query cost above which JIT compilation is activated when JIT is enabled. Performing JIT compilation costs planning time but can accelerate query execution. Note that setting the JIT cost parameters to ‘0’ forces all queries to be JIT-compiled and, as a result, slows down queries. Setting it to a negative value disables JIT compilation.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Floating point|7500|coordinator, session, reload|

## <a id="optimizer_jit_inline_above_cost"></a>optimizer_jit_inline_above_cost

When using GPORCA, sets the query cost above which JIT compilation attempts to inline functions and operators. Inlining adds planning time, but can improve execution speed. It is not meaningful to set this to less than jit_above_cost. Note that setting the JIT cost parameters to ‘0’ forces all queries to be JIT-compiled and, as a result, slows down queries. Setting it to a negative value disables inlining.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Floating point|37500|coordinator, session, reload|

## <a id="optimizer_jit_optimize_above_cost"></a>optimizer_jit_optimize_above_cost

When using GPORCA, sets the query cost above which JIT compilation applies expensive optimizations. Such optimization adds planning time, but can improve execution speed. It is not meaningful to set this to less than `optimizer_jit_above_cost`, and it is unlikely to be beneficial to set it to more than `optimizer_jit_inline_above_cost`. Note that setting the JIT cost parameters to ‘0’ forces all queries to be JIT-compiled and, as a result, slows down queries. Setting it to a negative value disables expensive optimizations.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Floating point|37500|coordinator, session, reload|

## <a id="optimizer_join_arity_for_associativity_commutativity"></a>optimizer\_join\_arity\_for\_associativity\_commutativity 

The value is an optimization hint to limit the number of join associativity and join commutativity transformations explored during query optimization. The limit controls the alternative plans that GPORCA considers during query optimization. For example, the default value of 18 is an optimization hint for GPORCA to stop exploring join associativity and join commutativity transformations when an n-ary join operator has more than 18 children during optimization.

For a query with a large number of joins, specifying a lower value improves query performance by limiting the number of alternate query plans that GPORCA evaluates. However, setting the value too low might cause GPORCA to generate a query plan that performs sub-optimally.

This parameter has no effect when the `optimizer_join_order` parameter is set to `query` or `greedy`.

This parameter can be set for a database system or a session.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \> 0|18|local, system, reload|

## <a id="optimizer_join_order"></a>optimizer\_join\_order 

When GPORCA is enabled (the default), this parameter sets the join enumeration algorithm:

-   `query` - Uses the join order specified in the query.
-   `greedy` - Evaluates the join order specified in the query and alternatives based on minimum cardinalities of the relations in the joins.
-   `exhaustive` - Applies transformation rules to find and evaluate up to a configurable threshold number \(`optimizer_join_order_threshold`, default 10\) of n-way inner joins, and then uses the `greedy` method for the remainder. While planning time drops significantly at that point, plan quality and execution time may get worse.
-   `exhaustive2` - Operates with an emphasis on generating join orders that are suitable for dynamic partition elimination. This algorithm applies transformation rules to find and evaluate n-way inner and outer joins. When evaluating very
large joins with more than `optimizer_join_order_threshold` \(default 10\) tables, this algorithm employs a gradual transition to the `greedy` method; planning time goes up smoothly as the query gets more complicated, and plan quality and execution time only gradually degrade. `exhaustive2` provides a good trade-off between planning time and execution time for many queries.

The default value is `exhaustive2`.

Setting this parameter to `query` or `greedy` can generate a suboptimal query plan. However, if the administrator is confident that a satisfactory plan is generated with the `query` or `greedy` setting, query optimization time can be improved by setting the parameter to the lower optimization level.

Setting this parameter to `query` or `greedy` overrides the `optimizer_join_order_threshold` and `optimizer_join_arity_for_associativity_commutativity` parameters.

This parameter can be set for an individual database, a session, or a query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|query, greedy, exhaustive, exhaustive2 |exhaustive2|coordinator, session, reload|

## <a id="optimizer_join_order_threshold"></a>optimizer\_join\_order\_threshold 

When GPORCA is enabled \(the default\), this parameter sets the maximum number of join children for which GPORCA will use the dynamic programming-based join ordering algorithm. You can set this value for a single query or for an entire session.

This parameter has no effect when the `optimizer_join_query` parameter is set to `query` or `greedy`.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - 12|10|coordinator, session, reload|

## <a id="optimizer_mdcache_size"></a>optimizer\_mdcache\_size 

Sets the maximum amount of memory on the WarehousePG coordinator that GPORCA uses to cache query metadata \(optimization data\) during query optimization. The memory limit session based. GPORCA caches query metadata during query optimization with the default settings: GPORCA is enabled and [optimizer\_metadata\_caching](#optimizer_metadata_caching) is `on`.

The default value is 16384 \(16MB\). This is an optimal value that has been determined through performance analysis.

You can specify a value in KB, MB, or GB. The default unit is KB. For example, a value of 16384 is 16384KB. A value of 1GB is the same as 1024MB or 1048576KB. If the value is 0, the size of the cache is not limited.

This parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Integer \>= 0|16384|coordinator, session, reload|

## <a id="optimizer_metadata_caching"></a>optimizer\_metadata\_caching 

When GPORCA is enabled \(the default\), this parameter specifies whether GPORCA caches query metadata \(optimization data\) in memory on the WarehousePG coordinator during query optimization. The default for this parameter is `on`, enable caching. The cache is session based. When a session ends, the cache is released. If the amount of query metadata exceeds the cache size, then old, unused metadata is evicted from the cache.

If the value is `off`, GPORCA does not cache metadata during query optimization.

This parameter can be set for a database system, an individual database, or a session or query.

The server configuration parameter [optimizer\_mdcache\_size](#optimizer_mdcache_size) controls the size of the query metadata cache.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="optimizer_minidump"></a>optimizer\_minidump 

GPORCA generates minidump files to describe the optimization context for a given query. The information in the file is not in a format that can be easily used for debugging or troubleshooting. The minidump file is located under the coordinator data directory and uses the following naming format:

`Minidump_date_time.mdp`

The minidump file contains this query related information:

-   Catalog objects including data types, tables, operators, and statistics required by GPORCA
-   An internal representation \(DXL\) of the query
-   An internal representation \(DXL\) of the plan produced by GPORCA
-   System configuration information passed to GPORCA such as server configuration parameters, cost and statistics configuration, and number of segments
-   A stack trace of errors generated while optimizing the query

Setting this parameter to `ALWAYS` generates a minidump for all queries. Set this parameter to `ONERROR` to minimize total optimization time.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|ONERROR, ALWAYS|ONERROR|coordinator, session, reload|

## <a id="optimizer_nestloop_factor"></a>optimizer\_nestloop\_factor 

This parameter adds a costing factor to GPORCA to prioritize hash joins instead of nested loop joins during query optimization. The default value of 1024 was chosen after evaluating numerous workloads with uniformly distributed data. 1024 should be treated as the practical upper bound setting for this parameter. If you find the GPORCA selects hash joins more often than it should, reduce the value to shift the costing factor in favor of nested loop joins.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|INT\_MAX \> 1|1024|coordinator, session, reload|

## <a id="optimizer_parallel_union"></a>optimizer\_parallel\_union 

When GPORCA is enabled \(the default\), `optimizer_parallel_union` controls the amount of parallelization that occurs for queries that contain a `UNION` or `UNION ALL` clause.

When the value is `off`, the default, GPORCA generates a query plan where each child of an APPEND\(UNION\) operator is in the same slice as the APPEND operator. During query execution, the children are run in a sequential manner.

When the value is `on`, GPORCA generates a query plan where a redistribution motion node is under an APPEND\(UNION\) operator. During query execution, the children and the parent APPEND operator are on different slices, allowing the children of the APPEND\(UNION\) operator to run in parallel on segment instances.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|boolean|off|coordinator, session, reload|

## <a id="optimizer_penalize_broadcast_threshold"></a>optimizer_penalize_skew_broadcast_threshold

When GPORCA is enabled (the default), during query optimization GPORCA penalizes the cost of plans that attempt to broadcast more than the value specified by `optimizer_penalize_broadcast_threshold`. For example, if this parameter is set to 100K rows (the default), any broadcast of more than 100K rows is heavily penalized. 

When this parameter is set to `0`, GPORCA sets this broadcast threshold to unlimited and never penalizes a broadcast motion.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer >= 0|100K rows|coordinator, session, reload|

## <a id="optimizer_penalize_skew"></a>optimizer\_penalize\_skew 

When GPORCA is enabled \(the default\), this parameter allows GPORCA to penalize the local cost of a HashJoin with a skewed Redistribute Motion as child to favor a Broadcast Motion during query optimization. The default value is `true`.

GPORCA determines there is skew for a Redistribute Motion when the NDV \(number of distinct values\) is less than the number of segments.

The parameter can be set for a database system, an individual database, or a session or query.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="optimizer_print_missing_stats"></a>optimizer\_print\_missing\_stats 

When GPORCA is enabled \(the default\), this parameter controls the display of table column information about columns with missing statistics for a query. The default value is `true`, display the column information to the client. When the value is `false`, the information is not sent to the client.

The information is displayed during query execution, or with the `EXPLAIN` or `EXPLAIN ANALYZE` commands.

The parameter can be set for a database system, an individual database, or a session.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="optimizer_print_optimization_stats"></a>optimizer\_print\_optimization\_stats 

When GPORCA is enabled \(the default\), this parameter enables logging of GPORCA query optimization statistics for various optimization stages for a query. The default value is off, do not log optimization statistics. To log the optimization statistics, this parameter must be set to on and the parameter client\_min\_messages must be set to log.

-   `set optimizer_print_optimization_stats = on;`
-   `set client_min_messages = 'log';`

The information is logged during query execution, or with the `EXPLAIN` or `EXPLAIN ANALYZE` commands.

This parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="optimizer_skew_factor"></a>optimizer\_skew\_factor 

When GPORCA is enabled \(the default\), `optimizer_skew_factor` controls skew ratio computation.

The default value is `0`, skew computation is turned off for GPORCA. To enable skew computation, set `optimizer_skew_factor` to a value between `1` and `100`, inclusive.

The larger the `optimizer_skew_factor`, the larger the cost that GPORCA assigns to redistributed hash join, such that GPORCA favors more a broadcast hash join.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer 0-100 |0|coordinator, session, reload|

## <a id="optimizer_sort_factor"></a>optimizer\_sort\_factor 

When GPORCA is enabled \(the default\), `optimizer_sort_factor` controls the cost factor to apply to sorting operations during query optimization. The default value `1` specifies the default sort cost factor. The value is a ratio of increase or decrease from the default factor. For example, a value of `2.0` sets the cost factor at twice the default, and a value of `0.5` sets the factor at half the default.

The parameter can be set for a database system, an individual database, or a session or query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Decimal \> 0|1|coordinator, session, reload|

## <a id="optimizer_use_gpdb_allocators"></a>optimizer\_use\_gpdb\_allocators 

When GPORCA is enabled \(the default\) and this parameter is `true` \(the default\), GPORCA uses WarehousePG memory management when running queries. When set to `false`, GPORCA uses GPORCA-specific memory management. WarehousePG memory management allows for faster optimization, reduced memory usage during optimization, and improves GPORCA support of vmem limits when compared to GPORCA-specific memory management.

For information about GPORCA, see [About GPORCA](../../admin_guide/query/topics/query-piv-optimizer.html) in the *WarehousePG Administrator Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, system, restart|

## <a id="optimizer_xform_bind_threshold"></a>optimizer\_xform\_bind\_threshold 

When GPORCA is enabled \(the default\), this parameter controls the maximum number of bindings per transform that GPORCA produces per group expression. Setting this parameter limits the number of alternatives that GPORCA creates, in many cases reducing the optimization time and overall memory usage of queries that include deeply nested expressions.

The default value is `0`, GPORCA produces an unlimited set of bindings.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - INT\_MAX|0|coordinator, session, reload|

## <a id="password_encryption"></a>password\_encryption 

When a password is specified in CREATE ROLE or ALTER ROLE, this parameter determines the algorithm to use to encrypt the password. Possible values are scram-sha-256, which will encrypt the password with SCRAM-SHA-256, and md5, which stores the password as an MD5 hash. The default is md5.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|md5, scram-sha-256|md5|coordinator, session, reload|

## <a id="plan_cache_mode"></a>plan\_cache\_mode 

Prepared statements \(either explicitly prepared or implicitly generated, for example by PL/pgSQL\) can be run using *custom* or *generic* plans. Custom plans are created for each execution using its specific set of parameter values, while generic plans do not rely on the parameter values and can be re-used across executions. The use of a generic plan saves planning time, but if the ideal plan depends strongly on the parameter values, then a generic plan might be inefficient. The choice between these options is normally made automatically, but it can be overridden by setting the `plan_cache_mode` parameter. If the prepared statement has no parameters, a generic plan is always used.

The allowed values are `auto` \(the default\), `force_custom_plan` and `force_generic_plan`. This setting is considered when a cached plan is to be run, not when it is prepared. For more information see [PREPARE](../sql_commands/PREPARE.html).

The parameter can be set for a database system, an individual database, a session, or a query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|auto, force\_custom\_plan, force\_generic\_plan|auto|coordinator, session, reload|

## <a id="pljava_classpath"></a>pljava\_classpath 

A colon \(`:`\) separated list of jar files or directories containing jar files needed for PL/Java functions. The full path to the jar file or directory must be specified, except the path can be omitted for jar files in the `$GPHOME/lib/postgresql/java` directory. The jar files must be installed in the same locations on all WarehousePG hosts and readable by the `gpadmin` user.

The `pljava_classpath` parameter is used to assemble the PL/Java classpath at the beginning of each user session. Jar files added after a session has started are not available to that session.

If the full path to a jar file is specified in `pljava_classpath` it is added to the PL/Java classpath. When a directory is specified, any jar files the directory contains are added to the PL/Java classpath. The search does not descend into subdirectories of the specified directories. If the name of a jar file is included in `pljava_classpath` with no path, the jar file must be in the `$GPHOME/lib/postgresql/java` directory.

> **Note** Performance can be affected if there are many directories to search or a large number of jar files.

If [pljava\_classpath\_insecure](#pljava_classpath_insecure) is `false`, setting the `pljava_classpath` parameter requires superuser privilege. Setting the classpath in SQL code will fail when the code is run by a user without superuser privilege. The `pljava_classpath` parameter must have been set previously by a superuser or in the `postgresql.conf` file. Changing the classpath in the `postgresql.conf` file requires a reload \(`gpstop -u`\).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string| |coordinator, session, reload, superuser|

## <a id="pljava_classpath_insecure"></a>pljava\_classpath\_insecure 

Controls whether the server configuration parameter [pljava\_classpath](#pljava_classpath) can be set by a user without WarehousePG superuser privileges. When `true`, `pljava_classpath` can be set by a regular user. Otherwise, [pljava\_classpath](#pljava_classpath) can be set only by a database superuser. The default is `false`.

> **Caution** Enabling this parameter exposes a security risk by giving non-administrator database users the ability to run unauthorized Java methods.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload, superuser|

## <a id="pljava_statement_cache_size"></a>pljava\_statement\_cache\_size 

Sets the size in KB of the JRE MRU \(Most Recently Used\) cache for prepared statements.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of kilobytes|10|coordinator, system, reload, superuser|

## <a id="pljava_release_lingering_savepoints"></a>pljava\_release\_lingering\_savepoints 

If true, lingering savepoints used in PL/Java functions will be released on function exit. If false, savepoints will be rolled back.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, system, reload, superuser|

## <a id="pljava_vmoptions"></a>pljava\_vmoptions 

Defines the startup options for the Java VM. The default value is an empty string \(""\).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string| |coordinator, system, reload, superuser|

## <a id="port"></a>port 

The database listener port for a WarehousePG instance. The coordinator and each segment has its own port. Port numbers for the WarehousePG cluster must also be changed in the `gp_segment_configuration` catalog. You must shut down your WarehousePG cluster before changing port numbers.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|any valid port number|5432|local, system, restart|

## <a id="quote_all_identifiers"></a>quote\_all\_identifiers 

Ensures that all identifiers are quoted, even if they are not keywords, when the database generates SQL. See also the `--quote-all-identifiers` option of [pg\_dump](../../utility_guide/ref/pg_dump.html) and [pg\_dumpall](../../utility_guide/ref/pg_dumpall.html).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|local, session, reload|

## <a id="random_page_cost"></a>random\_page\_cost 

Sets the estimate of the cost of a nonsequentially fetched disk page for the Postgres-based planner. This is measured as a multiple of the cost of a sequential page fetch. A higher value makes it more likely a sequential scan will be used, a lower value makes it more likely an index scan will be used.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|100|coordinator, session, reload|

## <a id="readable_external_table_timeout"></a>readable\_external\_table\_timeout 

When an SQL query reads from an external table, the parameter value specifies the amount of time in seconds that WarehousePG waits before cancelling the query when data stops being returned from the external table.

The default value of 0, specifies no time out. WarehousePG does not cancel the query.

If queries that use gpfdist run a long time and then return the error "intermittent network connectivity issues", you can specify a value for `readable_external_table_timeout`. If no data is returned by gpfdist for the specified length of time, WarehousePG cancels the query.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \>= 0|0|coordinator, system, reload|

## <a id="repl_catchup_within_range"></a>repl\_catchup\_within\_range 

For WarehousePG coordinator mirroring, controls updates to the active coordinator. If the number of WAL segment files that have not been processed by the `walsender` exceeds this value, WarehousePG updates the active coordinator.

If the number of segment files does not exceed the value, WarehousePG blocks updates to the to allow the `walsender` process the files. If all WAL segments have been processed, the active coordinator is updated.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - 64|1|coordinator, system, reload, superuser|

## <a id="wal_buffers"></a>wal_buffers

Sets the number of disk-page buffers in shared memory for WAL. This is the amount of shared memory used for WAL data that has not yet been written to disk. The default setting of `-1` selects a size equal to 1/32nd (about 3%) of [shared_buffers](#shared_buffers), but not less than `64kB` nor more than the size of one WAL segment, typically `16MB`. You can set this value manually if the automatic choice is too large or too small, but WarehousePG treats any positive value less than `32kB` as `32kB`. If you specify this value without units, it is taken as WAL blocks, that is `XLOG_BLCKSZ` bytes, typically 32kB.

You can set this parameter only at server start.

The contents of the WAL buffers are written out to disk at every transaction commit, so extremely large values are unlikely to provide a significant benefit. However, setting this value to at least a few megabytes can improve write performance on a busy server where many clients are committing at once. The auto-tuning selected by the default setting of `-1` should give reasonable results in most cases.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|-1 - (INT_MAX / XLOG_BLCKSZ) (integer) | -1 |local, system, restart|

## <a id="wal_compression"></a>wal_compression

Enables compression of full page writes in a WAL file. This parameter can only be changed by superusers.

> **Note** `wal_compression` can reduce the WAL volume without increasing the risk of unrecoverable data corruption, but at the cost of some extra CPU spent on the compression during WAL logging and on the decompression during WAL replay.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|local, session, reload, superuser|

## <a id="replication_timeout"></a>wal\_sender\_timeout 

For WarehousePG coordinator mirroring, sets the maximum time in milliseconds that the `walsender` process on the active coordinator waits for a status message from the `walreceiver` process on the standby coordinator. If a message is not received, the `walsender` logs an error message.

The [wal\_receiver\_status\_interval](#wal_receiver_status_interval) controls the interval between `walreceiver` status messages.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - INT\_MAX|60000 ms \(60 seconds\)|coordinator, system, reload, superuser|

## <a id="resource_cleanup_gangs_on_wait"></a>resource\_cleanup\_gangs\_on\_wait 

> **Note** The `resource_cleanup_gangs_on_wait` server configuration parameter is enforced only when resource queue-based resource management is active.

If a statement is submitted through a resource queue, clean up any idle query executor worker processes before taking a lock on the resource queue.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="resource_select_only"></a>resource\_select\_only 

> **Note** The `resource_select_only` server configuration parameter is enforced only when resource queue-based resource management is active.

Sets the types of queries managed by resource queues. If set to on, then `SELECT`, `SELECT INTO`, `CREATE TABLE AS SELECT`, and `DECLARE CURSOR` commands are evaluated. If set to off `INSERT`, `UPDATE`, and `DELETE` commands will be evaluated as well.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, system, restart|

## <a id="row_security"></a>row\_security

> **Note** This configuration parameter has no effect on roles which bypass every row security policy, for example, superusers and roles configured with the `BYPASSRLS` attribute.

Controls whether to raise an error in lieu of applying a row security policy. When set to `on`, policies apply normally. When set to `off`, queries which would otherwise apply at least one policy fail.

The default is `on`. Change `row_security` to `off` where limited row visibility could cause incorrect results; for example, `pg_dump` makes that change by default.

For more information about row-level security policies, see [CREATE POLICY](../sql_commands/CREATE_POLICY.html).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, system, restart|

## <a id="runaway_detector_activation_percent"></a>runaway\_detector\_activation\_percent 

For queries that are managed by resource queues or resource groups, this parameter determines when WarehousePG terminates running queries based on the amount of memory the queries are using. A value of 100 deactivates the automatic termination of queries based on the percentage of memory that is utilized.

Either the resource queue or the resource group management scheme can be active in WarehousePG; both schemes cannot be active at the same time. The server configuration parameter [gp\_resource\_manager](#gp_resource_manager) controls which scheme is active.

This parameter sets the percent of utilized WarehousePG virtual memory that triggers the termination of queries. If the percentage of virtual memory that is utilized for a WarehousePG segment exceeds the specified value, WarehousePG terminates queries managed by resource queues based on memory usage, starting with the query consuming the largest amount of memory. Queries are terminated until the percentage of utilized virtual memory is below the specified percentage.

Specify the maximum virtual memory value for active WarehousePG segment instances with the server configuration parameter [gp\_vmem\_protect\_limit](#gp_vmem_protect_limit).

For example, if `gp_vmem_protect_limit` is set to 10GB, and `runaway_detector_activation_percent` is 90 \(90%\), WarehousePG starts terminating queries when the utilized virtual memory exceeds 9 GB.

For information about resource groups and resource queues, see [Managing Resources]((../../admin_guide/wlmgmt.html).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|percentage \(integer\)|90|local, system, restart|

## <a id="search_path"></a>search\_path 

Specifies the order in which schemas are searched when an object is referenced by a simple name with no schema component. When there are objects of identical names in different schemas, the one found first in the search path is used. The system catalog schema, *pg\_catalog*, is always searched, whether it is mentioned in the path or not. When objects are created without specifying a particular target schema, they will be placed in the first schema listed in the search path. The current effective value of the search path can be examined via the SQL function *current\_schema\(\)*. *current\_schema\(\)* shows how the requests appearing in *search\_path* were resolved.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|a comma-separated list of schema names|$user,public|coordinator, session, reload|

## <a id="seq_page_cost"></a>seq\_page\_cost 

For the Postgres-based planner, sets the estimate of the cost of a disk page fetch that is part of a series of sequential fetches.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point|1|coordinator, session, reload|

## <a id="server_encoding"></a>server\_encoding 

Reports the database encoding \(character set\). It is determined when the WarehousePG cluster is initialized. Ordinarily, clients need only be concerned with the value of *client\_encoding*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|<system dependent\>|UTF8|read only|

## <a id="server_version"></a>server\_version 

Reports the version of PostgreSQL that this release of WarehousePG is based on.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string|9.4.20|read only|

## <a id="server_version_num"></a>server\_version\_num 

Reports the version of PostgreSQL that this release of WarehousePG is based on as an integer.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|90420|read only|

## <a id="shared_buffers"></a>shared\_buffers 

Sets the amount of memory a WarehousePG segment instance uses for shared memory buffers. This setting must be at least 128KB and at least 16KB times [max\_connections](#max_connections).

Each WarehousePG segment instance calculates and attempts to allocate certain amount of shared memory based on the segment configuration. The value of `shared_buffers` is significant portion of this shared memory calculation, but is not all it. When setting `shared_buffers`, the values for the operating system parameters `SHMMAX` or `SHMALL` might also need to be adjusted.

The operating system parameter `SHMMAX` specifies maximum size of a single shared memory allocation. The value of `SHMMAX` must be greater than this value:

```
 `shared_buffers` + <other_seg_shmem>
```

The value of `other_seg_shmem` is the portion the WarehousePG shared memory calculation that is not accounted for by the `shared_buffers` value. The `other_seg_shmem` value will vary based on the segment configuration.

With the default WarehousePG parameter values, the value for `other_seg_shmem` is approximately 111MB for WarehousePG segments and approximately 79MB for the WarehousePG coordinator.

The operating system parameter `SHMALL` specifies the maximum amount of shared memory on the host. The value of `SHMALL` must be greater than this value:

```
 (<num_instances_per_host> * ( `shared_buffers` + <other_seg_shmem> )) + <other_app_shared_mem> 
```

The value of `other_app_shared_mem` is the amount of shared memory that is used by other applications and processes on the host.

When shared memory allocation errors occur, possible ways to resolve shared memory allocation issues are to increase `SHMMAX` or `SHMALL`, or decrease `shared_buffers` or `max_connections`.

See the *WarehousePG Installation Guide* for information about the WarehousePG values for the parameters `SHMMAX` and `SHMALL`.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \> 16K \* *max\_connections*|125MB|local, system, restart|

## <a id="shared_preload_libraries"></a>shared\_preload\_libraries 

A comma-separated list of shared libraries that are to be preloaded at server start. PostgreSQL procedural language libraries can be preloaded in this way, typically by using the syntax '`$libdir/plXXX`' where XXX is pgsql, perl, tcl, or python. By preloading a shared library, the library startup time is avoided when the library is first used. If a specified library is not found, the server will fail to start.

> **Note** When you add a library to `shared_preload_libraries`, be sure to retain any previous setting of the parameter.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
| | |local, system, restart|

## <a id="ssl"></a>ssl 

Enables SSL connections.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, system, restart|

## <a id="ssl_ciphers"></a>ssl\_ciphers 

Specifies a list of SSL ciphers that are allowed to be used on secure connections. `ssl_ciphers` *overrides* any ciphers string specified in `/etc/openssl.cnf`. The default value `ALL:!ADH:!LOW:!EXP:!MD5:@STRENGTH` enables all ciphers except for ADH, LOW, EXP, and MD5 ciphers, and prioritizes ciphers by their strength.

> **Note** With TLS 1.2 some ciphers in MEDIUM and HIGH strength still use NULL encryption \(no encryption for transport\), which the default `ssl_ciphers` string allows. To bypass NULL ciphers with TLS 1.2 use a string such as `TLSv1.2:!eNULL:!aNULL`.

See the openssl manual page for a list of supported ciphers.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string|ALL:!ADH:!LOW:!EXP:!MD5:@STRENGTH|coordinator, system, restart|

## <a id="standard_conforming_strings"></a>standard\_conforming\_strings 

Determines whether ordinary string literals \('...'\) treat backslashes literally, as specified in the SQL standard. The default value is on. Turn this parameter off to treat backslashes in string literals as escape characters instead of literal backslashes. Applications may check this parameter to determine how string literals are processed. The presence of this parameter can also be taken as an indication that the escape string syntax \(E'...'\) is supported.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|coordinator, session, reload|

## <a id="statement_mem"></a>statement\_mem 

Allocates segment host memory per query. The amount of memory allocated with this parameter cannot exceed [max\_statement\_mem](#max_statement_mem) or the memory limit on the resource queue or resource group through which the query was submitted. If additional memory is required for a query, temporary spill files on disk are used.

You can use the following calculation to estimate a reasonable `statement_mem` value for a wide variety of situations:

```
( <gp_vmem_protect_limit>GB * .9 ) / <max_expected_concurrent_queries>
```

*If you are using resource groups to control resource allocation in your WarehousePG cluster*:

- If the server configuration parameter [gp_resgroup_memory_query_fixed_mem](#gp_resgroup_memory_query_fixed_mem) is set to 0, and the resource group parameter `MEMORY_QUOTA` is set to -1, `statement_mem` sets the amount of memory allocated for a query.
- If you set the configuration parameters [gp_resource_group_bypass](#gp_resource_group_bypass) or [gp_resource_group_bypass_catalog_query](#gp_resource_group_bypass_catalog_query) to bypass the resource group limits, `statement_mem` sets the amount of memory allocated for the query.
- `statement_mem` also sets the amount of memory allocated for a query if its value is greater than `MEMORY_QUOTA` / `CONCURRENCY`.
- Queries whose plan cost is less than the limit `MIN_COST` use `statement_mem` as their memory quota.

*If you are using resource queues to control resource allocation in your WarehousePG cluster*:

- When [gp\_resqueue\_memory\_policy](#gp_resqueue_memory_policy) is set to "auto", `statement_mem` and resource queue memory limits control query memory usage.

For information about resource groups and resource queues, see [Managing Resources]((../../admin_guide/wlmgmt.html).

When changing both `max_statement_mem` and `statement_mem`, `max_statement_mem` must be changed first, or listed first in the postgresql.conf file.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of kilobytes|128MB|coordinator, session, reload|

## <a id="statement_timeout"></a>statement\_timeout 

Abort any statement that takes over the specified number of milliseconds. 0 turns off the limitation.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of milliseconds|0|coordinator, session, reload|

## <a id="stats_queue_level"></a>stats\_queue\_level 

> **Note** The `stats_queue_level` server configuration parameter is enforced only when resource queue-based resource management is active.

Collects resource queue statistics on database activity.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="superuser_reserved_connections"></a>superuser\_reserved\_connections 

Determines the number of connection slots that are reserved for WarehousePG superusers.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer < *max\_connections*|10|local, system, restart|

## <a id="tcp_keepalives_count"></a>tcp\_keepalives\_count 

How many keepalives may be lost before the connection is considered dead. A value of 0 uses the system default. If TCP\_KEEPCNT is not supported, this parameter must be 0.

Use this parameter for all connections that are not between a primary and mirror segment.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of lost keepalives|0|local, system, restart|

## <a id="tcp_keepalives_idle"></a>tcp\_keepalives\_idle 

Number of seconds between sending keepalives on an otherwise idle connection. A value of 0 uses the system default. If TCP\_KEEPIDLE is not supported, this parameter must be 0.

Use this parameter for all connections that are not between a primary and mirror segment.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of seconds|0|local, system, restart|

## <a id="tcp_keepalives_interval"></a>tcp\_keepalives\_interval 

How many seconds to wait for a response to a keepalive before retransmitting. A value of 0 uses the system default. If TCP\_KEEPINTVL is not supported, this parameter must be 0.

Use this parameter for all connections that are not between a primary and mirror segment.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of seconds|0|local, system, restart|

## <a id="temp_buffers"></a>temp\_buffers 

Sets the maximum memory, in blocks, to allow for temporary buffers by each database session. These are session-local buffers used only for access to temporary tables. The setting can be changed within individual sessions, but only up until the first use of temporary tables within a session. The cost of setting a large value in sessions that do not actually need a lot of temporary buffers is only a buffer descriptor for each block, or about 64 bytes, per increment. However if a buffer is actually used, an additional 32768 bytes will be consumed.

You can set this parameter to the number of 32K blocks \(for example, `1024` to allow 32MB for buffers\), or specify the maximum amount of memory to allow \(for example `'48MB'` for 1536 blocks\). The `gpconfig` utility and `SHOW` command report the maximum amount of memory allowed for temporary buffers.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|1024 \(32MB\)|coordinator, session, reload|

## <a id="topic_k52_fqm_f3b"></a>temp\_tablespaces 

Specifies tablespaces in which to create temporary objects \(temp tables and indexes on temp tables\) when a `CREATE` command does not explicitly specify a tablespace. These tablespaces can also include temporary files for purposes such as large data set sorting.

The value is a comma-separated list of tablespace names. When the list contains more than one tablespace name, WarehousePG chooses a random list member each time it creates a temporary object. An exception applies within a transaction, where successively created temporary objects are placed in successive tablespaces from the list. If the selected element of the list is an empty string, WarehousePG automatically uses the default tablespace of the current database instead.

When setting `temp_tablespaces` interactively, avoid specifying a nonexistent tablespace, or a tablespace for which the user does have `CREATE` privileges. For non-superusers, a superuser must `GRANT` them the `CREATE` privilege on the temp tablespace.. When using a previously set value \(for example a value in `postgresql.conf`\), nonexistent tablespaces are ignored, as are tablespaces for which the user lacks `CREATE` privilege.

The default value is an empty string, which results in all temporary objects being created in the default tablespace of the current database.

See also [default\_tablespace](#default_tablespace).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|one or more tablespace names|unset|coordinator, session, reload|

## <a id="TimeZone"></a>TimeZone 

Sets the time zone for displaying and interpreting time stamps. The default is to use whatever the system environment specifies as the time zone. See [Date/Time Keywords](https://www.postgresql.org/docs/12/datetime-keywords.html) in the PostgreSQL documentation.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|time zone abbreviation| |local, restart|

## <a id="timezone_abbreviations"></a>timezone\_abbreviations 

Sets the collection of time zone abbreviations that will be accepted by the server for date time input. The default is `Default`, which is a collection that works in most of the world. `Australia` and `India`, and other collections can be defined for a particular installation. Possible values are names of configuration files stored in `$GPHOME/share/postgresql/timezonesets/`.

To configure WarehousePG to use a custom collection of timezones, copy the file that contains the timezone definitions to the directory `$GPHOME/share/postgresql/timezonesets/` on the WarehousePG coordinator and segment hosts. Then set value of the server configuration parameter `timezone_abbreviations` to the file. For example, to use a file `custom` that contains the default timezones and the WIB \(Waktu Indonesia Barat\) timezone.

1.  Copy the file `Default` from the directory `$GPHOME/share/postgresql/timezonesets/` the file `custom`. Add the WIB timezone information from the file `Asia.txt` to the `custom`.
2.  Copy the file `custom` to the directory `$GPHOME/share/postgresql/timezonesets/` on the WarehousePG coordinator and segment hosts.
3.  Set value of the server configuration parameter `timezone_abbreviations` to `custom`.
4.  Reload the server configuration file \(`gpstop -u`\).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|string|Default|coordinator, session, reload|

## <a id="track_activities"></a>track\_activities 

Enables the collection of information on the currently executing command of each session, along with the time when that command began execution. This parameter is `true` by default. Only superusers can change this setting. See the `pg_stat_activity` view.

> **Note** Even when enabled, this information is not visible to all users, only to superusers and the user owning the session being reported on, so it should not represent a security risk.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload, superuser|

## <a id="track_activity_query_size"></a>track\_activity\_query\_size 

Sets the maximum length limit for the query text stored in `query` column of the system catalog view *pg\_stat\_activity*. The minimum length is 1024 characters.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|1024|local, system, restart|

## <a id="track_counts"></a>track\_counts 

Collects information about executing commands. Enables the collection of information on the currently executing command of each session, along with the time at which that command began execution.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload, superuser|

## <a id="track_wal_io_timing"></a>track_wal_io_timing

Enables timing of WAL I/O calls. This parameter is disabled by default, as it repeatedly queries the operating system for the current time, which may cause significant overhead on some platforms. The view [pg_stat_wal](../system_catalogs/catalog_ref-views.html#pg_stat_wal) displays WAL I/O timing information. Only superusers and users with the appropriate `SET` privilege can change this setting.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|false|coordinator, session, reload|

## <a id="transaction_isolation"></a>transaction\_isolation 

Sets the current transaction's isolation level.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|read committed, serializable|read committed|coordinator, session, reload|

## <a id="transaction_read_only"></a>transaction\_read\_only 

Sets the current transaction's read-only status.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="transform_null_equals"></a>transform\_null\_equals 

When on, expressions of the form expr = NULL \(or NULL = expr\) are treated as expr IS NULL, that is, they return true if expr evaluates to the null value, and false otherwise. The correct SQL-spec-compliant behavior of expr = NULL is to always return null \(unknown\).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="unix_socket_directory"></a>unix\_socket\_directories 

Specifies the directory of the UNIX-domain socket on which the server is to listen for connections from client applications. Multiple sockets can be created by listing multiple directories separated by commas.

> **Important** Do not change the value of this parameter. The default location is required for WarehousePG utilities.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|directory path|0777|local, system, restart|

## <a id="unix_socket_group"></a>unix\_socket\_group 

Sets the owning group of the UNIX-domain socket. By default this is an empty string, which uses the default group for the current user.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|UNIX group name|unset|local, system, restart|

## <a id="unix_socket_permissions"></a>unix\_socket\_permissions 

Sets the access permissions of the UNIX-domain socket. UNIX-domain sockets use the usual UNIX file system permission set. Note that for a UNIX-domain socket, only write permission matters.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|numeric UNIX file permission mode \(as accepted by the *chmod* or *umask* commands\)|0777|local, system, restart|

## <a id="update_process_title"></a>update\_process\_title 

Enables updating of the process title every time a new SQL command is received by the server. The process title is typically viewed by the `ps` command.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|on|local, session, reload|

## <a id="vacuum_cleanup_index_scale_factor"></a>vacuum_cleanup_index_scale_factor

Specifies the fraction of the total number of heap tuples counted in the previous statistics collection that can be inserted without incurring an index scan at the `VACUUM` cleanup stage. The purpose of this parameter is to minimize unnecessary vacuum index scans. This setting currently applies to B-tree indexes only. When its value is 0, `VACUUM` cleanup never skips index scans.

If no tuples were deleted from the heap, B-tree indexes are still scanned at the `VACUUM` cleanup stage when at least one of the following conditions is met: the index statistics are stale, or the index contains deleted pages that can be recycled during cleanup. Index statistics are considered to be stale if the number of newly inserted tuples exceeds the `vacuum_cleanup_index_scale_factor` fraction of the total number of heap tuples detected by the previous statistics collection. The total number of heap tuples is stored in the index meta-page. Note that the meta-page does not include this data until `VACUUM` finds no dead tuples, so B-tree index scan at the cleanup stage can only be skipped if the second and subsequent `VACUUM` cycles detect no dead tuples.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|floating point 0 to 10000000000|0.1|local, session, reload|

## <a id="vacuum_cost_delay"></a>vacuum\_cost\_delay 

The length of time that the process will sleep when the cost limit has been exceeded. 0 deactivates the cost-based vacuum delay feature.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|milliseconds < 0 \(in multiples of 10\)|0|local, session, reload|

## <a id="vacuum_cost_limit"></a>vacuum\_cost\_limit 

The accumulated cost that will cause the vacuuming process to sleep.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \> 0|200|local, session, reload|

## <a id="vacuum_cost_page_dirty"></a>vacuum\_cost\_page\_dirty 

The estimated cost charged when vacuum modifies a block that was previously clean. It represents the extra I/O required to flush the dirty block out to disk again.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \> 0|20|local, session, reload|

## <a id="vacuum_cost_page_hit"></a>vacuum\_cost\_page\_hit 

The estimated cost for vacuuming a buffer found in the shared buffer cache. It represents the cost to lock the buffer pool, lookup the shared hash table and scan the content of the page.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \> 0|1|local, session, reload|

## <a id="vacuum_cost_page_miss"></a>vacuum\_cost\_page\_miss 

The estimated cost for vacuuming a buffer that has to be read from disk. This represents the effort to lock the buffer pool, lookup the shared hash table, read the desired block in from the disk and scan its content.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer \> 0|2|local, session, reload|

## <a id="vacuum_freeze_min_age"></a>vacuum\_freeze\_min\_age 

Specifies the cutoff age \(in transactions\) that `VACUUM` should use to decide whether to replace transaction IDs with *FrozenXID* while scanning a table.

For information about `VACUUM` and transaction ID management, see "Managing Data" in the *WarehousePG Administrator Guide* and the [PostgreSQL documentation](https://www.postgresql.org/docs/12/routine-vacuuming.html#VACUUM-FOR-WRAPAROUND).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer 0-100000000000|50000000|local, session, reload|

## <a id="validate_previous_free_tid"></a>validate\_previous\_free\_tid 

Enables a test that validates the free tuple ID \(TID\) list. The list is maintained and used by WarehousePG. WarehousePG determines the validity of the free TID list by ensuring the previous free TID of the current free tuple is a valid free tuple. The default value is `true`, enable the test.

If WarehousePG detects a corruption in the free TID list, the free TID list is rebuilt, a warning is logged, and a warning is returned by queries for which the check failed. WarehousePG attempts to run the queries.

> **Note** If a warning is returned, please contact Support.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="verify_gpfdists_cert"></a>verify\_gpfdists\_cert 

When a WarehousePG external table is defined with the `gpfdists` protocol to use SSL security, this parameter controls whether SSL certificate authentication is enabled.

Regardless of the setting of this server configuration parameter, WarehousePG always encrypts data that you read from or write to an external table that specifies the `gpfdists` protocol.

The default is `true`, SSL certificate authentication is enabled when WarehousePG communicates with the `gpfdist` utility to either read data from or write data to an external data source.

The value `false` deactivates SSL certificate authentication. These SSL exceptions are ignored:

-   The self-signed SSL certificate that is used by `gpfdist` is not trusted by WarehousePG.
-   The host name contained in the SSL certificate does not match the host name that is running `gpfdist`.

When you set `verify_gpfdists_cert` to `false`, the CA certification file is not required for WarehousePG segments.

You can set the value to `false` to deactivate authentication when testing the communication between the WarehousePG external table and the `gpfdist` utility that is serving the external data.

> **Caution** Deactivating SSL certificate authentication exposes a security risk by not validating the `gpfdists` SSL certificate.

For information about the `gpfdists` protocol and how this setting affects the certificate files required on WarehousePG segments, see [gpfdists:// Protocol](../../admin_guide/external/gpfdists-protocol.html). For information about running the `gpfdist` utility, see [gpfdist](../../utility_guide/ref/gpfdist.html).

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|true|coordinator, session, reload|

## <a id="vmem_process_interrupt"></a>vmem\_process\_interrupt 

Enables checking for interrupts before reserving vmem memory for a query during WarehousePG query execution. Before reserving further vmem for a query, check if the current session for the query has a pending query cancellation or other pending interrupts. This ensures more responsive interrupt processing, including query cancellation requests. The default is `off`.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|Boolean|off|coordinator, session, reload|

## <a id="wait_for_replication_threshold"></a>wait\_for\_replication\_threshold 

When WarehousePG segment mirroring is enabled, specifies the maximum amount of Write-Ahead Logging \(WAL\)-based records \(in KB\) written by a transaction on the primary segment instance before the records are written to the mirror segment instance for replication. As the default, WarehousePG writes the records to the mirror segment instance when a checkpoint occurs or the `wait_for_replication_threshold` value is reached.

A value of 0 deactivates the check for the amount of records. The records are written to the mirror segment instance only after a checkpoint occurs.

If you set the value to 0, database performance issues might occur under heavy loads that perform long transactions that do not perform a checkpoint operation.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|0 - MAX-INT / 1024|1024|coordinator, system, reload|

## <a id="wal_keep_size"></a>wal_keep_size 

Specifies the minimum size of past log file segments kept in the `pg_wal` directory, in case a standby coordinator or mirror segment instance needs to fetch them for streaming replication. If a standby coordinator or mirror segment instance connected to the sending server falls behind by more than `wal_keep_size` megabytes, the sending server might remove a WAL segment still needed by the standby coordinator or mirror segment instance, in which case the replication connection will be terminated. 

This sets only the minimum size of segments retained in `pg_wal`; the system might need to retain more segments for WAL archival or to recover from a checkpoint. If `wal_keep_size` is zero (the default), the number of old WAL segments available to mirror servers is a function of the location of replication slot's `restart_lsn` and `max_slot_wal_keep_size` parameters, as well as the status of WAL archiving. 

If this value is specified without units, it is taken as megabytes.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer|5 times the default size of the write-ahead log file|coordinator, system, reload, superuser|

## <a id="wal_receiver_status_interval"></a>wal\_receiver\_status\_interval 

For WarehousePG coordinator mirroring, sets the interval in seconds between `walreceiver` process status messages that are sent to the active coordinator. Under heavy loads, the time might be longer.

The value of [wal\_sender\_timeout](#replication_timeout) controls the time that the `walsender` process waits for a `walreceiver` message.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer 0- INT\_MAX/1000|10 sec|coordinator, system, reload, superuser|

## <a id="work_mem"></a>work_mem

Sets the maximum amount of memory to be used by a query operation (such as a sort or hash table) before writing to temporary disk files. If this value is specified without units, it is taken as kilobytes. The default value is 32 MB. Note that for a complex query, several sort or hash operations might be running in parallel; each operation will be allowed to use as much memory as this value specifies before it starts to write data into temporary files. In addition, several running sessions may be performing such operations concurrently. Therefore, the total memory used could be many times the value of `work_mem`; keep this fact in mind when choosing the value for this parameter. Sort operations are used for `ORDER BY`, `DISTINCT`, and merge joins. Hash tables are used in hash joins, hash-based aggregation, and hash-based processing of `IN` subqueries. Apart from sorting and hashing, bitmap index scans also rely on `work_mem`. Operations relying on tuplestores such as function scans, CTEs, PL/pgSQL and administration UDFs also rely on `work_mem`.

Apart from assigning memory to specific execution operators, setting `work_mem` also influences certain query plans over others, when the Postgres-based planner is used as the optimizer.

`work_mem` is a distinct memory management concept that does not interact with resource queue or resource group memory controls, which are imposed at the query level.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|number of kilobytes|32MB|coordinator, session, reload|

## <a id="writable_external_table_bufsize"></a>writable\_external\_table\_bufsize 

Size of the buffer that WarehousePG uses for network communication, such as the `gpfdist` utility and external web tables \(that use http\). Valid units are `KB` \(as in `128KB`\), `MB`, `GB`, and `TB`. WarehousePG stores data in the buffer before writing the data out. For information about `gpfdist`, see the *WarehousePG Utility Guide*.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer 32 - 131072 \(32KB - 128MB\)|64|local, session, reload|

## <a id="xid_stop_limit"></a>xid\_stop\_limit 

The number of transaction IDs prior to the ID where transaction ID wraparound occurs. When this limit is reached, WarehousePG stops creating new transactions to avoid data loss due to transaction ID wraparound.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer 10000000 - INT\_MAX|100000000|local, system, restart|

## <a id="xid_warn_limit"></a>xid\_warn\_limit 

The number of transaction IDs prior to the limit specified by [xid\_stop\_limit](#xid_stop_limit). When WarehousePG reaches this limit, it issues a warning to perform a VACUUM operation to avoid data loss due to transaction ID wraparound.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|integer 10000000 - INT\_MAX|500000000|local, system, restart|

## <a id="xmlbinary"></a>xmlbinary 

Specifies how binary values are encoded in XML data. For example, when `bytea` values are converted to XML. The binary data can be converted to either base64 encoding or hexadecimal encoding. The default is base64.

The parameter can be set for a database system, an individual database, or a session.

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|base64, hex|base64|coordinator, session, reload|

## <a id="xmloption"></a>xmloption 

Specifies whether XML data is to be considered as an XML document \(`document`\) or XML content fragment \(`content`\) for operations that perform implicit parsing and serialization. The default is `content`.

This parameter affects the validation performed by `xml_is_well_formed()`. If the value is `document`, the function checks for a well-formed XML document. If the value is `content`, the function checks for a well-formed XML content fragment.

> **Note** An XML document that contains a document type declaration \(DTD\) is not considered a valid XML content fragment. If `xmloption` set to `content`, XML that contains a DTD is not considered valid XML.

To cast a character string that contains a DTD to the `xml` data type, use the `xmlparse` function with the `document` keyword, or change the `xmloption` value to `document`.

The parameter can be set for a database system, an individual database, or a session. The SQL command to set this option for a session is also available in WarehousePG.

```
SET XML OPTION { DOCUMENT | CONTENT }
```

|Value Range|Default|Set Classifications|
|-----------|-------|-------------------|
|document, content|content|coordinator, session, reload|

