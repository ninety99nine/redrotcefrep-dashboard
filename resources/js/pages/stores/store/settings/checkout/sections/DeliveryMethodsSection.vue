<template>

    <div class="bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4">

        <h1 class="flex items-center font-lg font-bold">
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>

            <span>Delivery Methods</span>
        </h1>

        <p class="text-sm text-gray-500">This section allows customers to select their preffered delivery method</p>

        <ItemsSectionHeadingTextInput></ItemsSectionHeadingTextInput>

        <div class="bg-gray-50 p-4 rounded-lg space-y-4">
            <ShowDeliveryMethodsToggleSwitch></ShowDeliveryMethodsToggleSwitch>

            <template v-if="storeForm.online">
                <DeliveryScheduleHeadingTextInput></DeliveryScheduleHeadingTextInput>
                <DeliveryAddressHeadingTextInput></DeliveryAddressHeadingTextInput>
            </template>
        </div>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import ItemsSectionHeadingTextInput from '@Pages/stores/store/settings/checkout/components/ItemsSectionHeadingTextInput.vue';
    import ShowDeliveryMethodsToggleSwitch from '@Pages/stores/store/settings/checkout/components/ShowDeliveryMethodsToggleSwitch.vue';
    import DeliveryAddressHeadingTextInput from '@Pages/stores/store/settings/checkout/components/DeliveryAddressHeadingTextInput.vue';
    import DeliveryScheduleHeadingTextInput from '@Pages/stores/store/settings/checkout/components/DeliveryScheduleHeadingTextInput.vue';

    export default {
        components: {
            ItemsSectionHeadingTextInput, ShowDeliveryMethodsToggleSwitch, DeliveryAddressHeadingTextInput, DeliveryScheduleHeadingTextInput
        },
        data() {
            return {
                storeState: useStoreState(),
            }
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
