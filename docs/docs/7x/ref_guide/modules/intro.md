# Additional Supplied Modules 

This section describes additional modules available in the WarehousePG installation. These modules may be PostgreSQL- or WarehousePG-sourced.

`contrib` modules are typically packaged as extensions. You register a module in a database using the [CREATE EXTENSION](../sql_commands/CREATE_EXTENSION.html) command. You remove a module from a database with [DROP EXTENSION](../sql_commands/DROP_EXTENSION.html).

The following WarehousePG and PostgreSQL `contrib` modules are installed; refer to the linked module documentation for usage instructions.

-   [advanced\_password\_check](adv_passwd_check.html) Provides password quality checking and policy definition for WarehousePG.
-   [auto\_explain](auto-explain.html) Provides a means for logging execution plans of slow statements automatically.
-   [btree\_gin](btree_gin.html) - Provides sample generalized inverted index \(GIN\) operator classes that implement B-tree equivalent behavior for certain data types.
-   [citext](citext.html) - Provides a case-insensitive, multibyte-aware text data type.
-   [dblink](dblink.html) - Provides connections to other WarehousePGs.
-   [diskquota.md\#](diskquota.html) - Allows administrators to set disk usage quotas for WarehousePG roles and schemas.
-   [fuzzystrmatch](fuzzystrmatch.html) - Determines similarities and differences between strings.
-   [gp\_exttable\_fdw](gp_exttable_fdw.html) - Built-in foreign-data wrapper that internally converts an external table to a foreign table.
-   [gp\_legacy\_string\_agg](gp_legacy_string_agg.html) - Implements a legacy, single-argument `string_agg()` aggregate function that was present in WarehousePG 5.
-   [gp\_sparse\_vector](gp_sparse_vector.html) - Implements a WarehousePG data type that uses compressed storage of zeros to make vector computations on floating point numbers faster.
-   [greenplum_fdw](greenplum_fdw.html) - Provides a foreign data wrapper (FDW) for accessing data stored in one or more external WarehousePG clusters.
-   [hstore](hstore.html) - Provides a data type for storing sets of key/value pairs within a single PostgreSQL value.
-   [ip4r](ip4r.html) - Provides data types for operations on IPv4 and IPv6 IP addresses.
-   [ltree](ltree.html) - Provides data types for representing labels of data stored in a hierarchical tree-like structure.
-   [orafce](orafce_ref.html) - Provides WarehousePG-specific Oracle SQL compatibility functions.
-   [pageinspect](pageinspect.html) - Provides functions for low level inspection of the contents of database pages; available to superusers only.
-   [pg_cron](pg_cron.html) -  Provides a cron-based job scheduler that runs inside the database.
-   [pg\_trgm](pg_trgm.html) - Provides functions and operators for determining the similarity of alphanumeric text based on trigram matching. The module also provides index operator classes that support fast searching for similar strings.
-   [pg_buffercache](pg_buffercache.html) - Provides access to five views for obtaining cluster-wide shared buffer metrics.
-   [pgcrypto](pgcrypto.html) - Provides cryptographic functions for WarehousePG.
-   [postgresml](postgresml.html) - Provides functions for using tens of thousands of pre-trained open source AI/machine learning models in WarehousePG.
-   [pgvector](pgvector/pgvector.html) - Provides vector similarity search capabilities for WarehousePG that enable searching, storing, and querying machine language-generated embeddings at large scale.
-   [postgres\_fdw](postgres_fdw.html) - Provides a foreign data wrapper \(FDW\) for accessing data stored in an external PostgreSQL or WarehousePG.
-   [postgresql-hll](postgresql-hll.html) - Provides HyperLogLog data types for PostgreSQL and WarehousePG.
-   [sslinfo](sslinfo.html) - Provides information about the SSL certificate that the current client provided when connecting to WarehousePG.
-   [tablefunc](tablefunc.html) - Provides various functions that return tables (multiple rows).
-   [timestamp9](timestamp9.html) - Provides an efficient nanosecond-precision timestamp data type for WarehousePG.
-   [tsm_system_rows](tsm_system_rows.html) - Implements the `SYSTEM_ROWS` table sampling method.
-   [tsm_system_time](tsm_system_time.html) - implements the `SYSTEM_TIME` table sampling method.
-   [uuid-ossp](uuid-ossp.html) - Provides functions to generate universally unique identifiers (UUIDs).

