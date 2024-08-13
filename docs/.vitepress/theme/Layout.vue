<script setup>
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
import ResisterSW from "./components/ResisterSW.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <CustomComponentfrom />
    </template>
    <template #layout-bottom>
      <ResisterSW />
      <ReloadPrompt />
    </template>
  </Layout>
</template>

<style scoped>
.title {
  color: red;
}
</style>
