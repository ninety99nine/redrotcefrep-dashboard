<template>
    <div class="flex space-x-1 items-center">
        <BadgeIndicator :type="type" :text="order.status.name" :showDot="false"></BadgeIndicator>
        <MoreInfoPopover :class="moreInfoPopoverClasses" :description="description" placement="top"></MoreInfoPopover>
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
        },
        computed: {
            description() {
                if(this.order._attributes.isCancelled && this.order.cancellationReason != null) {
                    return this.order.cancellationReason;
                } else {
                    return this.order.status.description;
                }
            },
            type() {
                const statusName = this.order.status.name.toLowerCase();

                if(statusName === 'completed') {
                    return 'success';
                } else if(statusName === 'waiting') {
                    return 'info';
                } else if(statusName === 'on its way' || statusName === 'ready for pickup') {
                    return 'primary';
                } else if(statusName === 'cancelled') {
                    return 'warning';
                }
            }
        }
    };

</script>
