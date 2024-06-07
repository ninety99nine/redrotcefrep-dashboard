<template>
    <div class="flex space-x-1 items-center">
        <BadgeIndicator :active="order.paymentStatus.name == 'Paid'" :text="order.paymentStatus.name" :inactiveType="inactiveType" :showDot="false"></BadgeIndicator>
        <MoreInfoPopover :class="moreInfoPopoverClasses" :description="order.paymentStatus.description" placement="top"></MoreInfoPopover>
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
                if(this.order.paymentStatus.name == 'Unpaid') {
                    return 'info';
                }else if(this.order.paymentStatus.name == 'Partially Paid') {
                    return 'primary';
                }else if(this.order.paymentStatus.name == 'Pending Payment') {
                    return 'warning';
                }
            }
        }
    };

</script>
