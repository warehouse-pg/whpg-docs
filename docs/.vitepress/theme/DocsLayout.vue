<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<style scoped>
h1 {
  letter-spacing: -.02em;
  line-height: 40px;
  font-size: 28px;
  position: relative;
  font-weight: 600;
  outline: none;
}

@media (min-width: 768px) {
h1 {
    font-size: 32px;
  }
}
</style>

<template>
  <Layout>
    <template #doc-before>
      <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
    </template>
  </Layout>
</template>
