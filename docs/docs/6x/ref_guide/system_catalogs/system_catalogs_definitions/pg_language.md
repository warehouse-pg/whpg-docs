---
title: pg_language

---

<a id="topic1"></a><a id="gs143896"></a>

The `pg_language` system catalog table registers languages in which you can write functions or stored procedures. It is populated by `CREATE LANGUAGE`.

| column          | type       | references    | description                                                                                                                                                                                                                                   |
| --------------- | ---------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lanname`       | name       |               | Name of the language.                                                                                                                                                                                                                         |
| `lanowner`      | oid        | pg_authid.oid | Owner of the language.                                                                                                                                                                                                                        |
| `lanispl`       | boolean    |               | This is false for internal languages (such as SQL) and true for user-defined languages. Currently, `pg_dump` still uses this to determine which languages need to be dumped, but this may be replaced by a different mechanism in the future. |
| `lanpltrusted`  | boolean    |               | True if this is a trusted language, which means that it is believed not to grant access to anything outside the normal SQL execution environment. Only superusers may create functions in untrusted languages.                                |
| `lanplcallfoid` | oid        | pg_proc.oid   | For noninternal languages this references the language handler, which is a special function that is responsible for running all functions that are written in the particular language.                                                        |
| `laninline`     | oid        | pg_proc.oid   | This references a function that is responsible for running inline anonymous code blocks (see the [DO](../../sql_commands/DO.md) command). Zero if anonymous blocks are not supported.                                                         |
| `lanvalidator`  | oid        | pg_proc.oid   | This references a language validator function that is responsible for checking the syntax and validity of new functions when they are created. Zero if no validator is provided.                                                              |
| `lanacl`        | aclitem\[] |               | Access privileges for the language.                                                                                                                                                                                                           |

**Parent topic:** [System Catalogs Definitions](index.md)
