import { defineStore } from 'pinia';
import { generateUniqueId } from '@Utils/generalUtils.js';

export const useNotificationState = defineStore('notification', {
    state: () => {
        return {
            notifications: []
        }
    },
    actions: {
        showSuccessNotification(message) {
            this.addNotification(message, 'success-notification');
        },
        showWarningNotification(message) {
            this.addNotification(message, 'warning-notification');
        },
        addNotification(message, type) {
            this.notifications.push({
                type: type,
                message: message,
                id: generateUniqueId('notification')
            });
        },
    },
})
