import log from '@src/utils/log'

const main = () => {
     log('background inited')
     window.addEventListener('error', e => {
          log(e.error)
     })
}

export default main
