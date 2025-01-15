<template>

    <div class="flex justify-center items-center space-x-2 w-full max-w-lg mx-auto mb-20">
        <span
            :style="'color:'+storeForm.textColor+';'"
            class="text-sm cursor-pointer hover:underline hover:opacity-90 active:opacity-80 active:scale-90 transition-all">
            Contact us
        </span>
        <span :style="'color:'+storeForm.textColor+';'">·</span>
        <span
            :style="'color:'+storeForm.textColor+';'"
            class="text-sm cursor-pointer hover:underline hover:opacity-90 active:opacity-80 active:scale-90 transition-all">
            About us
        </span>
        <span :style="'color:'+storeForm.textColor+';'">·</span>
        <span
            :style="'color:'+storeForm.textColor+';'"
            class="text-sm cursor-pointer hover:underline hover:opacity-90 active:opacity-80 active:scale-90 transition-all">
            FAQs
        </span>
    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';

export default {
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
};

</script>
