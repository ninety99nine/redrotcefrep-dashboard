<template>

    <div>

        <!-- Input Label -->
        <InputLabel :_for="uniqueId" :showAsterisk="showAsterisk" :secondaryLabel="secondaryLabel" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            Current Password
        </InputLabel>

        <InputLabelDescription
            v-if="description"
            :description="description"
            :learnMoreLabel="learnMoreLabel"
            :learnMoreLink="learnMoreLink">
        </InputLabelDescription>
        <div class="mt-2 relative">

            <!-- Input Field -->
            <input v-model="localModelValue" :id="uniqueId" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3">

            <!-- Show/Hide Password Toggle Icon -->
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">

                <button @click="showPassword = !showPassword" type="button" class="text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700">

                    <!-- Open Eye Icon -->
                    <svg class="h-5 w-5" fill="none" :class="{ 'hidden': !showPassword, 'block': showPassword }" :xmlns="showPassword ? 'http://www.w3.org/2000/svg' : ''" viewBox="0 0 20 20" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12a2 2 0 100-4 2 2 0 000 4z" ></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 10a8.001 8.001 0 11-16 0 8.001 8.001 0 0116 0z" ></path>
                    </svg>

                    <!-- Closed Eye Icon -->
                    <svg class="h-5 w-5" fill="none" :class="{ 'block': !showPassword, 'hidden': showPassword }" :xmlns="!showPassword ? 'http://www.w3.org/2000/svg' : ''" viewBox="0 0 24 24" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" ></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12a7.5 7.5 0 1114.999-1.5L19.5 12H5z" ></path>
                    </svg>

                </button>

            </div>

        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText"></InputErrorMessage>

    </div>

</template>

<script>

    import { generateUniqueId } from '@Utils/generalUtils.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputLabelDescription from '@Partials/input-labels/InputLabelDescription.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        props: {
            modelValue: {
                type: String
            },
            showAsterisk: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            learnMoreLabel: {
                type: [String, null]
            },
            learnMoreLink: {
                type: [String, null]
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
        components: { InputLabel, InputLabelDescription, InputErrorMessage },
        data() {
            return {
                showPassword: false,
                localModelValue: this.modelValue,
                uniqueId: generateUniqueId('current_password')
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
        },
    };

  </script>
