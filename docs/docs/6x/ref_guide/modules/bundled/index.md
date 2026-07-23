---
title: Bundled modules
description: Modules that ship with WarehousePG and don't require a separate package install.
navigation:
  - auto-explain
  - btree_gin
  - citext
  - dblink
  - fuzzystrmatch
  - gp_array_agg
  - gp_check_functions
  - gp_legacy_string_agg
  - gp_parallel_retrieve_cursor
  - gp_percentile_agg
  - gp_pitr
  - gp_sparse_vector
  - gp_subtransaction_overflow
  - greenplum_fdw
  - hstore
  - ip4r
  - isn
  - ltree
  - orafce_ref
  - pageinspect
  - pg_cron
  - pg_trgm
  - pgcrypto
  - postgres_fdw
  - sslinfo
  - tablefunc
  - timestamp9
  - uuid-ossp

---

These modules ship with WarehousePG. Activate them in each database with `CREATE EXTENSION <module_name>`, unless the individual reference page specifies a different activation method.

-   [auto_explain](auto-explain.md) - Logs execution plans of slow statements automatically.
-   [btree_gin](btree_gin.md) - Provides GIN operator classes that implement B-tree equivalent behavior for certain data types.
-   [citext](citext.md) - Provides a case-insensitive, multibyte-aware text data type.
-   [dblink](dblink.md) - Provides connections to other WarehousePG databases.
-   [fuzzystrmatch](fuzzystrmatch.md) - Determines similarities and differences between strings.
-   [gp_array_agg](gp_array_agg.md) - Implements a parallel `array_agg()` aggregate function for WarehousePG.
-   [gp_check_functions](gp_check_functions.md) - Provides views to check for orphaned and missing relation files and a user-defined function to move orphaned files.
-   [gp_legacy_string_agg](gp_legacy_string_agg.md) - Implements a legacy, single-argument `string_agg()` aggregate function that was present in WarehousePG 5.
-   [gp_parallel_retrieve_cursor](gp_parallel_retrieve_cursor.md) - Provides extended cursor functionality to retrieve data, in parallel, directly from WarehousePG segments.
-   [gp_percentile_agg](gp_percentile_agg.md) - Improves GPORCA performance for ordered-set aggregate functions.
-   [gp_pitr](gp_pitr.md) - Supports implementing point-in-time recovery for WarehousePG 6.
-   [gp_sparse_vector](gp_sparse_vector.md) - Implements a data type that uses compressed storage of zeros to make vector computations on floating point numbers faster.
-   [gp_subtransaction_overflow](gp_subtransaction_overflow.md) - Provides a view and user-defined function for querying suboverflowed backends.
-   [greenplum_fdw](greenplum_fdw.md) - Provides a foreign data wrapper for accessing data stored in one or more external WarehousePG clusters.
-   [hstore](hstore.md) - Provides a data type for storing sets of key/value pairs within a single value.
-   [ip4r](ip4r.md) - Provides data types for operations on IPv4 and IPv6 IP addresses.
-   [isn](isn.md) - Provides support for international product numbering standards (EAN13, UPC, ISBN, ISMN, ISSN).
-   [ltree](ltree.md) - Provides data types for representing labels of data stored in a hierarchical tree-like structure.
-   [orafce](orafce_ref.md) - Provides Oracle SQL compatibility functions.
-   [pageinspect](pageinspect.md) - Provides functions for low-level inspection of database page contents. Available to superusers only.
-   [pg_cron](pg_cron.md) - Provides a cron-based job scheduler that runs inside the database.
-   [pg_trgm](pg_trgm.md) - Provides functions and operators for determining the similarity of alphanumeric text based on trigram matching.
-   [pgcrypto](pgcrypto.md) - Provides cryptographic functions.
-   [postgres_fdw](postgres_fdw.md) - Provides a foreign data wrapper for accessing data stored in an external PostgreSQL or WarehousePG database.
-   [sslinfo](sslinfo.md) - Provides information about the SSL certificate of the current client connection.
-   [tablefunc](tablefunc.md) - Provides various functions that return tables (multiple rows).
-   [timestamp9](timestamp9.md) - Provides an efficient nanosecond-precision timestamp data type.
-   [uuid-ossp](uuid-ossp.md) - Provides functions to generate universally unique identifiers (UUIDs).
