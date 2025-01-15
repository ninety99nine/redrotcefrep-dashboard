<template>

    <MobileNumberInput
        label="USSD Number"
        labelPopoverTitle="What Is This?"
        v-model="storeForm.ussdMobileNumber"
        :errorText="getFormError('ussdMobileNumber')"
        labelPopoverDescription="The mobile number that will be used by customers to dial your store, shop and place orders">
    </MobileNumberInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';

    export default {
        mixins: [FormMixin],
        components: { MobileNumberInput },
        data() {
            return {
                storeState: useStoreState(),
            }
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
