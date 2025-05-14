# Securing the Database 

Introduces WarehousePG security topics.

The intent of security configuration is to configure the WarehousePG server to eliminate as many security vulnerabilities as possible. This guide provides a baseline for minimum security requirements, and is supplemented by additional security documentation. 

The essential security requirements fall into the following categories:

-   [Authentication](authentication.html) covers the mechanisms that are supported and that can be used by the WarehousePG server to establish the identity of a client application.
-   [Authorization](authorization.html) pertains to the privilege and permission models used by the database to authorize client access.
-   [Auditing](auditing.html), or log settings, covers the logging options available in WarehousePG to track successful or failed user actions.
-   [Data Encryption](encryption.html) addresses the encryption capabilities that are available for protecting data at rest and data in transit. This includes the security certifications that are relevant to the WarehousePG.

## <a id="accesskerb"></a>Accessing a Kerberized Hadoop Cluster 

You can use the WarehousePG Platform Extension Framework \(PXF\) to read or write external tables referencing files in a Hadoop file system. If the Hadoop cluster is secured with Kerberos \("Kerberized"\), you must configure WarehousePG and PXF to allow users accessing external tables to authenticate with Kerberos. Refer to Configuring PXF for Secure HDFS for the procedure to perform this setup.

## <a id="platformhardening"></a>Platform Hardening 

Platform hardening involves assessing and minimizing system vulnerability by following best practices and enforcing federal security standards. Hardening the product is based on the US Department of Defense \(DoD\) guidelines Security Template Implementation Guides \(STIG\). Hardening removes unnecessary packages, deactivates services that are not required, sets up restrictive file and directory permissions, removes unowned files and directories, performs authentication for single-user mode, and provides options for end users to configure the package to be compliant to the latest STIGs. 

**Parent topic:** [WarehousePG Security Configuration Guide](../security_guide/)

