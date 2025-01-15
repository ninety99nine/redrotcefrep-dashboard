<template>

    <div
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="w-full max-w-lg mx-auto rounded-lg shadow-lg space-y-4 mb-4 p-4">

        <p class="font-bold">Customer</p>

        <div class="grid grid-cols-2 gap-4">

            <!-- Customer First Name Text Input -->
            <CustomerFirstNameTextInput></CustomerFirstNameTextInput>

            <!-- Customer Last Name Text Input -->
            <CustomerLastNameTextInput></CustomerLastNameTextInput>

        </div>

        <!-- Customer Mobile Number Text Input -->
        <CustomerMobileNumberTextInput></CustomerMobileNumberTextInput>

        <!-- Customer Email Text Input -->
        <CustomerEmailTextInput></CustomerEmailTextInput>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import CustomerEmailTextInput from '@Pages/shopping/components/CustomerEmailTextInput.vue';
import CustomerLastNameTextInput from '@Pages/shopping/components/CustomerLastNameTextInput.vue';
import CustomerFirstNameTextInput from '@Pages/shopping/components/CustomerFirstNameTextInput.vue';
import CustomerMobileNumberTextInput from '@Pages/shopping/components/CustomerMobileNumberTextInput.vue';

export default {
    components: {
        CustomerEmailTextInput, CustomerLastNameTextInput, CustomerFirstNameTextInput, CustomerMobileNumberTextInput
    },
    data() {
        return {
            storeState: useStoreState()
        };
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
        }
    }
};
</script>
