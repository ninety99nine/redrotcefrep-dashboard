<template>

    <div :class="['flex flex-col justify-center relative']" :style="'background:'+storeForm.bgColor+';'">

        <!-- Store Banner -->
        <StoreBanner></StoreBanner>

        <div class="w-full max-w-lg mx-auto mt-20 mb-8">

            <!-- Store Logo -->
            <StoreLogo></StoreLogo>

            <!-- Store Name -->
            <StoreName></StoreName>

            <!-- Store Description -->
            <StoreDescription></StoreDescription>

        </div>

        <div class="w-full max-w-lg mx-auto mb-4 flex justify-center items-center space-x-4">

            <!-- Grand Total -->
            <GrandTotal></GrandTotal>

            <!-- Total Cart Items -->
            <TotalCartItems></TotalCartItems>

        </div>

        <!-- Checkout Card -->
        <CheckoutCard></CheckoutCard>

        <!-- Social Media Card -->
        <SocialMediaCard></SocialMediaCard>

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

import debounce from 'lodash.debounce';
import { useStoreState } from '@Stores/store-store.js';
import StoreLogo from '@Pages/shopping/components/StoreLogo.vue';
import StoreName from '@Pages/shopping/components/StoreName.vue';
import GrandTotal from '@Pages/shopping/components/GrandTotal.vue';
import StoreBanner from '@Pages/shopping/components/StoreBanner.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
import CheckoutCard from '@Pages/shopping/components/CheckoutCard.vue';
import TotalCartItems from '@Pages/shopping/components/TotalCartItems.vue';
import SocialMediaCard from '@Pages/shopping/components/SocialMediaCard.vue';
import CreateStoreLink from '@Pages/shopping/components/CreateStoreLink.vue';
import StoreFooterMenus from '@Pages/shopping/components/StoreFooterMenus.vue';
import StoreDescription from '@Pages/shopping/components/StoreDescription.vue';
import CustomizeDrawer from '@Pages/shopping/components/CustomizeDrawer/Index.vue';
import ShoppingCartDrawer from '@Pages/shopping/components/ShoppingCartDrawer/Index.vue';

export default {
    components: {
        StoreLogo, StoreName, GrandTotal, StoreBanner, CheckoutCard, TotalCartItems,
        SocialMediaCard, CreateStoreLink, StoreFooterMenus, StoreFooterMenus,
        StoreDescription, CustomizeDrawer, ShoppingCartDrawer
    },
    data() {
        return {
            storeState: useStoreState(),
            delayedInspectStoreShoppingCart: null,
            shoppingCartState: useShoppingCartState()
        };
    },
    watch: {
        'shoppingCartState.mappedCartProducts': {
            handler(newVal) {

                if(Object.keys(this.mappedCartProducts).length === 0) {
                    this.closeShoppingCartDrawer();
                }

                if(!this.isInspectingShoppingCart) {
                    this.setIsInspectingShoppingCart();
                    this.delayedInspectStoreShoppingCart();
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
        inspectStoreShoppingCart() {
            return this.shoppingCartState.inspectStoreShoppingCart();
        },
        setIsInspectingShoppingCart() {
            return this.shoppingCartState.setIsInspectingShoppingCart(true);
        }
    },
    created() {
        this.setStoreForm();
        this.setShoppingCartForm();

        this.delayedInspectStoreShoppingCart = debounce(() => {
            this.inspectStoreShoppingCart();
        }, 1000);
    }
};
</script>
