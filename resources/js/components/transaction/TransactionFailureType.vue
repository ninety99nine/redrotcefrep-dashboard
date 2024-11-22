<template>
    <div class="flex space-x-1 items-center">
        <BadgeIndicator type="danger" :text="transaction.failureType" :showDot="false"></BadgeIndicator>
        <MoreInfoPopover :description="transaction.failureReason" placement="top"></MoreInfoPopover>
    </div>
</template>

<script>

    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';


    export default {
        components: { ShineEffect, LineSkeleton, MoreInfoPopover, BadgeIndicator },
        props: {
            transaction: {
                type: Object
            }
        }
    };

</script>
