<template>
    <div class="flex space-x-1 items-center">
        <BadgeIndicator :type="type" :text="order.paymentStatus.name" :showDot="false"></BadgeIndicator>
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
            type() {
                const paymentStatusName = this.order.paymentStatus.name.toLowerCase();

                if(paymentStatusName === 'paid') {
                    return 'success';
                }else if(paymentStatusName === 'unpaid') {
                    return 'info';
                } else if(paymentStatusName === 'partially paid') {
                    return 'primary';
                } else if(paymentStatusName === 'pending payment') {
                    return 'warning';
                }
            }
        }
    };

</script>
