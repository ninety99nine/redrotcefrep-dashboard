<template>

    <div>

        <!-- Address Input -->
        <AddressInput
            title="Destination"
            :pinLocationOnMap="true"
            @onDeleted="unsetAddress"
            @onValidated="setAddress"
            subtitle="Add the address to deliver your order">
        </AddressInput>

    </div>

</template>

<script>

    import GoogleMaps from '@Partials/maps/GoogleMaps.vue';
    import AddressInput from '@Partials/inputs/AddressInput.vue';

    export default {
        inject: ['shoppingCartState'],
        components: {
            GoogleMaps, AddressInput
        },
        computed: {
            deliveryMethod() {
                return this.shoppingCartState.deliveryMethod;
            },
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            },
            deliveryMethodRequiresSchedule() {
                return this.deliveryMethod && this.deliveryMethod.setSchedule;
            },
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            },
        },
        methods: {
            setAddress(address) {
                this.shoppingCartState.setDeliveryAddress(address);
                this.inspectStoreShoppingCartWithDelay();
            },
            unsetAddress() {
                this.shoppingCartState.setDeliveryAddress(null);
                this.inspectStoreShoppingCartWithDelay();
            },
            inspectStoreShoppingCartWithDelay() {
                return this.shoppingCartState.inspectStoreShoppingCartWithDelay();
            }
        }
    };

</script>
