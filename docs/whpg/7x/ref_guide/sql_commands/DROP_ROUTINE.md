---
title: DROP ROUTINE

---

Removes a routine.

<a id="section2"></a>

## Synopsis

<div id="sql_command_synopsis"></div>

```
DROP ROUTINE [IF EXISTS] name ( [ [argmode] [argname] argtype [, ...] ] )
    [CASCADE | RESTRICT]
```

<a id="section3"></a>

## Description

`DROP ROUTINE` removes the definition of an existing routine, which can be an aggregate function, a normal function, or a procedure. Refer to [DROP AGGREGATE](DROP_AGGREGATE.md), [DROP FUNCTION](DROP_FUNCTION.md), and [DROP PROCEDURE](DROP_PROCEDURE.md) for the description of the parameters, more examples, and further details.

<a id="section5"></a>

## Examples

To drop the routine `foo` for type `integer`:

```
DROP ROUTINE foo(integer);
```

This command will work independent of whether `foo` is an aggregate, function, or procedure.

<a id="section6"></a>

## Compatibility

This command conforms to the SQL standard, with these WarehousePG extensions:

-   The standard only allows one routine to be dropped per command.

-   The `IF EXISTS` option.

-   The ability to specify argument modes and names.

-   Aggregate functions are an extension.

<a id="section7"></a>

## See Also

[DROP AGGREGATE](DROP_AGGREGATE.md), [DROP FUNCTION](DROP_FUNCTION.md), [DROP PROCEDURE](DROP_PROCEDURE.md), [ALTER ROUTINE](ALTER_ROUTINE.md)

**Parent topic:** [SQL Commands](index.md)
