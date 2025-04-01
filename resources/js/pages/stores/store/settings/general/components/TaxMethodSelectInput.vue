<template>

    <SelectInput
        width="w-full"
        label="Tax Method"
        v-model="storeForm.taxMethod"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('taxMethod')"
        labelPopoverDescription="Choose whether taxes are included in your prices (inclusive) or added on top of prices (exclusive).">
        <option value="inclusive">Inclusive (Prices include tax)</option>
        <option value="exclusive">Exclusive (Prices exclude tax)</option>
    </SelectInput>

</template>

<script>

    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { SelectInput },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
