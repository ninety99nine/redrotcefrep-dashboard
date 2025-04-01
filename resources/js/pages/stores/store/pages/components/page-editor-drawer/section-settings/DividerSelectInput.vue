<template>

    <div class="relative">

        <InputLabel v-if="label != ''" :_for="triggerUniqueId" :showAsterisk="showAsterisk" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <!-- Trigger -->
        <div
            :id="triggerUniqueId"
            class="bg-white border rounded-md cursor-pointer mt-2 flex justify-between items-center px-3 py-2">

            <div class="flex items-center space-x-2">

                <!-- Preview Option Image -->
                <template v-if="localModelValue !== null">
                    <img
                        class="w-full h-6"
                        :alt="selectedOption?.label"
                        :src="selectedOption?.preview"/>
                </template>

                <!-- No Option Selected -->
                <template v-else>
                    <span class="text-sm">No divider selected</span>
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
            class="absolute z-10 hidden text-base list-none bg-white border border-gray-200 rounded shadow dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">

            <!-- None Option -->
            <div class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                 @click="() => selectOption(null)">
                <span class="text-sm font-bold">None</span>
            </div>

            <!-- Divider Options -->
            <ul class="overflow-y-scroll max-h-40 border-t">
                <li
                    :key="option.value"
                    v-for="option in options"
                    @click="() => selectOption(option.value)"
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">

                    <img
                        :src="option.preview"
                        :alt="option.label"
                        class="w-full h-6" />
                </li>
            </ul>

        </div>

    </div>

</template>

