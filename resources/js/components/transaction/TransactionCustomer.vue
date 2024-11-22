<template>

    <div class="bg-white shadow-lg rounded-lg border space-y-3 p-4">

        <div class="flex items-center space-x-2">
            <div class="p-1.5 bg-gray-100 rounded-full border border-gray-200">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </div>
            <ShineEffect v-if="isLoadingTransaction">
                <LineSkeleton width="w-32"></LineSkeleton>
            </ShineEffect>
            <span v-else-if="hasCustomer" class="font-bold">{{ customer._attributes.name }}</span>
            <span v-else class="font-bold text-lg">Customer</span>
        </div>

        <div class="space-y-2">

            <template v-if="isLoadingTransaction || customer.mobileNumber || customer.email">

                <div v-if="isLoadingTransaction || customer.mobileNumber" class="flex items-center space-x-2 text-sm">
                    <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <ShineEffect v-if="isLoadingTransaction">
                        <LineSkeleton width="w-32"></LineSkeleton>
                    </ShineEffect>
                    <span v-else class="font-bold">{{ customer.mobileNumber.national }}</span>
                </div>

                <div v-if="isLoadingTransaction || customer.email" class="flex items-center space-x-2 text-sm">
                    <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <ShineEffect v-if="isLoadingTransaction">
                        <LineSkeleton width="w-32"></LineSkeleton>
                    </ShineEffect>
                    <span v-else class="font-bold">{{ customer.email }}</span>
                </div>

            </template>

            <span v-else class="text-xs">No information</span>

        </div>

        <div v-if="!isLoadingTransaction && hasCustomer" class="flex justify-end">
            <PrimaryButton size="xs" type="primary" iconClass="w-4 h-4" @click="onViewCustomer()">
                <span>View Customer</span>
            </PrimaryButton>
        </div>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';

    export default {
        components: { ShineEffect, LineSkeleton, PrimaryButton },
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
            hasCustomer() {
                return this.transaction._relationships.customer != null;
            },
            customer() {
                return this.transaction._relationships.customer;
            }
        },
        methods: {
            onViewCustomer() {
                this.$router.push({
                    name: 'show-store-customer',
                    params: { 'store_href': this.store._links.showStore, 'customer_href': this.customer._links.showCustomer }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            }
        }
    };

</script>
