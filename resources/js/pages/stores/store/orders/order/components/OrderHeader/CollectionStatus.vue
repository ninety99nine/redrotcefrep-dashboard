<template>

    <div class="flex items-center space-x-2">
        <LineSkeleton v-if="_isLoadingOrder" width="w-24" :shine="true"></LineSkeleton>
        <template v-else>
            <Pill :type="_order.collectionVerified.status ? 'success' : 'warning'" size="xs">{{ _order.collectionVerified.name }}</Pill>
            <MoreInfoPopover :class="moreInfoPopoverClasses" :description="_order.collectionVerified.description" placement="top"></MoreInfoPopover>
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
            }
        }
    };

</script>
