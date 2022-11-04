/**
 * @desc 根据dom元素上绑定的data-v-${hash}, 来获取vue组件结构.
 */
import { watch } from 'vue'

export default {
    state () {
        return {
            isDetect: false
        }
    },
    contentScript ({state}) {
        let detectedComponent = []
        let detectedEls = []
        const detectComponent = () => {
            const els = document.querySelectorAll('*')
            els.forEach(el => {
                const dataset = el.dataset
                const vHash = Object.keys(dataset).filter(key => key.includes('v-'))

                if (vHash.length && !vHash.some(hash => detectedComponent.includes(hash))) {
                    el.style.border = '1px solid red'
                    detectedComponent = detectedComponent.concat(vHash)
                    detectedEls.push(el)
                }
            })
        }
        const resetComponent = () => {
            detectedEls.forEach(el => {
                el.style.border = 'unset'
            })
            detectedComponent = []
        }

        watch(state, (value) => {
            value.isDetect ? detectComponent() : resetComponent()
        })
    },
    popup ({state}) {

    },
    background () {

    }
}
