---
title: PL/Container

---

PL/Container provides sandboxed execution environments for running PL/Python and PL/R functions inside Docker containers. This lets you run user-defined functions using a wider set of Python and R packages without affecting the host system.

## Installing PL/Container

Download and install the `plcontainer` package. See [Installing Additional Modules](../../../install_guide/additional_modules/index.md) for details.

After installing, configure containers and register the language in the target database:

```bash
plcontainer configure --add-container -c <container_name> ...
```

```sql
CREATE EXTENSION plcontainer;
```
