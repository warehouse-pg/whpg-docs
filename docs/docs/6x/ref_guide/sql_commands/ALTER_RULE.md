---
title: ALTER RULE

---

<a id="topic1"></a><a id="sql_command_desc"></a>

Changes the definition of a rule.

<a id="section2">

</a>

## Synopsis

<a id="sql_command_synopsis"></a>

```
ALTER RULE name ON table\_name RENAME TO new\_name
```

<a id="section3">

</a>

## Description

`ALTER RULE` changes properties of an existing rule. Currently, the only available action is to change the rule's name.

To use `ALTER RULE`, you must own the table or view that the rule applies to.

<a id="section4">

</a>

## Parameters

-   name

    The name of an existing rule to alter.

-   table_name

    The name (optionally schema-qualified) of the table or view that the rule applies to.

-   new_name

    The new name for the rule.

<a id="section7">

</a>

## Compatibility

`ALTER RULE` is a WarehousePG language extension, as is the entire query rewrite system.

<a id="seealso">

</a>

## See Also

[CREATE RULE](CREATE_RULE.md), [DROP RULE](DROP_RULE.md)

**Parent topic:** [SQL Commands](index.md)
