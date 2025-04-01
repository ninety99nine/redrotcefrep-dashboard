<template>

    <div class="space-y-4 p-4">

        <CustomInputAddress
            :onlyValidate="true"
            heading="Destination"
            :pinLocationOnMap="true"
            @onDeleted="unsetAddress"
            @onValidated="setAddress"
            :address="orderForm.deliveryAddress"
            subtitle="Add the address to deliver this order">
        </CustomInputAddress>

    </div>

</template>

<script>

    import CustomInputAddress from '@Partials/inputs/CustomInputAddress.vue';

    export default {
        inject: ['orderState'],
        components: {
            CustomInputAddress
        },
        computed: {
            orderForm() {
                return this.orderState.orderForm;
            }
        },
        methods: {
            setAddress(deliveryAddress) {
                this.orderState.orderForm.deliveryAddress = deliveryAddress;
                this.orderState.saveStateDebounced('Delivery address changed');
            },
            unsetAddress() {
                this.orderState.orderForm.deliveryAddress = null;
                this.orderState.saveStateDebounced('Delivery address removed');
            }
        }
    };

</script>
