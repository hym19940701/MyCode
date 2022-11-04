<template>
    <Card class="box-card">
        <Row>
            <Col :span="5" :style="{color: state.isDetect ? 'unset' : '#409eff'}">隐藏页面组件结构</Col>
            <Col :span="3"><Switch v-model:checked="state.isDetect"></Switch></Col>
            <Col :span="5" :style="{color: state.isDetect ? '#409eff' : 'unset'}">显示页面组件结构</Col>
        </Row>
    </Card>
</template>

<script setup>
import { Card, Button, Switch, Row, Col } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { useHybrid } from '@src/hybrid'

const { state } = useHybrid('componentDetect')

const reset = () => {

}

defineExpose({
    reset
})
</script>
