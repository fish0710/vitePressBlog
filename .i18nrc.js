module.exports = {
  markdown: {
    entry: ["./ohmyzsh.md"],
    entryLocale: "en-US",
    entryExtension: ".md",
    outputLocales: ["zn-CN"],
    outputExtensions: (locale, { getDefaultExtension }) => {
      return ".zn-CN.md";
    },
    outputFileName: (locale, targetFileName) => {
      return targetFileName.replace("docs");
    },
  },
};
