---
title: Procedural Languages
description: Procedural language extensions for writing functions and stored procedures in WarehousePG.

---

PL/pgSQL, PL/Perl, and PL/Python are bundled with WarehousePG, so they don't require a separate install. Enable them with `CREATE EXTENSION` in the target database:

-   [PL/pgSQL](../../../admin_guide/analytics/procedural_languages/pl_sql.md)
-   [PL/Perl](../../../admin_guide/analytics/procedural_languages/pl_perl.md)
-   [PL/Python](../../../admin_guide/analytics/procedural_languages/pl_python.md)

Install the following languages separately on every host before you enable them:

-   [PL/Java](../../../admin_guide/analytics/procedural_languages/pl_java.md) - Enables writing functions in the Java programming language.
-   [PL/R](../../../admin_guide/analytics/procedural_languages/pl_r.md) - Enables writing functions in the R programming language.
