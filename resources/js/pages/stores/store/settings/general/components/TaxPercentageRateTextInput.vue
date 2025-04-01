<template>

    <TextInput
        placeholder="10"
        label="Tax Rate (%)"
        labelPopoverTitle="What Is This?"
        v-model="storeForm.taxPercentageRate"
        :errorText="formState.getFormError('taxPercentageRate')"
        labelPopoverDescription="Enter the percentage rate for taxes applied to sales. For example, 15 for a 15% VAT or 7.5 for a 7.5% Sales Tax. This rate will be used to calculate taxes on transactions.">
    </TextInput>

</template>

<script>

    import TextInput from '@Partials/inputs/TextInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { TextInput },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
