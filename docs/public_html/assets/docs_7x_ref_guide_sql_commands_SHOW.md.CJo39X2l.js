import{_ as e,c as s,o as t,ag as n}from"./chunks/framework.Ds6Eueu6.js";const u=JSON.parse('{"title":"SHOW","description":"","frontmatter":{},"headers":[],"relativePath":"docs/7x/ref_guide/sql_commands/SHOW.md","filePath":"docs/7x/ref_guide/sql_commands/SHOW.md"}'),o={name:"docs/7x/ref_guide/sql_commands/SHOW.md"};function i(r,a,p,l,c,d){return t(),s("div",null,a[0]||(a[0]=[n(`<h1 id="show" tabindex="-1">SHOW <a class="header-anchor" href="#show" aria-label="Permalink to &quot;SHOW&quot;">​</a></h1><p>Shows the value of a run-time system configuration parameter.</p><h2 id="synopsis" tabindex="-1"><a id="section2"></a>Synopsis <a class="header-anchor" href="#synopsis" aria-label="Permalink to &quot;&lt;a id=&quot;section2&quot;&gt;&lt;/a&gt;Synopsis&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SHOW &lt;name&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SHOW ALL</span></span></code></pre></div><h2 id="description" tabindex="-1"><a id="section3"></a>Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;&lt;a id=&quot;section3&quot;&gt;&lt;/a&gt;Description&quot;">​</a></h2><p><code>SHOW</code> displays the current settings of WarehousePG run-time system configuration parameters. You can set these parameters with the <code>SET</code> statement, by editing the <code>postgresql.conf</code> configuration file of the WarehousePG coordinator, through the <code>PGOPTIONS</code> environment variable (when using libpq or a libpq-based application), or through command-line flags when starting the WarehousePG server.</p><h2 id="parameters" tabindex="-1"><a id="section4"></a>Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;&lt;a id=&quot;section4&quot;&gt;&lt;/a&gt;Parameters&quot;">​</a></h2><p>name : The name of a run-time system configuration parameter.</p><p>: Some parameters viewable by <code>SHOW</code> are read-only — you can view their values but not set them:</p><pre><code>SERVER_VERSION
:   Shows the version number of the WarehousePG server.

SERVER_ENCODING
:   Shows the server-side character set encoding. You can show, but not set, this parameter because the encoding is determined at database creation time.

LC_COLLATE
:   Shows the database&#39;s locale setting for collation (text ordering). You can show, but not set, this parameter because the setting is determined at database creation time.

LC_CTYPE
:   Shows the database&#39;s locale setting for character classification; You can show, but not set, this parameter because the setting is determined at database creation time.

IS_SUPERUSER
:   True if the current role has superuser privileges.
</code></pre><p>ALL : Shows the current value of all configuration parameters, with descriptions.</p><h2 id="notes" tabindex="-1"><a id="section4n"></a>Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;&lt;a id=&quot;section4n&quot;&gt;&lt;/a&gt;Notes&quot;">​</a></h2><p>The function <code>current_setting()</code> produces equivalent output; see <a href="https://www.postgresql.org/docs/12/functions-admin.html" target="_blank" rel="noreferrer">System Administration Functions</a> in the PostgreSQL documentation. Also, the <a href="https://www.postgresql.org/docs/12/view-pg-settings.html" target="_blank" rel="noreferrer">pg_settings</a> system view produces the same information.</p><h2 id="examples" tabindex="-1"><a id="section5"></a>Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;&lt;a id=&quot;section5&quot;&gt;&lt;/a&gt;Examples&quot;">​</a></h2><p>Show the current setting of the parameter <code>DateStyle</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SHOW DateStyle;</span></span>
<span class="line"><span> DateStyle</span></span>
<span class="line"><span>-----------</span></span>
<span class="line"><span> ISO, MDY</span></span>
<span class="line"><span>(1 row)</span></span></code></pre></div><p>Show the current setting of the parameter <code>row_security</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SHOW row_security;</span></span>
<span class="line"><span> row_security</span></span>
<span class="line"><span>--------------</span></span>
<span class="line"><span> on</span></span>
<span class="line"><span>(1 row)</span></span></code></pre></div><p>Show the current setting of all parameters:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SHOW ALL;</span></span>
<span class="line"><span>       name       | setting |                  description</span></span>
<span class="line"><span>-----------------+---------+----------------------------------------------------</span></span>
<span class="line"><span> application_name | psql    | Sets the application name to be reported in sta...</span></span>
<span class="line"><span></span></span>
<span class="line"><span> ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span> xmlbinary        | base64  | Sets how binary values are to be encoded in XML.</span></span>
<span class="line"><span> xmloption        | content | Sets whether XML data in implicit parsing and s...</span></span>
<span class="line"><span>(473 rows)</span></span></code></pre></div><h2 id="compatibility" tabindex="-1"><a id="section6"></a>Compatibility <a class="header-anchor" href="#compatibility" aria-label="Permalink to &quot;&lt;a id=&quot;section6&quot;&gt;&lt;/a&gt;Compatibility&quot;">​</a></h2><p>The <code>SHOW</code> command is a WarehousePG extension.</p><h2 id="see-also" tabindex="-1"><a id="section7"></a>See Also <a class="header-anchor" href="#see-also" aria-label="Permalink to &quot;&lt;a id=&quot;section7&quot;&gt;&lt;/a&gt;See Also&quot;">​</a></h2><p><a href="./SET.html">SET</a>, <a href="./RESET.html">RESET</a></p><p><strong>Parent topic:</strong> <a href="./../sql_commands/sql_ref.html">SQL Commands</a></p>`,25)]))}const m=e(o,[["render",i]]);export{u as __pageData,m as default};
