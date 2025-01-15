<template>

    <div @click="() => toggleShoppingCartDrawer()" class="flex justify-center items-center space-x-2 bg-white/75 border border-white px-4 py-2 rounded-full cursor-pointer hover:opacity-90 hover:px-6 active:opacity-80 active:scale-90 transition-all duration-300 relative">

        <!-- Total Shopping Cart Products Counter -->
        <div v-if="hasCartProducts && (isInspectingShoppingCart || hasShoppingCartProducts)" class="min-w-6 h-6 flex justify-center items-center bg-red-500 rounded-full absolute -top-3 -right-3 sm:-top-2 sm:-right-2">
            <span class="text-xs text-white sm:font-bold px-1">
                <transition name="fade-1" mode="out-in">
                    <span v-if="isInspectingShoppingCart">...</span>
                    <span v-else>{{ shoppingCart.totalsSummary.productLines.totalUncancelledQuantities }}</span>
                </transition>
            </span>
        </div>

        <!-- Shopping Bag Icon -->
        <svg class="text-black w-4 h-4 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>

        <!-- View Cart / 0 Items Selected -->
        <span class="font-bold text-xs whitespace-nowrap">{{ hasCartProducts ? 'view cart' : '0 items selected' }}</span>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';

export default {
    data() {
        return {
            storeState: useStoreState(),
            shoppingCartState: useShoppingCartState(),
        };
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
        },
        shoppingCart() {
            return this.shoppingCartState.shoppingCart;
        },
        hasCartProducts() {
            return this.shoppingCartState.hasCartProducts();
        },
        hasShoppingCartProducts() {
            return this.shoppingCartState.hasShoppingCartProducts;
        },
        isInspectingShoppingCart() {
            return this.shoppingCartState.isInspectingShoppingCart;
        }
    },
    methods: {
        toggleShoppingCartDrawer() {
            return this.shoppingCartState.toggleShoppingCartDrawer();
        }
    }
};
</script>
