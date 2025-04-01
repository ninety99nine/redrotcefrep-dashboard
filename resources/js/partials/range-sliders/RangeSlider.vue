<template>

    <div class="relative">

        <InputLabel v-if="label != ''" :_for="uniqueId" :showAsterisk="showAsterisk" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <div :class="['flex items-center space-x-2', { 'mt-2' : label != '' }]">
            <slot name="prefix"></slot>
            <input
                :min="min"
                :max="max"
                type="range"
                :step="step"
                :id="uniqueId"

                :disabled="disabled"
                v-model="localModelValue"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <slot name="suffix"></slot>
        </div>

        <div v-if="withLabels" class="relative mt-2 flex justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ minLabel }}</span>
            <span v-for="(step, index) in intermediateSteps" :key="index" class="text-xs text-gray-500 dark:text-gray-400">
            {{ step }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ maxLabel }}</span>
        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText"></InputErrorMessage>

    </div>

  </template>

  <script>

    import { generateUniqueId } from '@Utils/generalUtils.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        components: { InputLabel, InputErrorMessage },
        props: {
            modelValue: {
                type: String
            },
            showAsterisk: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: "Default range",
            },
            labelPopoverTitle: {
                type: String
            },
            labelPopoverDescription: {
                type: String
            },
            min: {
                type: [Number, String],
                default: 0,
            },
            max: {
                type: [Number, String],
                default: 100,
            },
            start: {
                type: [Number, String],
                default: 50,
            },
            step: {
                type: [Number, String],
                default: 1,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            withLabels: {
                type: Boolean,
                default: false,
            },
            intermediateStepCount: {
                type: Number,
                default: 3,
            },
            minLabel: {
                type: String,
                default: "Min",
            },
            maxLabel: {
                type: String,
                default: "Max",
            },
            errorText: {
                type: String
            },
        },
        data() {
            return {
                localModelValue: this.modelValue ?? this.start,
                uniqueId: generateUniqueId("range-slider"),
            };
        },
        watch: {
            modelValue(newValue, oldValue) {
                this.updateValue(newValue);
            },
            localModelValue(newValue, oldValue) {
                if(this.modelValue != newValue) {
                    this.$emit('update:modelValue', newValue.toString());
                    this.$emit('change', newValue.toString());
                }
            }
        },
        computed: {
            intermediateSteps() {
                if (!this.withLabels || this.intermediateStepCount < 1) return [];
                const stepSize =
                (this.max - this.min) / (this.intermediateStepCount + 1);
                return Array.from({ length: this.intermediateStepCount }, (_, i) =>
                Math.round(this.min + stepSize * (i + 1))
                );
            },
        },
        methods: {
            updateValue(newValue) {
                this.localModelValue = newValue;
            }
        },
    };
  </script>
