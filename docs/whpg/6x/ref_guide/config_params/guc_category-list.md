---
title: Parameter Categories

---

<a id="guc-cat-list"></a><a id="kh155019"></a>

Configuration parameters affect categories of server behaviors, such as resource consumption, query tuning, and authentication. The following topics describe WarehousePG configuration parameter categories.

<a id="ul_blz_1kk_wy"></a>

-   [Connection and Authentication Parameters](#topic12)
-   [System Resource Consumption Parameters](#topic15)
-   [GPORCA Parameters](#topic57)
-   [Query Tuning Parameters](#topic21)
-   [Error Reporting and Logging Parameters](#topic29)
-   [System Monitoring Parameters](#topic33)
-   [Runtime Statistics Collection Parameters](#topic37)
-   [Automatic Statistics Collection Parameters](#topic38)
-   [Client Connection Default Parameters](#topic39)
-   [Lock Management Parameters](#topic43)
-   [Resource Management Parameters (Resource Queues)](#topic44)
-   [Resource Management Parameters (Resource Groups)](#topic444)
-   [External Table Parameters](#topic45)
-   [Database Table Parameters](#topic46)
-   [Past Version Compatibility Parameters](#topic48)
-   [WarehousePG Array Configuration Parameters](#topic49)
-   [WarehousePG Mirroring Parameters for Coordinator and Segments](#topic55)
-   [WarehousePG PL/Java Parameters](#topic56)

<a id="topic12">

</a>

<a id="topic12"></a><a id="kh155037"></a>

## Connection and Authentication Parameters

These parameters control how clients connect and authenticate to WarehousePG.

<a id="topic13">

</a>

### Connection Parameters

-   [client_connection_check_interval](guc-list.md#client_connection_check_interval)
-   [gp_connection_send_timeout](guc-list.md#gp_connection_send_timeout)
-   [gp_dispatch_keepalives_count](guc-list.md#gp_dispatch_keepalives_count)
-   [gp_dispatch_keepalives_idle](guc-list.md#gp_dispatch_keepalives_idle)
-   [gp_dispatch_keepalives_interval](guc-list.md#gp_dispatch_keepalives_interval)
-   [gp_vmem_idle_resource_timeout](guc-list.md#gp_vmem_idle_resource_timeout)
-   [listen_addresses](guc-list.md#listen_addresses)
-   [max_connections](guc-list.md#max_connections)
-   [max_prepared_transactions](guc-list.md#max_prepared_transactions)
-   [superuser_reserved_connections](guc-list.md#superuser_reserved_connections)
-   [tcp_keepalives_count](guc-list.md#tcp_keepalives_count)
-   [tcp_keepalives_idle](guc-list.md#tcp_keepalives_idle)
-   [tcp_keepalives_interval](guc-list.md#tcp_keepalives_interval)
-   [unix_socket_directories](guc-list.md#unix_socket_directories)
-   [unix_socket_group](guc-list.md#unix_socket_group)
-   [unix_socket_permissions](guc-list.md#unix_socket_permissions)

<a id="topic14">

</a>

<a id="topic14"></a>

### Security and Authentication Parameters

-   [authentication_timeout](guc-list.md#authentication_timeout)
-   [db_user_namespace](guc-list.md#db_user_namespace)
-   [krb_caseins_users](guc-list.md#krb_caseins_users)
-   [krb_server_keyfile](guc-list.md#krb_server_keyfile)
-   [password_encryption](guc-list.md#password_encryption)
-   [password_hash_algorithm](guc-list.md#password_hash_algorithm)
-   [ssl](guc-list.md#ssl)
-   [ssl_ciphers](guc-list.md#ssl_ciphers)

<a id="topic15">

</a>

<a id="topic15"></a><a id="kh155038"></a>

## System Resource Consumption Parameters

These parameters set the limits for system resources consumed by WarehousePG.

<a id="topic16">

</a>

### Memory Consumption Parameters

These parameters control system memory usage.

-   [gp_vmem_idle_resource_timeout](guc-list.md#gp_vmem_idle_resource_timeout)
-   [gp_resource_group_memory_limit](guc-list.md#gp_resource_group_memory_limit) (resource group-based resource management)
-   [gp_vmem_protect_limit](guc-list.md#gp_vmem_protect_limit) (resource queue-based resource management)
-   [gp_vmem_protect_segworker_cache_limit](guc-list.md#gp_vmem_protect_segworker_cache_limit)
-   [gp_workfile_limit_files_per_query](guc-list.md#gp_workfile_limit_files_per_query)
-   [gp_workfile_limit_per_query](guc-list.md#gp_workfile_limit_per_query)
-   [gp_workfile_limit_per_segment](guc-list.md#gp_workfile_limit_per_segment)
-   [maintenance_work_mem](guc-list.md#maintenance_work_mem)
-   [max_stack_depth](guc-list.md#max_stack_depth)
-   [shared_buffers](guc-list.md#shared_buffers)
-   [temp_buffers](guc-list.md#temp_buffers)
-   [work_mem](guc-list.md#work_mem)

<a id="topic18">

</a>

<a id="topic18"></a>

### OS Resource Parameters

-   [max_files_per_process](guc-list.md#max_files_per_process)
-   [shared_preload_libraries](guc-list.md#shared_preload_libraries)

<a id="topic19">

</a>

<a id="topic19"></a>

### Cost-Based Vacuum Delay Parameters

> **Caution** Do not use cost-based vacuum delay because it runs asynchronously among the segment instances. The vacuum cost limit and delay is invoked at the segment level without taking into account the state of the entire WarehousePG array

You can configure the execution cost of `VACUUM` and `ANALYZE` commands to reduce the I/O impact on concurrent database activity. When the accumulated cost of I/O operations reaches the limit, the process performing the operation sleeps for a while, Then resets the counter and continues execution

-   [vacuum_cost_delay](guc-list.md#vacuum_cost_delay)
-   [vacuum_cost_limit](guc-list.md#vacuum_cost_limit)
-   [vacuum_cost_page_dirty](guc-list.md#vacuum_cost_page_dirty)
-   [vacuum_cost_page_hit](guc-list.md#vacuum_cost_page_hit)
-   [vacuum_cost_page_miss](guc-list.md#vacuum_cost_page_miss)

<a id="topic20">

</a>

<a id="topic20"></a>

### Transaction ID Management Parameters

-   [xid_stop_limit](guc-list.md#xid_stop_limit)
-   [xid_warn_limit](guc-list.md#xid_warn_limit)

<a id="topic20other">

</a>

### Other Parameters

-   [gp_max_parallel_cursors](guc-list.md#gp_max_parallel_cursors)

<a id="topic57">

</a>

<a id="topic57"></a>

## GPORCA Parameters

These parameters control the usage of GPORCA by WarehousePG. For information about GPORCA, see [About GPORCA](../../admin_guide/query/query-piv-optimizer/index.md) in the *WarehousePG Administrator Guide*.

-   [gp_enable_relsize_collection](guc-list.md#gp_enable_relsize_collection)
-   [optimizer](guc-list.md#optimizer)
-   [optimizer_analyze_root_partition](guc-list.md#optimizer_analyze_root_partition)
-   [optimizer_array_expansion_threshold](guc-list.md#optimizer_array_expansion_threshold)
-   [optimizer_control](guc-list.md#optimizer_control)
-   [optimizer_cost_model](guc-list.md#optimizer_cost_model)
-   [optimizer_cte_inlining_bound](guc-list.md#optimizer_cte_inlining_bound)
-   [optimizer_dpe_stats](guc-list.md#optimizer_dpe_stats)
-   [optimizer_discard_redistribute_hashjoin](guc-list.md#optimizer_discard_redistribute_hashjoin)
-   [optimizer_enable_associativity](guc-list.md#optimizer_enable_associativity)
-   [optimizer_enable_dml](guc-list.md#optimizer_enable_dml)
-   [optimizer_enable_indexonlyscan](guc-list.md#optimizer_enable_indexonlyscan)
-   [optimizer_enable_master_only_queries](guc-list.md#optimizer_enable_master_only_queries)
-   [optimizer_enable_multiple_distinct_aggs](guc-list.md#optimizer_enable_multiple_distinct_aggs)
-   [optimizer_enable_orderedagg](guc-list.md#optimizer_enable_orderedagg)
-   [optimizer_enable_replicated_table](guc-list.md#optimizer_enable_replicated_table)
-   [optimizer_force_agg_skew_avoidance](guc-list.md#optimizer_force_agg_skew_avoidance)
-   [optimizer_force_comprehensive_join_implementation](guc-list.md#optimizer_force_comprehensive_join_implementation)
-   [optimizer_force_multistage_agg](guc-list.md#optimizer_force_multistage_agg)
-   [optimizer_force_three_stage_scalar_dqa](guc-list.md#optimizer_force_three_stage_scalar_dqa)
-   [optimizer_join_arity_for_associativity_commutativity](guc-list.md#optimizer_join_arity_for_associativity_commutativity)
-   [optimizer_join_order](guc-list.md#optimizer_join_order)
-   [optimizer_join_order_threshold](guc-list.md#optimizer_join_order_threshold)
-   [optimizer_mdcache_size](guc-list.md#optimizer_mdcache_size)
-   [optimizer_metadata_caching](guc-list.md#optimizer_metadata_caching)
-   [optimizer_parallel_union](guc-list.md#optimizer_parallel_union)
-   [optimizer_penalize_broadcast_threshold](guc-list.md#optimizer_penalize_broadcast_threshold)
-   [optimizer_penalize_skew](guc-list.md#optimizer_penalize_skew)
-   [optimizer_print_missing_stats](guc-list.md#optimizer_print_missing_stats)
-   [optimizer_print_optimization_stats](guc-list.md#optimizer_print_optimization_stats)
-   [optimizer_skew_factor](guc-list.md#optimizer_skew_factor)
-   [optimizer_sort_factor](guc-list.md#optimizer_sort_factor)
-   [optimizer_use_gpdb_allocators](guc-list.md#optimizer_use_gpdb_allocators)
-   [optimizer_xform_bind_threshold](guc-list.md#optimizer_xform_bind_threshold)

<a id="topic21">

</a>

<a id="topic21"></a><a id="kh183779"></a>

## Query Tuning Parameters

These parameters control aspects of SQL query processing such as query operators and operator settings and statistics sampling.

<a id="topic22">

</a>

### Postgres Planner Control Parameters

The following parameters control the types of plan operations the Postgres Planner can use. Enable or deactivate plan operations to force the Postgres Planner to choose a different plan. This is useful for testing and comparing query performance using different plan types.

-   [enable_bitmapscan](guc-list.md#enable_bitmapscan)
-   [enable_groupagg](guc-list.md#enable_groupagg)
-   [enable_hashagg](guc-list.md#enable_hashagg)
-   [enable_hashjoin](guc-list.md#enable_hashjoin)
-   [enable_indexscan](guc-list.md#enable_indexscan)
-   [enable_mergejoin](guc-list.md#enable_mergejoin)
-   [enable_nestloop](guc-list.md#enable_nestloop)
-   [enable_seqscan](guc-list.md#enable_seqscan)
-   [enable_sort](guc-list.md#enable_sort)
-   [enable_tidscan](guc-list.md#enable_tidscan)
-   [gp_eager_two_phase_agg](guc-list.md#gp_eager_two_phase_agg)
-   [gp_enable_agg_distinct](guc-list.md#gp_enable_agg_distinct)
-   [gp_enable_agg_distinct_pruning](guc-list.md#gp_enable_agg_distinct_pruning)
-   [gp_enable_direct_dispatch](guc-list.md#gp_enable_direct_dispatch)
-   [gp_enable_fast_sri](guc-list.md#gp_enable_fast_sri)
-   [gp_enable_groupext_distinct_gather](guc-list.md#gp_enable_groupext_distinct_gather)
-   [gp_enable_groupext_distinct_pruning](guc-list.md#gp_enable_groupext_distinct_pruning)
-   [gp_enable_multiphase_agg](guc-list.md#gp_enable_multiphase_agg)
-   [gp_enable_predicate_propagation](guc-list.md#gp_enable_predicate_propagation)
-   [gp_enable_preunique](guc-list.md#gp_enable_preunique)
-   [gp_enable_relsize_collection](guc-list.md#gp_enable_relsize_collection)
-   [gp_enable_sort_distinct](guc-list.md#gp_enable_sort_distinct)
-   [gp_enable_sort_limit](guc-list.md#gp_enable_sort_limit)
-   [gp_keep_partition_children_locks](guc-list.md#gp_keep_partition_children_locks)

<a id="topic23">

</a>

<a id="topic23"></a>

### Postgres Planner Costing Parameters

> **Caution** Do not adjust these query costing parameters. They are tuned to reflect WarehousePG hardware configurations and typical workloads. All of these parameters are related. Changing one without changing the others can have adverse affects on performance.

-   [cpu_index_tuple_cost](guc-list.md#cpu_index_tuple_cost)
-   [cpu_operator_cost](guc-list.md#cpu_operator_cost)
-   [cpu_tuple_cost](guc-list.md#cpu_tuple_cost)
-   [cursor_tuple_fraction](guc-list.md#cursor_tuple_fraction)
-   [effective_cache_size](guc-list.md#effective_cache_size)
-   [gp_motion_cost_per_row](guc-list.md#gp_motion_cost_per_row)
-   [gp_segments_for_planner](guc-list.md#gp_segments_for_planner)
-   [random_page_cost](guc-list.md#random_page_cost)
-   [seq_page_cost](guc-list.md#seq_page_cost)

<a id="topic24">

</a>

<a id="topic24"></a>

### Database Statistics Sampling Parameters

These parameters adjust the amount of data sampled by an `ANALYZE` operation. Adjusting these parameters affects statistics collection system-wide. You can configure statistics collection on particular tables and columns by using the `ALTER TABLE SET STATISTICS` clause.

-   [default_statistics_target](guc-list.md#default_statistics_target)

<a id="topic25">

</a>

<a id="topic25"></a>

### Sort Operator Configuration Parameters

-   [gp_enable_sort_distinct](guc-list.md#gp_enable_sort_distinct)
-   [gp_enable_sort_limit](guc-list.md#gp_enable_sort_limit)

<a id="topic26">

</a>

<a id="topic26"></a>

### Aggregate Operator Configuration Parameters

-   [gp_enable_agg_distinct](guc-list.md#gp_enable_agg_distinct)
-   [gp_enable_agg_distinct_pruning](guc-list.md#gp_enable_agg_distinct_pruning)
-   [gp_enable_multiphase_agg](guc-list.md#gp_enable_multiphase_agg)
-   [gp_enable_preunique](guc-list.md#gp_enable_preunique)
-   [gp_enable_groupext_distinct_gather](guc-list.md#gp_enable_groupext_distinct_gather)
-   [gp_enable_groupext_distinct_pruning](guc-list.md#gp_enable_groupext_distinct_pruning)
-   [gp_workfile_compression](guc-list.md#gp_workfile_compression)

<a id="topic27">

</a>

<a id="topic27"></a>

### Join Operator Configuration Parameters

-   [join_collapse_limit](guc-list.md#join_collapse_limit)
-   [gp_adjust_selectivity_for_outerjoins](guc-list.md#gp_adjust_selectivity_for_outerjoins)
-   [gp_hashjoin_tuples_per_bucket](guc-list.md#gp_hashjoin_tuples_per_bucket)
-   [gp_statistics_use_fkeys](guc-list.md#gp_statistics_use_fkeys)
-   [gp_workfile_compression](guc-list.md#gp_workfile_compression)

<a id="topic28">

</a>

<a id="topic28"></a>

### Other Postgres Planner Configuration Parameters

-   [from_collapse_limit](guc-list.md#from_collapse_limit)
-   [gp_enable_predicate_propagation](guc-list.md#gp_enable_predicate_propagation)
-   [gp_max_plan_size](guc-list.md#gp_max_plan_size)
-   [gp_statistics_pullup_from_child_partition](guc-list.md#gp_statistics_pullup_from_child_partition)

<a id="topic_zd5_p32_mdb">

</a>

<a id="topic_zd5_p32_mdb"></a>

### Query Plan Execution

Control the query plan execution.

-   [gp_max_slices](guc-list.md#gp_max_slices)
-   [plan_cache_mode](guc-list.md#plan_cache_mode)

<a id="topic29">

</a>

<a id="topic29"></a><a id="kh155046"></a>

## Error Reporting and Logging Parameters

These configuration parameters control WarehousePG logging.

<a id="topic30">

</a>

### Log Rotation

-   [log_rotation_age](guc-list.md#log_rotation_age)
-   [log_rotation_size](guc-list.md#log_rotation_size)
-   [log_truncate_on_rotation](guc-list.md#log_truncate_on_rotation)

<a id="topic31">

</a>

<a id="topic31"></a>

### When to Log

-   [client_min_messages](guc-list.md#client_min_messages)
-   [gp_interconnect_debug_retry_interval](guc-list.md#gp_interconnect_debug_retry_interval)
-   [log_error_verbosity](guc-list.md#log_error_verbosity)
-   [log_file_mode](guc-list.md#log_file_mode)
-   [log_min_duration_statement](guc-list.md#log_min_duration_statement)
-   [log_min_error_statement](guc-list.md#log_min_error_statement)
-   [log_min_messages](guc-list.md#log_min_messages)
-   [optimizer_minidump](guc-list.md#optimizer_minidump)

<a id="topic32">

</a>

<a id="topic32"></a>

### What to Log

-   [debug_pretty_print](guc-list.md#debug_pretty_print)
-   [debug_print_parse](guc-list.md#debug_print_parse)
-   [debug_print_plan](guc-list.md#debug_print_plan)
-   [debug_print_prelim_plan](guc-list.md#debug_print_prelim_plan)
-   [debug_print_rewritten](guc-list.md#debug_print_rewritten)
-   [debug_print_slice_table](guc-list.md#debug_print_slice_table)
-   [gp_log_format](guc-list.md#gp_log_format)
-   [gp_log_interconnect](guc-list.md#gp_log_interconnect)
-   [gp_log_resqueue_priority_sleep_time](guc-list.md#gp_log_resqueue_priority_sleep_time)
-   [log_autostats](guc-list.md#log_autostats)
-   [log_connections](guc-list.md#log_connections)
-   [log_disconnections](guc-list.md#log_disconnections)
-   [log_dispatch_stats](guc-list.md#log_dispatch_stats)
-   [log_duration](guc-list.md#log_duration)
-   [log_executor_stats](guc-list.md#log_executor_stats)
-   [log_hostname](guc-list.md#log_hostname)
-   [gp_log_endpoints](guc-list.md#gp_log_endpoints)
-   [gp_log_interconnect](guc-list.md#gp_log_interconnect)
-   [gp_print_create_gang_time](guc-list.md#gp_print_create_gang_time)
-   [log_parser_stats](guc-list.md#log_parser_stats)
-   [log_planner_stats](guc-list.md#log_planner_stats)
-   [log_statement](guc-list.md#log_statement)
-   [log_statement_stats](guc-list.md#log_statement_stats)
-   [log_timezone](guc-list.md#log_timezone)
-   [gp_debug_linger](guc-list.md#gp_debug_linger)
-   [gp_reraise_signal](guc-list.md#gp_reraise_signal)

<a id="topic33">

</a>

<a id="topic33"></a><a id="kh171299"></a>

## System Monitoring Parameters

These configuration parameters control WarehousePG data collection and notifications related to database monitoring.

<a id="topic36">

</a>

### WarehousePG Performance Database

The following parameters configure the data collection agents that populate the `gpperfmon` database.

-   [gp_enable_gpperfmon](guc-list.md#gp_enable_gpperfmon)
-   [gp_gpperfmon_send_interval](guc-list.md#gp_gpperfmon_send_interval)
-   [gpperfmon_log_alert_level](guc-list.md#gpperfmon_log_alert_level)
-   [gpperfmon_port](guc-list.md#gpperfmon_port)

<a id="topic37">

</a>

<a id="topic37"></a><a id="kh171364"></a>

## Runtime Statistics Collection Parameters

These parameters control the server statistics collection feature. When statistics collection is enabled, you can access the statistics data using the *pg_stat* family of system catalog views.

-   [stats_queue_level](guc-list.md#stats_queue_level)
-   [track_activities](guc-list.md#track_activities)
-   [track_counts](guc-list.md#track_counts)
-   [update_process_title](guc-list.md#update_process_title)

<a id="topic38">

</a>

<a id="topic38"></a><a id="kh155054"></a>

## Automatic Statistics Collection Parameters

When automatic statistics collection is enabled, you can run `ANALYZE` automatically in the same transaction as an `INSERT`, `UPDATE`, `DELETE`, `COPY` or `CREATE TABLE...AS SELECT` statement when a certain threshold of rows is affected (`on_change`), or when a newly generated table has no statistics (`on_no_stats`). To enable this feature, set the following server configuration parameters in your WarehousePG coordinator `postgresql.conf` file and restart WarehousePG:

-   [gp_autostats_allow_nonowner](guc-list.md#gp_autostats_allow_nonowner)
-   [gp_autostats_mode](guc-list.md#gp_autostats_mode)
-   [gp_autostats_mode_in_functions](guc-list.md#gp_autostats_mode_in_functions)
-   [gp_autostats_on_change_threshold](guc-list.md#gp_autostats_on_change_threshold)
-   [log_autostats](guc-list.md#log_autostats)

> **Caution** Depending on the specific nature of your database operations, automatic statistics collection can have a negative performance impact. Carefully evaluate whether the default setting of `on_no_stats` is appropriate for your system.

<a id="topic39">

</a>

<a id="topic39"></a><a id="kh181507"></a>

## Client Connection Default Parameters

These configuration parameters set defaults that are used for client connections.

<a id="topic40">

</a>

### Statement Behavior Parameters

-   [check_function_bodies](guc-list.md#check_function_bodies)
-   [default_tablespace](guc-list.md#default_tablespace)
-   [default_transaction_deferrable](guc-list.md#default_transaction_deferrable)
-   [default_transaction_isolation](guc-list.md#default_transaction_isolation)
-   [default_transaction_read_only](guc-list.md#default_transaction_read_only)
-   [search_path](guc-list.md#search_path)
-   [statement_timeout](guc-list.md#statement_timeout)
-   [temp_tablespaces](guc-list.md#temp_tablespaces)
-   [vacuum_freeze_min_age](guc-list.md#vacuum_freeze_min_age)

<a id="topic41">

</a>

<a id="topic41"></a>

### Locale and Formatting Parameters

-   [client_encoding](guc-list.md#client_encoding)
-   [DateStyle](guc-list.md#datestyle)
-   [extra_float_digits](guc-list.md#extra_float_digits)
-   [IntervalStyle](guc-list.md#intervalstyle)
-   [lc_collate](guc-list.md#lc_collate)
-   [lc_ctype](guc-list.md#lc_ctype)
-   [lc_messages](guc-list.md#lc_messages)
-   [lc_monetary](guc-list.md#lc_monetary)
-   [lc_numeric](guc-list.md#lc_numeric)
-   [lc_time](guc-list.md#lc_time)
-   [TimeZone](guc-list.md#timezone)

<a id="topic42">

</a>

<a id="topic42"></a>

### Other Client Default Parameters

-   [dynamic_library_path](guc-list.md#dynamic_library_path)
-   [explain_pretty_print](guc-list.md#explain_pretty_print)
-   [local_preload_libraries](guc-list.md#local_preload_libraries)

<a id="topic43">

</a>

<a id="topic43"></a><a id="kh163788"></a>

## Lock Management Parameters

These configuration parameters set limits for locks and deadlocks.

-   [deadlock_timeout](guc-list.md#deadlock_timeout)
-   \[gp_enable global_deadlock_detector](guc-list.html#gp_enable global_deadlock_detector)
-   [gp_global_deadlock_detector_period](guc-list.md#gp_global_deadlock_detector_period)
-   [lock_timeout](guc-list.md#lock_timeout)
-   [max_locks_per_transaction](guc-list.md#max_locks_per_transaction)

<a id="topic44">

</a>

<a id="topic44"></a><a id="kh155069"></a>

## Resource Management Parameters (Resource Queues)

The following configuration parameters configure the WarehousePG resource management feature (resource queues), query prioritization, memory utilization and concurrency control.

-   [gp_log_resqueue_priority_sleep_time](guc-list.md#gp_log_resqueue_priority_sleep_time)
-   [gp_resqueue_memory_policy](guc-list.md#gp_resqueue_memory_policy)
-   [gp_resqueue_priority](guc-list.md#gp_resqueue_priority)
-   [gp_resqueue_priority_cpucores_per_segment](guc-list.md#gp_resqueue_priority_cpucores_per_segment)
-   [gp_resqueue_priority_sweeper_interval](guc-list.md#gp_resqueue_priority_sweeper_interval)
-   [gp_vmem_idle_resource_timeout](guc-list.md#gp_vmem_idle_resource_timeout)
-   [gp_vmem_protect_limit](guc-list.md#gp_vmem_protect_limit)
-   [gp_vmem_protect_segworker_cache_limit](guc-list.md#gp_vmem_protect_segworker_cache_limit)
-   [max_resource_queues](guc-list.md#max_resource_queues)
-   [max_resource_portals_per_transaction](guc-list.md#max_resource_portals_per_transaction)
-   [max_statement_mem](guc-list.md#max_statement_mem)
-   [resource_cleanup_gangs_on_wait](guc-list.md#resource_cleanup_gangs_on_wait)
-   [resource_select_only](guc-list.md#resource_select_only)
-   [runaway_detector_activation_percent](guc-list.md#runaway_detector_activation_percent)
-   [statement_mem](guc-list.md#statement_mem)
-   [stats_queue_level](guc-list.md#stats_queue_level)
-   [vmem_process_interrupt](guc-list.md#vmem_process_interrupt)

<a id="topic444">

</a>

<a id="topic444"></a><a id="kh1550694"></a>

## Resource Management Parameters (Resource Groups)

The following parameters configure the WarehousePG resource group workload management feature.

-   [gp_count_host_segments_using_address](guc-list.md#gp_count_host_segments_using_address)
-   [gp_resgroup_memory_policy](guc-list.md#gp_resgroup_memory_policy)
-   [gp_resource_group_bypass](guc-list.md#gp_resource_group_bypass)
-   [gp_resource_group_bypass_catalog_query](guc-list.md#gp_resource_group_bypass_catalog_query)
-   [gp_resource_group_cpu_ceiling_enforcement](guc-list.md#gp_resource_group_cpu_ceiling_enforcement)
-   [gp_resource_group_cpu_limit](guc-list.md#gp_resource_group_cpu_limit)
-   [gp_resource_group_cpu_priority](guc-list.md#gp_resource_group_cpu_priority)
-   [gp_resource_group_enable_recalculate_query_mem](guc-list.md#gp_resource_group_enable_recalculate_query_mem)
-   [gp_resource_group_memory_limit](guc-list.md#gp_resource_group_memory_limit)
-   [gp_resource_group_queuing_timeout](guc-list.md#gp_resource_group_queuing_timeout)
-   [gp_resource_manager](guc-list.md#gp_resource_manager)
-   [gp_vmem_idle_resource_timeout](guc-list.md#gp_vmem_idle_resource_timeout)
-   [gp_vmem_protect_segworker_cache_limit](guc-list.md#gp_vmem_protect_segworker_cache_limit)
-   [max_statement_mem](guc-list.md#max_statement_mem)
-   [memory_spill_ratio](guc-list.md#memory_spill_ratio)
-   [runaway_detector_activation_percent](guc-list.md#runaway_detector_activation_percent)
-   [statement_mem](guc-list.md#statement_mem)
-   [vmem_process_interrupt](guc-list.md#vmem_process_interrupt)

<a id="topic45">

</a>

<a id="topic45"></a><a id="kh155070"></a>

## External Table Parameters

The following parameters configure the external tables feature of WarehousePG.

-   [gp_external_enable_exec](guc-list.md#gp_external_enable_exec)
-   [gp_external_enable_filter_pushdown](guc-list.md#gp_external_enable_filter_pushdown)
-   [gp_external_max_segs](guc-list.md#gp_external_max_segs)
-   [gp_initial_bad_row_limit](guc-list.md#gp_initial_bad_row_limit)
-   [gp_reject_percent_threshold](guc-list.md#gp_reject_percent_threshold)
-   [gpfdist_retry_timeout](guc-list.md#gpfdist_retry_timeout)
-   [readable_external_table_timeout](guc-list.md#readable_external_table_timeout)
-   [writable_external_table_bufsize](guc-list.md#writable_external_table_bufsize)
-   [verify_gpfdists_cert](guc-list.md#verify_gpfdists_cert)

<a id="topic46">

</a>

<a id="topic46"></a><a id="kh155071"></a>

## Database Table Parameters

The following parameter configures default option settings for WarehousePG tables.

-   [gp_create_table_random_default_distribution](guc-list.md#gp_create_table_random_default_distribution)
-   [gp_default_storage_options](guc-list.md#gp_default_storage_options)
-   [gp_enable_exchange_default_partition](guc-list.md#gp_enable_exchange_default_partition)
-   [gp_enable_segment_copy_checking](guc-list.md#gp_enable_segment_copy_checking)
-   [gp_use_legacy_hashops](guc-list.md#gp_use_legacy_hashops)

<a id="topic_hfd_1tl_zp">

</a>

<a id="topic_hfd_1tl_zp"></a>

### Append-Optimized Table Parameters

The following parameters configure the append-optimized tables feature of WarehousePG.

-   [max_appendonly_tables](guc-list.md#max_appendonly_tables)
-   [gp_add_column_inherits_table_setting](guc-list.md) \[gp_appendonly_compaction](guc-list.html#gp_add_column_inherits_table_setting](guc-list.html) \[gp_appendonly_compaction)
-   [gp_appendonly_compaction_threshold](guc-list.md#gp_appendonly_compaction_threshold)
-   [validate_previous_free_tid](guc-list.md#validate_previous_free_tid)

<a id="topic48">

</a>

<a id="topic48"></a><a id="kh178569"></a>

## Past Version Compatibility Parameters

The following parameters provide compatibility with older PostgreSQL and WarehousePG versions. You do not need to change these parameters in WarehousePG.

<a id="topic_ax3_r1v_bdb">

</a>

### PostgreSQL

-   [array_nulls](guc-list.md#array_nulls)
-   [backslash_quote](guc-list.md#backslash_quote)
-   [escape_string_warning](guc-list.md#escape_string_warning)
-   [quote_all_identifiers](guc-list.md#quote_all_identifiers)
-   [standard_conforming_strings](guc-list.md#standard_conforming_strings)
-   [transform_null_equals](guc-list.md#transform_null_equals)

<a id="topic_jq1_n1v_bdb">

</a>

<a id="topic_jq1_n1v_bdb"></a>

### WarehousePG

-   [enable_implicit_timeformat_YYYYMMDDHH24MISS](guc-list.md#enable_implicit_timeformat_yyyymmddhh24miss)
-   [gp_ignore_error_table](guc-list.md#gp_ignore_error_table)

<a id="topic49">

</a>

<a id="topic49"></a><a id="kh182770"></a>

## WarehousePG Array Configuration Parameters

The parameters in this topic control the configuration of the WarehousePG array and its components: segments, coordinator, distributed transaction manager, coordinator mirror, and interconnect.

<a id="topic50">

</a>

### Interconnect Configuration Parameters

-   [gp_interconnect_address_type](guc-list.md#gp_interconnect_address_type)
-   [gp_interconnect_cursor_ic_table_size](guc-list.md#gp_interconnect_cursor_ic_table_size)
-   [gp_interconnect_fc_method](guc-list.md#gp_interconnect_fc_method)
-   [gp_interconnect_proxy_addresses](guc-list.md#gp_interconnect_proxy_addresses)
-   [gp_interconnect_queue_depth](guc-list.md#gp_interconnect_queue_depth)
-   [gp_interconnect_setup_timeout](guc-list.md#gp_interconnect_setup_timeout)
-   [gp_interconnect_snd_queue_depth](guc-list.md#gp_interconnect_snd_queue_depth)
-   [gp_interconnect_transmit_timeout](guc-list.md#gp_interconnect_transmit_timeout)
-   [gp_interconnect_type](guc-list.md#gp_interconnect_type)
-   [gp_max_packet_size](guc-list.md#gp_max_packet_size)

> **Note** WarehousePG supports only the UDPIFC (default) and TCP interconnect types.

<a id="topic51">

</a>

<a id="topic51"></a>

### Dispatch Configuration Parameters

-   [gp_cached_segworkers_threshold](guc-list.md#gp_cached_segworkers_threshold)
-   [gp_enable_direct_dispatch](guc-list.md#gp_enable_direct_dispatch)
-   [gp_segment_connect_timeout](guc-list.md#gp_segment_connect_timeout)
-   [gp_set_proc_affinity](guc-list.md#gp_set_proc_affinity)

<a id="topic52">

</a>

<a id="topic52"></a>

### Fault Operation Parameters

-   [gp_set_read_only](guc-list.md#gp_set_read_only)
-   [gp_fts_probe_interval](guc-list.md#gp_fts_probe_interval)
-   [gp_fts_probe_retries](guc-list.md#gp_fts_probe_retries)
-   [gp_fts_probe_timeout](guc-list.md#gp_fts_probe_timeout)
-   [gp_fts_replication_attempt_count](guc-list.md#gp_fts_replication_attempt_count)
-   [gp_log_fts](guc-list.md#gp_log_fts)

<a id="topic53">

</a>

<a id="topic53"></a>

### Distributed Transaction Management Parameters

-   [gp_max_local_distributed_cache](guc-list.md#gp_max_local_distributed_cache)
-   [dtx_phase2_retry_count](guc-list.md#dtx_phase2_retry_count)

<a id="topic54">

</a>

<a id="topic54"></a>

### Read-Only Parameters

-   [gp_command_count](guc-list.md#gp_command_count)
-   [gp_content](guc-list.md#gp_content)
-   [gp_dbid](guc-list.md#gp_dbid)
-   [gp_retrieve_conn](guc-list.md#gp_retrieve_conn)
-   [gp_session_id](guc-list.md#gp_session_id)
-   [gp_session_role](guc-list.md#gp_session_role)
-   [gp_server_version](guc-list.md#gp_server_version)
-   [gp_server_version_num](guc-list.md#gp_server_version_num)

<a id="topic55">

</a>

<a id="topic55"></a><a id="kh184289"></a>

## WarehousePG Mirroring Parameters for Coordinator and Segments

These parameters control the configuration of the replication between WarehousePG primary coordinator and standby coordinator.

-   [max_slot_wal_keep_size](guc-list.md#max_slot_wal_keep_size)
-   [repl_catchup_within_range](guc-list.md#repl_catchup_within_range)
-   [replication_timeout](guc-list.md#replication_timeout)
-   [wait_for_replication_threshold](guc-list.md#wait_for_replication_threshold)
-   [wal_keep_segments](guc-list.md#wal_keep_segments)
-   [wal_receiver_status_interval](guc-list.md#wal_receiver_status_interval)
-   [wal_sender_archiving_status_interval](guc-list.md#wal_sender_archiving_status_interval)

<a id="topic56">

</a>

<a id="topic56"></a>

## WarehousePG PL/Java Parameters

The parameters in this topic control the configuration of the WarehousePG PL/Java language.

-   [pljava_classpath](guc-list.md#pljava_classpath)
-   [pljava_classpath_insecure](guc-list.md#pljava_classpath_insecure)
-   [pljava_statement_cache_size](guc-list.md#pljava_statement_cache_size)
-   [pljava_release_lingering_savepoints](guc-list.md#pljava_release_lingering_savepoints)
-   [pljava_vmoptions](guc-list.md#pljava_vmoptions)

<a id="topic_t3n_qml_rz">

</a>

<a id="topic_t3n_qml_rz"></a>

## XML Data Parameters

The parameters in this topic control the configuration of the WarehousePG XML data type.

-   [xmlbinary](guc-list.md#xmlbinary)
-   [xmloption](guc-list.md#xmloption)
