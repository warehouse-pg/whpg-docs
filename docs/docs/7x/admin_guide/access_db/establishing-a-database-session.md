# Establishing a Database Session
---

Users can connect to WarehousePG using a PostgreSQL-compatible client program, such as `psql`. Users and administrators *always* connect to WarehousePG through the *coordinator*; the segments cannot accept client connections.

In order to establish a connection to the WarehousePG coordinator, you will need to know the following connection information and configure your client program accordingly.

|Connection Parameter|Description|Environment Variable|
|--------------------|-----------|--------------------|
|Application name|The application name that is connecting to the database. The default value, held in the `application_name` connection parameter is *psql*.|`$PGAPPNAME`|
|Database name|The name of the database to which you want to connect. For a newly initialized system, use the `postgres` database to connect for the first time.|`$PGDATABASE`|
|Host name|The host name of the WarehousePG coordinator. The default host is the local host.|`$PGHOST`|
|Port|The port number that the WarehousePG coordinator instance is running on. The default is 5432.|`$PGPORT`|
|User name|The database user \(role\) name to connect as. This is not necessarily the same as your OS user name. Check with your WarehousePG administrator if you are not sure what you database user name is. Note that every WarehousePG cluster has one superuser account that is created automatically at initialization time. This account has the same name as the OS name of the user who initialized the WarehousePG cluster \(typically `gpadmin`\).|`$PGUSER`|

[Connecting with psql](connecting-with-psql.html) provides example commands for connecting to WarehousePG.

**Parent topic:** [Accessing the Database](accessing-the-database.html)

