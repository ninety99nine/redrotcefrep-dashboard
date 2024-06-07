<template>
    <!--
        Component Referece: https://flowbite.com/docs/forms/toggle/
     -->
     <div>

        <label class="inline-flex items-center cursor-pointer">
            <input v-model="localModelValue" type="checkbox" value="" class="sr-only peer">

            <div v-if="size == 'lg'" class="relative w-11 h-6 after:h-5 after:w-5 after:top-[2px] after:start-[2px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <div v-else-if="size == 'md'" class="relative w-9 h-5 after:h-4 after:w-4 after:top-[2px] after:start-[2px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <div v-else-if="size == 'sm'" class="relative w-7 h-4 after:h-3 after:w-3 after:top-[2px] after:start-[2px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

            <span :class="[size == 'sm' ? 'text-xs ml-1' : 'text-sm ml-3', 'font-medium text-gray-900 dark:text-gray-300']">
                <slot></slot>
            </span>

            <!-- More Info Popover -->
            <MoreInfoPopover v-if="labelPopoverTitle || labelPopoverDescription" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-1"></MoreInfoPopover>

        </label>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText" class="block"></InputErrorMessage>

     </div>
</template>

<script>

    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        props: {
            modelValue: {
                type: Boolean
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
        components: { MoreInfoPopover, InputErrorMessage },
        data() {
            return {
                localModelValue: this.modelValue,
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

