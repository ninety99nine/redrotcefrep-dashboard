<template>

    <div>

        <!-- Product Lines -->
        <ProductLines v-if="hasCartProducts && (isInspectingShoppingCart || hasShoppingCartProducts)" class="mt-8"></ProductLines>

        <!-- No Product Lines -->
        <NoProductLines v-else class="my-8 mx-4"></NoProductLines>

        <!-- Cart Totals -->
        <CartTotals
            class="mt-4"
            v-if="hasCartProducts && (isInspectingShoppingCart || hasShoppingCartProducts)">
        </CartTotals>

    </div>

</template>

<script>

import CartTotals from '@Pages/shopping/components/CartTotals.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
import ProductLines from '@Pages/shopping/components/ProductLines.vue';
import NoProductLines from '@Pages/shopping/components/NoProductLines.vue';

export default {
    components: {
        CartTotals, ProductLines, NoProductLines
    },
    data() {
        return {
            shoppingCartState: useShoppingCartState()
        };
    },
    computed: {
        hasCartProducts() {
            return this.shoppingCartState.hasCartProducts();
        },
        hasShoppingCartProducts() {
            return this.shoppingCartState.hasShoppingCartProducts;
        },
        isInspectingShoppingCart() {
            return this.shoppingCartState.isInspectingShoppingCart;
        },
    }
};
</script>
