<template>

    <CurrencySelectInput
        width="w-full"
        label="Currency"
        v-model="storeForm.currency"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The currency accepted by your store">
    </CurrencySelectInput>

</template>

<script>

    import CurrencySelectInput from '@Partials/inputs/CurrencySelectInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { CurrencySelectInput },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
