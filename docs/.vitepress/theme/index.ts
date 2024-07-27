// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import CustomComponent from './CustomComponent.vue'
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    app.config.globalProperties.isLoadLive2d = false;//全局设置一个属性是否加载live2d，避免重复加载
    app.component('CustomComponentfrom', CustomComponent /* ... */)
  }
} satisfies Theme