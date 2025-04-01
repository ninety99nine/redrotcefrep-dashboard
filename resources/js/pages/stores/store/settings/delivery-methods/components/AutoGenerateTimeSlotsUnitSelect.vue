<template>

    <SelectInput
        labelPopoverTitle="What Is This?"
        v-if="form.autoGenerateTimeSlots"
        v-model="form.timeSlotIntervalUnit"
        :errorText="formState.getFormError('timeSlotIntervalUnit')"
        labelPopoverDescription="Set the interval that should be used to auto generate the time slots">
        <option value="minute">{{ form.timeSlotIntervalValue == '1' ? 'Minute' : 'Minutes'}}</option>
        <option value="hour">{{ form.timeSlotIntervalValue == '1' ? 'Hour' : 'Hours'}}</option>
    </SelectInput>

</template>

<script>

    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        inject: ['formState'],
        components: { SelectInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
