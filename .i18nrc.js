module.exports = {
  markdown: {
    entry: ["./docs/前端/vitePress/*.md"],
    entryLocale: "zn-CN",
    entryExtension: ".md",
    outputLocales: ["en-US"],
    outputExtensions: (locale, { getDefaultExtension }) => {
      return "." + locale + ".md";
    },
    outputFileName: (locale, targetFileName) => {
      return targetFileName.replace("前端", locale + "\\前端");
    },
  },
};
