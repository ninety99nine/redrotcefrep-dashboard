<template>
    <div class="relative">

        <!-- Trigger -->
        <div
            :id="triggerUniqueId"
            class="w-8 h-8 bg-gray-200 text-gray-800 rounded-full flex justify-center items-center cursor-pointer shadow border border-gray-400 hover:scale-95 hover:shadow-sm hover:border-gray-400 active:scale-90 active:bg-gray-200 transition-all">
            <span>+</span>
        </div>

        <!-- Dropdown Menu -->
        <div
            role="menu"
            :id="dropdownUniqueId"
            class="absolute z-10 hidden text-base list-none bg-white border border-gray-200 p-4 rounded shadow">

            <!-- Grid View for Modules -->
            <div class="w-80 grid grid-cols-3">
                <div
                    :key="index"
                    @click="() => addModule(module)"
                    v-for="(module, index) in getModules()"
                    class="cursor-pointer flex flex-col items-center text-gray-700 hover:bg-gray-100 p-4 rounded transition">

                    <!-- Module Icon -->
                    <div class="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                        <svg
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            v-if="getModuleIcon(module.type)"
                            xmlns="http://www.w3.org/2000/svg">
                            <g transform="scale(1.5)">
                                <path :d="getModuleIcon(module.type)" />
                            </g>
                        </svg>
                        <span v-else class="text-xl font-bold">{{ module.type.charAt(0) }}</span>
                    </div>

                    <!-- Module Name -->
                    <span class="text-xs mt-2 font-medium">{{ module.type }}</span>
                </div>
            </div>

            <!-- Slot for Custom Dropdown Content -->
            <slot name="content"></slot>

        </div>
    </div>
</template>

<script>

    import { initFlowbite, Dropdown } from "flowbite";
    import { generateUniqueId } from '@Utils/generalUtils.js';

    export default {
        inject: ['pageState'],
        props: {
            rowIndex: Number,
            columnIndex: Number,
            sectionIndex: Number,
        },
        data() {
            return {
                dropdown: null,
                dropdownUniqueId: generateUniqueId("dropdown"),
                triggerUniqueId: generateUniqueId("dropdown-trigger"),
            };
        },
        methods: {
            getModules() {
                return this.pageState.getModules();
            },
            getModuleIcon(type) {
                return this.pageState.getModuleIcon(type);
            },
            addModule(module) {
                this.pageState.addModule(this.sectionIndex, this.rowIndex, this.columnIndex, module);
            }
        },
        mounted() {
            // Initialize Flowbite
            initFlowbite();

            const $targetEl = document.getElementById(this.dropdownUniqueId);
            const $triggerEl = document.getElementById(this.triggerUniqueId);

            const $options = {
                triggerType: 'click',
                placement: 'bottom'
            };

            if ($targetEl) {
                this.dropdown = new Dropdown($targetEl, $triggerEl, $options);
            }
        },
    };

</script>
