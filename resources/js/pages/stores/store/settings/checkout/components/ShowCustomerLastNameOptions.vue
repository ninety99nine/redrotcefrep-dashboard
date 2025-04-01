<template>

    <div class="grid grid-cols-2">

        <ShowCustomerLastNameToggleSwitch></ShowCustomerLastNameToggleSwitch>
        <CustomerLastNameOptionalCheckbox v-if="storeForm.online"></CustomerLastNameOptionalCheckbox>

    </div>

</template>

<script>

    import CustomerLastNameOptionalCheckbox from '@Pages/stores/store/settings/checkout/components/CustomerLastNameOptionalCheckbox.vue';
    import ShowCustomerLastNameToggleSwitch from '@Pages/stores/store/settings/checkout/components/ShowCustomerLastNameToggleSwitch.vue';

    export default {
        inject: ['storeState'],
        components: { CustomerLastNameOptionalCheckbox, ShowCustomerLastNameToggleSwitch },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
