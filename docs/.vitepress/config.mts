import { defineConfig } from 'vitepress'



 

// https://vitepress.dev/reference/site-config
export default defineConfig(
  
  {

  ignoreDeadLinks: true,
  title: "WarehousePG",

  description: "WarehousePG, an Open Source alternative to Greenplum Database",
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
          { text: '6.x', link: '/docs/6x' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/warehouse-pg/warehouse-pg' },

    ],
    socialLinks: [

      { icon: 'github', link: 'https://github.com/warehouse-pg/warehouse-pg' }

    ],

    sidebar: [
      {
        text: 'WHPG Documentation'
      },
      {
        text: "WHPG 7.x",
        link: "/docs/7x/" ,
        collapsed: false,
        items: [
          { text: "Release Notes", link: "/docs/7x/" },
          { text: "Install Guide", link: "/docs/7x/install_guide/" },
          { text: "Admin Guide", link: "/docs/7x/admin_guide/" },
          { text: "Cluster Utilities", link: "/docs/7x/utility_guide/reference.md" },         
          { text: "Analytics Guide", link: "/docs/7x/analytics/" },      
          { text: "Reference Guide", link: "/docs/7x/ref_guide/" },        
          { text: "Backup/Restore Guide", link: "/docs/7x/admin_guide/backup_restore/backup-gpbackup.md" }





        ],
      },
      {
      text: "WHPG 6.x",
      link: "/docs/6x/index.html" ,
      collapsed: true,
      items: [

      
      ],
      }
    ]
    



  }
  
})






