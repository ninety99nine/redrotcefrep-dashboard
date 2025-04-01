<template>

    <EmailInput
        label="Email"
        v-model="shoppingCartForm.customer.email"
        :errorText="formState.getFormError('email')">
    </EmailInput>

</template>

<script>

    import EmailInput from '@Partials/inputs/EmailInput.vue';

    export default {
        inject: ['formState', 'shoppingCartState'],
        components: { EmailInput },
        computed: {
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            }
        }
    };

</script>
