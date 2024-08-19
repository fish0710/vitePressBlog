# Introduction of live2d Issues and Solutions

## Importing Libraries and Components

```shell
npm install oh-my-live2d # Importing the live2d library
```

Register a live2d component globally.

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
    // Register a custom global component
    }
   
});
</script>
```

> Server-side rendering causes the live2d library to fail to find the global object `window`, leading to build failures.  
> The solution is to execute the code after the `onMounted` lifecycle to ensure that server-side execution generates static HTML content without executing code that depends on the browser environment.

## Re-execution of Component Code

```js
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import CustomComponent from './CustomComponent.vue'
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    app.config.globalProperties.isLoadLive2d = false; // Global property to check if live2d is loaded to avoid repeated loading
    app.component('CustomComponentfrom', CustomComponent /* ... */)
  }
} satisfies Theme
```

A global property needs to be added to determine whether live2d has been generated. If generated, it won't execute again.

## Remaining Issues

### Component Import is Independent

After importing in `index.md`, other documents do not have it, so directly accessing other documents will not show live2d.

Solution:

> Import the live2d component in the general slot within the Layout slot.

```js
<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <CustomComponentfrom />
    </template>
  </Layout>
</template>

<style scoped>
.title {
  color: red;
}
</style>
```

