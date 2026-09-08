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

<table cellpadding="4" cellspacing="0" summary="" border="1" class="simpletable"><colgroup><col style="width:33.33333333333333%" /><col style="width:33.33333333333333%" /></colgroup><thead></thead><tbody><tr>
<td style="vertical-align:top;">
<ul class="ul" id="topic_d45_wcw_pgb__ul_tc3_nlx_wp">
<li class="li"><a class="xref" href="/extensions/bundled/btree_gin.md">btree_gin</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/citext.md">citext</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/dblink.md">dblink</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/fuzzystrmatch.md">fuzzystrmatch</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/gp_array_agg.md">gp_array_agg</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/gp_check_functions.md">gp_check_functions</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/gp_parallel_retrieve_cursor.md">gp_parallel_retrieve_cursor</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/gp_percentile_agg.md">gp_percentile_agg</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/gp_sparse_vector.md">gp_sparse_vector</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/greenplum_fdw.md">greenplum_fdw</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/hstore.md">hstore</a></li>
</ul>
</td>
<td style="vertical-align:top;">
<ul class="ul">
<li class="li"><a class="xref" href="/extensions/bundled/ip4r.md">ip4r</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/ltree.md">ltree</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/orafce_ref.md">orafce</a> (WarehousePG only)</li>
<li class="li"><a class="xref" href="/extensions/bundled/pageinspect.md">pageinspect</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/pg_trgm.md">pg_trgm</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/pgcrypto.md">pgcrypto</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/postgres_fdw.md">postgres_fdw</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/sslinfo.md">sslinfo</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/tablefunc.md">tablefunc</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/timestamp9.md">timestamp9</a></li>
<li class="li"><a class="xref" href="/extensions/bundled/uuid-ossp.md">uuid-ossp</a></li>
</ul>
</td>
</tr>
</tbody></table>

For additional information about the modules supplied with WarehousePG, refer to [Additional Supplied Modules](../ref_guide/modules/index.md) in the *WarehousePG Reference Guide*.

**Parent topic:** [Installing and Upgrading WarehousePG](index.md)
