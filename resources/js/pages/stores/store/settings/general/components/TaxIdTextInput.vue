<template>

    <TextInput
        label="Tax ID"
        placeholder="12-3456789"
        v-model="storeForm.taxId"
        :errorText="getFormError('taxId')"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="Provide your tax identification number (e.g. EIN for US, VAT for UK).">
    </TextInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import { useStoreState } from '@Stores/store-store.js';

    export default {
        mixins: [FormMixin],
        components: { TextInput },
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
