<template>

    <div
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden mb-4">

        <p class="font-bold p-4">Items</p>

        <!-- Product Lines -->
        <ProductLines v-if="hasCartProducts && (isInspectingShoppingCart || hasShoppingCartProducts)"></ProductLines>

        <!-- No Product Lines -->
        <NoProductLines v-else class="border-t"></NoProductLines>

        <!-- Add Product Modal -->
        <AddProductModal></AddProductModal>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import CartTotals from '@Pages/shopping/components/CartTotals.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
import ProductLines from '@Pages/shopping/components/ProductLines.vue';
import NoProductLines from '@Pages/shopping/components/NoProductLines.vue';
import AddProductModal from '@Pages/shopping/components/AddProductModal.vue';

export default {
    components: {
        CartTotals, ProductLines, NoProductLines, AddProductModal
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
        },
    }
};
</script>
