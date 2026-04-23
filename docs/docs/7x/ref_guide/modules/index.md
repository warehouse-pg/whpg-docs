---
title: Additional Supplied Modules
navigation:
  - edb_modules
  - auto-explain
  - btree_gin
  - citext
  - dblink
  - diskquota
  - fuzzystrmatch
  - gp_exttable_fdw
  - gp_legacy_string_agg
  - gp_sparse_vector
  - hstore
  - ip4r
  - ltree
  - orafce_ref
  - pageinspect
  - pg_buffercache
  - pg_cron
  - pg_stat_statements
  - pg_trgm
  - pgcrypto
  - postgresml
  - postgres_fdw
  - postgresql-hll
  - sslinfo
  - tablefunc
  - timestamp9
  - uuid-ossp
indexCards: extra

---

WarehousePG (WHPG) extends the core capabilities of Postgres with a suite of additional modules designed for enterprise-scale data warehousing. These modules provide specialized functionality for performance, security, and integration, and are categorized into three primary types:

-   **Postgres Sourced Modules**: These are standard "contrib" modules that are part of the official PostgreSQL distribution. WarehousePG includes these to ensure developers can use familiar, high-quality Postgres tools for data manipulation and query analysis.

-   **WHPG Open Source Modules**: These are open-source extensions specifically developed or optimized for the WarehousePG MPP ecosystem.

The following WarehousePG and PostgreSQL `contrib` modules are installed; refer to the linked module documentation for usage instructions.

-   [auto_explain](auto-explain.md) Provides a means for logging execution plans of slow statements automatically.
-   [btree_gin](btree_gin.md) - Provides sample generalized inverted index (GIN) operator classes that implement B-tree equivalent behavior for certain data types.
-   [citext](citext.md) - Provides a case-insensitive, multibyte-aware text data type.
-   [dblink](dblink.md) - Provides connections to other WarehousePGs.
-   [diskquota](diskquota.md) - Allows administrators to set disk usage quotas for WarehousePG roles and schemas.
-   [fuzzystrmatch](fuzzystrmatch.md) - Determines similarities and differences between strings.
-   [gp_exttable_fdw](gp_exttable_fdw.md) - Built-in foreign-data wrapper that internally converts an external table to a foreign table.
-   [gp_legacy_string_agg](gp_legacy_string_agg.md) - Implements a legacy, single-argument `string_agg()` aggregate function that was present in WarehousePG 5.
-   [gp_sparse_vector](gp_sparse_vector.md) - Implements a WarehousePG data type that uses compressed storage of zeros to make vector computations on floating point numbers faster.
-   [hstore](hstore.md) - Provides a data type for storing sets of key/value pairs within a single PostgreSQL value.
-   [ip4r](ip4r.md) - Provides data types for operations on IPv4 and IPv6 IP addresses.
-   [ltree](ltree.md) - Provides data types for representing labels of data stored in a hierarchical tree-like structure.
-   [orafce](orafce_ref.md) - Provides WarehousePG-specific Oracle SQL compatibility functions.
-   [pageinspect](pageinspect.md) - Provides functions for low level inspection of the contents of database pages; available to superusers only.
-   [pg_buffercache](pg_buffercache.md) - Provides access to five views for obtaining cluster-wide shared buffer metrics.
-   [pg_cron](pg_cron.md) -  Provides a cron-based job scheduler that runs inside the database.
-   [pg_stat_statements](pg_stat_statements.md) - Provides a means for tracking execution statistics of all SQL statements executed by WarehousePG.
-   [pg_trgm](pg_trgm.md) - Provides functions and operators for determining the similarity of alphanumeric text based on trigram matching. The module also provides index operator classes that support fast searching for similar strings.
-   [pgcrypto](pgcrypto.md) - Provides cryptographic functions for WarehousePG.
-   [postgresml](postgresml.md) - Provides functions for using tens of thousands of pre-trained open source AI/machine learning models in WarehousePG.
-   [postgres_fdw](postgres_fdw.md) - Provides a foreign data wrapper (FDW) for accessing data stored in an external PostgreSQL or WarehousePG.
-   [postgresql-hll](postgresql-hll.md) - Provides HyperLogLog data types for PostgreSQL and WarehousePG.
-   [sslinfo](sslinfo.md) - Provides information about the SSL certificate that the current client provided when connecting to WarehousePG.
-   [tablefunc](tablefunc.md) - Provides various functions that return tables (multiple rows).
-   [timestamp9](timestamp9.md) - Provides an efficient nanosecond-precision timestamp data type for WarehousePG.
-   [tsm_system_rows](tsm_system_rows.md) - Implements the `SYSTEM_ROWS` table sampling method.
-   [tsm_system_time](tsm_system_time.md) - implements the `SYSTEM_TIME` table sampling method.
-   [uuid-ossp](uuid-ossp.md) - Provides functions to generate universally unique identifiers (UUIDs).
