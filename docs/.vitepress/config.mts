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
          { text: 'PXF 6.x', link: '/pxf/6x/' }
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
      }
    ]




  }
  
})






