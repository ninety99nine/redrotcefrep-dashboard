<template>

    <div class="relative">

        <div :id="triggerUniqueId">
            <!-- Trigger -->
            <slot name="trigger" :showPopover="showPopover" :hidePopover="hidePopover" >
                <!-- Default Trigger Icon -->
                <svg class="w-4 h-4 text-gray-300 hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                </svg>
            </slot>
        </div>

        <!-- Popover Information -->
        <div :id="popoverUniqueId" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0">
            <div class="p-3 text-xs whitespace-normal">

                <div class="space-y-2">

                    <!-- Title -->
                    <h3 v-if="title" class="font-semibold text-gray-900 dark:text-white">{{ title }}</h3>

                    <!-- Description (As Paragraph) -->
                    <p v-if="description">{{ description }}</p>

                </div>

                <!-- Description (As Slot) -->
                <slot name="description"></slot>

            </div>
        </div>

    </div>

</template>

<script>
    /**
     * Component Reference: https://flowbite.com/docs/components/popover/
     */
    import { initFlowbite, Popover } from "flowbite";
    import { generateUniqueId } from '@Utils/generalUtils.js';

    export default {
        props: {
            title: {
                type: String
            },
            description: {
                type: String
            },
            placement: {
                type: String,
                default: 'bottom-end'
            },
            triggerType: {
                type: String,
                default: 'hover',
                options: ['click', 'hover', 'none']
            },
            onToggle: {
                type: Function,
                default: () => {}
            },
            onShow: {
                type: Function,
                default: () => {}
            },
            onHide: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                popover: null,
                popoverUniqueId: generateUniqueId('popover'),
                triggerUniqueId: generateUniqueId('popover-trigger'),
            };
        },
        methods: {
            showPopover() {
                this.popover.show();
            },
            hidePopover() {
                this.popover.hide();
            }
        },
        mounted() {

            /**
             *  Flowbite javascript will not work unless we deliberately
             *  Initialize Flowbite on mount of the Vue component.
             *
             *  Reference: https://stackoverflow.com/questions/76043935/flowbite-is-not-working-with-inertia-laravel-app
             */
            initFlowbite();

            const $targetEl = document.getElementById(this.popoverUniqueId);
            const $triggerEl = document.getElementById(this.triggerUniqueId);
            const $options = {
                triggerType: this.triggerType,
                placement: this.placement,
                onToggle: this.onToggle,
                onShow: this.onShow,
                onHide: this.onHide
            };

            if($targetEl != null) {
                this.popover = new Popover($targetEl, $triggerEl, $options);
            }
        },
    };
</script>
