// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import CustomComponent from './CustomComponent.vue'
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    const { loadOml2d } = await import('oh-my-live2d');

    // 使用 mixin 在所有组件中添加 mounted 钩子
    
        loadOml2d({
          models: [
            {
              path: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hijiki/hijiki.model.json'
            }
          ]
        });


    // 注册自定义全局组件
    app.component('CustomComponentfrom', CustomComponent /* ... */)
  }
} satisfies Theme