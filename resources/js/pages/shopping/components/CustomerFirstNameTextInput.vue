<template>

    <TextInput
        label="First Name"
        :errorText="getFormError('firstName')"
        v-model="shoppingCartForm.customer.firstName">
    </TextInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import { useShoppingCartState } from '@Stores/shopping-cart-store.js';

    export default {
        mixins: [FormMixin],
        components: { TextInput },
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
