<template>
    <div class="flex space-x-1 items-center">
        <BadgeIndicator :type="type" :text="transaction.paymentStatus.name" :showDot="false"></BadgeIndicator>
        <MoreInfoPopover :description="transaction.paymentStatus.description" placement="top"></MoreInfoPopover>
    </div>
</template>

<script>

    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        components: { MoreInfoPopover, BadgeIndicator },
        props: {
            transaction: {
                type: Object
            }
        },
        computed: {
            type() {
                if(this.transaction._attributes.isPaid) {
                    return 'success';
                }else if(this.transaction._attributes.isFailedPayment) {
                    return 'danger';
                }else if(this.transaction._attributes.isPendingPayment) {
                    return 'warning';
                }else {
                    return 'info';
                }
            }
        }
    };

</script>
