import { defineStore } from 'pinia'

export const useStoreState = defineStore('store', {
    state: () => {
        return {
            store: null
        }
    }
})
