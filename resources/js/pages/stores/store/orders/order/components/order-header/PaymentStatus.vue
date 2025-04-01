<template>

    <div class="flex items-center space-x-2">
        <Pill :type="type" size="xs">{{ _order.paymentStatus.name }}</Pill>
        <CustomPopover
            placement="top"
            :content="_order.paymentStatus.description">
        </CustomPopover>
    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import CustomPopover from '@Partials/inputs/CustomPopover.vue';

    export default {
        inject: ['orderState'],
        components: { Pill, CustomPopover },
        props: {
            order: {
                type: Object,
                default: null
            },
            moreInfoPopoverClasses: {
                type: String
            }
        },
        computed: {
            _order() {
                return this.order ?? this.orderState.order;
            },
            type() {
                const paymentStatusName = this._order.paymentStatus.name.toLowerCase();

                if(paymentStatusName === 'paid') {
                    return 'success';
                }else if(paymentStatusName === 'unpaid') {
                    return 'light';
                } else if(paymentStatusName === 'partially paid') {
                    return 'primary';
                } else if(paymentStatusName === 'pending payment') {
                    return 'warning';
                }
            }
        }
    };

</script>
