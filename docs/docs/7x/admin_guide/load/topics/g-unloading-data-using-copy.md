# Unloading Data Using COPY
---

`COPY TO` copies data from a table to a file \(or standard input\) on the WarehousePG coordinator host using a single process on the WarehousePG coordinator instance. Use `COPY` to output a table's entire contents, or filter the output using a `SELECT` statement. For example:

```
COPY (SELECT * FROM country WHERE country_name LIKE 'A%') 
TO '/home/gpadmin/a_list_countries.out';

```

**Parent topic:** [Unloading Data from WarehousePG](../../load/topics/g-unloading-data-from-warehousepg.html)

