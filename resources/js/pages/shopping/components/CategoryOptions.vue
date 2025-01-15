<template>

    <div class="flex flex-wrap gap-2">
        <BadgeIndicator type="primary" text="Todays Menu" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Breakfast" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Lunch" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Dinner" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Breakfast" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Lunch" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Dinner" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Breakfast" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Lunch" :clickable="true" :showDot="false"></BadgeIndicator>
        <BadgeIndicator type="info" text="Dinner" :clickable="true" :showDot="false"></BadgeIndicator>
    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

export default {
    components: { BadgeIndicator },
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
