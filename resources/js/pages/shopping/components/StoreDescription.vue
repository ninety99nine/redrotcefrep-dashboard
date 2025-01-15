<template>

    <p class="text-sm text-center" :style="'color:'+storeForm.textColor+';'">
        {{ storeForm.description }}
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
