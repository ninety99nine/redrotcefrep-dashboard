<template>

    <div class="bg-white shadow-lg rounded-lg border space-y-3 p-4 mb-4">

        <div v-if="isLoadingOrder" class="flex items-center space-x-2">
            <ShineEffect>
                <RoundSkeleton size="w-6 h-6"></RoundSkeleton>
            </ShineEffect>
            <p class="font-bold text-lg">Collection</p>
        </div>

        <div v-else-if="!isLoadingOrder && isVerified" class="flex items-center space-x-2 font-bold text-lg">

            <!-- Collection Verified Icon -->
            <svg class="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            <!-- Collection Verified Title -->
            <span>Collected</span>

        </div>

        <template v-if="!isLoadingOrder && !isVerified">

            <div class="flex items-center">

                <!-- Collection Unverified Icon -->
                <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>

                <!-- Collection Unverified Title -->
                <p class="font-bold text-lg">Confirm Collection</p>

            </div>

            <!-- Collection Unverified Description -->
            <p class="text-xs">{{ order.collectionVerified.description }}</p>

        </template>

        <!-- Pickup/Delivery information (Collection Type) Skeleton -->
        <template v-if="isLoadingOrder">
            <div class="flex space-x-1">
                <LineSkeleton width="w-12"></LineSkeleton>
                <LineSkeleton width="w-24"></LineSkeleton>
                <LineSkeleton width="w-4"></LineSkeleton>
            </div>
        </template>

        <!-- Pickup/Delivery information (Collection Type) -->
        <div v-else-if="(order.collectionType || order.destinationName)" :class="['flex items-end space-x-4 text-sm', isLoadingOrder || (!isLoadingOrder && isVerified) ? 'border-b border-dashed pb-2' : 'border-t border-dashed pt-2 mt-2']">

            <div v-if="order.collectionType" class="flex space-x-1 items-center">
                <span class="text-xs">Type: </span>
                <span class="font-bold text-xs">{{ order.collectionType.name }}</span>
                <MoreInfoPopover :title="order.collectionType.description" placement="top"></MoreInfoPopover>
            </div>

            <div v-if="order.destinationName">
                <span class="text-xs">Location: </span>
                <span class="font-bold text-xs">{{ order.destinationName }}</span>
            </div>

        </div>

        <!-- Verification Information -->
        <div v-if="isLoadingOrder || (!isLoadingOrder && isVerified)" class="space-y-2 pb-2">

            <!-- Verified By -->
            <div class="flex items-center space-x-2 text-xs">
                <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <span>Verified By: </span>
                </div>
                <LineSkeleton v-if="isLoadingOrder" width="w-24"></LineSkeleton>
                <template v-else>
                    <span class="font-bold">{{ collectionVerifiedByUser._attributes.name }}</span>
                    <MoreInfoPopover :title="'Contact: '+collectionVerifiedByUser.mobileNumber.national" placement="top"></MoreInfoPopover>
                </template>
            </div>

            <!-- Verified Date -->
            <div class="flex items-center space-x-2 text-xs">
                <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>Verified Date:</span>
                </div>
                <div v-if="isLoadingOrder" class="flex space-x-2">
                    <LineSkeleton width="w-32"></LineSkeleton>
                    <LineSkeleton width="w-4"></LineSkeleton>
                </div>
                <template v-else>
                    <span class="font-bold">{{ formattedDatetime(order.collectionVerifiedAt) }}</span>
                    <MoreInfoPopover :title="formattedRelativeDate(order.collectionVerifiedAt)" placement="top"></MoreInfoPopover>
                </template>
            </div>

            <!-- Collection Unverified Description -->
             <div v-if="isLoadingOrder || order.collectionNote" class="flex space-x-1 border-t border-dashed pt-4">
                <template v-if="isLoadingOrder">
                    <LineSkeleton v-if="isLoadingOrder" width="w-4"></LineSkeleton>
                    <LineSkeleton v-if="isLoadingOrder" width="w-32"></LineSkeleton>
                </template>
                <template v-else>
                    <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <p class="text-xs">{{ order.collectionNote }}</p>
                </template>
             </div>

        </div>

        <!-- Divider -->
        <div v-if="!isLoadingOrder && !isVerified" class="border-b border-dashed"></div>

        <!-- Verify Collection Modal -->
        <ConfirmModal
            v-if="!isLoadingOrder && !isVerified"
            declineText="Cancel" declineType="light"
            :isLoading="isUpdatingOrderStatus" :autoHide="false"
            :approveAction="(hideModal) => verifyOrderCollection(hideModal)"
            approveText="Confirm Collection" approveType="primary" :approveDisabled="collectionCode.length < 6 || isUpdatingOrderStatus">

            <template #content>

                <div class="space-y-4 mb-8">

                    <p class="text-lg font-bold border-b border-dashed pb-4">Confirm Collection</p>

                    <!-- Collection Code Instruction (Seller) -->
                    <Alert>
                        <span class="font-bold mr-1">How to verify collection</span>
                        - {{ order._attributes.dialToShowCollectionCode.instruction }}
                    </Alert>

                    <!-- Collection Code Input -->
                    <OtpInput v-model="collectionCode" :errorText="getFormError('collectionCode')" class="mb-8"></OtpInput>

                    <!-- Collection Note Textarea -->
                    <TextareaInput v-model="collectionNote"
                        label="Note (Optional)" _placeholder="Collected by John Doe" :_rows="2"
                        :errorText="getFormError('collectionNote')"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="Important note regarding this order collection e.g Collected by John Doe">
                    </TextareaInput>

                </div>

            </template>

            <template #trigger="triggerProps">

                <div class="flex justify-end">
                    <!-- Confirm Collection Button - Triggers Confirmation Modal -->
                    <PrimaryButton ref="confirmCollection" size="xs" type="light" @click="triggerProps.showModal" :disabled="isUpdatingOrderStatus">
                        Confirm Collection
                    </PrimaryButton>
                </div>

            </template>


        </ConfirmModal>

    </div>

</template>

<script>

    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import { postApi } from '@Repositories/api-repository.js';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { Alert, ConfirmModal, ShineEffect, TextareaInput, OtpInput, LineSkeleton, PrimaryButton, RoundSkeleton, MoreInfoPopover, BadgeIndicator },
        props: {
            order: {
                type: Object
            },
            refreshOrder: {
                type: Function
            },
            isLoadingOrder: {
                type: Boolean
            },
        },
        data() {
            return {
                collectionCode: '',
                collectionNote: '',
                storeState: useStoreState(),
                isUpdatingOrderStatus: false
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isVerified() {
                return this.order.collectionVerified.status;
            },
            collectionVerifiedByUser() {
                return this.order._relationships.collectionVerifiedByUser;
            },
            canManageOrders() {
                return this.store._relationships.userStoreAssociation._attributes.canManageOrders;
            },
        },
        methods: {
            verifyOrderCollection(hideModal) {

                //  Start loader
                this.isUpdatingOrderStatus = true;

                var data = {
                    collectionCode: this.collectionCode
                };

                if(this.collectionNote.trim() != '') data['collectionNote'] = this.collectionNote;

                postApi(this.order._links.verifyOrderCollection, data).then(response => {

                    if(response.status == 200) {

                        hideModal();

                        this.refreshOrder();

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order collection confirmed');

                    }

                    //  Stop loader
                    this.isUpdatingOrderStatus = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isUpdatingOrderStatus = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
        }

    };

</script>
