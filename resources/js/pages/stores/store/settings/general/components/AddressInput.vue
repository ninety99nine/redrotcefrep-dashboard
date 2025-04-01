<template>

    <AddressInput
        :address="address"
        :storeId="store.id"
        @onCreated="setAddress"
        @onUpdated="setAddress"
        @onDeleted="setAddress">
    </AddressInput>

</template>

<script>

    import AddressInput from '@Partials/inputs/AddressInput.vue';

    export default {
        inject: ['storeState'],
        components: { AddressInput },
        computed: {
            store() {
                return this.storeState.store;
            },
            address() {
                return this.store._relationships.address;
            }
        },
        methods: {
            setAddress(address) {
                this.store._relationships.address = address;
            }
        }
    };

</script>
