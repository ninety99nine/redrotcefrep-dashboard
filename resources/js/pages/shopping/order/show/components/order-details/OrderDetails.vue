<template>

    <div class="select-none bg-white space-y-4 py-8 px-4 shadow-sm rounded-xl mb-4">

        <OrderHeader></OrderHeader>
        <OrderContent></OrderContent>

    </div>

</template>

<script>

    import OrderHeader from '@Pages/shopping/order/show/components/order-details/header/OrderHeader.vue';
    import OrderContent from '@Pages/shopping/order/show/components/order-details/body/OrderContent.vue';

    export default {
        components: { OrderHeader, OrderContent }
    };

</script>
