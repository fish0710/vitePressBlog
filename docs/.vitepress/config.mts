import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fish59 Blog",
  description: "vitePress插件使用",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "示例", link: "/live2dProblem" },
    ],
    sidebar: [
      {
        text: "文档",
        items: [
          { text: "live2d使用及问题解决", link: "/live2dProblem" },
          { text: "ViewTransitionAPI使用", link: "/viewTransitionAPI" },
          { text: "md示例", link: "/markdown-examples" },
          { text: "API示例", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
