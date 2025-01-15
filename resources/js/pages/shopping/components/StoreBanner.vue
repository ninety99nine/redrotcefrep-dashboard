<template>

    <p
        :style="'color:'+storeForm.bannerTextColor+';background:'+storeForm.bannerColor+';'"
        class="p-4 text-sm text-center cursor-pointer border-b border-transparent hover:opacity-90 hover:border-white/50 hover:py-8 active:80 transition-all duration-500">
        FREE DELIVERY FOR ORDERS OVER P500 | FREE RETURNS WITHIN 7 DAYS | 100% SECURE ONLINE SHOPPING
    </p>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';

export default {
    data() {
        return {
            storeState: useStoreState()
        };
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
        }
    }
};
</script>
