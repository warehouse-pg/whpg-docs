import{_ as s,c as a,o as p,ag as l}from"./chunks/framework.Ds6Eueu6.js";const m=JSON.parse('{"title":"gpextprotocal.c","description":"","frontmatter":{},"headers":[],"relativePath":"docs/7x/admin_guide/load/topics/g-gpextprotocalc.md","filePath":"docs/7x/admin_guide/load/topics/g-gpextprotocalc.md"}'),e={name:"docs/7x/admin_guide/load/topics/g-gpextprotocalc.md"};function i(t,n,c,o,r,u){return p(),a("div",null,n[0]||(n[0]=[l(`<h1 id="gpextprotocal-c" tabindex="-1">gpextprotocal.c <a class="header-anchor" href="#gpextprotocal-c" aria-label="Permalink to &quot;gpextprotocal.c&quot;">​</a></h1><hr><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &quot;postgres.h&quot;</span></span>
<span class="line"><span>#include &quot;fmgr.h&quot;</span></span>
<span class="line"><span>#include &quot;funcapi.h&quot; </span></span>
<span class="line"><span>#include &quot;access/extprotocol.h&quot;</span></span>
<span class="line"><span>#include &quot;catalog/pg_proc.h&quot;</span></span>
<span class="line"><span>#include &quot;utils/array.h&quot;</span></span>
<span class="line"><span>#include &quot;utils/builtins.h&quot;</span></span>
<span class="line"><span>#include &quot;utils/memutils.h&quot; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Our chosen URI format. We can change it however needed */</span></span>
<span class="line"><span>typedef struct DemoUri </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>   char     *protocol;</span></span>
<span class="line"><span>   char     *path;</span></span>
<span class="line"><span>}  DemoUri; </span></span>
<span class="line"><span>static DemoUri *ParseDemoUri(const char *uri_str);</span></span>
<span class="line"><span>static void FreeDemoUri(DemoUri* uri); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Do the module magic dance */ </span></span>
<span class="line"><span>PG_MODULE_MAGIC; </span></span>
<span class="line"><span>PG_FUNCTION_INFO_V1(demoprot_export); </span></span>
<span class="line"><span>PG_FUNCTION_INFO_V1(demoprot_import); </span></span>
<span class="line"><span>PG_FUNCTION_INFO_V1(demoprot_validate_urls); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>Datum demoprot_export(PG_FUNCTION_ARGS); </span></span>
<span class="line"><span>Datum demoprot_import(PG_FUNCTION_ARGS); </span></span>
<span class="line"><span>Datum demoprot_validate_urls(PG_FUNCTION_ARGS); </span></span>
<span class="line"><span> </span></span>
<span class="line"><span>/* A user context that persists across calls. Can be </span></span>
<span class="line"><span>declared in any other way */</span></span>
<span class="line"><span>typedef struct { </span></span>
<span class="line"><span>  char    *url; </span></span>
<span class="line"><span>  char    *filename; </span></span>
<span class="line"><span>  FILE    *file; </span></span>
<span class="line"><span>} extprotocol_t; </span></span>
<span class="line"><span>/* </span></span>
<span class="line"><span>* The read function - Import data into GPDB.</span></span>
<span class="line"><span>*/ </span></span>
<span class="line"><span>Datum </span></span>
<span class="line"><span>myprot_import(PG_FUNCTION_ARGS) </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>  extprotocol_t   *myData; </span></span>
<span class="line"><span>  char            *data; </span></span>
<span class="line"><span>  int             datlen; </span></span>
<span class="line"><span>  size_t          nread = 0; </span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  /* Must be called via the external table format manager */ </span></span>
<span class="line"><span>  if (!CALLED_AS_EXTPROTOCOL(fcinfo)) </span></span>
<span class="line"><span>    elog(ERROR, &quot;myprot_import: not called by external</span></span>
<span class="line"><span>       protocol manager&quot;); </span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  /* Get our internal description of the protocol */ </span></span>
<span class="line"><span>  myData = (extprotocol_t *) EXTPROTOCOL_GET_USER_CTX(fcinfo); </span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  if(EXTPROTOCOL_IS_LAST_CALL(fcinfo)) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    /* we&#39;re done receiving data. close our connection */ </span></span>
<span class="line"><span>    if(myData &amp;&amp; myData-&gt;file) </span></span>
<span class="line"><span>      if(fclose(myData-&gt;file)) </span></span>
<span class="line"><span>        ereport(ERROR, </span></span>
<span class="line"><span>          (errcode_for_file_access(), </span></span>
<span class="line"><span>           errmsg(&quot;could not close file \\&quot;%s\\&quot;: %m&quot;, </span></span>
<span class="line"><span>               myData-&gt;filename))); </span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>    PG_RETURN_INT32(0); </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (myData == NULL) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    /* first call. do any desired init */ </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const char    *p_name = &quot;myprot&quot;; </span></span>
<span class="line"><span>    DemoUri       *parsed_url; </span></span>
<span class="line"><span>    char          *url = EXTPROTOCOL_GET_URL(fcinfo); </span></span>
<span class="line"><span>    myData        = palloc(sizeof(extprotocol_t)); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    myData-&gt;url   = pstrdup(url); </span></span>
<span class="line"><span>    parsed_url    = ParseDemoUri(myData-&gt;url); </span></span>
<span class="line"><span>    myData-&gt;filename = pstrdup(parsed_url-&gt;path); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if(strcasecmp(parsed_url-&gt;protocol, p_name) != 0) </span></span>
<span class="line"><span>      elog(ERROR, &quot;internal error: myprot called with a</span></span>
<span class="line"><span>          different protocol (%s)&quot;, </span></span>
<span class="line"><span>            parsed_url-&gt;protocol); </span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>    FreeDemoUri(parsed_url); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    /* open the destination file (or connect to remote server in</span></span>
<span class="line"><span>       other cases) */ </span></span>
<span class="line"><span>    myData-&gt;file = fopen(myData-&gt;filename, &quot;r&quot;); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (myData-&gt;file == NULL) </span></span>
<span class="line"><span>      ereport(ERROR, </span></span>
<span class="line"><span>          (errcode_for_file_access(), </span></span>
<span class="line"><span>           errmsg(&quot;myprot_import: could not open file \\&quot;%s\\&quot;</span></span>
<span class="line"><span>             for reading: %m&quot;, </span></span>
<span class="line"><span>             myData-&gt;filename), </span></span>
<span class="line"><span>           errOmitLocation(true))); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    EXTPROTOCOL_SET_USER_CTX(fcinfo, myData); </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  /* ========================================== </span></span>
<span class="line"><span>   *          DO THE IMPORT </span></span>
<span class="line"><span>   * ========================================== */ </span></span>
<span class="line"><span>  data    = EXTPROTOCOL_GET_DATABUF(fcinfo); </span></span>
<span class="line"><span>  datlen  = EXTPROTOCOL_GET_DATALEN(fcinfo); </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* read some bytes (with fread in this example, but normally</span></span>
<span class="line"><span>     in some other method over the network) */</span></span>
<span class="line"><span>  if(datlen &gt; 0) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    nread = fread(data, 1, datlen, myData-&gt;file); </span></span>
<span class="line"><span>    if (ferror(myData-&gt;file)) </span></span>
<span class="line"><span>      ereport(ERROR, </span></span>
<span class="line"><span>        (errcode_for_file_access(), </span></span>
<span class="line"><span>          errmsg(&quot;myprot_import: could not write to file</span></span>
<span class="line"><span>            \\&quot;%s\\&quot;: %m&quot;, </span></span>
<span class="line"><span>            myData-&gt;filename))); </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  PG_RETURN_INT32((int)nread); </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* </span></span>
<span class="line"><span> * Write function - Export data out of GPDB </span></span>
<span class="line"><span> */ </span></span>
<span class="line"><span>Datum  </span></span>
<span class="line"><span>myprot_export(PG_FUNCTION_ARGS) </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>  extprotocol_t  *myData; </span></span>
<span class="line"><span>  char           *data; </span></span>
<span class="line"><span>  int            datlen; </span></span>
<span class="line"><span>  size_t         wrote = 0; </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* Must be called via the external table format manager */ </span></span>
<span class="line"><span>  if (!CALLED_AS_EXTPROTOCOL(fcinfo)) </span></span>
<span class="line"><span>    elog(ERROR, &quot;myprot_export: not called by external</span></span>
<span class="line"><span>       protocol manager&quot;); </span></span>
<span class="line"><span>       </span></span>
<span class="line"><span>  /* Get our internal description of the protocol */ </span></span>
<span class="line"><span>  myData = (extprotocol_t *) EXTPROTOCOL_GET_USER_CTX(fcinfo); </span></span>
<span class="line"><span>  if(EXTPROTOCOL_IS_LAST_CALL(fcinfo)) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    /* we&#39;re done sending data. close our connection */ </span></span>
<span class="line"><span>    if(myData &amp;&amp; myData-&gt;file) </span></span>
<span class="line"><span>      if(fclose(myData-&gt;file)) </span></span>
<span class="line"><span>        ereport(ERROR, </span></span>
<span class="line"><span>            (errcode_for_file_access(), </span></span>
<span class="line"><span>              errmsg(&quot;could not close file \\&quot;%s\\&quot;: %m&quot;, </span></span>
<span class="line"><span>                 myData-&gt;filename))); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    PG_RETURN_INT32(0); </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (myData == NULL) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    /* first call. do any desired init */ </span></span>
<span class="line"><span>    const char *p_name = &quot;myprot&quot;; </span></span>
<span class="line"><span>    DemoUri    *parsed_url; </span></span>
<span class="line"><span>    char       *url = EXTPROTOCOL_GET_URL(fcinfo); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    myData           = palloc(sizeof(extprotocol_t)); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    myData-&gt;url      = pstrdup(url); </span></span>
<span class="line"><span>    parsed_url       = ParseDemoUri(myData-&gt;url); </span></span>
<span class="line"><span>    myData-&gt;filename = pstrdup(parsed_url-&gt;path); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if(strcasecmp(parsed_url-&gt;protocol, p_name) != 0) </span></span>
<span class="line"><span>      elog(ERROR, &quot;internal error: myprot called with a </span></span>
<span class="line"><span>         different protocol (%s)&quot;, </span></span>
<span class="line"><span>         parsed_url-&gt;protocol); </span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>    FreeDemoUri(parsed_url); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    /* open the destination file (or connect to remote server in</span></span>
<span class="line"><span>    other cases) */ </span></span>
<span class="line"><span>    myData-&gt;file = fopen(myData-&gt;filename, &quot;a&quot;); </span></span>
<span class="line"><span>    if (myData-&gt;file == NULL) </span></span>
<span class="line"><span>      ereport(ERROR, </span></span>
<span class="line"><span>        (errcode_for_file_access(), </span></span>
<span class="line"><span>           errmsg(&quot;myprot_export: could not open file \\&quot;%s\\&quot;</span></span>
<span class="line"><span>             for writing: %m&quot;, </span></span>
<span class="line"><span>             myData-&gt;filename), </span></span>
<span class="line"><span>         errOmitLocation(true))); </span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>    EXTPROTOCOL_SET_USER_CTX(fcinfo, myData); </span></span>
<span class="line"><span>  } </span></span>
<span class="line"><span>  /* ======================================== </span></span>
<span class="line"><span>   *      DO THE EXPORT </span></span>
<span class="line"><span>   * ======================================== */ </span></span>
<span class="line"><span>  data   = EXTPROTOCOL_GET_DATABUF(fcinfo); </span></span>
<span class="line"><span>  datlen   = EXTPROTOCOL_GET_DATALEN(fcinfo); </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if(datlen &gt; 0) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    wrote = fwrite(data, 1, datlen, myData-&gt;file); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (ferror(myData-&gt;file)) </span></span>
<span class="line"><span>      ereport(ERROR, </span></span>
<span class="line"><span>        (errcode_for_file_access(), </span></span>
<span class="line"><span>         errmsg(&quot;myprot_import: could not read from file</span></span>
<span class="line"><span>            \\&quot;%s\\&quot;: %m&quot;, </span></span>
<span class="line"><span>            myData-&gt;filename))); </span></span>
<span class="line"><span>  } </span></span>
<span class="line"><span>  PG_RETURN_INT32((int)wrote); </span></span>
<span class="line"><span>} </span></span>
<span class="line"><span>Datum  </span></span>
<span class="line"><span>myprot_validate_urls(PG_FUNCTION_ARGS) </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>  List         *urls; </span></span>
<span class="line"><span>  int          nurls; </span></span>
<span class="line"><span>  int          i; </span></span>
<span class="line"><span>  ValidatorDirection  direction; </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* Must be called via the external table format manager */ </span></span>
<span class="line"><span>  if (!CALLED_AS_EXTPROTOCOL_VALIDATOR(fcinfo)) </span></span>
<span class="line"><span>    elog(ERROR, &quot;myprot_validate_urls: not called by external</span></span>
<span class="line"><span>       protocol manager&quot;);</span></span>
<span class="line"><span>       </span></span>
<span class="line"><span>  nurls       = EXTPROTOCOL_VALIDATOR_GET_NUM_URLS(fcinfo); </span></span>
<span class="line"><span>  urls        = EXTPROTOCOL_VALIDATOR_GET_URL_LIST(fcinfo); </span></span>
<span class="line"><span>  direction   = EXTPROTOCOL_VALIDATOR_GET_DIRECTION(fcinfo); </span></span>
<span class="line"><span>  /* </span></span>
<span class="line"><span>   * Dumb example 1: search each url for a substring  </span></span>
<span class="line"><span>   * we don&#39;t want to be used in a url. in this example </span></span>
<span class="line"><span>   * it&#39;s &#39;secured_directory&#39;. </span></span>
<span class="line"><span>   */ </span></span>
<span class="line"><span>  for (i = 1 ; i &lt;= nurls ; i++) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    char *url = EXTPROTOCOL_VALIDATOR_GET_NTH_URL(fcinfo, i); </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (strstr(url, &quot;secured_directory&quot;) != 0) </span></span>
<span class="line"><span>    { </span></span>
<span class="line"><span>      ereport(ERROR, </span></span>
<span class="line"><span>       (errcode(ERRCODE_PROTOCOL_VIOLATION), </span></span>
<span class="line"><span>          errmsg(&quot;using &#39;secured_directory&#39; in a url</span></span>
<span class="line"><span>            isn&#39;t allowed &quot;))); </span></span>
<span class="line"><span>    } </span></span>
<span class="line"><span>  } </span></span>
<span class="line"><span>  /* </span></span>
<span class="line"><span>   * Dumb example 2: set a limit on the number of urls  </span></span>
<span class="line"><span>   * used. In this example we limit readable external </span></span>
<span class="line"><span>   * tables that use our protocol to 2 urls max. </span></span>
<span class="line"><span>   */ </span></span>
<span class="line"><span>  if(direction == EXT_VALIDATE_READ &amp;&amp; nurls &gt; 2) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    ereport(ERROR, </span></span>
<span class="line"><span>      (errcode(ERRCODE_PROTOCOL_VIOLATION), </span></span>
<span class="line"><span>        errmsg(&quot;more than 2 urls aren&#39;t allowed in this protocol &quot;))); </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  PG_RETURN_VOID(); </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* --- utility functions --- */ </span></span>
<span class="line"><span>static  </span></span>
<span class="line"><span>DemoUri *ParseDemoUri(const char *uri_str) </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>  DemoUri *uri = (DemoUri *) palloc0(sizeof(DemoUri)); </span></span>
<span class="line"><span>  int     protocol_len; </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>   uri-&gt;path = NULL; </span></span>
<span class="line"><span>   uri-&gt;protocol = NULL; </span></span>
<span class="line"><span>  /* </span></span>
<span class="line"><span>   * parse protocol </span></span>
<span class="line"><span>   */ </span></span>
<span class="line"><span>  char *post_protocol = strstr(uri_str, &quot;://&quot;); </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if(!post_protocol) </span></span>
<span class="line"><span>  { </span></span>
<span class="line"><span>    ereport(ERROR, </span></span>
<span class="line"><span>      (errcode(ERRCODE_SYNTAX_ERROR), </span></span>
<span class="line"><span>       errmsg(&quot;invalid protocol URI \\&#39;%s\\&#39;&quot;, uri_str), </span></span>
<span class="line"><span>       errOmitLocation(true))); </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  protocol_len = post_protocol - uri_str; </span></span>
<span class="line"><span>  uri-&gt;protocol = (char *)palloc0(protocol_len + 1); </span></span>
<span class="line"><span>  strncpy(uri-&gt;protocol, uri_str, protocol_len); </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* make sure there is more to the uri string */ </span></span>
<span class="line"><span>  if (strlen(uri_str) &lt;= protocol_len) </span></span>
<span class="line"><span>    ereport(ERROR, </span></span>
<span class="line"><span>      (errcode(ERRCODE_SYNTAX_ERROR), </span></span>
<span class="line"><span>       errmsg(&quot;invalid myprot URI \\&#39;%s\\&#39; : missing path&quot;,</span></span>
<span class="line"><span>         uri_str), </span></span>
<span class="line"><span>      errOmitLocation(true))); </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  /* parse path */ </span></span>
<span class="line"><span>  uri-&gt;path = pstrdup(uri_str + protocol_len + strlen(&quot;://&quot;));</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  return uri; </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static </span></span>
<span class="line"><span>void FreeDemoUri(DemoUri *uri) </span></span>
<span class="line"><span>{ </span></span>
<span class="line"><span>  if (uri-&gt;path) </span></span>
<span class="line"><span>    pfree(uri-&gt;path); </span></span>
<span class="line"><span>  if (uri-&gt;protocol) </span></span>
<span class="line"><span>    pfree(uri-&gt;protocol); </span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>  pfree(uri); </span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Parent topic:</strong> <a href="./../../load/topics/g-installing-the-external-table-protocol.html">Installing the External Table Protocol</a></p>`,4)]))}const d=s(e,[["render",i]]);export{m as __pageData,d as default};
