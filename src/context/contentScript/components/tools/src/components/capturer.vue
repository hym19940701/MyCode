<template>
    <Card class="box-card">
        <InputGroup>
            <Input v-model:value="url" style="width:calc(100% - 200px)"></Input>
            <Button type="primary" @click="download" style="width:120px">下载图片</Button>
            <Button type="primary" @click="capture" style="width:80px">截图</Button>
        </InputGroup>
    </Card>
</template>

<script setup>
import { Card, InputGroup, Input, Button, message } from 'ant-design-vue'
import { ref } from 'vue'
import { useHybrid } from '@src/hybrid'

const { contentScript } = useHybrid('capture')
const url = ref('')

const download = () => {
     contentScript.download(url.value).then((downloadId) => {
        if (String(downloadId)) {
            message.success('下载完成')
        } else {
            message.error('下载失败,请检查图片地址是否正确.')
        }
     })
}

const capture = () => {
     contentScript.capture()
}

</script>
