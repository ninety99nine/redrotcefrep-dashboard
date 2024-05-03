<template>

    <div>

        <!-- Input Label -->
        <InputLabel :_for="uniqueId" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            Mobile Number
        </InputLabel>

        <div class="mt-2">

            <!-- Input Field -->
            <input v-model="localModelValue" :id="uniqueId" :name="uniqueId" type="tel" autocomplete="tel" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3">

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>

        </div>

    </div>

  </template>

  <script>

    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        props: {
            modelValue: {
                type: String
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
        },
        mixins: [UtilsMixin],
        components: { InputLabel, InputErrorMessage },
        data() {
            return {
                localModelValue: this.modelValue,
                uniqueId: this.generateUniqueId('mobile_number')
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
        },
    };

  </script>
