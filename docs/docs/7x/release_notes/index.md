# WarehousePG 7.x Release Notes


## 7.2.1-WHPG
May 15, 2025

## Security Fixes

:::tip [b79881a](https://github.com/warehouse-pg/warehouse-pg/commit/b79881aa875b0861cf53c4a77a495dbef63c284e)
- CVE-2023-5869 
- Run REFRESH MATERIALIZED VIEW CONCURRENTLY in right security context 
:::


:::tip [b3e6063](https://github.com/warehouse-pg/warehouse-pg/commit/b3e6063eb7d189568778873a8d7829b33f5d3620)
- CVE-2024-7348 
- Restrict accesses to non-system views and foreign tables during pg_dump 
:::


:::tip [65e1ffa](https://github.com/warehouse-pg/warehouse-pg/commit/65e1ffa9bb19113873a2b98b11cca6774009192e)
- CVE-2024-10979 
- Block environment variable mutations from trusted PL/Perl
:::

:::tip [f9cff1e](https://github.com/warehouse-pg/warehouse-pg/commit/f9cff1e56aab39c3d6fe5143ab89a6dc0223ecea)
- CVE-2023-5869 
- Detect integer overflow while computing new array dimensions.
:::


:::tip [1e0c7fb](https://github.com/warehouse-pg/warehouse-pg/commit/1e0c7fb3bab3e51c436fc0cc6e53a68a89e9836f)
- CVE-2024-10976 
- Ensure cached plans are correctly marked as dependent on role. 
:::

:::tip [cdebe9e](https://github.com/warehouse-pg/warehouse-pg/commit/cdebe9e7a6d7c6509476934b93c8e25005229f3f)
- CVE-2022-41862 
- Properly NULL-terminate GSS receive buffer on error packet reception 
:::

:::tip [a194858](https://github.com/warehouse-pg/warehouse-pg/commit/a194858bd970c84f08cc8dd98e0baa51c255081d)
- CVE-2023-39417
- Reject substituting extension schemas or owners matching ["$'\]. 
a194858bd970c84f08cc8dd98e0baa51c255081d
:::

:::tip [8248d2e](https://github.com/warehouse-pg/warehouse-pg/commit/8248d2e0e60256641b0ede9dce5598226231d3f7)
- CVE-2024-10978 
- Parallel workers use AuthenticatedUserId for connection privilege checks. 
:::

:::tip [6bc5a9c](https://github.com/warehouse-pg/warehouse-pg/commit/6bc5a9c1093b7ee08a06e7cc2f5c3bdcc656a406)
- CVE-2024-0978 
- Fix improper interactions between session_authorization and role 
:::

:::tip [1636eb9](https://github.com/warehouse-pg/warehouse-pg/commit/1636eb90ec78faa5fc3d29392c5489f99f561dd0)
- CVE-2024-10977 
- libpq: Bail out during SSL/GSS negotiation errors 
:::

:::tip [09486a8](https://github.com/warehouse-pg/warehouse-pg/commit/09486a8fafa4ef6a8be2edfd1b7611b924c46748)
- CVE-2023-5870 
- Ban role pg_signal_backend from more superuser backend types.
:::

:::tip [adb381d](https://github.com/warehouse-pg/warehouse-pg/commit/adb381dbd37d078873aa969b73dda922be6364ea)
- CVE-023-5868 
- Compute aggregate argument types correctly in transformAggregateCall[](). 
:::

:::tip [b6ea999](https://github.com/warehouse-pg/warehouse-pg/commit/b6ea9998d30ec380001d196118fdd07a3c8f2626)
- CVE-2023-5868 
- Compute aggregate argument types correctly in transformAggregateCall[](). 
:::







## Resolved Issues

:::tip [165c562](https://github.com/warehouse-pg/warehouse-pg/commit/165c56297075f86a39ce8ccbf912a0689e8b8df9) 
- gpstart failed with OpenSSL 3.2.2 reporting "double free or corruption" 
:::



:::tip [7cd2336](https://github.com/warehouse-pg/warehouse-pg/commit/7cd2336c723cd80e1cfa38cbec7a6943cc7ce2c4)
-  Initialize attnumsWithEntries to prevent failures during CO rewrite 
:::


:::tip [22657e5](https://github.com/warehouse-pg/warehouse-pg/commit/22657e5539efd3af505cf9b2f30b2672f3721b66)
- Fix a bug in the PostgreSQL-based legacy planner where correlated subqueries return incorrect results due to improper handling of PlaceHolderVar during query optimization. 
:::


:::tip [f9b5481](https://github.com/warehouse-pg/warehouse-pg/commit/f9b5481f7328ca0843587311d208be1f0334d155)
- Fix "unexpected gang size" issue sometimes seen in the postgres planner 
:::



:::tip [c7dd369](https://github.com/warehouse-pg/warehouse-pg/commit/c7dd3698d804d2ec719e39a6543ba0cb76031fc6)
- Fix work_mem reference in hash aggregate where it likely didn't use all the planned memory, likely triggered more spills, thereby affected performance
:::





![WarehousePG with MADlib](/fulllogo_transparent_small_buffer.png "WarehousePG, an open source alternative to Greenplum"){width=250}
