<template>

    <div>

        <label class="w-full inline-flex items-start cursor-pointer">

            <div class="flex w-full gap-2">

                <!-- Radio Button -->
                <input
                    type="radio"
                    :id="uniqueId"
                    :value="value"
                    :name="groupName"
                    :disabled="disabled"
                    v-model="localModelValue"
                    :class="[{ 'cursor-not-allowed opacity-50': disabled },'w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-0 dark:bg-gray-700 dark:border-gray-600' ]"
                />

                <!-- Label and Slot Content -->
                <div>
                    <label v-if="label" :for="uniqueId" :class="textClass"> {{ label }} </label>
                    <slot></slot>
                </div>

            </div>

            <!-- More Info Popover -->
            <MoreInfoPopover v-if="labelPopoverTitle || labelPopoverDescription"
                :title="labelPopoverTitle"
                :description="labelPopoverDescription"
                placement="top"
                class="ml-1 mt-1"
            ></MoreInfoPopover>

        </label>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText" class="block mt-1" ></InputErrorMessage>

    </div>

</template>

<script>

    import { generateUniqueId } from '@Utils/generalUtils.js';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        components: { MoreInfoPopover, InputErrorMessage },
        props: {
            modelValue: {
                type: [String, Number, Boolean],
                required: true
            },
            value: {
                type: [String, Number, Boolean],
                required: true
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
            },
            groupName: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                localModelValue: this.modelValue,
                uniqueId: generateUniqueId('radio')
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
