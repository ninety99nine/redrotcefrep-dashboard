<template>

    <div class="bg-blue-50 border border-blue-400 rounded-lg p-4">

        <template v-if="isLoadingOrder || hasDiscountTotal || hasFeeTotal">

            <!-- Subtotal -->
            <div class="flex items-center justify-between text-sm border-b border-dashed pb-2 mb-2">
                <span>Subtotal</span>
                <LineSkeleton v-if="isLoadingOrder" width="w-24" color="bg-blue-200" :shine="true"></LineSkeleton>
                <span v-else>{{ order.subtotal.amountWithCurrency }}</span>
            </div>

        </template>

        <template v-if="isLoadingOrder || hasDiscountTotal">

            <div class="border-b border-dashed pb-2 mb-2">

                <!-- Discounts -->
                <div
                    :key="index"
                    class="flex items-center justify-between text-sm text-gray-500"
                    v-for="(discount, index) in (isLoadingOrder ? [1] : orderDiscounts)">

                    <LineSkeleton v-if="isLoadingOrder" width="w-24" color="bg-blue-200" :shine="true"></LineSkeleton>
                    <span v-else>{{ discount.name }}</span>

                    <LineSkeleton v-if="isLoadingOrder" width="w-20" color="bg-blue-200" :shine="true"></LineSkeleton>
                    <span v-else>{{ discount.amount.amountWithCurrency }}</span>

                </div>

            </div>

        </template>

        <!-- Tax -->
         <div class="border-b border-dashed pb-2 mb-2">

            <div class="flex items-center justify-between text-sm mb-1">

                <LineSkeleton v-if="isLoadingOrder" width="w-16" color="bg-blue-200" :shine="true"></LineSkeleton>
                <div v-else class="w-full">Tax ({{ order.vatRate.valueSymbol }} {{ order.vatMethod }})</div>

                <LineSkeleton v-if="isLoadingOrder" width="w-16" color="bg-blue-200" :shine="true"></LineSkeleton>
                <span v-else>{{ order.vatAmount.amountWithCurrency }}</span>

            </div>

            <LineSkeleton v-if="isLoadingOrder" width="w-1/3" color="bg-blue-200" :shine="true"></LineSkeleton>
            <p v-else class="text-xs text-gray-400">Tax calculated on the discounted subtotal of {{ order.subtotalAfterDiscount.amountWithCurrency }}</p>

        </div>

        <template v-if="isLoadingOrder || hasFeeTotal">

            <div class="border-b border-dashed pb-2 mb-2">

                <!-- Fees -->
                <div
                    :key="index"
                    class="flex items-center justify-between text-sm text-gray-500"
                    v-for="(orderFee, index) in ( isLoadingOrder ? [1] : orderFees)">

                    <LineSkeleton v-if="isLoadingOrder" width="w-20" color="bg-blue-200" :shine="true"></LineSkeleton>
                    <span v-else>{{ orderFee.name }}</span>

                    <LineSkeleton v-if="isLoadingOrder" width="w-16" color="bg-blue-200" :shine="true"></LineSkeleton>
                    <span v-else>{{ orderFee.amount.amountWithCurrency }}</span>

                </div>

            </div>

        </template>

        <!-- Grand Total -->
        <div class="flex items-center justify-between text-base pt-2">

            <div class="w-full font-bold">Grand Total</div>

            <LineSkeleton v-if="isLoadingOrder" width="w-24" color="bg-blue-200" :shine="true"></LineSkeleton>
            <span v-else class="font-bold">{{ order.grandTotal.amountWithCurrency }}</span>

        </div>

    </div>

</template>

<script>

    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        components: { LineSkeleton },
        props: {
            order: {
                type: Object
            },
            isLoadingOrder: {
                type: Boolean
            }
        },
        computed: {
            hasFeeTotal() {
                return this.isLoadingOrder ? false : this.order.feeTotal.amount > 0;
            },
            hasDiscountTotal() {
                return this.isLoadingOrder ? false : this.order.discountTotal.amount > 0;
            },
            orderFees() {
                return this.isLoadingOrder ? [] : this.order._relationships.orderFees;
            },
            orderDiscounts() {
                return this.isLoadingOrder ? [] : this.order._relationships.orderDiscounts;
            },
        }
    };

</script>
