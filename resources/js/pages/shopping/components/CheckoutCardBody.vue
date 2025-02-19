<template>

    <div class="relative">

        <!-- Loading Backdrop -->
        <BackdropLoader v-if="isLoadingProducts || isSearchingProducts" :showBorder="false"></BackdropLoader>

        <div class="divide-y">

            <!-- Products (Loading Placeholder) -->
            <div v-if="isLoadingProducts || isSearchingProducts">

                <div v-for="(_, index) in [1,2,3]" :key="index" class="border-b shadow-sm py-6 px-4 bg-gray-50">
                    <ShineEffect class="w-full flex items-center justify-between">
                        <LineSkeleton width="w-32"></LineSkeleton>
                        <LineSkeleton width="w-16"></LineSkeleton>
                    </ShineEffect>
                </div>

            </div>

            <template v-else>

                <template v-if="hasProducts">

                    <!-- Products -->
                    <div
                        :key="index"
                        v-for="(product, index) in products"
                        @click.stop="isAddedToCart(product.id) ? increaseQuantity(product.id) : addToCart(product)"
                        :style="{ '--product-background': storeForm.productBgColor, '--product-background-hover': storeForm.productHoverBgColor }"
                        :class="['flex justify-between items-center px-6 cursor-pointer bg-[var(--product-background)] hover:bg-[var(--product-background-hover)] transition-colors group', index === 0 ? 'pt-4 pb-2' : 'py-2']">

                        <div class="w-full">
                            <span
                                class="text-sm text-[var(--product-name-color)] group-hover:text-[var(--product-name-color-hover)] transition-colors"
                                :style="{ '--product-name-color': storeForm.productNameColor, '--product-name-color-hover': storeForm.productHoverNameColor }">
                                {{ product.name }}
                            </span>
                            <div class="space-x-1">
                                <template v-if="product.allowVariations.name.toLowerCase() == 'yes'">
                                    <BadgeIndicator type="success" :text="product.totalVisibleVariations+(product.totalVisibleVariations == 1 ? ' option' : ' options')" :showDot="false"></BadgeIndicator>
                                </template>
                                <template v-else>
                                    <BadgeIndicator v-if="product.isFree.status" type="success" text="free" :showDot="false"></BadgeIndicator>
                                    <BadgeIndicator v-if="product.onSale.status" type="success" text="on sale" :showDot="false"></BadgeIndicator>
                                    <span
                                        v-if="!product.isFree.status"
                                        class="text-sm text-[var(--product-price-color)] group-hover:text-[var(--product-price-color-hover)] transition-colors"
                                        :style="{ '--product-price-color': storeForm.productPriceColor, '--product-price-color-hover': storeForm.productHoverPriceColor }">
                                        {{ product.unitPrice.amountWithCurrency }}
                                    </span>
                                </template>
                            </div>
                        </div>

                        <div>

                            <transition name="fade-1" mode="out-in">

                                <div v-if="isAddedToCart(product.id)" class="flex items-center space-x-4">

                                    <div class="flex items-center space-x-2">

                                        <!-- Decrease Quantity Icon Button -->
                                        <svg v-if="hasQuantity(product.id)" @click.stop="() => decreaseQuantity(product.id)" class="w-5 h-5 flex-shrink-0 text-red-500 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                        <!-- Minimum Total Products Input -->
                                        <div>
                                            <input
                                                min="0"
                                                @click.stop
                                                type="number"
                                                placeholder="..."
                                                @input="validateQuantityInput($event)"
                                                v-model="mappedCartProducts[product.id].quantity"
                                                :style="{ '--product-quantity-color': storeForm.productQuantityColor, '--product-quantity-color-hover': storeForm.productHoverQuantityColor }"
                                                class="w-10 border-0 rounded-full !ring-gray-300 remove-arrow p-0 bg-transparent text-center text-sm text-[var(--product-quantity-color)] group-hover:text-[var(--product-quantity-color-hover)] transition-colors">
                                            </input>
                                        </div>

                                        <!-- Increase Quantity Icon Button -->
                                        <svg @click.stop="() => increaseQuantity(product.id)" class="w-5 h-5 flex-shrink-0 text-green-500 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                    </div>

                                    <!-- Remove Icon Button -->
                                    <svg
                                        @click.stop="() => removeFromCart(product.id)"
                                        class="w-5 h-5 flex-shrink-0 text-gray-300 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>

                                </div>

                                <PrimaryButton
                                    v-else
                                    size="xs"
                                    type="custom"
                                    :action="() => addToCart(product)"
                                    :bgColor="storeForm.secondaryButtonColor"
                                    :textColor="storeForm.secondaryButtonTextColor">
                                    <span class="whitespace-nowrap">
                                        {{ product.allowVariations.name.toLowerCase() == 'yes' ? 'Select option' : 'Add to cart' }}
                                    </span>
                                </PrimaryButton>

                            </transition>

                        </div>

                    </div>

                </template>

                <div v-else>

                    <!-- No Products Found Alert -->
                    <div class="w-full flex justify-between items-center p-4 rounded-lg mt-8 mx-6"
                        :style="'color:'+storeForm.textColor+';background:'+storeForm.bgColor+';'">

                        <transition name="fade-1" mode="out-in">
                            <span v-if="isSearchingProducts" class="text-xs inline-block" :style="'color:'+storeForm.textColor+';'">Searching...</span>
                            <span v-else class="text-xs inline-block" :style="'color:'+storeForm.textColor+';'">No products found</span>
                        </transition>

                        <PrimaryButton
                            size="xs"
                            type="custom"
                            :action="clearSearch"
                            v-if="!isSearchingProducts && hasSearchTerm"
                            :bgColor="storeForm.secondaryButtonColor"
                            :textColor="storeForm.secondaryButtonTextColor">
                            <div class="flex items-center space-x-1"
                                :style="'color:'+storeForm.textColor+';'">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-xs whitespace-nowrap">clear search</span>
                            </div>
                        </PrimaryButton>

                    </div>

                </div>

            </template>

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

