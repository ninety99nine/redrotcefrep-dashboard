<template>
    <SelectInput
        width="w-full"
        label="Weight Unit"
        v-model="storeForm.weightUnit"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('weightUnit')"
        labelPopoverDescription="Choose the unit of measurement for weights used in your store. This setting is used for product weights and shipping calculations. Common units include kilograms (kg) for metric systems and pounds (lb) for imperial systems.">
        <option value="kg">Kilogram (kg)</option>
        <option value="g">Gram (g)</option>
        <option value="lb">Pound (lb)</option>
        <option value="oz">Ounce (oz)</option>
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
            },
        },
    };
</script>
