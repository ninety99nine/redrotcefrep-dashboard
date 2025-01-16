<template>

    <div
        v-if="hasCartProducts && (isInspectingShoppingCart || hasShoppingCartProducts)"
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="md:max-w-lg mx-4 mb-4 md:mx-auto rounded-lg shadow-lg">

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
