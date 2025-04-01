<template>

    <div class="grid grid-cols-12 gap-4 mb-4">

        <div class="col-span-8">

            <!-- Order Basics -->
            <OrderBasics></OrderBasics>

            <!-- Order Details -->
            <OrderDetails></OrderDetails>

            <!-- Payments -->
            <Payments></Payments>

        </div>

        <div class="col-span-4">

            <!-- Team Member -->
            <TeamMember></TeamMember>

            <!-- Customer Summary -->
            <CustomerSummary></CustomerSummary>

            <!-- Payment Link -->
            <PaymentLink></PaymentLink>

            <!-- Delivery Address -->
            <DeliveryAddress></DeliveryAddress>

            <!-- Order History -->
            <OrderHistory></OrderHistory>

        </div>

    </div>

</template>

<script>

    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import Payments from '@Pages/stores/store/orders/order/viewable/components/payments/Payments.vue';
    import OrderBasics from '@Pages/stores/store/orders/order/viewable/components/basics/OrderBasics.vue';
    import TeamMember from '@Pages/stores/store/orders/order/viewable/components/team-member/TeamMember.vue';
    import OrderHistory from '@Pages/stores/store/orders/order/viewable/components/history/OrderHistory.vue';
    import PaymentLink from '@Pages/stores/store/orders/order/viewable/components/payment-link/PaymentLink.vue';
    import OrderDetails from '@Pages/stores/store/orders/order/viewable/components/order-details/OrderDetails.vue';
    import CustomerSummary from '@Pages/stores/store/orders/order/viewable/components/customer/CustomerSummary.vue';
    import DeliveryAddress from '@Pages/stores/store/orders/order/viewable/components/delivery-address/DeliveryAddress.vue';

    export default {
        inject: ['orderState', 'storeState'],
        components: {
            LineSkeleton, Payments, OrderBasics, TeamMember, OrderHistory, PaymentLink,
            OrderDetails, CustomerSummary, DeliveryAddress
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            order() {
                return this.orderState.order;
            },
            hasOrder() {
                return this.orderState.hasOrder;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            }
        }
    };

</script>
