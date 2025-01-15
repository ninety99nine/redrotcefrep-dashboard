<template>

    <div class="bg-white mb-4 p-8 rounded-lg space-y-4">

        <h1 class="flex items-center font-lg font-bold">
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.121 7.629A3 3 0 0 0 9.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 0 1-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 0 1 1.422 0l.655.218a2.25 2.25 0 0 0 1.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Tax</span>
        </h1>

        <p class="text-sm text-gray-500">Set your store's tax rate and method (Inclusive/Exclusive) to ensure accurate pricing and compliance with local tax regulations.</p>

        <div class="grid grid-cols-2 gap-4">

            <div class="col-span-1">

                <!-- Tax Method Select -->
                <TaxMethodSelectInput></TaxMethodSelectInput>

            </div>

            <div class="col-span-1">

                <!-- Tax ID Input -->
                <TaxIdTextInput></TaxIdTextInput>

            </div>

            <div class="col-span-2">

                <!-- Tax Rate Input -->
                <TaxPercentageRateTextInput></TaxPercentageRateTextInput>

            </div>

        </div>

    </div>

</template>

<script>

    import TaxIdTextInput from '@Pages/stores/store/settings/general/components/TaxIdTextInput.vue';
    import TaxMethodSelectInput from '@Pages/stores/store/settings/general/components/TaxMethodSelectInput.vue';
    import TaxPercentageRateTextInput from '@Pages/stores/store/settings/general/components/TaxPercentageRateTextInput.vue';

    export default {
        components: {
            TaxIdTextInput, TaxMethodSelectInput, TaxPercentageRateTextInput
        },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
