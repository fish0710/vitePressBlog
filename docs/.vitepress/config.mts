import { fileURLToPath } from "url";
import { defineConfig } from "vitepress";
import MarkdownDemo from "../../plugin/MarkdownDemo";
import sidebar from "./sidebar.mts";
import nav from "./nav.mts";
import AutoSidebarPlugin from "vitepress-auto-sidebar-plugin";

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
      AutoSidebarPlugin({
        srcDir: "./docs",
      }),
    ],
  },
});
