<template>

    <Logo height="h-24" class="mx-auto mb-8"></Logo>

</template>

<script>

import Logo from '@Partials/logos/Logo.vue';
import { useStoreState } from '@Stores/store-store.js';

export default {
    components: {
        Logo
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
