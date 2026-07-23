---
title: Installing and Upgrading WarehousePG
navTitle: Install guide
navigation:
  - platform-requirements
  - capacity_planning
  - config_os
  - install_whpg
  - create_data_dirs
  - validate
  - init_whpg
  - additional_modules
  - data_sci_pkgs
  - localization
  - enable_iptables
  - installation_utilities
  - env_var
redirects:
  - install_guide
  - install_extensions
  - install_modules

---

Information about installing, configuring, and upgrading WarehousePG software and configuring WarehousePG host machines.

-   **[Platform Requirements](platform-requirements.md)**  
    This topic describes the WarehousePG 6 platform and operating system software requirements.
-   **[Estimating Storage Capacity](capacity_planning.md)**  
    To estimate how much data your WarehousePG cluster can accommodate, use these measurements as guidelines. Also keep in mind that you may want to have extra space for landing backup files and data load files on each segment host.
-   **[Configure Operating System](config_os.md)**  
    Describes how to prepare your operating system environment for WarehousePG software installation.
-   **[Installing the WarehousePG Software](install_whpg.md)**  
    Describes how to install the WarehousePG software binaries on all of the hosts that will comprise your WarehousePG cluster, how to enable passwordless SSH for the `gpadmin` user, and how to verify the installation.
-   **[Creating the Data Storage Areas](create_data_dirs.md)**  
    Describes how to create the directory locations where WarehousePG data is stored for each coordinator, standby, and segment instance.
-   **[Validating Your Systems](validate.md)**  
    Validate your hardware and network performance.
-   **[Initializing WarehousePG](init_whpg.md)**  
    Describes how to initialize a WarehousePG database system.
-   **[Installing Additional Modules](additional_modules/index.md)**  
    Installation guides for extensions, procedural languages, and external components that require a separate package install, as well as instructions for enabling bundled modules.
-   **[Configuring Timezone and Localization Settings](localization.md)**  
    Describes the available timezone and localization features of WarehousePG.
-   **[Performing a minor upgrade](minor_upgrade.md)**  
    Explains how to upgrade to a newer version of WarehousePG 6.x.
-   **[Upgrading to WarehousePG 6](upgrading.md)**  
    This topic identifies the upgrade paths for upgrading a WarehousePG 6.x release to a newer 6.x release. 
-   **[Migrating WarehousePG from Enterprise Linux 7 to 8 or 9](migrate-linux.md)**
    This topic describes how to migrate a WarehousePG installation from Enterprise Linux (EL) version 7 to Enterprise Linux 8 or Enterprise Linux 9, while maintaining your existing version of WarehousePG.
-   **[Enabling iptables (Optional)](enable_iptables.md)**  
    On Linux systems, you can configure and enable the `iptables` firewall to work with WarehousePG.
-   **[Installation Management Utilities](installation_utilities.md)**  
    References for the command-line management utilities used to install and initialize a WarehousePG cluster.
-   **[WarehousePG Environment Variables](env_var_ref.md)**  
    Reference of the environment variables to set for WarehousePG.
-   **[Example Ansible Playbook](ansible-example.md)**  
    A sample Ansible playbook to install a WarehousePG software release onto the hosts that will comprise a WarehousePG cluster.
