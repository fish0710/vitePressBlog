<template>
    <div></div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  const { loadOml2d } = await import('oh-my-live2d');
  loadOml2d({
    models: [
      {
        path: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hijiki/hijiki.model.json'
      }
    ]
  });
});
</script>