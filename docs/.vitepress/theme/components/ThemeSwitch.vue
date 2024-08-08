<template>
  <button @click="toggleAppearance" class="ThemeSwitchTabs">
    <div class="SunnyTab">
      <Sunny />
    </div>
    <div class="MoonTab">
      <MoonNight />
    </div>
  </button>
</template>

<script setup lang="ts">
import { Sunny, MoonNight } from "@element-plus/icons-vue";
import { inject, ref, watchPostEffect, nextTick } from "vue";
import { useData } from "vitepress";

const { isDark, theme } = useData();

const toggleAppearance = inject("toggle-appearance", async () => {
  //斜线变化
  // const clipPath = [
  //   `polygon(110% 0%, 210% 0%, 200% 100%, 100% 100%)`,
  //   `polygon(0% 0%, 110% 0%, 100% 100%, -10% 100%)`,
  // ];

  // 圆形变化;
  const clipPath = [
    `polygon(110% 0%, 210% 0%, 200% 100%, 100% 100%)`,
    `polygon(0% 0%, 110% 0%, 100% 100%, -10% 100%)`,
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

watchPostEffect(() => {
  isDark.value
    ? theme.value.lightModeSwitchTitle || "Switch to light theme"
    : theme.value.darkModeSwitchTitle || "Switch to dark theme";
});

// const changeTheme = () => {
//   const transition = document.startViewTransition(() => {
//     toggleDark();
//   });
//   transition.ready.then(() => {
//     // 裁剪平行四边形
//     const clipPath = [
//       `polygon(115% 0%, 215% 0%, 115% 100%, 100% 100%)`,
//       `polygon(0% 0%, 115% 0%, 100% 100%, -15% 100%)`,
//       // 初始状态，平行四边形覆盖整个视图
//       // 最终状态，平行四边形的宽度逐渐变成0
//     ]; // 自定义动画
//     document.documentElement.animate(
//       {
//         // 如果要切换到暗色主题，我们在过渡的时候从屏幕外的平行四边形平移进来覆盖页面
//         clipPath: isDark ? clipPath.reverse() : clipPath,
//       },
//       {
//         duration: 500,
//         // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
//         pseudoElement: isDark.value
//           ? "::view-transition-old(root)"
//           : "::view-transition-new(root)",
//       }
//     );
//   });
// };
</script>
<style scoped>
.ThemeSwitchTabs {
  background-color: var(--themeTabs);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.SunnyTab {
  padding: 3px;
  margin: 2px;
  background-color: var(--themeTabs-sunny-background-color);
  border-radius: 5px;
  box-shadow: var(--themeTabs-sunny-shadow);
}
.SunnyTab > svg {
  color: var(--themeTabs-sunny-color);
  width: 20px;
}
.MoonTab {
  padding: 3px;
  margin: 2px;
  background-color: var(--themeTabs-moon-background-color);
  border-radius: 5px;
}
.MoonTab > svg {
  width: 20px;
  color: var(--themeTabs-moon-color);
}
</style>
