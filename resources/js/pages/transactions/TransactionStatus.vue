<template>

    <div class="min-h-screen relative">

        <div class="z-10 pt-32 px-20 relative">

            <div class="flex flex-col items-center mb-10">

                <h1 class="flex flex-col items-center space-y-2 text-xl text-gray-700 font-semibold mb-4">
                    <span v-if="!isLoadingTransaction && isPaid" class="text-4xl">🎉</span>
                    <span>Transaction Status</span>
                </h1>

                <p class="w-96 text-sm text-gray-500 text-center">
                    <template v-if="isLoadingTransaction">
                        Hang tight! We're checking the transaction status
                    </template>
                    <template v-else-if="isPaid">
                        This transaction has been paid successully
                    </template>
                    <template v-else-if="isPendingPayment">
                        This transaction is still waiting to payment
                    </template>
                    <template v-else-if="isFailedPayment">
                        This transaction has failed
                    </template>
                </p>

            </div>

            <div class="flex flex-col items-center mb-8">

                <!-- Rooftop Image -->
                <img src="/images/store-rooftop.png" class="w-96">

                <!-- Loader -->
                <SpinningLoader v-if="isLoadingTransaction" class="mt-16"></SpinningLoader>

            </div>

            <template v-if="!isLoadingTransaction">

                <div class="flex justify-center space-x-4 mb-8">

                    <div
                        :class="[{ 'animated-border-green' : isPaid }, { 'animated-border-red' : isFailedPayment }, { 'animated-border-cyan' : isPendingPayment }, 'w-96 bg-white py-4 px-4 shadow-sm rounded-xl']">

                        <div class="flex items-center space-x-2 mb-2">
                            <svg v-if="isPaid" class="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                            </svg>

                            <svg v-if="isPendingPayment" class="w-8 h-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                            </svg>

                            <svg v-if="isFailedPayment" class="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                            </svg>

                            <h1 :class="[{ 'text-green-500' : isPaid }, { 'text-red-500' : isFailedPayment }, { 'text-yellow-500' : isPendingPayment }, 'text-xl font-bold']">
                                {{ capitalize(transaction.paymentStatus.name) }}
                            </h1>
                        </div>

                        <h2 :class="[{ 'text-green-500' : isPaid }, { 'text-red-500' : isFailedPayment }, { 'text-yellow-500' : isPendingPayment }, 'text-sm mb-4']">
                            {{ transaction.description }}
                        </h2>

                        <h2 :class="[{ 'text-green-500' : isPaid }, { 'text-red-500' : isFailedPayment }, { 'text-yellow-500' : isPendingPayment }, 'text-3xl text-gray-700 font-bold space-x-1 mb-4']">
                            <span>{{ transaction.amount.amountWithCurrency }}</span>
                        </h2>

                        <div v-if="isFailedPayment" class="text-red-500 p-4 bg-red-50 border border-red-300 rounded-lg mb-4">
                            <p class="text-sm font-semibold mb-2">{{ transaction.failureType ?? 'Failure Reason' }}</p>
                            <p v-if="transaction.failureReason" class="text-xs">{{ transaction.failureReason }}</p>
                        </div>

                        <div class="bg-gray-50 border p-4 rounded-lg mb-4">
                            <div
                                :key="index"
                                v-for="(feature, index) in transaction._relationships.owner.features">

                                <span class="text-gray-500 text-xs">{{ feature }}</span>

                            </div>
                        </div>

                        <Button
                            size="sm"
                            type="primary"
                            class="w-full mb-4"
                            @click="makePayment"
                            v-if="isPendingPayment"
                            :loading="isRenewTransactionPaymentLink">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                            <span>Make Payment</span>
                        </Button>

                        <Button
                            size="sm"
                            type="primary"
                            class="w-full mb-4"
                            @click="makePayment"
                            v-if="isFailedPayment"
                            :loading="isRenewTransactionPaymentLink">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
                            </svg>
                            <span>Retry Payment</span>
                        </Button>

                        <template v-if="isPaid">

                            <div class="flex items-center space-x-2 text-xs mb-2">
                                <span class="text-gray-400">{{ formattedDatetime(transaction.createdAt) }}</span>
                                <MoreInfoPopover title="What Is This?" description="This is the transaction date" placement="top"></MoreInfoPopover>
                            </div>

                            <div class="flex items-center space-x-2 text-xs">
                                <span class="text-gray-400">{{ transaction.id }}</span>
                                <MoreInfoPopover title="What Is This?" description="This is the transaction ID" placement="top"></MoreInfoPopover>
                            </div>

                        </template>

                    </div>

                </div>

                <div class="flex justify-center">

                    <Button v-if="store" @click="navigateToStoreHome" :type="isPaid ? 'primary' : 'light'" size="xs">
                        <span>{{ store.name }}</span>
                        <svg class="w-4 h-4"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </Button>

                </div>

            </template>

        </div>

        <img src="/images/clouds.png" class="absolute top-32">

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import { getApi, postApi } from '@Repositories/api-repository.js';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { Button, SpinningLoader, MoreInfoPopover },
        data() {
            return {
                transaction: null,
                transactionHref: null,
                isLoadingTransaction: false,
                transactionDescription: null,
                isGeneratingPaymentLink: false,
                isRenewTransactionPaymentLink: false,
            };
        },
        computed: {
            isPaid() {
                return this.transaction._attributes.isPaid;
            },
            isFailedPayment() {
                return this.transaction._attributes.isFailedPayment;
            },
            isPendingPayment() {
                return this.transaction._attributes.isPendingPayment;
            },
            store() {
                return this.transaction._relationships.store;
            },
            pricingPlan() {
                return this.transaction._relationships.pricingPlan;
            },
            dpoPaymentUrl() {
                return this.transaction.metadata.dpoPaymentUrl;
            },
            dpoPaymentLinkHasExpired() {
                return this.transaction.metadata.dpoPaymentLinkHasExpired;
            }
        },
        methods: {
            changePricingPlan(activePricingPlan) {
                this.activePricingPlan = activePricingPlan;
            },
            showTransaction() {

                this.isLoadingTransaction = true;

                let relationships = ['owner', 'store', 'aiAssistant'];

                let params = {
                    '_relationships': relationships.join(',')
                };

                getApi(this.transactionHref, params).then(response => {

                    if(response.status == 200 && response.data.exists) {

                        this.transaction = response.data.transaction;

                    }

                    this.isLoadingTransaction = false;

                }).catch(errorException => {

                    this.isLoadingTransaction = false;
                    this.setServerFormErrors(errorException);

                });

            },
            makePayment() {
                if (this.dpoPaymentLinkHasExpired) {
                    this.renewTransactionPaymentLink();
                } else {
                    this.isRenewTransactionPaymentLink = true;
                    window.location.assign(this.dpoPaymentUrl);
                }
            },
            renewTransactionPaymentLink() {

                if(this.isRenewTransactionPaymentLink) return;

                this.isRenewTransactionPaymentLink = true;

                postApi(this.transaction._links['renewTransactionPaymentLink']).then(response => {

                    if(response.status == 200 && response.data['successful']) {

                        const transaction = response.data.transaction;
                        const dpoPaymentUrl = transaction.metadata.dpoPaymentUrl;

                        window.location.href = dpoPaymentUrl;

                    }else{

                        this.isRenewTransactionPaymentLink = false;

                    }

                }).catch(errorException => {

                    this.isRenewTransactionPaymentLink = false;
                    this.setServerFormErrors(errorException);

                });

            },
            navigateToStoreHome() {
                this.$router.push({
                    name: 'show-store-home',
                    params: { 'store_href': this.store._links.showStore }
                });
            }
        },
        created() {
            this.transactionHref = this.$route.query.transactionHref;
            this.showTransaction();
        }
    };

</script>
