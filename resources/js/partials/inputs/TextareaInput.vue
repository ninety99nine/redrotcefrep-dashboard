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
                <textarea v-model="localModelValue" :id="uniqueId" :name="uniqueId" :required="required" :rows="rows" :placeholder="placeholder" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3"></textarea>

                <!-- More Info Popover -->
                <MoreInfoPopover v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-2"></MoreInfoPopover>

            </div>

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>

        </div>

    </div>

</template>

<script>

    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputLabelDescription from '@Partials/input-labels/InputLabelDescription.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
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
            required: {
                type: Boolean,
                default: true
            },
        },
        mixins: [UtilsMixin],
        components: { InputLabel, InputLabelDescription, MoreInfoPopover, InputErrorMessage },
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