<script>
    import { initFlowbite, Dropdown } from "flowbite";
    import { generateUniqueId } from '@Utils/generalUtils.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        components: { InputLabel, InputErrorMessage },
        props: {
            color: {
                type: [String, null],
                default: null
            },
            label: {
                type: String,
                default: "Divider",
            },
            labelPopoverTitle: {
                type: String
            },
            labelPopoverDescription: {
                type: String
            },
            type: {
                type: String,
                required: true,
                validator: (value) => ["top", "bottom"].includes(value),
            },
            modelValue: {
                type: String,
                default: "none",
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
                dropdownUniqueId: generateUniqueId("dropdown"),
                triggerUniqueId: generateUniqueId("dropdown-trigger"),
            };
        },
        computed: {
            dividerOptions() {
                return {
                    top: [
                        // Arrow options
                        {
                            label: "Arrow",
                            value: "arrow",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M640 140L1280 0H0z'/%3E%3C/svg%3E`
                        },
                        {
                            label: "Arrow 2",
                            value: "arrow2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M640 140L1280 0H0z' fill-opacity='.5'/%3E%3Cpath d='M640 98l640-98H0z'/%3E%3C/svg%3E`
                        },
                        {
                            label: "Arrow 3",
                            value: "arrow3",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 0L640 70 0 0v140l640-70 640 70V0z' fill-opacity='.5'/%3E%3Cpath d='M1280 0H0l640 70 640-70z'/%3E%3C/svg%3E`
                        },

                        // Asymmetric options
                        {
                            label: "Asymmetric",
                            value: "asymmetric",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M978.81 122.25L0 0h1280l-262.1 116.26a73.29 73.29 0 0 1-39.09 5.99z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Asymmetric 2",
                            value: "asymmetric2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M978.81 122.25L0 0h1280l-262.1 116.26a73.29 73.29 0 0 1-39.09 5.99z' fill-opacity='.5' /%3E%3Cpath d='M983.19 95.23L0 0h1280l-266 91.52a72.58 72.58 0 0 1-30.81 3.71z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Asymmetric 3",
                            value: "asymmetric3",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 0l-131.81 111.68c-16.47 14-35.47 21-54.71 20.17L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Asymmetric 4",
                            value: "asymmetric4",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0h1280l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z' fill-opacity='.5' /%3E%3Cpath d='M1094.44 119L172.7 68.72a74.54 74.54 0 0 1-25.19-5.95L0 0h1280l-133.85 102c-15.84 12.09-33.7 17.95-51.71 17z' /%3E%3C/svg%3E`
                        },

                        // Curve options
                        {
                            label: "Curve",
                            value: "curve",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M640 140C286.54 140 0 0 0 0h1280S993.46 140 640 140z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Curve 2",
                            value: "curve2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v.48C18.62 9.38 297.81 140 639.5 140 993.24 140 1280 0 1280 0z' fill-opacity='.3' /%3E%3Cpath d='M0 .6c14 8.28 176.54 99.8 555.45 119.14C952.41 140 1280 0 1280 0H0z' fill-opacity='.5' /%3E%3Cpath d='M726.29 101.2C1126.36 79.92 1281 0 1281 0H1c.05 0 325.25 122.48 725.29 101.2z' /%3E%3C/svg%3E`
                        },

                        // Graph options
                        {
                            label: "Graph",
                            value: "graph",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M156.258 127.903l86.363-18.654 78.684 13.079L411.441 99.4l94.454 10.303L582.82 93.8l82.664 18.728 76.961-11.39L816.109 71.4l97.602 9.849L997.383 50.4l66.285 14.694 70.793-24.494h79.863L1280 0H0v122.138l60.613 9.965z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Graph 2",
                            value: "graph2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1214.323 66.051h-79.863l-70.793 18.224-66.285-10.933-83.672 22.953-97.601-7.328-73.664 22.125-76.961 8.475-82.664-13.934-76.926 11.832-94.453-7.666-90.137 17.059-78.684-9.731-86.363 13.879-95.644 3.125L0 126.717V0h1280l-.001 35.844z' fill-opacity='.5' /%3E%3Cpath d='M0 0h1280v.006l-70.676 36.578-74.863 4.641-70.793 23.334-66.285-11.678-83.672 29.618-97.602-7.07-63.664 21.421-76.961 12.649-91.664-20.798-77.926 17.66-94.453-7.574-90.137 21.595-78.683-9.884-86.363 16.074-95.645 6.211L0 127.905z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Graph 3",
                            value: "graph3",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M156 35.51l95.46 34.84 120.04.24 71.5 33.35 90.09-3.91L640 137.65l102.39-37.17 85.55 10.65 88.11-7.19L992 65.28l73.21 5.31 66.79-22.1 77-.42L1280 0H0l64.8 38.69 91.2-3.18z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Graph 4",
                            value: "graph4",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M156 35.41l95.46 34.73 120.04.25 71.5 33.24 90.09-3.89L640 137.25l102.39-37.06 85.55 10.61 88.11-7.17L992 65.08l73.21 5.31L1132 48.35l77-.42L1280 0H0l64.8 38.57 91.2-3.16z' fill-opacity='.5' /%3E%3Cpath d='M156 28.32l95.46 27.79 120.04.2L443 82.9l90.09-3.11L640 109.8l102.39-29.65 85.55 8.49 88.11-5.74L992 52.07l73.21 4.24L1132 38.68l77-.34L1280 0H0l64.8 30.86 91.2-2.54z' /%3E%3C/svg%3E`
                        },

                        // Mountains options
                        {
                            label: "Mountains",
                            value: "mountains",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 69.65l-320 49.24L320 20.4 0 69.65V0h1280v69.65z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Mountains 2",
                            value: "mountains2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 90.72l140-28.28 315.52 24.14L796.48 65.8 1140 104.89l140-14.17V0H0v90.72z' fill-opacity='.5' /%3E%3Cpath d='M0 0v47.44L170 0l626.48 94.89L1110 87.11l170-39.67V0H0z' /%3E%3C/svg%3E`
                        },

                        // Ramp options
                        {
                            label: "Ramp",
                            value: "ramp",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0s573.08 140 1280 140V0z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Ramp 2",
                            value: "ramp2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v60s573.09 80 1280 80V0z' fill-opacity='.3' /%3E%3Cpath d='M0 0v30s573.09 110 1280 110V0z' fill-opacity='.5' /%3E%3Cpath d='M0 0s573.09 140 1280 140V0z' /%3E%3C/svg%3E`
                        },

                        // Slant options
                        {
                            label: "Slant",
                            value: "slant",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 140V0H0l1280 140z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Slant 2",
                            value: "slant2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 140V0H0l1280 140z' fill-opacity='.5' /%3E%3Cpath d='M1280 98V0H0l1280 98z' /%3E%3C/svg%3E`
                        },

                        // Wave options
                        {
                            label: "Wave",
                            value: "wave",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M320 28C160 28 80 49 0 70V0h1280v70c-80 21-160 42-320 42-320 0-320-84-640-84z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Wave 2",
                            value: "wave2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 51.76c36.21-2.25 77.57-3.58 126.42-3.58 320 0 320 57 640 57 271.15 0 312.58-40.91 513.58-53.4V0H0z' fill-opacity='.3' /%3E%3Cpath d='M0 24.31c43.46-5.69 94.56-9.25 158.42-9.25 320 0 320 89.24 640 89.24 256.13 0 307.28-57.16 481.58-80V0H0z' fill-opacity='.5' /%3E%3Cpath d='M0 0v3.4C28.2 1.6 59.4.59 94.42.59c320 0 320 84.3 640 84.3 285 0 316.17-66.85 545.58-81.49V0z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Waves",
                            value: "waves",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v100c20 17.3 40 29.51 80 29.51 51.79 0 74.69-48.57 151.75-48.57 73.72 0 91 54.88 191.56 54.88C543.95 135.8 554 14 665.69 14c109.46 0 98.85 87 188.2 87 70.37 0 69.81-33.73 115.6-33.73 55.85 0 62 39.62 115.6 39.62 58.08 0 57.52-46.59 115-46.59 39.8 0 60 22.48 79.89 39.69V0z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Waves 2",
                            value: "waves2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M504.854,80.066c7.812,0,14.893,0.318,21.41,0.879 c-25.925,22.475-56.093,40.852-102.946,40.852c-20.779,0-37.996-2.349-52.898-6.07C413.517,107.295,434.056,80.066,504.854,80.066z M775.938,51.947c19.145,18.596,39.097,35.051,77.956,35.051c46.907,0,62.299-14.986,80.912-24.98 c-21.357-15.783-46.804-28.348-85.489-28.348C816.829,33.671,794.233,41.411,775.938,51.947z' fill-opacity='.3' /%3E%3Cpath d='M1200.112,46.292c39.804,0,59.986,22.479,79.888,39.69v16.805 c-19.903-10.835-40.084-21.777-79.888-21.777c-72.014,0-78.715,43.559-147.964,43.559c-56.84,0-81.247-35.876-117.342-62.552 c9.309-4.998,19.423-8.749,34.69-8.749c55.846,0,61.99,39.617,115.602,39.617C1143.177,92.887,1142.618,46.292,1200.112,46.292z M80.011,115.488c-40.006,0-60.008-12.206-80.011-29.506v16.806c20.003,10.891,40.005,21.782,80.011,21.782 c80.004,0,78.597-30.407,137.669-30.407c55.971,0,62.526,24.026,126.337,24.026c9.858,0,18.509-0.916,26.404-2.461 c-57.186-14.278-80.177-48.808-138.66-48.808C154.698,66.919,131.801,115.488,80.011,115.488z M526.265,80.945 c56.848,4.902,70.056,28.726,137.193,28.726c54.001,0,73.43-35.237,112.48-57.724C751.06,27.782,727.548,0,665.691,0 C597.381,0,567.086,45.555,526.265,80.945z' fill-opacity='.5' /%3E%3Cpath d='M0,0v85.982c20.003,17.3,40.005,29.506,80.011,29.506c51.791,0,74.688-48.569,151.751-48.569 c58.482,0,81.473,34.531,138.66,48.808c43.096-8.432,63.634-35.662,134.433-35.662c7.812,0,14.893,0.318,21.41,0.879 C567.086,45.555,597.381,0,665.691,0c61.856,0,85.369,27.782,110.246,51.947c18.295-10.536,40.891-18.276,73.378-18.276 c38.685,0,64.132,12.564,85.489,28.348c9.309-4.998,19.423-8.749,34.69-8.749c55.846,0,61.99,39.617,115.602,39.617 c58.08,0,57.521-46.595,115.015-46.595c39.804,0,59.986,22.479,79.888,39.69V0H0z' /%3E%3C/svg%3E`
                        },

                        // Clouds options
                        {
                            label: "Clouds",
                            value: "clouds",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='xMidYMid slice' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280,0H0S0,116.17,0,116.17a79.47,79.47,0,0,1,20.07,2.57,46.91,46.91,0,0,1,78.8-.07,46.76,46.76,0,0,1,21.82,1.62A67.67,67.67,0,0,1,248.93,94.17a46.88,46.88,0,0,1,78.77,33.31c.42.22.84.43,1.25.66a38.38,38.38,0,0,1,8.94,6.92,61.44,61.44,0,0,1,72.79-23.32A61.43,61.43,0,0,1,513.26,90.87a23.42,23.42,0,0,1,25.4-4.8,86,86,0,0,1,150.15,28.37,46.65,46.65,0,0,1,13.56,3.77,46.9,46.9,0,0,1,89.25-.45A67.85,67.85,0,0,1,830.13,134a67.7,67.7,0,0,1,119.73-19.38,43,43,0,0,1,37.93.57,26.07,26.07,0,0,1,27.65-17.54c.16-.28.29-.57.45-.85A86,86,0,0,1,1166.37,98a67.71,67.71,0,0,1,102.21,19,81.66,81.66,0,0,1,11.42-.81Z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Clouds 2",
                            value: "clouds2",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='xMidYMid slice' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M833.9,77.67a64.2,64.2,0,0,0-15.53,12.18,24.53,24.53,0,0,0-26.61-5,90.1,90.1,0,0,0-130.57-12.1,85.54,85.54,0,0,1,27.62,41.73,46.66,46.66,0,0,1,13.56,3.77,46.9,46.9,0,0,1,89.25-.45A67.84,67.84,0,0,1,830.13,134,67.61,67.61,0,0,1,910.8,88.2,64.38,64.38,0,0,0,833.9,77.67Z M384,94.11a70.48,70.48,0,0,0-22.73,20.27,61.44,61.44,0,0,1,49.42-2.63,61.19,61.19,0,0,1,18.15-26A70.64,70.64,0,0,0,384,94.11Z M944.2,107.71a67.34,67.34,0,0,1,5.66,6.87,43.3,43.3,0,0,1,17.8-4.1A64.53,64.53,0,0,0,944.2,107.71Z M178.67,57.16a67.63,67.63,0,0,1,70.26,37,47.06,47.06,0,0,1,32.92-12.5A90.18,90.18,0,0,0,178.67,57.16Z M325.24,113.52a46.93,46.93,0,0,1,2.46,14c.42.22.84.43,1.25.66a38.38,38.38,0,0,1,8.94,6.92,61,61,0,0,1,22.94-20.48A45.09,45.09,0,0,0,325.24,113.52Z M33.49,105.13a46.91,46.91,0,0,1,65.38,13.55,46.75,46.75,0,0,1,21.82,1.62,67.13,67.13,0,0,1,8.58-29.39c.34-.6.7-1.19,1.06-1.78a80.19,80.19,0,0,0-96.84,16Z M1262.42,107.77a67.35,67.35,0,0,1,6.16,9.15,81.66,81.66,0,0,1,11.42-.81V98.48a48.83,48.83,0,0,0-17.58,9.29Z M1127.33,61.18c1.88.88,3.74,1.81,5.58,2.84A85.42,85.42,0,0,1,1166.37,98a68,68,0,0,1,49.55-15.27A70.94,70.94,0,0,0,1127.33,61.18Z' fill-opacity='.5'/%3E%3Cpath d='M361,114.68l.23-.3-.43.22Z M0,0V120.87c0-3,0-4.69,0-4.69a79.35,79.35,0,0,1,20.06,2.57,46.56,46.56,0,0,1,13.42-13.62,80.19,80.19,0,0,1,96.84-16,67.52,67.52,0,0,1,48.33-32A90.18,90.18,0,0,1,281.84,81.67a46.82,46.82,0,0,1,43.4,31.85,45.09,45.09,0,0,1,35.59,1.07l.43-.22a70.84,70.84,0,0,1,67.57-28.6,61.47,61.47,0,0,1,84.42,5.09,23.42,23.42,0,0,1,25.4-4.8A86,86,0,0,1,661.19,72.72a90.1,90.1,0,0,1,130.57,12.1,24.53,24.53,0,0,1,26.61,5A64.37,64.37,0,0,1,910.8,88.2a67.45,67.45,0,0,1,33.4,19.51,64.53,64.53,0,0,1,23.45,2.77,42.8,42.8,0,0,1,20.14,4.67,26.07,26.07,0,0,1,27.65-17.54c.16-.28.29-.57.45-.85a86,86,0,0,1,111.44-35.58,70.94,70.94,0,0,1,88.59,21.52,67.79,67.79,0,0,1,46.5,25.07A48.83,48.83,0,0,1,1280,98.48V0Z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Triangle",
                            value: "triangle",
                            preview:
                                `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='xMidYMid slice' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M720 140L640 0l-80 140H0V0h1280v140H720z' /%3E%3C/svg%3E`
                        },
                    ],
                    bottom: [
                        // Arrow options
                        {
                            label: "Arrow",
                            value: "arrow",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M640 139L0 0v140h1280V0L640 139z'/%3E%3C/svg%3E`
                        },
                        {
                            label: "Arrow 2",
                            value: "arrow2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M640 139L0 0v140h1280V0L640 139z' fill-opacity='.5'/%3E%3Cpath d='M640 139L0 42v98h1280V42l-640 97z'/%3E%3C/svg%3E`
                        },
                        {
                            label: "Arrow 3",
                            value: "arrow3",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 140l640-70 640 70V0L640 70 0 0v140z' fill-opacity='.5'/%3E%3Cpath d='M0 140h1280L640 70 0 140z'/%3E%3C/svg%3E`
                        },

                        // Asymmetric options
                        {
                            label: "Asymmetric",
                            value: "asymmetric",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Asymmetric 2",
                            value: "asymmetric2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z' fill-opacity='.5' /%3E%3Cpath d='M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Asymmetric 3",
                            value: "asymmetric3",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0v140h1280V0l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Asymmetric 4",
                            value: "asymmetric4",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1094.44 119L172.7 68.72a74.54 74.54 0 0 1-25.19-5.95L0 0v140h1280V0l-133.85 102c-15.84 12.09-33.7 17.95-51.71 17z' fill-opacity='.5' /%3E%3Cpath d='M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0v140h1280V0l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z' /%3E%3C/svg%3E`
                        },

                        // Curve options
                        {
                            label: "Curve",
                            value: "curve",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 140V0S993.46 140 640 139 0 0 0 0v140z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Curve 2",
                            value: "curve2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M725.29 101.2C325.22 122.48 0 0 0 0v140h1280V0s-154.64 79.92-554.71 101.2z' fill-opacity='.3' /%3E%3Cpath d='M556.45 119.74C953.41 140 1280 14 1280 14v126H0V0s159.5 99.48 556.45 119.74z' fill-opacity='.5' /%3E%3Cpath d='M640 140c353.46 0 640-140 640-139v140H0V0s286.54 140 640 140z' /%3E%3C/svg%3E`
                        },

                        // Graph options
                        {
                            label:"Graph",
                            value: "graph",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 122.138l60.614 9.965 95.644-4.2 86.363-18.654 78.684 13.079L411.442 99.4l94.453 10.303L582.821 93.8l82.664 18.728 76.961-11.39L816.11 71.4l97.601 9.849L997.383 50.4l66.285 14.694 70.793-24.494h79.863L1280 0v140H0z' /%3E%3C/svg%3E`
                        },
                        {
                            label:"Graph 2",
                            value: "graph2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 127.899l60.613 4.878 95.645-6.211 86.363-16.074 78.684 9.883 90.136-21.594 94.454 7.574 77.925-17.66 91.664 20.798 76.961-12.649 63.664-21.422 97.602 7.07 83.672-29.617 66.285 11.678 70.793-23.334 74.863-4.641L1280 0v140H0z' fill-opacity='.5' /%3E%3Cpath d='M0 126.71l60.613 7.415L156.257 131l86.364-13.879 78.683 9.731 90.137-17.059 94.453 7.666 76.926-11.833 82.664 13.935 76.961-8.475 73.664-22.126 97.601 7.328 83.672-22.952 66.285 10.933 70.794-18.224h79.862L1280 35.838V140H0z' /%3E%3C/svg%3E`
                        },
                        {
                            label:"Graph 3",
                            value: "graph3",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l64.8 38.69 91.2-3.18 95.45 34.84 120.04.24 71.5 33.35 90.08-3.91 106.91 37.62 102.38-37.17 85.55 10.65 88.11-7.19 75.95-38.66 73.21 5.31 66.78-22.1 77-.42 71-48.07v140H0V0z' /%3E%3C/svg%3E`
                        },
                        {
                            label:"Graph 4",
                            value: "graph4",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l64.8 30.95 91.2-2.54 95.46 27.87 120.04.2L443 83.15l90.09-3.12L640 110.12l102.39-29.73 85.55 8.51 88.11-5.75L992 52.22l73.21 4.26L1132 38.79l77-.33L1280 0v140H0V0z' fill-opacity='.5' /%3E%3Cpath d='M0 0l64.8 38.69 91.2-3.18 95.46 34.84 120.04.24 71.5 33.35 90.09-3.91L640 137.65l102.39-37.17 85.55 10.65 88.11-7.19L992 65.28l73.21 5.31 66.79-22.1 77-.41L1280 0v140H0V0z' /%3E%3C/svg%3E`
                        },

                        // Mountains options
                        {
                            label:"Mountains",
                            value: "mountains",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 70.35l320-49.24 640 98.49 320-49.25V140H0V70.35z' /%3E%3C/svg%3E`
                        },
                        {
                            label:"Mountains 2",
                            value: "mountains2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 47.44L170 0l626.48 94.89L1110 87.11l170-39.67V140H0V47.44z' fill-opacity='.5' /%3E%3Cpath d='M0 90.72l140-28.28 315.52 24.14L796.48 65.8 1140 104.89l140-14.17V140H0V90.72z' /%3E%3C/svg%3E`
                        },

                        // Ramp options
                        {
                            label:"Ramp",
                            value: "ramp",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 140h1280C573.08 140 0 0 0 0z' /%3E%3C/svg%3E`
                        },
                        {
                            label:"Ramp 2",
                            value: "ramp2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 140h1280C573.08 140 0 0 0 0z' fill-opacity='.3' /%3E%3Cpath d='M0 140h1280C573.08 140 0 30 0 30z' fill-opacity='.5' /%3E%3Cpath d='M0 140h1280C573.08 140 0 60 0 60z' /%3E%3C/svg%3E`
                        },

                        // Slant options
                        {
                            label:"Slant",
                            value: "slant",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v140h1280L0 0z' /%3E%3C/svg%3E`
                        },
                        {
                            label:"Slant 2",
                            value: "slant2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v140h1280L0 0z' fill-opacity='.5' /%3E%3Cpath d='M0 42v98h1280L0 42z' /%3E%3C/svg%3E`
                        },

                        // Wave options
                        {
                            label:"Wave",
                            value: "wave",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M320 28c320 0 320 84 640 84 160 0 240-21 320-42v70H0V70c80-21 160-42 320-42z' /%3E%3C/svg%3E`
                        },
                        {
                            label:"Wave 2",
                            value: "wave2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 3.4C1050.59 18 1019.4 84.89 734.42 84.89c-320 0-320-84.3-640-84.3C59.4.59 28.2 1.6 0 3.4V140h1280z' fill-opacity='.3' /%3E%3Cpath d='M0 24.31c43.46-5.69 94.56-9.25 158.42-9.25 320 0 320 89.24 640 89.24 256.13 0 307.28-57.16 481.58-80V140H0z' fill-opacity='.5' /%3E%3Cpath d='M1280 51.76c-201 12.49-242.43 53.4-513.58 53.4-320 0-320-57-640-57-48.85.01-90.21 1.35-126.42 3.6V140h1280z' /%3E%3C/svg%3E`
                        },

                        // Waves options
                        {
                            label:"Waves",
                            value: "waves",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280 86c-19.9-17.21-40.08-39.69-79.89-39.69-57.49 0-56.93 46.59-115 46.59-53.61 0-59.76-39.62-115.6-39.62C923.7 53.27 924.26 87 853.89 87c-89.35 0-78.74-87-188.2-87C554 0 543.95 121.8 423.32 121.8c-100.52 0-117.84-54.88-191.56-54.88-77.06 0-100 48.57-151.75 48.57-40 0-60-12.21-80-29.51v54H1280z' /%3E%3C/svg%3E`
                        },
                        {
                            label:"Waves 2",
                            value: "waves2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='none' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M853.893,86.998c-38.859,0-58.811-16.455-77.956-35.051c18.295-10.536,40.891-18.276,73.378-18.276 c38.685,0,64.132,12.564,85.489,28.347C916.192,72.012,900.8,86.998,853.893,86.998z M526.265,80.945 c-6.517-0.562-13.599-0.879-21.41-0.879c-70.799,0-91.337,27.229-134.433,35.662c14.901,3.72,32.118,6.07,52.898,6.07 C470.171,121.797,500.34,103.421,526.265,80.945z' fill-opacity='.3' /%3E%3Cpath d='M663.458,109.671c-67.137,0-80.345-23.824-137.193-28.726C567.086,45.555,597.381,0,665.691,0 c61.857,0,85.369,27.782,110.246,51.947C736.888,74.434,717.459,109.671,663.458,109.671z M217.68,94.163 c55.971,0,62.526,24.026,126.337,24.026c9.858,0,18.508-0.916,26.404-2.461c-57.186-14.278-80.177-48.808-138.659-48.808 c-77.063,0-99.96,48.569-151.751,48.569c-40.006,0-60.008-12.206-80.011-29.506v16.806c20.003,10.891,40.005,21.782,80.011,21.782 C160.014,124.57,158.608,94.163,217.68,94.163z M1200.112,46.292c-57.493,0-56.935,46.595-115.015,46.595 c-53.612,0-59.755-39.618-115.602-39.618c-15.267,0-25.381,3.751-34.69,8.749c36.096,26.675,60.503,62.552,117.342,62.552 c69.249,0,75.951-43.559,147.964-43.559c39.804,0,59.986,10.943,79.888,21.777V85.982 C1260.097,68.771,1239.916,46.292,1200.112,46.292z' fill-opacity='.5' /%3E%3Cpath d='M1052.147,124.57c-56.84,0-81.247-35.876-117.342-62.552c-18.613,9.994-34.005,24.98-80.912,24.98 c-38.859,0-58.811-16.455-77.956-35.051c-39.05,22.487-58.479,57.724-112.48,57.724c-67.137,0-80.345-23.824-137.193-28.726 c-25.925,22.475-56.093,40.852-102.946,40.852c-20.779,0-37.996-2.349-52.898-6.07c-7.895,1.545-16.546,2.461-26.404,2.461 c-63.811,0-70.366-24.026-126.337-24.026c-59.072,0-57.665,30.407-137.669,30.407c-40.006,0-60.008-10.891-80.011-21.782V140h1280 v-37.212c-19.903-10.835-40.084-21.777-79.888-21.777C1128.098,81.011,1121.397,124.57,1052.147,124.57z' /%3E%3C/svg%3E`
                        },

                        // Clouds options
                        {
                            label: "Clouds",
                            value: "clouds",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='xMidYMid slice' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1280,63.1a81.42,81.42,0,0,0-11.41.81,67.71,67.71,0,0,0-102.21-19,86,86,0,0,0-150.47-1.2c-.16.28-.29.57-.45.85a26.07,26.07,0,0,0-27.65,17.54,43,43,0,0,0-37.93-.57A67.66,67.66,0,0,0,830.15,81a67.85,67.85,0,0,0-38.51-16.19,46.9,46.9,0,0,0-89.25.45,46.66,46.66,0,0,0-13.56-3.77A86,86,0,0,0,538.67,33.07a23.42,23.42,0,0,0-25.4,4.8A61.36,61.36,0,0,0,410.7,58.74a61.44,61.44,0,0,0-72.79,23.32A38.37,38.37,0,0,0,329,75.15c-.41-.23-.83-.45-1.25-.66a46.88,46.88,0,0,0-78.77-33.31A67.65,67.65,0,0,0,120.71,67.29a46.76,46.76,0,0,0-21.82-1.62,46.91,46.91,0,0,0-78.8.07A79.35,79.35,0,0,0,0,63.17C0,63.17,0,140,0,140H1280Z' /%3E%3C/svg%3E`
                        },
                        {
                            label: "Clouds 2",
                            value: "clouds2",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='xMidYMid slice' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1269.61,52.83a48.82,48.82,0,0,0-16,14.48A48.6,48.6,0,0,0,1229.45,69a70.88,70.88,0,0,0-134.21-25.66,49.11,49.11,0,0,0-82.51,34.9c-.44.23-.88.45-1.31.69a40.18,40.18,0,0,0-9.36,7.24,64.35,64.35,0,0,0-76.25-24.43A64.34,64.34,0,0,0,818.36,39.85a24.53,24.53,0,0,0-26.61-5A90,90,0,0,0,634.48,64.55a48.89,48.89,0,0,0-14.21,3.95A49.12,49.12,0,0,0,526.79,68a71.07,71.07,0,0,0-40.34,17A70.91,70.91,0,0,0,361,64.68a45.07,45.07,0,0,0-39.73.6,27.31,27.31,0,0,0-29-18.37c-.16-.29-.31-.59-.47-.89a90.06,90.06,0,0,0-155.12-3A80.23,80.23,0,0,0,12.64,99.75a80.1,80.1,0,0,0-12.64,2V140H1280V48.48A49.22,49.22,0,0,0,1269.61,52.83Z' fill-opacity='.5'/%3E%3Cpath d='M1280,66.1a81.63,81.63,0,0,0-11.42.81,67.71,67.71,0,0,0-102.21-19,86,86,0,0,0-150.47-1.2c-.16.28-.29.57-.45.85a26.07,26.07,0,0,0-27.65,17.54,43,43,0,0,0-37.93-.57A67.66,67.66,0,0,0,830.13,84a67.85,67.85,0,0,0-38.51-16.19,46.9,46.9,0,0,0-89.25.45,46.66,46.66,0,0,0-13.56-3.77A86,86,0,0,0,538.66,36.07a23.42,23.42,0,0,0-25.4,4.8A61.36,61.36,0,0,0,410.68,61.74a61.44,61.44,0,0,0-72.79,23.32A38.37,38.37,0,0,0,329,78.15c-.41-.23-.83-.45-1.25-.66a46.88,46.88,0,0,0-78.77-33.31A67.65,67.65,0,0,0,120.69,70.29a46.76,46.76,0,0,0-21.82-1.62,46.91,46.91,0,0,0-78.8.07A79.46,79.46,0,0,0,0,66.17C-.07,66.17,0,140,0,140H1280Z'/%3E%3C/svg%3E`
                        },

                        // Triangle option
                        {
                            label: "Triangle",
                            value: "triangle",
                            preview: `data:image/svg+xml;utf8,%3Csvg fill='%23${this.fillColor}' preserveAspectRatio='xMidYMid slice' viewBox='0 0 1280 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='640 0 560 140 720 140 640 0' /%3E%3C/svg%3E`
                        },
                    ],
                }
            },
            fillColor() {
                return this.color ? this.color.replace(/^#/, '') : '3e83f8FF';
            },
            options() {
                return this.dividerOptions[this.type];
            },
            selectedOption() {
                return this.options.find((option) => option.value === this.localModelValue);
            },
        },
        watch: {
            modelValue(newValue) {
                this.localModelValue = newValue;
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
            // Initialize Flowbite
            initFlowbite();

            const $targetEl = document.getElementById(this.dropdownUniqueId);
            const $triggerEl = document.getElementById(this.triggerUniqueId);

            const $options = {
                triggerType: "click",
                placement: "bottom"
            };

            if ($targetEl) {
                this.dropdown = new Dropdown($targetEl, $triggerEl, $options);
            }
        },
    };
</script>
