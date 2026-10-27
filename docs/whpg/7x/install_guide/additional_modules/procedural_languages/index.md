---
title: Installing procedural languages
description: How to enable the bundled procedural languages and where to find installation instructions for PL/Java and PL/R.

---

WarehousePG bundles PL/pgSQL, PL/Perl, and PL/Python. It also supports PL/Java and PL/R, which you install separately.

## Enabling bundled procedural languages

The bundled languages don't require a separate install. Enable each language with `CREATE EXTENSION` in the target database:

-   [PL/pgSQL](../../../admin_guide/analytics/procedural_languages/pl_sql.md): `CREATE EXTENSION plpgsql;`
-   [PL/Perl](../../../admin_guide/analytics/procedural_languages/pl_perl.md): `CREATE EXTENSION plperl;`
-   [PL/Python](../../../admin_guide/analytics/procedural_languages/pl_python.md): `CREATE EXTENSION plpython3u;`

## Installing PL/Java and PL/R

Install PL/Java and PL/R on every host before you enable them. See the installation instructions in the repositories:

-   [PL/Java](https://github.com/warehouse-pg/whpg-pljava#building-and-testing)
-   [PL/R](https://github.com/warehouse-pg/whpg-plr#building-and-testing)

After installing, see [PL/Java](../../../admin_guide/analytics/procedural_languages/pl_java.md) and [PL/R](../../../admin_guide/analytics/procedural_languages/pl_r.md) to enable and use them.
