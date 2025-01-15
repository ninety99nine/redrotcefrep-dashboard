<template>

    <h2 class="text-2xl md:text-3xl font-bold text-center mb-4" :style="'color:'+storeForm.textColor+';'">
        Checkout
    </h2>

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
