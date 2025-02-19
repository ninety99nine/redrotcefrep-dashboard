<template>

    <div class="grid grid-cols-2">

        <ShowCustomerEmailToggleSwitch></ShowCustomerEmailToggleSwitch>
        <CustomerEmailOptionalCheckbox v-if="storeForm.online"></CustomerEmailOptionalCheckbox>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import CustomerEmailOptionalCheckbox from '@Pages/stores/store/settings/checkout/components/CustomerEmailOptionalCheckbox.vue';
    import ShowCustomerEmailToggleSwitch from '@Pages/stores/store/settings/checkout/components/ShowCustomerEmailToggleSwitch.vue';

    export default {
        components: { CustomerEmailOptionalCheckbox, ShowCustomerEmailToggleSwitch },
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
