# gpsync 

Copies files between multiple hosts at once.

## <a id="section2"></a>Synopsis 

```
gpsync { -f <hostfile_gpssh> | -h <hostname> [-h <hostname> ...] } 
      [-a][-J <character>] [-v] [[<user>@]<hostname>:]<file_to_copy> [...]
      [[<user>@]<hostname>:]<copy_to_path> 

gpsync -? 

gpsync --version
```

## <a id="section3"></a>Description 

The `gpsync` utility allows you to copy one or more files from the specified hosts to other specified hosts in one command using remote sync. For example, you can copy a file from the WarehousePG coordinator host to all of the segment hosts at the same time.

To specify the hosts involved in the remote sync session, use the `-f` option to specify a file containing a list of host names, or use the `-h` option to name single host names on the command-line. At least one host name \(`-h`\) or a host file \(`-f`\) is required. The `-J` option allows you to specify a single character to substitute for the hostname in the `copy from` and `copy to` destination strings. If `-J` is not specified, the default substitution character is an equal sign \(`=`\). For example, the following command will copy `.bashrc` from the local host to `/home/gpadmin` on all hosts named in `hostfile_gpssh`:

```
gpsync -f hostfile_gpssh .bashrc =:/home/gpadmin
```

If a user name is not specified in the host list or with user`@` in the file path, `gpsync` will copy files as the currently logged in user. To determine the currently logged in user, do a `whoami` command. By default, `gpsync` goes to `$HOME` of the session user on the remote hosts after login. To ensure the file is copied to the correct location on the remote hosts, it is recommended that you use absolute paths.

Before using `gpsync`, you must have a trusted host setup between the hosts involved in the remote sync session. You can use the utility `gpssh-exkeys` to update the known host files and exchange public keys between hosts if you have not done so already.

## <a id="section4"></a>Options 

-f hostfile\_gpssh
Specifies the name of a file that contains a list of hosts that will participate in this remote sync session. The syntax of the host file is one host per line as follows:

```
<hostname>
```

##### -h hostname
Specifies a single host name that will participate in this remote sync session. You can use the `-h` option multiple times to specify multiple host names.

##### -a 
Sync source and target directories in archival mode.

##### -J character
The `-J` option allows you to specify a single character to substitute for the hostname in the `copy from` and `copy to` destination strings. If `-J` is not specified, the default substitution character is an equal sign \(`=`\).

##### -v \(verbose mode\)
Optional. Reports additional messages in addition to the remote sync command output.

##### file\_to\_copy
Required. The file name \(or absolute path\) of a file that you want to copy to other hosts \(or file locations\). This can be either a file on the local host or on another named host.

##### copy\_to\_path
Required. The path where you want the file\(s\) to be copied on the named hosts. If an absolute path is not used, the file will be copied relative to `$HOME` of the session user. You can also use the equal sign '`=`' \(or another character that you specify with the `-J` option\) in place of a hostname. This will then substitute in each host name as specified in the supplied host file \(`-f`\) or with the `-h` option.

##### ##### -? \(help\)
Displays the online help.

##### --version
Displays the version of this utility.

## <a id="section5"></a>Examples 

Copy the file named `installer.tar` to `/` on all the hosts in the file `hostfile_gpssh`.

```
gpsync -f hostfile_gpssh installer.tar =:/
```

Copy the file named myfuncs.so to the specified location on the hosts named `sdw1` and `sdw2`:

```
gpsync -h sdw1 -h sdw2 myfuncs.so =:/usr/local/greenplum-db/lib
```

## <a id="seealso"></a>See Also 

[gpssh](gpssh.html), [gpssh-exkeys](gpssh-exkeys.html)

