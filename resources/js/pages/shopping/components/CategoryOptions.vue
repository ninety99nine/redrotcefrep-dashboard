<template>

    <div class="flex flex-wrap gap-2">
        <Pill type="primary" text="Todays Menu" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Breakfast" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Lunch" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Dinner" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Breakfast" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Lunch" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Dinner" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Breakfast" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Lunch" :clickable="true" :showDot="false"></Pill>
        <Pill type="info" text="Dinner" :clickable="true" :showDot="false"></Pill>
    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import Pill from '@Partials/pills/Pill.vue';

export default {
    components: { Pill },
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
