<template>

    <TextInput
        label="Last Name"
        :errorText="getFormError('lastName')"
        v-model="shoppingCartForm.customer.lastName">
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
