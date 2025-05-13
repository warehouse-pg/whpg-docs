import{_ as n,c as t,o as a,ag as o}from"./chunks/framework.Ds6Eueu6.js";const h=JSON.parse('{"title":"plcontainer Configuration File","description":"","frontmatter":{},"headers":[],"relativePath":"docs/7x/utility_guide/ref/plcontainer-configuration.md","filePath":"docs/7x/utility_guide/ref/plcontainer-configuration.md"}'),i={name:"docs/7x/utility_guide/ref/plcontainer-configuration.md"};function s(r,e,c,l,p,d){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="plcontainer-configuration-file" tabindex="-1">plcontainer Configuration File <a class="header-anchor" href="#plcontainer-configuration-file" aria-label="Permalink to &quot;plcontainer Configuration File&quot;">​</a></h1><p>The WarehousePG utility <code>plcontainer</code> manages the PL/Container configuration files in a WarehousePG cluster. The utility ensures that the configuration files are consistent across the WarehousePG coordinator and segment instances.</p><blockquote><p><strong>Caution</strong> Modifying the configuration files on the segment instances without using the utility might create different, incompatible configurations on different WarehousePG segments that could cause unexpected behavior.</p></blockquote><h2 id="pl-container-configuration-file" tabindex="-1"><a id="topic_ojn_r2s_dw"></a>PL/Container Configuration File <a class="header-anchor" href="#pl-container-configuration-file" aria-label="Permalink to &quot;&lt;a id=&quot;topic_ojn_r2s_dw&quot;&gt;&lt;/a&gt;PL/Container Configuration File&quot;">​</a></h2><p>PL/Container maintains a configuration file <code>plcontainer_configuration.xml</code> in the data directory of all WarehousePG segments. This query lists the WarehousePG cluster data directories:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT hostname, datadir FROM gp_segment_configuration;</span></span></code></pre></div><p>A sample PL/Container configuration file is in <code>$GPHOME/share/postgresql/plcontainer</code>.</p><p>In an XML file, names, such as element and attribute names, and values are case sensitive.</p><p>In this XML file, the root element <code>configuration</code> contains one or more <code>runtime</code> elements. You specify the <code>id</code> of the <code>runtime</code> element in the <code># container:</code> line of a PL/Container function definition.</p><p>This is an example file. Note that all XML elements, names, and attributes are case sensitive.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; ?&gt;</span></span>
<span class="line"><span>&lt;configuration&gt;</span></span>
<span class="line"><span>    &lt;runtime&gt;</span></span>
<span class="line"><span>        &lt;id&gt;plc_python_example1&lt;/id&gt;</span></span>
<span class="line"><span>        &lt;image&gt;pivotaldata/plcontainer_python_with_clients:0.1&lt;/image&gt;</span></span>
<span class="line"><span>        &lt;command&gt;./pyclient&lt;/command&gt;</span></span>
<span class="line"><span>    &lt;/runtime&gt;</span></span>
<span class="line"><span>    &lt;runtime&gt;</span></span>
<span class="line"><span>        &lt;id&gt;plc_python_example2&lt;/id&gt;</span></span>
<span class="line"><span>        &lt;image&gt;pivotaldata/plcontainer_python_without_clients:0.1&lt;/image&gt;</span></span>
<span class="line"><span>        &lt;command&gt;/clientdir/pyclient.sh&lt;/command&gt;</span></span>
<span class="line"><span>        &lt;shared_directory access=&quot;ro&quot; container=&quot;/clientdir&quot; host=&quot;/usr/local/greenplum-db/bin/plcontainer_clients&quot;/&gt;</span></span>
<span class="line"><span>        &lt;setting memory_mb=&quot;512&quot;/&gt;</span></span>
<span class="line"><span>        &lt;setting use_container_logging=&quot;yes&quot;/&gt;</span></span>
<span class="line"><span>        &lt;setting cpu_share=&quot;1024&quot;/&gt;</span></span>
<span class="line"><span>        &lt;setting resource_group_id=&quot;16391&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/runtime&gt;</span></span>
<span class="line"><span>    &lt;runtime&gt;</span></span>
<span class="line"><span>        &lt;id&gt;plc_r_example&lt;/id&gt;</span></span>
<span class="line"><span>        &lt;image&gt;pivotaldata/plcontainer_r_without_clients:0.2&lt;/image&gt;</span></span>
<span class="line"><span>        &lt;command&gt;/clientdir/rclient.sh&lt;/command&gt;</span></span>
<span class="line"><span>        &lt;shared_directory access=&quot;ro&quot; container=&quot;/clientdir&quot; host=&quot;/usr/local/greenplum-db/bin/plcontainer_clients&quot;/&gt;</span></span>
<span class="line"><span>        &lt;setting use_container_logging=&quot;yes&quot;/&gt;</span></span>
<span class="line"><span>        &lt;setting enable_network=&quot;no&quot;/&gt;</span></span>
<span class="line"><span>        &lt;setting roles=&quot;gpadmin,user1&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/runtime&gt;</span></span>
<span class="line"><span>    &lt;runtime&gt;</span></span>
<span class="line"><span>&lt;/configuration&gt;</span></span></code></pre></div><p>These are the XML elements and attributes in a PL/Container configuration file.</p><p>configuration : Root element for the XML file.</p><p>runtime : One element for each specific container available in the system. These are child elements of the <code>configuration</code> element.</p><p>id : Required. The value is used to reference a Docker container from a PL/Container user-defined function. The <code>id</code> value must be unique in the configuration. The <code>id</code> must start with a character or digit (a-z, A-Z, or 0-9) and can contain characters, digits, or the characters <code>_</code> (underscore), <code>.</code> (period), or <code>-</code> (dash). Maximum length is 63 Bytes.</p><p>: The <code>id</code> specifies which Docker image to use when PL/Container creates a Docker container to run a user-defined function.</p><p>image : Required. The value is the full Docker image name, including image tag. The same way you specify them for starting this container in Docker. Configuration allows to have many container objects referencing the same image name, this way in Docker they would be represented by identical containers.</p><pre><code>For example, you might have two \`runtime\` elements, with different \`id\` elements, \`plc_python_128\` and \`plc_python_256\`, both referencing the Docker image \`pivotaldata/plcontainer_python:1.0.0\`. The first \`runtime\` specifies a 128MB RAM limit and the second one specifies a 256MB limit that is specified by the \`memory_mb\` attribute of a \`setting\` element.
</code></pre><p>command : Required. The value is the command to be run inside of container to start the client process inside in the container. When creating a <code>runtime</code> element, the <code>plcontainer</code> utility adds a <code>command</code> element based on the language (the <code>-l</code> option).</p><p>: <code>command</code> element for the Python 2 language.</p><pre><code>\`\`\`
&lt;command&gt;/clientdir/pyclient.sh&lt;/command&gt;
\`\`\`
</code></pre><p>: <code>command</code> element for the Python 3 language.</p><pre><code>\`\`\`
&lt;command&gt;/clientdir/pyclient3.sh&lt;/command&gt;
\`\`\`
</code></pre><p>: <code>command</code> element for the R language.</p><pre><code>\`\`\`
&lt;command&gt;/clientdir/rclient.sh&lt;/command&gt;
\`\`\`
</code></pre><p>: You should modify the value only if you build a custom container and want to implement some additional initialization logic before the container starts.</p><pre><code>&gt; **Note** This element cannot be set with the \`plcontainer\` utility. You can update the configuration file with the \`plcontainer runtime-edit\` command.
</code></pre><p>shared_directory : Optional. This element specifies a shared Docker shared volume for a container with access information. Multiple <code>shared_directory</code> elements are allowed. Each <code>shared_directory</code> element specifies a single shared volume. XML attributes for the <code>shared_directory</code> element:</p><pre><code>-   \`host\` - a directory location on the host system.
-   \`container\` - a directory location inside of container.
-   \`access\` - access level to the host directory, which can be either \`ro\` \\(read-only\\) or \`rw\` \\(read-write\\).
</code></pre><p>: When creating a <code>runtime</code> element, the <code>plcontainer</code> utility adds a <code>shared_directory</code> element.</p><pre><code>\`\`\`
&lt;shared_directory access=&quot;ro&quot; container=&quot;/clientdir&quot; host=&quot;/usr/local/greenplum-db/bin/plcontainer_clients&quot;/&gt;
\`\`\`
</code></pre><p>: For each <code>runtime</code> element, the <code>container</code> attribute of the <code>shared_directory</code> elements must be unique. For example, a <code>runtime</code> element cannot have two <code>shared_directory</code> elements with attribute <code>container=&quot;/clientdir&quot;</code>.</p><pre><code>&gt; **Caution** Allowing read-write access to a host directory requires special consideration.

-   When specifying read-write access to host directory, ensure that the specified host directory has the correct permissions.
-   When running PL/Container user-defined functions, multiple concurrent Docker containers that are running on a host could change data in the host directory. Ensure that the functions support multiple concurrent access to the data in the host directory.
</code></pre><p>settings : Optional. This element specifies Docker container configuration information. Each <code>setting</code> element contains one attribute. The element attribute specifies logging, memory, or networking information. For example, this element enables logging.</p><pre><code>\`\`\`
&lt;setting use_container_logging=&quot;yes&quot;/&gt;
\`\`\`
</code></pre><p>: These are the valid attributes.</p><pre><code>cpu\\_share
:   Optional. Specify the CPU usage for each PL/Container container in the runtime. The value of the element is a positive integer. The default value is 1024. The value is a relative weighting of CPU usage compared to other containers.

For example, a container with a \`cpu_share\` of 2048 is allocated double the CPU slice time compared with container with the default value of 1024.

memory\\_mb=&quot;size&quot;
:   Optional. The value specifies the amount of memory, in MB, that each container is allowed to use. Each container starts with this amount of RAM and twice the amount of swap space. The container memory consumption is limited by the host system \`cgroups\` configuration, which means in case of memory overcommit, the container is terminated by the system.

resource\\_group\\_id=&quot;rg\\_groupid&quot;
:   Optional. The value specifies the \`groupid\` of the resource group to assign to the PL/Container runtime. The resource group limits the total CPU and memory resource usage for all running containers that share this runtime configuration. You must specify the \`groupid\` of the resource group. If you do not assign a resource group to a PL/Container runtime configuration, its container instances are limited only by system resources. For information about managing PL/Container resources, see [About PL/Container Resource Management](../../analytics/pl_container_using.html).

roles=&quot;list\\_of\\_roles&quot;
:   Optional. The value is a WarehousePG role name or a comma-separated list of roles. PL/Container runs a container that uses the PL/Container runtime configuration only for the listed roles. If the attribute is not specified, any WarehousePG role can run an instance of this container runtime configuration. For example, you create a UDF that specifies the \`plcontainer\` language and identifies a \`# container:\` runtime configuration that has the \`roles\` attribute set. When a role \\(user\\) runs the UDF, PL/Container checks the list of roles and runs the container only if the role is on the list.

use\\_container\\_logging=&quot;\\{yes \\| no\\}&quot;
:   Optional.  Activates or deactivates  Docker logging for the container. The attribute value \`yes\` enables logging. The attribute value \`no\` deactivates logging \\(the default\\).

enable\\_network=&quot;\\{yes \\| no\\}&quot;
:   Optional. Available starting with PL/Container version 2.2, this attribute activates or deactivates network access for the UDF container. The attribute value \`yes\` enables UDFs to access the network. The attribute value \`no\` deactivates network access \\(the default\\).

The WarehousePG server configuration parameter [log\\_min\\_messages](../../ref_guide/config_params/guc-list.html) controls the PL/Container log level. The default log level is \`warning\`. For information about PL/Container log information, see [Notes](../../analytics/pl_container_using.html).

By default, the PL/Container log information is sent to a system \`journald\` service.
</code></pre><h2 id="update-the-pl-container-configuration" tabindex="-1"><a id="topic_v3s_qv3_kw"></a>Update the PL/Container Configuration <a class="header-anchor" href="#update-the-pl-container-configuration" aria-label="Permalink to &quot;&lt;a id=&quot;topic_v3s_qv3_kw&quot;&gt;&lt;/a&gt;Update the PL/Container Configuration&quot;">​</a></h2><p>You can add a <code>runtime</code> element to the PL/Container configuration file with the <code>plcontainer runtime-add</code> command. The command options specify information such as the runtime ID, Docker image, and language. You can use the <code>plcontainer runtime-replace</code> command to update an existing <code>runtime</code> element. The utility updates the configuration file on the coordinator and all segment instances.</p><p>The PL/Container configuration file can contain multiple <code>runtime</code> elements that reference the same Docker image specified by the XML element <code>image</code>. In the example configuration file, the <code>runtime</code> elements contain <code>id</code> elements named <code>plc_python_128</code> and <code>plc_python_256</code>, both referencing the Docker container <code>pivotaldata/plcontainer_python:1.0.0</code>. The first <code>runtime</code> element is defined with a 128MB RAM limit and the second one with a 256MB RAM limit.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;configuration&gt;</span></span>
<span class="line"><span>  &lt;runtime&gt;</span></span>
<span class="line"><span>    &lt;id&gt;plc_python_128&lt;/id&gt;</span></span>
<span class="line"><span>    &lt;image&gt;pivotaldata/plcontainer_python:1.0.0&lt;/image&gt;</span></span>
<span class="line"><span>    &lt;command&gt;./client&lt;/command&gt;</span></span>
<span class="line"><span>    &lt;shared_directory access=&quot;ro&quot; container=&quot;/clientdir&quot; host=&quot;/usr/local/gpdb/bin/plcontainer_clients&quot;/&gt;</span></span>
<span class="line"><span>    &lt;setting memory_mb=&quot;128&quot;/&gt;</span></span>
<span class="line"><span>  &lt;/runtime&gt;</span></span>
<span class="line"><span>  &lt;runtime&gt;</span></span>
<span class="line"><span>    &lt;id&gt;plc_python_256&lt;/id&gt;</span></span>
<span class="line"><span>    &lt;image&gt;pivotaldata/plcontainer_python:1.0.0&lt;/image&gt;</span></span>
<span class="line"><span>    &lt;command&gt;./client&lt;/command&gt;</span></span>
<span class="line"><span>    &lt;shared_directory access=&quot;ro&quot; container=&quot;/clientdir&quot; host=&quot;/usr/local/gpdb/bin/plcontainer_clients&quot;/&gt;</span></span>
<span class="line"><span>    &lt;setting memory_mb=&quot;256&quot;/&gt;</span></span>
<span class="line"><span>    &lt;setting resource_group_id=&quot;16391&quot;/&gt;</span></span>
<span class="line"><span>  &lt;/runtime&gt;</span></span>
<span class="line"><span>&lt;configuration&gt;</span></span></code></pre></div><p>Configuration changes that are made with the utility are applied to the XML files on all WarehousePG segments. However, PL/Container configurations of currently running sessions use the configuration that existed during session start up. To update the PL/Container configuration in a running session, run this command in the session.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT * FROM plcontainer_refresh_config;</span></span></code></pre></div><p>The command runs a PL/Container function that updates the session configuration on the coordinator and segment instances.</p>`,44)]))}const g=n(i,[["render",s]]);export{h as __pageData,g as default};
