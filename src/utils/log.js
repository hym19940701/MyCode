import app from '@src/app'
import bridge from './bridge'

const logBridge = bridge.create('Log')

class Log {
    constructor () {
        if (app.currentEnv === 'contentScript') {
            logBridge.onMessage('log', (args) => {
                console.log(...args)
            })
        }
    }
    log (...args) {
        if (app.currentEnv !== 'contentScript') {
            logBridge.sendMessage('log', args)
        } else {
            console.log(...args)
        }
    }
}

export default new Log().log
