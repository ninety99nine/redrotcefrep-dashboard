<template>

    <div class="px-4">

        <template v-if="hasShoppingCartProducts && (hasDiscounts || hasFees)">

            <!-- Subtotal -->
            <div class="flex justify-between text-sm border-b border-dashed pb-2 mb-2">
                <span>Subtotal</span>
                <LineSkeleton v-if="isInspectingShoppingCart" width="w-16" :shine="true"></LineSkeleton>
                <span v-else>
                    {{ shoppingCart.totals.subtotal.amountWithCurrency }}
                </span>
            </div>

        </template>

        <template v-if="hasShoppingCartProducts && (hasDiscounts || hasFees)">

            <div class="border-b border-dashed pb-2 mb-2">

                <!-- Discounts -->
                <div
                    :key="index"
                    class="flex justify-between text-sm text-gray-500"
                    v-for="(discount, index) in shoppingCart.totals.discounts">
                    <span>{{ discount.name }}</span>
                    <LineSkeleton v-if="isInspectingShoppingCart" width="w-16" :shine="true"></LineSkeleton>
                    <span v-else>
                        {{ discount.amount.amountWithCurrency }}
                    </span>
                </div>
            </div>

        </template>

        <!-- Tax -->
         <div class="border-b border-dashed pb-2 mb-2">
            <div class="flex justify-between text-sm mb-1">
                <LineSkeleton v-if="isInspectingShoppingCart" width="w-16" :shine="true"></LineSkeleton>
                <div v-else class="w-full">Tax ({{ shoppingCart.totals.vat.rate.valueSymbol }} {{ shoppingCart.totals.vat.method }})</div>
                <LineSkeleton v-if="isInspectingShoppingCart" width="w-16" :shine="true"></LineSkeleton>
                <span v-else>
                    {{ shoppingCart.totals.vat.amount.amountWithCurrency }}
                </span>
            </div>
            <LineSkeleton v-if="isInspectingShoppingCart" width="w-1/2" :shine="true"></LineSkeleton>
            <p v-else class="text-xs text-gray-400">Tax calculated on the discounted subtotal of {{ shoppingCart.totals.subtotalAfterDiscount.amountWithCurrency }}</p>
        </div>

        <template v-if="hasShoppingCartProducts && (hasDiscounts || hasFees)">

            <div class="border-b border-dashed pb-2 mb-2">

                <!-- Additional Fees -->
                <div
                    :key="index"
                    class="flex justify-between text-sm text-gray-500"
                    v-for="(fee, index) in shoppingCart.totals.fees">
                    <span>{{ fee.name }}</span>
                    <LineSkeleton v-if="isInspectingShoppingCart" width="w-16" :shine="true"></LineSkeleton>
                    <span v-else>
                        {{ fee.amount.amountWithCurrency }}
                    </span>
                </div>

            </div>

        </template>

        <!-- Grand Total -->
        <div class="flex justify-between text-base border-b border-dashed pt-2 pb-4">
            <div class="w-full font-bold">Grand Total</div>
            <LineSkeleton v-if="isInspectingShoppingCart" width="w-24" :shine="true"></LineSkeleton>
            <span v-else class="font-bold">
                {{ shoppingCart.totals.grandTotal.amountWithCurrency }}
            </span>
        </div>

        <!-- Detected Coupon Line Change -->
        <div v-if="hasDetectedCouponLineChanges" class="space-y-2 mt-4">
            <div v-for="(detectedCouponLineChange, index) in detectedCouponLineChanges" :key="index" class="flex space-x-2 p-2 border-l-8 border-yellow-300 bg-gray-50">
                <p class="text-xs">{{ detectedCouponLineChange.message }}</p>
            </div>
        </div>

    </div>

</template>

<script>

    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        inject: ['shoppingCartState'],
        components: { LineSkeleton },
        computed: {
            shoppingCart() {
                return this.shoppingCartState.shoppingCart;
            },
            hasDetectedCouponLineChanges() {
                return this.detectedCouponLineChanges.length > 0;
            },
            detectedCouponLineChanges() {
                return (((this.shoppingCart || {}).changes || {}).detectedCouponLineChanges || []);
            },
            hasDiscounts() {
                return this.shoppingCartState.hasDiscounts;
            },
            hasFees() {
                return this.shoppingCartState.hasFees;
            },
            hasShoppingCartProducts() {
                return this.shoppingCartState.hasShoppingCartProducts;
            },
            isInspectingShoppingCart() {
                return this.shoppingCartState.isInspectingShoppingCart;
            }
        }
    };

</script>
