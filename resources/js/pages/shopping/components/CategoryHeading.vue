<template>

    <p :style="'color:'+storeForm.cardHeadingTextColor+';'"
        class="font-bold text-sm sm:text-lg text-black mb-4">
        Categories
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
