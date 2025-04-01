<template>

    <div class="px-4 mt-8">

        <!-- Checkout Button -->
        <Button
            size="sm"
            type="primary"
            :loading="isCreatingOrder"
            :action="navigateToCheckout"
            :bgColor="storeForm.primaryButtonColor"
            :textColor="storeForm.primaryButtonTextColor"
            :disabled="isInspectingShoppingCart || isCreatingOrder || !hasShoppingCartProducts">
            Checkout
        </Button>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        inject: ['storeState', 'shoppingCartState'],
        components: { Button },
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
            navigateToCheckout() {
                this.closeCustomizeDrawer();
                this.closeShoppingCartDrawer();
                this.$router.push({ name: 'checkout' });
            },
        },
    };

</script>
