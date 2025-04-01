<template>

    <div>

        <h1 class="text-lg text-gray-700 font-semibold mb-4">Delivery Method</h1>

        <!-- Order Delivery Methods (Loading Placeholder) -->
        <div
            v-if="isLoadingStore || isLoadingOrder || (isEditting && !hasOrder)"
            class="flex items-center space-x-4 border-b shadow-sm rounded-lg py-6 px-4 bg-gray-50">

            <div class="flex items-center justify-center w-16 h-16 border border-dashed border-gray-200 rounded-lg flex-shrink-0">

                <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

            </div>

            <div class="w-full space-y-4">

                <LineSkeleton width="w-full" :shine="true"></LineSkeleton>
                <LineSkeleton width="w-1/3" :shine="true"></LineSkeleton>

            </div>

        </div>

        <div v-else class="space-y-2">

            <template v-if="hasDeliveryMethods">

                <OrderNoneDeliveryMethod></OrderNoneDeliveryMethod>

                <OrderDeliveryMethod
                    :key="index"
                    :index="index"
                    :deliveryMethod="deliveryMethod"
                    v-for="(deliveryMethod, index) in deliveryMethods">
                </OrderDeliveryMethod>

                <template v-if="deliveryMethod">

                    <OrderDeliveryMethodSchedule :deliveryMethod="deliveryMethod"></OrderDeliveryMethodSchedule>

                    <OrderDeliveryMethodMap></OrderDeliveryMethodMap>

                </template>

            </template>

            <div
                v-else
                class="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg space-y-4 my-4">

                <template v-if="!hasDeliveryMethods">
                    <svg class="w-10 h-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <span class="text-sm text-gray-500">No delivery methods</span>
                </template>

            </div>

        </div>

    </div>

</template>

<script>

    import axios from 'axios';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import OrderDeliveryMethod from '@Pages/stores/store/orders/order/editable/components/delivery-methods/OrderDeliveryMethod.vue';
    import OrderDeliveryMethodMap from '@Pages/stores/store/orders/order/editable/components/delivery-methods/OrderDeliveryMethodMap.vue';
    import OrderNoneDeliveryMethod from '@Pages/stores/store/orders/order/editable/components/delivery-methods/OrderNoneDeliveryMethod.vue';
    import OrderDeliveryMethodSchedule from '@Pages/stores/store/orders/order/editable/components/delivery-methods/OrderDeliveryMethodSchedule.vue';

    export default {
        inject: ['storeState', 'orderState', 'notificationState'],
        components: { LineSkeleton, OrderDeliveryMethod, OrderDeliveryMethodMap, OrderNoneDeliveryMethod, OrderDeliveryMethodSchedule },
        data() {
            return {
                pagination: null,
                deliveryMethods: [],
                isLoadingDeliveryMethods: false
            }
        },
        watch: {
            store(newValue) {
                if(newValue) {
                    this.getDeliveryMethods();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            orderForm() {
                return this.orderState.orderForm;
            },
            hasOrder() {
                return this.orderState.hasOrder;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isEditting() {
                return this.$route.name === 'edit-store-order';
            },
            hasDeliveryMethods() {
                return this.deliveryMethods.length > 0;
            },
            deliveryMethod() {
                return this.deliveryMethods.find((deliveryMethod) => deliveryMethod.id == this.orderForm.deliveryMethodId);
            }
        },
        methods: {
            async getDeliveryMethods() {

                this.isLoadingDeliveryMethods = true;

                await axios.get(this.store._links.showStoreDeliveryMethods).then(response => {

                    if(response.status == 200) {
                        const pagination = response.data;
                        this.deliveryMethods = pagination.data;
                    }else{
                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);
                    }

                }).catch(errorException => {
                    this.formState.setServerFormErrors(errorException);
                });

                this.isLoadingDeliveryMethods = false;

            },
        }
    };

</script>
