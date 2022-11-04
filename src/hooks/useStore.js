import { ref, watch, toRaw } from 'vue'
import storage from '@src/utils/storage'

const useStore = (namespace, initState) => {
     const state = ref(initState)
     storage.getItem(namespace)
          .then(data => {
               if (Boolean(data)) {
                    state.value = data
                    return
               } else {
                    return storage.setItem(namespace, toRaw(state.value))
               }
          })
          .then(() => {
               watch(state, (value) => {
                    storage.setItem(namespace, toRaw(value))
               }, { deep: true })


               storage.watch(namespace, ({newValue}) => {
                    state.value = newValue
               })
          })

     return { state }
}

export default useStore
