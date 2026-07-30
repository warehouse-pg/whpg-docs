---
title: Enabling High Availability and Data Consistency Features
navigation:
  - overview-of-high-availability-in-warehousepg
  - enabling-mirroring-in-warehousepg
  - detecting-a-failed-segment
  - understanding-segment-recovery
  - recovering-from-segment-failures
  - recovering-a-failed-coordinator
redirects:
  - enabling-high-availability-features

---

The fault tolerance and the high-availability features of WarehousePG can be configured.

> **Important** When data loss is not acceptable for a WarehousePG cluster, WarehousePG coordinator and segment mirroring is recommended. If mirroring is not enabled then WarehousePG stores only one copy of the data, so the underlying storage media provides the only guarantee for data availability and correctness in the event of a hardware failure.

For information about the utilities that are used to enable high availability, see the *WarehousePG Utility Guide*.

-   **[Overview of WarehousePG High Availability](overview-of-high-availability-in-warehousepg.md)**  

-   **[Enabling Mirroring in WarehousePG](enabling-mirroring-in-warehousepg/index.md)**  

-   **[How WarehousePG Detects a Failed Segment](detecting-a-failed-segment.md)**  

-   **[Understanding Segment Recovery](understanding-segment-recovery.md)**  

-   **[Recovering from Segment Failures](recovering-from-segment-failures.md)**  

-   **[Recovering a Failed Coordinator](recovering-a-failed-coordinator.md)**  

**Parent topic:** [Managing a WarehousePG cluster](../index.md)
