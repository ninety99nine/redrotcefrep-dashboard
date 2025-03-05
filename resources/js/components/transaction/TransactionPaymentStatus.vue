<template>
    <div class="flex space-x-1 items-center">
        <Pill :type="type" :text="transaction.paymentStatus.name" :showDot="false"></Pill>
        <MoreInfoPopover :description="transaction.paymentStatus.description" placement="top"></MoreInfoPopover>
    </div>
</template>

<script>

    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import Pill from '@Partials/pills/Pill.vue';

    export default {
        components: { MoreInfoPopover, Pill },
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
