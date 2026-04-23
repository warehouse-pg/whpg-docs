---
title: gpexpand.status

---

<a id="topic1"></a><a id="fa138336"></a>

The `gpexpand.status` table contains information about the status of a system expansion operation. Status for specific tables involved in the expansion is stored in [gpexpand.status_detail](gp_expansion_tables.md).

In a normal expansion operation it is not necessary to modify the data stored in this table.

| column    | type                        | references | description                                                                                                                                                                                    |
| --------- | --------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`  | text                        |            | Tracks the status of an expansion operation. Valid values are:<br /><br />`SETUP`<br /><br />`SETUP DONE`<br /><br />`EXPANSION STARTED`<br /><br />`EXPANSION STOPPED`<br /><br />`COMPLETED` |
| `updated` | timestamp without time zone |            | Timestamp of the last change in status.                                                                                                                                                        |

**Parent topic:** [System Catalogs Definitions](index.md)
