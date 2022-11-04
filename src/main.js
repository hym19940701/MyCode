import { createApp } from 'vue'
import hybrid from './hybrid'
import contentScriptApp from './context/contentScript/App'
import popupApp from './context/popup/App'
import background from './context/background'
import app from './app'
import 'ant-design-vue/dist/antd.min.css'
import '@src/style'

const render = {
    install (app) {
        app.useContentScript(() => {
            const container = document.createElement('div')
            container.setAttribute('class', 'chrome-plugin-app')
            document.body.appendChild(container)
            createApp(contentScriptApp).mount(container)
        })
        app.usePopup(() => {
            createApp(popupApp).mount('.chrome-plugin-app')
        })
        app.useBackground(background)
    }
}

app
    .use(hybrid)
    .use(render)
    .connect(app.currentEnv)
