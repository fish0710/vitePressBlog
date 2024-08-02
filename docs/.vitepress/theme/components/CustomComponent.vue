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