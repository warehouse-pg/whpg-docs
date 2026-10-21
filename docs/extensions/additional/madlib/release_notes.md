---
title: whpg-madlib release notes
navTitle: Release notes
description: Release notes for the whpg-madlib extension for WarehousePG.
---

The whpg-madlib documentation describes the latest version, including minor releases and patches. These release notes cover what's new in each release.

## 2.1.0

<!-- TODO: confirm the release date against the package upload date on Cloudsmith, and confirm this list with the whpg-madlib maintainers. The date is the commit date of the rel/v2.1.0-WHPG tag, and the items come from the commits between Apache MADlib 2.1.0 and that tag. -->

Release date: September 20, 2026

Based on Apache MADlib 2.1.0. For the upstream changes, see the [Apache MADlib release notes](https://github.com/apache/madlib/blob/master/RELEASE_NOTES).

### Changes

-   Changed `madpack` to use a fixed Python version, chosen when the package is built for WarehousePG 6 or 7, instead of depending on which Python executables the host provides.

### Bug fixes

-   Fixed segmentation faults on little-endian PowerPC (ppc64le) in `svec` operators, such as `madlib.svec_mult()`, and in the sparse linear systems aggregate.
-   Fixed `svec` operators decoding run-length-encoded data incorrectly on platforms where the `char` type is unsigned, such as PowerPC and AArch64. The stored data format is unchanged.
