export default [
    {
      text: "vitePress相关实践文档",
      collapsed:false,
      link: "../vite相关实践/index.md" ,
      items: [
        { text: "live2d使用及问题解决", link: "../vite相关实践/live2dProblem.md" },
        // { text: "ViewTransitionAPI使用", link: "/viewTransitionAPI" },
        { text: "vitepress自定义内部组件", link: "../vite相关实践/自定义切换主题开关.md" },
      ],
    },
    {
        text:"Web API",
        collapsed:false,
        link: "../Web_API/index.md" ,
        items: [
          { text: "View Transition API", link: "../Web_API/viewTransitionAPI.md" },
        ],
      },
    {
        text: "示例文档",
        link:'../示例文档/index.md',
        collapsed: false,
        items: [
          { text: "Markdown示例", link: "../示例文档/markdown-examples" },
          { text: "API示例", link: "../示例文档/api-examples" },
        ],
      }
  ];