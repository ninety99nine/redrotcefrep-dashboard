<template>

    <div v-if="hasCartProducts && hasShoppingCart" class="flex items-center space-x-2">
        <div class="flex justify-center items-center w-32 transition-all duration-300">
            <span class="text-sm sm:text-md md:text-lg font-bold" :style="'color:'+storeForm.textColor+';'">
                <transition name="fade-1" mode="out-in">
                    <span v-if="isInspectingShoppingCart">...</span>
                    <span v-else>{{ shoppingCart.totals.grandTotal.amountWithCurrency }}</span>
                </transition>
            </span>
        </div>
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
        hasShoppingCart() {
            return this.shoppingCartState.hasShoppingCart;
        },
        isInspectingShoppingCart() {
            return this.shoppingCartState.isInspectingShoppingCart;
        },
    }
};
</script>
