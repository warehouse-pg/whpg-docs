---
title: PXF for WarehousePG
description: Covers the usage of the WarehousePG Platform Extension Framework (PXF) to access external data sources from WarehousePG.
---

The WarehousePG Platform Extension Framework (PXF) gives WarehousePG (WHPG) access to data that lives outside the cluster, in systems like Hadoop, object stores, and external SQL databases. You interact with that external data through external tables, using a readable external table to query it and a writable external table to insert into it, the same way you'd work with any other WHPG table, or through a foreign data wrapper as an alternative.

A `pxf` extension and a PXF service run on the coordinator, standby coordinator, and every segment host. When a query touches a PXF external table, each segment's PXF service connects to the external source independently and reads or writes its share of the data in parallel, so a PXF query scales with your cluster rather than routing through the coordinator. See [Architecture](overview/architecture.md) for how these pieces fit together.

## Key features

- **Broad connector support.** Reach Hadoop, object stores such as Amazon S3, MinIO, Azure Blob Storage, and Google Cloud Storage, SQL databases over JDBC, and network file systems.

- **Multiple data formats.** Read and write text, CSV, Avro, JSON, RCFile, Parquet, SequenceFile, and ORC, depending on the connector. See [Compatibility](overview/compatibility.md) for supported sources, formats, and versions.

- **Parallel, segment-based execution.** Each segment's PXF service handles its own portion of the data independently, so performance scales with the number of segments in your cluster.

- **Full read and write support.** Query external data or insert into it using PXF external tables.

- **A foreign data wrapper alternative.** Reach the same sources through standard Postgres foreign tables instead of external tables. See [Using the foreign data wrapper](foreign-data-wrapper.md) for that alternative.

- **Cluster-wide management.** The `pxf cluster` command line tool syncs configuration and starts or stops the PXF service across every host from one place. See [Managing the PXF cluster](administering.md) for details.
