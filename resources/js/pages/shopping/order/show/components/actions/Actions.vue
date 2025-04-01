<template>

    <div class="space-y-2 mb-8">

        <div class="flex items-center justify-center space-x-2">
            <EmailInvoiceButton></EmailInvoiceButton>
            <OrderAgainButton></OrderAgainButton>
        </div>

        <PayButton></PayButton>

    </div>

</template>

<script>

    import PayButton from '@Pages/shopping/order/show/components/actions/PayButton.vue';
    import OrderAgainButton from '@Pages/shopping/order/show/components/actions/OrderAgainButton.vue';
    import EmailInvoiceButton from '@Pages/shopping/order/show/components/actions/EmailInvoiceButton.vue';

    export default {
        components: { PayButton, OrderAgainButton, EmailInvoiceButton }
    };

</script>
