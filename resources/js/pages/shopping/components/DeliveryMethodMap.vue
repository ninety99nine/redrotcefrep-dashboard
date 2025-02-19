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
    import { useShoppingCartState } from '@Stores/shopping-cart-store.js';

    export default {
        components: {
            GoogleMaps, AddressInput
        },
        data() {
            return {
                shoppingCartState: useShoppingCartState()
            }
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
                console.log('address');
                console.log(address);
                this.shoppingCartState.setAddress(address);
                this.inspectStoreShoppingCartWithDelay();
            },
            unsetAddress() {
                this.shoppingCartState.setAddress(null);
                this.inspectStoreShoppingCartWithDelay();
            },
            inspectStoreShoppingCartWithDelay() {
                return this.shoppingCartState.inspectStoreShoppingCartWithDelay();
            }
        }
    };

</script>
