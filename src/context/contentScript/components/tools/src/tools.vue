<template>
    <div class="tools">
        <componentDetecter />
        <requestManager />
        <capturer />
    </div>
</template>

<script setup>
import { ref, unref, watch } from 'vue'
import componentDetecter from './components/componentDetecter.vue'
import requestManager from './components/requestManager.vue'
import capturer from './components/capturer.vue'

const props = defineProps({
    isToolsShow: false
})

watch(props, (props) => {
    console.log(props, 'isToolsShow')
})
</script>

<style lang='scss' scoped>
.tools {
    margin: 15px;
    padding: 15px;
    width: 800px;
    height: 500px;
    border: 1px solid #ccc;
}
</style>
