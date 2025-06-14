# sslinfo 

The `sslinfo` module provides information about the SSL certificate that the current client provided when connecting to WarehousePG. Most functions in this module return NULL if the current connection does not use SSL.

The WarehousePG `sslinfo` module is equivalent to the PostgreSQL `sslinfo` module. There are no WarehousePG or MPP-specific considerations for the module.

## <a id="topic_reg"></a>Installing and Registering the Module 

The `sslinfo` module is installed when you install WarehousePG. Before you can use any of the functions defined in the module, you must register the `sslinfo` extension in each database in which you want to use the functions. Refer to [Installing Extensions](../../install_guide/install_extensions.html) for more information.

## <a id="topic_info"></a>Module Documentation 

See [sslinfo](https://www.postgresql.org/docs/12/sslinfo.html) in the PostgreSQL documentation for detailed information about the individual functions in this module.

