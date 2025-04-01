<template>

    <div>

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :showAsterisk="showAsterisk" :secondaryLabel="secondaryLabel" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription">
            {{ label }}
        </InputLabel>

        <InputLabelDescription
            v-if="description"
            :description="description"
            :learnMoreLabel="learnMoreLabel"
            :learnMoreLink="learnMoreLink">
        </InputLabelDescription>

        <div :class="[{ 'mt-2' : label != '' }, 'flex']">

            <div :class="['w-full flex items-center rounded-md border-0 shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-blue-700 sm:text-sm sm:leading-6 text-gray-900']">

                <!-- Prepend Slot -->
                <template v-if="$slots.prepend">
                    <slot name="prepend"></slot>
                </template>

                <!-- Input Field -->
                <input
                    type="text"
                    @blur="onBlur"
                    :id="uniqueId"
                    @focus="onFocus"
                    :ref="$attrs['ref']"
                    :minlength="minlength"
                    :maxlength="maxlength"
                    v-model="localModelValue"
                    :placeholder="placeholder"
                    :autocomplete="autocomplete"
                    class="w-full rounded-md border-0 focus:ring-0 py-1.5 px-3 sm:text-sm placeholder:text-gray-400">

                <!-- Suffix Slot -->
                <template v-if="$slots.suffix">
                    <slot name="suffix"></slot>
                </template>

            </div>

            <!-- More Info Popover -->
            <MoreInfoPopover v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-2"></MoreInfoPopover>

        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText"></InputErrorMessage>

    </div>

</template>

<script>

    import { generateUniqueId } from '@Utils/generalUtils.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputLabelDescription from '@Partials/input-labels/InputLabelDescription.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        components: { InputLabel, InputLabelDescription, MoreInfoPopover, InputErrorMessage },
        props: {
            modelValue: {
                type: String
            },
            label: {
                type: String,
                default: ''
            },
            secondaryLabel: {
                type: [String, null],
                default: null
            },
            showAsterisk: {
                type: Boolean,
                default: false
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
            maxlength: {
                type: String,
                default: null
            },
            minlength: {
                type: String,
                default: null
            },
            errorText: {
                type: String
            }
        },
        emits: ['update:modelValue', 'blur'],
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
