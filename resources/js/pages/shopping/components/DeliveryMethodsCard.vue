<template>

    <div
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="md:max-w-lg mx-4 mb-4 md:mx-auto rounded-lg shadow-lg space-y-4 pt-4 overflow-hidden">

        <!-- Delivery Methods Card Heading -->
        <DeliveryMethodsCardHeading></DeliveryMethodsCardHeading>

        <!-- Delivery Methods Card Body -->
        <DeliveryMethodsCardBody></DeliveryMethodsCardBody>

    </div>

</template>

<script>

    import CheckoutCardBody from '@Pages/shopping/components/CheckoutCardBody.vue';
    import DeliveryMethodsCardBody from '@Pages/shopping/components/DeliveryMethodsCardBody.vue';
    import DeliveryMethodsCardHeading from '@Pages/shopping/components/DeliveryMethodsCardHeading.vue';

    export default {
        inject: ['storeState'],
        components: { CheckoutCardBody, DeliveryMethodsCardBody, DeliveryMethodsCardHeading },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        },
    };

</script>
