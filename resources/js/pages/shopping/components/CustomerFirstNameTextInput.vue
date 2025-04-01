<template>

    <TextInput
        label="First Name"
        :errorText="formState.getFormError('firstName')"
        v-model="shoppingCartForm.customer.firstName">
    </TextInput>

</template>

<script>

    import TextInput from '@Partials/inputs/TextInput.vue';

    export default {
        inject: ['formState', 'shoppingCartState'],
        components: { TextInput },
        computed: {
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            }
        }
    };

</script>
