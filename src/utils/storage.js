import Event from 'events'
import app from '@src/app'
import bridge from './bridge'
import log from '@src/utils/log'

const storageBridge = bridge.create('Storage')
const event = new Event()
event.setMaxListeners(1000000)

app.useBackground(() => {
    chrome.storage.onChanged.addListener((changes) => {
        event.emit('change', changes)
        storageBridge.sendMessage('change', changes)
    })
})

storageBridge.onMessage('change', changes => {
    event.emit('change', changes)
})

class Storage {
    constructor () {
        storageBridge.onMessage('setItem', ({key, item}, sendResponse) => {
            this._setItem(key, item).then(sendResponse)
        })
        storageBridge.onMessage('getItem', (key, sendResponse) => {
            this._getItem(key).then(sendResponse)
        })
    }

    /**
     * 
     * @param {String} key 
     * @param {String|Number|Object...} item 
     * @returns {Promise}
     */
    setItem (key, item) {
        if (app.currentEnv === 'contentScript') {
            return storageBridge.sendMessage('setItem', {key, item})
        } else {
            return this._setItem(key, item)
        }
    }
    
    /**
     * 
     * @param {String} key 
     * @returns {Promise}
     */
    getItem (key) {
        if (app.currentEnv === 'contentScript') {
            return storageBridge.sendMessage('getItem', key)
        } else {
            return this._getItem(key)
        }
    }
    watch (key, callback) {
        event.on('change', (changes) => {
            if (key in changes) {
                callback && callback(changes[key])
            }
        })
    }
    _setItem (key, item) {
        log('_setItem', item)
        return new Promise(resolve => {
            chrome.storage.sync.set({[key]: item}, resolve)
        })
    }
    _getItem (key) {
        return new Promise((resolve) => {
            chrome.storage.sync.get([key], data => resolve(data[key]))
        }) 
    }
}

export default new Storage()
