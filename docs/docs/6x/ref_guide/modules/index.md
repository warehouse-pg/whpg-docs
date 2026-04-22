---
title: Additional Supplied Modules
navigation:
  - intro
  - adv_passwd_check
  - auto-explain
  - btree_gin
  - citext
  - dblink
  - diskquota
  - fuzzystrmatch
  - gp_array_agg
  - gp_check_functions
  - gp_legacy_string_agg
  - gp_parallel_retrieve_cursor
  - gp_percentile_agg
  - gp_sparse_vector
  - greenplum_fdw
  - hstore
  - ip4r
  - ltree
  - orafce_ref
  - pageinspect
  - pg_trgm
  - pgcrypto
  - postgres_fdw
  - postgresql-hll
  - sslinfo
  - tablefunc
  - timestamp9
  - uuid-ossp

---

<a id="topic_khf_ltc_vbb"></a>

This section describes additional modules available in the WarehousePG installation. These modules may be PostgreSQL- or WarehousePG-sourced.

`contrib` modules are typically packaged as extensions. You register a module in a database using the [CREATE EXTENSION](../sql_commands/CREATE_EXTENSION.md) command. You remove a module from a database with [DROP EXTENSION](../sql_commands/DROP_EXTENSION.md).

The following WarehousePG and PostgreSQL `contrib` modules are installed; refer to the linked module documentation for usage instructions.

-   [advanced_password_check](adv_passwd_check.md) Provides password quality checking and policy definition for WarehousePG.
-   [auto_explain](auto-explain.md) Provides a means for logging execution plans of slow statements automatically.
-   [btree_gin](btree_gin.md) - Provides sample generalized inverted index (GIN) operator classes that implement B-tree equivalent behavior for certain data types.
-   [citext](citext.md) - Provides a case-insensitive, multibyte-aware text data type.
-   [dblink](dblink.md) - Provides connections to other WarehousePGs.
-   [diskquota](diskquota.md) - Allows administrators to set disk usage quotas for WarehousePG roles and schemas.
-   [fuzzystrmatch](fuzzystrmatch.md) - Determines similarities and differences between strings.
-   [gp_array_agg](gp_array_agg.md) - Implements a parallel `array_agg()` aggregate function for WarehousePG.
-   [gp_check_functions](gp_check_functions.md) - Provides views to check for orphaned and missing relation files and a user-defined function to move orphaned files.
-   [gp_legacy_string_agg](gp_legacy_string_agg.md) - Implements a legacy, single-argument `string_agg()` aggregate function that was present in WarehousePG 5.
-   [gp_parallel_retrieve_cursor](gp_parallel_retrieve_cursor.md) - Provides extended cursor functionality to retrieve data, in parallel, directly from WarehousePG segments.
-   [gp_percentile_agg](gp_percentile_agg.md) - Improves GPORCA performance for ordered-set aggregate functions.
-   [gp_pitr](gp_pitr.md) - Supports implementing Point-in-Time Recovery for WarehousePG 6.
-   [gp_sparse_vector](gp_sparse_vector.md) - Implements a WarehousePG data type that uses compressed storage of zeros to make vector computations on floating point numbers faster.
-   [greenplum_fdw](greenplum_fdw.md) - Provides a foreign data wrapper (FDW) for accessing data stored in one or more external WarehousePG clusters.
-   [gp_subtransaction_overflow](gp_subtransaction_overflow.md) - Provides a view and user-defined function for querying for suboverflowed backends.
-   [hstore](hstore.md) - Provides a data type for storing sets of key/value pairs within a single PostgreSQL value.
-   [ip4r](ip4r.md) - Provides data types for operations on IPv4 and IPv6 IP addresses.
-   [ltree](ltree.md) - Provides data types for representing labels of data stored in a hierarchical tree-like structure.
-   [orafce](orafce_ref.md) - Provides WarehousePG-specific Oracle SQL compatibility functions.
-   [pageinspect](pageinspect.md) - Provides functions for low level inspection of the contents of database pages; available to superusers only.
-   [pg_cron](pg_cron.md) -  Provides a cron-based job scheduler that runs inside the database.
-   [pg_trgm](pg_trgm.md) - Provides functions and operators for determining the similarity of alphanumeric text based on trigram matching. The module also provides index operator classes that support fast searching for similar strings.
-   [pgcrypto](pgcrypto.md) - Provides cryptographic functions for WarehousePG.
-   [postgres_fdw](postgres_fdw.md) - Provides a foreign data wrapper (FDW) for accessing data stored in an external PostgreSQL or WarehousePG.
-   [postgresql-hll](postgresql-hll.md) - Provides HyperLogLog data types for PostgreSQL and WarehousePG.
-   [sslinfo](sslinfo.md) - Provides information about the SSL certificate that the current client provided when connecting to WarehousePG.
-   [tablefunc](tablefunc.md) - Provides various functions that return tables (multiple rows).
-   [timestamp9](timestamp9.md) - Provides an efficient nanosecond-precision timestamp data type for WarehousePG.
-   [uuid-ossp](uuid-ossp.md) - Provides functions to generate universally unique identifiers (UUIDs).
