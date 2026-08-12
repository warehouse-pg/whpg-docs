---
title: Bundled Modules
description: Modules that ship with WarehousePG and don't require a separate package install.
navigation:
  - btree_gin
  - citext
  - dblink
  - fuzzystrmatch
  - gp_exttable_fdw
  - gp_legacy_string_agg
  - gp_sparse_vector
  - hstore
  - isn
  - ltree
  - orafce_ref
  - pageinspect
  - pg_buffercache
  - pg_stat_statements
  - pg_trgm
  - pgcrypto
  - postgres_fdw
  - sslinfo
  - tablefunc
  - uuid-ossp

---

These modules ship with WarehousePG. Activate them in each database with `CREATE EXTENSION <module_name>`, unless the individual reference page specifies a different activation method.

-   [btree_gin](btree_gin.md) - Provides GIN operator classes that implement B-tree equivalent behavior for certain data types.
-   [citext](citext.md) - Provides a case-insensitive, multibyte-aware text data type.
-   [dblink](dblink.md) - Provides connections to other WarehousePG databases.
-   file_fdw - Provides a foreign-data wrapper for accessing data files in the server's file system.
-   [fuzzystrmatch](fuzzystrmatch.md) - Provides functions to determine similarities and differences between strings.
-   gp_debug_numsegments - Provides functions for testing and debugging cluster segment count behavior.
-   gp_distribution_policy - Provides access to a table's distribution policy information.
-   [gp_exttable_fdw](gp_exttable_fdw.md) - Built-in foreign-data wrapper that internally converts an external table to a foreign table.
-   gp_inject_fault - Provides fault injection points for testing cluster fault tolerance and recovery.
-   gp_internal_tools - Provides internal diagnostic functions for WarehousePG support and engineering use.
-   [gp_legacy_string_agg](gp_legacy_string_agg.md) - Implements a legacy, single-argument `string_agg()` aggregate function.
-   gp_replica_check - Provides functions for verifying consistency between primary and mirror segments.
-   [gp_sparse_vector](gp_sparse_vector.md) - Implements a data type that uses compressed storage of zeros to make vector computations on floating point numbers faster.
-   [gp_toolkit](../../gp_toolkit.md) - Provides administrative views and functions for monitoring database status, such as skew, locks, and disk usage.
-   [hstore](hstore.md) - Provides a data type for storing sets of key/value pairs within a single value.
-   intarray - Provides additional functions, operators, and index support for arrays of integers with no null elements.
-   [isn](isn.md) - Provides data types for international product numbering standards (EAN13, UPC, ISBN, ISMN, ISSN).
-   [ltree](ltree.md) - Provides data types for representing labels of data stored in a hierarchical tree-like structure.
-   [orafce](orafce_ref.md) - Provides Oracle SQL compatibility functions.
-   [pageinspect](pageinspect.md) - Provides functions for low-level inspection of the contents of database pages. Available to superusers only.
-   [pg_buffercache](pg_buffercache.md) - Provides access to views for obtaining cluster-wide shared buffer metrics.
-   pg_hint_plan - Allows controlling query execution plans using hints specified in SQL comments.
-   [pg_stat_statements](pg_stat_statements.md) - Tracks execution statistics of all SQL statements. Requires `shared_preload_libraries`.
-   [pg_trgm](pg_trgm.md) - Provides functions and operators for determining the similarity of alphanumeric text based on trigram matching.
-   [pgcrypto](pgcrypto.md) - Provides cryptographic functions.
-   [PL/Perl](../../../admin_guide/analytics/procedural_languages/pl_perl.md) - Enables writing functions and triggers in Perl.
-   plperlu - Provides an untrusted version of PL/Perl that allows unrestricted operations, such as file and network access.
-   [PL/pgSQL](../../../admin_guide/analytics/procedural_languages/pl_sql.md) - Enables writing functions, triggers, and procedural code in a SQL-like language.
-   [PL/Python](../../../admin_guide/analytics/procedural_languages/pl_python.md) - Enables writing functions in Python.
-   [postgres_fdw](postgres_fdw.md) - Provides a foreign data wrapper for accessing data stored in an external Postgres database.
-   [sslinfo](sslinfo.md) - Provides information about the SSL certificate of the current client connection.
-   [tablefunc](tablefunc.md) - Provides various functions that return tables (multiple rows).
-   unaccent - Provides a text search dictionary that removes accents from lexemes.
-   [uuid-ossp](uuid-ossp.md) - Provides functions to generate universally unique identifiers (UUIDs).
