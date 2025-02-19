<template>

    <div
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        v-if="hasShoppingCart && shoppingCart.canApplyPromotionCode"
        class="md:max-w-lg mx-4 mb-4 md:mx-auto rounded-lg shadow-lg space-y-4 pt-4 overflow-hidden">

        <!-- Promotion Code Card Heading -->
        <PromotionCodeCardHeading></PromotionCodeCardHeading>

        <!-- Promotion Code Card Body -->
        <PromotionCodeCardBody></PromotionCodeCardBody>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
import PromotionCodeCardBody from '@Pages/shopping/components/PromotionCodeCardBody.vue';
import PromotionCodeCardHeading from '@Pages/shopping/components/PromotionCodeCardHeading.vue';

export default {
    components: { PromotionCodeCardBody, PromotionCodeCardHeading },
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
        shoppingCart() {
            return this.shoppingCartState.shoppingCart;
        },
        hasShoppingCart() {
            return this.shoppingCartState.hasShoppingCart;
        },
    },
};
</script>
