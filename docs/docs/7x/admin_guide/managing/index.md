# Managing a WarehousePG Cluster
---

This section describes basic system administration tasks performed by a WarehousePG cluster administrator.

-   **[About the WarehousePG Release Version Number](../managing/versioning.html)**  
WarehousePG version numbers and the way they change identify what has been modified from one WarehousePG release to the next.
-   **[Starting and Stopping WarehousePG](../managing/startstop.html)**  
In a WarehousePG DBMS, the database server instances \(the coordinator and all segments\) are started or stopped across all of the hosts in the system in such a way that they can work together as a unified DBMS.
-   **[Accessing the Database](../access_db/accessing-the-database.html)**  
This topic describes the various client tools you can use to connect to WarehousePG, and how to establish a database session.
-   **[Configuring the WarehousePG cluster](../topics/g-configuring-the-warehousepg-system.html)**  
Server configuration parameters affect the behavior of WarehousePG.
-   **[Enabling Compression](../managing/compression.html)**  
You can configure WarehousePG to use data compression with some database features and with some utilities.
-   **[Configuring Proxies for the WarehousePG Interconnect](../managing/proxy-ic.html)**  
You can configure a WarehousePG cluster to use proxies for interconnect communication to reduce the use of connections and ports during query processing.
-   **[Enabling High Availability and Data Consistency Features](../ha/enabling-high-availability-features.html)**  
The fault tolerance and the high-availability features of WarehousePG can be configured.
-   **[Backing Up and Restoring Databases](../managing/backup-main.html)**  
This topic describes how to use WarehousePG backup and restore features.
-   **[Expanding a WarehousePG cluster](../expand/expand-main.html)**  
To scale up performance and storage capacity, expand your WarehousePG cluster by adding hosts to the system. In general, adding nodes to a WarehousePG cluster achieves a linear scaling of performance and storage capacity.
-   **[Monitoring a WarehousePG cluster](../managing/monitor.html)**  
You can monitor a WarehousePG cluster using a variety of tools included with the system or available as add-ons.
-   **[Monitoring Long-Running Operations](../managing/progress_reporting.html)**  
You can monitor, at run time, the progress of certain SQL and utility commands.
-   **[Routine System Maintenance Tasks](../managing/maintain.html)**  
To keep a WarehousePG cluster running efficiently, the database must be regularly cleared of expired data and the table statistics must be updated so that the query optimizer has accurate information.
-   **[Recommended Monitoring and Maintenance Tasks](../monitoring/monitoring.html)**  
This section lists monitoring and maintenance activities recommended to ensure high availability and consistent performance of your WarehousePG cluster.

**Parent topic:** [WarehousePG Administrator Guide](../admin_guide)

