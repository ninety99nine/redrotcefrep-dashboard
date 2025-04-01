<template>

    <TextInput
        label="Tax ID"
        placeholder="12-3456789"
        v-model="storeForm.taxId"
        :errorText="formState.getFormError('taxId')"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="Provide your tax identification number (e.g. EIN for US, VAT for UK).">
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
