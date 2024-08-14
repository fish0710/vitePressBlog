import { fileURLToPath } from "url";
import { defineConfig } from "vitepress";
import MarkdownDemo from "../../plugin/MarkdownDemo";
import sidebar from "../sidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fish59 Blog",
  description: "vitePress插件使用",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "前端"  ,items:[
        { text: "Web API", link: "../Web_API/index.md" },
        { text: "vitePress相关实践文档", link: "../vite相关实践/index.md" },
      ]},
      { text: "工具", items:[
        { text: "Nginx相关", link: "../Ng相关/index.md" }
      ]}
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
})
