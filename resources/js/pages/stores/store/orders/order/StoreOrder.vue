<template>

    <div class="pt-24 px-4">

        <!-- Order Header -->
        <OrderHeader></OrderHeader>

        <!-- Order Content -->
        <router-view></router-view>

    </div>

</template>

<script>

    import OrderHeader from '@Pages/stores/store/orders/order/components/order-header/OrderHeader.vue';

    export default {
        inject: ['orderState', 'storeState'],
        components: { OrderHeader },
        watch: {
            store(newValue) {
                this.orderState.setEmptyOrderForm();
                if(newValue && this.hasOrderHref) {
                    if(this.hasOrderHref) this.orderState.setIsLoadingOrder(true);
                    this.showOrder();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            hasOrderHref() {
                return this.$route.params.order_href != null;
            }
        },
        methods: {
            async showOrder() {

                const response = await this.orderState.showOrder(
                    this.$route.params.order_href,
                    {
                        '_relationships': 'courier,customer,deliveryAddress,orderFees,orderComments,orderProducts.photo,orderDiscounts,orderPromotions,orderHistory'
                    }
                );

                if(response == null || response.data.exists == false) {
                    this.$router.push({ name: 'show-store-orders', params: { 'store_href': this.store._links.showStore } });
                }

            }
        }
    };

</script>
