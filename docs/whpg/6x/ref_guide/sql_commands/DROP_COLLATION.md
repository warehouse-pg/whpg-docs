---
title: DROP COLLATION

---

<a id="topic1"></a><a id="af20941"></a><a id="sql_command_desc"></a>

Removes a previously defined collation.

<a id="section2">

</a>

## Synopsis

<a id="sql_command_synopsis"></a>

```
DROP COLLATION [ IF EXISTS ] <name> [ CASCADE | RESTRICT ]
```

<a id="section4">

</a>

## Parameters

-   `IF EXISTS`

    Do not throw an error if the collation does not exist. A notice is issued in this case.

-   name

    The name of the collation. The collation name can be schema-qualified.

-   `CASCADE`

    Automatically drop objects that depend on the collation.

-   `RESTRICT`

    Refuse to drop the collation if any objects depend on it. This is the default.

<a id="section5">

</a>

## Notes

`DROP COLLATION` removes a previously defined collation. To be able to drop a collation, you must own the collation.

<a id="section6">

</a>

## Examples

To drop the collation named `german`:

```
DROP COLLATION german;
```

<a id="section7">

</a>

## Compatibility

The `DROP COLLATION` command conforms to the SQL standard, apart from the `IF EXISTS` option, which is a WarehousePG extension.

<a id="section8">

</a>

## See Also

[ALTER COLLATION](ALTER_COLLATION.md), [CREATE COLLATION](CREATE_COLLATION.md)

**Parent topic:** [SQL Commands](index.md)
