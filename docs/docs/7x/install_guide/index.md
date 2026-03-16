# Installing and Upgrading WarehousePG
---

Information about installing, configuring, and upgrading WarehousePG software and configuring WarehousePG host machines.

-   **[Platform Requirements](platform-requirements.html)**  
This topic describes the WarehousePG 7 platform and operating system software requirements.
-   **[Estimating Storage Capacity](capacity_planning.html)**  
To estimate how much data your WarehousePG cluster can accommodate, use these measurements as guidelines. Also keep in mind that you may want to have extra space for landing backup files and data load files on each segment host.
-   **[Configure Operating System](config_os.html)**  
Describes how to prepare your operating system environment for WarehousePG software installation.
-   **[Installing WarehousePG](install_whpg.html)**  
Describes how to install the WarehousePG software binaries on all of the hosts that will comprise your WarehousePG cluster, how to enable passwordless SSH for the `gpadmin` user, and how to verify the installation.
-   **[Creating the Data Storage Areas](create_data_dirs.html)**  
Describes how to create the directory locations where WarehousePG data is stored for each coordinator, standby, and segment instance.
-   **[Validating the WHPG Cluster](validate.html)**  
Validate your hardware and network performance.
-   **[Initializing WarehousePG](init_whpg.html)**  
Describes how to initialize a WarehousePG database system.
-   **[Installing Optional Extensions](data_sci_pkgs.html)**  
Information about installing optional WarehousePG extensions and packages, such as the Procedural Language extensions and the Python and R Data Science Packages.
-   **[Installing Extensions](install_extensions.html)**  
The WarehousePG distribution includes several PostgreSQL- and WarehousePG-sourced `contrib` modules that you have the option to install.
-   **[Configuring Timezone and Localization Settings](localization.html)**  
Describes the available timezone and localization features of WarehousePG.
-   **[Upgrading from whpg 6 to whpg 7](upgrading_6_to_7.html)**  
Explains how to upgrade from WarehousePG 6 to WarehousePG 7. 
-   **[Enabling iptables \(Optional\)](enable_iptables.html)**  
On Linux systems, you can configure and enable the `iptables` firewall to work with WarehousePG.
-   **[Installation Utilities Reference](installation_utilities.html)**  
References for the command-line management utilities used to install and initialize a WarehousePG cluster.
-   **[WarehousePG Environment Variables](env_var.html)**  
Reference of the environment variables to set for WarehousePG.

