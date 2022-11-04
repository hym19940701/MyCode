import Event from 'events'
import app from '@src/app'

const getActiveTab = () => {
    return new Promise(resolve => {
        chrome.tabs.query({active: true}, function (tabs) {
            resolve(tabs[0])
        })
    })
}

const packSendData = (message, data) => {
    const res = {
        _FROME_: app.currentEnv,
        _MSG_: message,
        _DATA_: data
    }

    return res
}

const event = new Event()
event.setMaxListeners(100000)

chrome.runtime.onMessage.addListener((incomming, sender, sendResponse) => {
    console.log(`%cIcomming Message(from: ${incomming._FROME_}):` + incomming._MSG_, 'color:green;font-size:14px')
    event.emit(incomming._MSG_, incomming._DATA_, sendResponse)
    return true
})
class Bridge {
    _namespace = ''
    constructor (namespace) {
        this._namespace = namespace
    }
    
    create (namespace) {
        return new Bridge(namespace)
    }

    sendMessage (message, data) {
        message = this._namespace + '_' + message
        const packedData = packSendData(message, data)

        return new Promise(resolve => {
            if (app.currentEnv === 'contentScript') {
                chrome.runtime.sendMessage(packedData, resolve)
            } else {
                getActiveTab().then(tab => {
                    chrome.tabs.sendMessage(tab.id, packedData, resolve)
                })
            }
        })
    }

    onMessage (message, callback) {
        message = this._namespace + '_' + message
        event.on(message, (data, sendResponse) => {
            callback(data, sendResponse)
        })
    }
}

export default new Bridge('App')
