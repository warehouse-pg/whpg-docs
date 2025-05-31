# WarehousePG 7.x Release Notes

---





## 7.2.1-WHPG
May 15, 2025




gpstart failed with OpenSSL 3.2.2 reporting "double free or corruption" (165c562)

Initialize attnumsWithEntries to prevent failures during CO rewrite (7cd2336)

Fix a bug in the PostgreSQL-based legacy planner where correlated subqueries return incorrect results due to improper handling of PlaceHolderVar during query optimization. (22657e5)

Fix "unexpected gang size" issue sometimes seen in the postgres planner (f9b5481)

Fix work_mem reference in hash aggregate where it likely didn't use all the planned memory, likely triggered more spills, thereby affected performance(c7dd369)

Run REFRESH MATERIALIZED VIEW CONCURRENTLY in right security context - fixes CVE-2023-5869 (b79881a)

Restrict accesses to non-system views and foreign tables during pg_dump - fixes CVE-2024-7348 (b3e6063)

Block environment variable mutations from trusted PL/Perl - fixes CVE-2024-10979 (65e1ffa)

Detect integer overflow while computing new array dimensions. - fixes CVE-2023-5869 (f9cff1e)

Ensure cached plans are correctly marked as dependent on role. - fixes CVE-2024-10976 (1e0c7fb)

Properly NULL-terminate GSS receive buffer on error packet reception - fixes CVE-2022-41862. (cdebe9e)

Reject substituting extension schemas or owners matching ["$'\]. - fixes CVE-2023-39417.

Parallel workers use AuthenticatedUserId for connection privilege checks. - fixes CVE-2024-10978 (8248d2e)

Fix improper interactions between session_authorization and role - fixes CVE-2024-0978 (6bc5a9c)

libpq: Bail out during SSL/GSS negotiation errors - fixes CVE-2024-10977 (1636eb9)

Ban role pg_signal_backend from more superuser backend types. - fixes CVE-2023-5870 (09486a8)

Compute aggregate argument types correctly in transformAggregateCall(). - fixes CVE-023-5868 (adb381d)

Compute aggregate argument types correctly in transformAggregateCall(). - fixes CVE-2023-5868 (b6ea999)








![WarehousePG with MADlib](/fulllogo_transparent_small_buffer.png "WarehousePG, an open source alternative to Greenplum"){width=250}
