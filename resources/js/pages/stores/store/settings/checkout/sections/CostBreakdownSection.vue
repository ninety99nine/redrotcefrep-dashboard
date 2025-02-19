<template>

    <div class="bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4">

        <h1 class="flex items-center font-lg font-bold">
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <span>Cost Breakdown</span>
        </h1>

        <p class="text-sm text-gray-500">This section allows customers to see the cost breakdown</p>

        <CostBreakdownSectionHeadingTextInput></CostBreakdownSectionHeadingTextInput>

        <div class="bg-gray-50 p-4 rounded-lg space-y-4">
            <CombineFeesToggleSwitch></CombineFeesToggleSwitch>
            <CombineDiscountsToggleSwitch></CombineDiscountsToggleSwitch>
        </div>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import CombineFeesToggleSwitch from '@Pages/stores/store/settings/checkout/components/CombineFeesToggleSwitch.vue';
    import CombineDiscountsToggleSwitch from '@Pages/stores/store/settings/checkout/components/CombineDiscountsToggleSwitch.vue';
    import CostBreakdownSectionHeadingTextInput from '@Pages/stores/store/settings/checkout/components/CostBreakdownSectionHeadingTextInput.vue';

    export default {
        components: {
            CombineFeesToggleSwitch, CombineDiscountsToggleSwitch, CostBreakdownSectionHeadingTextInput
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
