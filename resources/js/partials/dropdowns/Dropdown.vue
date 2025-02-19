<template>
    <div class="relative">

        <!-- Trigger -->
        <div :id="triggerUniqueId">
            <slot name="trigger">
                <!-- Default Trigger Icon -->
                <svg class="w-4 h-4 text-gray-300 hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v1h5.5a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 16.5v-10A1.5 1.5 0 014.5 5H10V4a1 1 0 011-1zm1 4a1 1 0 00-1 1v1h-2V8a1 1 0 00-2 0v1H5V8a1 1 0 10-2 0v1a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V8a1 1 0 00-1-1h-1V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
            </slot>
        </div>

        <!-- Dropdown Menu -->
        <div
            role="menu"
            :id="dropdownUniqueId"
            class="absolute z-10 hidden text-base list-none bg-white border border-gray-200 rounded shadow dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">

            <!-- Dropdown Items -->
            <ul v-if="items.length" class="py-2">
                <li v-for="(item, index) in items" :key="index" class="cursor-pointer">
                    <button
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 w-full text-left"
                        @click="item.onClick">
                        {{ item.label }}
                    </button>
                </li>
            </ul>

            <!-- Slot for Custom Dropdown Content -->
            <slot name="content"></slot>

        </div>
    </div>
</template>

<script>
import { initFlowbite, Dropdown } from "flowbite";
import { UtilsMixin } from "@Mixins/UtilsMixin.js";

export default {
    mixins: [UtilsMixin],
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        placement: {
            type: String,
            default: "bottom",
        },
        triggerType: {
            type: String,
            default: "click",
            options: ["click", "hover", "none"],
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
        },
    },
    data() {
        return {
            dropdown: null,
            dropdownUniqueId: this.generateUniqueId("dropdown"),
            triggerUniqueId: this.generateUniqueId("dropdown-trigger"),
        };
    },
    methods: {
        showDropdown() {
            console.log('showDropdown');
            this.dropdown.show();
        },
        hideDropdown() {
            console.log('hideDropdown');
            this.dropdown.hide();
        },
        toggleDropdown() {
            console.log('toggleDropdown');
            this.dropdown.toggle();
        },
    },
    mounted() {
        // Initialize Flowbite
        initFlowbite();

        const $targetEl = document.getElementById(this.dropdownUniqueId);
        const $triggerEl = document.getElementById(this.triggerUniqueId);

        const $options = {
            triggerType: this.triggerType,
            placement: this.placement,
            onToggle: this.onToggle,
            onShow: this.onShow,
            onHide: this.onHide,
        };

        if ($targetEl) {
            this.dropdown = new Dropdown($targetEl, $triggerEl, $options);
        }
    },
};
</script>
