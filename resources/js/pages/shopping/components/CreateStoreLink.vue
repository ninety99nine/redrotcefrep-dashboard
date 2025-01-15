<template>

    <div class="mx-auto mb-20">

        <div @click="navigateToRegister" class="flex items-center p-2 pr-4 space-x-2 rounded-full cursor-pointer bg-white/10 border border-white/50 hover:opacity-90 active:opacity-80 hover:bg-white/5 hover:border-white/30 active:scale-95 transition-all">

            <!-- Logo -->
            <Logo height="h-12"></Logo>

            <!-- Register Link -->
            <span class="text-sm" :style="'color:'+storeForm.textColor+';'">create your store today</span>

        </div>

    </div>

</template>

<script>

import Logo from '@Partials/logos/Logo.vue';
import { useStoreState } from '@Stores/store-store.js';

export default {
    components: { Logo },
    data() {
        return {
            storeState: useStoreState(),
        };
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
        },
    },
    methods: {
        navigateToRegister() {
            this.closeCustomizeDrawer();
            this.closeShoppingCartDrawer();
            this.$router.push({ name: 'register' });
        }
    }
};

</script>
