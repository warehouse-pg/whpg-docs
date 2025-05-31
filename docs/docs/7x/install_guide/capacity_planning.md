# Estimating Storage Capacity
---

To estimate how much data your WarehousePG cluster can accommodate, use these measurements as guidelines. Also keep in mind that you may want to have extra space for landing backup files and data load files on each segment host.

-   **[Calculating Usable Disk Capacity](capacity_planning.html)**  

-   **[Calculating User Data Size](capacity_planning.html)**  

-   **[Calculating Space Requirements for Metadata and Logs](capacity_planning.html)**  


**Parent topic:** [Installing and Upgrading WarehousePG](install_guide/)

## <a id="topic2"></a>Calculating Usable Disk Capacity

To calculate how much data a WarehousePG cluster can hold, you have to calculate the usable disk capacity per segment host and then multiply that by the number of segment hosts in your WarehousePG cluster. Start with the raw capacity of the physical disks on a segment host that are available for data storage \(raw\_capacity\), which is:

```
disk_size * number_of_disks
```

Account for file system formatting overhead \(roughly 10 percent\) and the RAID level you are using. For example, if using RAID-10, the calculation would be:

```
(raw_capacity * 0.9) / 2 = formatted_disk_space
```

For optimal performance, do not completely fill your disks to capacity, but run at 70% or lower. So with this in mind, calculate the usable disk space as follows:

```
formatted_disk_space * 0.7 = usable_disk_space
```

Using only 70% of your disk space allows WarehousePG to use the other 30% for temporary and transaction files on the same disks. If your host systems have a separate disk system that can be used for temporary and transaction files, you can specify a tablespace that WarehousePG uses for the files. Moving the location of the files might improve performance depending on the performance of the disk system.

Once you have formatted RAID disk arrays and accounted for the maximum recommended capacity \(usable\_disk\_space\), you will need to calculate how much storage is actually available for user data \(`U`\). If using WarehousePG mirrors for data redundancy, this would then double the size of your user data \(`2 * U`\). WarehousePG also requires some space be reserved as a working area for active queries. The work space should be approximately one third the size of your user data \(work space = `U/3`\):

```
With mirrors: (2 * U) + U/3 = usable_disk_space

Without mirrors: U + U/3 = usable_disk_space
```

Guidelines for temporary file space and user data space assume a typical analytic workload. Highly concurrent workloads or workloads with queries that require very large amounts of temporary space can benefit from reserving a larger working area. Typically, overall system throughput can be increased while decreasing work area usage through proper workload management. Additionally, temporary space and user space can be isolated from each other by specifying that they reside on different tablespaces.

In the *WarehousePG Administrator Guide*, see these topics:

-   [Managing Performance](../admin_guide/performance.html) for information about workload management
-   [Creating and Managing Tablespaces](../admin_guide/ddl/ddl-tablespace.html) for information about moving the location of temporary and transaction files
-   [Monitoring System State](../admin_guide/managing/monitor.html) for information about monitoring WarehousePG disk space usage

**Parent topic:** [Estimating Storage Capacity](capacity_planning.html)

## <a id="topic3"></a>Calculating User Data Size

As with all databases, the size of your raw data will be slightly larger once it is loaded into the database. On average, raw data will be about 1.4 times larger on disk after it is loaded into the database, but could be smaller or larger depending on the data types you are using, table storage type, in-database compression, and so on.

-   Page Overhead - When your data is loaded into WarehousePG, it is divided into pages of 32KB each. Each page has 20 bytes of page overhead.
-   Row Overhead - In a regular 'heap' storage table, each row of data has 24 bytes of row overhead. An 'append-optimized' storage table has only 4 bytes of row overhead.
-   Attribute Overhead - For the data values itself, the size associated with each attribute value is dependent upon the data type chosen. As a general rule, you want to use the smallest data type possible to store your data \(assuming you know the possible values a column will have\).
-   Indexes - In WarehousePG, indexes are distributed across the segment hosts as is table data. The default index type in WarehousePG is B-tree. Because index size depends on the number of unique values in the index and the data to be inserted, precalculating the exact size of an index is impossible. However, you can roughly estimate the size of an index using these formulas.

    ```
    B-tree: unique_values * (data_type_size + 24 bytes)
    
    Bitmap: (unique_values * =number_of_rows * 1 bit * compression_ratio / 8) + (unique_values * 32)
    ```


**Parent topic:** [Estimating Storage Capacity](capacity_planning.html)

## <a id="topic4"></a>Calculating Space Requirements for Metadata and Logs

On each segment host, you will also want to account for space for WarehousePG log files and metadata:

-   **System Metadata** — For each WarehousePG segment instance \(primary or mirror\) or coordinator instance running on a host, estimate approximately 20 MB for the system catalogs and metadata.
-   **Write Ahead Log** — For each WarehousePG segment \(primary or mirror\) or coordinator instance running on a host, allocate space for the write ahead log \(WAL\). The WAL is divided into segment files of 64 MB each. At most, the maximum number of WAL files will be:

    ```
    max_wal_size / 64MB
    ```

    You can use this to estimate space requirements for WAL. The default checkpoint\_segments setting for a WarehousePG instance is 8, meaning 1088 MB WAL space allocated for each segment or coordinator instance on a host.

-   **WarehousePG Log Files** — Each segment instance and the coordinator instance generates database log files, which will grow over time. Sufficient space should be allocated for these log files, and some type of log rotation facility should be used to ensure that to log files do not grow too large.

**Parent topic:** [Estimating Storage Capacity](capacity_planning.html)

