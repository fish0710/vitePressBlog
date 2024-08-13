import { fileURLToPath } from "url";
import { defineConfig } from "vitepress";
import MarkdownDemo from "../../plugin/MarkdownDemo";
import sidebar from "./sidebar.mts";
import { withPwa } from "@vite-pwa/vitepress";

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  title: "Fish59 Blog",
  description: "vitePress插件使用",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "../示例文档/index.md" },
    ],
    sidebar: sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/fish0710/vitePressBlog" },
    ],
  },vite: {
    resolve: {
      alias: [{
        find:/^.*\/VPSwitchAppearance\.vue$/,
        replacement:fileURLToPath(new URL('./theme/components/ThemeSwitch.vue', import.meta.url))
      }]},
      plugins:[
        MarkdownDemo(),
      ]
    }
}))
