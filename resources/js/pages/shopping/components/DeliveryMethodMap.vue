<template>

    <div>

        <!-- Address Input -->
        <AddressInput
            title="Destination"
            @onCreated="setAddress"
            @onUpdated="setAddress"
            :requireLocationOnMap="true"
            @onDeleted="onDeletedAddress"
            @onValidated="setValidatedAddressForm"
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
                latitude: 40.689247,
                longitude: -74.044502,
                shoppingCartState: useShoppingCartState()
            }
        },
        computed: {
            markers() {
                return [
                    {
                        options: {
                            position: {
                                lat: this.latitude,
                                lng: this.longitude
                            },
                            title: 'LADY LIBERTY',
                            gmpDraggable: true
                        },
                        pinOptions: {
                            background: '#1f87e8',
                            borderColor: '#FBBC04',
                            glyphColor: '#FBBC04'
                        }
                    }
                ];
            },
            deliveryMethod() {
                return this.shoppingCartState.deliveryMethod;
            },
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            },
            deliveryMethodRequiresSchedule() {
                return this.deliveryMethod && this.deliveryMethod.setSchedule;
            },
        },
        methods: {
            setAddress(address) {
                //useDeliveryMethodState().deliveryMethod._relationships.address = address;
            },
            setValidatedAddressForm(addressForm) {
                //this.form.address = addressForm;
            },
            onDeletedAddress() {
                /*
                if(this.hasAddress) {
                    useDeliveryMethodState().deliveryMethod._relationships.address = null;
                }else{
                    delete this.form.address;
                }
                */
            },
        }
    };

</script>
