import { defineStore } from 'pinia';

export const useDeliveryMethodState = defineStore('deliveryMethod', {
    state: () => {
        return {
            deliveryMethod: null,
            isLoadingDeliveryMethod: false
        };
    },
    actions: {
        reset() {
            this.deliveryMethod = null;
            this.isLoadingDeliveryMethod = false;
        }
    }
});
