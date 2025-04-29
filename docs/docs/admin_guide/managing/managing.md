# Managing a WarehousePG Cluster
---

This section describes basic system administration tasks performed by a WarehousePG Database system administrator.

-   **[About the WarehousePG Database Release Version Number](../managing/versioning.html)**  
WarehousePG Database version numbers and the way they change identify what has been modified from one WarehousePG Database release to the next.
-   **[Starting and Stopping WarehousePG Database](../managing/startstop.html)**  
In a WarehousePG Database DBMS, the database server instances \(the coordinator and all segments\) are started or stopped across all of the hosts in the system in such a way that they can work together as a unified DBMS.
-   **[Accessing the Database](../access_db/topics/g-accessing-the-database.html)**  
This topic describes the various client tools you can use to connect to WarehousePG Database, and how to establish a database session.
-   **[Configuring the WarehousePG Database System](../topics/g-configuring-the-greenplum-system.html)**  
Server configuration parameters affect the behavior of WarehousePG Database.
-   **[Enabling Compression](../managing/compression.html)**  
You can configure WarehousePG Database to use data compression with some database features and with some utilities.
-   **[Configuring Proxies for the WarehousePG Interconnect](../managing/proxy-ic.html)**  
You can configure a WarehousePG system to use proxies for interconnect communication to reduce the use of connections and ports during query processing.
-   **[Enabling High Availability and Data Consistency Features](../highavail/topics/g-enabling-high-availability-features.html)**  
The fault tolerance and the high-availability features of WarehousePG Database can be configured.
-   **[Backing Up and Restoring Databases](../managing/backup-main.html)**  
This topic describes how to use WarehousePG backup and restore features.
-   **[Expanding a WarehousePG System](../expand/expand-main.html)**  
To scale up performance and storage capacity, expand your WarehousePG Database system by adding hosts to the system. In general, adding nodes to a WarehousePG cluster achieves a linear scaling of performance and storage capacity.
-   **[Monitoring a WarehousePG System](../managing/monitor.html)**  
You can monitor a WarehousePG Database system using a variety of tools included with the system or available as add-ons.
-   **[Monitoring Long-Running Operations](../managing/progress_reporting.html)**  
You can monitor, at run time, the progress of certain SQL and utility commands.
-   **[Routine System Maintenance Tasks](../managing/maintain.html)**  
To keep a WarehousePG Database system running efficiently, the database must be regularly cleared of expired data and the table statistics must be updated so that the query optimizer has accurate information.
-   **[Recommended Monitoring and Maintenance Tasks](../monitoring/monitoring.html)**  
This section lists monitoring and maintenance activities recommended to ensure high availability and consistent performance of your WarehousePG Database cluster.

**Parent topic:** [WarehousePG Database Administrator Guide](../admin_guide)

