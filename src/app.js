import Event from 'events'
import { ENV_MAP } from '@src/consts'

export class App extends Event {
    currentEnv = ''
    constructor () {
        super()
        this.setMaxListeners(100000)
        this.currentEnv = this.getEnv()
    }

    getEnv () {
        if (location.protocol === 'chrome-extension:') {
            return location.href.includes(ENV_MAP['POPUP']) ? ENV_MAP['POPUP'] : ENV_MAP['BACKGROUND']
        } else {
            return ENV_MAP['CONTENT_SCRIPT']
        }
    }

    use (module) {
        const install = typeof module === 'function' ? module : typeof module.install === 'function' ? module.install : null

        if (!install) {
            throw new Error('Please set install function')
        }

        install(this)
        return this
    }

    useContentScript (fn) {
        this.on(ENV_MAP['CONTENT_SCRIPT'], fn)
    }

    usePopup (fn) {
        this.on(ENV_MAP['POPUP'], fn)
    }

    useBackground (fn) {
        this.on(ENV_MAP['BACKGROUND'], fn)
    }

    connect (env = this.currentEnv) {
        this.emit(env)
    }
}

export default new App()
