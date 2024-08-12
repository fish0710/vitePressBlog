import { fileURLToPath } from "url";
import { defineConfig } from "vitepress";
import MarkdownDemo from "../../plugin/MarkdownDemo";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fish59 Blog",
  description: "vitePress插件使用",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/live2dProblem" },
    ],
    sidebar: [
      {
        text: "文档",
        items: [
          { text: "live2d使用及问题解决", link: "/live2dProblem" },
          { text: "ViewTransitionAPI使用", link: "/viewTransitionAPI" },
          { text: "vitepress自定义内部组件", link: "/自定义切换主题开关" },
          { text: "md示例", link: "/markdown-examples" },
          { text: "API示例", link: "/api-examples" },
        ],
      },
    ],

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
});
