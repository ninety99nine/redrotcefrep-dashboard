<template>

    <div class="pb-6 px-6 mt-8">

        <!-- Checkout Button -->
        <Button
            size="sm"
            type="primary"
            :loading="isNavigating"
            :action="navigateToCheckout"
            :disabled="!hasShoppingCartProducts"
            :bgColor="storeForm.primaryButtonColor"
            :textColor="storeForm.primaryButtonTextColor">
            {{ isInspectingShoppingCart ? '...' : 'Checkout' }}
        </Button>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        inject: ['storeState', 'shoppingCartState'],
        components: { Button },
        data() {
            return {
                isNavigating: false
            };
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
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
                this.isNavigating = true;
                this.closeCustomizeDrawer();
                this.closeShoppingCartDrawer();
                this.$router.push({ name: 'checkout' });
            },
        },
    };

</script>
