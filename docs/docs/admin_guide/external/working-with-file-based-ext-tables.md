# Working with External Data
---

Both external and foreign tables provide access to data stored in data sources outside of WarehousePG Database as if the data were stored in regular database tables. You can read data from and write data to external and foreign tables.

> **Important** WarehousePG 7 internally converts external tables to foreign tables, and internally operates on and represents the table using the foreign table data structures and catalog. Refer to [Understanding the External Table to Foreign Table Mapping](map_ext_to_foreign.html) for detailed information about this conversion, and its runtime implications.

**Parent topic:** [WarehousePG Database Administrator Guide](../admin_guide)

## <a id="foreign"></a>About Foreign Tables

A foreign table is a WarehousePG Database table backed with data that resides outside of the database. Foreign tables are often used to load and unload database data. You can both read from and write to the same foreign table. You can use foreign tables in SQL commands just as you would a regular database table. For example, you can `SELECT`, `INSERT`, and `JOIN` foreign tables with other WarehousePG tables.

Refer to [Accessing External Data with Foreign Tables](foreign.html) for more information about accessing external data using foreign tables.

## <a id="external"></a>About External Tables

An external table is different kind of WarehousePG Database table backed with data that resides outside of the database. External tables are often used to load and unload database data. You create a readable external table to read data from the external data source and create a writable external table to write data to the external source. You can use external tables in SQL commands just as you would a regular database table. For example, you can `SELECT` \(readable external table\), `INSERT` \(writable external table\), and `JOIN` external tables with other WarehousePG tables.

Refer to [Acessing External Data with External Tables](external-tables.html) for more information about using external tables to access external data.

### <a id="gpfdist"></a>About gpfdist External Tables

You can use the `gpfdist` file server utility and external tables to serve up external data to WarehousePG. When external data is served by `gpfdist`, all segments in the WarehousePG Database system can read or write external table data in parallel. Refer to [Using the WarehousePG Parallel File Server \(gpfdist\)](../external/using-gpfdist.html) for more information.

### <a id="web_external"></a>About Web-Based External Tables

Web-based external tables provide access to data served by an HTTP server or an operating system process. See [Creating and Using External Web Tables](creating-and-using-web-external-tables.html) for more about web-based tables.

## <a id="pxf"></a>About Accessing External Data with pxf

Data managed by your organization may already reside in external sources such as Hadoop, object stores, and other SQL databases. The WarehousePG Platform Extension Framework \(PXF\) provides access to this external data via built-in connectors that map an external data source to a WarehousePG Database table definition. Refer to [Accessing External Data with PXF](../external/pxf-overview.html) for more information about using PXF.

