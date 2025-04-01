<template>

    <MobileNumberInput
        label="USSD Number"
        labelPopoverTitle="What Is This?"
        v-model="storeForm.ussdMobileNumber"
        :errorText="formState.getFormError('ussdMobileNumber')"
        labelPopoverDescription="The mobile number that will be used by customers to dial your store, shop and place orders">
    </MobileNumberInput>

</template>

<script>

    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { MobileNumberInput },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
