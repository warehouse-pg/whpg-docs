import{_ as s,c as n,o as e,ag as t}from"./chunks/framework.Ds6Eueu6.js";const R=JSON.parse('{"title":"CREATE GROUP","description":"","frontmatter":{},"headers":[],"relativePath":"docs/7x/ref_guide/sql_commands/CREATE_GROUP.md","filePath":"docs/7x/ref_guide/sql_commands/CREATE_GROUP.md"}'),p={name:"docs/7x/ref_guide/sql_commands/CREATE_GROUP.md"};function l(i,a,o,c,r,d){return e(),n("div",null,a[0]||(a[0]=[t(`<h1 id="create-group" tabindex="-1">CREATE GROUP <a class="header-anchor" href="#create-group" aria-label="Permalink to &quot;CREATE GROUP&quot;">​</a></h1><p>Defines a new database role.</p><h2 id="synopsis" tabindex="-1"><a id="section2"></a>Synopsis <a class="header-anchor" href="#synopsis" aria-label="Permalink to &quot;&lt;a id=&quot;section2&quot;&gt;&lt;/a&gt;Synopsis&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE GROUP &lt;name&gt; [[WITH] &lt;option&gt; [ ... ]]</span></span></code></pre></div><p>where option can be:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>      SUPERUSER | NOSUPERUSER</span></span>
<span class="line"><span>    | CREATEDB | NOCREATEDB</span></span>
<span class="line"><span>    | CREATEROLE | NOCREATEROLE</span></span>
<span class="line"><span>    | CREATEEXTTABLE | NOCREATEEXTTABLE </span></span>
<span class="line"><span>      [ ( &lt;attribute&gt;=&#39;&lt;value&gt;&#39;[, ...] ) ]</span></span>
<span class="line"><span>           where &lt;attributes&gt; and &lt;value&gt; are:</span></span>
<span class="line"><span>           type=&#39;readable&#39;|&#39;writable&#39;</span></span>
<span class="line"><span>           protocol=&#39;gpfdist&#39;|&#39;http&#39;</span></span>
<span class="line"><span>    | INHERIT | NOINHERIT</span></span>
<span class="line"><span>    | LOGIN | NOLOGIN</span></span>
<span class="line"><span>    | REPLICATION | NOREPLICATION</span></span>
<span class="line"><span>    | BYPASSRLS | NOBYPASSRLS</span></span>
<span class="line"><span>    | CONNECTION LIMIT &lt;connlimit&gt;</span></span>
<span class="line"><span>    | [ ENCRYPTED | UNENCRYPTED ] PASSWORD &#39;&lt;password&gt;&#39; | PASSWORD NULL</span></span>
<span class="line"><span>    | VALID UNTIL &#39;&lt;timestamp&gt;&#39; </span></span>
<span class="line"><span>    | IN ROLE &lt;role_name&gt; [, ...]</span></span>
<span class="line"><span>    | IN GROUP &lt;role_name&gt; [, ...]</span></span>
<span class="line"><span>    | ROLE &lt;role_name&gt; [, ...]</span></span>
<span class="line"><span>    | ADMIN &lt;role_name&gt; [, ...]</span></span>
<span class="line"><span>    | USER &lt;role_name&gt; [, ...]</span></span>
<span class="line"><span>    | SYSID &lt;uid&gt; [, ...]</span></span>
<span class="line"><span>    | RESOURCE QUEUE &lt;queue_name&gt;</span></span>
<span class="line"><span>    | RESOURCE GROUP &lt;group_name&gt;</span></span>
<span class="line"><span>    | [ DENY &lt;deny_point&gt; ]</span></span>
<span class="line"><span>    | [ DENY BETWEEN &lt;deny_point&gt; AND &lt;deny_point&gt;]</span></span></code></pre></div><h2 id="description" tabindex="-1"><a id="section3"></a>Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;&lt;a id=&quot;section3&quot;&gt;&lt;/a&gt;Description&quot;">​</a></h2><p><code>CREATE GROUP</code> is an alias for <a href="./CREATE_ROLE.html">CREATE ROLE</a>.</p><h2 id="compatibility" tabindex="-1"><a id="section4"></a>Compatibility <a class="header-anchor" href="#compatibility" aria-label="Permalink to &quot;&lt;a id=&quot;section4&quot;&gt;&lt;/a&gt;Compatibility&quot;">​</a></h2><p>There is no <code>CREATE GROUP</code> statement in the SQL standard.</p><h2 id="see-also" tabindex="-1"><a id="section5"></a>See Also <a class="header-anchor" href="#see-also" aria-label="Permalink to &quot;&lt;a id=&quot;section5&quot;&gt;&lt;/a&gt;See Also&quot;">​</a></h2><p><a href="./CREATE_ROLE.html">CREATE ROLE</a></p><p><strong>Parent topic:</strong> <a href="./../sql_commands/sql_ref.html">SQL Commands</a></p>`,13)]))}const h=s(p,[["render",l]]);export{R as __pageData,h as default};
