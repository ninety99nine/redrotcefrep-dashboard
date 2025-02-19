<template>

    <div class="bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4">

        <h1 class="flex items-center font-lg font-bold">
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

            <span>Customer</span>
        </h1>

        <p class="text-sm text-gray-500">This section allows customers to profile themselves</p>

        <CustomerSectionHeadingTextInput></CustomerSectionHeadingTextInput>

        <div class="bg-gray-50 p-4 rounded-lg space-y-4">
            <ShowCustomerFirstNameOptions></ShowCustomerFirstNameOptions>
            <ShowCustomerLastNameOptions></ShowCustomerLastNameOptions>
            <ShowCustomerEmailOptions></ShowCustomerEmailOptions>
        </div>

    </div>

</template>

<script>

    import ShowCustomerEmailOptions from '@Pages/stores/store/settings/checkout/components/ShowCustomerEmailOptions.vue';
    import ShowCustomerLastNameOptions from '@Pages/stores/store/settings/checkout/components/ShowCustomerLastNameOptions.vue';
    import ShowCustomerFirstNameOptions from '@Pages/stores/store/settings/checkout/components/ShowCustomerFirstNameOptions.vue';
    import CustomerSectionHeadingTextInput from '@Pages/stores/store/settings/checkout/components/CustomerSectionHeadingTextInput.vue';

    export default {
        components: {
            ShowCustomerEmailOptions, ShowCustomerLastNameOptions, ShowCustomerFirstNameOptions, CustomerSectionHeadingTextInput
        }
    };

</script>
