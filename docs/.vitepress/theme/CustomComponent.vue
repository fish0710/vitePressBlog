<template>
</template>

<script setup>
import { loadOml2d }  from 'oh-my-live2d';
loadOml2d({
    models: [
        {
        path: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hijiki/hijiki.model.json'
        }
    ]
});
</script>