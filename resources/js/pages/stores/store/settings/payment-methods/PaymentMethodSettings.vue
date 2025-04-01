<template>

    <div class="bg-white shadow-lg border p-8 rounded-lg mb-4">

        <template v-if="!paymentMethod">

            <!-- Title -->
            <h1 class="flex items-center text-lg font-bold mb-2">
                <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                <span>Payment Methods</span>
            </h1>

            <!-- Description -->
            <p class="text-sm text-gray-500">
                Choose how your customers can pay for their orders to make shopping simple and easy for them.
            </p>

        </template>

        <div class="space-y-4 mt-8">

            <!-- Form Error Messages -->
            <FormErrorMessages></FormErrorMessages>

            <!-- Save Changes Info Alert -->
            <Alert v-if="mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>Please save your changes</span>
                </div>

                <div class="flex items-center space-x-2">

                    <!-- Undo Button -->
                    <Button type="light" size="xs" :action="setFormFields">
                        <span>Undo</span>
                    </Button>

                    <!-- Save Changes Button -->
                    <Button type="primary" size="xs" :action="updatePaymentMethod" :loading="isSubmitting" class="w-40">
                        Save Changes
                    </Button>

                </div>

            </Alert>

            <template v-if="isShowingNonAssociatedPaymentMethods && !paymentMethod">

                <div class="flex items-center space-x-20">

                    <!-- Back Button -->
                    <Button type="light" size="xs" :action="openPaymentMethods" class="w-40">
                        <span>Back</span>
                    </Button>

                    <!-- Filter Badges (All, Manual & Automated) -->
                    <div class="flex items-center space-x-2">

                        <Pill
                            size="sm"
                            :key="index"
                            :showDot="false"
                            :action="() => changePaymentCategory(paymentCategory)"
                            v-for="(paymentCategory, index) in paymentCategories"
                            :type="selectedPaymentCategory == paymentCategory ? 'primary' : 'info'">
                            {{ paymentCategory }}
                        </Pill>

                        <span class="text-4xl pl-8">👈</span>

                    </div>

                </div>

                <!-- Filter Information -->
                <div class="flex items-center border rounded-lg px-4 py-2 text-sm text-gray-500 mt-40">

                    <!-- Filter Icon -->
                    <svg v-if="selectedPaymentCategory == 'Automated'" class="w-6 h-6 flex-shrink-0 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <svg v-else class="w-6 h-6 flex-shrink-0 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    <!-- Filter Description -->
                    <span>
                        <template v-if="selectedPaymentCategory == 'Manual'">Select a manual payment method to add to your store. These are payment methods that will require you to confirm the payment manually and update the order payment status yourself.</template>
                        <template v-else-if="selectedPaymentCategory == 'Local'">Select a local payment method to add to your store. These are payment methods that will require you to confirm the payment manually and update the order payment status yourself.</template>
                        <template v-else-if="selectedPaymentCategory == 'Automated'">Select an automated payment method to add to your store. These are payment methods that do not require you to confirm the payment. They are confirmed automatically by the system.</template>
                    </span>
                </div>

            </template>

            <!-- Payment Method Fields -->
            <div v-if="paymentMethod" class="w-4/5 mx-auto space-y-4">

                <!-- Back Button -->
                <Button type="light" size="xs" :action="paymentMethod.storeId ? openPaymentMethods : openNonAssociatedPaymentMethods" class="w-40">
                    <span>Back</span>
                </Button>

                <div class="space-y-4 shadow-lg rounded-lg border p-4">

                    <!-- Logo / Icon -->
                    <div class="flex justify-center">
                        <img v-if="paymentMethod" class="w-16 h-16 flex-shrink-0 rounded-full shadow" :src="paymentMethod._attributes.image_url" />
                    </div>

                    <!-- Active Toggle Switch -->
                    <ToggleSwitch
                        size="md"
                        v-model="form.active"
                        labelPopoverTitle="What Is This?"
                        :errorText="formState.getFormError('active')"
                        labelPopoverDescription="Turn on so that your payment method is made available to customers. Turn off so that your payment method not available to customers">
                        Active
                    </ToggleSwitch>

                    <!-- Name Input -->
                    <TextInput
                        label="Name"
                        v-model="form.name"
                        placeholder="PerfectPay"
                        :errorText="formState.getFormError('name')"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="The payment method name e.g PerfectPay">
                    </TextInput>

                    <!-- Instruction Textarea -->
                    <TextareaInput
                        :rows="2"
                        label="Instruction"
                        v-model="form.instruction"
                        labelPopoverTitle="What Is This?"
                        :errorText="formState.getFormError('instruction')"
                        placeholder="Pay using our perfect pay QR Code"
                        labelPopoverDescription="The payment method instructions to guide the customer on how to pay">
                    </TextareaInput>

                    <template v-if="!isAutomatedPaymentMethod">

                        <!-- Contact Seller Before Payment Checkbox -->
                        <Checkbox
                            size="xs"
                            v-model="form.contactSellerBeforePayment"
                            :errorText="formState.getFormError('contactSellerBeforePayment')">
                            <div class="space-y-1 mt-0.5">
                                <p class="font-bold text-sm mx-2">Contact seller before payment</p>
                                <p class="text-sm text-gray-500 mx-2">Customers can reach out to the seller before making a payment. This encourages inquiries, fosters trust, and helps reduce the likelihood of cancellations.</p>
                            </div>
                        </Checkbox>

                        <!-- Require Proof Of Payment Checkbox -->
                        <Checkbox
                            size="xs"
                            v-model="form.requireProofOfPayment"
                            :errorText="formState.getFormError('requireProofOfPayment')">
                            <div class="space-y-1 mt-0.5">
                                <p class="font-bold text-sm mx-2">Require proof of payment</p>
                                <p class="text-sm text-gray-500 mx-2">Customers should always upload their proof of payment e.g Screenshot, receipt, bank transfer confirmation, or any other proof of payment.</p>
                            </div>
                        </Checkbox>

                        <!-- Automatically Mark As Paid Checkbox -->
                        <Checkbox
                            size="xs"
                            v-model="form.automaticallyMarkAsPaid"
                            :errorText="formState.getFormError('automaticallyMarkAsPaid')">
                            <div class="space-y-1 mt-0.5">
                                <p class="font-bold text-sm mx-2">Mark as paid on customer confirmation</p>
                                <p class="text-sm text-gray-500 mx-2">Automatically set the payment status to 'Paid' when the customer confirms their payment. Ideal for trusted customer relationships and for simplifying payment processes.</p>
                            </div>
                        </Checkbox>

                    </template>

                    <!-- Metadata Fields -->
                    <PaymentMethodMetadataSettings v-if="form.metadata" v-model="form.metadata" :paymentMethod="paymentMethod"></PaymentMethodMetadataSettings>

                    <!-- Save Changes Button -->
                    <template v-if="paymentMethod.storeId">
                        <Button type="primary" size="xs" :action="() => updatePaymentMethod()" :disabled="!mustSaveChanges" class="w-full mt-8">
                            <span>Save Changes</span>
                        </Button>
                    </template>

                    <!-- Add Payment Method Button -->
                    <template v-else>
                        <Button type="primary" size="xs" :action="() => createStorePaymentMethod()" class="w-full mt-8">
                            <span>Add Payment Method</span>
                        </Button>
                    </template>

                </div>
            </div>

            <template v-else>

                <!-- Search Input -->
                <SearchInput v-if="hasSearchTerm || hasPaymentMethods" v-model="searchTerm" :isSearching="isSearching"></SearchInput>

                <!-- Non Associated Payment Methods (Loading Placeholder) -->
                <div v-if="isShowingNonAssociatedPaymentMethods && isLoadingNonAssociatedPaymentMethods" class="space-y-2">

                    <div v-for="(_, index) in [1,2,3]" :key="index" class="border shadow-sm rounded-lg p-4 bg-gray-50">
                        <div class="w-full flex items-center justify-between">
                            <div class="w-full flex items-center space-x-2">
                                <LineSkeleton width="w-8" height="h-8" :shine="true"></LineSkeleton>
                                <LineSkeleton width="w-32" :shine="true"></LineSkeleton>
                            </div>
                            <LineSkeleton width="w-16" :shine="true"></LineSkeleton>
                        </div>
                    </div>

                </div>

                <!-- Non Associated Payment Methods -->
                <div v-else-if="isShowingNonAssociatedPaymentMethods" class="space-y-2">

                    <div
                        :key="index"
                        @click="() => selectPaymentMethod(nonAssociatedPaymentMethod)"
                        v-for="(nonAssociatedPaymentMethod, index) in nonAssociatedPaymentMethods"
                        class="border shadow-sm rounded-lg p-4 bg-gray-50 cursor-pointer hover:border-blue-200 hover:bg-blue-50 group">

                        <!-- Payment Method -->
                        <div class="w-full flex items-center justify-between">

                            <div class="flex items-center space-x-2">

                                <!-- Logo -->
                                <img class="w-8 h-8 flex-shrink-0 rounded-full shadow" :src="settings.appApiUrl+'/images/payment-method-logos/'+nonAssociatedPaymentMethod.type+'.jpg'" />

                                <!-- Name -->
                                <h1 class="text-sm font-semibold">{{ nonAssociatedPaymentMethod.name }}</h1>

                            </div>

                            <div class="flex items-center space-x-2">

                                <!-- Add Payment Method Hint -->
                                <span class="hidden group-hover:block text-sm text-blue-500">Add</span>

                                <!-- Forward Arrow -->
                                <svg class="w-6 h-6 group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>

                            </div>
                        </div>

                    </div>

                    <!-- No Non Associated Payment Methods -->
                    <div v-if="!hasNonAssociatedPaymentMethods">

                        <div class="flex items-center space-x-2 p-4 border rounded-lg bg-gray-50">
                            <svg class="w-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                            <p class="text-gray-500 text-sm">No payment methods found</p>
                        </div>

                    </div>

                </div>

                <!-- Store Payment Methods (Loading Placeholder) -->
                <template v-else-if="isLoadingPaymentMethods">

                    <div v-for="(_, index) in [1,2,3]" :key="index" class="border shadow-sm rounded-lg p-4 bg-gray-50">
                        <ShineEffect class="w-full flex items-center justify-between">
                            <div class="w-full flex items-center space-x-2">
                                <LineSkeleton width="w-8" height="h-8"></LineSkeleton>
                                <LineSkeleton width="w-32"></LineSkeleton>
                            </div>
                            <div class="flex items-center">
                                <LineSkeleton width="w-24" class="mr-4"></LineSkeleton>
                                <LineSkeleton width="w-4" class="mr-2"></LineSkeleton>
                                <LineSkeleton width="w-4"></LineSkeleton>
                            </div>
                        </ShineEffect>
                    </div>

                </template>

                <!-- Store Payment Methods -->
                <template v-else>

                    <draggable
                        class="space-y-2"
                        v-model="paymentMethods"
                        handle=".draggable-handle"
                        ghost-class="bg-yellow-50"
                        @change="updatePaymentMethodArrangement">
                        <div v-for="(paymentMethod, index) in paymentMethods" @click="() => selectPaymentMethod(paymentMethod)" :key="index" class="flex items-center justify-between space-x-4 border shadow-sm rounded-lg p-4 bg-gray-50 cursor-pointer hover:border-blue-200 hover:bg-blue-50 group">

                            <!-- Payment Method -->
                            <div class="w-full flex items-center justify-between">
                                <div class="flex items-center space-x-2">

                                    <!-- Logo -->
                                    <img class="w-8 h-8 flex-shrink-0 rounded-full shadow" :src="settings.appApiUrl+'/images/payment-method-logos/'+paymentMethod.type+'.jpg'" />


                                    <!-- Name -->
                                    <h1 class="text-sm font-semibold">{{ paymentMethod.name }}</h1>

                                </div>

                                <div class="flex items-center space-x-2">

                                    <!-- Category Badge (Manual / Automated) -->
                                    <Pill :type="paymentMethod.category.toLowerCase() === 'automated' ? 'primary' : 'info'" size="xs" :showDot="false">
                                        <svg v-if="paymentMethod.category.toLowerCase() === 'automated'" class="w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                        </svg>
                                        <span>{{ paymentMethod.category }}</span>
                                    </Pill>

                                    <!-- Active Status Badge -->
                                    <Pill :type="paymentMethod.active ? 'success' : 'warning'" size="xs" :showDot="false">{{ paymentMethod.active ? 'Active' : 'Inactive' }}</Pill>

                                </div>
                            </div>

                            <!-- Deleting Loader -->
                            <SpinningLoader v-if="isDeleting(paymentMethod)" type="danger">
                                <span class="text-xs ml-2">Deleting...</span>
                            </SpinningLoader>

                            <!-- Delete Button - Triggers Confirmation Modal -->
                            <svg v-else @click.stop.prevent="showDeleteConfirmationModal(paymentMethod)" class="w-4 h-4 cursor-pointer hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                            <!-- Drag & Drop Handle -->
                            <svg @click.stop class="draggable-handle w-4 h-4 cursor-grab hover:text-yellow-500 active:cursor-grabbing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>

                        </div>

                    </draggable>

                    <!-- No Payment Methods -->
                    <div v-if="!hasPaymentMethods">

                        <div class="flex justify-between items-center space-x-8 px-16 py-4 border rounded-lg bg-gray-50">

                            <svg class="w-80 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                            <div class="space-y-2">
                                <p v-if="hasSearchTerm" class="font-bold">No payment methods found.</p>
                                <p>Click the <Pill type="primary" size="xs" :showDot="false" :action="() => openNonAssociatedPaymentMethods()">+ Add Payment Method</Pill> button to offer your customers convenient payment methods on your store</p>
                            </div>
                        </div>

                    </div>

                </template>

                <template v-if="!paymentMethod && !isShowingNonAssociatedPaymentMethods">

                    <!-- Add Payment Method Button -->
                    <Button type="light" size="sm" :skeleton="isLoadingPaymentMethods" :action="() => openNonAssociatedPaymentMethods()">
                        <span class="ml-2">Add Payment Method</span>
                    </Button>

                </template>

            </template>

            <!-- Confirm Delete Payment Method -->
            <ConfirmModal v-if="deletablePaymentMethod" approveText="Delete" :approveAction="(hideModal) => deletePaymentMethod(hideModal)" :isLoading="isDeleting(deletePaymentMethod)">

                <template #content>
                    <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                    <p class="mb-8">Are you sure you want to delete <span class="font-bold text-black">{{ deletablePaymentMethod.name }}</span>?</p>
                </template>

            </ConfirmModal>

        </div>

    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import settings from '@Js/settings.js';
    import cloneDeep from 'lodash/cloneDeep';
    import Pill from '@Partials/pills/Pill.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import Button from '@Partials/buttons/Button.vue';
    import { VueDraggableNext } from 'vue-draggable-next';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import SearchInput from '@Partials/inputs/SearchInput.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import { getApi, putApi, postApi, postFileApi, deleteApi } from '@Repositories/api-repository.js';
    import PaymentMethodMetadataSettings from '@Pages/stores/store/settings/payment-methods/payment-method-metadata-settings/PaymentMethodMetadataSettings.vue';

    export default {
        inject: ['apiState', 'formState', 'notificationState'],
        components: {
            Pill, Alert, Button, draggable: VueDraggableNext, TextInput, Checkbox,
            SearchInput, ConfirmModal, ShineEffect, TextareaInput, SpinningLoader,
            LineSkeleton, ToggleSwitch, FormErrorMessages, PaymentMethodMetadataSettings
        },
        data() {
            return {
                form: null,
                searchTerm: '',
                paymentMethods: [],
                settings: settings,
                originalForm: null,
                isSubmitting: false,
                paymentMethod: null,
                deletablePaymentMethod: null,
                isDeletingPaymentMethodIds: [],
                isLoadingPaymentMethods: false,
                nonAssociatedPaymentMethods: [],
                selectedPaymentCategory: 'Automated',
                isUpdatingPaymentMethodArrangement: false,
                isShowingNonAssociatedPaymentMethods: false,
                isLoadingNonAssociatedPaymentMethods: false,
                paymentCategories: ['All', 'Manual', 'Local', 'Automated']
            }
        },
        watch: {
            searchTerm(newValue, oldValue) {
                if(this.isShowingNonAssociatedPaymentMethods) {
                    this.showNonAssociatedPaymentMethods();
                }else{
                    this.showPaymentMethods();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isSearching() {
                return this.hasSearchTerm && (this.isLoadingPaymentMethods || this.isLoadingNonAssociatedPaymentMethods);
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            },
            hasPaymentMethods() {
                return this.paymentMethods.length > 0;
            },
            isAutomatedPaymentMethod() {
                return this.paymentMethod && this.paymentMethod._attributes.isAutomated;
            },
            hasNonAssociatedPaymentMethods() {
                return this.nonAssociatedPaymentMethods.length > 0;
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.formHasChanged && !this.isSubmitting;
            }
        },
        methods: {
            showDeleteConfirmationModal(paymentMethod) {
                this.deletablePaymentMethod = paymentMethod;
                /**
                 *  After setting the deletablePaymentMethod, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which opens the
                 *  confirmation modal dialog. This is so that when the dialog opens we don't
                 *  get an error trying to access the deletablePaymentMethod values. This
                 *  is only available on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(paymentMethod) {
                return this.isDeletingPaymentMethodIds.findIndex((id) => id == paymentMethod.id) != -1;
            },
            selectPaymentMethod(paymentMethod) {
                this.paymentMethod = paymentMethod;
                this.setFormFields();
            },
            setFormFields() {

                this.form = {
                    name: this.paymentMethod.name,
                    active: this.paymentMethod.active,
                    metadata: this.paymentMethod.metadata,
                    instruction: this.paymentMethod.instruction,
                    requireProofOfPayment: this.paymentMethod.requireProofOfPayment,
                    automaticallyMarkAsPaid: this.paymentMethod.automaticallyMarkAsPaid,
                    contactSellerBeforePayment: this.paymentMethod.contactSellerBeforePayment,
                };

                // Capture the original form before editing
                this.originalForm = cloneDeep(this.form);
            },
            openPaymentMethods() {
                this.form = null;
                this.searchTerm = '';
                this.originalForm = null;
                this.paymentMethod = null;
                this.isShowingNonAssociatedPaymentMethods = false;
                this.showPaymentMethods();
            },
            openNonAssociatedPaymentMethods() {
                this.form = null;
                this.searchTerm = '';
                this.originalForm = null;
                this.paymentMethod = null;
                this.isShowingNonAssociatedPaymentMethods = true;
                this.showNonAssociatedPaymentMethods();
            },
            changePaymentCategory(paymentCategory) {
                this.selectedPaymentCategory = paymentCategory;
                this.showNonAssociatedPaymentMethods();
            },
            showPaymentMethods() {

                //  Start loader
                this.isLoadingPaymentMethods = true;

                const params = {
                    'storeId': this.store.id,
                    'search': this.searchTerm
                };

                getApi(this.store._links['showStorePaymentMethods'], params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.paymentMethods = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingPaymentMethods = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingPaymentMethods = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            showNonAssociatedPaymentMethods() {

                //  Start loader
                this.isLoadingNonAssociatedPaymentMethods = true;

                const params = {
                    'nonAssociatedStoreId': this.store.id,
                    'search': this.searchTerm
                };

                if(this.selectedPaymentCategory != 'All' && !this.hasSearchTerm) params['_filters'] = 'category:eq:'+this.selectedPaymentCategory;

                getApi(this.apiState.apiHome['_links']['showPaymentMethods'], params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.nonAssociatedPaymentMethods = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingNonAssociatedPaymentMethods = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingNonAssociatedPaymentMethods = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            parseForm() {
                var data = cloneDeep(this.form);

                if(!this.paymentMethod.storeId) {

                    data['store_id'] = this.store.id;
                    data['type'] = this.paymentMethod.type;
                    data['category'] = this.paymentMethod.category;

                }

                return data;
            },
            createStorePaymentMethod() {

                this.formState.hideFormErrors();

                if(this.form.name.trim() == '') {

                    this.formState.setFormError('name', 'Enter payment method name');

                }else {

                    //  Start loader
                    this.isSubmitting = true;

                    postApi(this.apiState.apiHome._links['createPaymentMethod'], this.parseForm()).then(response => {

                        if(response.status == 200) {

                            if(response.data.created) {

                                this.originalForm = cloneDeep(this.form);

                                this.notificationState.showSuccessNotification('Payment method added');

                                this.openPaymentMethods();

                            }else{

                                this.formState.setFormError('general', response.data.message);
                                this.notificationState.showWarningNotification(response.data.message);

                            }

                        }

                        this.isSubmitting = false;

                    }).catch(errorException => {

                        this.isSubmitting = false;
                        this.formState.setServerFormErrors(errorException);

                    });

                }
            },
            updatePaymentMethod() {

                //  Start loader
                this.isSubmitting = true;

                putApi(this.paymentMethod._links.updatePaymentMethod, this.parseForm()).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            this.notificationState.showSuccessNotification('Payment method updated');

                            this.openPaymentMethods();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                        this.originalForm = cloneDeep(this.form);

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            updatePaymentMethodArrangement() {

                //  Start loader
                this.isUpdatingPaymentMethodArrangement = true;

                //  Set the query params
                const params = {
                    'storeId': this.store.id,
                    'paymentMethodIds': this.paymentMethods.map((paymentMethod) => paymentMethod.id)
                }

                postApi(this.apiState.apiHome['_links']['updatePaymentMethodArrangement'], params).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            this.notificationState.showSuccessNotification('Payment method arrangement updated');

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.isUpdatingPaymentMethodArrangement = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isUpdatingPaymentMethodArrangement = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deletePaymentMethod(hideModal) {

                //  Start loader
                this.isDeletingPaymentMethodIds.push(this.deletablePaymentMethod.id);

                deleteApi(this.deletablePaymentMethod._links.deletePaymentMethod).then(response => {

                    hideModal();

                    //  Stop loader
                    this.isDeletingPaymentMethodIds.splice(this.isDeletingPaymentMethodIds.findIndex((id) => id == this.deletePaymentMethod.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification('Payment method deleted');

                            //  If we are not deleting any other payment method, then refresh the payment method list
                            if(this.isDeletingPaymentMethodIds.length == 0) this.showPaymentMethods();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingPaymentMethodIds.splice(this.isDeletingPaymentMethodIds.findIndex((id) => id == this.deletePaymentMethod.id, 1));

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {

        },
        created() {
            this.showPaymentMethods();
        }
    };

</script>
