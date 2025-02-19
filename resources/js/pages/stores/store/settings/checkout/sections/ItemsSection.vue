<template>

    <div class="bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4">

        <h1 class="flex items-center font-lg font-bold">
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span>Items</span>
        </h1>

        <p class="text-sm text-gray-500">This section shows customers the selected products</p>

        <ItemsSectionHeadingTextInput></ItemsSectionHeadingTextInput>

        <div class="bg-gray-50 p-4 rounded-lg space-y-4">
            <ShowItemsToggleSwitch></ShowItemsToggleSwitch>
        </div>

    </div>

</template>

<script>

    import ShowItemsToggleSwitch from '@Pages/stores/store/settings/checkout/components/ShowItemsToggleSwitch.vue';
    import ItemsSectionHeadingTextInput from '@Pages/stores/store/settings/checkout/components/ItemsSectionHeadingTextInput.vue';

    export default {
        components: {
            ShowItemsToggleSwitch, ItemsSectionHeadingTextInput
        }
    };

</script>
