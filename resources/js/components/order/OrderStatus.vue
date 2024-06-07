<template>
    <div class="flex space-x-1 items-center">
        <BadgeIndicator :active="order.status.name == 'Completed'" :text="order.status.name" :inactiveType="inactiveType" :showDot="false"></BadgeIndicator>
        <MoreInfoPopover :class="moreInfoPopoverClasses" :description="order.status.description" placement="top"></MoreInfoPopover>
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
