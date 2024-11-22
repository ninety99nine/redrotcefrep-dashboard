<template>

    <div class="bg-white shadow-lg rounded-lg border space-y-3 p-4">

        <div class="flex items-center space-x-2">
            <ShineEffect v-if="isLoadingTransaction">
                <RoundSkeleton size="w-6 h-6"></RoundSkeleton>
            </ShineEffect>
            <div v-else class="p-1.5 bg-gray-100 rounded-full border border-gray-200">
                <svg v-if="transactionForOrder" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                <svg v-else class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </div>
            <ShineEffect v-if="isLoadingTransaction">
                <LineSkeleton width="w-32"></LineSkeleton>
            </ShineEffect>
            <span v-else-if="transactionForOrder" class="font-bold text-lg">Order #{{ owner._attributes.number }}</span>
            <span v-else-if="transactionForPricingPlan" class="font-bold text-lg">{{ owner.name }}</span>
            <span v-else class="font-bold text-lg">...</span>
        </div>

        <template v-if="transactionForPricingPlan">
            <span class="text-xs">{{ owner.description }}</span>
        </template>

        <div v-if="transactionForOrder" class="flex justify-end">
            <PrimaryButton size="xs" type="primary" iconClass="w-4 h-4" @click="onViewOrder()">
                <span>View Order</span>
            </PrimaryButton>
        </div>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';

    export default {
        components: { ShineEffect, LineSkeleton, PrimaryButton, RoundSkeleton },
        props: {
            transaction: {
                type: Object
            },
            isLoadingTransaction: {
                type: Boolean
            }
        },
        data() {
            return {
                storeState: useStoreState()
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            owner() {
                return ((this.transaction || {})._relationships || {}).owner || null;
            },
            transactionForOrder() {
                return ((this.transaction || {}).ownerType || '').toLowerCase() == 'order';
            },
            transactionForPricingPlan() {
                return ((this.transaction || {}).ownerType || '').toLowerCase() == 'pricing plan';
            }
        },
        methods: {
            onViewOrder() {
                this.$router.push({
                    name: 'show-store-order',
                    params: { 'store_href': this.store._links.showStore, 'order_href': this.owner._links.showOrder }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
        }
    };

</script>
