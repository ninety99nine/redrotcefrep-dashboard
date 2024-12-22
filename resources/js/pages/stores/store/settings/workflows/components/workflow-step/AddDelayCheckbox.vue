<template>

    <Checkbox
        size="xs"
        v-model="workflowStepForm.settings.addDelay"
        :errorText="getFormError('settingsAddDelay')">
        <div class="mt-0.5 mx-2">
            <p class="font-bold text-sm mb-1">Add delay</p>
            <p class="text-sm text-gray-500 max-w-96">Send message after a specified amount of time</p>

            <div :class="[workflowStepForm.settings.addDelay ? 'h-10 mt-4' : 'h-0 mt-0', 'text-gray-500 space-x-2 transition-all duration-500 overflow-hidden']">

                <span class="text-sm">
                    Send after
                </span>

                <!-- Delay Time Input -->
                <NumberInput
                    min="1"
                    placeholder="1"
                    class="w-20 inline-block"
                    v-model="workflowStepForm.settings.delayTimeValue">
                </NumberInput>

                <!-- Delay Time Select -->
                <SelectInput
                    width="w-24"
                    class="inline-block"
                    v-model="workflowStepForm.settings.delayTimeUnit">
                    <option value="hour">{{ workflowStepForm.settings.delayTimeValue == '1' ? 'Hour' : 'Hours'}}</option>
                    <option value="day">{{ workflowStepForm.settings.delayTimeValue == '1' ? 'Day' : 'Days'}}</option>
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
