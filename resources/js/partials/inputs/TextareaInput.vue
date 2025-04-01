<template>

    <div>

        <!-- Input Label -->
        <InputLabel
            :_for="uniqueId"
            v-if="label != ''"
            :showAsterisk="showAsterisk"
            :secondaryLabel="secondaryLabel"
            :labelPopoverTitle="labelPopoverTitle"
            :labelPopoverDescription="labelPopoverDescription">
            {{ label }}
        </InputLabel>

        <!-- Input Label Description -->
        <InputLabelDescription
            v-if="description"
            :description="description"
            :learnMoreLabel="learnMoreLabel"
            :learnMoreLink="learnMoreLink">
        </InputLabelDescription>

        <div :class="[{ 'mt-2' : label != '' }]">

            <component :is="skeleton ? 'ShineEffect' : 'div'" class="flex">

                <!-- Input Field -->
                <textarea
                    :rows="rows"
                    :id="uniqueId"
                    @blur="onBlur"
                    @focus="onFocus"
                    v-model="localModelValue"
                    :placeholder="placeholder"
                    :disabled="skeleton || disabled"
                    :class="[{ 'bg-gray-100' : skeleton }, 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3']">
                </textarea>

                <!-- More Info Popover -->
                <MoreInfoPopover
                    class="ml-2"
                    placement="top"
                    :title="labelPopoverTitle"
                    :description="labelPopoverDescription"
                    v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)">
                </MoreInfoPopover>

            </component>

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>

        </div>

    </div>

</template>

<script>

    import { generateUniqueId } from '@Utils/generalUtils.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputLabelDescription from '@Partials/input-labels/InputLabelDescription.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        components: { ShineEffect, InputLabel, InputLabelDescription, MoreInfoPopover, InputErrorMessage },
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
            errorText: {
                type: String
            },
            rows: {
                type: Number,
                default: 4
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            skeleton: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                focusedValue: null,
                localModelValue: this.modelValue,
                uniqueId: generateUniqueId('text')
            };
        },
        watch: {
            modelValue(newValue, oldValue) {
                this.localModelValue = newValue;
            },
            localModelValue(newValue, oldValue) {
                this.$emit('update:modelValue', newValue);
            }
        },
        methods: {
            onFocus() {
                this.focusedValue = this.localModelValue;
            },
            onBlur() {
                if(this.localModelValue != this.focusedValue) {
                    this.$emit('blur', this.localModelValue);
                }
            }
        }
    };

</script>
