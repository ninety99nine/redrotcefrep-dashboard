<template>
    <div class="flex space-x-1 items-center">
        <BadgeIndicator :type="order.collectionVerified.status ? 'success' : 'warning'" :text="order.collectionVerified.name" :showDot="false"></BadgeIndicator>
        <MoreInfoPopover :class="moreInfoPopoverClasses" :description="order.collectionVerified.description" placement="top"></MoreInfoPopover>
    </div>
</template>

<script>

    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        components: { MoreInfoPopover, BadgeIndicator },
        props: {
            order: {
                type: Object
            },
            moreInfoPopoverClasses: {
                type: String
            }
        }
    };

</script>
