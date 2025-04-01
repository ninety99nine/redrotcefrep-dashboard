<template>

    <div class="select-none">

        <div class="flex flex-col items-center">

            <!-- Store Logo -->
            <StoreLogo :showButton="false" class="mb-4"></StoreLogo>

            <!-- Heading -->
            <h2 class="text-xl font-semibold text-center mb-4">Complete Your Payment</h2>

            <!-- Sub Heading -->
            <p class="text-gray-500 text-center">Amount to pay</p>

            <!-- Amount -->
            <LineSkeleton v-if="isLoadingOrder" width="w-40" height="h-8" :shine="true" class="my-4"></LineSkeleton>
            <h2 v-else class="text-4xl font-semibold text-center mb-8">{{ order.outstandingTotal.amountWithCurrency }}</h2>

        </div>

        <div class="space-y-3 mb-4">

            <!-- Payment Methods (Loading Placeholder) -->
            <div v-if="isLoadingOrder" class="space-y-2">

                <div v-for="(_, index) in [1, 2, 3]" :key="index" class="flex items-center space-x-4 border-b shadow-sm rounded-lg py-6 px-4 bg-gray-50">

                    <LineSkeleton width="w-8" height="h-8" :shine="true" class="flex-shrink-0"></LineSkeleton>

                    <div class="w-full flex justify-between items-center">
                        <LineSkeleton width="w-40" :shine="true"></LineSkeleton>
                        <LineSkeleton width="w-8" :shine="true"></LineSkeleton>
                    </div>

                </div>

            </div>

            <!-- Payment Methods -->
            <template v-else>

                <div
                    :key="storePaymentMethodIndex"
                    @click="() => navigateToShowOrderPaymentMethod(storePaymentMethod)"
                    v-for="(storePaymentMethod, storePaymentMethodIndex) in storePaymentMethods"
                    class="bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                    <div class="flex justify-between items-center">

                        <div class="flex items-center space-x-2 font-bold">

                            <!-- Logo -->
                            <div class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                                <img
                                    alt="Payment Method Logo"
                                    class="h-full object-contain"
                                    :src="storePaymentMethod._relationships.logo ? storePaymentMethod._relationships.logo.filePath : storePaymentMethod._relationships.paymentMethod._attributes.imageUrl"
                                />
                            </div>

                            <!-- Name -->
                            <span class="text-sm">{{ storePaymentMethod._relationships.paymentMethod.type == 'other' && storePaymentMethod.customName ? storePaymentMethod.customName : storePaymentMethod._relationships.paymentMethod.name }}</span>

                        </div>

                        <!-- Arrow Icon -->
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>

                    </div>

                </div>

            </template>

        </div>

        <Button type="light" size="sm" :action="navigateToAddPaymentMethods" class="w-full">
            <span>Payment Methods</span>
        </Button>

    </div>

</template>

<script>

    import axios from 'axios';
    import Button from '@Partials/buttons/Button.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        inject: ['apiState', 'formState', 'notificationState', 'storeState', 'orderState'],
        components: { Button, StoreLogo, LineSkeleton },
        data() {
            return {
                pagination: null,
                storePaymentMethods: [],
                isLoadingPaymentMethods: false
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            order() {
                return this.orderState.order;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            }
        },
        methods: {
            navigateToAddPaymentMethods() {
                this.$router.push({
                    name: 'add-payments',
                    params: {
                        'store_href': this.store._links.showStore
                     }
                });
            },
            navigateToShowOrderPaymentMethod(storePaymentMethod) {
                this.$router.push({
                    name: 'show-store-payment-method',
                    params: {
                        'alias': this.$route.params.alias,
                        'order_href': this.$route.params.order_href,
                        'store_payment_method_href': storePaymentMethod._links.showStorePaymentMethod,
                     }
                });
            },
            showPaymentMethods() {

                this.isLoadingPaymentMethods = true;
                const url = this.apiState.apiHome._links['showStorePaymentMethods'];

                let config = {
                    params: {
                        'storeId': this.store.id,
                        '_relationships': 'paymentMethod,photo,logo'
                    }
                }

                axios.get(url, config).then(response => {

                    if(response.status == 200) {

                        this.pagination = response.data;
                        this.storePaymentMethods = response.data.data;

                    }else{

                        this.formState.setGeneralFormError(response.data.message);
                        this.notificationState().showWarningNotification(response.data.message);

                    }

                }).catch(errorException => {
                    this.formState.setServerFormErrors(errorException);
                }).finally(() => {
                    this.isLoadingPaymentMethods = false;
                });

            }
        },
        created() {
            this.showPaymentMethods();
        }
    };

</script>
