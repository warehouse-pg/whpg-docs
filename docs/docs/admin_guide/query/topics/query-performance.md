# Query Performance
---

WarehousePG Database dynamically eliminates irrelevant partitions in a table and optimally allocates memory for different operators in a query.These enhancements scan less data for a query, accelerate query processing, and support more concurrency.

-   Dynamic Partition Elimination

    In WarehousePG Database, values available only when a query runs are used to dynamically prune partitions, which improves query processing speed. Enable or deactivate dynamic partition elimination by setting the server configuration parameter `gp_dynamic_partition_pruning` to `ON` or `OFF`; it is `ON` by default.

-   Memory Optimizations

    WarehousePG Database allocates memory optimally for different operators in a query and frees and re-allocates memory during the stages of processing a query.


> **Note** WarehousePG Database uses GPORCA, the WarehousePG next generation query optimizer, by default. GPORCA extends the planning and optimization capabilities of the Postgres optimizer. For information about the features and limitations of GPORCA, see [Overview of GPORCA](query-piv-opt-overview.html).

**Parent topic:** [SQL: Querying Data](../../query/topics/query.html)

