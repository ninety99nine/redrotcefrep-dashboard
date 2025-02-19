<template>

    <div class="grid grid-cols-2">

        <ShowCustomerFirstNameToggleSwitch></ShowCustomerFirstNameToggleSwitch>
        <CustomerFirstNameOptionalCheckbox v-if="storeForm.online"></CustomerFirstNameOptionalCheckbox>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import CustomerFirstNameOptionalCheckbox from '@Pages/stores/store/settings/checkout/components/CustomerFirstNameOptionalCheckbox.vue';
    import ShowCustomerFirstNameToggleSwitch from '@Pages/stores/store/settings/checkout/components/ShowCustomerFirstNameToggleSwitch.vue';

    export default {
        components: { CustomerFirstNameOptionalCheckbox, ShowCustomerFirstNameToggleSwitch },
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
