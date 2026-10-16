---
title: Installing and upgrading PXF for WarehousePG
navTitle: Installing and upgrading
description: Learn how to install and upgrade the WarehousePG Platform Extension Framework (PXF) package across your WarehousePG cluster.
---

Build `whpg-pxf` from source, then distribute the build to every host in your WarehousePG (WHPG) cluster, including the coordinator, standby coordinator, and all segment hosts. To move to a newer PXF version later, see [Upgrading PXF](#upgrading-pxf).

## Prerequisites

- **Build host:** GCC, `make`, `unzip`, a cURL development package (`libcurl-devel` on RHEL; use a version from source instead if you're on an older OS whose package only provides cURL 7.19), [Go](https://go.dev/doc/install) 1.9 or later, and JDK 8 or 11. Building directly on the WarehousePG coordinator avoids a cross-compile step, since it's already running the same OS as your segment hosts.
- **Every host in the cluster:** JDK 8 or 11 to run. The PXF service is a Java process that runs on every host, not only the one you build on.
- WarehousePG installed on every host in the cluster, running on RHEL 7, 8, or 9.

## Building from source

Build PXF on the coordinator, from the `release-6.x` branch, which matches WHPG 6.x.

1. Clone the repository and check out the `release-6.x` branch:

    ```bash
    git clone https://github.com/warehouse-pg/whpg-pxf.git
    cd whpg-pxf
    git checkout release-6.x
    ```

1. Set `JAVA_HOME`, and source your WarehousePG environment so the build can find it:

    ```bash
    export JAVA_HOME=<path-to-your-jdk>
    source /usr/local/greenplum-db/greenplum_path.sh
    ```

1. Build PXF:

    ```bash
    make
    ```

    This command compiles the PXF service, the `pxf` and `pxf cluster` CLI, and the WHPG extension, and runs PXF's unit tests.

## Installing on the cluster

1. Set `GPHOME`, `PXF_HOME`, and `PXF_BASE`, then install the build locally on the coordinator:

    ```bash
    export GPHOME=/usr/local/greenplum-db
    export PXF_HOME=/usr/local/pxf
    export PXF_BASE=$HOME/pxf-base
    sudo mkdir -p "$PXF_HOME"
    sudo chown -R gpadmin:gpadmin "$GPHOME" "$PXF_HOME"
    make install
    ```

    `make install` places the PXF service and CLI under `$PXF_HOME`, and copies the WHPG extension's control, SQL, and shared library files under `$GPHOME` on the coordinator. If you don't set `PXF_BASE`, it defaults to `PXF_HOME`, and a later PXF upgrade can delete your server configurations along with it, so always set it to a separate directory.

1. Create a file `all_hosts` listing the coordinator, standby coordinator, and all segment hosts:

    ```ini
    cdw
    scdw
    sdw1
    sdw2
    sdw3
    ```

1. Copy the built `$PXF_HOME` directory to every other host in the cluster:

    ```bash
    gpsync -f all_hosts $PXF_HOME =:$PXF_HOME
    ```

1. Set ownership of `$PXF_HOME` on every host, so `gpadmin` can run PXF:

    ```bash
    gpssh -f all_hosts -u gpadmin -e "sudo chown -R gpadmin:gpadmin $PXF_HOME"
    ```

1. Install the WHPG extension files under `$GPHOME` on every host, since `make install` only did this on the coordinator:

    ```bash
    pxf cluster register
    ```

## Upgrading PXF

Upgrade PXF by building the new version from source and installing it over the existing one on every host. Because `$PXF_BASE` is separate from `$PXF_HOME`, your configuration and server definitions stay in place.

1. On the coordinator, record your current PXF version:

    ```bash
    pxf version
    ```

1. Stop PXF on every host:

    ```bash
    pxf cluster stop
    ```

1. Back up `$PXF_BASE` on the coordinator, so you can restore your configuration if needed:

    ```bash
    cp -r $PXF_BASE $PXF_BASE.bak
    ```

1. Build the new version and install it on the cluster, following [Building from source](#building-from-source) and [Installing on the cluster](#installing-on-the-cluster). Use the same `$PXF_HOME` and `$PXF_BASE` locations as your current installation.

1. Sync the PXF configuration to every host:

    ```bash
    pxf cluster sync
    ```

    This command doesn't distribute `$PXF_BASE/keytabs`. If you use Kerberos, confirm the keytab files are still in place on every host.

1. Start PXF on every host, and confirm the new version is running:

    ```bash
    pxf cluster start
    pxf cluster status
    pxf version
    ```

1. In each database that uses PXF, update the extension:

    ```sql
    ALTER EXTENSION pxf UPDATE;
    ```

### Registering PXF after a WarehousePG upgrade

After you upgrade WHPG, copy the PXF extension files into the new WHPG installation by registering PXF again. Run these commands from the coordinator:

```bash
pxf cluster register
pxf cluster restart
```

## Next steps

See [Configuring and starting PXF](configuring.md) to set up and start the PXF service across your cluster. See [PXF release notes](release_notes/index.md) for the changes in each PXF version.