import { useStoreState } from '@Stores/store-store.js';
import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
import { ShoppingCartMixin } from '@Mixins/ShoppingCartMixin.js';
import BackdropLoader from '@Partials/loaders/BackdropLoader.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
import CategoryHeading from '@Pages/shopping/components/CategoryHeading.vue';
import CategoryOptions from '@Pages/shopping/components/CategoryOptions.vue';

export default {
    mixins: [ShoppingCartMixin],
    components: { ShineEffect, LineSkeleton, PrimaryButton, BackdropLoader, BadgeIndicator, CategoryHeading, CategoryOptions },
    data() {
        return {
            storeState: useStoreState(),
            shoppingCartState: useShoppingCartState()
        };
    },
    computed: {
        store() {
            return this.storeState.store;
        },
        storeForm() {
            return this.storeState.storeForm;
        },
        products() {
            return this.shoppingCartState.products;
        },
        hasProducts() {
            return this.shoppingCartState.hasProducts;
        },
        hasSearchTerm() {
            return this.shoppingCartState.hasSearchTerm;
        },
        shoppingCart() {
            return this.shoppingCartState.shoppingCart;
        },
        hasDetectedProductLineChanges() {
            return this.detectedProductLineChanges.length > 0;
        },
        detectedProductLineChanges() {
            return (((this.shoppingCart || {}).changes || {}).detectedProductLineChanges || []);
        },
        isLoadingProducts() {
            return this.shoppingCartState.isLoadingProducts;
        },
        isSearchingProducts() {
            return this.shoppingCartState.isSearchingProducts;
        },
        mappedCartProducts() {
            return this.shoppingCartState.mappedCartProducts;
        },
    },
    methods: {
        hasQuantity(productId) {
            return this.shoppingCartState.hasQuantity(productId);
        },
        isAddedToCart(productId) {
            return this.shoppingCartState.isAddedToCart(productId);
        },
        addToCart(product) {
            this.shoppingCartState.addToCart(product);
        },
        increaseQuantity(productId) {
            this.shoppingCartState.increaseQuantity(productId);
        },
        decreaseQuantity(productId) {
            this.shoppingCartState.decreaseQuantity(productId);
        },
        removeFromCart(productId) {
            this.shoppingCartState.removeFromCart(productId);
        },
        clearSearch() {
            this.shoppingCartState.clearSearch();
        },
        showShoppingProducts() {
            this.shoppingCartState.showShoppingProducts();
        }
    },
    created() {
        this.showShoppingProducts();
    }
};
</script>
