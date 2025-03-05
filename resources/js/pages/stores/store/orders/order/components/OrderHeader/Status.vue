<template>

    <div class="flex items-center space-x-2">
        <LineSkeleton v-if="_isLoadingOrder" width="w-24" :shine="true"></LineSkeleton>
        <template v-else>
            <Pill :type="type" size="xs">{{ _order.status.name }}</Pill>
            <MoreInfoPopover :class="moreInfoPopoverClasses" :description="_order.paymentStatus.description" placement="top"></MoreInfoPopover>
        </template>
    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import { useOrderState } from '@Stores/order-store.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';

    export default {
        components: { Pill, LineSkeleton, MoreInfoPopover },
        props: {
            order: {
                type: Object,
                default: null
            },
            isLoadingOrder: {
                type: Boolean,
                default: null
            },
            moreInfoPopoverClasses: {
                type: String
            }
        },
        data() {
            return {
                orderState: useOrderState(),
            }
        },
        computed: {
            _order() {
                return this.order ?? this.orderState.order;
            },
            _isLoadingOrder() {
                return this.isLoadingOrder ?? this.orderState.isLoadingOrder;
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
