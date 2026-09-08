---
title: Bundled extensions
description: Extensions that ship with WarehousePG and don't require a separate package install, with WHPG 6.x/7.x availability.
redirects:
  - /docs/6x/ref_guide/modules/bundled
  - /docs/7x/ref_guide/modules/bundled
---

Bundled extensions ship with WarehousePG, and availability varies by version.

| Extension | Description | 6.x | 7.x |
| --- | --- | :---: | :---: |
| `amcheck` | Provides functions for verifying the logical consistency of indexes and heap relations. | ✓ | — |
| [auto_explain](auto-explain.md) | Automatically logs execution plans of slow statements. | ✓ | ✓ |
| [btree_gin](btree_gin.md) | Provides GIN operator classes that implement B-tree equivalent behavior for certain data types. | ✓ | ✓ |
| [citext](citext.md) | Provides a case-insensitive, multibyte-aware text data type. | ✓ | ✓ |
| [dblink](dblink.md) | Provides connections to other WarehousePG databases. | ✓ | ✓ |
| `file_fdw` | Provides a foreign-data wrapper for accessing data files in the server's file system. | — | ✓ |
| [fuzzystrmatch](fuzzystrmatch.md) | Determines similarities and differences between strings. | ✓ | ✓ |
| [gp_array_agg](gp_array_agg.md) | Implements a parallel `array_agg()` aggregate function. | ✓ | — |
| [gp_check_functions](gp_check_functions.md) | Provides views to check for orphaned and missing relation files, and a function to move orphaned files. | ✓ | — |
| `gp_debug_numsegments` | Provides functions for testing and debugging cluster segment count behavior. | — | ✓ |
| `gp_distribution_policy` | Provides access to a table's distribution policy information. | ✓ | ✓ |
| [gp_exttable_fdw](gp_exttable_fdw.md) | Built-in foreign-data wrapper that converts an external table to a foreign table. | — | ✓ |
| `gp_inject_fault` | Provides fault injection points for testing cluster fault tolerance and recovery. | — | ✓ |
| `gp_internal_tools` | Provides internal diagnostic functions for WarehousePG support and engineering use. | ✓ | ✓ |
| [gp_legacy_string_agg](gp_legacy_string_agg.md) | Implements the legacy, single-argument `string_agg()` aggregate function from WarehousePG 5. | ✓ | ✓ |
| [gp_parallel_retrieve_cursor](gp_parallel_retrieve_cursor.md) | Provides extended cursor functionality to retrieve data, in parallel, directly from segments. | ✓ | — |
| [gp_percentile_agg](gp_percentile_agg.md) | Improves GPORCA performance for ordered-set aggregate functions. | ✓ | — |
| [gp_pitr](gp_pitr.md) | Supports point-in-time recovery for WarehousePG 6. | ✓ | — |
| `gp_replica_check` | Provides functions for verifying consistency between primary and mirror segments. | — | ✓ |
| [gp_sparse_vector](gp_sparse_vector.md) | Implements a data type that uses compressed storage of zeros to make vector computations on floating point numbers faster. | ✓ | ✓ |
| [gp_subtransaction_overflow](gp_subtransaction_overflow.md) | Provides a view and function for querying suboverflowed backends. | ✓ | — |
| `gp_toolkit` | Provides administrative views and functions for monitoring database status, such as skew, locks, and disk usage. | — | ✓ |
| [greenplum_fdw](greenplum_fdw.md) | Foreign-data wrapper for running queries between WarehousePG clusters. | ✓ | — |
| [hstore](hstore.md) | Provides a data type for storing sets of key/value pairs within a single value. | ✓ | ✓ |
| `intarray` | Provides additional functions, operators, and index support for arrays of integers with no null elements. | — | ✓ |
| [ip4r](ip4r.md) | Provides IPv4 and IPv6 data types, range index types, and related functions and operators. | ✓ | — |
| [isn](isn.md) | Provides data types for international product numbering standards (EAN13, UPC, ISBN, ISMN, ISSN). | ✓ | ✓ |
| [ltree](ltree.md) | Provides data types for representing labels of data stored in a hierarchical tree-like structure. | ✓ | ✓ |
| [orafce](orafce_ref.md) | Provides Oracle SQL compatibility functions. | ✓ | ✓ |
| [pageinspect](pageinspect.md) | Provides functions for low-level inspection of the contents of database pages. Available to superusers only. | ✓ | ✓ |
| [pg_buffercache](pg_buffercache.md) | Provides access to views for obtaining cluster-wide shared buffer metrics. | — | ✓ |
| [pg_cron](pg_cron.md) | Cron-based job scheduler that runs inside the database. | ✓ | — |
| `pg_hint_plan` | Allows controlling query execution plans using hints specified in SQL comments. | — | ✓ |
| [pg_stat_statements](pg_stat_statements.md) | Tracks execution statistics of all SQL statements. Requires `shared_preload_libraries`. | — | ✓ |
| [pg_trgm](pg_trgm.md) | Provides functions and operators for determining the similarity of alphanumeric text based on trigram matching. | ✓ | ✓ |
| [pgcrypto](pgcrypto.md) | Provides cryptographic functions. | ✓ | ✓ |
| PL/Perl | Enables writing functions and triggers in Perl. | ✓ | ✓ |
| PL/pgSQL | Enables writing functions, triggers, and procedural code in a SQL-like language. | ✓ | ✓ |
| PL/Python | Enables writing functions in Python. | ✓ | ✓ |
| [postgres_fdw](postgres_fdw.md) | Provides a foreign-data wrapper for accessing data stored in a remote PostgreSQL or WarehousePG database. | ✓ | ✓ |
| [sslinfo](sslinfo.md) | Provides information about the SSL certificate of the current client connection. | ✓ | ✓ |
| [tablefunc](tablefunc.md) | Provides various functions that return tables (multiple rows). | ✓ | ✓ |
| [timestamp9](timestamp9.md) | Provides an efficient, nanosecond-precision timestamp data type and related functions. | ✓ | — |
| [tsm_system_rows](tsm_system_rows.md) | Implements the `SYSTEM_ROWS` table sampling method for `TABLESAMPLE`. | — | ✓ |
| [tsm_system_time](tsm_system_time.md) | Implements the `SYSTEM_TIME` table sampling method for `TABLESAMPLE`. | — | ✓ |
| `unaccent` | Provides a text search dictionary that removes accents from lexemes. | — | ✓ |
| [uuid-ossp](uuid-ossp.md) | Provides functions to generate universally unique identifiers (UUIDs). | ✓ | ✓ |
