<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <CustomComponentfrom />
    </template>
  </Layout>
</template>

<style scoped>
.title {
  color: red;
}
</style>