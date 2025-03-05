<template>

    <div>

        <label class="w-full inline-flex items-start cursor-pointer">

            <div class="flex w-full gap-2">

                <!-- Checkbox -->
                <input :id="uniqueId" :name="uniqueId" v-model="localModelValue" type="checkbox" :disabled="disabled" :class="[ { 'cursor-not-allowed opacity-50': disabled }, 'w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' ]" >

                <!-- Label and Slot Content -->
                <div>
                    <label v-if="label" :for="uniqueId" :class="textClass"> {{ label }} </label>
                    <slot></slot>
                </div>

            </div>

            <!-- More Info Popover -->
            <MoreInfoPopover v-if="labelPopoverTitle || labelPopoverDescription" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-1 mt-1" ></MoreInfoPopover>

        </label>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText" class="block mt-1" ></InputErrorMessage>

    </div>

  </template>

  <script>

    /**
     * Component Reference: https://flowbite.com/docs/forms/checkbox/
     */
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
                default: ''
            },
            size: {
                type: String,
                default: 'base',
                options: ['xs', 'sm', 'base', 'lg']
            },
            disabled: {
                type: Boolean,
                default: false
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
        emits: ['update:modelValue'],
        data() {
            return {
                localModelValue: this.modelValue,
                uniqueId: this.generateUniqueId('number')
            };
        },
        watch: {
            modelValue(newValue) {
                this.localModelValue = newValue;
            },
            localModelValue(newValue) {
                this.$emit('update:modelValue', newValue);
            }
        },
        computed: {
            textClass() {
                let classes = ['font-medium text-gray-900 dark:text-gray-300'];

                if (this.size === 'xs') {
                classes.push('text-xs');
                } else if (this.size === 'sm') {
                classes.push('text-sm');
                } else if (this.size === 'base') {
                classes.push('text-base');
                } else if (this.size === 'lg') {
                classes.push('text-lg');
                }

                return classes.join(' ');
            }
        }
    };
  </script>
