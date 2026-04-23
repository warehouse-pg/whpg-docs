// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme, PageData } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocsLayout from './DocsLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: DocsLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
