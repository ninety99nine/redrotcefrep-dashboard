<template>

    <div
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="md:max-w-lg mx-4 mb-4 md:mx-auto rounded-lg shadow-lg space-y-4 p-4 overflow-hidden">

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

    import CartTotals from '@Pages/shopping/components/CartTotals.vue';
    import ProductLines from '@Pages/shopping/components/ProductLines.vue';
    import NoProductLines from '@Pages/shopping/components/NoProductLines.vue';
    import AddProductModal from '@Pages/shopping/components/AddProductModal.vue';

    export default {
        inject: ['storeState', 'shoppingCartState'],
        components: {
            CartTotals, ProductLines, NoProductLines, AddProductModal
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
