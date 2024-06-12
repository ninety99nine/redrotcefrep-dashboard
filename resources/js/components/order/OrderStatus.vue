<template>
    <div class="flex space-x-1 items-center">
        <BadgeIndicator :active="order.status.name == 'Completed'" :text="order.status.name" :inactiveType="inactiveType" :showDot="false"></BadgeIndicator>
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
                }else {
                    return this.order.status.description;
                }
            },
            inactiveType() {
                if(this.order.status.name == 'Waiting') {
                    return 'info';
                }else if(this.order.status.name == 'On Its Way' || this.order.status.name == 'Ready For Pickup') {
                    return 'primary';
                }else if(this.order.status.name == 'Cancelled') {
                    return 'warning';
                }
            }
        }
    };

</script>
