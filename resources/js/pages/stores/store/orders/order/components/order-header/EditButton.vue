<template>

    <Button type="light" size="xs" :skeleton="isLoadingStore || isLoadingOrder" :action="navigateToEditOrder">
        <span>Edit</span>
    </Button>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        inject: ['storeState', 'orderState'],
        components: { Button },
        computed: {
            order() {
                return this.orderState.order;
            },
            store() {
                return this.storeState.store;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            }
        },
        methods: {
            navigateToEditOrder() {
                this.$router.push({
                    name: 'edit-store-order',
                    params: {
                        'store_href': this.store._links.showStore,
                        'order_href': this.order._links.showOrder
                    }
                });
            }
        }
    };

</script>
