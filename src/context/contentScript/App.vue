<template>
    <div class="enter">
        <Popover v-model:visible="visible" title="工具箱" trigger="click">
            <template #content>
                <tools ref="toolsRef" :isToolsShow="toolsState.isToolsShow" />
            </template>
            <Button type="primary" v-if="toolsState.isToolsShow">
                <template #icon><DownOutlined /></template>
            </Button>
        </Popover>
    </div>
</template>

<script setup>
import { ref, unref, watch } from 'vue'
import tools from './components/tools'
import { useHybrid } from '@src/hybrid'
import { Popover, Button, Drawer } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'

const visible = ref(false)
const { state: toolsState } = useHybrid('toolsConfig')

</script>

<style lang='scss' scoped>
.enter {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    :deep(.ant-btn) {
      width: 50px;
      height: 20px;
      z-index: 100000;
    }
}
</style>
