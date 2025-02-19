<template>

    <div class="grid grid-cols-2">

        <ShowCustomerLastNameToggleSwitch></ShowCustomerLastNameToggleSwitch>
        <CustomerLastNameOptionalCheckbox v-if="storeForm.online"></CustomerLastNameOptionalCheckbox>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import CustomerLastNameOptionalCheckbox from '@Pages/stores/store/settings/checkout/components/CustomerLastNameOptionalCheckbox.vue';
    import ShowCustomerLastNameToggleSwitch from '@Pages/stores/store/settings/checkout/components/ShowCustomerLastNameToggleSwitch.vue';

    export default {
        components: { CustomerLastNameOptionalCheckbox, ShowCustomerLastNameToggleSwitch },
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
