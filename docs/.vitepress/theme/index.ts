// .vitepress/theme/index.ts
import type { Theme } from "vitepress";
import CustomComponent from "./components/CustomComponent.vue";
import DefaultTheme from "vitepress/theme";
import Layout from "./components/Layout.vue";
import './style/dark.css'
import ThemeSwitch from "./components/ThemeSwitch.vue";

export default {
  extends: DefaultTheme,
  Layout,
  async enhanceApp({ app }) {
    app.config.globalProperties.isLoadLive2d = false; //全局设置一个属性是否加载live2d，避免重复加载
    app.component("CustomComponentfrom", CustomComponent /* ... */);
    app.component("ThemeSwitch", ThemeSwitch);
  },
} satisfies Theme;
