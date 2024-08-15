import { fileURLToPath } from "url";
import { defineConfig, Plugin } from "vitepress";
import MarkdownDemo from "../../plugin/MarkdownDemo";
import sidebar from "./sidebar.mts";
import nav from "./nav.mts";
import AutoSidebarPlugin from "vitepress-auto-sidebar-plugin";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fish59 Blog",
  description: "vitePress插件使用",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar: sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/fish0710/vitePressBlog" },
    ],
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/ThemeSwitch.vue", import.meta.url)
          ),
        },
      ],
    },
    plugins: [
      MarkdownDemo(),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "test.html", //分析图生成的文件名
        open: true, //如果存在本地服务端口，将在打包后自动展示
      }) as Plugin,
      AutoSidebarPlugin({
        srcDir: "./docs",
      }) as Plugin,
    ],
  },
});
