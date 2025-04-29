# Text Analytics and Search
---

WarehousePG Database offers two different methods for text search and analytics, **WarehousePG Database full text search** and **VMware WarehousePG Text**.

## <a id="section_yby_nv1_rqb"></a>WarehousePG Database Full Text Search

WarehousePG Database text search is PostgreSQL text search ported to the WarehousePG Database MPP platform. WarehousePG Database text search is immediately available to you, with no need to install and maintain additional software. For full details on this topic, see [WarehousePG Database text search](../admin_guide/textsearch/intro.html).

## <a id="section_ywf_4v1_rqb"></a>VMware WarehousePG Text

For advanced text analysis applications, VMWare also offers [VMware WarehousePG Text](https://docs.vmware.com/en/VMware-WarehousePG-Text/index.html), which integrates WarehousePG Database with the Apache Solr text search platform. VMware WarehousePG Text installs an Apache Solr cluster alongside your WarehousePG Database cluster and provides WarehousePG Database functions you can use to create Solr indexes, query them, and receive results in the database session.

Both of these systems provide powerful, enterprise-quality document indexing and searching services. VMware WarehousePG Text, with Solr, has many capabilities that are not available with WarehousePG Database text search. In particular, VMware WarehousePG Text is better for advanced text analysis applications. For a comparative between these methods, see [Comparing WarehousePG Database Text Search with VMware WarehousePG Text](../admin_guide/textsearch/intro.html#gptext).

