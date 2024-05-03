import { defineStore } from 'pinia';
import { UtilsMixin } from '@Mixins/UtilsMixin.js';

export const useNotificationState = defineStore('notification', {
    state: () => {
        return {
            notifications: []
        }
    },
    actions: {
        addSuccessNotification(message) {
            this.addNotification(message, 'success-notification');
        },
        addWarningNotification(message) {
            this.addNotification(message, 'warning-notification');
        },
        addNotification(message, type) {
            this.notifications.push({
                type: type,
                message: message,
                id: UtilsMixin.methods.generateUniqueId('notification')
            });
        },
    },
})
