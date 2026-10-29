---
title: Installing and upgrading PXF for WarehousePG
navTitle: Installing and upgrading
description: Learn how to install and upgrade the WarehousePG Platform Extension Framework (PXF) package across your WarehousePG cluster.
---

Build `whpg-pxf` from source, then distribute the build to every host in your WarehousePG (WHPG) cluster, including the coordinator, standby coordinator, and all segment hosts. To move to a newer PXF version later, see [Upgrading PXF](#upgrading-pxf).

## Prerequisites

- **Build host:** GCC, `make`, `unzip`, `git`, a cURL development package (`libcurl-devel` on RHEL; use a version from source instead if you're on an older OS whose package only provides cURL 7.19), [Go](https://go.dev/doc/install) 1.21.3 or later, and JDK 8 or 11. Building directly on the WarehousePG coordinator avoids a cross-compile step, since it's already running the same OS as your segment hosts.
- **Every host in the cluster:** JDK 8 or 11 to run. The PXF service is a Java process that runs on every host, not only the one you build on.
- WarehousePG installed on every host in the cluster, running on RHEL 7, 8, or 9.

## Building from source

Build PXF on the coordinator, from the `release-6.x` branch. This branch is the PXF 6.x line, which supports WHPG 6 and 7.

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

    This command compiles the PXF service, the `pxf` and `pxf cluster` CLI, and the WHPG extension.

## Installing on the cluster

1. Set `GPHOME`, `PXF_HOME`, and `PXF_BASE`, then install the build locally on the coordinator:

    ```bash
    export GPHOME=/usr/local/greenplum-db
    export PXF_HOME=/usr/local/pxf
    export PXF_BASE=$HOME/pxf-base
    sudo mkdir -p "$PXF_HOME"
    sudo chown -R gpadmin:gpadmin "$GPHOME/" "$PXF_HOME"
    make install
    ```

    ::: info Note
    The trailing slash after `$GPHOME` matters. If `$GPHOME` is a symbolic link, `chown` without the slash changes only the link, so `make install` fails with `Permission denied`.
    :::

    `make install` runs PXF's unit tests, then places the PXF service and CLI under `$PXF_HOME`, and copies the WHPG extension's control, SQL, and shared library files under `$GPHOME` on the coordinator. If you don't set `PXF_BASE`, it defaults to `PXF_HOME`, and a later PXF upgrade can delete your server configurations along with it, so always set it to a separate directory.

1. Create a file `all_hosts` listing the coordinator, standby coordinator, and all segment hosts:

    ```ini
    cdw
    scdw
    sdw1
    sdw2
    sdw3
    ```

    On WHPG 6, also create a file `other_hosts` listing every host except the one you build on:

    ```ini
    scdw
    sdw1
    sdw2
    sdw3
    ```

1. Create `$PXF_HOME` on every host, owned by `gpadmin`, then copy the built directory to the hosts you didn't build on. The directory must exist before the copy, because `gpadmin` can't create it under `/usr/local`.

    On WHPG 7:

    ```bash
    gpssh -f all_hosts -e "sudo mkdir -p $PXF_HOME && sudo chown -R gpadmin:gpadmin $PXF_HOME"
    gpsync -a -f all_hosts $PXF_HOME/ =:$PXF_HOME
    ```

    On WHPG 6:

    ```bash
    gpssh -f other_hosts -e "sudo mkdir -p $PXF_HOME && sudo chown -R gpadmin:gpadmin $PXF_HOME"
    gpscp -r -f other_hosts $PXF_HOME =:$(dirname $PXF_HOME)
    ```

    ::: info Note
    The trailing slash after `$PXF_HOME` in the `gpsync` command matters. Without it, the files land in `$PXF_HOME/pxf` instead of `$PXF_HOME`.
    :::

1. Copy the WHPG extension files from the coordinator to the same location under `$GPHOME` on every host you didn't build on, since `make install` installs them on the coordinator only. Make `$GPHOME` writable by `gpadmin` on each host first.

    On WHPG 7:

    ```bash
    gpssh -f all_hosts -e "sudo chown -R gpadmin:gpadmin $GPHOME/"
    gpsync -a -f all_hosts $GPHOME/lib/postgresql/pxf.so =:$GPHOME/lib/postgresql/
    gpsync -a -f all_hosts $GPHOME/share/postgresql/extension/pxf.control $GPHOME/share/postgresql/extension/pxf--*.sql =:$GPHOME/share/postgresql/extension/
    ```

    On WHPG 6:

    ```bash
    gpssh -f other_hosts -e "sudo chown -R gpadmin:gpadmin $GPHOME/"
    gpscp -f other_hosts $GPHOME/lib/postgresql/pxf.so =:$GPHOME/lib/postgresql/
    gpscp -f other_hosts $GPHOME/share/postgresql/extension/pxf.control $GPHOME/share/postgresql/extension/pxf--*.sql =:$GPHOME/share/postgresql/extension/
    ```

    ::: info Note
    `pxf cluster register` doesn't copy these files for a build from source.
    :::

## Upgrading PXF

Upgrade PXF by building the new version and installing it over the existing one on every host. Because `$PXF_BASE` is separate from `$PXF_HOME`, your configuration and server definitions stay in place.

1. On the coordinator, record your current PXF version:

    ```bash
    pxf version
    ```

1. Stop PXF on every host:

    ```bash
    pxf cluster stop
    ```

1. Back up `$PXF_BASE` on every host, so you can restore your configuration if needed. Each host holds its own copy of files that `pxf cluster sync` doesn't distribute, such as the keytabs:

    ```bash
    gpssh -f all_hosts -e "cp -a $PXF_BASE $PXF_BASE.bak.$(date +%Y%m%d)"
    ```

    To restore, replace `$PXF_BASE` with the `$PXF_BASE.bak.<date>` backup on each host.

1. Build the new version and install it on the cluster, following [Building from source](#building-from-source) and [Installing on the cluster](#installing-on-the-cluster). Use the same `$PXF_HOME` and `$PXF_BASE` locations as your current installation.
1. Sync the PXF configuration to every host:

    ```bash
    pxf cluster sync
    ```

    This command doesn't distribute `$PXF_BASE/keytabs`. If you use Kerberos, confirm the keytab files are still in place on every host.

1. Start PXF on every host:

    ```bash
    pxf cluster start
    pxf cluster status
    ```

1. Confirm that every host runs the new version. `pxf version` reports only the version of the `pxf` command on the host where you run it, so query the running service on each host instead:

    ```bash
    gpssh -f all_hosts -e "curl -s http://localhost:5888/actuator/info"
    ```

1. In each database that uses PXF, update the extension:

    ```sql
    ALTER EXTENSION pxf UPDATE;
    ```

## Next steps

See [Configuring and starting PXF](configuring.md) to set up and start the PXF service across your cluster. See [PXF release notes](release_notes/index.md) for the changes in each PXF version.
