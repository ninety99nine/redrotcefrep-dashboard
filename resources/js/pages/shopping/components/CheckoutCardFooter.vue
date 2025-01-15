<template>

    <div class="pb-6 px-6 mt-8">

        <!-- Checkout Button -->
        <PrimaryButton
            type="custom"
            :loading="isCreatingOrder"
            :action="navigateToCheckout"
            :bgColor="storeForm.primaryButtonColor"
            :textColor="storeForm.primaryButtonTextColor"
            :disabled="isInspectingShoppingCart || isCreatingOrder || !hasShoppingCartProducts">
            Checkout
        </PrimaryButton>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';

export default {
    components: { PrimaryButton },
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
        isCreatingOrder() {
            return this.shoppingCartState.isCreatingOrder;
        },
        hasShoppingCartProducts() {
            return this.shoppingCartState.hasShoppingCartProducts;
        },
        isInspectingShoppingCart() {
            return this.shoppingCartState.isInspectingShoppingCart;
        },
    },
    methods: {
        closeCustomizeDrawer() {
            return this.shoppingCartState.closeCustomizeDrawer();
        },
        closeShoppingCartDrawer() {
            return this.shoppingCartState.closeShoppingCartDrawer();
        },
        navigateToCheckout() {
            this.closeCustomizeDrawer();
            this.closeShoppingCartDrawer();
            this.$router.push({ name: 'checkout' });
        },
    },
};
</script>
