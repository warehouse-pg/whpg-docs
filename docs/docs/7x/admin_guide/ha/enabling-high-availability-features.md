# Enabling High Availability and Data Consistency Features
---

The fault tolerance and the high-availability features of WarehousePG can be configured.

> **Important** When data loss is not acceptable for a WarehousePG cluster, WarehousePG coordinator and segment mirroring is recommended. If mirroring is not enabled then WarehousePG stores only one copy of the data, so the underlying storage media provides the only guarantee for data availability and correctness in the event of a hardware failure.



For information about the utilities that are used to enable high availability, see the *WarehousePG Utility Guide*.

-   **[Overview of WarehousePG High Availability](overview-of-high-availability-in-warehousepg.html)**  

-   **[Enabling Mirroring in WarehousePG](enabling-mirroring-in-warehousepg.html)**  

-   **[How WarehousePG Detects a Failed Segment](detecting-a-failed-segment.html)**  

-   **[Understanding Segment Recovery](understanding-segment-recovery.html)**  

-   **[Recovering from Segment Failures](recovering-from-segment-failures.html)**  

-   **[Recovering a Failed Coordinator](recovering-a-failed-coordinator.html)**  


**Parent topic:** [Managing a WarehousePG cluster](../managing/managing.html)

