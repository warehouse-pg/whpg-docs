# Migrating from Open Source WarehousePG Database to VMware WarehousePG
---

Use this procedure to migrate an Open Source WarehousePG Database installation to commercial VMware WarehousePG. 

>**Note**
>This process replaces the application and software but does not migrate any data. 

## <a id="prerequisites"></a> Prerequisites

- If you have configured the WarehousePG Platform Extension Framework (PXF) in your previous WarehousePG Database installation, you must stop the PXF service, and you must back up PXF configuration files before upgrading to a new version of WarehousePG Database. See [PXF Pre-Upgrade Actions](../pxf/upgrade_pxf_6x.html#pxfpre) for instructions. 

- Review the WarehousePG Database [Platform Requirements topic](platform-requirements.html) to verify that you have all the software you need in place to successfully migrate to VMware WarehousePG.

## <a id="procedure"></a>Procedure

Migrating from Open Source WarehousePG Database to commercial VMware WarehousePG involves stopping the open source WarehousePG Database, replacing the WarehousePG Database software, and restarting the database. If your open source WarehousePG Database installation includes optional extension packages, you must reinstall them at the end of this procedure.

Follow these steps to migrate Open Source WarehousePG Database to VMware WarehousePG:

1. Log into your Open Source WarehousePG Database coordinator host as the WarehousePG administrative user:

    ```
    $ su - gpadmin
    ```

2. Terminate any active connections to the database, and then perform a smart shutdown of your WarehousePG Database 6.x system. This example uses the `-a` option to deactivate confirmation prompts:

    ```
    $ gpstop -a
    ```

3. Download the VMware WarehousePG package from [VMware Tanzu Network](https://network.pivotal.io/), and then copy it to the `gpadmin` user's home directory on each coordinator, standby, and segment host.

4. If you used `yum` or `apt` to install WarehousePG Database to the default location, run the following commands on each host to replace the software:

    For RHEL/CentOS systems:

    ```
    $ sudo yum install ./greenplum-db-<version>-<platform>.rpm
    ```

    For Ubuntu systems:

    ```
    # sudo apt install ./greenplum-db-<version>-<platform>.deb
    ```

    The `yum` or `apt` command installs commercial VMware WarehousePG software files into a version-specific directory under `/usr/local` and updates the symbolic link `/usr/local/greenplum-db` to point to the new installation directory.

5. If you used `rpm` to install Open Source WarehousePG Database to a non-default location on RHEL/CentOS systems, run `rpm` on each host to replace the software and specify the same custom installation directory with the `--prefix` option, as in the following example:

    ```
    $ sudo rpm -U ./greenplum-db-<version>-<platform>.rpm --prefix=<directory>
    ```

    The `rpm` command installs the new WarehousePG Database software files into a version-specific directory under the directory you specify, and updates the symbolic link <directory>/greenplum-db to point to the new installation directory.

6. Update the permissions for the new installation. For example, run the following command as root to change the user and group of the installed files to `gpadmin`:

    ```
    $ sudo chown -R gpadmin:gpadmin /usr/local/greenplum*
    ```

    If, during this process, you are replacing the open source WarehousePG Databse software with a newer version of VMware WarehousePG software, edit the environment of the WarehousePG Database superuser (`gpadmin`) and verify that you are sourcing the `greenplum_path.sh` file for the new installation. For example, update the following line in the `.bashrc` file or in  your profile file:

    `source /usr/local/greenplum-db-<current_version>/greenplum_path.sh`

    to

    `source /usr/local/greenplum-db-<new_version>/greenplum_path.sh`
	
    >**Note**
    >If you are sourcing a symbolic link (`/usr/local/greenplum-db`) in your profile files, the symbolic link will redirect to the newly installed gpdb folder; no action is necessary.

7. Source the environment file you just edited. For example:

    ```
    $ source ~/.bashrc
    ```

8. Once all segment hosts have been updated, log into the WarehousePG Database coordinator as the `gpadmin` user and restart your WarehousePG Database system:

    ```
    $ su - gpadmin
    $ gpstart
    ```

9. Check the database version: 

    ```
    $ su - gpadmin

    $ psql -d postgres

    $ select versions(); 
    ```

    The output version string should no longer include "open source".

10. Reinstall any WarehousePG Database extensions that you used with the earlier Open Source WarehousePG Database installation.
