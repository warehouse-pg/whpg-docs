import{_ as e,c as a,o as n,ag as p}from"./chunks/framework.Ds6Eueu6.js";const u=JSON.parse('{"title":"About Configuring Row-Level Security Policies","description":"","frontmatter":{},"headers":[],"relativePath":"docs/7x/admin_guide/row_security.md","filePath":"docs/7x/admin_guide/row_security.md"}'),i={name:"docs/7x/admin_guide/row_security.md"};function o(t,s,l,r,c,d){return n(),a("div",null,s[0]||(s[0]=[p(`<h1 id="about-configuring-row-level-security-policies" tabindex="-1">About Configuring Row-Level Security Policies <a class="header-anchor" href="#about-configuring-row-level-security-policies" aria-label="Permalink to &quot;About Configuring Row-Level Security Policies&quot;">​</a></h1><hr><p>In addition to the SQL-standard <a href="./roles_privs.html#topic6">privilege system</a> available through <a href="./../ref_guide/sql_commands/GRANT.html">GRANT</a>, tables can have row security policies that restrict, on a per-user basis, which rows can be returned by normal queries or inserted, updated, or deleted by data modification commands. This feature is also known as <em>Row-Level Security</em>. By default, tables do not have any policies, so that if a user has access privileges to a table according to the SQL privilege system, all rows within it are equally available for querying or updating.</p><p>When row security is enabled on a table (with <code>ALTER TABLE ... ENABLE ROW LEVEL SECURITY</code>), all normal access to the table for selecting rows or modifying rows must be allowed by a row security policy. (However, the table&#39;s owner is typically not subject to row security policies.) If no policy exists for the table, a default-deny policy is used, meaning that no rows are visible or can be modified. Operations that apply to the whole table, such as <code>TRUNCATE</code> and <code>REFERENCES</code>, are not subject to row security.</p><p>Row security policies can be specific to commands, or to roles, or to both. A policy can be specified to apply to <code>ALL</code> commands, or to <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, or <code>DELETE</code>. Multiple roles can be assigned to a given policy, and normal role membership and inheritance rules apply.</p><p>To specify which rows are visible or modifiable according to a policy, an expression is required that returns a Boolean result. This expression will be evaluated for each row prior to any conditions or functions coming from the user&#39;s query. (The only exceptions to this rule are leakproof functions, which are guaranteed to not leak information; the optimizer may choose to apply such functions ahead of the row-security check.) Rows for which the expression does not return true will not be processed. Separate expressions may be specified to provide independent control over the rows which are visible and the rows which are allowed to be modified. Policy expressions are run as part of the query and with the privileges of the user running the query, although security-definer functions can be used to access data not available to the calling user.</p><p>Superusers and roles with the <code>BYPASSRLS</code> attribute always bypass the row security system when accessing a table. Table owners normally bypass row security as well, though a table owner can choose to be subject to row security with <code>ALTER TABLE ... FORCE ROW LEVEL SECURITY</code>.</p><p>Enabling and disabling row security, as well as adding policies to a table, is always the privilege of the table owner only.</p><p>You create policies using the <a href="./../ref_guide/sql_commands/CREATE_POLICY.html">CREATE POLICY</a> command, alter policies using the <a href="./../ref_guide/sql_commands/ALTER_POLICY.html">ALTER POLICY</a> command, and drop policies using the <a href="./../ref_guide/sql_commands/DROP_POLICY.html">DROP POLICY</a> command. To enable and disable row security for a given table, use the <a href="./../ref_guide/sql_commands/ALTER_TABLE.html">ALTER TABLE</a> command.</p><p>Each policy has a name, and you can define multiple policies for a table. As policies are table-specific, each policy for a table must have a unique name. Different tables may have policies with the same name.</p><p>When multiple policies apply to a given query, they are combined using either <code>OR</code> (for permissive policies, which are the default) or using <code>AND</code> (for restrictive policies). This is similar to the rule that a given role has the privileges of all roles of which they are a member. Permissive vs. restrictive policies are discussed further below.</p><p>Here is a simple example that creates a policy on the <code>account</code> relation to allow only members of the <code>managers</code> role to access rows, and only rows of their accounts:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE accounts (manager text, company text, contact_email text);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE POLICY account_managers ON accounts TO managers</span></span>
<span class="line"><span>    USING (manager = current_user);</span></span></code></pre></div><p>The policy above implicitly provides a <code>WITH CHECK</code> clause identical to its <code>USING</code> clause, so that the constraint applies both to rows selected by a command (so a manager cannot <code>SELECT</code>, <code>UPDATE</code>, or <code>DELETE</code> existing rows belonging to a different manager) and to rows modified by a command (so rows belonging to a different manager cannot be created via <code>INSERT</code> or <code>UPDATE</code>).</p><p>If no role is specified, or the special user name <code>PUBLIC</code> is used, then the policy applies to all users on the system. To allow all users to access only their own row in a <code>users</code> table, you can create a simple policy as follows:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE POLICY user_policy ON users</span></span>
<span class="line"><span>    USING (user_name = current_user);</span></span></code></pre></div><p>This works similarly to the previous example.</p><p>To use a different policy for rows that are being added to the table compared to those rows that are visible, you can combine multiple policies. This pair of policies would allow all users to view all rows in the <code>users</code> table, but modify only their own:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE POLICY user_sel_policy ON users</span></span>
<span class="line"><span>    FOR SELECT</span></span>
<span class="line"><span>    USING (true);</span></span>
<span class="line"><span>CREATE POLICY user_mod_policy ON users</span></span>
<span class="line"><span>    USING (user_name = current_user);</span></span></code></pre></div><p>In a <code>SELECT</code> command, these two policies are combined using <code>OR</code>, with the net effect being that all rows can be selected. In other command types, only the second policy applies, so that the effects are the same as before.</p><p>Row security can also be disabled with the <code>ALTER TABLE</code> command. Disabling row security does not remove any policies that are defined on the table; they are simply ignored. Then all rows in the table are visible and modifiable, subject to the standard SQL privileges system.</p><p>The example below is more comprehensive. The table <code>passwd</code> emulates a Unix password file:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- Simple passwd-file based example</span></span>
<span class="line"><span>CREATE TABLE passwd (</span></span>
<span class="line"><span>  user_name             text UNIQUE NOT NULL,</span></span>
<span class="line"><span>  pwhash                text,</span></span>
<span class="line"><span>  uid                   int  PRIMARY KEY,</span></span>
<span class="line"><span>  gid                   int  NOT NULL,</span></span>
<span class="line"><span>  real_name             text NOT NULL,</span></span>
<span class="line"><span>  home_phone            text,</span></span>
<span class="line"><span>  extra_info            text,</span></span>
<span class="line"><span>  home_dir              text NOT NULL,</span></span>
<span class="line"><span>  shell                 text NOT NULL</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE ROLE admin;  -- Administrator</span></span>
<span class="line"><span>CREATE ROLE bob;    -- Normal user</span></span>
<span class="line"><span>CREATE ROLE alice;  -- Normal user</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Populate the table</span></span>
<span class="line"><span>INSERT INTO passwd VALUES</span></span>
<span class="line"><span>  (&#39;admin&#39;,&#39;xxx&#39;,0,0,&#39;Admin&#39;,&#39;111-222-3333&#39;,null,&#39;/root&#39;,&#39;/bin/dash&#39;);</span></span>
<span class="line"><span>INSERT INTO passwd VALUES</span></span>
<span class="line"><span>  (&#39;bob&#39;,&#39;xxx&#39;,1,1,&#39;Bob&#39;,&#39;123-456-7890&#39;,null,&#39;/home/bob&#39;,&#39;/bin/zsh&#39;);</span></span>
<span class="line"><span>INSERT INTO passwd VALUES</span></span>
<span class="line"><span>  (&#39;alice&#39;,&#39;xxx&#39;,2,1,&#39;Alice&#39;,&#39;098-765-4321&#39;,null,&#39;/home/alice&#39;,&#39;/bin/zsh&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Be sure to enable row level security on the table</span></span>
<span class="line"><span>ALTER TABLE passwd ENABLE ROW LEVEL SECURITY;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Create policies</span></span>
<span class="line"><span>-- Administrator can see all rows and add any rows</span></span>
<span class="line"><span>CREATE POLICY admin_all ON passwd TO admin USING (true) WITH CHECK (true);</span></span>
<span class="line"><span>-- Normal users can view all rows</span></span>
<span class="line"><span>CREATE POLICY all_view ON passwd FOR SELECT USING (true);</span></span>
<span class="line"><span>-- Normal users can update their own records, but</span></span>
<span class="line"><span>-- limit which shells a normal user is allowed to set</span></span>
<span class="line"><span>CREATE POLICY user_mod ON passwd FOR UPDATE</span></span>
<span class="line"><span>  USING (current_user = user_name)</span></span>
<span class="line"><span>  WITH CHECK (</span></span>
<span class="line"><span>    current_user = user_name AND</span></span>
<span class="line"><span>    shell IN (&#39;/bin/bash&#39;,&#39;/bin/sh&#39;,&#39;/bin/dash&#39;,&#39;/bin/zsh&#39;,&#39;/bin/tcsh&#39;)</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Allow admin all normal rights</span></span>
<span class="line"><span>GRANT SELECT, INSERT, UPDATE, DELETE ON passwd TO admin;</span></span>
<span class="line"><span>-- Users only get select access on public columns</span></span>
<span class="line"><span>GRANT SELECT</span></span>
<span class="line"><span>  (user_name, uid, gid, real_name, home_phone, extra_info, home_dir, shell)</span></span>
<span class="line"><span>  ON passwd TO public;</span></span>
<span class="line"><span>-- Allow users to update certain columns</span></span>
<span class="line"><span>GRANT UPDATE</span></span>
<span class="line"><span>  (pwhash, real_name, home_phone, extra_info, shell)</span></span>
<span class="line"><span>  ON passwd TO public;</span></span></code></pre></div><p>As with any security settings, it&#39;s important to test and ensure that the system is behaving as expected. Using the example above, this demonstrates that the permission system is working properly.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- admin can view all rows and fields</span></span>
<span class="line"><span>postgres=&gt; set role admin;</span></span>
<span class="line"><span>SET</span></span>
<span class="line"><span>postgres=&gt; table passwd;</span></span>
<span class="line"><span> user_name | pwhash | uid | gid | real_name |  home_phone  | extra_info | home_dir    |   shell</span></span>
<span class="line"><span>-----------+--------+-----+-----+-----------+--------------+------------+-------------+-----------</span></span>
<span class="line"><span> admin     | xxx    |   0 |   0 | Admin     | 111-222-3333 |            | /root       | /bin/dash</span></span>
<span class="line"><span> bob       | xxx    |   1 |   1 | Bob       | 123-456-7890 |            | /home/bob   | /bin/zsh</span></span>
<span class="line"><span> alice     | xxx    |   2 |   1 | Alice     | 098-765-4321 |            | /home/alice | /bin/zsh</span></span>
<span class="line"><span>(3 rows)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- Test what Alice is able to do</span></span>
<span class="line"><span>postgres=&gt; set role alice;</span></span>
<span class="line"><span>SET</span></span>
<span class="line"><span>postgres=&gt; table passwd;</span></span>
<span class="line"><span>ERROR:  permission denied for relation passwd</span></span>
<span class="line"><span>postgres=&gt; select user_name,real_name,home_phone,extra_info,home_dir,shell from passwd;</span></span>
<span class="line"><span> user_name | real_name |  home_phone  | extra_info | home_dir    |   shell</span></span>
<span class="line"><span>-----------+-----------+--------------+------------+-------------+-----------</span></span>
<span class="line"><span> admin     | Admin     | 111-222-3333 |            | /root       | /bin/dash</span></span>
<span class="line"><span> bob       | Bob       | 123-456-7890 |            | /home/bob   | /bin/zsh</span></span>
<span class="line"><span> alice     | Alice     | 098-765-4321 |            | /home/alice | /bin/zsh</span></span>
<span class="line"><span>(3 rows)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>postgres=&gt; update passwd set user_name = &#39;joe&#39;;</span></span>
<span class="line"><span>ERROR:  permission denied for relation passwd</span></span>
<span class="line"><span>-- Alice is allowed to change her own real_name, but no others</span></span>
<span class="line"><span>postgres=&gt; update passwd set real_name = &#39;Alice Doe&#39;;</span></span>
<span class="line"><span>UPDATE 1</span></span>
<span class="line"><span>postgres=&gt; update passwd set real_name = &#39;John Doe&#39; where user_name = &#39;admin&#39;;</span></span>
<span class="line"><span>UPDATE 0</span></span>
<span class="line"><span>postgres=&gt; update passwd set shell = &#39;/bin/xx&#39;;</span></span>
<span class="line"><span>ERROR:  new row violates WITH CHECK OPTION for &quot;passwd&quot;</span></span>
<span class="line"><span>postgres=&gt; delete from passwd;</span></span>
<span class="line"><span>ERROR:  permission denied for relation passwd</span></span>
<span class="line"><span>postgres=&gt; insert into passwd (user_name) values (&#39;xxx&#39;);</span></span>
<span class="line"><span>ERROR:  permission denied for relation passwd</span></span>
<span class="line"><span>-- Alice can change her own password; RLS silently prevents updating other rows</span></span>
<span class="line"><span>postgres=&gt; update passwd set pwhash = &#39;abc&#39;;</span></span>
<span class="line"><span>UPDATE 1</span></span></code></pre></div><p>All of the policies constructed thus far have been permissive policies; this means that when multiple policies are applied they are combined using the <code>OR</code> Boolean operator. While permissive policies can be constructed to only allow access to rows in the intended cases, it can be simpler to combine permissive policies with restrictive policies (which the records must pass and which are combined using the <code>AND</code> Boolean operator). Building on the example above, we add a restrictive policy to require the administrator to be connected over a local Unix socket to access the records of the <code>passwd</code> table:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE POLICY admin_local_only ON passwd AS RESTRICTIVE TO admin</span></span>
<span class="line"><span>    USING (pg_catalog.inet_client_addr() IS NULL);</span></span></code></pre></div><p>We can then see that an administrator connecting over a network will not see any records, due to the restrictive policy:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>=&gt; SELECT current_user;</span></span>
<span class="line"><span> current_user </span></span>
<span class="line"><span>--------------</span></span>
<span class="line"><span> admin</span></span>
<span class="line"><span>(1 row)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>=&gt; select inet_client_addr();</span></span>
<span class="line"><span> inet_client_addr </span></span>
<span class="line"><span>------------------</span></span>
<span class="line"><span> 127.0.0.1</span></span>
<span class="line"><span>(1 row)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>=&gt; SELECT current_user;</span></span>
<span class="line"><span> current_user </span></span>
<span class="line"><span>--------------</span></span>
<span class="line"><span> admin</span></span>
<span class="line"><span>(1 row)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>=&gt; TABLE passwd;</span></span>
<span class="line"><span> user_name | pwhash | uid | gid | real_name | home_phone | extra_info | home_dir | shell</span></span>
<span class="line"><span>-----------+--------+-----+-----+-----------+------------+------------+----------+-------</span></span>
<span class="line"><span>(0 rows)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>=&gt; UPDATE passwd set pwhash = NULL;</span></span>
<span class="line"><span>UPDATE 0</span></span></code></pre></div><p>Referential integrity checks, such as unique or primary key constraints and foreign key references, always bypass row security to ensure that data integrity is maintained. Take care when developing schemas and row-level policies to avoid &quot;covert channel&quot; leaks of information through such referential integrity checks.</p><p>In some contexts, it is important to be sure that row security is not being applied. For example, when taking a backup, it could be disastrous if row security silently caused some rows to be omitted from the backup. In such a situation, you can set the <a href="./../ref_guide/config_params/guc-list.html#row_security">row_security</a> configuration parameter to <code>off</code>. This does not in itself bypass row security; what it does is throw an error if any query&#39;s results would get filtered by a policy. You can then investigate the reason for the error and fix it.</p><p>In the examples above, the policy expressions consider only the current values in the row to be accessed or updated. This is the simplest and best-performing case; when possible, it is best to design row security applications to work this way. If it is necessary to consult other rows or other tables to make a policy decision, that can be accomplished using sub-<code>SELECT</code>s, or functions that contain <code>SELECT</code>s, in the policy expressions. Be aware, however, that such accesses can create race conditions that could allow information leakage if care is not taken. As an example, consider the following table design:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- definition of privilege groups</span></span>
<span class="line"><span>CREATE TABLE groups (group_id int PRIMARY KEY,</span></span>
<span class="line"><span>                     group_name text NOT NULL);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSERT INTO groups VALUES</span></span>
<span class="line"><span>  (1, &#39;low&#39;),</span></span>
<span class="line"><span>  (2, &#39;medium&#39;),</span></span>
<span class="line"><span>  (5, &#39;high&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GRANT ALL ON groups TO alice;  -- alice is the administrator</span></span>
<span class="line"><span>GRANT SELECT ON groups TO public;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- definition of users&#39; privilege levels</span></span>
<span class="line"><span>CREATE TABLE users (user_name text PRIMARY KEY,</span></span>
<span class="line"><span>                    group_id int NOT NULL REFERENCES groups);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSERT INTO users VALUES</span></span>
<span class="line"><span>  (&#39;alice&#39;, 5),</span></span>
<span class="line"><span>  (&#39;bob&#39;, 2),</span></span>
<span class="line"><span>  (&#39;mallory&#39;, 2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GRANT ALL ON users TO alice;</span></span>
<span class="line"><span>GRANT SELECT ON users TO public;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- table holding the information to be protected</span></span>
<span class="line"><span>CREATE TABLE information (info text,</span></span>
<span class="line"><span>                          group_id int NOT NULL REFERENCES groups);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSERT INTO information VALUES</span></span>
<span class="line"><span>  (&#39;barely secret&#39;, 1),</span></span>
<span class="line"><span>  (&#39;slightly secret&#39;, 2),</span></span>
<span class="line"><span>  (&#39;very secret&#39;, 5);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ALTER TABLE information ENABLE ROW LEVEL SECURITY;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- a row should be visible to/updatable by users whose security group_id is</span></span>
<span class="line"><span>-- greater than or equal to the row&#39;s group_id</span></span>
<span class="line"><span>CREATE POLICY fp_s ON information FOR SELECT</span></span>
<span class="line"><span>  USING (group_id &lt;= (SELECT group_id FROM users WHERE user_name = current_user));</span></span>
<span class="line"><span>CREATE POLICY fp_u ON information FOR UPDATE</span></span>
<span class="line"><span>  USING (group_id &lt;= (SELECT group_id FROM users WHERE user_name = current_user));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- we rely only on RLS to protect the information table</span></span>
<span class="line"><span>GRANT ALL ON information TO public;</span></span></code></pre></div><p>Now suppose that <code>alice</code> wishes to change the &quot;slightly secret&quot; information, but decides that <code>mallory</code> should not be trusted with the new content of that row, so she runs the following commands:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BEGIN;</span></span>
<span class="line"><span>UPDATE users SET group_id = 1 WHERE user_name = &#39;mallory&#39;;</span></span>
<span class="line"><span>UPDATE information SET info = &#39;secret from mallory&#39; WHERE group_id = 2;</span></span>
<span class="line"><span>COMMIT;</span></span></code></pre></div><p>That looks safe; there is no window wherein <code>mallory</code> should be able to see the <code>&quot;secret from mallory&quot;</code> string. However, there is a race condition here. If <code>mallory</code> is concurrently doing, say,</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SELECT * FROM information WHERE group_id = 2 FOR UPDATE;</span></span></code></pre></div><p>and her transaction is in <code>READ COMMITTED</code> mode, it is possible for her to see <code>&quot;secret from mallory&quot;</code>. That happens if her transaction reaches the information row just after <code>alice</code>&#39;s does. It blocks waiting for <code>alice</code>&#39;s transaction to commit, then fetches the updated row contents thanks to the <code>FOR UPDATE</code> clause. However, it does not fetch an updated row for the implicit <code>SELECT</code> from <code>users</code>, because that sub-<code>SELECT</code> did not have <code>FOR UPDATE</code>; instead the <code>users</code> row is read with the snapshot taken at the start of the query. Therefore, the policy expression tests the old value of <code>mallory</code>&#39;s privilege level and allows her to see the updated row.</p><p>There are several ways around this problem. One simple answer is to use <code>SELECT ... FOR SHARE</code> in sub-<code>SELECT</code>s in row security policies. However, that requires granting <code>UPDATE</code> privilege on the referenced table (here <code>users</code>) to the affected users, which might be undesirable. (But another row security policy could be applied to prevent them from actually exercising that privilege; or the sub-<code>SELECT</code> could be embedded into a security definer function.) Also, heavy concurrent use of row share locks on the referenced table could pose a performance problem, especially if updates of it are frequent. Another solution, practical if updates of the referenced table are infrequent, is to take an <code>ACCESS EXCLUSIVE</code> lock on the referenced table when updating it, so that no concurrent transactions could be examining old row values. Or one could just wait for all concurrent transactions to end after committing an update of the referenced table and before making changes that rely on the new security situation.</p><p>For additional details see <a href="./../ref_guide/sql_commands/CREATE_POLICY.html">CREATE POLICY</a> and <a href="./../ref_guide/sql_commands/ALTER_TABLE.html">ALTER TABLE</a>.</p><h2 id="about-row-level-security-for-views" tabindex="-1"><a id="views"></a>About Row-Level Security for Views <a class="header-anchor" href="#about-row-level-security-for-views" aria-label="Permalink to &quot;&lt;a id=&quot;views&quot;&gt;&lt;/a&gt;About Row-Level Security for Views&quot;">​</a></h2><p>You can simulate row-level access by using views to restrict the rows that are selected. You can simulate row-level labels by adding an extra column to the table to store sensitivity information, and then using views to control row-level access based on this column. You can then grant roles access to the views rather than to the base table.</p><p>While views can hide the contents of certain columns, they cannot be used to reliably conceal the data in unseen rows. When it is necessary for a view to provide row-level security, you must apply the <code>security_barrier</code> attribute to the view. This prevents maliciously-chosen functions and operators from being passed values from rows until after the view has done its work. For example, this view is secure:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE VIEW phone_number WITH (security_barrier) AS</span></span>
<span class="line"><span>    SELECT person, phone FROM phone_data WHERE phone NOT LIKE &#39;412%&#39;;</span></span></code></pre></div><p>Views created with the <code>security_barrier</code> attribute may perform far worse than views created without this option. In general, there is no way to avoid this: the fastest possible plan must be rejected if it may compromise security. For this reason, the <code>security_barrier</code> option is not enabled by default.</p><p>Be sure to review <a href="https://www.postgresql.org/docs/12/rules-privileges.html" target="_blank" rel="noreferrer">Rules and Privileges</a> in the PostgreSQL documentation for detailed information about securing views.</p>`,46)]))}const m=e(i,[["render",o]]);export{u as __pageData,m as default};
