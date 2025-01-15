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

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import CurrencySelectInput from '@Partials/inputs/CurrencySelectInput.vue';

    export default {
        mixins: [FormMixin],
        components: { CurrencySelectInput },
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
