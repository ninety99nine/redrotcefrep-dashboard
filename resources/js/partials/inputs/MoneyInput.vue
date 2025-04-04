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

            <!-- Input Field -->
            <div class="flex">
                <div class="flex items-center px-3 bg-gray-100 rounded-l-lg border text-xs">{{ currencySymbol }}</div>
                <input v-if="size == 'lg'" v-model="localModelValue" @blur="onBlur" :id="uniqueId" type="number" :autocomplete="autocomplete" :placeholder="placeholder" min="0" class="block w-full rounded-r-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3">
                <input v-else-if="size == 'sm'" v-model="localModelValue" @blur="onBlur" :id="uniqueId" type="number" :autocomplete="autocomplete" :placeholder="placeholder" min="0" class="block w-full rounded-r-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 text-xs sm:leading-6 px-3">

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
    props: {
        modelValue: {
            type: String
        },
        showAsterisk: {
            type: Boolean,
            default: false
        },
        currencySymbol: {
            type: String,
            default: 'P'
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
            type: [String, null],
            default: null
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
        errorText: {
            type: String
        },
        size: {
            type: String,
            default: 'lg',
            options: ['lg', 'sm']
        },
    },
    components: { InputLabel, InputLabelDescription, MoreInfoPopover, InputErrorMessage },
    data() {
        return {
            localModelValue: this.modelValue,
            uniqueId: generateUniqueId('money')
        };
    },
    watch: {
        modelValue(newValue, oldValue) {
            this.updateValue(newValue);
        },
        localModelValue(newValue, oldValue) {
            this.notifyParent(newValue.toString());
        }
    },
    methods: {
        updateValue(newValue) {
            this.localModelValue = newValue;
        },
        onBlur(event) {
            var value = this.convertToValidMoney(event.target.value, 'BWP');
            this.localModelValue = value;
            this.notifyParent(value);
        },
        notifyParent(value) {
            this.$emit('update:modelValue', value);
        }
    }
    };

</script>
