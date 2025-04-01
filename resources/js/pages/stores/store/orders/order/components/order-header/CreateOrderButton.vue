<template>

    <Button type="primary" size="sm" :skeleton="isLoadingStore || isLoadingOrder" :action="saveChanges">
        <span>Create Order</span>
    </Button>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        inject: ['storeState', 'orderState'],
        components: { Button },
        computed: {
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            }
        },
        methods: {
            saveChanges() {

            }
        }
    };

</script>
