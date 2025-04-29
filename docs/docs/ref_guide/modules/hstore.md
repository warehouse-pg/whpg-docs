# hstore 

The `hstore` module implements a data type for storing sets of \(key,value\) pairs within a single WarehousePG Database data field. This can be useful in various scenarios, such as rows with many attributes that are rarely examined, or semi-structured data.

The WarehousePG Database `hstore` module is equivalent to the PostgreSQL `hstore` module. There are no WarehousePG Database or MPP-specific considerations for the module.

## <a id="topic_reg"></a>Installing and Registering the Module 

The `hstore` module is installed when you install WarehousePG Database. Before you can use any of the data types or functions defined in the module, you must register the `hstore` extension in each database in which you want to use the objects. Refer to [Installing Extensions](../../install_guide/install_extensions.html) for more information.

## <a id="topic_info"></a>Module Documentation 

See [hstore](https://www.postgresql.org/docs/12/hstore.html) in the PostgreSQL documentation for detailed information about the data types and functions defined in this module.

