<template>

    <div
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden space-y-4 mb-4 pt-4">

        <!-- Delivery Methods Card Heading -->
        <DeliveryMethodsCardHeading></DeliveryMethodsCardHeading>

        <!-- Delivery Methods Card Body -->
        <DeliveryMethodsCardBody></DeliveryMethodsCardBody>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import CheckoutCardBody from '@Pages/shopping/components/CheckoutCardBody.vue';
import DeliveryMethodsCardBody from '@Pages/shopping/components/DeliveryMethodsCardBody.vue';
import DeliveryMethodsCardHeading from '@Pages/shopping/components/DeliveryMethodsCardHeading.vue';

export default {
    components: { CheckoutCardBody, DeliveryMethodsCardBody, DeliveryMethodsCardHeading },
    data() {
        return {
            storeState: useStoreState(),
        };
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
        }
    },
};
</script>
