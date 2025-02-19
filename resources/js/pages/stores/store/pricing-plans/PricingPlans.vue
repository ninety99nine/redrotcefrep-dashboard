<template>

    <div class="min-h-screen relative">

        <div class="z-10 pt-32 px-20 relative">

            <div class="flex flex-col items-center mb-10">

                <h1 class="flex justify-center items-center space-x-2 text-xl text-gray-700 font-semibold mb-4">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                    <span>Pricing Plans</span>
                </h1>

                <p class="w-96 text-sm text-gray-500 text-center">Get the best plan for your store. Pay monthly or annually, with no hidden fees. Start selling instantly!</p>

            </div>

            <!-- Loader -->
            <div
                v-if="isLoadingPricingPlans"
                class="flex justify-center">
                <SpinningLoader></SpinningLoader>
            </div>

            <template v-if="!isLoadingPricingPlans">

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

                    <div
                        :key="index"
                        v-for="(pricingPlan, index) in filteredPricingPlans"
                        class="animated-border-blue w-80 bg-white py-4 px-4 shadow-sm rounded-xl">

                        <h1 class="text-xl text-gray-700 font-bold mb-2">
                            {{ pricingPlan.name }}
                        </h1>

                        <h2 class="w-4/5 text-gray-500 text-sm mb-4">
                            {{ pricingPlan.description }}
                        </h2>

                        <h2 class="text-3xl text-gray-700 font-bold space-x-1 mb-4">
                            <span>{{ pricingPlan.price.amountWithCurrency }}</span>
                            <span class="text-sm text-gray-500 font-normal">/</span>
                            <span class="text-sm text-gray-500 font-normal">
                                <template v-if="isShowingMonthlyPricingPlans">month</template>
                                <template v-else-if="isShowingAnnualPricingPlans">year</template>
                            </span>
                        </h2>

                        <Button
                            size="sm"
                            type="primary"
                            class="w-full mb-4"
                            :loading="pricingPlanIndex == index"
                            :action="() => payPricingPlan(pricingPlan, index)"
                            :disabled="isGeneratingPaymentLink && pricingPlanIndex != index">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                            <span>Subscribe</span>
                        </Button>

                        <p v-if="pricingPlanIndex == index" class="animate-pulse text-xs text-center text-blue-500 bg-blue-50 rounded-full p-2 mb-4">
                            We are preparing your payment...
                        </p>

                        <div class="bg-gray-50 border p-4 rounded-lg">
                            <div
                                :key="index"
                                v-for="(feature, index) in pricingPlan.features">

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
                pagination: null,
                pricingPlans: [],
                pricingPlanIndex: null,
                apiState: useApiState(),
                storeState: useStoreState(),
                isLoadingPricingPlans: false,
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
            showPricingPlans() {

                this.isLoadingPricingPlans = true;

                let params = {
                    '_filters': 'active:eq:1|billing_type:eq:one time|supports_web:eq:1|type:eq:store subcription'
                };

                getApi(this.apiState.apiHome._links['showPricingPlans'], params).then(response => {

                    if(response.status == 200) {

                        this.pagination = response.data;
                        this.pricingPlans = this.pagination.data;

                    }

                    this.isLoadingPricingPlans = false;

                }).catch(errorException => {

                    this.isLoadingPricingPlans = false;
                    this.setServerFormErrors(errorException);

                });

            },
            payPricingPlan(pricingPlan, index) {

                if(this.isGeneratingPaymentLink) return;

                this.pricingPlanIndex = index;
                this.isGeneratingPaymentLink = true;

                let params = {
                    'storeId': this.store.id,
                    'paymentMethodType': 'dpo'
                };

                postApi(pricingPlan._links['payPricingPlan'], params).then(response => {

                    if(response.status == 200 && response.data['successful']) {

                        const transaction = response.data.transaction;
                        const dpoPaymentUrl = transaction.metadata.dpoPaymentUrl;

                        window.location.href = dpoPaymentUrl;

                    }else{

                        this.isGeneratingPaymentLink = false;

                    }


                }).catch(errorException => {

                    this.isGeneratingPaymentLink = false;
                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showPricingPlans();
        }
    };

</script>
