<template>

    <SelectInput
        label="Customer selects"
        v-model="form.scheduleType"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('scheduleType')"
        labelPopoverDescription="Select the schedule type e.g Customers should specify a delivery date or both delivery date and time">
        <option value="date">Date</option>
        <option value="date and time">Date And Time</option>
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
