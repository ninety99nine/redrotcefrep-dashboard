<template>

    <Button type="light" size="xs" icon="short-left-arrow" :action="goBack">
        <span>Back</span>
    </Button>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        inject: ['storeState', 'orderState'],
        components: { Button },
        data() {
            return {
                searchTerm: null,
                filterExpressions: [],
                sortingExpressions: []
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            order() {
                return this.orderState.order;
            },
            isEditing() {
                return this.$route.name === 'edit-store-order';
            },
        },
        methods: {
            goBack() {
                if(this.isEditing) {
                    this.navigateToOrder();
                }else{
                    this.navigateToOrders();
                }
            },
            navigateToOrder() {
                this.$router.push({
                    name: 'show-store-order',
                    params: {
                        'store_href': this.store._links.showStore,
                        'order_href': this.order._links.showOrder
                    }
                });
            },
            navigateToOrders() {
                this.$router.replace({
                    name: 'show-store-orders',
                    params: {
                        'store_href': this.store._links.showStore
                    },
                    query: {
                        searchTerm: this.$route.query.searchTerm,
                        filterExpressions: this.$route.query.filterExpressions,
                        sortingExpressions: this.$route.query.sortingExpressions
                    }
                });
            }
        }
    };

</script>
