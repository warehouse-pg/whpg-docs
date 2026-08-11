---
title: Connecting to external data
navTitle: Connecting to external data
description: Learn how PXF servers and profiles work, and how to reference them when you create an external table.
---

Reach external data from WarehousePG (WHPG) by pointing a PXF external table at a server, for connection details, and a profile, for the connector and data format to read or write it with. Understand how servers, profiles, and formats work before you configure one for the connector you need, on [Object stores](object-stores/index.md), [Hadoop](hadoop/index.md), [Connecting to SQL databases over JDBC](jdbc.md), or [Network file system](network-file-system.md).

Every connector, regardless of the external source it reaches, relies on the same two pieces of configuration: a server for connection details and a profile for the data format, such as Parquet, Avro, or JSON. An external table's `LOCATION` clause references both:

```sql
CREATE EXTERNAL TABLE sales (id int, name text, amount numeric)
    LOCATION ('pxf://data/sales.csv?PROFILE=s3:text&SERVER=example')
    FORMAT 'CSV' (delimiter=',');
```

## Understanding PXF servers

PXF connects to an external data source through a named server configuration to read or write data. Each server is a directory under `$PXF_BASE/servers` that contains one or more site XML files with the connection settings for that source, such as the endpoint URL and credentials.

When you initialize your cluster, `pxf cluster prepare` creates an empty `default` server. To read and write from several sources, create multiple servers by adding a separate subdirectory for each one under `$PXF_BASE/servers`, with its own site XML files. `$PXF_HOME/templates` holds a sample site XML file for each connector, ready to copy into your server directory and edit. See [Configuration templates](../reference/configuration-templates.md) for the properties in each.

::: info Note
If `LOCATION` omits `SERVER`, PXF falls back to `$PXF_BASE/servers/default`.
:::

## Understanding PXF profiles

A PXF profile name follows a `<connector>:<format>` pattern, for example `hdfs:parquet` or `s3:avro`, and PXF uses it to pick which connector and format code handles the request.

PXF ships with a built-in profile for each connector and format combination it supports, compiled into the PXF service. See [PXF profiles](../reference/profiles.md) for the full list.

PXF also supports custom profiles, defined in [`pxf-profiles.xml`](../reference/configuration-files.md#pxf-profilesxml) and backed by your own Java plugin classes.

The `format` part of a profile works the same way regardless of which connector it's paired with. PXF supports text, CSV, Parquet, ORC, Avro, JSON, and SequenceFile, depending on the connector. See [PXF profiles](../reference/profiles.md) for the full list of formats and which connectors support each.

## Choosing a connector

Configure the connector that matches your external data source.

- [Object stores](object-stores/index.md): Amazon S3, MinIO, Azure Blob Storage, Azure Data Lake Storage, and Google Cloud Storage.
- [Hadoop](hadoop/index.md): HDFS, Hive, and HBase.
- [Connecting to SQL databases over JDBC](jdbc.md): external SQL databases through a JDBC driver.
- [Network file system](network-file-system.md): a shared network file system.
