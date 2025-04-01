<template>

    <NumberInput
        min="1"
        placeholder="1"
        v-if="form.autoGenerateTimeSlots"
        v-model="form.timeSlotIntervalValue"
        :errorText="formState.getFormError('timeSlotIntervalValue')">
    </NumberInput>

</template>

<script>

    import NumberInput from '@Partials/inputs/NumberInput.vue';

    export default {
        inject: ['formState'],
        components: { NumberInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
