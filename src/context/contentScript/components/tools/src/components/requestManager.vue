<template>
    <Card>
        <Table :dataSource="state.urls" :columns="columns" :pagination="false">
            <template #headerCell="{ column }">
                <template v-if="column.title==='URL'">
                    <InputGroup compact style="display:flex;align-items:center">
                        <span style="width:50px;margin-right:10px;">{{column.title}}</span>
                        <Input v-model:value="url" placeholder="请输入URL" style="width: calc(100% - 160px)"></Input>
                        <Button type="primary" @click="addUrl(url)" style="width:100px">添加网址</Button>
                    </InputGroup>
                </template>
            </template>
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.title === 'URL'">
                    <span>{{record.url}}</span>
                </template>
                <template v-if="column.title === '操作'">
                    <Button type="text" @click="switchBlock(record.id)">{{record.isBlocking ? 'unBlock' : 'block'}}</Button>
                    <Button type="text" @click="deleteURL(record.id)">删除</Button>
                </template>
            </template>
        </Table>
    </Card>
</template>

<script setup>
import { Card, Row, Col, InputGroup, Input, Table, Button } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useHybrid } from '@src/hybrid'

const url = ref('')

const { state } = useHybrid('request')
const addUrl = (url) => {
    const id = Date.now()
    if (state.value.urls.findIndex(item => item.url === url) > -1) {
        return
    }
    state.value.urls.push({
        url,
        id,
        isBlocking: false
    })
}

const deleteURL = (id) => {
    const index = state.value.urls.findIndex(item => item.id === id)
    if (index > -1) {
        state.value.urls.splice(index, 1)
    }
}

const switchBlock = (id) => {
    const item = state.value.urls.find(item => item.id === id)
    if (item) {
        item.isBlocking = !item.isBlocking
    }
}

const columns = [
    {
        title: 'URL',
        dataIndex: 'url',
        width: 500,
    },
    {
        title: '操作',
        dataIndex: 'operation',
    }
]
</script>
