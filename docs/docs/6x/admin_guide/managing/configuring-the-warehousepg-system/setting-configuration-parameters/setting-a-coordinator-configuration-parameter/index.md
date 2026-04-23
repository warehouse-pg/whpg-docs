---
title: Setting a Coordinator Configuration Parameter
navigation:
  - setting-parameters-at-the-system-level
  - setting-parameters-at-the-database-level
  - setting-parameters-at-the-role-level
  - setting-parameters-in-a-session

---

To set a coordinator configuration parameter, set it at the WarehousePG coordinator instance. If it is also a *session* parameter, you can set the parameter for a particular database, role or session. If a parameter is set at multiple levels, the most granular level takes precedence. For example, session overrides role, role overrides database, and database overrides system.

-   **[Setting Parameters at the System Level](setting-parameters-at-the-system-level.md)**  

-   **[Setting Parameters at the Database Level](setting-parameters-at-the-database-level.md)**  

-   **[Setting Parameters at the Role Level](setting-parameters-at-the-role-level.md)**  

-   **[Setting Parameters in a Session](setting-parameters-in-a-session.md)**  

**Parent topic:** [Setting Configuration Parameters](../index.md)
