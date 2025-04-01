import { defineStore } from 'pinia';
import settings from '@Js/settings.js';
import { useAuthState } from '@Stores/auth-store.js';

export const useApiState = defineStore('api', {
    state: () => ({
        apiHome: null,
        lastErrorMessage: null
    }),
    getters: {
        hasApiHome: (state) => state.apiHome !== null,
        hasLastErrorMessage: (state) => state.lastErrorMessage !== null,
    },
    actions: {
        async setApiHome() {
            try {

                // Clear error message if previous request failed
                this.clearLastErrorMessage();

                /**
                 *  Note that the bearer token is automatically set if present.
                 *  This is handled by the /resources/bootstrap.js file.
                 */
                const response = await this.get(settings.appApiHomeUrl);

                //  Set apiHome
                this.apiHome = response.data;

                //  Capture the useAuthState instance
                const auth = useAuthState();

                //  Set the user on the useAuthState instance
                auth.user = this.apiHome.user;

                //  Set the authenticated status on the useAuthState instance
                auth.authenticated = this.apiHome.authenticated;

            } catch (error) {

                this.lastErrorMessage = error.message;

            }
        },
        async get(url) {
            return await axios.get(url);
        },
        clearLastErrorMessage() {
            this.lastErrorMessage = null;
        }
    },
});
