<template>

    <CountrySelectInput
        width="w-full"
        label="Country"
        v-model="storeForm.country"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The country that your store is operating from">
    </CountrySelectInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import CountrySelectInput from '@Partials/inputs/CountrySelectInput.vue';

    export default {
        mixins: [FormMixin],
        components: { CountrySelectInput },
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
