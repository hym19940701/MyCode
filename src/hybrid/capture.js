/**
 * @desc 图片下载与网页截图
 */

export default {
     contentScript ({ bridge }) {
          const capture = () => {
               return bridge.sendMessage('capture')
          }
          const download = (url) => {
               return bridge.sendMessage('download', url)
          }

          return { 
               capture,
               download
          }
     },
     background ({ bridge }) {
          const capture = () => new Promise((resolve, reject) => {
               chrome.tabs.captureVisibleTab(base64 => resolve(base64))
          })

          const download = (url, callback) => {
               chrome.downloads.download({
                    url : url,
                    filename : `capture-${Date.now()}.png`,
                    conflictAction : 'uniquify'
               }, callback)
          }

          const downloadCapture = () => {
               capture().then(download)
          }

          bridge.onMessage('capture', downloadCapture)
          bridge.onMessage('download', download)
     }
}
