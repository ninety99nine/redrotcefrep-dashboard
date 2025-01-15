<template>

    <div
        v-if="hasCartProducts && (isInspectingShoppingCart || hasShoppingCartProducts)"
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="w-full max-w-lg mx-auto rounded-lg shadow-lg mb-4">

        <p class="font-bold p-4">Order Summary</p>

        <!-- Cart Totals -->
        <CartTotals></CartTotals>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import CartTotals from '@Pages/shopping/components/CartTotals.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';

export default {
    components: {
        CartTotals
    },
    data() {
        return {
            storeState: useStoreState(),
            shoppingCartState: useShoppingCartState()
        };
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
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
    }
};
</script>
