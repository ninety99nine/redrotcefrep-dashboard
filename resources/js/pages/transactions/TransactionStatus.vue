<template>

    <div class="min-h-screen relative">

        <div class="z-10 pt-32 px-20 relative">

            <div class="flex flex-col items-center mb-10">

                <h1 class="flex flex-col items-center space-y-2 text-xl text-gray-700 font-semibold mb-4">
                    <span class="text-4xl">🎉</span>
                    <span>Transaction Status</span>
                </h1>

                <p class="w-96 text-sm text-gray-500 text-center">
                    {{ transactionDescription }}
                </p>

            </div>

            <!-- Loader -->
            <div
                v-if="isLoadingTransaction"
                class="flex justify-center">
                <SpinningLoader></SpinningLoader>
            </div>

            <template v-if="!isLoadingTransaction">

                <div class="flex justify-center mb-4">

                    <div class="w-fit flex justify-center items-center bg-white py-0.5 px-1 border border-blue-300 rounded-full mb-4 relative">

                        <div :class="[ isShowingMonthlyPricingPlans ? '-translate-x-12' : 'translate-x-12', 'absolute w-24 bg-blue-500 h-6 rounded-full transition-transform duration-500 ease-in-out']"></div>
                        <div @click="() => changePricingPlan('monthly')" :class="[isShowingMonthlyPricingPlans ? 'text-white' : 'text-gray-500', 'z-10 py-1 px-4 rounded-full w-24 text-sm text-center cursor-pointer transition-transform duration-500 ease-in-out']">Monthly</div>
                        <div @click="() => changePricingPlan('annually')" :class="[isShowingAnnualPricingPlans ? 'text-white' : 'text-gray-500', 'z-10 py-1 px-4 rounded-full w-24 text-sm text-center cursor-pointer transition-transform duration-500 ease-in-out']">Annually</div>

                    </div>

                </div>

                <div class="flex justify-center mb-8">
                    <img src="/images/store-rooftop.png" class="w-96">
                </div>

                <div class="flex justify-center space-x-4 mb-8">

                    <div
                        class="animated-border-blue w-80 bg-white py-4 px-4 shadow-sm rounded-xl">

                        <h1 class="text-xl text-gray-700 font-bold mb-2">
                            Free Plan
                        </h1>

                        <h2 class="text-gray-500 text-sm mb-4">
                            Free store access with limited features
                        </h2>

                        <h2 class="text-3xl text-gray-700 font-bold space-x-1 mb-4">
                            <span>$0.00</span>
                            <span class="text-sm text-gray-500 font-normal">/</span>
                            <span class="text-sm text-gray-500 font-normal">
                                <template v-if="isShowingMonthlyPricingPlans">month</template>
                                <template v-else-if="isShowingAnnualPricingPlans">year</template>
                            </span>
                        </h2>

                        <div class="bg-gray-50 border p-4 rounded-lg">
                            <div
                                :key="index"
                                v-for="(feature, index) in freePlanFeatures">

                                <span class="text-gray-500 text-xs">{{ feature }}</span>

                            </div>
                        </div>

                    </div>

                </div>

            </template>

        </div>

        <img src="/images/clouds.png" class="absolute top-32">

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import { useApiState } from '@Stores/api-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import { getApi, postApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [FormMixin],
        components: { Button, SpinningLoader },
        data() {
            return {
                status: null,
                storeHref: null,
                transactionHref: null,
                transactionDescription: null,

                pagination: null,
                pricingPlans: [],
                pricingPlanIndex: null,
                apiState: useApiState(),
                storeState: useStoreState(),
                isLoadingTransaction: false,
                isGeneratingPaymentLink: false,
                activePricingPlan: 'monthly',
                freePlanFeatures: [
                    'WhatsApp order form',
                    'Manual payment methods',
                    'Up to 20 images'
                ]
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            isShowingMonthlyPricingPlans() {
                return this.activePricingPlan == 'monthly';
            },
            isShowingAnnualPricingPlans() {
                return this.activePricingPlan == 'annually';
            },
            filteredPricingPlans() {
                if(this.isShowingMonthlyPricingPlans) {
                    return this.pricingPlans.filter((pricingPlan) => pricingPlan.metadata.storeSubscription.frequency == 'month')
                }else{
                    return this.pricingPlans.filter((pricingPlan) => pricingPlan.metadata.storeSubscription.frequency == 'year')
                }
            }
        },
        methods: {
            changePricingPlan(activePricingPlan) {
                this.activePricingPlan = activePricingPlan;
            },
            showTransaction() {

                this.isLoadingTransaction = true;

                let relationships = ['owner', 'paymentMethod', 'store', 'aiAssistant'];

                let params = {
                    '_relationships': relationships.join(',')
                };

                getApi(this.transactionHref, params).then(response => {

                    if(response.status == 200) {

                        this.pagination = response.data;
                        this.pricingPlans = this.pagination.data;

                    }

                    this.isLoadingTransaction = false;

                }).catch(errorException => {

                    this.isLoadingTransaction = false;
                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showTransaction();

            this.status = this.$route.query.status;
            this.storeHref = this.$route.query.storeHref;
            this.transactionHref = this.$route.query.transactionHref;

            if(this.status == 'successful') {
                this.transactionDescription = 'Your payment was successful';
            }else{
                this.transactionDescription = 'Your payment failed';
            }
        }
    };

</script>
