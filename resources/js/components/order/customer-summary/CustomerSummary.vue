<template>

    <div class="bg-white shadow-lg rounded-lg border space-y-3 p-4">

        <p class="font-bold text-lg">Customer</p>

        <div class="flex items-center space-x-4">

            <ShineEffect v-if="isLoadingOrder">
                <RoundSkeleton></RoundSkeleton>
            </ShineEffect>
            <ProfilePhoto v-else-if="customer.profilePhoto" :user="customer" :canUpload="false" width="w-10" height="h-10"></ProfilePhoto>

            <div>

                <div class="flex items-center space-x-2 text-sm">
                    <span>Name: </span>
                    <LineSkeleton v-if="isLoadingOrder" width="w-32"></LineSkeleton>
                    <span v-else class="font-bold">{{ order.customerFirstName }} {{ order.customerLastName }}</span>
                </div>

                <div class="flex items-center space-x-2 text-sm">
                    <span>Mobile: </span>
                    <LineSkeleton v-if="isLoadingOrder" width="w-32"></LineSkeleton>
                    <span v-else class="font-bold">{{ customer.mobileNumber.withoutExtension }}</span>
                </div>

            </div>

        </div>

        <div v-if="isLoadingOrder || occasion" class="border-t border-dashed pt-4">
            <ShineEffect v-if="isLoadingOrder">
                <LineSkeleton width="w-40"></LineSkeleton>
            </ShineEffect>
            <p v-else-if="occasion" class="text-sm">{{ occasion.name }}</p>
        </div>

    </div>

</template>

<script>

    import ProfilePhoto from '@Components/user/ProfilePhoto.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        components: { ProfilePhoto, ShineEffect, LineSkeleton, RoundSkeleton, MoreInfoPopover, BadgeIndicator },
        props: {
            order: {
                type: Object
            },
            isLoadingOrder: {
                type: Boolean
            }
        },
        computed: {
            customer() {
                return this.order._relationships.customer[0];
            },
            occasion() {
                return this.order._relationships.occasion;
            }
        }
    };

</script>
