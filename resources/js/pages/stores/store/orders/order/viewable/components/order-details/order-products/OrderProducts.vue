<template>

    <!-- Order Products (Loading Placeholder) -->
    <div v-if="isLoadingStore || isLoadingOrder || !hasOrder" class="space-y-2">

        <div v-for="(_, index) in [1, 2, 3]" :key="index" class="flex items-center space-x-4 border-b shadow-sm rounded-lg py-6 px-4 bg-gray-50">

            <div class="flex items-center justify-center w-16 h-16 border border-dashed border-gray-200 rounded-lg flex-shrink-0">

                <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>

            </div>

            <div class="w-full flex justify-between">

                <div class="w-full flex items-center space-x-2">
                    <LineSkeleton width="w-7" height="h-7" :shine="true"></LineSkeleton>
                    <LineSkeleton width="w-1/3" :shine="true"></LineSkeleton>
                </div>
                <div class="flex items-center space-x-2">
                    <LineSkeleton width="w-16" :shine="true"></LineSkeleton>
                    <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                </div>

            </div>

        </div>

    </div>

    <template v-else>

        <OrderProduct
            :key="index"
            :orderProduct="orderProduct"
            v-for="(orderProduct, index) in orderProducts">
        </OrderProduct>

    </template>

</template>

<script>

    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import OrderProduct from '@Pages/stores/store/orders/order/viewable/components/order-details/order-products/OrderProduct.vue';

    export default {
        inject: ['storeState', 'orderState'],
        components: { LineSkeleton, OrderProduct },
        computed: {
            order() {
                return this.orderState.order;
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
            orderProducts() {
                return this.order._relationships.orderProducts;
            }
        }
    };

</script>