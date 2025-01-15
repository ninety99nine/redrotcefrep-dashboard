<template>

    <EmailInput
        label="Email"
        v-model="shoppingCartForm.customer.email"
        :errorText="getFormError('email')">
    </EmailInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import EmailInput from '@Partials/inputs/EmailInput.vue';
    import { useShoppingCartState } from '@Stores/shopping-cart-store.js';

    export default {
        mixins: [FormMixin],
        components: { EmailInput },
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
