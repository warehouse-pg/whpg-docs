---
title: END

---

<a id="topic1"></a><a id="do20941"></a><a id="sql_command_desc"></a>

Commits the current transaction.

<a id="section2">

</a>

## Synopsis

<a id="sql_command_synopsis"></a>

```
END [WORK | TRANSACTION]
```

<a id="section3">

</a>

## Description

`END` commits the current transaction. All changes made by the transaction become visible to others and are guaranteed to be durable if a crash occurs. This command is a WarehousePG extension that is equivalent to [COMMIT](COMMIT.md).

<a id="section4">

</a>

## Parameters

-   WORK

-   TRANSACTION

    Optional keywords. They have no effect.

<a id="section5">

</a>

## Examples

Commit the current transaction:

```
END;
```

<a id="section6">

</a>

## Compatibility

`END` is a WarehousePG extension that provides functionality equivalent to [COMMIT](COMMIT.md), which is specified in the SQL standard.

<a id="section7">

</a>

## See Also

[BEGIN](BEGIN.md), [ROLLBACK](ROLLBACK.md), [COMMIT](COMMIT.md)

**Parent topic:** [SQL Commands](index.md)
