// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import CustomComponent from './CustomComponent.vue'
import DefaultTheme from 'vitepress/theme'
import { Button } from 'element-ui';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('CustomComponentfrom',CustomComponent /* ... */)

  }
} satisfies Theme