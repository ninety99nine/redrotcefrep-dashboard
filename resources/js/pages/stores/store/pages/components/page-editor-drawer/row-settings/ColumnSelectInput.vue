<template>

    <div class="relative">

        <InputLabel v-if="label != ''" :_for="triggerUniqueId" :showAsterisk="showAsterisk" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <!-- Trigger -->
        <div
            :id="triggerUniqueId"
            class="bg-white border rounded-md cursor-pointer flex items-center space-x-2 mt-2 px-3 py-2">

            <div class="w-full">

                <!-- Selected Option -->
                <template v-if="localModelValue !== null">
                    <div class="w-full flex items-center space-x-1 h-6">
                        <div
                            :key="index"
                            :style="{ width: width }"
                            class="w-full bg-blue-500 h-4 rounded"
                            v-for="(width, index) in selectedOption?.columns">
                        </div>
                    </div>
                </template>

                <!-- No Option Selected -->
                <template v-else>
                    <span class="text-sm">No layout selected</span>
                </template>

            </div>

            <!-- Dropdown Arrow -->
            <svg
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7" />
            </svg>
        </div>

        <!-- Dropdown -->
        <div
            role="menu"
            :id="dropdownUniqueId"
            class="w-full absolute z-10 hidden text-base list-none bg-white border border-gray-200 rounded shadow dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">

            <!-- None Option -->
            <div class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                 @click="() => selectOption(null)">
                <span class="text-sm font-bold">None</span>
            </div>

            <!-- Column Options -->
            <ul class="overflow-y-scroll max-h-40 border-t">
                <li
                    :key="option.value"
                    v-for="option in columnOptions"
                    @click="() => selectOption(option.value)"
                    :class="['px-4 py-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-100']">

                    <!-- Option Visual -->
                    <div class="w-full flex items-center space-x-1">
                        <div
                            v-for="(width, index) in option.columns"
                            :key="index"
                            :style="{ width: width }"
                            class="w-full h-6 rounded"
                            :class="option.value === localModelValue ? 'bg-blue-500' : 'bg-blue-300'">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { initFlowbite, Dropdown } from "flowbite";
import { UtilsMixin } from '@Mixins/UtilsMixin.js';
import InputLabel from '@Partials/input-labels/InputLabel.vue';

export default {
    mixins: [UtilsMixin],
    components: { InputLabel },
    props: {
        label: {
            type: String,
            default: "Column Layout",
        },
        labelPopoverTitle: {
            type: String
        },
        labelPopoverDescription: {
            type: String
        },
        modelValue: {
            type: String,
            default: null,
        },
        showAsterisk: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            dropdown: null,
            localModelValue: this.modelValue,
            dropdownUniqueId: this.generateUniqueId("dropdown"),
            triggerUniqueId: this.generateUniqueId("dropdown-trigger"),
        };
    },
    computed: {
        columnOptions() {
            return [
                { value: '4_4', columns: ['100%'] }, // One column
                { value: '1_2,1_2', columns: ['50%', '50%'] }, // Two equal columns
                { value: '1_3,1_3,1_3', columns: ['33.33%', '33.33%', '33.33%'] }, // Three equal columns
                { value: '1_4,1_4,1_4,1_4', columns: ['25%', '25%', '25%', '25%'] }, // Four equal columns
                { value: '1_5,1_5,1_5,1_5,1_5', columns: ['20%', '20%', '20%', '20%', '20%'] }, // Five equal columns
                { value: '1_6,1_6,1_6,1_6,1_6,1_6', columns: ['16.67%', '16.67%', '16.67%', '16.67%', '16.67%', '16.67%'] }, // Six equal columns
                { value: '2_5,3_5', columns: ['40%', '60%'] }, // Two-fifths and three-fifths
                { value: '3_5,2_5', columns: ['60%', '40%'] }, // Three-fifths and two-fifths
                { value: '1_3,2_3', columns: ['33.33%', '66.67%'] }, // One-third and two-thirds
                { value: '2_3,1_3', columns: ['66.67%', '33.33%'] }, // Two-thirds and one-third
                { value: '1_4,3_4', columns: ['25%', '75%'] }, // One-fourth and three-fourths
                { value: '3_4,1_4', columns: ['75%', '25%'] }, // Three-fourths and one-fourth
                { value: '1_4,1_2,1_4', columns: ['25%', '50%', '25%'] }, // One-fourth, one-half, one-fourth
                { value: '1_5,3_5,1_5', columns: ['20%', '60%', '20%'] }, // One-fifth, three-fifths, one-fifth
                { value: '1_4,1_4,1_2', columns: ['25%', '25%', '50%'] }, // One-fourth, one-fourth, one-half
                { value: '1_2,1_4,1_4', columns: ['50%', '25%', '25%'] }, // One-half, one-fourth, one-fourth
                { value: '1_5,1_5,3_5', columns: ['20%', '20%', '60%'] }, // One-fifth, one-fifth, three-fifths
                { value: '3_5,1_5,1_5', columns: ['60%', '20%', '20%'] }, // Three-fifths, one-fifth, one-fifth
                { value: '1_6,1_6,1_6,1_2', columns: ['16.67%', '16.67%', '16.67%', '50%'] }, // One-sixth, one-sixth, one-sixth, one-half
                { value: '1_2,1_6,1_6,1_6', columns: ['50%', '16.67%', '16.67%', '16.67%'] }, // One-half, one-sixth, one-sixth, one-sixth
            ];
        },
        selectedOption() {
            return this.columnOptions.find(option => option.value === this.localModelValue);
        },
    },
    methods: {
        selectOption(value) {
            this.localModelValue = value;
            this.$emit("update:modelValue", value);
            this.$emit("change", value);
            this.dropdown.hide();
        },
    },
    mounted() {
        initFlowbite();

        const $targetEl = document.getElementById(this.dropdownUniqueId);
        const $triggerEl = document.getElementById(this.triggerUniqueId);

        const $options = {
            triggerType: "click",
            placement: "bottom",
        };

        if ($targetEl) {
            this.dropdown = new Dropdown($targetEl, $triggerEl, $options);
        }
    },
};
</script>
