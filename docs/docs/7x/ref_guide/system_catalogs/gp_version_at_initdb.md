# gp_version_at_initdb 

The `gp_version_at_initdb` table is populated on the coordinator and each segment in the WarehousePG cluster. It identifies the version of WarehousePG used when the system was first initialized. This table is defined in the `pg_global` tablespace, meaning it is globally shared across all databases in the system.

|column|type|references|description|
|------|----|----------|-----------|
|`schemaversion`|smallint| |Schema version number.|
|`productversion`|text| |Product version number.|

**Parent topic:** [System Catalogs Definitions](../system_catalogs/catalog_ref-html.html)

