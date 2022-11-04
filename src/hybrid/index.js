import bridge from '@src/utils/bridge'
import log from '@src/utils/log'
import useStore from '@src/hooks/useStore'

let modules = {}

const getHybrid = () => {
    const modules = {}
    const files = require.context('@src/hybrid', false, /\.js$/)

    files.keys().forEach(fileKey => {
        const fileName = fileKey.match(/(\/)([^\.]+)(\.js)/)[2]
        if (fileName !== 'index') {
            modules[fileName] = files(fileKey).default
        }
    })

    return modules
}

const install = (app) => {
    Object.entries(modules).forEach(([name, module]) => {
        if (name === 'install' || name === 'api') return

        const injection = (() => {
            const { state: stateConfig } = module
            const config = typeof stateConfig === 'function' ? stateConfig() : {}
            
            const { state } = useStore('Hybrid_' + name, config)
            const hyBridge = bridge.create('Hybrid_' + name)

            return {
                bridge: hyBridge, 
                state, 
                log
            }
        })()

        module.export = {}
        module.export.state = injection.state

        app?.useContentScript(() => {
            module.export.contentScript = module.contentScript?.(injection)
        })
        app?.usePopup(() => {
            module.export.popup = module.popup?.(injection)
        })
        app?.useBackground(() => {
            module.export.background = module.background?.(injection)
        })
        
    })
}

modules = getHybrid()

export function useHybrid (name) {
    if (Object.prototype.hasOwnProperty.call(modules, name)) {
        return modules[name].export
    }
    else {
        throw new Error('The hybrid of ' + name + ' is undefind')
    }
}

export default install
