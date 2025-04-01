<template>

    <MobileNumberInput
        label="Mobile Number"
        v-model="shoppingCartForm.customer.mobileNumber"
        :errorText="formState.getFormError('ussdMobileNumber')">
    </MobileNumberInput>

</template>

<script>

    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';

    export default {
        inject: ['formState', 'shoppingCartState'],
        components: { MobileNumberInput },
        computed: {
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            }
        }
    };

</script>
