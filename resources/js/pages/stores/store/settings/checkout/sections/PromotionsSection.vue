<template>

    <div class="bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4">

        <h1 class="flex items-center font-lg font-bold">
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

            <span>Promotions</span>
        </h1>

        <p class="text-sm text-gray-500">This section allows customers to claim promotional offers</p>

        <PromotionsSectionHeadingTextInput></PromotionsSectionHeadingTextInput>

        <div class="bg-gray-50 p-4 rounded-lg space-y-4">
            <ShowPromotionsToggleSwitch></ShowPromotionsToggleSwitch>
        </div>

    </div>

</template>

<script>

    import ShowPromotionsToggleSwitch from '@Pages/stores/store/settings/checkout/components/ShowPromotionsToggleSwitch.vue';
    import PromotionsSectionHeadingTextInput from '@Pages/stores/store/settings/checkout/components/PromotionsSectionHeadingTextInput.vue';

    export default {
        inject: ['storeState'],
        components: {
            ShowPromotionsToggleSwitch, PromotionsSectionHeadingTextInput
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
