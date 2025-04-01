<template>

    <div class="flex flex-col items-center pt-8 pb-40 bg-gradient-to-b from-blue-100 to-white-100 min-h-screen overflow-x-hidden">

        <div class="w-full max-w-lg">

            <!-- Order Content -->
            <router-view></router-view>

        </div>

    </div>

</template>

<script>

    export default {
        inject: ['orderState'],
        methods: {
            async showOrder() {
                this.orderState.showOrder(
                    this.$route.params.order_href,
                    {
                        '_relationships': 'courier,deliveryAddress,orderFees,orderComments,orderProducts,orderDiscounts,orderPromotions,orderHistory'
                    }
                );
            }
        },
        created() {
            this.showOrder();
        }
    };

</script>
