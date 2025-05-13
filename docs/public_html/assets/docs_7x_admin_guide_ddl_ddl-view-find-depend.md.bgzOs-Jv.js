import{_ as n,c as a,o as e,ag as p}from"./chunks/framework.Ds6Eueu6.js";const v=JSON.parse('{"title":"Working with View Dependencies","description":"","frontmatter":{},"headers":[],"relativePath":"docs/7x/admin_guide/ddl/ddl-view-find-depend.md","filePath":"docs/7x/admin_guide/ddl/ddl-view-find-depend.md"}'),i={name:"docs/7x/admin_guide/ddl/ddl-view-find-depend.md"};function l(t,s,c,d,o,r){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="working-with-view-dependencies" tabindex="-1">Working with View Dependencies <a class="header-anchor" href="#working-with-view-dependencies" aria-label="Permalink to &quot;Working with View Dependencies&quot;">​</a></h1><hr><p>If there are view dependencies on a table you must use the <code>CASCADE</code> keyword to drop it. Also, you cannot alter the table if there are view dependencies on it. This example shows a view dependency on a table.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE t (id integer PRIMARY KEY);</span></span>
<span class="line"><span>CREATE VIEW v AS SELECT * FROM t;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>DROP TABLE t;</span></span>
<span class="line"><span>ERROR:  cannot drop table t because other objects depend on it</span></span>
<span class="line"><span>DETAIL:  view v depends on table t</span></span>
<span class="line"><span>HINT:  Use DROP ... CASCADE to drop the dependent objects too.</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>ALTER TABLE t DROP id;</span></span>
<span class="line"><span>ERROR:  cannot drop column id of table t because other objects depend on it</span></span>
<span class="line"><span>DETAIL:  view v depends on column id of table t</span></span>
<span class="line"><span>HINT:  Use DROP ... CASCADE to drop the dependent objects too.</span></span></code></pre></div><p>As the previous example shows, altering a table can be quite a challenge if there is a deep hierarchy of views, because you have to create the views in the correct order. You cannot create a view unless all the objects it requires are present.</p><p>You can use view dependency information when you want to alter a table that is referenced by a view. For example, you might want to change a table&#39;s column data type from <code>integer</code> to <code>bigint</code> because you realize you need to store larger numbers. However, you cannot do that if there are views that use the column. You first have to drop those views, then change the column and then run all the <code>CREATE VIEW</code> statements to create the views again.</p><h2 id="finding-view-dependencies" tabindex="-1"><a id="topic_find_v_examples"></a>Finding View Dependencies <a class="header-anchor" href="#finding-view-dependencies" aria-label="Permalink to &quot;&lt;a id=&quot;topic_find_v_examples&quot;&gt;&lt;/a&gt;Finding View Dependencies&quot;">​</a></h2><p>The following example queries list view information on dependencies on tables and columns.</p><ul><li><a href="#depend_table">Finding Direct View Dependencies on a Table</a></li><li><a href="#direct_column">Finding Direct Dependencies on a Table Column</a></li><li><a href="#view_schema">Listing View Schemas</a></li><li><a href="#view_defs">Listing View Definitions</a></li><li><a href="#nested_views">Listing Nested Views</a></li></ul><p>The example output is based on the <a href="#example_data">Example Data</a> at the end of this topic.</p><p>Also, you can use the first example query <a href="#depend_table">Finding Direct View Dependencies on a Table</a> to find dependencies on user-defined functions (or procedures). The query uses the catalog table <code>pg_class</code> that contains information about tables and views. For functions, you can use the catalog table <a href="./../../ref_guide/system_catalogs/pg_proc.html"><code>pg_proc</code></a> to get information about functions.</p><p>For detailed information about the system catalog tables that store view information, see <a href="./ddl-view-storage.html">About View Storage in WarehousePG</a>.</p><h3 id="finding-direct-view-dependencies-on-a-table" tabindex="-1"><a id="depend_table"></a>Finding Direct View Dependencies on a Table <a class="header-anchor" href="#finding-direct-view-dependencies-on-a-table" aria-label="Permalink to &quot;&lt;a id=&quot;depend_table&quot;&gt;&lt;/a&gt;Finding Direct View Dependencies on a Table&quot;">​</a></h3><p>To find out which views directly depend on table <code>t1</code>, create a query that performs a join among the catalog tables that contain the dependency information, and qualify the query to return only view dependencies.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT v.oid::regclass AS view,</span></span>
<span class="line"><span>  d.refobjid::regclass AS ref_object    -- name of table</span></span>
<span class="line"><span>  -- d.refobjid::regproc AS ref_object  -- name of function</span></span>
<span class="line"><span>FROM pg_depend AS d      -- objects that depend on a table</span></span>
<span class="line"><span>  JOIN pg_rewrite AS r  -- rules depending on a table</span></span>
<span class="line"><span>     ON r.oid = d.objid</span></span>
<span class="line"><span>  JOIN pg_class AS v    -- views for the rules</span></span>
<span class="line"><span>     ON v.oid = r.ev_class</span></span>
<span class="line"><span>WHERE v.relkind = &#39;v&#39;         -- filter views only</span></span>
<span class="line"><span>  -- dependency must be a rule depending on a relation</span></span>
<span class="line"><span>  AND d.classid = &#39;pg_rewrite&#39;::regclass </span></span>
<span class="line"><span>  AND d.deptype = &#39;n&#39;         -- normal dependency</span></span>
<span class="line"><span>  -- qualify object</span></span>
<span class="line"><span>  AND d.refclassid = &#39;pg_class&#39;::regclass   -- dependent table</span></span>
<span class="line"><span>  AND d.refobjid = &#39;t1&#39;::regclass</span></span>
<span class="line"><span>  -- AND d.refclassid = &#39;pg_proc&#39;::regclass -- dependent function</span></span>
<span class="line"><span>  -- AND d.refobjid = &#39;f&#39;::regproc</span></span>
<span class="line"><span>;</span></span>
<span class="line"><span>    view    | ref_object</span></span>
<span class="line"><span>------------+------------</span></span>
<span class="line"><span> v1         | t1</span></span>
<span class="line"><span> v2         | t1</span></span>
<span class="line"><span> v2         | t1</span></span>
<span class="line"><span> v3         | t1</span></span>
<span class="line"><span> mytest.vt1 | t1</span></span>
<span class="line"><span> mytest.v2a | t1</span></span>
<span class="line"><span> mytest.v2a | t1</span></span>
<span class="line"><span>(7 rows)</span></span></code></pre></div><p>The query performs casts to the <code>regclass</code> object identifier type. For information about object identifier types, see the PostgeSQL documentation on <a href="https://www.postgresql.org/docs/12/datatype-oid.html" target="_blank" rel="noreferrer">Object Identifier Types</a>.</p><p>In some cases, the views are listed multiple times because the view references multiple table columns. You can remove those duplicates using <code>DISTINCT</code>.</p><p>You can alter the query to find views with direct dependencies on the function <code>f</code>.</p><ul><li>In the <code>SELECT</code> clause replace the name of the table <code>d.refobjid::regclass as ref_object</code> with the name of the function <code>d.refobjid::regproc as ref_object</code></li><li>In the <code>WHERE</code> clause replace the catalog of the referenced object from <code>d.refclassid = &#39;pg_class&#39;::regclass</code> for tables, to <code>d.refclassid = &#39;pg_proc&#39;::regclass</code> for procedures (functions). Also change the object name from <code>d.refobjid = &#39;t1&#39;::regclass</code> to <code>d.refobjid = &#39;f&#39;::regproc</code></li><li>In the <code>WHERE</code> clause, replace the name of the table <code>refobjid = &#39;t1&#39;::regclass</code> with the name of the function <code>refobjid = &#39;f&#39;::regproc</code>.</li></ul><p>In the example query, the changes have been commented out (prefixed with <code>--</code>). You can comment out the lines for the table and enable the lines for the function.</p><h3 id="finding-direct-dependencies-on-a-table-column" tabindex="-1"><a id="direct_column"></a>Finding Direct Dependencies on a Table Column <a class="header-anchor" href="#finding-direct-dependencies-on-a-table-column" aria-label="Permalink to &quot;&lt;a id=&quot;direct_column&quot;&gt;&lt;/a&gt;Finding Direct Dependencies on a Table Column&quot;">​</a></h3><p>You can modify the previous query to find those views that depend on a certain table column, which can be useful if you are planning to drop a column (adding a column to the base table is never a problem). The query uses the table column information in the <a href="./../../ref_guide/system_catalogs/pg_attribute.html"><code>pg_attribute</code></a> catalog table.</p><p>This query finds the views that depend on the column <code>id</code> of table <code>t1</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT v.oid::regclass AS view,</span></span>
<span class="line"><span>  d.refobjid::regclass AS ref_object, -- name of table</span></span>
<span class="line"><span>  a.attname AS col_name               -- column name</span></span>
<span class="line"><span>FROM pg_attribute AS a   -- columns for a table</span></span>
<span class="line"><span>  JOIN pg_depend AS d    -- objects that depend on a column</span></span>
<span class="line"><span>    ON d.refobjsubid = a.attnum AND d.refobjid = a.attrelid</span></span>
<span class="line"><span>  JOIN pg_rewrite AS r   -- rules depending on the column</span></span>
<span class="line"><span>    ON r.oid = d.objid</span></span>
<span class="line"><span>  JOIN pg_class AS v     -- views for the rules</span></span>
<span class="line"><span>    ON v.oid = r.ev_class</span></span>
<span class="line"><span>WHERE v.relkind = &#39;v&#39;    -- filter views only</span></span>
<span class="line"><span>  -- dependency must be a rule depending on a relation</span></span>
<span class="line"><span>  AND d.classid = &#39;pg_rewrite&#39;::regclass</span></span>
<span class="line"><span>  AND d.refclassid = &#39;pg_class&#39;::regclass </span></span>
<span class="line"><span>  AND d.deptype = &#39;n&#39;    -- normal dependency</span></span>
<span class="line"><span>  AND a.attrelid = &#39;t1&#39;::regclass</span></span>
<span class="line"><span>  AND a.attname = &#39;id&#39;</span></span>
<span class="line"><span>;</span></span>
<span class="line"><span>    view    | ref_object | col_name</span></span>
<span class="line"><span>------------+------------+----------</span></span>
<span class="line"><span> v1         | t1         | id</span></span>
<span class="line"><span> v2         | t1         | id</span></span>
<span class="line"><span> mytest.vt1 | t1         | id</span></span>
<span class="line"><span> mytest.v2a | t1         | id</span></span>
<span class="line"><span>(4 rows)</span></span></code></pre></div><h3 id="listing-view-schemas" tabindex="-1"><a id="view_schema"></a>Listing View Schemas <a class="header-anchor" href="#listing-view-schemas" aria-label="Permalink to &quot;&lt;a id=&quot;view_schema&quot;&gt;&lt;/a&gt;Listing View Schemas&quot;">​</a></h3><p>If you have created views in multiple schemas, you can also list views, each view&#39;s schema, and the table referenced by the view. The query retrieves the schema from the catalog table <code>pg_namespace</code> and excludes the system schemas <code>pg_catalog</code>, <code>information_schema</code>, and <code>gp_toolkit</code>. Also, the query does not list a view if the view refers to itself.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT v.oid::regclass AS view,</span></span>
<span class="line"><span>  ns.nspname AS schema,       -- view schema,</span></span>
<span class="line"><span>  d.refobjid::regclass AS ref_object -- name of table</span></span>
<span class="line"><span>FROM pg_depend AS d            -- objects that depend on a table</span></span>
<span class="line"><span>  JOIN pg_rewrite AS r        -- rules depending on a table</span></span>
<span class="line"><span>    ON r.oid = d.objid</span></span>
<span class="line"><span>  JOIN pg_class AS v          -- views for the rules</span></span>
<span class="line"><span>    ON v.oid = r.ev_class</span></span>
<span class="line"><span>  JOIN pg_namespace AS ns     -- schema information</span></span>
<span class="line"><span>    ON ns.oid = v.relnamespace</span></span>
<span class="line"><span>WHERE v.relkind = &#39;v&#39;          -- filter views only</span></span>
<span class="line"><span>  -- dependency must be a rule depending on a relation</span></span>
<span class="line"><span>  AND d.classid = &#39;pg_rewrite&#39;::regclass </span></span>
<span class="line"><span>  AND d.refclassid = &#39;pg_class&#39;::regclass  -- referenced objects in pg_class -- tables and views</span></span>
<span class="line"><span>  AND d.deptype = &#39;n&#39;         -- normal dependency</span></span>
<span class="line"><span>  -- qualify object</span></span>
<span class="line"><span>  AND ns.nspname NOT IN (&#39;pg_catalog&#39;, &#39;information_schema&#39;, &#39;gp_toolkit&#39;) -- system schemas</span></span>
<span class="line"><span>  AND NOT (v.oid = d.refobjid) -- not self-referencing dependency</span></span>
<span class="line"><span>;</span></span>
<span class="line"><span>    view    | schema | ref_object</span></span>
<span class="line"><span>------------+--------+------------</span></span>
<span class="line"><span> v1         | public | t1</span></span>
<span class="line"><span> v2         | public | t1</span></span>
<span class="line"><span> v2         | public | t1</span></span>
<span class="line"><span> v2         | public | v1</span></span>
<span class="line"><span> v3         | public | t1</span></span>
<span class="line"><span> vm1        | public | mytest.tm1</span></span>
<span class="line"><span> mytest.vm1 | mytest | t1</span></span>
<span class="line"><span> vm2        | public | mytest.tm1</span></span>
<span class="line"><span> mytest.v2a | mytest | t1</span></span>
<span class="line"><span> mytest.v2a | mytest | t1</span></span>
<span class="line"><span> mytest.v2a | mytest | v1</span></span>
<span class="line"><span>(11 rows)</span></span></code></pre></div><h3 id="listing-view-definitions" tabindex="-1"><a id="view_defs"></a>Listing View Definitions <a class="header-anchor" href="#listing-view-definitions" aria-label="Permalink to &quot;&lt;a id=&quot;view_defs&quot;&gt;&lt;/a&gt;Listing View Definitions&quot;">​</a></h3><p>This query lists the views that depend on <code>t1</code>, the column referenced, and the view definition. The <code>CREATE VIEW</code> command is created by adding the appropriate text to the view definition.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT v.relname AS view,  </span></span>
<span class="line"><span>  d.refobjid::regclass as ref_object,</span></span>
<span class="line"><span>  d.refobjsubid as ref_col, </span></span>
<span class="line"><span>  &#39;CREATE VIEW &#39; || v.relname || &#39; AS &#39; || pg_get_viewdef(v.oid) AS view_def</span></span>
<span class="line"><span>FROM pg_depend AS d</span></span>
<span class="line"><span>  JOIN pg_rewrite AS r</span></span>
<span class="line"><span>    ON r.oid = d.objid</span></span>
<span class="line"><span>  JOIN pg_class AS v</span></span>
<span class="line"><span>    ON v.oid = r.ev_class</span></span>
<span class="line"><span>WHERE NOT (v.oid = d.refobjid) </span></span>
<span class="line"><span>  AND d.refobjid = &#39;t1&#39;::regclass</span></span>
<span class="line"><span>  ORDER BY d.refobjsubid</span></span>
<span class="line"><span>;</span></span>
<span class="line"><span> view | ref_object | ref_col |                  view_def</span></span>
<span class="line"><span>------+------------+---------+--------------------------------------------</span></span>
<span class="line"><span> v1   | t1         |       1 | CREATE VIEW v1 AS  SELECT max(t1.id) AS id+</span></span>
<span class="line"><span>      |            |         |    FROM t1;</span></span>
<span class="line"><span> v2a  | t1         |       1 | CREATE VIEW v2a AS  SELECT t1.val         +</span></span>
<span class="line"><span>      |            |         |    FROM (t1                               +</span></span>
<span class="line"><span>      |            |         |      JOIN v1 USING (id));</span></span>
<span class="line"><span> vt1  | t1         |       1 | CREATE VIEW vt1 AS  SELECT t1.id          +</span></span>
<span class="line"><span>      |            |         |    FROM t1                                +</span></span>
<span class="line"><span>      |            |         |   WHERE (t1.id &lt; 3);</span></span>
<span class="line"><span> v2   | t1         |       1 | CREATE VIEW v2 AS  SELECT t1.val          +</span></span>
<span class="line"><span>      |            |         |    FROM (t1                               +</span></span>
<span class="line"><span>      |            |         |      JOIN v1 USING (id));</span></span>
<span class="line"><span> v2a  | t1         |       2 | CREATE VIEW v2a AS  SELECT t1.val         +</span></span>
<span class="line"><span>      |            |         |    FROM (t1                               +</span></span>
<span class="line"><span>      |            |         |      JOIN v1 USING (id));</span></span>
<span class="line"><span> v3   | t1         |       2 | CREATE VIEW v3 AS  SELECT (t1.val || f()) +</span></span>
<span class="line"><span>      |            |         |    FROM t1;</span></span>
<span class="line"><span> v2   | t1         |       2 | CREATE VIEW v2 AS  SELECT t1.val          +</span></span>
<span class="line"><span>      |            |         |    FROM (t1                               +</span></span>
<span class="line"><span>      |            |         |      JOIN v1 USING (id));</span></span>
<span class="line"><span>(7 rows)</span></span></code></pre></div><h3 id="listing-nested-views" tabindex="-1"><a id="nested_views"></a>Listing Nested Views <a class="header-anchor" href="#listing-nested-views" aria-label="Permalink to &quot;&lt;a id=&quot;nested_views&quot;&gt;&lt;/a&gt;Listing Nested Views&quot;">​</a></h3><p>This CTE query lists information about views that reference another view.</p><p>The <code>WITH</code> clause in this CTE query selects all the views in the user schemas. The main <code>SELECT</code> statement finds all views that reference another view.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>WITH views AS ( SELECT v.relname AS view,</span></span>
<span class="line"><span>  d.refobjid AS ref_object,</span></span>
<span class="line"><span>  v.oid AS view_oid,</span></span>
<span class="line"><span>  ns.nspname AS namespace</span></span>
<span class="line"><span>FROM pg_depend AS d</span></span>
<span class="line"><span>  JOIN pg_rewrite AS r</span></span>
<span class="line"><span>    ON r.oid = d.objid</span></span>
<span class="line"><span>  JOIN pg_class AS v</span></span>
<span class="line"><span>    ON v.oid = r.ev_class</span></span>
<span class="line"><span>  JOIN pg_namespace AS ns</span></span>
<span class="line"><span>    ON ns.oid = v.relnamespace</span></span>
<span class="line"><span>WHERE v.relkind = &#39;v&#39;</span></span>
<span class="line"><span>  AND ns.nspname NOT IN (&#39;pg_catalog&#39;, &#39;information_schema&#39;, &#39;gp_toolkit&#39;) -- exclude system schemas</span></span>
<span class="line"><span>  AND d.deptype = &#39;n&#39;    -- normal dependency</span></span>
<span class="line"><span>  AND NOT (v.oid = d.refobjid) -- not a self-referencing dependency</span></span>
<span class="line"><span> )</span></span>
<span class="line"><span>SELECT views.view, views.namespace AS schema,</span></span>
<span class="line"><span>  views.ref_object::regclass AS ref_view,</span></span>
<span class="line"><span>  ref_nspace.nspname AS ref_schema</span></span>
<span class="line"><span>FROM views </span></span>
<span class="line"><span>  JOIN pg_depend as dep</span></span>
<span class="line"><span>    ON dep.refobjid = views.view_oid </span></span>
<span class="line"><span>  JOIN pg_class AS class</span></span>
<span class="line"><span>    ON views.ref_object = class.oid</span></span>
<span class="line"><span>  JOIN  pg_namespace AS ref_nspace</span></span>
<span class="line"><span>      ON class.relnamespace = ref_nspace.oid</span></span>
<span class="line"><span>  WHERE class.relkind = &#39;v&#39;</span></span>
<span class="line"><span>    AND dep.deptype = &#39;n&#39;    </span></span>
<span class="line"><span>; </span></span>
<span class="line"><span> view | schema | ref_view | ref_schema</span></span>
<span class="line"><span>------+--------+----------+------------</span></span>
<span class="line"><span> v2   | public | v1       | public</span></span>
<span class="line"><span> v2a  | mytest | v1       | public</span></span></code></pre></div><h3 id="example-data" tabindex="-1"><a id="example_data"></a>Example Data <a class="header-anchor" href="#example-data" aria-label="Permalink to &quot;&lt;a id=&quot;example_data&quot;&gt;&lt;/a&gt;Example Data&quot;">​</a></h3><p>The output for the example queries is based on these database objects and data.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE t1 (</span></span>
<span class="line"><span>   id integer PRIMARY KEY,</span></span>
<span class="line"><span>   val text NOT NULL</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSERT INTO t1 VALUES</span></span>
<span class="line"><span>   (1, &#39;one&#39;), (2, &#39;two&#39;), (3, &#39;three&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE FUNCTION f() RETURNS text</span></span>
<span class="line"><span>   LANGUAGE sql AS &#39;SELECT &#39;&#39;suffix&#39;&#39;::text&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE VIEW v1 AS</span></span>
<span class="line"><span>  SELECT max(id) AS id</span></span>
<span class="line"><span>  FROM t1;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>CREATE VIEW v2 AS</span></span>
<span class="line"><span>  SELECT t1.val</span></span>
<span class="line"><span>  FROM t1 JOIN v1 USING (id);</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>CREATE VIEW v3 AS</span></span>
<span class="line"><span>  SELECT val || f()</span></span>
<span class="line"><span>  FROM t1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE VIEW v5 AS</span></span>
<span class="line"><span>  SELECT f() ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE SCHEMA mytest ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE TABLE mytest.tm1 (</span></span>
<span class="line"><span>   id integer PRIMARY KEY,</span></span>
<span class="line"><span>   val text NOT NULL</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSERT INTO mytest.tm1 VALUES</span></span>
<span class="line"><span>   (1, &#39;one&#39;), (2, &#39;two&#39;), (3, &#39;three&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE VIEW vm1 AS</span></span>
<span class="line"><span>  SELECT id FROM mytest.tm1 WHERE id &lt; 3 ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE VIEW mytest.vm1 AS</span></span>
<span class="line"><span>  SELECT id FROM public.t1 WHERE id &lt; 3 ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE VIEW vm2 AS</span></span>
<span class="line"><span>  SELECT max(id) AS id</span></span>
<span class="line"><span>  FROM mytest.tm1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE VIEW mytest.v2a AS</span></span>
<span class="line"><span>  SELECT t1.val</span></span>
<span class="line"><span>  FROM public.t1 JOIN public.v1 USING (id);</span></span></code></pre></div>`,37)]))}const u=n(i,[["render",l]]);export{v as __pageData,u as default};
