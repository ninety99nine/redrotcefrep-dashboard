<template>

    <Drawer ref="shoppingCartDrawer" placement="right" :bodyScrolling="true" :backdrop="false" :hideCloseIcon="true">
        <template #content>

            <!-- Header -->
            <Header></Header>

            <!-- Body -->
            <Body></Body>

            <!-- Footer -->
            <Footer></Footer>

        </template>
    </Drawer>

</template>

<script>

import Drawer from '@Partials/drawers/Drawer.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
import Body from '@Pages/shopping/components/ShoppingCartDrawer/Body.vue';
import Header from '@Pages/shopping/components/ShoppingCartDrawer/Header.vue';
import Footer from '@Pages/shopping/components/ShoppingCartDrawer/Footer.vue';

export default {
    components: { Drawer, Body, Header, Footer },
    data() {
        return {
            shoppingCartState: useShoppingCartState()
        };
    },
    mounted() {
        this.shoppingCartState.shoppingCartDrawer = this.$refs.shoppingCartDrawer;
    },
};

</script>
