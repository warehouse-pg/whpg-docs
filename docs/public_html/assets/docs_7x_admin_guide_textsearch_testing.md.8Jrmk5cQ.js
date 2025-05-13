import{_ as a,c as n,o as e,ag as t}from"./chunks/framework.Ds6Eueu6.js";const g=JSON.parse('{"title":"Testing and Debugging Text Search","description":"","frontmatter":{},"headers":[],"relativePath":"docs/7x/admin_guide/textsearch/testing.md","filePath":"docs/7x/admin_guide/textsearch/testing.md"}'),i={name:"docs/7x/admin_guide/textsearch/testing.md"};function p(l,s,o,c,d,r){return e(),n("div",null,s[0]||(s[0]=[t(`<h1 id="testing-and-debugging-text-search" tabindex="-1">Testing and Debugging Text Search <a class="header-anchor" href="#testing-and-debugging-text-search" aria-label="Permalink to &quot;Testing and Debugging Text Search&quot;">​</a></h1><hr><p>This topic introduces the WarehousePG functions you can use to test and debug a search configuration or the individual parser and dictionaries specified in a configuration.</p><p>The behavior of a custom text search configuration can easily become confusing. The functions described in this section are useful for testing text search objects. You can test a complete configuration, or test parsers and dictionaries separately.</p><p>This section contains the following subtopics:</p><ul><li><a href="#configuration">Configuration Testing</a></li><li><a href="#parser">Parser Testing</a></li><li><a href="#dictionary">Dictionary Testing</a></li></ul><h2 id="configuration-testing" tabindex="-1"><a id="configuration"></a>Configuration Testing <a class="header-anchor" href="#configuration-testing" aria-label="Permalink to &quot;&lt;a id=&quot;configuration&quot;&gt;&lt;/a&gt;Configuration Testing&quot;">​</a></h2><p>The function <code>ts_debug</code> allows easy testing of a text search configuration.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts_debug([&lt;config&gt; regconfig, ] &lt;document&gt; text,</span></span>
<span class="line"><span>         OUT &lt;alias&gt; text,</span></span>
<span class="line"><span>         OUT &lt;description&gt; text,</span></span>
<span class="line"><span>         OUT &lt;token&gt; text,</span></span>
<span class="line"><span>         OUT &lt;dictionaries&gt; regdictionary[],</span></span>
<span class="line"><span>         OUT &lt;dictionary&gt; regdictionary,</span></span>
<span class="line"><span>         OUT &lt;lexemes&gt; text[])</span></span>
<span class="line"><span>         returns setof record</span></span></code></pre></div><p><code>ts_debug</code> displays information about every token of <code>*document*</code> as produced by the parser and processed by the configured dictionaries. It uses the configuration specified by <code>*config*</code>, or <code>default_text_search_config</code> if that argument is omitted.</p><p><code>ts_debug</code> returns one row for each token identified in the text by the parser. The columns returned are</p><ul><li><code>*alias* text</code> — short name of the token type</li><li><code>*description* text</code> — description of the token type</li><li><code>*token* text</code>— text of the token</li><li><code>*dictionaries* regdictionary[]</code> — the dictionaries selected by the configuration for this token type</li><li><code>*dictionary* regdictionary</code> — the dictionary that recognized the token, or <code>NULL</code> if none did</li><li><code>*lexemes* text[]</code> — the lexeme(s) produced by the dictionary that recognized the token, or <code>NULL</code> if none did; an empty array (<code>{}</code>) means it was recognized as a stop word</li></ul><p>Here is a simple example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT * FROM ts_debug(&#39;english&#39;, &#39;a fat  cat sat on a mat - it ate a fat rats&#39;);</span></span>
<span class="line"><span>   alias   |   description   | token |  dictionaries  |  dictionary  | lexemes </span></span>
<span class="line"><span>-----------+-----------------+-------+----------------+--------------+---------</span></span>
<span class="line"><span> asciiword | Word, all ASCII | a     | {english_stem} | english_stem | {}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | fat   | {english_stem} | english_stem | {fat}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | cat   | {english_stem} | english_stem | {cat}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | sat   | {english_stem} | english_stem | {sat}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | on    | {english_stem} | english_stem | {}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | a     | {english_stem} | english_stem | {}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | mat   | {english_stem} | english_stem | {mat}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> blank     | Space symbols   | -     | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | it    | {english_stem} | english_stem | {}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | ate   | {english_stem} | english_stem | {ate}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | a     | {english_stem} | english_stem | {}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | fat   | {english_stem} | english_stem | {fat}</span></span>
<span class="line"><span> blank     | Space symbols   |       | {}             |              | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | rats  | {english_stem} | english_stem | {rat}</span></span></code></pre></div><p>For a more extensive demonstration, we first create a <code>public.english</code> configuration and Ispell dictionary for the English language:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TEXT SEARCH CONFIGURATION public.english ( COPY = pg_catalog.english );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE TEXT SEARCH DICTIONARY english_ispell (</span></span>
<span class="line"><span>    TEMPLATE = ispell,</span></span>
<span class="line"><span>    DictFile = english,</span></span>
<span class="line"><span>    AffFile = english,</span></span>
<span class="line"><span>    StopWords = english</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ALTER TEXT SEARCH CONFIGURATION public.english</span></span>
<span class="line"><span>   ALTER MAPPING FOR asciiword WITH english_ispell, english_stem;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT * FROM ts_debug(&#39;public.english&#39;, &#39;The Brightest supernovaes&#39;);</span></span>
<span class="line"><span>   alias   |   description   |    token    |         dictionaries          |   dictionary   |   lexemes   </span></span>
<span class="line"><span>-----------+-----------------+-------------+-------------------------------+----------------+-------------</span></span>
<span class="line"><span> asciiword | Word, all ASCII | The         | {english_ispell,english_stem} | english_ispell | {}</span></span>
<span class="line"><span> blank     | Space symbols   |             | {}                            |                | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | Brightest   | {english_ispell,english_stem} | english_ispell | {bright}</span></span>
<span class="line"><span> blank     | Space symbols   |             | {}                            |                | </span></span>
<span class="line"><span> asciiword | Word, all ASCII | supernovaes | {english_ispell,english_stem} | english_stem   | {supernova}</span></span></code></pre></div><p>In this example, the word <code>Brightest</code> was recognized by the parser as an <code>ASCII</code> word (alias <code>asciiword</code>). For this token type the dictionary list is <code>english_ispell</code> and <code>english_stem</code>. The word was recognized by <code>english_ispell</code>, which reduced it to the noun <code>bright</code>. The word <code>supernovaes</code> is unknown to the <code>english_ispell</code> dictionary so it was passed to the next dictionary, and, fortunately, was recognized (in fact, <code>english_stem</code> is a Snowball dictionary which recognizes everything; that is why it was placed at the end of the dictionary list).</p><p>The word <code>The</code> was recognized by the <code>english_ispell</code> dictionary as a stop word (<a href="./dictionaries.html#stop-words">Stop Words</a>) and will not be indexed. The spaces are discarded too, since the configuration provides no dictionaries at all for them.</p><p>You can reduce the width of the output by explicitly specifying which columns you want to see:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT alias, token, dictionary, lexemes FROM ts_debug(&#39;public.english&#39;, &#39;The Brightest supernovaes&#39;); </span></span>
<span class="line"><span>  alias    |    token    |   dictionary   |    lexemes </span></span>
<span class="line"><span>-----------+-------------+----------------+------------- </span></span>
<span class="line"><span> asciiword | The         | english_ispell | {} </span></span>
<span class="line"><span> blank     |             |                | </span></span>
<span class="line"><span> asciiword | Brightest   | english_ispell | {bright} </span></span>
<span class="line"><span> blank     |             |                | </span></span>
<span class="line"><span> asciiword | supernovaes | english_stem   | {supernova}</span></span></code></pre></div><h2 id="parser-testing" tabindex="-1"><a id="parser"></a>Parser Testing <a class="header-anchor" href="#parser-testing" aria-label="Permalink to &quot;&lt;a id=&quot;parser&quot;&gt;&lt;/a&gt;Parser Testing&quot;">​</a></h2><p>The following functions allow direct testing of a text search parser.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts_parse(&lt;parser_name&gt; text, &lt;document&gt; text,</span></span>
<span class="line"><span>         OUT &lt;tokid&gt; integer, OUT &lt;token&gt; text) returns setof record</span></span>
<span class="line"><span>ts_parse(&lt;parser_oid&gt; oid, &lt;document&gt; text,</span></span>
<span class="line"><span>         OUT &lt;tokid&gt; integer, OUT &lt;token&gt; text) returns setof record</span></span></code></pre></div><p><code>ts_parse</code> parses the given document and returns a series of records, one for each token produced by parsing. Each record includes a <code>tokid</code> showing the assigned token type and a <code>token</code>, which is the text of the token. For example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT * FROM ts_parse(&#39;default&#39;, &#39;123 - a number&#39;);</span></span>
<span class="line"><span> tokid | token</span></span>
<span class="line"><span>-------+--------</span></span>
<span class="line"><span>    22 | 123</span></span>
<span class="line"><span>    12 |</span></span>
<span class="line"><span>    12 | -</span></span>
<span class="line"><span>     1 | a</span></span>
<span class="line"><span>    12 |</span></span>
<span class="line"><span>     1 | number</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts_token_type(&lt;parser_name&gt; text, OUT &lt;tokid&gt; integer,</span></span>
<span class="line"><span>              OUT &lt;alias&gt; text, OUT &lt;description&gt; text) returns setof record</span></span>
<span class="line"><span>ts_token_type(&lt;parser_oid&gt; oid, OUT &lt;tokid&gt; integer,</span></span>
<span class="line"><span>              OUT &lt;alias&gt; text, OUT &lt;description&gt; text) returns setof record</span></span></code></pre></div><p><code>ts_token_type</code> returns a table which describes each type of token the specified parser can recognize. For each token type, the table gives the integer <code>tokid</code> that the parser uses to label a token of that type, the <code>alias</code> that names the token type in configuration commands, and a short <code>description</code>. For example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT * FROM ts_token_type(&#39;default&#39;);</span></span>
<span class="line"><span> tokid |      alias      |               description                </span></span>
<span class="line"><span>-------+-----------------+------------------------------------------</span></span>
<span class="line"><span>     1 | asciiword       | Word, all ASCII</span></span>
<span class="line"><span>     2 | word            | Word, all letters</span></span>
<span class="line"><span>     3 | numword         | Word, letters and digits</span></span>
<span class="line"><span>     4 | email           | Email address</span></span>
<span class="line"><span>     5 | url             | URL</span></span>
<span class="line"><span>     6 | host            | Host</span></span>
<span class="line"><span>     7 | sfloat          | Scientific notation</span></span>
<span class="line"><span>     8 | version         | Version number</span></span>
<span class="line"><span>     9 | hword_numpart   | Hyphenated word part, letters and digits</span></span>
<span class="line"><span>    10 | hword_part      | Hyphenated word part, all letters</span></span>
<span class="line"><span>    11 | hword_asciipart | Hyphenated word part, all ASCII</span></span>
<span class="line"><span>    12 | blank           | Space symbols</span></span>
<span class="line"><span>    13 | tag             | XML tag</span></span>
<span class="line"><span>    14 | protocol        | Protocol head</span></span>
<span class="line"><span>    15 | numhword        | Hyphenated word, letters and digits</span></span>
<span class="line"><span>    16 | asciihword      | Hyphenated word, all ASCII</span></span>
<span class="line"><span>    17 | hword           | Hyphenated word, all letters</span></span>
<span class="line"><span>    18 | url_path        | URL path</span></span>
<span class="line"><span>    19 | file            | File or path name</span></span>
<span class="line"><span>    20 | float           | Decimal notation</span></span>
<span class="line"><span>    21 | int             | Signed integer</span></span>
<span class="line"><span>    22 | uint            | Unsigned integer</span></span>
<span class="line"><span>    23 | entity          | XML entity</span></span></code></pre></div><h2 id="dictionary-testing" tabindex="-1"><a id="dictionary"></a>Dictionary Testing <a class="header-anchor" href="#dictionary-testing" aria-label="Permalink to &quot;&lt;a id=&quot;dictionary&quot;&gt;&lt;/a&gt;Dictionary Testing&quot;">​</a></h2><p>The <code>ts_lexize</code> function facilitates dictionary testing.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ts_lexize(*dictreg* dictionary, *token* text) returns text[]</span></span></code></pre></div><p><code>ts_lexize</code> returns an array of lexemes if the input <code>*token*</code> is known to the dictionary, or an empty array if the token is known to the dictionary but it is a stop word, or <code>NULL</code> if it is an unknown word.</p><p>Examples:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT ts_lexize(&#39;english_stem&#39;, &#39;stars&#39;);</span></span>
<span class="line"><span> ts_lexize</span></span>
<span class="line"><span>-----------</span></span>
<span class="line"><span> {star}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SELECT ts_lexize(&#39;english_stem&#39;, &#39;a&#39;);</span></span>
<span class="line"><span> ts_lexize</span></span>
<span class="line"><span>-----------</span></span>
<span class="line"><span> {}</span></span></code></pre></div><blockquote><p><strong>Note</strong> The <code>ts_lexize</code> function expects a single token, not text. Here is a case where this can be confusing:</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT ts_lexize(&#39;thesaurus_astro&#39;,&#39;supernovae stars&#39;) is null;</span></span>
<span class="line"><span> ?column?</span></span>
<span class="line"><span>----------</span></span>
<span class="line"><span> t</span></span></code></pre></div><p>The thesaurus dictionary <code>thesaurus_astro</code> does know the phrase <code>supernovae stars</code>, but <code>ts_lexize</code> fails since it does not parse the input text but treats it as a single token. Use <code>plainto_tsquery</code> or <code>to_tsvector</code> to test thesaurus dictionaries, for example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT plainto_tsquery(&#39;supernovae stars&#39;);</span></span>
<span class="line"><span> plainto_tsquery</span></span>
<span class="line"><span>-----------------</span></span>
<span class="line"><span> &#39;sn&#39;</span></span></code></pre></div><p><strong>Parent topic:</strong> <a href="./../textsearch/full-text-search.html">Using Full Text Search</a></p>`,40)]))}const u=a(i,[["render",p]]);export{g as __pageData,u as default};
