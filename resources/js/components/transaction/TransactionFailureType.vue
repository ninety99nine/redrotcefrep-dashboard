<template>
    <div class="flex space-x-1 items-center">
        <Pill type="danger" :text="transaction.failureType" :showDot="false"></Pill>
        <MoreInfoPopover :description="transaction.failureReason" placement="top"></MoreInfoPopover>
    </div>
</template>

<script>

    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import Pill from '@Partials/pills/Pill.vue';


    export default {
        components: { LineSkeleton, MoreInfoPopover, Pill },
        props: {
            transaction: {
                type: Object
            }
        }
    };

</script>
