<template>
    <!--
        Component Referece: https://flowbite.com/docs/components/popover/
     -->
    <div class="flex items-center">

        <!-- Trigger Icon -->
        <button :data-popover-target="uniqueId" :data-popover-placement="placement" type="button">
            <svg class="w-4 h-4 text-gray-300 hover:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Show information</span>
        </button>

        <!-- Popover Information -->
        <div data-popover :id="uniqueId" role="tooltip" class="w-72 absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
            <div class="p-3 space-y-2 text-xs">

                <!-- Title -->
                <h3 v-if="title" class="font-semibold text-gray-900 dark:text-white">{{ title }}</h3>

                <!-- Description (As Paragraph) -->
                <p v-if="description">{{ description }}</p>

                <!-- Description (As Slot) -->
                <slot name="description"></slot>

            </div>
        </div>

    </div>

</template>

<script>

import { initFlowbite } from "flowbite";
import { UtilsMixin } from '@Mixins/UtilsMixin.js';

export default {
    mixins: [UtilsMixin],
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
    },
    data() {
        return {
            uniqueId: this.generateUniqueId('popover')
        };
    },
    mounted() {
        /**
         *  Flowbite javascript will not work unless we deliberately
         *  Initialize Flowbite on mount of the Vue component.
         *
         *  Reference: https://stackoverflow.com/questions/76043935/flowbite-is-not-working-with-inertia-laravel-app
         */
        initFlowbite();
    },
};
</script>
