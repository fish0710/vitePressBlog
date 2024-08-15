module.exports = {
  markdown: {
    entry: ["./docs/前端/vitePress/自定义切换主题开关.md"],
    entryLocale: "zh-CN",
    entryExtension: ".md",
    outputLocales: ["en-US"],
    outputExtensions: (locale, { getDefaultExtension }) => {
      return ".md";
    },
    outputFileName: (locale, targetFileName) => {
      return targetFileName.replace("docs", "docs\\" + locale);
    },
  },
};
