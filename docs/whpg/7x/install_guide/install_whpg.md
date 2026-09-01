---
title: Installing WarehousePG

---

Build and install WarehousePG from the public GitHub repository on the hosts that comprise your WarehousePG cluster, enable passwordless SSH for the `gpadmin` user, and confirm the installation.

WarehousePG (WHPG) open source releases are distributed as source code from the [warehouse-pg/warehouse-pg](https://github.com/warehouse-pg/warehouse-pg) repository. No pre-built packages are currently available, so you build the software from source on each host, or build it once and copy the installed files to your other hosts.

Perform the following tasks in order:

1.  [Getting the WarehousePG source code](#getting-the-warehousepg-source-code)
2.  [Installing build dependencies](#installing-build-dependencies)
3.  [Building and installing WarehousePG](#building-and-installing-warehousepg)
4.  [Setting environment variables](#setting-environment-variables)
5.  [Enabling passwordless SSH](#enabling-passwordless-ssh)
6.  [Installing WarehousePG on additional hosts](#installing-warehousepg-on-additional-hosts)
7.  [Verifying your installation](#verifying-your-installation)
8.  [Next steps](#next-steps)

If you want to try WarehousePG on a single host before setting up a full cluster, see [Trying WarehousePG with the demo cluster](#trying-warehousepg-with-the-demo-cluster).

**Parent topic:** [Installing and Upgrading WarehousePG](./)

## Getting the WarehousePG source code

Clone the repository on the host where you build the software.

```
git clone https://github.com/warehouse-pg/warehouse-pg.git
cd warehouse-pg
```

By default, this command checks out the tip of the `main` branch. To build a specific release instead, list the available tags and check out the one you want.

```
git tag --list
git checkout <tag>
git describe --tags
```

## Installing build dependencies

Before you build WarehousePG, complete the steps in [Configure Operating System](config_os.md) to prepare the coordinator, standby coordinator, and segment host machines.

Install the required build tools and development libraries that aren't part of a default host setup:

```
sudo yum group install -y "Development Tools"
sudo yum install -y epel-release
sudo yum install -y apr-devel bison bzip2-devel cmake3 flex gcc gcc-c++ \
    git iproute jq krb5-devel libcurl-devel libevent-devel libxml2-devel \
    libyaml-devel libzstd-devel openssh-clients openssh-server \
    openssl-devel passwd perl-ExtUtils-Embed.noarch \
    perl-ExtUtils-MakeMaker.noarch python3-devel python3-pip python3-psutil \
    python3-psycopg2 python3-pyyaml readline-devel rsync xerces-c-devel \
    zlib-devel
```

:::: info Note
The [README.RHEL-Rocky.bash](https://github.com/warehouse-pg/warehouse-pg/blob/main/README.RHEL-Rocky.bash) script in the repository installs the same packages and also applies the kernel, SELinux, and firewall settings described in [Configure Operating System](config_os.md). Review the script before you run it, since it changes system-wide settings.
::::

:::: info Note
If a subsequent `yum` or `dnf` command hangs waiting for the RPM lock, another process is still holding it, for example an interrupted `yum`/`dnf` whose transaction hasn't finished, or a background updater such as `packagekitd`. Identify it, then let it finish or stop it. The lock releases as soon as the process exits.

```
sudo fuser -v /var/lib/rpm/.rpm.lock
sudo kill <pid>
```

Don't delete `/var/lib/rpm/.rpm.lock`. Removing it while a process still holds it can corrupt the RPM database.
::::

## Building and installing WarehousePG

Build WarehousePG with `configure` and `make`, then install it to a target directory.

1.  Configure the build. This example installs WarehousePG to `/usr/local/whpg` and enables the Perl, Python, libxml, and GSSAPI options.

    ```
    ./configure --with-perl --with-python --with-libxml --with-gssapi --prefix=/usr/local/whpg
    ```

    Use a different `--prefix` value to install to another location. All example procedures in the WarehousePG documentation assume that WarehousePG is installed at `/usr/local/whpg`. If you install to a different directory, substitute that directory for `/usr/local/whpg` in the documentation examples.

2.  Compile and install the software. The `-j8` option runs the build with eight parallel jobs. Adjust the number to match the CPU cores available on your build host.

    ```
    make -j8
    make -j8 install
    ```

3.  Change the owner and group of the installed files to `gpadmin`.

    ```
    sudo chown -R gpadmin:gpadmin /usr/local/whpg
    ```

:::: info Note
If you rebuild WarehousePG, for example after checking out a different tag, remove the previous installation and clean the build tree first, then repeat the `configure`, `make`, and `make install` steps.

```
sudo rm -rf /usr/local/whpg
make clean
```

If you rebuild in place for a cluster that's already initialized, restart it with `gpstart -a` as the `gpadmin` user instead of running `gpinitsystem` again.
::::

## Setting environment variables

Source the `greenplum_path.sh` file that the installation creates in the installation directory. This file sets the environment variables that WarehousePG needs.

```
source /usr/local/whpg/greenplum_path.sh
```

Add this `source` command to the `gpadmin` user's `.bashrc` or other shell startup file on the coordinator and standby coordinator hosts, so the WarehousePG path and environment variables are set whenever you log in as `gpadmin`. See [Setting WarehousePG Environment Variables](init_whpg.md#topic8) for the full procedure, including the `COORDINATOR_DATA_DIRECTORY` variable you set after you initialize the cluster.

## Enabling passwordless SSH

The `gpadmin` user on each WarehousePG host must be able to SSH between any two hosts in the cluster without entering a password or passphrase. This requirement is known as passwordless SSH, and you set it up in two stages. First, enable passwordless SSH from the coordinator host to every other host in the cluster (1-*n* passwordless SSH). Then use the WarehousePG `gpssh-exkeys` command-line utility to extend passwordless SSH from every host to every other host (*n*-*n* passwordless SSH).

1.  Log in to the coordinator host as the `gpadmin` user.
2.  Source the `path` file in the WarehousePG installation directory.

    ```
    source /usr/local/whpg/greenplum_path.sh
    ```

3.  Use the `ssh-copy-id` command to add the `gpadmin` user's public key to the `authorized_keys` SSH file on every other host in the cluster.

    ```
    ssh-copy-id scdw
    ssh-copy-id sdw1
    ssh-copy-id sdw2
    ssh-copy-id sdw3
    . . .
    ```

    This step enables 1-*n* passwordless SSH. You're prompted to enter the `gpadmin` user's password for each host. If you have the `sshpass` command on your system, use a command like the following to avoid the prompt.

    ```
    SSHPASS=<password> sshpass -e ssh-copy-id scdw
    ```

    Skip the `scdw` commands if your cluster doesn't have a standby coordinator host.

    ::: info Note
    `ssh-copy-id` can fail with two different errors that need different fixes.

    `ERROR: No identities found` means the `gpadmin` user has no local SSH key pair, for example because it was provisioned by a script, such as the [Example Ansible Playbook](ansible-example.md), that doesn't generate one. Generate a key pair as `gpadmin` on the coordinator, then retry `ssh-copy-id`.

    ```
    ssh-keygen -t rsa -b 4096
    ```

    `Permission denied (publickey)` means a key pair exists, but the target host rejects password authentication, which cloud hosts such as Amazon EC2 instances often deactivate by default. In that case, copy the coordinator's public key to each host's `authorized_keys` file manually instead. On the coordinator, display the public key.

    ```
    cat /home/gpadmin/.ssh/id_rsa.pub
    ```

    Then, on each other host, create the `.ssh` directory if it doesn't already exist, append that key, and set the correct ownership and permissions. Run these commands as a user with `sudo` access, such as the default cloud image user.

    ```
    sudo install -d -m 700 -o gpadmin -g gpadmin /home/gpadmin/.ssh
    echo "<coordinator-public-key>" | sudo tee -a /home/gpadmin/.ssh/authorized_keys
    sudo chmod 600 /home/gpadmin/.ssh/authorized_keys
    sudo chown -R gpadmin:gpadmin /home/gpadmin/.ssh
    ```
    :::

4.  In the `gpadmin` home directory, create a file named `hostfile_exkeys` that lists the machine-configured host names and interface addresses for every host in your WarehousePG cluster, including the coordinator, standby coordinator, and segment hosts. Make sure there are no blank lines or extra spaces. Check the `/etc/hosts` file on your systems for the correct host names to use for your environment. For example, if you have a coordinator, standby coordinator, and three segment hosts with two unbonded network interfaces per host, your file would look something like this:

    ```
    cdw
    cdw-1
    cdw-2
    scdw
    scdw-1
    scdw-2
    sdw1
    sdw1-1
    sdw1-2
    sdw2
    sdw2-1
    sdw2-2
    sdw3
    sdw3-1
    sdw3-2
    ```

5.  Run the `gpssh-exkeys` utility with your `hostfile_exkeys` file to enable *n*-*n* passwordless SSH for the `gpadmin` user.

    `gpssh-exkeys` can fail with an error such as `No ECDSA host key is known for <host> and you have requested strict checking` if your SSH client's strict host key checking rejects a host it doesn't yet recognize. To avoid this, populate `known_hosts` for every host in `hostfile_exkeys` first.

    ```
    ssh-keyscan -f hostfile_exkeys >> ~/.ssh/known_hosts
    ```

    Then run `gpssh-exkeys`.

    ```
    gpssh-exkeys -f hostfile_exkeys
    ```

## Installing WarehousePG on additional hosts

A WarehousePG cluster needs the same software installed at the same path on the coordinator, standby coordinator, and every segment host.

Either repeat the build on each host, or build WarehousePG once and copy the installed directory to your other hosts, now that passwordless SSH is in place.

1.  Copy the installation directory to each host, preserving permissions. For example:

    ```
    rsync -av /usr/local/whpg/ sdw1:/usr/local/whpg/
    rsync -av /usr/local/whpg/ sdw2:/usr/local/whpg/
    ```

2.  On each host, change the owner and group of the copied files to `gpadmin`.

    ```
    sudo chown -R gpadmin:gpadmin /usr/local/whpg
    ```

## Verifying your installation

To make sure the WarehousePG software is installed and configured correctly, run the following verification steps from your WarehousePG coordinator host, and fix any problems you find.

1.  Log in to the coordinator host as `gpadmin`.

    ```
    su - gpadmin
    ```

2.  Use the `gpssh` utility to check that you can log in to all hosts without a password prompt, and to confirm that the WarehousePG software is installed on all hosts. Use the `hostfile_exkeys` file you used to set up passwordless SSH. For example:

    ```
    gpssh -f hostfile_exkeys -e 'ls -l /usr/local/whpg'
    ```

    The command logs in to all hosts without a password prompt, and every host shows the same contents in its installation directory, owned by the `gpadmin` user. This output confirms that WarehousePG is installed correctly on every host.

    If you're prompted for a password, redo the SSH key exchange:

    ```
    gpssh-exkeys -f hostfile_exkeys
    ```

## Understanding your WarehousePG installation

The installation directory contains the following files and subdirectories.

-   `greenplum_path.sh` — Contains the environment variables for WarehousePG. See [Setting WarehousePG Environment Variables](init_whpg.md#topic8).
-   **bin** — Contains the WarehousePG management utilities, along with the Postgres client and server programs, most of which are also used in WarehousePG.
-   **docs/cli_help** — Contains help files for WarehousePG command-line utilities.
-   **docs/cli_help/gpconfigs** — Contains sample `gpinitsystem` configuration files and host files that you can modify and use when installing and initializing WarehousePG.
-   **ext** — Bundled programs (such as Python) used by some WarehousePG utilities.
-   **include** — The C header files for WarehousePG.
-   **lib** — WarehousePG and Postgres library files.
-   **sbin** — Supporting and internal scripts and programs.
-   **share** — Shared files for WarehousePG.

## Trying WarehousePG with the demo cluster

This step is optional. Instead of setting up a full multi-host cluster, try WarehousePG on a single host with the `make create-demo-cluster` target from the source tree.

```
source /usr/local/whpg/greenplum_path.sh
make create-demo-cluster
source gpAux/gpdemo/gpdemo-env.sh
```

The `gpdemo-env.sh` file sets the `PGPORT` and `COORDINATOR_DATA_DIRECTORY` environment variables for the demo cluster. Override the defaults on the fly with environment variables, for example:

```
DATADIRS=/tmp/whpg-cluster PORT_BASE=5555 NUM_PRIMARY_MIRROR_PAIRS=1 WITH_MIRRORS=false make create-demo-cluster
```

To remove the demo cluster and all generated build files, run:

```
make distclean
```

For a production deployment, follow [Setting environment variables](#setting-environment-variables) onward, and initialize a full cluster as described in [Initializing WarehousePG](init_whpg.md).

## Next steps

-   [Creating the Data Storage Areas](create_data_dirs.md)
-   [Validating the WHPG Cluster](validate.md)
-   [Initializing WarehousePG](init_whpg.md)
