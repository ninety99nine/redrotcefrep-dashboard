<template>

    <Checkbox
        size="xs"
        v-model="form.autoGenerateTimeSlots"
        :errorText="formState.getFormError('autoGenerateTimeSlots')"
        labelPopoverDescription="Automatically generates time options for customers to choose from">
        <p class="text-sm mt-0.5 mx-2">Auto generate time slots</p>
    </Checkbox>

</template>

<script>

    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';

    export default {
        inject: ['formState'],
        components: { Checkbox, NumberInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
