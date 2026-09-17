---
title: Installing Additional Supplied Modules

---

The WarehousePG distribution includes several PostgreSQL- and WarehousePG-sourced `contrib` modules that you have the option to install.

Each module is typically packaged as a WarehousePG extension. You must register these modules in each database in which you want to use it. For example, to register the `dblink` module in the database named `testdb`, use the command:

```
$ psql -d testdb -c 'CREATE EXTENSION dblink;'
```

To remove a module from a database, drop the associated extension. For example, to remove the `dblink` module from the `testdb` database:

```
$ psql -d testdb -c 'DROP EXTENSION dblink;'
```

> **Note** When you drop a module extension from a database, any user-defined function that you created in the database that references functions defined in the module will no longer work. If you created any database objects that use data types defined in the module, WarehousePG will notify you of these dependencies when you attempt to drop the module extension.

You can register the following modules in this manner:

- [btree_gin](/extensions/bundled/btree_gin.md)
- [citext](/extensions/bundled/citext.md)
- [dblink](/extensions/bundled/dblink.md)
- [fuzzystrmatch](/extensions/bundled/fuzzystrmatch.md)
- [gp_array_agg](/extensions/bundled/gp_array_agg.md)
- [gp_check_functions](/extensions/bundled/gp_check_functions.md)
- [gp_parallel_retrieve_cursor](/extensions/bundled/gp_parallel_retrieve_cursor.md)
- [gp_percentile_agg](/extensions/bundled/gp_percentile_agg.md)
- [gp_sparse_vector](/extensions/bundled/gp_sparse_vector.md)
- [greenplum_fdw](/extensions/bundled/greenplum_fdw.md)
- [hstore](/extensions/bundled/hstore.md)
- [ip4r](/extensions/bundled/ip4r.md)
- [ltree](/extensions/bundled/ltree.md)
- [orafce](/extensions/bundled/orafce_ref.md) (WarehousePG only)
- [pageinspect](/extensions/bundled/pageinspect.md)
- [pg_trgm](/extensions/bundled/pg_trgm.md)
- [pgcrypto](/extensions/bundled/pgcrypto.md)
- [postgres_fdw](/extensions/bundled/postgres_fdw.md)
- [sslinfo](/extensions/bundled/sslinfo.md)
- [tablefunc](/extensions/bundled/tablefunc.md)
- [timestamp9](/extensions/bundled/timestamp9.md)
- [uuid-ossp](/extensions/bundled/uuid-ossp.md)

For additional information about the modules supplied with WarehousePG, refer to [Additional Supplied Modules](../ref_guide/modules/index.md) in the *WarehousePG Reference Guide*.

**Parent topic:** [Installing and Upgrading WarehousePG](index.md)
