import { defineStore } from 'pinia'

export const useAuthState = defineStore('auth', {
    state: () => {
        return {
            user: null,
            authenticated: false
        }
    }
})
