---
title: Connecting to Hadoop
navTitle: Connecting to Hadoop
description: Configure PXF to connect to a Hadoop cluster and query HDFS, Hive, and HBase data from WarehousePG.
---

PXF's Hadoop connectors, the Hadoop Distributed File System (HDFS), Hive, and HBase, share the same underlying cluster configuration. Configure the connection to HDFS first if you also plan to use Hive, since Hive builds on top of it.

- [HDFS](hdfs.md): Read and write files directly on HDFS.
- [Hive](hive.md): Read Hive table data.
- [HBase](hbase.md): Read HBase table data.
- [Authenticating with Kerberos](kerberos.md): Connect to a Kerberized Hadoop cluster and configure user impersonation.
