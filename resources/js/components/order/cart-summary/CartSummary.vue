<template>

    <div class="space-y-3 bg-white shadow-lg rounded-lg border p-4 mb-4">

        <p class="font-bold text-lg">Items</p>

        <!-- Item List -->
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="font-bold text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <td class="whitespace-nowrap px-4 py-3">Image</td>
                    <td class="w-80 whitespace-nowrap px-4 py-3">Name</td>
                    <td class="whitespace-nowrap px-4 py-3">Price</td>
                    <td class="whitespace-nowrap px-4 py-3 text-right">Quantity</td>
                    <td class="whitespace-nowrap px-4 py-3 text-right">Total</td>
                </tr>
            </thead>
            <tbody>

                <!-- Loading Skeleton Rows-->
                <template v-if="isLoadingOrder">
                    <tr v-for="(row, rowIndex) in 3" :key="rowIndex" class="border-b">
                        <td v-for="(cell, cellIndex) in 5" :key="cellIndex" class="whitespace-nowrap px-4 py-3">
                            <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                        </td>
                    </tr>
                </template>

                <template v-else>
                    <tr
                        v-for="(orderProduct, index) in order._relationships.cart._relationships.orderProducts" :key="index"
                        @click="() => onViewProduct(orderProduct)"
                        :class="['border-b cursor-pointer', canViewProduct(orderProduct) ? 'hover:bg-gray-50' : 'hover:bg-red-50']">

                        <!-- Image -->
                        <td class="whitespace-nowrap px-4 py-3">
                            <NoDataPlaceholder></NoDataPlaceholder>
                        </td>

                        <!-- Name -->
                        <td class="w-80 whitespace-nowrap px-4 py-3">
                            <span>{{ orderProduct.name }}</span>
                        </td>

                        <!-- Unit Price -->
                        <td class="whitespace-nowrap px-4 py-3">
                            <span>{{ orderProduct.unitPrice.amountWithCurrency }}</span>
                        </td>

                        <!-- Quantity -->
                        <td class="whitespace-nowrap px-4 py-3 text-right">
                            <span>{{ orderProduct.quantity }}</span>
                        </td>

                        <!-- Grand Total -->
                        <td class="whitespace-nowrap px-4 py-3 text-right">
                            <span>{{ orderProduct.grandTotal.amountWithCurrency}}</span>
                        </td>

                    </tr>
                </template>

                <!-- Subtotal -->
                <tr class="text-xs text-right">
                    <td colspan="4" class="whitespace-nowrap px-4 py-2">Subtotal</td>
                    <td colspan="1" class="whitespace-nowrap px-4 py-2">
                        <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                        <span v-else>{{ order._relationships.cart.subTotal.amountWithCurrency }}</span>
                    </td>
                </tr>

                <!-- Sale Discount Total -->
                <tr class="text-xs text-right">
                    <td colspan="4" class="whitespace-nowrap px-4 py-2">Sale Discount Total</td>
                    <td colspan="1" class="whitespace-nowrap px-4 py-2">
                        <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                        <span v-else>
                            {{ order._relationships.cart.saleDiscountTotal.amount > 0 ? '-' : '' }}
                            {{ order._relationships.cart.saleDiscountTotal.amountWithCurrency }}
                        </span>
                    </td>
                </tr>

                <!-- Coupon Discount Total -->
                <tr class="text-xs text-right">
                    <td colspan="4" class="whitespace-nowrap px-4 py-2">Coupon Discount Total</td>
                    <td colspan="1" class="whitespace-nowrap px-4 py-2">
                        <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                        <span v-else>
                            {{ order._relationships.cart.couponDiscountTotal.amount > 0 ? '-' : '' }}
                            {{ order._relationships.cart.couponDiscountTotal.amountWithCurrency }}
                        </span>
                    </td>
                </tr>

                <!-- Grand Total -->
                <tr class="text-right text-black text-lg font-bold border-t">
                    <td colspan="4" class="whitespace-nowrap px-4 py-3">Grand Total</td>
                    <td colspan="1" class="whitespace-nowrap px-4 py-3">
                        <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                        <span v-else>{{ order._relationships.cart.grandTotal.amountWithCurrency }}</span>
                    </td>
                </tr>

            </tbody>
        </table>

        <Alert v-if="order && order.specialNote">
            <span>
                <svg class="w-6 h-6 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>

                <span class="font-bold mr-1">Special Note:</span>
            </span>
            <span>{{ order.specialNote }}</span>
        </Alert>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { Pill, Alert, LineSkeleton, MoreInfoPopover, NoDataPlaceholder },
        props: {
            order: {
                type: Object
            },
            isLoadingOrder: {
                type: Boolean
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            }
        },
        methods: {
            canViewProduct(orderProduct) {
                if(orderProduct._links.showProduct) {
                    return orderProduct._links.showProduct;
                }else{
                    return false;
                }
            },
            onViewProduct(orderProduct) {
                if(this.canViewProduct(orderProduct)) {
                    this.$router.push({ name: 'show-store-product', params: { 'store_href': this.store._links.showStore, 'product_href': orderProduct._links.showProduct } });
                }else{
                    this.notificationState.showWarningNotification('This product does not exist anymore. It might be deleted');
                }
            },
        }
    };

</script>
