import { defineConfig } from 'vitepress'





// https://vitepress.dev/reference/site-config
export default defineConfig({

  ignoreDeadLinks: true,
  title: "WarehousePG",


  description: "WarehousePG, an Open Source alternative to Greenplum Database",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Docs',
        items: [
          { text: '6.x', link: '/docs/6x' },
          { text: '7.x', link: '/docs/7x' },
          { text: 'Security Guide', link: '/docs/7x/security_guide' },
          { text: 'Utility Guide', link: '/docs/7x/utility_guide' },
          { text: 'Performance Guide', link: '/docs/7x/performance_guide' },
          { text: 'Reference Guide', link: '/docs/7x/reference_guide' }
        ]
      },
      { text: 'Blog', link: '/markdown-examples' },
      { text: 'Code', link: '/markdown-examples' },
      { text: 'About', link: '/markdown-examples' },
      { text: 'GitHub', link: 'https://github.com/warehouse-pg/warehouse-pg' },

    ],

    siteTitle: 'WarehousePG', 
    footer: {
      message: 'Released under the Apache 2.0 License.',
      copyright: 'Copyright © 2025',
    },
    logo: {
      light: '/dark_gray_logo_no_text.png',
      dark: '/dark_gray_logo_no_text.png',
    },

    sidebar: [
      {
        text: '',
        items: [
          { text: 'GitHub', link: 'https://github.com/warehouse-pg/warehouse-pg' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Contribute', link: 'docs' },   
          { text: 'Another', link: 'https://github.com/warehouse-pg/warehouse-pg' }

        ]
      },
      {
        text: "Release Notes",
        link: "/docs/7x/release_notes/" ,
        collapsed: true,
        items: [
          { text: "6.x", link: "/docs/7x/release_notes/" },
          { text: "Installation Utilities Reference", link: "/docs/7x/install_guide/installation_utilities.md" },
          { text: "WHPG Environment Variables", link: "/docs/7x/install_guide/env_var.md" }
        ],
      },
     {
        text: "Install Guide",
        link: "/docs/7x/install_guide/" ,
        collapsed: true,
        items: [
          { text: "Platform Requirements", link: "/docs/7x/install_guide/platform-requirements.md" },
          { text: "Estimating Storage Capacity", link: "/docs/7x/install_guide/capacity_planning.md" },
          { text: "Configure Operating System", link: "/docs/7x/install_guide/config_os.md" },
          { text: "Installing WarehousePG", link: "/docs/7x/install_guide/install_whpg.md" },
          { text: "Creating the Data Storage Areas", link: "/docs/7x/install_guide/create_data_dirs.md" },
          { text: "Validating the WHPG Cluster", link: "/docs/7x/install_guide/validate.md" },
          { text: "Initializing WarehousePG", link: "/docs/7x/install_guide/init_whpg.md" },
          { text: "Installing Optional Extensions", link: "/docs/7x/install_guide/data_sci_pkgs.md" },
          { text: "Installing Extensions", link: "/docs/7x/install_guide/install_extensions.md" },
          { text: "Configuring Timezone and Localization Settings", link: "/docs/7x/install_guide/localization.md" },
          { text: "Upgrading from WHPG6 to WHPG7", link: "/docs/7x/install_guide/upgrading_6_to_7.md" },
          { text: "Enabling iptables (Optional)", link: "/docs/7x/install_guide/enable_iptables.md" },
          { text: "Installation Utilities Reference", link: "/docs/7x/install_guide/installation_utilities.md" },
          { text: "WHPG Environment Variables", link: "/docs/7x/install_guide/env_var.md" }
        ],
      } ,
      {
        text: "Admin Guide",
        link: "/docs/7x/admin_guide/" ,
        collapsed: true,
        items: [
          { text: "Getting Started", link: "/docs/7x/admin_guide/getting_started" },
          { text: "WHPG Database Concepts", link: "/docs/7x/admin_guide/intro/concepts.md" },
          { text: "Managing a WHPG Cluster", link: "/docs/7x/admin_guide/managing/managing.md" },
          { text: "Managing User Access", link: "/docs/7x/admin_guide/access.md" },
          { text: "Data Distribution and Skew", link: "/docs/7x/admin_guide/distribution.md" },          
          { text: "DDL: Defining Objects", link: "/docs/7x/admin_guide/ddl/ddl.md" },
          { text: "DML: INSERT,UPDATE,DELETE", link: "/docs/7x/admin_guide/dml.md" },
          { text: "SQL: Querying Data", link: "/docs/7x/admin_guide/query/topics/query.md" },
          { text: "External Data Sources", link: "/docs/7x/admin_guide/external/working-with-file-based-ext-tables.md" },
          { text: "Loading and Unloading Data", link: "/docs/7x/admin_guide/load/topics/g-loading-and-unloading-data.md" },
          { text: "Managing Performance", link: "/docs/7x/admin_guide/performance.md" }
        ],
      } ,
      {
        text: "Security Guide",
        link: "/docs/7x/security_guide/" ,
        collapsed: true,
        items: [
          { text: "Securing the Database", link: "/docs/7x/security_guide/securing_whpg.md" },
          { text: "Ports and Protocols", link: "/docs/7x/security_guide/ports_and_protocols.md" },
          { text: "Client Authentication", link: "/docs/7x/security_guide/authentication.md" },
          { text: "Auditing", link: "/docs/7x/security_guide/auditing.md" },
          { text: "Encryption", link: "/docs/7x/security_guide/encryption.md" },
          { text: "Security Best Practices", link: "/docs/7x/security_guide/best_practices.md" }
        ],
      } ,
      {
        text: "Cluster Utilities Guide",
        link: "/docs/7x/utility_guide/reference.md" ,
        collapsed: true,
        items: [
          { text: "Overview", link: "/docs/7x/utility_guide/overview.md" },
          { text: "Reference", link: "/docs/7x/utility_guide/reference.md" , collapsed: true, 
            items: [ 
              {text: "analyzedb", link: "/docs/7x/utility_guide/ref/analyzedb.md"},
              {text: "clusterdb", link: "/docs/7x/utility_guide/ref/clusterdb.md"},
              {text: "createdb", link: "/docs/7x/utility_guide/ref/createdb.md"},
              {text: "createuser", link: "/docs/7x/utility_guide/ref/createuser.md"},
              {text: "dropdb", link: "/docs/7x/utility_guide/ref/dropdb.md"},
              {text: "dropuser", link: "/docs/7x/utility_guide/ref/dropuser.md"},
              {text: "gpactivatestandby", link: "/docs/7x/utility_guide/ref/gpactivatestandby.md"},
              {text: "gpaddmirrors", link: "/docs/7x/utility_guide/ref/gpaddmirrors.md"},
              {text: "gpbackup", link: "/docs/7x/utility_guide/ref/gpbackup.md"},
              {text: "gpcheckcat", link: "/docs/7x/utility_guide/ref/gpcheckcat.md"},
              {text: "gpcheckperf", link: "/docs/7x/utility_guide/ref/gpcheckperf.md"},
              {text: "gpconfig", link: "/docs/7x/utility_guide/ref/gpconfig.md"},
              {text: "gpdeletesystem", link: "/docs/7x/utility_guide/ref/gpdeletesystem.md"},
              {text: "gpexpand", link: "/docs/7x/utility_guide/ref/gpexpand.md"},
              {text: "gpfdist", link: "/docs/7x/utility_guide/ref/gpfdist.md"},
              {text: "gpinitstandby", link: "/docs/7x/utility_guide/ref/gpinitstandby.md"},
              {text: "gpinitsystem", link: "/docs/7x/utility_guide/ref/gpinitsystem.md"},
              {text: "gpload", link: "/docs/7x/utility_guide/ref/gpload.md"},
              {text: "gplogfilter", link: "/docs/7x/utility_guide/ref/gplogfilter.md"},
              {text: "gpmemreport", link: "/docs/7x/utility_guide/ref/gpmemreport.md"},
              {text: "gpmemwatcher", link: "/docs/7x/utility_guide/ref/gpmemwatcher.md"},
              {text: "gpmovemirrors", link: "/docs/7x/utility_guide/ref/gpmovemirrors.md"},
              {text: "gprecoverseg", link: "/docs/7x/utility_guide/ref/gprecoverseg.md"},
              {text: "gpreload", link: "/docs/7x/utility_guide/ref/gpreload.md"},
              {text: "gprestore", link: "/docs/7x/utility_guide/ref/gprestore.md"},
              {text: "gpssh", link: "/docs/7x/utility_guide/ref/gpssh.md"},
              {text: "gpssh-exkeys", link: "/docs/7x/utility_guide/ref/gpssh-exkeys.md"},
              {text: "gpstart", link: "/docs/7x/utility_guide/ref/gpstart.md"},
              {text: "gpstate", link: "/docs/7x/utility_guide/ref/gpstate.md"},
              {text: "gpstop", link: "/docs/7x/utility_guide/ref/gpstop.md"},
              {text: "gpsync", link: "/docs/7x/utility_guide/ref/gpsync.md"},
              {text: "pg\_config", link: "/docs/7x/utility_guide/ref/pg_config.md"},
              {text: "pg\_dump", link: "/docs/7x/utility_guide/ref/pg_dump.md"},
              {text: "pg\_dumpall", link: "/docs/7x/utility_guide/ref/pg_dumpall.md"},
              {text: "pg_filedump", link: "/docs/7x/utility_guide/ref/pg_filedump.md"},
              {text: "pg\_restore", link: "/docs/7x/utility_guide/ref/pg_restore.md"},
              {text: "plcontainer", link: "/docs/7x/utility_guide/ref/plcontainer.md"},
              {text: "plcontainer Configuration File", link: "/docs/7x/utility_guide/ref/plcontainer-configuration.md"},
              {text: "psql", link: "/docs/7x/utility_guide/ref/psql.md"},
              {text: "reindexdb", link: "/docs/7x/utility_guide/ref/reindexdb.md"},
              {text: "vacuumdb", link: "/docs/7x/utility_guide/ref/vacuumdb.md"}
      
            
            ]},




          { text: "Additional Utilities", link: "/docs/7x/utility_guide/additional.md" }
        ],
      } ,
      {
        text: "Analytics Guide",
        collapsed: true,
        items: [
          { text: "Install Guide", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x/admin_guide/getting_started" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" }
        ],
      },

      {
        text: "Analytics Guide",
        link: "/docs/7x/analytics/" ,
        collapsed: true,
        items: [
          { text: "Apahce MADlib", link: "docs/7x/analytics/madlib.md" },
          { text: "PostGIS", link: "/docs/7x/analytics/postGIS.md" },
          { text: "Text Analytics & Search", link: "docs/7x/analytics/text.md" },
          { text: "PL Extensions", link: "/docs/7x/analytics/pl.md" }
        ],
      } ,






      {
        text: "Reference Guide",
        link: "/docs/7x/ref_guide" ,
        collapsed: true,
        items: [
          { text: "SQL Reference", link: "/docs/7x" },
          { text: "Command Reference", link: "/docs/7x/admin_guide/getting_started" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" }
        ],
      }  
      ,
      {
        text: "Backup/Restore Guide",
        collapsed: true,
        items: [
          { text: "SQL Reference", link: "/docs/7x" },
          { text: "Command Reference", link: "/docs/7x/admin_guide/getting_started" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" },
          { text: "Getting Started", link: "/docs/7x" }
        ],
      }  
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/warehouse-pg/warehouse-pg' },
      { icon: 'slack', link: 'https://warehouse-pg.slack.com' }
    ]
  }
  
})


