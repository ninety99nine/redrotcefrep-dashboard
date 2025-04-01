<template>

    <TextInput
        label="Last Name"
        :errorText="formState.getFormError('lastName')"
        v-model="shoppingCartForm.customer.lastName">
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
