<template>

    <SelectInput
        width="w-full"
        label="Fee Type"
        v-model="form.feeType"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('feeType')"
        labelPopoverDescription="Select the free type e.g Is this a flat fee or a free that is calculated based on a percetange of the total cart amount, location distance or postal code?">
        <option value="flat fee">Flat fee</option>
        <option value="percentage fee">Percentage fee</option>
        <option value="fee by weight">Fee by weight</option>
        <option value="fee by distance">Fee by distance</option>
        <option value="fee by postal code">Fee by postal code</option>
    </SelectInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        mixins: [FormMixin],
        components: { SelectInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
