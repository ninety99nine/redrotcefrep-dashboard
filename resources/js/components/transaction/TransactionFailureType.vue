<template>
    <div class="flex space-x-1 items-center">
        <Pill type="danger" size="xs" :showDot="false">{{ transaction.failureType }}</Pill>
        <MoreInfoPopover :description="transaction.failureReason" placement="top"></MoreInfoPopover>
    </div>
</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';


    export default {
        components: { Pill, LineSkeleton, MoreInfoPopover },
        props: {
            transaction: {
                type: Object
            }
        }
    };

</script>
