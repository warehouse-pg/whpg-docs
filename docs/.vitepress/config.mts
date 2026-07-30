import { defineConfig } from 'vitepress'



 

// https://vitepress.dev/reference/site-config
export default defineConfig(
  
  {

  ignoreDeadLinks: false,
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
          { text: '7.x', link: '/whpg/7x' },
          { text: '6.x', link: '/whpg/6x' }
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
        link: "/whpg/7x/" ,
        collapsed: false,
        items: [
          { text: "Release Notes", link: "/whpg/7x/release_notes" },
          { text: "Install Guide", link: "/whpg/7x/install_guide/" },
          { text: "Admin Guide", link: "/whpg/7x/admin_guide/" },
          { text: "Best Practices", link: "/whpg/7x/best_practices/" },
          { text: "Utility Guide", link: "/whpg/7x/ref_guide/utility_guide/" },
          { text: "Analytics Guide", link: "/whpg/7x/admin_guide/analytics/" },
          { text: "Reference Guide", link: "/whpg/7x/ref_guide/" },
          { text: "Security Guide", link: "/whpg/7x/security_guide/" },
          { text: "Backup & Restore Guide", link: "/whpg/7x/admin_guide/backup_restore/" }





        ],
      },
      {
      text: "WHPG 6.x",
      link: "/whpg/6x/index.html" ,
      collapsed: true,
      items: [
          { text: "Release Notes", link: "/whpg/6x/release_notes/" },
          { text: "Install Guide", link: "/whpg/6x/install_guide/" },
          { text: "Admin Guide", link: "/whpg/6x/admin_guide/" },
          { text: "Best Practices", link: "/whpg/6x/best_practices/" },
          { text: "Utility Guide", link: "/whpg/6x/ref_guide/utility_guide/" },
          { text: "Analytics Guide", link: "/whpg/6x/admin_guide/analytics/" },
          { text: "Reference Guide", link: "/whpg/6x/ref_guide/" },
          { text: "Security Guide", link: "/whpg/6x/security-guide/" },

      
      ],
      }
    ]




  }
  
})






