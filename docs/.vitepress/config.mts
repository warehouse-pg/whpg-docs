import { defineConfig } from 'vitepress'



 

// https://vitepress.dev/reference/site-config
export default defineConfig(
  
  {

  ignoreDeadLinks: false,
  title: "WarehousePG",
  description: "WarehousePG, an Open Source alternative to Greenplum Database",
  rewrites: {
    'whpg/:slug*': 'docs/:slug*'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
        
    siteTitle: 'WarehousePG', 
    logo: {
      light: '/dark_gray_logo_no_text.png',
      dark: '/dark_gray_logo_no_text.png',
    },

    search: {
      provider: 'local',
    },

    nav: [
      {
        text: 'Docs',
        items: [
          { text: '7.x', link: '/docs/7x' },
          { text: '6.x', link: '/docs/6x' },
          { text: 'Backup & restore', link: '/whpg-backup/' },
          { text: 'PXF 6.x', link: '/pxf/6x/' },
          { text: 'Extensions', link: '/extensions/' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/warehouse-pg/warehouse-pg' },

    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/warehouse-pg/warehouse-pg' }
 ],

    sidebar: [
      {
        text: 'WHPG documentation'
      },
      {
        text: "WHPG 7.x",
        link: "/docs/7x/" ,
        collapsed: false,
        items: [
          { text: "Release notes", link: "/docs/7x/release_notes" },
          { text: "Install guide", link: "/docs/7x/install_guide/" },
          { text: "Admin guide", link: "/docs/7x/admin_guide/" },
          { text: "Best practices", link: "/docs/7x/best_practices/" },
          { text: "Utility guide", link: "/docs/7x/ref_guide/utility_guide/" },
          { text: "Analytics guide", link: "/docs/7x/admin_guide/analytics/" },
          { text: "Reference guide", link: "/docs/7x/ref_guide/" },
          { text: "Security guide", link: "/docs/7x/security_guide/" },
          { text: "Backup & restore guide", link: "/whpg-backup/" }





        ],
      },
      {
      text: "WHPG 6.x",
      link: "/docs/6x/index.html" ,
      collapsed: true,
      items: [
          { text: "Release notes", link: "/docs/6x/release_notes/" },
          { text: "Install guide", link: "/docs/6x/install_guide/" },
          { text: "Admin guide", link: "/docs/6x/admin_guide/" },
          { text: "Best practices", link: "/docs/6x/best_practices/" },
          { text: "Utility guide", link: "/docs/6x/ref_guide/utility_guide/" },
          { text: "Analytics guide", link: "/docs/6x/admin_guide/analytics/" },
          { text: "Reference guide", link: "/docs/6x/ref_guide/" },
          { text: "Security guide", link: "/docs/6x/security-guide/" },

      
      ],
      },
      {
        text: "WHPG backup & restore",
        link: "/whpg-backup/" ,
        collapsed: false,
        items: [
          {
            text: "Release notes", link: "/whpg-backup/release_notes/"},
          { text: "Overview", link: "/whpg-backup/overview/" },
          { text: "Installing", link: "/whpg-backup/installing" },
          { text: "Backing up and restoring", link: "/whpg-backup/using" },
          { text: "Creating incremental backups", link: "/whpg-backup/incremental" },
          { text: "Using the S3 storage plugin", link: "/whpg-backup/s3-plugin" },
          { text: "Reference",
            link: "/whpg-backup/reference/" }
        ],
      },
      {
        text: "PXF 6.x",
        link: "/pxf/6x/",
        collapsed: false,
        items: [
          { text: "Release notes", link: "/pxf/6x/release_notes/" },
          { text: "Overview", link: "/pxf/6x/overview/" },
          { text: "Installing", link: "/pxf/6x/installing" },
          { text: "Configuring and starting", link: "/pxf/6x/configuring" },
          { text: "Administering", link: "/pxf/6x/administering" },
          {
            text: "Connecting to external data",
            link: "/pxf/6x/connecting/",
            collapsed: true,
            items: [
              {
                text: "Object stores",
                link: "/pxf/6x/connecting/object-stores/",
                collapsed: true,
                items: [
                  { text: "S3-compatible stores", link: "/pxf/6x/connecting/object-stores/s3" },
                  { text: "Azure", link: "/pxf/6x/connecting/object-stores/azure" },
                  { text: "Google Cloud Storage", link: "/pxf/6x/connecting/object-stores/gcs" },
                ],
              },
              {
                text: "Hadoop",
                link: "/pxf/6x/connecting/hadoop/",
                collapsed: true,
                items: [
                  { text: "HDFS", link: "/pxf/6x/connecting/hadoop/hdfs" },
                  { text: "Hive", link: "/pxf/6x/connecting/hadoop/hive" },
                  { text: "HBase", link: "/pxf/6x/connecting/hadoop/hbase" },
                  { text: "Authenticating with Kerberos", link: "/pxf/6x/connecting/hadoop/kerberos" },
                ],
              },
              { text: "SQL databases over JDBC", link: "/pxf/6x/connecting/jdbc" },
              { text: "Network file system", link: "/pxf/6x/connecting/network-file-system" },
            ],
          },
          { text: "Reference", link: "/pxf/6x/reference/" }
        ],
      },
      {
        text: "Extensions",
        link: "/extensions/",
        collapsed: false,
        items: [
          {
            text: "Bundled",
            link: "/extensions/bundled/",
            collapsed: true,
            items: [
              { text: "auto_explain", link: "/extensions/bundled/auto-explain" },
              { text: "btree_gin", link: "/extensions/bundled/btree_gin" },
              { text: "citext", link: "/extensions/bundled/citext" },
              { text: "dblink", link: "/extensions/bundled/dblink" },
              { text: "fuzzystrmatch", link: "/extensions/bundled/fuzzystrmatch" },
              { text: "gp_array_agg", link: "/extensions/bundled/gp_array_agg" },
              { text: "gp_check_functions", link: "/extensions/bundled/gp_check_functions" },
              { text: "gp_exttable_fdw", link: "/extensions/bundled/gp_exttable_fdw" },
              { text: "gp_legacy_string_agg", link: "/extensions/bundled/gp_legacy_string_agg" },
              { text: "gp_parallel_retrieve_cursor", link: "/extensions/bundled/gp_parallel_retrieve_cursor" },
              { text: "gp_percentile_agg", link: "/extensions/bundled/gp_percentile_agg" },
              { text: "gp_pitr", link: "/extensions/bundled/gp_pitr" },
              { text: "gp_sparse_vector", link: "/extensions/bundled/gp_sparse_vector" },
              { text: "gp_subtransaction_overflow", link: "/extensions/bundled/gp_subtransaction_overflow" },
              { text: "greenplum_fdw", link: "/extensions/bundled/greenplum_fdw" },
              { text: "hstore", link: "/extensions/bundled/hstore" },
              { text: "ip4r", link: "/extensions/bundled/ip4r" },
              { text: "isn", link: "/extensions/bundled/isn" },
              { text: "ltree", link: "/extensions/bundled/ltree" },
              { text: "orafce", link: "/extensions/bundled/orafce_ref" },
              { text: "pageinspect", link: "/extensions/bundled/pageinspect" },
              { text: "pg_buffercache", link: "/extensions/bundled/pg_buffercache" },
              { text: "pg_cron", link: "/extensions/bundled/pg_cron" },
              { text: "pg_hint_plan", link: "/extensions/bundled/pg_hint_plan" },
              { text: "pg_stat_statements", link: "/extensions/bundled/pg_stat_statements" },
              { text: "pg_trgm", link: "/extensions/bundled/pg_trgm" },
              { text: "pgcrypto", link: "/extensions/bundled/pgcrypto" },
              { text: "postgres_fdw", link: "/extensions/bundled/postgres_fdw" },
              { text: "sslinfo", link: "/extensions/bundled/sslinfo" },
              { text: "tablefunc", link: "/extensions/bundled/tablefunc" },
              { text: "timestamp9", link: "/extensions/bundled/timestamp9" },
              { text: "tsm_system_rows", link: "/extensions/bundled/tsm_system_rows" },
              { text: "tsm_system_time", link: "/extensions/bundled/tsm_system_time" },
              { text: "uuid-ossp", link: "/extensions/bundled/uuid-ossp" }
            ],
          },
          {
            text: "Additional",
            link: "/extensions/additional/",
            collapsed: true,
            items: [
              { text: "whpg-vector", link: "/extensions/additional/pgvector/" }
            ],
          }
        ],
      }
    ]




  }
  
})






