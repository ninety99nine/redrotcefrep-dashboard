<template>

    <div class="flex items-center space-x-2">
        <Pill :type="_order.collectionVerified.status ? 'success' : 'warning'" size="xs">{{ _order.collectionVerified.name }}</Pill>
        <CustomPopover
            placement="top"
            :content="_order.collectionVerified.description">
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
            }
        }
    };

</script>
