# live2d的引入问题及解决方法

## 引入库及组件

```shell
npm install oh-my-live2d #引入live2d库
```

在全局中注册一个live2d组件
```js
<template>
    <div></div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance } from 'vue';

onMounted(async () => {
    const instance = getCurrentInstance();
    if(!instance) return;
    const isLoad = instance.appContext.config.globalProperties.isLoadLive2d;
    if(!isLoad){
        instance.appContext.config.globalProperties.isLoadLive2d = true;
        const { loadOml2d } = await import('oh-my-live2d');
        loadOml2d({
          models: [
            {
              path: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hijiki/hijiki.model.json'
            }
          ]
        });
    // 注册自定义全局组件
    }
   
});
</script>
```
> 服务端渲染导致live2d库找不到依赖全局对象window，导致打包失败。
> 解决方法是在onMounted生命周期之后执行,保证服务端执行代码，生成静态 HTML 内容，不执行依赖浏览器环境的代码。

## 组件重新执行代码

```js
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
```

需要在全局增加一个属性来判断live2d是否被生成，生成后就不执行了

<CustomComponentfrom />

## 待解决问题

### 组件引入是独立的

在index.md引入之后，其他的文档没有，所以直接访问其他文档不会有live2d出现