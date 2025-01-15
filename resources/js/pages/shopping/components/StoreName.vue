<template>

    <h2 :class="[size, 'font-bold text-center mb-4']" :style="'color:'+storeForm.textColor+';'">
        {{ storeForm.name }}
    </h2>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';

export default {
    props: {
        size: {
            type: String,
            default: 'text-xl sm:text-2xl md:text-3xl'
        }
    },
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
