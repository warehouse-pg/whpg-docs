# tablefunc
---

The `tablefunc` module provides various functions that return tables (that is, multiple rows).

The WarehousePG `tablefunc` module is equivalent to the PostgreSQL `tablefunc` module. There are no WarehousePG or MPP-specific considerations for the module.

## <a id="topic_reg"></a>Installing and Registering the Module

The `tablefunc` module is installed when you install WarehousePG. Before you can use any of the functions defined in the module, you must register the `tablefunc` extension in each database in which you want to use the functions:

```
CREATE EXTENSION tablefunc;
```

## <a id="topic_info"></a>Module Documentation

See [tablefunc](https://www.postgresql.org/docs/12/tablefunc.html) in the PostgreSQL documentation for detailed information about the individual functions in this module.

