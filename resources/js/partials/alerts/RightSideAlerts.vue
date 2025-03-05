<template>

    <div class="fixed top-0 right-0 z-50 w-80 mt-20 mr-4">

        <TransitionGroup name="fade" tag="div" class="w-full space-y-2">
            <div v-for="notification in notifications" :key="notification.id" class="w-full">

                <!-- Success -->
                <SuccessToast v-if="notification.type == 'success-notification'" @onHide="onHide(notification)">
                    <p class="font-bold">Awesome 🙌</p>
                    <p>{{ notification.message }}</p>
                </SuccessToast>

                <!-- Warning -->
                <WarningToast v-else-if="notification.type == 'warning-notification'" @onHide="onHide(notification)">
                    <p class="font-bold">Sorry 😔</p>
                    <p>{{ notification.message }}</p>
                </WarningToast>

            </div>
        </TransitionGroup>

    </div>

</template>

<script>

    import SuccessToast from '@Partials/toasts/SuccessToast.vue';
    import WarningToast from '@Partials/toasts/WarningToast.vue';
    import { useNotificationState } from '@Stores/notification-store.js';

    export default {
        components: { SuccessToast, WarningToast },
        data() {
            return {
                notificationState: useNotificationState()
            };
        },
        computed: {
            notifications() {
                return this.notificationState.notifications;
            }
        },
        methods: {
            onHide(notification) {
                const index = this.notificationState.notifications.findIndex(item => item.id === notification.id);

                if(index !== -1) {
                    this.notificationState.notifications.splice(index, 1);
                }
            }
        }
    };

</script>

<style>

    /* 1. Declare transition */
    .fade-move,
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    /* 2. Declare enter from and leave to state */
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: scaleY(0.01) translate(30px, 0);
    }

    /* 3. Ensure leaving items are taken out of layout flow so that moving animations can be calculated correctly. */
    .fade-leave-active {
        position: absolute;
    }
</style>
