<template>

    <Checkbox
        size="xs"
        v-model="workflowStepForm.settings.autoCancel"
        :errorText="getFormError('settingsAutoCancel')">
        <div class="mt-0.5 mx-2">
            <p class="font-bold text-sm mb-1">Auto cancel if not paid</p>
            <p class="text-sm text-gray-500 max-w-96">Automatically cancel the order if not paid after a specified amount of time</p>

            <div :class="[workflowStepForm.settings.autoCancel ? 'h-10 mt-4' : 'h-0 mt-0', 'text-gray-500 space-x-2 transition-all duration-500 overflow-hidden']">

                <span class="text-sm">
                    Cancel after
                </span>

                <!-- Auto Cancel Time Input -->
                <NumberInput
                    min="1"
                    placeholder="1"
                    class="w-20 inline-block"
                    v-model="workflowStepForm.settings.cancelTimeValue">
                </NumberInput>

                <!-- Auto Cancel Time Select -->
                <SelectInput
                    width="w-24"
                    class="inline-block"
                    v-model="workflowStepForm.settings.cancelTimeUnit">
                    <option value="hour">{{ workflowStepForm.settings.cancelTimeValue == '1' ? 'Hour' : 'Hours'}}</option>
                    <option value="day">{{ workflowStepForm.settings.cancelTimeValue == '1' ? 'Day' : 'Days'}}</option>
                </SelectInput>

            </div>
        </div>
    </Checkbox>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        mixins: [FormMixin],
        components: { Checkbox, NumberInput, SelectInput },
        props: {
            workflowStepForm: {
                type: Object
            }
        }
    };

</script>
