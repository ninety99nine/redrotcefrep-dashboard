<template>

    <div class="bg-white mb-4 p-8 rounded-lg space-y-4">

        <h1 class="flex items-center font-lg font-bold">
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
            </svg>
            <span>Localization</span>
        </h1>

        <p class="text-sm text-gray-500">Set your store's country, currency, language, and preferred distance unit (Km/Mile) to align with your local market and ensure a seamless shopping experience for your customers.</p>

        <!-- Country Select Input -->
        <CountrySelectInput></CountrySelectInput>

        <!-- Currency Select Input -->
        <CurrencySelectInput></CurrencySelectInput>

        <!-- Language Select Input -->
        <LanguageSelectInput></LanguageSelectInput>

        <!-- Distance Unit Select -->
        <DistanceUnitSelectInput></DistanceUnitSelectInput>

    </div>

</template>

<script>

    import CountrySelectInput from '@Pages/stores/store/settings/general/components/CountrySelectInput.vue';
    import CurrencySelectInput from '@Pages/stores/store/settings/general/components/CurrencySelectInput.vue';
    import LanguageSelectInput from '@Pages/stores/store/settings/general/components/LanguageSelectInput.vue';
    import DistanceUnitSelectInput from '@Pages/stores/store/settings/general/components/DistanceUnitSelectInput.vue';

    export default {
        components: {
            CountrySelectInput, CurrencySelectInput, LanguageSelectInput, DistanceUnitSelectInput
        }
    };

</script>
