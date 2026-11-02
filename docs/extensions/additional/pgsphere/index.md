---
title: whpg-pgsphere
description: Store, query, and index spherical data, such as astronomical coordinates, in WarehousePG with the whpg-pgsphere extension.
navigation:
  - release_notes
  - installing
  - using
---

::: info Version availability

whpg-pgsphere is available starting with WarehousePG 7.3.0.
:::

The whpg-pgsphere extension adds spherical data types, operators, and functions to WarehousePG (WHPG). Use it to represent and query geometric objects on a sphere, including points, circles, lines, ellipses, paths, and polygons, and to compute distances, areas, and containment between them. Common use cases include astronomical positioning, such as star positions on the celestial sphere, and geographic coordinate systems, such as sites on Earth.

The WarehousePG whpg-pgsphere extension is based on the [pgSphere extension](https://github.com/postgrespro/pgsphere) for PostgreSQL. The [release notes](release_notes.md) list the pgSphere version each release is based on. The source is in the [whpg-pgsphere repository](https://github.com/warehouse-pg/whpg-pgsphere). No WarehousePG or massively parallel processing (MPP)-specific considerations apply to the extension.

To get started with whpg-pgsphere, see:

-   [Release notes](release_notes.md)
-   [Installing and upgrading whpg-pgsphere](installing.md)
-   [Using whpg-pgsphere](using.md)
