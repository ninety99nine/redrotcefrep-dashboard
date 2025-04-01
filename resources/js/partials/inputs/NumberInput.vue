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

        <div :class="[{ 'mt-2' : label != '' }]">

            <div class="flex">

                <!-- Input Field -->
                <input v-if="size == 'lg'" v-model="localModelValue" :id="uniqueId" type="number" :min="min" :max="max" :autocomplete="autocomplete" :placeholder="placeholder" :class="[$slots.suffix ? 'rounded-l-md' : 'rounded-md', 'w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3']">
                <input v-else-if="size == 'sm'" v-model="localModelValue" :id="uniqueId" type="number" :min="min" :max="max" :autocomplete="autocomplete" :placeholder="placeholder" :class="[$slots.suffix ? 'rounded-l-md' : 'rounded-md', 'w-full border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 text-xs sm:leading-6 px-3']">

                <!-- Suffix -->
                <template v-if="$slots.suffix">
                    <slot name="suffix"></slot>
                </template>

                <!-- More Info Popover -->
                <MoreInfoPopover v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-2"></MoreInfoPopover>

            </div>

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>

        </div>

    </div>

</template>

<script>

    import { generateUniqueId } from '@Utils/generalUtils.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputLabelDescription from '@Partials/input-labels/InputLabelDescription.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        components: { InputLabel, InputLabelDescription, MoreInfoPopover, InputErrorMessage },
        props: {
            modelValue: {
                type: String
            },
            min: {
                type: String,
                default: null
            },
            max: {
                type: String,
                default: null
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
            autocomplete: {
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
            },
            size: {
                type: String,
                default: 'lg',
                options: ['lg', 'sm']
            }
        },
        data() {
            return {
                localModelValue: this.modelValue,
                uniqueId: generateUniqueId('number')
            };
        },
        watch: {
            modelValue(newValue, oldValue) {
                this.updateValue(newValue);
            },
            localModelValue(newValue, oldValue) {
                this.$emit('update:modelValue', newValue.toString());
            }
        },
        methods: {
            updateValue(newValue) {
                this.localModelValue = newValue;
            }
        }
    };
</script>
