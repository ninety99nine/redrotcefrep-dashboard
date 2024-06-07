<template>

    <div class="shadow-lg rounded-lg border space-y-3 p-4 mb-4">

        <p class="font-bold text-lg">Collection</p>

        <template v-if="isLoadingOrder">
            <ShineEffect class="space-y-3">
                <div class="flex space-x-2">
                    <LineSkeleton width="w-80"></LineSkeleton>
                    <LineSkeleton></LineSkeleton>
                    <LineSkeleton width="w-80"></LineSkeleton>
                </div>
                <div class="flex space-x-2">
                    <LineSkeleton width="w-40"></LineSkeleton>
                    <LineSkeleton></LineSkeleton>
                    <LineSkeleton></LineSkeleton>
                    <LineSkeleton width="w-40"></LineSkeleton>
                </div>
                <div class="flex space-x-2">
                    <LineSkeleton width="w-40"></LineSkeleton>
                    <LineSkeleton></LineSkeleton>
                    <LineSkeleton width="w-40"></LineSkeleton>
                </div>
            </ShineEffect>
        </template>

        <template v-else>

            <div v-if="order.collectionType || order.destinationName" class="flex items-end space-x-4 text-sm">

                <div v-if="order.collectionType" class="flex space-x-1 items-center">
                    <span class="text-sm">Type: </span>
                    <span class="font-bold text-sm">{{ order.collectionType.name }}</span>
                    <MoreInfoPopover :title="order.collectionType.description" placement="top"></MoreInfoPopover>
                </div>

                <div v-if="order.destinationName">
                    <span>Location: </span>
                    <span class="font-bold text-sm">{{ order.destinationName }}</span>
                </div>

            </div>

            <div class="space-y-3 border-t border-dashed pt-4">
                <template v-if="order.collectionVerified.status">

                    <div class="flex items-center space-x-2 font-bold text-lg text-green-500">
                        <svg class="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                    </svg>
                        <span>Collection Verified</span>
                    </div>

                    <div class="flex space-x-8">

                        <!-- Collection Information -->
                        <div class="space-y-2">

                            <!-- Collected By -->
                            <p class="text-sm">
                                <span>Collected By: </span>
                                <span class="font-bold">{{ order._attributes.collectionByUserName }}</span>
                            </p>

                            <!-- Collection Date -->
                            <div class="flex space-x-1 items-center text-sm">
                                <span>Collection Date:</span>
                                <span class="font-bold">{{ formattedDatetime(order.collectionVerifiedAt) }}</span>
                                <MoreInfoPopover :title="formattedRelativeDate(order.collectionVerifiedAt)" placement="top"></MoreInfoPopover>
                            </div>

                        </div>

                        <!-- Verification Information -->
                        <p class="text-sm">
                            <span>Verified By: </span>
                            <span class="font-bold">{{ order._attributes.collectionVerifiedByUserName }}</span>
                        </p>

                    </div>
                </template>

                <template v-else>

                    <div class="flex items-center">
                        <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        <p class="font-bold text-lg">Verify Collection</p>
                    </div>

                    <p class="text-sm font-bold text-yellow-400">{{ order.collectionVerified.description }}</p>

                    <template v-if="canCollect">

                        <Checkbox
                            v-model="acceptToCollectOrder"
                            labelPopoverTitle="What Is This?"
                            label="I have received this order and have verified that the contents are as advertised by the seller"
                            labelPopoverDescription="This confirms that you have received this order and have verified that the contents are as advertised by the seller">
                        </Checkbox>

                        <template v-if="!canManageOrders && !isGeneratingCollectionCode">

                            <!-- Collection Code Instruction (Buyer) -->
                            <Alert>
                                <span>
                                    <svg class="w-6 h-6 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                    </svg>
                                    <span class="font-bold mr-1">What's next?</span>
                                </span>
                                The collection code below must be shared with your seller to verify that you have collected this order
                            </Alert>

                            <!-- Collection Code -->
                            <p class="text-4xl font-bold text-center" v-if="userOrderCollectionAssociation.collectionCode">{{ userOrderCollectionAssociation.collectionCode }}</p>

                            <!-- Collection QR Code -->
                            <img v-if="userOrderCollectionAssociation.collectionQrCode" :src="userOrderCollectionAssociation.collectionQrCode" class="w-60 mx-auto" alt="Collection QR Code">

                        </template>

                    </template>

                    <template v-if="!canCollect && canManageOrders">

                        <!-- Collection Code Instruction (Seller) -->
                        <Alert>
                            <span>
                                <svg class="w-6 h-6 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                                <span class="font-bold mr-1">How to verify collection</span>
                            </span>
                            - {{ order._attributes.dialToShowCollectionCode.instruction }}
                        </Alert>

                        <!-- Collection Code Input -->
                        <OtpInput v-model="collectionCode" :errorText="getFormError('collectionCode')"></OtpInput>

                        <!-- Confirm Collection Button -->
                        <PrimaryButton :action="updateOrderStatus('Completed')" :disabled="collectionCode.length < 6 || isUpdatingOrderStatus" :loading="isUpdatingOrderStatus" class="w-60 mx-auto">
                            Confirm Collection
                        </PrimaryButton>

                    </template>

                </template>
            </div>

        </template>

    </div>

</template>

<script>

    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import { postApi } from '@Repositories/api-repository.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { Alert, Checkbox, ShineEffect, OtpInput, LineSkeleton, PrimaryButton, MoreInfoPopover, BadgeIndicator },
        props: {
            order: {
                type: Object
            },
            isLoadingOrder: {
                type: Boolean
            }
        },
        data() {
            return {
                storeState: useStoreState(),
                acceptToCollectOrder: false,
                isGeneratingCollectionCode: false
            }
        },
        watch: {
            acceptToCollectOrder(newValue, oldValue) {
                if(newValue == true) {
                    this.generateCollectionCode();
                }
            },
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            customer() {
                return this.order._relationships.customer[0];
            },
            userOrderCollectionAssociation() {
                return this.customer._relationships.userOrderCollectionAssociation;
            },
            canCollect() {
                return this.userOrderCollectionAssociation.canCollect;
            },
            canManageOrders() {
                return this.store._relationships.userStoreAssociation.canManageOrders;
            },
        },
        methods: {

            generateCollectionCode() {

                //  Start loader
                this.isGeneratingCollectionCode = true;

                postApi(this.order._links.generateCollectionCode).then(response => {

                    if(response.status == 200) {
                        this.order._attributes.userOrderCollectionAssociation.collectionCodeExpiresAt = response.data['collectionCodeExpiresAt'];
                        this.order._attributes.userOrderCollectionAssociation.collectionQrCode = response.data['collectionQrCode'];
                        this.order._attributes.userOrderCollectionAssociation.collectionCode = response.data['collectionCode'];

                        if(this.canManageOrders) {
                            this.collectionCode = response.data['collectionCode'];
                            this.confirmCollection();
                        }
                    }

                    //  Stop loader
                    this.isGeneratingCollectionCode = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isGeneratingCollectionCode = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            }
        }

    };

</script>
