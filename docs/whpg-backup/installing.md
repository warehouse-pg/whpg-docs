---
title: Installing WarehousePG Backup and Restore
navTitle: Installing
description: Learn how to install the gpbackup and gprestore utilities on your WarehousePG cluster.

---

`whpg-backup` provides the `gpbackup` and `gprestore` utilities. Build them from source, then install the binaries on every host in your WarehousePG cluster.

## Prerequisites

- **Build host:** [Go](https://go.dev/doc/install) 1.23 or later, plus `sqlite3`. Building directly on the WarehousePG coordinator avoids a cross-compile step, since it's already running the same OS as your segment hosts. If you build on a macOS workstation instead, use `make build_linux` to cross-compile for the cluster.
- **Every host in the cluster:** `sqlite3`. `gpbackup` splits work between the coordinator and every segment host, so the `sqlite3` runtime dependency needs to be present wherever `gpbackup`, `gprestore`, or `gpbackup_helper` runs, not just on the build host.

## Building from source

1. Clone the repository and change into it:

    ```bash
    git clone https://github.com/warehouse-pg/whpg-backup.git
    cd whpg-backup
    ```

1. Build the `gpbackup`, `gprestore`, and `gpbackup_helper` binaries:

    ```bash
    make depend
    make build
    ```

    The binaries are placed in `$HOME/go/bin`. If you're cross-compiling from a macOS workstation, run `make build_linux` instead.

:::: tip
Add `$HOME/go/bin` to your `PATH` so you can run the binaries directly from the build host:

```bash
export PATH=$PATH:$HOME/go/bin
```
::::

## Installing on the cluster

1. Confirm `sqlite3` is installed on every host in the cluster, including the coordinator, standby coordinator, and all segment hosts. It's installed by default on many platforms, but install it if it's missing.

1. On the coordinator, create a file `all_hosts` which lists all hosts in the WHPG cluster. For example:

    ```ini
    cdw
    scdw
    sdw1
    sdw2
    sdw3
    ```

1. Transfer the binaries to all hosts in the cluster and place them on `$PATH`, for example in `$GPHOME/bin`. Use the `gpsync` utility on WarehousePG 7, or the `gpscp` utility on WarehousePG 6:

    ### WHPG 7

    ```bash
    gpsync -f all_hosts $HOME/go/bin/gpbackup $HOME/go/bin/gprestore $HOME/go/bin/gpbackup_helper =:$GPHOME/bin
    ```

    ### WHPG 6

    ```bash
    gpscp -f all_hosts $HOME/go/bin/gpbackup $HOME/go/bin/gprestore $HOME/go/bin/gpbackup_helper =:$GPHOME/bin
    ```

1. Verify the installation by checking the `gpbackup` and `gprestore` versions:

    ```bash
    gpbackup --version
    gprestore --version
    ```

## Upgrading

To upgrade to a new release, rebuild `gpbackup`, `gprestore`, and `gpbackup_helper` from the release tag you want, then redistribute them to every host the same way as a fresh install.

1. In your existing clone, fetch the latest tags and check out the release you want to upgrade to. Replace `<tag>` with the release tag, for example `1.34.0-WHPG`:

    ```bash
    git fetch --tags
    git checkout <tag>
    ```

1. Rebuild the binaries:

    ```bash
    make depend
    make build
    ```

1. Transfer the rebuilt binaries to every host in the cluster, overwriting the existing ones. Use the same `gpsync` or `gpscp` command as in [Installing on the cluster](#installing-on-the-cluster).

1. Verify the upgrade by checking the version on the coordinator:

    ```bash
    gpbackup --version
    gprestore --version
    ```

::: info Note
`gpbackup` and `gprestore` are command-line utilities, not a running service, so there's nothing to stop or restart. Avoid upgrading while a backup or restore is in progress.
:::
