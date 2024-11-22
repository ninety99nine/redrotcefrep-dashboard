<template>

    <div>

        <div class="grid grid-cols-4 gap-4 my-6">

            <div class="col-span-3">

                <!-- Subscription Countdown -->
                <div v-if="storeRequiresSubscription" class="bg-white shadow-lg rounded-t-lg border border-b-2 p-4">

                    <!-- User Store Subscription Countdown -->
                    <UserStoreSubscriptionCountdown></UserStoreSubscriptionCountdown>

                </div>

                <div :class="['bg-white shadow-lg border p-4', storeRequiresSubscription ? 'rounded-b-lg' : 'rounded-lg']">

                    <template v-if="isLoadingQuickStartGuide || !completedQuickStartGuide">

                        <div class="flex justify-between">

                            <div class="w-full space-y-4 mb-6">

                                <!-- Quick Start Guide (Heading) -->
                                <h1 class="text-lg font-bold">Quick Start Guide</h1>

                                <!-- Quick Start Guide (Instructions) -->
                                <p class="text-sm text-gray-500">Here's a guide to get you selling in minutes.</p>

                                <!-- Quick Start Guide (Progress) -->
                                <StoreQuickStartGuideProgress></StoreQuickStartGuideProgress>

                                <!-- Milestone Skeletons -->
                                <ShineEffect v-if="isLoadingQuickStartGuide" class="space-y-4">
                                    <div v-for="(item, index) in 5" :key="index" class="flex items-center space-x-2">
                                        <RoundSkeleton size="w-3 h-3"></RoundSkeleton>
                                        <LineSkeleton :width="['w-40', 'w-48', 'w-60', 'w-80', 'w-72'][index]"></LineSkeleton>
                                    </div>
                                </ShineEffect>

                                <!-- Milestones -->
                                <div v-else-if="!completedQuickStartGuide" class="text-sm space-y-3">

                                    <div v-for="(milestone, index) in quickStartGuide.milestones" :key="index" class="flex items-center space-x-2">

                                        <!-- Milestone Completed Checkmark Icon -->
                                        <svg v-if="showMilestoneCheckmark(milestone)" :class="milestoneIconClass(milestone)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                        </svg>

                                        <!-- Milestone Not Completed Circle -->
                                        <div v-else class="rounded-full border border-dashed border-gray-300 w-6 h-6"></div>

                                        <!-- Milestone Title -->
                                        <span :class="{ 'text-yellow-500' : (showMilestoneCheckmark(milestone) && milestone.status == false)}">

                                            <!-- Add Products Action -->
                                            <template v-if="milestone.type == 'added products' && milestone.status == false">
                                                <span @click="navigateToAddProduct" class="hover:opacity-80 active:opacity-50 active:scale-90 underline decoration-dashed underline-offset-4 cursor-pointer">{{ milestone.title }} 🛍️</span>
                                            </template>

                                            <!-- Dial Store Action -->
                                            <template v-else-if="milestone.type == 'dialed store' && milestone.status == false">
                                                <span>Dial your store on </span>
                                                <MobileNumberShortcode></MobileNumberShortcode>
                                            </template>

                                            <!-- Subscribe Action -->
                                            <template v-else-if="milestone.type == 'subscribed' && milestone.status == false">
                                                <span>Open for business by </span>
                                                <StoreSubscribeButton>
                                                    <template #trigger="triggerProps">
                                                        <span @click="triggerProps.showModal" class="hover:opacity-80 active:opacity-50 active:scale-90 underline decoration-dashed underline-offset-4 cursor-pointer">subscribing</span>
                                                    </template>
                                                </StoreSubscribeButton>
                                            </template>

                                            <span v-else>{{ milestone.title }}</span>
                                        </span>

                                        <!-- Milestone More Info Popover -->
                                        <template v-if="(showMilestoneCheckmark(milestone) && milestone.status == false)">
                                            <MoreInfoPopover title="Subscription Expired" placement="top">
                                                <template #description>
                                                    <hr>
                                                    <p>Renew your subscription to reopen your store and allow customers to place orders</p>
                                                </template>
                                            </MoreInfoPopover>
                                        </template>

                                    </div>

                                </div>

                            </div>

                            <div class="">
                                <iframe width="400" height="225" class="rounded-lg shadow-md" src="https://www.youtube.com/embed/u31qwQUeGuM" title="Placeholder video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>

                        </div>

                    </template>

                    <div v-else class="flex justify-between">
                        <div class="space-y-2">
                            <p class="text-gray-500">Congratulations 👏 you are ready for market</p>
                            <p class="text-gray-500">Tell your customers to dial and access your store 🎉</p>
                            <MobileNumberShortcode>
                                <template #trigger="triggerProps">
                                    <p @click="triggerProps.showModal" class="font-bold text-2xl hover:opacity-80 active:opacity-50 active:scale-90 underline decoration-dashed underline-offset-4 cursor-pointer">{{ mobileNumberShortcode }}</p>
                                </template>
                            </MobileNumberShortcode>
                        </div>
                        <div class="h-72 overflow-hidden">
                            <VirtualPhone></VirtualPhone>
                        </div>
                    </div>

                </div>

            </div>

            <div class="col-span-1 space-y-4">

                <!-- Support payments -->
                <div class="bg-white shadow-lg rounded-lg border p-4 space-y-3">

                    <span class="text-sm">Support payments using Orange Money or Credit/Debit Cards</span>

                    <div class="flex justify-end">

                        <PrimaryButton :action="navigateToAddCoupon" class="w-40" size="xs">
                            <span class="mr-2">Allow Payments</span>
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
                                <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                            </svg>
                        </PrimaryButton>

                    </div>

                </div>

                <!-- Support delivery -->
                <div class="bg-white shadow-lg rounded-lg border p-4 space-y-3">

                    <span class="text-sm">Support order delivery</span>

                    <div class="flex justify-end">

                        <PrimaryButton :action="navigateToAddCoupon" class="w-40" size="xs">
                            <span class="mr-2">Allow Delivery</span>
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                                <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                                <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                            </svg>
                        </PrimaryButton>

                    </div>

                </div>

            </div>

        </div>

        <div class="grid grid-cols-2 gap-4">

            <!-- No Products -->
            <div class="col-span-1">
                <div class="flex justify-between space-x-4 bg-white shadow-lg rounded-lg border p-8">
                    <div class="space-y-4">
                        <h1 class="text-xl font-bold">Add your products</h1>
                        <p class="text-sm">Start by stocking your store with products your customers will love</p>

                        <!-- Add Product Button -->
                        <AddButton :action="navigateToAddProduct" class="w-40" size="sm">
                            <span class="ml-2">Add Product</span>
                        </AddButton>
                    </div>
                    <div>
                        <span class="text-6xl">🛍️</span>
                    </div>
                </div>
            </div>

            <!-- No Coupons -->
            <div class="col-span-1">
                <div class="flex justify-between space-x-4 bg-white shadow-lg rounded-lg border p-8">
                    <div class="space-y-4">
                        <h1 class="text-xl font-bold">Add your coupons</h1>
                        <p class="text-sm">Create amazing incentives for your customers, such as offering <span class="underline decoration-dashed underline-offset-4">discounts</span> or <span class="underline decoration-dashed underline-offset-4">free delivery</span>, while determining who can claim them and when.</p>

                        <!-- Add Coupon Button -->
                        <AddButton :action="navigateToAddCoupon" class="w-40" size="sm">
                            <span class="ml-2">Add Coupon</span>
                        </AddButton>
                    </div>
                    <div>
                        <span class="text-6xl">🥰</span>
                    </div>
                </div>
            </div>

            <!-- No Team Members -->
            <div class="col-span-2 space-y-4">

                <div class="flex justify-between space-x-4 bg-white shadow-lg rounded-lg border p-8">
                    <div class="space-y-4">
                        <h1 class="text-xl font-bold">Build Your Team</h1>
                        <p class="text-sm">Invite others to help manage your store. Collaborate by adding team members to help you grow your business.</p>

                        <!-- Add Team Member Button -->
                        <AddButton :action="navigateToInviteTeamMember" class="w-60" size="sm">
                            <span class="ml-2">Add Team Member</span>
                        </AddButton>
                    </div>
                    <div>
                        <span class="text-6xl">💪</span>
                    </div>
                </div>

                <!-- Delete Store -->
                <div class="space-y-4 shadow-lg rounded-lg border p-4 border-red-300 bg-red-50">

                    <!-- Delete Store Info -->
                    <p>Do you want to permanently delete <span class="font-bold text-black">{{ store.name }}</span>? Once this store is deleted you will not be able to recover it.</p>

                    <div class="flex justify-end">

                        <ConfirmModal approveText="Delete Store" :approveAction="deleteStore" :approveDisabled="deleteConfirmationCodeInvalid" :isLoading="isDeletingStore" :onShow="showDeleteStoreConfirmationCode">

                            <template #content>

                                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                                <p class="mb-4">Are you sure you want to permanently delete <span class="font-bold text-black">{{ store.name }}</span>? Confirm by entering the confirmation code below</p>

                                <div v-if="isLoadingDeleteCode" class="flex justify-center space-x-2 animate-pulse mb-8">
                                    <SpiningLoader></SpiningLoader>
                                    <span class="text-xs">Loading code ...</span>
                                </div>
                                <p v-else class="font-bold text-4xl text-center mb-8">{{ validDeleteConfirmationCode }}</p>

                                <!-- Delete Collection Code Input -->
                                <OtpInput v-model="deleteConfirmationCode" :errorText="getFormError('deleteConfirmationCode')" class="mb-8"></OtpInput>

                            </template>

                            <template #trigger="triggerProps">

                                <!-- Delete Store Button - Triggers Confirmation Modal -->
                                <PrimaryButton @click="triggerProps.showModal" :loading="isDeletingStore" class="w-40" type="danger">
                                    Delete Store
                                </PrimaryButton>

                            </template>


                        </ConfirmModal>

                    </div>

                </div>

            </div>

        </div>


    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import OrderStatus from '@Components/order/OrderStatus.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { postApi, deleteApi } from '@Repositories/api-repository.js';
    import VirtualPhone from '@Components/virtual-phone/VirtualPhone.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import OrderPaymentStatus from '@Components/order/OrderPaymentStatus.vue';
    import StoreSubscribeButton from '@Components/store/StoreSubscribeButton.vue';
    import MobileNumberShortcode from '@Components/user/MobileNumberShortcode.vue';
    import OrderCollectionStatus from '@Components/order/OrderCollectionStatus.vue';
    import StoreQuickStartGuideProgress from '@Components/store/StoreQuickStartGuideProgress.vue';
    import UserStoreSubscriptionCountdown from '@Components/store/UserStoreSubscriptionCountdown.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            TextHeader, AddButton, BasicTable, Checkbox, Countdown, OrderStatus, ConfirmModal, ShineEffect, OtpInput,
            LineSkeleton, SpiningLoader, PrimaryButton, RoundSkeleton, MoreInfoPopover, ToogleSwitch, VirtualPhone,
            OrderPaymentStatus, StoreSubscribeButton, MobileNumberShortcode, OrderCollectionStatus,
            StoreQuickStartGuideProgress, UserStoreSubscriptionCountdown
        },
        data() {
            return {
                isDeletingStore: false,
                authState: useAuthState(),
                isLoadingDeleteCode: false,
                deleteConfirmationCode: '',
                storeState: useStoreState(),
                validDeleteConfirmationCode: '',
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            quickStartGuide() {
                return this.storeState.quickStartGuide;
            },
            isLoadingQuickStartGuide() {
                return this.storeState.isLoadingQuickStartGuide;
            },
            completedQuickStartGuide() {
                return this.storeState.completedQuickStartGuide;
            },
            activeSubscription() {
                return this.store._relationships.activeSubscription;
            },
            mobileNumberShortcode() {
                return this.authState.user._attributes.mobileNumberShortcode;
            },
            storeRequiresSubscription() {
                return this.activeSubscription == null;
            },
            deleteConfirmationCodeInvalid() {
                return this.deleteConfirmationCode == '' ||
                       this.validDeleteConfirmationCode == '' ||
                       this.deleteConfirmationCode != this.validDeleteConfirmationCode;
            }
        },
        methods: {
            showMilestoneCheckmark(milestone) {
                //  If the user subscribed but the subscription has expired
                if(milestone.type == 'subscribed' && milestone.status == false && milestone.subscriptionEndAt != null) {
                    return true;
                }else{
                    return milestone.status;
                }
            },
            milestoneIconClass(milestone) {
                var classes = ['w-6 h-6'];

                //  If the user subscribed but the subscription has expired
                if(milestone.type == 'subscribed' && milestone.status == false && milestone.subscriptionEndAt != null) {
                    classes.push('text-yellow-400');
                }else{
                    classes.push('text-green-500');
                }

                return classes;
            },
            navigateToAddCoupon() {
                this.$router.push({ name: 'create-store-coupon', params: { 'store_href': this.store._links.showStore } });
            },
            navigateToAddProduct() {
                this.$router.push({ name: 'create-store-product', params: { 'store_href': this.store._links.showStore } });
            },
            navigateToInviteTeamMember() {
                this.$router.push({ name: 'invite-store-team-member', params: { 'store_href': this.store._links.showStore } });
            },
            showDeleteStoreConfirmationCode() {

                //  Start loader
                this.isLoadingDeleteCode = true;

                postApi(this.store._links.confirmDeleteStore).then(response => {

                    //  Stop loader
                    this.isLoadingDeleteCode = false;

                    if(response.status == 200) {

                        this.validDeleteConfirmationCode = response.data['code'];

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingDeleteCode = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteStore(hideModal) {

                //  Start loader
                this.isDeletingStore = true;

                var data = {
                    'code': this.deleteConfirmationCode
                };

                deleteApi(this.store._links.deleteStore, data).then(response => {

                    //  Stop loader
                    this.isDeletingStore = false;

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Store deleted');

                        /**
                         *  After setting the isDeletingStore to false, we need to wait until the nextTick()
                         *  so that the ConfirmModal isLoading propery updates. This allows the watcher of
                         *  the ConfirmModal to auto close the modal once isLoading is set to false. We
                         *  need to wait for the state change so that the modal is closed gracefully
                         *  before we navigate away, otherwise the modal backdrop is not removed.
                         */
                        this.$nextTick(() => {

                            //  Unset the store
                            this.storeState.store = null;

                            //  Navigate to dashboard
                            this.$router.replace({ name: 'dashboard', query: { deletedStore: true } });

                        });

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingStore = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
        },
        mounted() {

        },
        created() {

        }
    };

</script>
