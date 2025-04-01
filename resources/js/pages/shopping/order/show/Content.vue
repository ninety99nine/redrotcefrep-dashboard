<template>

    <div>

        <Advert></Advert>

        <OrderDetails></OrderDetails>

        <Actions></Actions>

        <DeliveryAddress></DeliveryAddress>

        <OrderHistory></OrderHistory>

    </div>

</template>

<script>

    import Advert from '@Pages/shopping/order/show/components/advert/Advert.vue';
    import Actions from '@Pages/shopping/order/show/components/actions/Actions.vue';
    import OrderHistory from '@Pages/shopping/order/show/components/history/OrderHistory.vue';
    import OrderDetails from '@Pages/shopping/order/show/components/order-details/OrderDetails.vue';
    import DeliveryAddress from '@Pages/shopping/order/show/components/delivery-address/DeliveryAddress.vue';

    export default {
        components: { Advert, Actions, OrderHistory, OrderDetails, DeliveryAddress }
    };

</script>
