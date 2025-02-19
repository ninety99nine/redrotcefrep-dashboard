<template>

    <div>

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :showAsterisk="showAsterisk" :secondaryLabel="secondaryLabel" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <InputLabelDescription
            v-if="description"
            :description="description"
            :learnMoreLabel="learnMoreLabel"
            :learnMoreLink="learnMoreLink">
        </InputLabelDescription>

        <div :class="[{ 'mt-2' : label != '' }, 'flex items-center rounded-md border-0 shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-blue-700 sm:text-sm sm:leading-6 text-gray-900']">

            <!-- Prepend Slot -->
            <div v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>

            <!-- Input Field -->
            <input v-model="localModelValue" :id="uniqueId" :name="uniqueId" type="time" :min="min" :max="max" :required="required" class="w-full rounded-md border-0 focus:ring-0 py-1.5 px-3 sm:text-sm placeholder:text-gray-400">

            <!-- Suffix Slot -->
            <div v-if="$slots.suffix">
                <slot name="suffix"></slot>
            </div>

        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText"></InputErrorMessage>

    </div>

</template>

<script>

    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputLabelDescription from '@Partials/input-labels/InputLabelDescription.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
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
                default: ''
            },
            secondaryLabel: {
                type: [String, null],
                default: null
            },
            description: {
                type: String
            },
            learnMoreLabel: {
                type: [String, null]
            },
            learnMoreLink: {
                type: [String, null]
            },
            labelPopoverTitle: {
                type: String
            },
            labelPopoverDescription: {
                type: String
            },
            min: {
                type: String,
                default: null   //  '09:00'
            },
            max: {
                type: String,
                default: null   //  '18:00'
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
        components: { InputLabel, InputLabelDescription, InputErrorMessage },
        data() {
        return {
            localModelValue: this.modelValue,
            uniqueId: this.generateUniqueId('text')
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
