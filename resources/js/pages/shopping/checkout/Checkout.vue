<template>

    <div class="pb-20" :style="'background:'+storeForm.bgColor+';'">

        <!-- Store Banner -->
        <StoreBanner></StoreBanner>

        <div class="w-full max-w-lg mx-auto mt-20 mb-4">

            <!-- Store Logo -->
            <StoreLogo></StoreLogo>

            <!-- Store Nmae -->
            <StoreName size="text-base sm:text-lg"></StoreName>

            <!-- Checkout Heading -->
            <CheckoutHeading></CheckoutHeading>

        </div>

        <div class="w-full max-w-lg mx-auto mb-4 flex justify-center items-center space-x-4">

            <!-- Grand Total -->
            <GrandTotal></GrandTotal>

            <!-- Return To Shop -->
            <ReturnToShop></ReturnToShop>

        </div>

        <!-- Customer Card -->
        <CustomerCard></CustomerCard>

        <!-- Items Card -->
        <ItemsCard></ItemsCard>

        <!-- Delivery Methods Card -->
        <DeliveryMethodsCard></DeliveryMethodsCard>

        <!-- Tips Card -->
        <TipsCard></TipsCard>

        <!-- Promotion Code Card -->
        <PromotionCodeCard></PromotionCodeCard>

        <!-- Order Summary Card -->
        <OrderSummaryCard></OrderSummaryCard>

        <!-- Store Footer Menus -->
        <StoreFooterMenus></StoreFooterMenus>

        <!-- Create Store Link -->
        <CreateStoreLink></CreateStoreLink>

        <!-- Customize Drawer -->
        <CustomizeDrawer></CustomizeDrawer>

        <!-- Shopping Cart Drawer -->
        <ShoppingCartDrawer></ShoppingCartDrawer>

    </div>

</template>

<script>

import TipsCard from '@Pages/shopping/components/TipsCard.vue';
import ItemsCard from '@Pages/shopping/components/ItemsCard.vue';
import StoreLogo from '@Pages/shopping/components/StoreLogo.vue';
import StoreName from '@Pages/shopping/components/StoreName.vue';
import GrandTotal from '@Pages/shopping/components/GrandTotal.vue';
import StoreBanner from '@Pages/shopping/components/StoreBanner.vue';
import ReturnToShop from '@Pages/shopping/components/ReturnToShop.vue';
import CustomerCard from '@Pages/shopping/components/CustomerCard.vue';
import CheckoutHeading from '@Pages/shopping/components/CheckoutHeading.vue';
import CreateStoreLink from '@Pages/shopping/components/CreateStoreLink.vue';
import PromotionCodeCard from '@Pages/shopping/components/PromotionCodeCard.vue';
import OrderSummaryCard from '@Pages/shopping/components/OrderSummaryCard.vue';
import StoreFooterMenus from '@Pages/shopping/components/StoreFooterMenus.vue';
import StoreDescription from '@Pages/shopping/components/StoreDescription.vue';
import CustomizeDrawer from '@Pages/shopping/components/CustomizeDrawer/Index.vue';
import DeliveryMethodsCard from '@Pages/shopping/components/DeliveryMethodsCard.vue';
import ShoppingCartDrawer from '@Pages/shopping/components/ShoppingCartDrawer/Index.vue';

export default {
    inject: ['storeState', 'shoppingCartState'],
    components: {
        TipsCard, ItemsCard, StoreLogo, StoreName, CheckoutHeading, GrandTotal, StoreBanner, ReturnToShop, CustomerCard,
        CreateStoreLink, PromotionCodeCard, OrderSummaryCard, StoreFooterMenus, StoreDescription, CustomizeDrawer,
        DeliveryMethodsCard, ShoppingCartDrawer
    },
    watch: {
        'shoppingCartState.mappedCartProducts': {
            handler(newVal) {

                if(Object.keys(this.mappedCartProducts).length === 0) {
                    this.closeShoppingCartDrawer();
                }

                if(!this.isInspectingShoppingCart) {
                    this.inspectStoreShoppingCartWithDelay();
                }
            },
            deep: true
        }
    },
    computed: {
        store() {
            return this.storeState.store;
        },
        storeForm() {
            return this.storeState.storeForm;
        },
        shoppingCart() {
            return this.shoppingCartState.shoppingCart;
        },
        mappedCartProducts() {
            return this.shoppingCartState.mappedCartProducts;
        }
    },
    methods: {
        setStoreForm() {
            return this.storeState.setStoreForm(this.store);
        },
        setShoppingCartForm() {
            return this.shoppingCartState.setShoppingCartForm();
        },
        closeShoppingCartDrawer() {
            return this.shoppingCartState.closeShoppingCartDrawer();
        },
        inspectStoreShoppingCartWithDelay() {
            return this.shoppingCartState.inspectStoreShoppingCartWithDelay();
        }
    },
    created() {
        this.setStoreForm();
        this.setShoppingCartForm();
    }
};
</script>
