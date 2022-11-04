import { watch } from 'vue'

export default {
    state () {
        return {
            urls: []
        }
    },
    background ({state}) {
        let blockingUrls = []
        watch(state, ({urls}) => {
            blockingUrls = urls.filter(item => item.isBlocking).map(item => item.url)
        })

        chrome.webRequest.onBeforeRequest.addListener(
            (detail) => {
                const isCancel = blockingUrls.some(item => detail.url.includes(item))
                return { cancel: isCancel }
            },
            { urls: ['<all_urls>'] },
            [ 'blocking' ]
        )
    }
}
