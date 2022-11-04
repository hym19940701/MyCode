<template>
    <div id="popup">
        <Switch v-model:checked="toolsState.isToolsShow">
            <template #checkedChildren>
                <span>显示工具栏</span>
            </template>
            <template #unCheckedChildren>
                <span>隐藏工具栏</span>
            </template>
        </Switch>
        <Switch v-model:checked="detectState.isDetect">
            <template #checkedChildren>
                <span>显示组件结构</span>
            </template>
            <template #unCheckedChildren>
                <span>隐藏组件结构</span>
            </template>
        </Switch>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, shallowRef, defineComponent, reactive } from 'vue'
import { Switch } from 'ant-design-vue'
import { useHybrid } from '@src/hybrid'

const { state: toolsState } = useHybrid('toolsConfig')
const { state: detectState } = useHybrid('componentDetect')

</script>

<style lang="scss">
body {
    height: auto;
}
#popup {
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 15px;
    width: 300px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 3px;

    .top {
        flex: 2
    }
    .bottom {
        flex: 1
    }
}
</style>
