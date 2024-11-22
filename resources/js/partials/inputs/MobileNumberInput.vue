<template>
    <div>
        <!-- Input Label -->
        <InputLabel :_for="uniqueId" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription">
            Mobile Number
        </InputLabel>

        <div class="mt-2 relative">

            <!-- Input Field -->
            <input ref="phoneInput" :id="uniqueId" :name="uniqueId" type="tel" autocomplete="tel" required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3"
            />

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>
        </div>
    </div>
</template>

<script>
    import settings from '@Js/settings.js';
    import intlTelInput from 'intl-tel-input';
    import 'intl-tel-input/build/css/intlTelInput.css';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        props: {
            modelValue: {
                type: String,
                default: ''
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
        components: { InputLabel, InputErrorMessage },
        data() {
            return {
                iti: null, // Instance of intlTelInput
                ipInfoToken: settings.ipInfoToken,
                uniqueId: `mobile_number_${Math.random().toString(36).substr(2, 9)}` // Unique ID for the input
            };
        },
        watch: {
            // Watch for changes in the parent modelValue
            modelValue(newValue) {
                if (this.iti && newValue !== this.iti.getNumber()) {
                    this.iti.setNumber(newValue); // Update intl-tel-input value if modelValue changes
                }
            }
        },
        methods: {
            /**
             * Initialize intl-tel-input on the input field
             */
            initIntlTelInput() {

                this.iti = intlTelInput(this.$refs.phoneInput, {
                    initialCountry: 'auto', // Automatically detect the user's country
                    separateDialCode: true,
                    geoIpLookup: this.geoIpLookup,
                    loadUtilsOnInit: () => import("intl-tel-input/utils")
                });

                // Set the initial value if modelValue is provided
                if (this.modelValue) {
                    this.iti.setNumber(this.modelValue);
                }

                // Listen for changes in the selected country or input value
                this.$refs.phoneInput.addEventListener('countrychange', this.updateModelValue);
                this.$refs.phoneInput.addEventListener('input', this.updateModelValue);
            },
            /**
             * GeoIP lookup for auto-detecting country
             */
            geoIpLookup(callback) {
                const cachedCountry = sessionStorage.getItem('geoip_country');
                if (cachedCountry) {
                    callback(cachedCountry); // Use the cached country
                    return;
                }

                fetch('https://ipinfo.io?token=' + this.ipInfoToken)
                    .then(response => response.json())
                    .then((data) => {
                        const country = data.country || 'US';
                        sessionStorage.setItem('geoip_country', country); // Cache the result
                        callback(country);
                    })
                    .catch(() => callback('US')); // Fallback to 'US' if there's an error
            },
            /**
             * Emit updated value to the parent when the phone input changes
             */
            updateModelValue() {
                if (this.iti && this.iti.isValidNumber()) {

                    const fullNumber = this.iti.getNumber(); // International format
                    let nationalNumber = this.iti.getNumber(intlTelInput.utils.numberFormat.NATIONAL); // National format

                    // Remove spaces from the national number
                    nationalNumber = nationalNumber.replace(/\s+/g, '');

                    // Update the v-model with the international number (default behavior)
                    this.$emit('update:modelValue', fullNumber);

                }
            }
        },
        mounted() {
            this.initIntlTelInput();
        },
        beforeUnmount() {
            if (this.iti) {
                this.iti.destroy(); // Clean up intl-tel-input instance
            }
        },
    };
</script>
