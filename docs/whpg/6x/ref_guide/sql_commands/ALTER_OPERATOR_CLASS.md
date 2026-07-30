---
title: ALTER OPERATOR CLASS

---

<a id="topic1"></a><a id="as20941"></a><a id="sql_command_desc"></a>

Changes the definition of an operator class.

<a id="section2">

</a>

## Synopsis

<a id="sql_command_synopsis"></a>

```
ALTER OPERATOR CLASS <name> USING <index_method> RENAME TO <new_name>

ALTER OPERATOR CLASS <name> USING <index_method> OWNER TO <new_owner>

ALTER OPERATOR CLASS <name> USING <index_method> SET SCHEMA <new_schema>
```

<a id="section3">

</a>

## Description

`ALTER OPERATOR CLASS` changes the definition of an operator class.

You must own the operator class to use `ALTER OPERATOR CLASS`. To alter the owner, you must also be a direct or indirect member of the new owning role, and that role must have `CREATE` privilege on the operator class's schema. (These restrictions enforce that altering the owner does not do anything you could not do by dropping and recreating the operator class. However, a superuser can alter ownership of any operator class anyway.)

<a id="section4">

</a>

## Parameters

-   name

    The name (optionally schema-qualified) of an existing operator class.

-   index_method

    The name of the index method this operator class is for.

-   new_name

    The new name of the operator class.

-   new_owner

    The new owner of the operator class

-   new_schema

    The new schema for the operator class.

<a id="section5">

</a>

## Compatibility

There is no `ALTER OPERATOR CLASS` statement in the SQL standard.

<a id="section6">

</a>

## See Also

[CREATE OPERATOR CLASS](CREATE_OPERATOR_CLASS.md), [DROP OPERATOR CLASS](DROP_OPERATOR_CLASS.md)

**Parent topic:** [SQL Commands](index.md)
