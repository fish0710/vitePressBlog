<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { provide, nextTick } from "vue";
import I18nSelector from "./I18nSelector.vue";

const { isDark } = useData();
const enableTransitions = () => "startViewTransition" in document;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }
  //斜线变化
  // const clipPath = [
  //   `polygon(110% 0%, 210% 0%, 200% 100%, 100% 100%)`,
  //   `polygon(0% 0%, 110% 0%, 100% 100%, -10% 100%)`,
  // ];

  // 圆形变化;
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-title-before>
      <CustomComponentfrom />
    </template>
    <template #nav-bar-content-after><I18nSelector /></template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
