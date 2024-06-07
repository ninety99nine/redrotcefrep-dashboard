<template>
    <!--
        Component Referece: https://flowbite.com/docs/forms/checkbox/
     -->
     <div>

        <label class="inline-flex items-center cursor-pointer">

            <div class="flex items-center">
                <input :id="uniqueId" :name="uniqueId" v-model="localModelValue" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</label>
            </div>

            <!-- More Info Popover -->
            <MoreInfoPopover v-if="labelPopoverTitle || labelPopoverDescription" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-1"></MoreInfoPopover>

        </label>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText" class="block"></InputErrorMessage>

     </div>
</template>

<script>

    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        mixins: [UtilsMixin],
        components: { MoreInfoPopover, InputErrorMessage },
        props: {
            modelValue: {
                type: Boolean
            },
            label: {
                type: String,
                default: 'Label'
            },
            size: {
                type: String,
                default: 'lg',
                options: ['lg', 'md', 'sm']
            },
            labelPopoverTitle: {
                type: String
            },
            labelPopoverDescription: {
                type: String
            },
            errorText: {
                type: String
            }
        },
        data() {
            return {
                localModelValue: this.modelValue,
                uniqueId: this.generateUniqueId('number')
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

