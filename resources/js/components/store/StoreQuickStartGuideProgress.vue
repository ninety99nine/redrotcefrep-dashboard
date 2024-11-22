<template>

    <span class="text-xs border rounded-lg shadow bg-gray-50 py-1 px-2 inline-block">
        <ShineEffect v-if="isLoadingQuickStartGuide">
            <span class="flex items-center space-x-2">
                <LineSkeleton width="w-4"></LineSkeleton>
                <span class="text-gray-300">/</span>
                <LineSkeleton width="w-20"></LineSkeleton>
            </span>
        </ShineEffect>
        <span v-else>{{ quickStartGuide.completedMilestones }} / {{ quickStartGuide.totalMilestones }} completed</span>
    </span>

</template>


<script>

    import { useStoreState } from '@Stores/store-store.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        components: { ShineEffect, LineSkeleton },
        data() {
            return {
                storeState: useStoreState()
            };
        },
        computed: {
            quickStartGuide() {
                return this.storeState.quickStartGuide;
            },
            isLoadingQuickStartGuide() {
                return this.storeState.isLoadingQuickStartGuide;
            },
        }
    };
</script>
