<template>

    <div
        :style="'background:'+storeForm.cardSecondaryColor+';'"
        class="md:max-w-lg mx-4 mb-4 md:mx-auto rounded-lg shadow-lg space-y-4 pt-4 overflow-hidden">

        <!-- Tips Card Heading -->
        <TipsCardHeading></TipsCardHeading>

        <!-- Tips Card Body -->
        <TipsCardBody></TipsCardBody>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import TipsCardBody from '@Pages/shopping/components/TipsCardBody.vue';
import TipsCardHeading from '@Pages/shopping/components/TipsCardHeading.vue';

export default {
    components: { TipsCardBody, TipsCardHeading },
    data() {
        return {
            storeState: useStoreState(),
        };
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
        }
    },
};
</script>
