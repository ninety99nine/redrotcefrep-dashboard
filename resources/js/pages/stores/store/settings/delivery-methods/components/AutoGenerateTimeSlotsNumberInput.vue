<template>

    <NumberInput
        min="1"
        placeholder="1"
        v-if="form.autoGenerateTimeSlots"
        v-model="form.timeSlotIntervalValue"
        :errorText="getFormError('timeSlotIntervalValue')">
    </NumberInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import NumberInput from '@Partials/inputs/NumberInput.vue';

    export default {
        mixins: [FormMixin],
        components: { NumberInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
