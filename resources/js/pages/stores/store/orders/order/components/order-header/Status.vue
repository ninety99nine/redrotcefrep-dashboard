<template>

    <div class="flex items-center space-x-2">
        <Pill :type="type" size="xs">{{ _order.status.name }}</Pill>
        <CustomPopover
            placement="top"
            :content="_order.status.description">
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
            description() {
                if(this._order._attributes.isCancelled && this._order.cancellationReason != null) {
                    return this._order.cancellationReason;
                } else {
                    return this._order.status.description;
                }
            },
            type() {
                const statusName = this._order.status.name.toLowerCase();

                if(statusName === 'completed') {
                    return 'success';
                } else if(statusName === 'waiting') {
                    return 'light';
                } else if(statusName === 'on its way' || statusName === 'ready for pickup') {
                    return 'primary';
                } else if(statusName === 'cancelled') {
                    return 'warning';
                }
            }
        }
    };

</script>
