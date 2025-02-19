<template>

    <div :class="width">

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
        <div :class="[{ 'mt-2' : label != '' }, 'flex items-center']">

            <!-- Select Field -->
            <select v-model="localModelValue" :id="uniqueId" :name="uniqueId" :required="required" :class="['w-full block py-1.5 px-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']">
                <slot></slot>
            </select>

            <!-- More Info Popover -->
            <MoreInfoPopover v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-2"></MoreInfoPopover>

        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText"></InputErrorMessage>

    </div>

</template>

<script>

    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputLabelDescription from '@Partials/input-labels/InputLabelDescription.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        mixins: [UtilsMixin],
        components: { InputLabel, InputLabelDescription, MoreInfoPopover, InputErrorMessage },
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
            required: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: 'w-40'
            }
        },
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
