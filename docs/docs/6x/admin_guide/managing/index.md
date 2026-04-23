---
title: Managing WarehousePG
navigation:
  - versioning
  - startstop
  - access_db
  - configuring-the-warehousepg-system
  - compression
  - proxy-ic
  - ha
  - backup-main
  - expand
  - monitor
  - progress_reporting
  - maintain
  - monitoring

---

This section describes basic system administration tasks performed by a WarehousePG cluster administrator.

-   **[About the WarehousePG Release Version Number](versioning.md)**  
    WarehousePG version numbers and the way they change identify what has been modified from one WarehousePG release to the next.
-   **[Starting and Stopping WarehousePG](startstop.md)**  
    In a WarehousePG DBMS, the database server instances (the coordinator and all segments) are started or stopped across all of the hosts in the system in such a way that they can work together as a unified DBMS.
-   **[Accessing the Database](access_db/index.md)**  
    This topic describes the various client tools you can use to connect to WarehousePG, and how to establish a database session.
-   **[Configuring the WarehousePG cluster](configuring-the-warehousepg-system/index.md)**  
    Server configuration parameters affect the behavior of WarehousePG.
-   **[Enabling Compression](compression.md)**  
    You can configure WarehousePG to use data compression with some database features and with some utilities.
-   **[Configuring Proxies for the WarehousePG Interconnect](proxy-ic.md)**  
    You can configure a WarehousePG cluster to use proxies for interconnect communication to reduce the use of connections and ports during query processing.
-   **[Enabling High Availability and Data Consistency Features](ha/index.md)**  
    The fault tolerance and the high-availability features of WarehousePG can be configured.
-   **[Backing Up and Restoring Databases](backup-main.md)**  
    This topic describes how to use WarehousePG backup and restore features.
-   **[Expanding a WarehousePG cluster](expand/index.md)**  
    To scale up performance and storage capacity, expand your WarehousePG database system by adding hosts to the system. In general, adding nodes to a WarehousePG cluster achieves a linear scaling of performance and storage capacity.
-   **[Monitoring a WarehousePG cluster](monitor.md)**  
    You can monitor a WarehousePG cluster using a variety of tools included with the system or available as add-ons.
-   **[Routine System Maintenance Tasks](maintain.md)**  
    To keep a WarehousePG cluster running efficiently, the database must be regularly cleared of expired data and the table statistics must be updated so that the query optimizer has accurate information.
-   **[Recommended Monitoring and Maintenance Tasks](monitoring.md)**  
    This section lists monitoring and maintenance activities recommended to ensure high availability and consistent performance of your WarehousePG cluster.

**Parent topic:** [WarehousePG Administrator Guide](../index.md)
