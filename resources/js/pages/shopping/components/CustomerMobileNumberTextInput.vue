<template>

    <MobileNumberInput
        label="Mobile Number"
        v-model="shoppingCartForm.customer.mobileNumber"
        :errorText="getFormError('ussdMobileNumber')">
    </MobileNumberInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';

    export default {
        mixins: [FormMixin],
        components: { MobileNumberInput },
        data() {
            return {
                shoppingCartState: useShoppingCartState(),
            }
        },
        computed: {
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            }
        }
    };

</script>
