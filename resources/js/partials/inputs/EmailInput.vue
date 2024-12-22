<template>

    <TextInput
        :label="label"
        :required="required"
        :errorText="errorText"
        v-model="localModelValue"
        :placeholder="placeholder"
        :labelPopoverTitle="labelPopoverTitle"
        :labelPopoverDescription="labelPopoverDescription">
        <template #prepend>
            <div class="flex items-center space-x-1 py-1.5 px-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
            </div>
        </template>
    </TextInput>

</template>

<script>

import { UtilsMixin } from '@Mixins/UtilsMixin.js';
import TextInput from '@Partials/inputs/TextInput.vue';

export default {
    props: {
        modelValue: {
            type: String
        },
        label: {
            type: String,
            default: ''
        },
        labelPopoverTitle: {
            type: String
        },
        labelPopoverDescription: {
            type: String
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: true
        },
        errorText: {
            type: String
        }
    },
    mixins: [UtilsMixin],
    components: { TextInput },
    data() {
        return {
            localModelValue: this.modelValue,
            uniqueId: this.generateUniqueId('email')
        };
    },
    watch: {
        modelValue(newValue, oldValue) {
            this.updateValue(newValue);
        },
        localModelValue(newValue, oldValue) {
            this.$emit('update:modelValue', newValue);
        }
    },
    methods: {
        updateValue(newValue) {
            this.localModelValue = newValue;
        }
    }
};

</script>
