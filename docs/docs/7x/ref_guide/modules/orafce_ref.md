# orafce 

The `orafce` module provides Oracle Compatibility SQL functions in WarehousePG. These functions target PostgreSQL but can also be used in WarehousePG.

The WarehousePG `orafce` module is a modified version of the [open source Orafce PostgreSQL module extension](https://github.com/orafce/orafce). The modified `orafce` source files for WarehousePG can be found in the `gpcontrib/orafce` directory in the [WarehousePG open source project](https://github.com/greenplum-db/gpdb). The source reflects the Orafce 3.6.1 release and additional commits to [3af70a28f6](https://github.com/orafce/orafce/tree/3af70a28f6ab81f43c990fb5661df99a37328b8a).

There are some restrictions and limitations when you use the module in WarehousePG.

## <a id="topic_reg"></a>Installing and Registering the Module 

> **Note** Always use the Oracle Compatibility Functions module included with your WarehousePG version. Before upgrading to a new WarehousePG version, uninstall the compatibility functions from each of your databases, and then, when the upgrade is complete, reinstall the compatibility functions from the new WarehousePG release. See the WarehousePG release notes for upgrade prerequisites and procedures.

The `orafce` module is installed when you install WarehousePG. Before you can use any of the functions defined in the module, you must register the `orafce` extension in each database in which you want to use the functions. Refer to [Installing Extensions](../../install_guide/install_extensions.html) for more information.

## <a id="topic_mpp"></a>WarehousePG Considerations 

The following functions are available by default in WarehousePG and do not require installing the Oracle Compatibility Functions:

-   sinh\(\)
-   tanh\(\)
-   cosh\(\)
-   decode\(\) \(See [WarehousePG Implementation Differences](#topic3) for more information.\)

### <a id="topic3"></a>WarehousePG Implementation Differences 

There are differences in the implementation of the compatibility functions in WarehousePG from the original PostgreSQL `orafce` module extension implementation. Some of the differences are as follows:

-   The original `orafce` module implementation performs a decimal round off, the WarehousePG implementation does not:
    -   2.00 becomes 2 in the original module implementation
    -   2.00 remains 2.00 in the WarehousePG implementation
-   The provided Oracle compatibility functions handle implicit type conversions differently. For example, using the `decode` function:

    ```
    decode(<expression>, <value>, <return> [,<value>, <return>]...
                [, default])
    ```

    The original `orafce` module implementation automatically converts expression and each value to the data type of the first value before comparing. It automatically converts return to the same data type as the first result.

    The WarehousePG implementation restricts return and `default` to be of the same data type. The expression and value can be different types if the data type of value can be converted into the data type of the expression. This is done implicitly. Otherwise, `decode` fails with an `invalid input syntax` error. For example:

    ```
    SELECT decode('a','M',true,false);
    CASE
    ------
     f
    (1 row)
    SELECT decode(1,'M',true,false);
    ERROR: Invalid input syntax for integer:*"M" 
    *LINE 1: SELECT decode(1,'M',true,false);
    ```

-   Numbers in `bigint` format are displayed in scientific notation in the original `orafce` module implementation but not in the WarehousePG implementation:
    -   9223372036854775 displays as 9.2234E+15 in the original implementation
    -   9223372036854775 remains 9223372036854775 in the WarehousePG implementation
-   The default date and timestamp format in the original `orafce` module implementation is different than the default format in the WarehousePG implementation. If the following code is run:

    ```
    CREATE TABLE TEST(date1 date, time1 timestamp, time2 
                      timestamp with time zone);
    INSERT INTO TEST VALUES ('2001-11-11','2001-12-13 
                     01:51:15','2001-12-13 01:51:15 -08:00');
    SELECT DECODE(date1, '2001-11-11', '2001-01-01') FROM TEST;
    ```

    The WarehousePG implementation returns the row, but the original implementation returns no rows.

    > **Note** The correct syntax when using the original `orafce` implementation to return the row is:

    ```
    SELECT DECODE(to_char(date1, 'YYYY-MM-DD'), '2001-11-11', 
                  '2001-01-01') FROM TEST
    ```

-   The functions in the Oracle Compatibility Functions `dbms_alert` package are not implemented for WarehousePG.
-   The `decode()` function is removed from the WarehousePG Oracle Compatibility Functions. The WarehousePG parser internally converts a `decode()` function call to a `CASE` statement.

## <a id="topic_using"></a>Using orafce 

Some Oracle Compatibility Functions reside in the `oracle` schema. To access them, set the search path for the database to include the `oracle` schema name. For example, this command sets the default search path for a database to include the `oracle` schema:

```
ALTER DATABASE <db_name> SET <search_path> = "$user", public, oracle;
```

Note the following differences when using the Oracle Compatibility Functions with PostgreSQL vs. using them with WarehousePG:

-   If you use validation scripts, the output may not be exactly the same as with the original `orafce` module implementation.
-   The functions in the Oracle Compatibility Functions `dbms_pipe` package run only on the WarehousePG coordinator host.
-   The upgrade scripts in the Orafce project do not work with WarehousePG.

## <a id="topic_info"></a>Additional Module Documentation 

Refer to the [README](https://github.com/greenplum-db/gpdb/tree/main/gpcontrib/orafce/README.asciidoc) and [WarehousePG orafce documentation](https://github.com/greenplum-db/gpdb/tree/main/gpcontrib/orafce/doc/orafce_documentation) in the WarehousePG github repository for detailed information about the individual functions and supporting objects provided in this module.

