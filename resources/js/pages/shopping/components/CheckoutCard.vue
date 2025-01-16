<template>

    <div
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="md:max-w-lg mx-4 mb-4 md:mx-auto rounded-lg shadow-lg">

        <!-- Checkout Card Heading -->
        <CheckoutCardHeading></CheckoutCardHeading>

        <!-- Checkout Card Body -->
        <CheckoutCardBody></CheckoutCardBody>

        <!-- Checkout Card Footer -->
        <CheckoutCardFooter></CheckoutCardFooter>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import CheckoutCardBody from '@Pages/shopping/components/CheckoutCardBody.vue';
import CheckoutCardFooter from '@Pages/shopping/components/CheckoutCardFooter.vue';
import CheckoutCardHeading from '@Pages/shopping/components/CheckoutCardHeading.vue';

export default {
    components: { CheckoutCardBody, CheckoutCardFooter, CheckoutCardHeading },
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
