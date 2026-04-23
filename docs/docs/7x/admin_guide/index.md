---
title: WarehousePG administrator guide
navTitle: Administrator guide
navigation:
  - intro
  - managing
  - manage_access
  - distribution
  - ddl
  - dml
  - query
  - analytics
  - external
  - load
  - performance
  - parallel_retrieve_cursor
  - backup_restore
redirects:
  - managing_data

---

Information about configuring, managing and monitoring WarehousePG installations, and administering, monitoring, and working with databases. The guide also contains information about WarehousePG architecture and concepts such as parallel processing.

-   **[WarehousePG Concepts](intro/index.md)**  
    This section provides an overview of WarehousePG components and features such as high availability, parallel data loading features, and management utilities.
-   **[Managing a WarehousePG cluster](managing/index.md)**  
    This section describes basic system administration tasks performed by a WarehousePG cluster administrator.
-   **[Managing WarehousePG Access](manage_access/index.md)**  
    Securing WarehousePG includes protecting access to the database through network configuration, database user authentication, and encryption.
-   **[Data Distribution and Skew](performance/distribution.md)**  
    WarehousePG relies on even distribution of data across segments.
-   **[DDL: Defining Database Objects](ddl/index.md)**  
    This section covers data definition language (DDL) in WarehousePG and how to create and manage database objects.
-   **[DML: Inserting, Updating and Deleting](dml.md)**  
    This section provides information about manipulating data and concurrent access in WarehousePG.
-   **[Querying Data](query/index.md)**  
    This topic provides information about using SQL in WarehousePGs.
-   **[Analytics guide](analytics/index.md)**
    Advanced data analytics
-   **[External Data Sources](external/index.md)**  
    Both external and foreign tables provide access to data stored in data sources outside of WarehousePG as if the data were stored in regular database tables. You can read data from and write data to external and foreign tables.
-   **[Loading and Unloading Data](load/index.md)**  
    The topics in this section describe methods for loading and writing data into and out of a WarehousePG, and how to format data files.
-   **[Managing Performance](performance/index.md)**  
    The topics in this section cover WarehousePG performance management, including how to monitor performance and how to configure workloads to prioritize resource utilization.
-   **[Retrieving Query Results with a Parallel Retrieve Cursor](parallel_retrieve_cursor.md)**
    A *parallel retrieve cursor* is an enhanced cursor implementation that you can use to create a special kind of cursor on the WarehousePG coordinator node, and retrieve query results, on demand and in parallel, directly from the WarehousePG segments.
