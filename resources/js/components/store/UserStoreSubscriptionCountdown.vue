<template>

    <!-- Countdown -->
    <Countdown :time="time" textClass="text-yellow-500 font-bold underline decoration-dashed underline-offset-4">

        <template #suffix="props">
            <span v-if="!props.hasExpired" class="text-sm mr-1">Subscription Expires in</span>
        </template>

        <div class="w-full flex justify-between">

            <div class="flex items-center space-x-2 text-yellow-500">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span class="font-bold text-sm">
                    {{ totalSubscriptions ? 'Your Subscription Expired' : 'No Subscription' }}
                </span>
                <MoreInfoPopover :title="totalSubscriptions ? 'Subscription Expired' : 'No Subscription'" placement="top">
                    <template #description>
                        <p class="border-t pt-2 mt-2">
                            {{ totalSubscriptions ? 'Renew your subscription to reopen your store and allow customers to place orders' : 'Subscribe to open your store and allow customers to place orders' }}
                        </p>
                    </template>
                </MoreInfoPopover>
            </div>

            <!-- Store Subscription Button -->
            <StoreSubscribeButton></StoreSubscribeButton>

        </div>

    </Countdown>

</template>


<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import StoreSubscribeButton from '@Components/store/StoreSubscribeButton.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { Countdown, MoreInfoPopover, StoreSubscribeButton },
        data() {
            return {
                storeState: useStoreState()
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            time() {
                return ((this.activeSubscription || {}).endAt || null);
            },
            activeSubscription() {
                return this.store._relationships.activeSubscription;
            },
            totalSubscriptions() {
                return this.store.subscriptionsCount;
            },
        },
    };
</script>
