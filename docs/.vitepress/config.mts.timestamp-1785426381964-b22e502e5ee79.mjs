// docs/.vitepress/config.mts
import { defineConfig } from "file:///sessions/inspiring-festive-ritchie/mnt/whpg-docs/node_modules/vitepress/dist/node/index.js";
var config_default = defineConfig(
  {
    ignoreDeadLinks: false,
    title: "WarehousePG",
    description: "WarehousePG, an Open Source alternative to Greenplum Database",
    rewrites: {
      "whpg/:slug*": "docs/:slug*"
    },
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      siteTitle: "WarehousePG",
      logo: {
        light: "/dark_gray_logo_no_text.png",
        dark: "/dark_gray_logo_no_text.png"
      },
      search: {
        provider: "local"
      },
      nav: [
        {
          text: "Docs",
          items: [
            { text: "7.x", link: "/docs/7x" },
            { text: "6.x", link: "/docs/6x" }
          ]
        },
        { text: "GitHub", link: "https://github.com/warehouse-pg/warehouse-pg" }
      ],
      socialLinks: [
        { icon: "github", link: "https://github.com/warehouse-pg/warehouse-pg" }
      ],
      sidebar: [
        {
          text: "WHPG Documentation"
        },
        {
          text: "WHPG 7.x",
          link: "/docs/7x/",
          collapsed: false,
          items: [
            { text: "Release Notes", link: "/docs/7x/release_notes" },
            { text: "Install Guide", link: "/docs/7x/install_guide/" },
            { text: "Admin Guide", link: "/docs/7x/admin_guide/" },
            { text: "Best Practices", link: "/docs/7x/best_practices/" },
            { text: "Utility Guide", link: "/docs/7x/ref_guide/utility_guide/" },
            { text: "Analytics Guide", link: "/docs/7x/admin_guide/analytics/" },
            { text: "Reference Guide", link: "/docs/7x/ref_guide/" },
            { text: "Security Guide", link: "/docs/7x/security_guide/" },
            { text: "Backup & Restore Guide", link: "/docs/7x/admin_guide/backup_restore/" }
          ]
        },
        {
          text: "WHPG 6.x",
          link: "/docs/6x/index.html",
          collapsed: true,
          items: [
            { text: "Release Notes", link: "/docs/6x/release_notes/" },
            { text: "Install Guide", link: "/docs/6x/install_guide/" },
            { text: "Admin Guide", link: "/docs/6x/admin_guide/" },
            { text: "Best Practices", link: "/docs/6x/best_practices/" },
            { text: "Utility Guide", link: "/docs/6x/ref_guide/utility_guide/" },
            { text: "Analytics Guide", link: "/docs/6x/admin_guide/analytics/" },
            { text: "Reference Guide", link: "/docs/6x/ref_guide/" },
            { text: "Security Guide", link: "/docs/6x/security-guide/" }
          ]
        }
      ]
    }
  }
);
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvaW5zcGlyaW5nLWZlc3RpdmUtcml0Y2hpZS9tbnQvd2hwZy1kb2NzL2RvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Nlc3Npb25zL2luc3BpcmluZy1mZXN0aXZlLXJpdGNoaWUvbW50L3docGctZG9jcy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vc2Vzc2lvbnMvaW5zcGlyaW5nLWZlc3RpdmUtcml0Y2hpZS9tbnQvd2hwZy1kb2NzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xuXG5cblxuIFxuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoXG4gIFxuICB7XG5cbiAgaWdub3JlRGVhZExpbmtzOiBmYWxzZSxcbiAgdGl0bGU6IFwiV2FyZWhvdXNlUEdcIixcbiAgZGVzY3JpcHRpb246IFwiV2FyZWhvdXNlUEcsIGFuIE9wZW4gU291cmNlIGFsdGVybmF0aXZlIHRvIEdyZWVucGx1bSBEYXRhYmFzZVwiLFxuICByZXdyaXRlczoge1xuICAgICd3aHBnLzpzbHVnKic6ICdkb2NzLzpzbHVnKidcbiAgfSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXG4gICAgICAgIFxuICAgIHNpdGVUaXRsZTogJ1dhcmVob3VzZVBHJywgXG4gICAgbG9nbzoge1xuICAgICAgbGlnaHQ6ICcvZGFya19ncmF5X2xvZ29fbm9fdGV4dC5wbmcnLFxuICAgICAgZGFyazogJy9kYXJrX2dyYXlfbG9nb19ub190ZXh0LnBuZycsXG4gICAgfSxcblxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6ICdsb2NhbCcsXG4gICAgfSxcblxuICAgIG5hdjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnRG9jcycsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnNy54JywgbGluazogJy9kb2NzLzd4JyB9LFxuICAgICAgICAgIHsgdGV4dDogJzYueCcsIGxpbms6ICcvZG9jcy82eCcgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyB0ZXh0OiAnR2l0SHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS93YXJlaG91c2UtcGcvd2FyZWhvdXNlLXBnJyB9LFxuXG4gICAgXSxcbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAgeyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS93YXJlaG91c2UtcGcvd2FyZWhvdXNlLXBnJyB9XG4gXSxcblxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1dIUEcgRG9jdW1lbnRhdGlvbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiV0hQRyA3LnhcIixcbiAgICAgICAgbGluazogXCIvZG9jcy83eC9cIiAsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiBcIlJlbGVhc2UgTm90ZXNcIiwgbGluazogXCIvZG9jcy83eC9yZWxlYXNlX25vdGVzXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiSW5zdGFsbCBHdWlkZVwiLCBsaW5rOiBcIi9kb2NzLzd4L2luc3RhbGxfZ3VpZGUvXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiQWRtaW4gR3VpZGVcIiwgbGluazogXCIvZG9jcy83eC9hZG1pbl9ndWlkZS9cIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJCZXN0IFByYWN0aWNlc1wiLCBsaW5rOiBcIi9kb2NzLzd4L2Jlc3RfcHJhY3RpY2VzL1wiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlV0aWxpdHkgR3VpZGVcIiwgbGluazogXCIvZG9jcy83eC9yZWZfZ3VpZGUvdXRpbGl0eV9ndWlkZS9cIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJBbmFseXRpY3MgR3VpZGVcIiwgbGluazogXCIvZG9jcy83eC9hZG1pbl9ndWlkZS9hbmFseXRpY3MvXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiUmVmZXJlbmNlIEd1aWRlXCIsIGxpbms6IFwiL2RvY3MvN3gvcmVmX2d1aWRlL1wiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlNlY3VyaXR5IEd1aWRlXCIsIGxpbms6IFwiL2RvY3MvN3gvc2VjdXJpdHlfZ3VpZGUvXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiQmFja3VwICYgUmVzdG9yZSBHdWlkZVwiLCBsaW5rOiBcIi9kb2NzLzd4L2FkbWluX2d1aWRlL2JhY2t1cF9yZXN0b3JlL1wiIH1cblxuXG5cblxuXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgdGV4dDogXCJXSFBHIDYueFwiLFxuICAgICAgbGluazogXCIvZG9jcy82eC9pbmRleC5odG1sXCIgLFxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6IFwiUmVsZWFzZSBOb3Rlc1wiLCBsaW5rOiBcIi9kb2NzLzZ4L3JlbGVhc2Vfbm90ZXMvXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiSW5zdGFsbCBHdWlkZVwiLCBsaW5rOiBcIi9kb2NzLzZ4L2luc3RhbGxfZ3VpZGUvXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiQWRtaW4gR3VpZGVcIiwgbGluazogXCIvZG9jcy82eC9hZG1pbl9ndWlkZS9cIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJCZXN0IFByYWN0aWNlc1wiLCBsaW5rOiBcIi9kb2NzLzZ4L2Jlc3RfcHJhY3RpY2VzL1wiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlV0aWxpdHkgR3VpZGVcIiwgbGluazogXCIvZG9jcy82eC9yZWZfZ3VpZGUvdXRpbGl0eV9ndWlkZS9cIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJBbmFseXRpY3MgR3VpZGVcIiwgbGluazogXCIvZG9jcy82eC9hZG1pbl9ndWlkZS9hbmFseXRpY3MvXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiUmVmZXJlbmNlIEd1aWRlXCIsIGxpbms6IFwiL2RvY3MvNngvcmVmX2d1aWRlL1wiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlNlY3VyaXR5IEd1aWRlXCIsIGxpbms6IFwiL2RvY3MvNngvc2VjdXJpdHktZ3VpZGUvXCIgfSxcblxuICAgICAgXG4gICAgICBdLFxuICAgICAgfVxuICAgIF1cblxuXG5cblxuICB9XG4gIFxufSlcblxuXG5cblxuXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlcsU0FBUyxvQkFBb0I7QUFPMVksSUFBTyxpQkFBUTtBQUFBLEVBRWI7QUFBQSxJQUVBLGlCQUFpQjtBQUFBLElBQ2pCLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxNQUNSLGVBQWU7QUFBQSxJQUNqQjtBQUFBLElBQ0EsYUFBYTtBQUFBO0FBQUEsTUFHWCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BRUEsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUVBLEtBQUs7QUFBQSxRQUNIO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTCxFQUFFLE1BQU0sT0FBTyxNQUFNLFdBQVc7QUFBQSxZQUNoQyxFQUFFLE1BQU0sT0FBTyxNQUFNLFdBQVc7QUFBQSxVQUNsQztBQUFBLFFBQ0Y7QUFBQSxRQUNBLEVBQUUsTUFBTSxVQUFVLE1BQU0sK0NBQStDO0FBQUEsTUFFekU7QUFBQSxNQUNBLGFBQWE7QUFBQSxRQUNYLEVBQUUsTUFBTSxVQUFVLE1BQU0sK0NBQStDO0FBQUEsTUFDNUU7QUFBQSxNQUVHLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxVQUNYLE9BQU87QUFBQSxZQUNMLEVBQUUsTUFBTSxpQkFBaUIsTUFBTSx5QkFBeUI7QUFBQSxZQUN4RCxFQUFFLE1BQU0saUJBQWlCLE1BQU0sMEJBQTBCO0FBQUEsWUFDekQsRUFBRSxNQUFNLGVBQWUsTUFBTSx3QkFBd0I7QUFBQSxZQUNyRCxFQUFFLE1BQU0sa0JBQWtCLE1BQU0sMkJBQTJCO0FBQUEsWUFDM0QsRUFBRSxNQUFNLGlCQUFpQixNQUFNLG9DQUFvQztBQUFBLFlBQ25FLEVBQUUsTUFBTSxtQkFBbUIsTUFBTSxrQ0FBa0M7QUFBQSxZQUNuRSxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sc0JBQXNCO0FBQUEsWUFDdkQsRUFBRSxNQUFNLGtCQUFrQixNQUFNLDJCQUEyQjtBQUFBLFlBQzNELEVBQUUsTUFBTSwwQkFBMEIsTUFBTSx1Q0FBdUM7QUFBQSxVQU1qRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDQSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsVUFDWCxPQUFPO0FBQUEsWUFDSCxFQUFFLE1BQU0saUJBQWlCLE1BQU0sMEJBQTBCO0FBQUEsWUFDekQsRUFBRSxNQUFNLGlCQUFpQixNQUFNLDBCQUEwQjtBQUFBLFlBQ3pELEVBQUUsTUFBTSxlQUFlLE1BQU0sd0JBQXdCO0FBQUEsWUFDckQsRUFBRSxNQUFNLGtCQUFrQixNQUFNLDJCQUEyQjtBQUFBLFlBQzNELEVBQUUsTUFBTSxpQkFBaUIsTUFBTSxvQ0FBb0M7QUFBQSxZQUNuRSxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sa0NBQWtDO0FBQUEsWUFDbkUsRUFBRSxNQUFNLG1CQUFtQixNQUFNLHNCQUFzQjtBQUFBLFlBQ3ZELEVBQUUsTUFBTSxrQkFBa0IsTUFBTSwyQkFBMkI7QUFBQSxVQUcvRDtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFLRjtBQUFBLEVBRUY7QUFBQzsiLAogICJuYW1lcyI6IFtdCn0K
