<template>

    <div>

        <div class="divide-y border-b">

            <!-- Cart Products -->
            <div v-for="(productLine, index) in matchingShoppingCartProductLines" :key="index" :class="['flex justify-between items-center px-4 hover:bg-gray-100', index == 0 ? 'pt-4 pb-2' : 'py-2']">

                <div class="w-full">
                    <p class="text-sm">{{ productLine.name }}</p>
                    <div class="space-x-1">
                        <Pill v-if="productLine.isFree.status" type="success" size="xs" :showDot="false">free</Pill>
                        <Pill v-if="productLine.onSale.status" type="success" size="xs" :showDot="false">on sale</Pill>
                        <span v-if="!productLine.isFree.status" class="text-sm text-gray-500">{{ productLine.unitPrice.amountWithCurrency }}</span>
                    </div>
                </div>

                <div class="flex items-center space-x-4">

                    <div class="flex items-center space-x-2">

                        <!-- Decrease Quantity Icon Button -->
                        <svg v-if="hasQuantity(productLine.productId)" @click.stop="() => decreaseQuantity(productLine.productId)" class="w-5 h-5 flex-shrink-0 text-red-500 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <!-- Minimum Total Products Input -->
                        <div>
                            <input
                                min="0"
                                @click.stop
                                type="number"
                                v-only-numbers
                                placeholder="..."
                                v-model="mappedCartProducts[productLine.productId].quantity"
                                class="w-10 border-0 rounded-full !ring-gray-300 remove-arrow p-0 bg-transparent text-center text-sm"
                            />
                        </div>

                        <!-- Increase Quantity Icon Button -->
                        <svg @click.stop="() => increaseQuantity(productLine.productId)" class="w-5 h-5 flex-shrink-0 text-green-500 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>

                    <!-- Remove Icon Button -->
                    <svg
                        @click.stop="() => removeFromCart(productLine.productId)"
                        class="w-5 h-5 flex-shrink-0 text-gray-300 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>

            </div>

            <!-- Products (Loading Placeholder) -->
            <div v-if="isInspectingShoppingCart">

                <div v-for="(_, index) in productLinePlaceholders" :key="index" class="border-b shadow-sm py-6 px-4 bg-gray-50">
                    <div class="w-full flex items-center justify-between">
                        <LineSkeleton width="w-32" :shine="true"></LineSkeleton>
                        <LineSkeleton width="w-16" :shine="true"></LineSkeleton>
                    </div>
                </div>

            </div>

        </div>

        <!-- Detected Product Line Change -->
        <div v-if="hasDetectedProductLineChanges" class="space-y-2 m-4">
            <div v-for="(detectedProductLineChange, index) in detectedProductLineChanges" :key="index" class="flex space-x-2 p-2 border-l-8 border-yellow-300 bg-gray-50">
                <p class="text-xs">{{ detectedProductLineChange.message }}</p>
            </div>
        </div>

    </div>
</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import onlyNumbers from '@Directives/onlyNumbers.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        inject: ['shoppingCartState'],
        directives: { onlyNumbers },
        components: { Pill, LineSkeleton },
        computed: {
            shoppingCart() {
                return this.shoppingCartState.shoppingCart;
            },
            hasDetectedProductLineChanges() {
                return this.detectedProductLineChanges.length > 0;
            },
            detectedProductLineChanges() {
                return (((this.shoppingCart || {}).changes || {}).detectedProductLineChanges || []);
            },
            mappedCartProducts() {
                return this.shoppingCartState.mappedCartProducts;
            },
            isInspectingShoppingCart() {
                return this.shoppingCartState.isInspectingShoppingCart;
            },
            totalCartProducts() {
                return this.shoppingCartState.totalCartProducts();
            },
            matchingShoppingCartProductLines() {
                return this.shoppingCartState.matchingShoppingCartProductLines;
            },
            hasMatchingShoppingCartProductLines() {
                return this.shoppingCartState.hasMatchingShoppingCartProductLines;
            },
            totalMatchingShoppingCartProductLines() {
                return this.shoppingCartState.totalMatchingShoppingCartProductLines;
            },
            lastTotalMatchingShoppingCartProductLines() {
                return this.shoppingCartState.lastTotalMatchingShoppingCartProductLines;
            },
            productLinePlaceholdersTotal() {
                if(this.hasMatchingShoppingCartProductLines) {
                    return this.totalMatchingShoppingCartProductLines - this.totalCartProducts;
                }else{
                    return this.totalCartProducts;
                }
            },
            productLinePlaceholders() {

                var total;

                if(this.hasMatchingShoppingCartProductLines) {
                    total = this.totalCartProducts - this.totalMatchingShoppingCartProductLines;
                }else{
                    total = this.totalCartProducts;
                }

                return new Array(total).fill(0);
            },
        },
        methods: {
            hasQuantity(productId) {
                return this.shoppingCartState.hasQuantity(productId);
            },
            increaseQuantity(productId) {
                this.shoppingCartState.increaseQuantity(productId);
            },
            decreaseQuantity(productId) {
                this.shoppingCartState.decreaseQuantity(productId);
            },
            removeFromCart(productId) {
                this.shoppingCartState.removeFromCart(productId);
            }
        },
    };

</script>
