<template>

    <div
        v-if="hasCartProducts && (isInspectingShoppingCart || hasShoppingCartProducts)"
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="md:max-w-lg mx-4 mb-4 md:mx-auto rounded-lg shadow-lg">

        <p class="font-bold p-4">Order Summary</p>

        <!-- Cart Totals -->
        <CartTotals></CartTotals>

        <div class="pb-6 px-6 mt-8">

            <!-- Place Order Button -->
            <Button
                size="sm"
                type="primary"
                :loading="isCreatingOrder"
                :action="createStoreOrder"
                :disabled="!hasShoppingCartProducts"
                :bgColor="storeForm.primaryButtonColor"
                :textColor="storeForm.primaryButtonTextColor">
                {{ isInspectingShoppingCart ? '...' : 'Place Order' }}
            </Button>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import CartTotals from '@Pages/shopping/components/CartTotals.vue';

    export default {
        inject: ['storeState', 'shoppingCartState'],
        components: {
            Button, CartTotals
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            },
            hasCartProducts() {
                return this.shoppingCartState.hasCartProducts();
            },
            isCreatingOrder() {
                return this.shoppingCartState.isCreatingOrder;
            },
            hasShoppingCartProducts() {
                return this.shoppingCartState.hasShoppingCartProducts;
            },
            isInspectingShoppingCart() {
                return this.shoppingCartState.isInspectingShoppingCart;
            },
            isInspectingShoppingCart() {
                return this.shoppingCartState.isInspectingShoppingCart;
            }
        },
        methods: {
            createStoreOrder() {
                this.shoppingCartState.createStoreOrder();
            }
        }
    };

</script>
