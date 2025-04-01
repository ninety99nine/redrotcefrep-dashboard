<template>

    <div class="select-none grid grid-cols-12 gap-4 mb-40">

        <div class="col-span-8 space-y-4">

            <div class="bg-white rounded-lg p-4 shadow-sm">

                <!-- Order Products -->
                <OrderProducts></OrderProducts>

            </div>

            <div class="bg-white rounded-lg p-4 shadow-sm">

                <!-- Order Promotions -->
                <OrderPromotions></OrderPromotions>

            </div>

            <div class="bg-white rounded-lg p-4 shadow-sm">

                <!-- Order Fees -->
                <OrderFees></OrderFees>

            </div>

            <div class="bg-white rounded-lg p-4 shadow-sm">

                <!-- Order Delivery Methods -->
                <OrderDeliveryMethods></OrderDeliveryMethods>

            </div>

            <div class="bg-white rounded-lg p-4 shadow-sm">

                <!-- Order Miscellaneous -->
                <OrderMiscellaneous></OrderMiscellaneous>

            </div>

            <div class="bg-white rounded-lg p-4 shadow-sm">

                <OrderTotals></OrderTotals>

            </div>

        </div>

        <div class="col-span-4 space-y-4">

            <div class="bg-white rounded-lg p-4 shadow-sm">

                <!-- Order Customer -->
                <OrderCustomer></OrderCustomer>

            </div>

            <div class="bg-white rounded-lg p-4 shadow-sm">

                <!-- Order Basics -->
                <OrderBasics></OrderBasics>

            </div>

        </div>

    </div>

</template>

<script>

    import OrderFees from '@Pages/stores/store/orders/order/editable/components/fees/OrderFees.vue';
    import OrderBasics from '@Pages/stores/store/orders/order/editable/components/basics/OrderBasics.vue';
    import OrderProducts from '@Pages/stores/store/orders/order/editable/components/products/OrderProducts.vue';
    import OrderCustomer from '@Pages/stores/store/orders/order/editable/components/customer/OrderCustomer.vue';
    import OrderTotals from '@Pages/stores/store/orders/order/editable/components/order-totals/OrderTotals.vue';
    import OrderPromotions from '@Pages/stores/store/orders/order/editable/components/promotions/OrderPromotions.vue';
    import OrderMiscellaneous from '@Pages/stores/store/orders/order/editable/components/miscellaneous/OrderMiscellaneous.vue';
    import OrderDeliveryMethods from '@Pages/stores/store/orders/order/editable/components/delivery-methods/OrderDeliveryMethods.vue';

    export default {
        inject: ['orderState'],
        components: {
            OrderFees, OrderBasics, OrderProducts, OrderCustomer, OrderTotals, OrderPromotions,
            OrderMiscellaneous, OrderDeliveryMethods
        },
        watch: {
            orderForm: {
                handler() {
                    this.orderState.inspectStoreShoppingCartDelayed();
                },
                deep: true
            }
        },
        computed: {
            orderForm() {
                return this.orderState.orderForm;
            }
        }
    };

</script>
