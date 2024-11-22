<template>

    <div>

        <div class="flex justify-between items-center border-dashed py-6">

            <div class="flex justify-start">

                <!-- Back Button -->
                <BackButton class="w-16 mr-4" :action="goBack"></BackButton>

                <div v-if="isLoadingOrder" class="flex items-center space-x-2">
                    <span class="text-2xl font-bold tracking-tight text-gray-300 animate-pulse">Order #</span>
                    <ShineEffect class="flex space-x-2">
                        <LineSkeleton width="w-12 mt-2"></LineSkeleton>
                        <LineSkeleton width="w-4 mt-2"></LineSkeleton>
                    </ShineEffect>
                </div>

                <div v-else class="flex items-center">

                    <TextHeader>{{ isCreating ? 'Add Order' : 'Order #'+order._attributes.number }}</TextHeader>

                    <!-- More Info Popover -->
                    <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Orders are requests placed by customers to purchase products or services from your store." placement="top"></MoreInfoPopover>

                </div>

            </div>

            <div v-if="isEditting" class="flex space-x-1 items-center">
                <ShineEffect v-if="isLoadingOrder" class="flex space-x-2">
                    <LineSkeleton width="w-20"></LineSkeleton>
                    <LineSkeleton width="w-32"></LineSkeleton>
                    <LineSkeleton width="w-4"></LineSkeleton>
                </ShineEffect>
                <template v-else>
                    <span>Created:</span>
                    <span class="font-bold">{{ formattedDatetime(order.createdAt) }}</span>
                    <MoreInfoPopover :title="formattedRelativeDate(order.createdAt)" placement="top"></MoreInfoPopover>
                </template>
            </div>

        </div>

        <!-- Order Form -->
        <form class="relative" action="#" method="POST">

            <!-- General Error Info Alert -->
            <Alert v-if="mustCreate || mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{{ isCreating ? 'Create your order' : 'Please save your changes'}}</span>
                </div>

                <!-- Create Order / Save Changes Button -->
                <PrimaryButton :action="isCreating ? createOrder : updateOrder" :loading="isSubmitting" class="w-40">
                    {{ isCreating ? 'Create Order' : 'Save Changes' }}
                </PrimaryButton>

            </Alert>

            <div class="grid grid-cols-12 gap-4 mb-8">

                <div class="col-span-8">

                    <!-- General Error Info Alert -->
                    <Alert v-if="getFormError('general')" type="warning" class="shadow mb-4">
                        {{ getFormError('general') }}
                    </Alert>

                    <div class="bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4">

                        <div class="flex items-center justify-between">

                            <div class="w-full flex items-center space-x-2">
                                <span class="text-xs">Status:</span>
                                <ShineEffect v-if="isLoadingOrder">
                                    <LineSkeleton width="w-24"></LineSkeleton>
                                </ShineEffect>
                                <OrderStatus v-else :order="order"></OrderStatus>
                            </div>

                            <div class="w-full flex items-center space-x-2">
                                <span class="text-xs">Payment Status:</span>
                                <ShineEffect v-if="isLoadingOrder">
                                    <LineSkeleton width="w-24"></LineSkeleton>
                                </ShineEffect>
                                <OrderPaymentStatus v-else :order="order"></OrderPaymentStatus>
                            </div>

                        </div>

                        <!-- Cancellation Reason Info Alert -->
                        <Alert v-if="order && order.cancellationReason" type="warning">
                            <div class="flex items-center">
                                <span>
                                    <svg class="w-4 h-4 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                                    </svg>
                                    <span class="mr-1">Cancellation Reason:</span>
                                </span>
                                <span class="font-bold">{{ order.cancellationReason }}</span>
                            </div>
                        </Alert>

                    </div>

                    <!-- Cart Summary -->
                    <CartSummary :order="order" :isLoadingOrder="isLoadingOrder"></CartSummary>

                    <!-- Payment Summary -->
                    <PaymentSummary :order="order" :isLoadingOrder="isLoadingOrder" :refreshOrder="getOrder">

                        <template #actionButtons>

                            <div class="flex justify-end space-x-2">

                                <!-- Mark As Paid Button Skeleton -->
                                <ButtonSkeleton v-if="isEditting && isLoadingOrder" size="xs">
                                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                        <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
                                        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                                    </svg>
                                    <span>Mark As Paid</span>
                                </ButtonSkeleton>

                                <!-- Mark As Paid Button -->
                                <PrimaryButton v-else-if="order && canMarkAsPaid" :action="confirmMarkAsPaid" :disabled="isMarkingAsPaid" :loading="isMarkingAsPaid" :type="canRequestPayment ? 'light' : 'success'" size="xs">
                                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                        <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
                                        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                                    </svg>
                                    <span>Mark As Paid</span>
                                </PrimaryButton>

                                <!-- Request Payment Button Skeleton -->
                                <ButtonSkeleton v-if="isEditting && isLoadingOrder" size="xs">
                                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                        <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
                                    </svg>
                                    <span>Request Payment</span>
                                </ButtonSkeleton>

                                <!-- Request Payment Button -->
                                <PrimaryButton v-else-if="order && canRequestPayment" :action="confirmRequestPayment" :disabled="isMarkingAsPaid" :loading="isMarkingAsPaid" type="success" size="xs">
                                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                        <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
                                    </svg>
                                    <span>Request Payment</span>
                                </PrimaryButton>

                            </div>

                        </template>

                    </PaymentSummary>

                </div>

                <div class="col-span-4 space-y-4">

                    <!-- Customer Summary -->
                    <CustomerSummary :order="order" :isLoadingOrder="isLoadingOrder"></CustomerSummary>

                    <!-- Collection Summary -->
                    <CollectionSummary :order="order" :isLoadingOrder="isLoadingOrder" :refreshOrder="getOrder"></CollectionSummary>

                    <div class="flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4">

                        <div class="space-y-4">

                            <p class="font-bold text-lg mb-4">Change Status</p>

                            <div v-if="isLoadingOrder">
                                <ShineEffect class="space-y-4">
                                    <div class="flex space-x-2">
                                        <LineSkeleton v-for="(followUpStatus, index) in 3" :key="index"></LineSkeleton>
                                    </div>
                                    <LineSkeleton width="w-32"></LineSkeleton>
                                </ShineEffect>
                            </div>

                            <div v-else-if="followUpStatuses.length > 0">
                                <span class="cursor-pointer hover:opacity-50 mr-1">
                                    <BadgeIndicator :type="statusBadgeType" :text="order.status.name" :showDot="false" class="border border-gray-500"></BadgeIndicator>
                                </span>
                                <span v-for="(followUpStatus, index) in followUpStatuses" :key="index" @click="confirmUpdateStatus(followUpStatus)" class="cursor-pointer mr-1">
                                    <BadgeIndicator type="info" :text="followUpStatus.name" :showDot="false" class="border border-transparent hover:border-gray-500"></BadgeIndicator>
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div v-if="order" :class="['space-y-4 shadow-lg rounded-lg border p-4', isLoadingOrder ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

                <!-- Delete Order Info -->
                <div class="flex items-center whitespace-pre">
                    <span>Do you want to permanently delete</span>
                    <ShineEffect v-if="isLoadingOrder">
                        <LineSkeleton width="w-20 mx-2"></LineSkeleton>
                    </ShineEffect>
                    <span v-else class="font-bold text-black"> Order #{{ order._attributes.number }} </span>
                    <span>? Once this order is deleted you will not be able to recover it.</span>
                </div>

                <div class="flex justify-end">

                    <ButtonSkeleton v-if="isEditting && isLoadingOrder">Delete Order</ButtonSkeleton>

                    <ConfirmModal v-else approveText="Delete Order" :approveAction="deleteOrder" :isLoading="isDeleting">

                        <template #content>
                            <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                            <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">Order #{{ order._attributes.number }}</span>?</p>
                        </template>

                        <template #trigger="triggerProps">

                            <!-- Delete Order Button - Triggers Confirmation Modal -->
                            <PrimaryButton @click="triggerProps.showModal" :loading="isDeleting" class="w-40" type="danger">
                                Delete Order
                            </PrimaryButton>

                        </template>


                    </ConfirmModal>

                </div>

            </div>

            <!-- Update Status Modal -->
            <ConfirmModal
                v-if="order && followUpStatus"
                declineText="Cancel" declineType="light"
                :isLoading="isUpdatingOrderStatus" :autoHide="false"
                :approveText="followUpStatus.name" approveType="primary"
                :approveAction="(hideModal) => updateOrderStatus(followUpStatus.name, hideModal)">

                <template #content>
                    <p class="text-lg border-b border-dashed pb-4 mb-4">Mark As <span class="font-bold">{{ followUpStatus.name }}</span></p>
                    <p class="mb-4">{{ followUpStatus.description }}</p>

                    <div :class="{ 'mb-8 space-y-4' : followUpStatus.name.toLowerCase() == 'completed' || followUpStatus.name.toLowerCase() == 'cancelled' }">

                        <template v-if="followUpStatus.name.toLowerCase() == 'completed' && !isVerified">

                            <!-- Collection Code Instruction (Seller) -->
                            <Alert>{{ order._attributes.dialToShowCollectionCode.instruction }}</Alert>

                            <!-- Collection Code Input -->
                            <OtpInput v-model="collectionCode" :errorText="getFormError('collectionCode')"></OtpInput>

                            <!-- Collection Note Textarea -->
                            <TextareaInput v-model="collectionNote"
                                label="Note (Optional)" _placeholder="Collected by John Doe" :_rows="2"
                                :errorText="getFormError('collectionNote')"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Important note regarding this order collection e.g Collected by John Doe">
                            </TextareaInput>

                        </template>

                        <template v-else-if="followUpStatus.name.toLowerCase() == 'cancelled'">

                            <div class="border-b border-dashed"></div>

                            <!-- Cancellation Reason Select -->
                            <SelectInput
                                width="w-full"
                                v-model="cancellationReason"
                                labelPopoverTitle="What Is This?"
                                label="Cancellation Reason (Optional)"
                                :errorText="getFormError('cancellationReason')"
                                labelPopoverDescription="A reason for why you are cancelling this order. This helps you keep a record for your cancelled orders">
                                <option></option>
                                <option v-for="(cancellationReason, index) in cancellationReasons" :value="cancellationReason" :key="index">
                                    {{ cancellationReason }}
                                </option>
                            </SelectInput>

                        </template>

                    </div>

                </template>

                <template #trigger="triggerProps">

                    <!-- Update Status Button - Triggers Confirmation Modal -->
                    <PrimaryButton ref="confirmUpdateOrderStatus" @click="triggerProps.showModal" class="hidden">
                        {{ followUpStatus.name }}
                    </PrimaryButton>

                </template>

            </ConfirmModal>

            <!-- Request Payment Modal -->
            <ConfirmModal
                v-if="order"
                approveText="Yes" declineText="No"
                :autoHide="false" :isLoading="isRequestingPayment"
                approveType="primary" :approveAction="(hideModal) => requestPayment(hideModal)">

                <template #content>

                    <div>

                        <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Request Payment</p>

                        <Alert class="mb-4">Request a payment for this order using <span class="font-bold">Direct Pay Online</span> or <span class="font-bold">Orange Money</span></Alert>

                        <div class="space-y-4 mb-4">

                            <!-- Payment Method Select -->
                            <SelectInput
                                width="w-full"
                                label="Payment Method"
                                labelPopoverTitle="What Is This?"
                                v-model="_requestPayment.paymentMethodId"
                                :errorText="getFormError('paymentMethod')"
                                labelPopoverDescription="Select the payment method used to pay for this order e.g DPO (Direct Pay Online) or Orange Money">
                                <option v-for="(paymentMethod, index) in _requestPayment.paymentMethods" :value="paymentMethod.id.toString()" :key="index">
                                    {{ paymentMethod.name }}
                                </option>
                            </SelectInput>

                            <!-- Amount Select -->
                            <SelectInput
                                width="w-full"
                                label="Amount"
                                v-model="_requestPayment.percentage"
                                labelPopoverTitle="What Is This?"
                                :errorText="getFormError('percentage')"
                                labelPopoverDescription="Select the amonunt that has been paid">
                                <option v-for="(payableAmount, index) in order._attributes.payableAmounts" :value="payableAmount.percentage.toString()" :key="index">
                                    {{ payableAmount.name }}
                                </option>
                            </SelectInput>

                        </div>

                    </div>

                </template>

                <template #trigger="triggerProps">

                    <!-- Request Payment Button - Triggers Confirmation Modal -->
                    <PrimaryButton ref="confirmRequestPayment" @click="triggerProps.showModal" class="hidden">
                        Request Payment
                    </PrimaryButton>

                </template>


            </ConfirmModal>

            <!-- Mark As Paid Modal -->
            <ConfirmModal
                v-if="order"
                approveText="Yes" declineText="No"
                :autoHide="false" :isLoading="isMarkingAsPaid"
                approveType="primary" :approveAction="(hideModal) => markAsUnverifiedPayment(hideModal)">

                <template #content>

                    <div>

                        <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Mark As Paid</p>

                        <Alert class="mb-4">Mark this order as paid if you received payment from the customer via cash, ewallet, card swipping or any other way</Alert>

                        <div class="space-y-4 mb-4">

                            <!-- Amount Select -->
                            <SelectInput
                                width="w-full"
                                label="Amount"
                                v-model="markAsPaid.percentage"
                                labelPopoverTitle="What Is This?"
                                :errorText="getFormError('percentage')"
                                labelPopoverDescription="Select the amonunt that has been paid">
                                <option v-for="(payableAmount, index) in order._attributes.payableAmounts" :value="payableAmount.percentage.toString()" :key="index">
                                    {{ payableAmount.name }}
                                </option>
                            </SelectInput>

                            <!-- Payment Method Select -->
                            <SelectInput
                                width="w-full"
                                label="Payment Method"
                                labelPopoverTitle="What Is This?"
                                v-model="markAsPaid.paymentMethodId"
                                :errorText="getFormError('paymentMethod')"
                                labelPopoverDescription="Select the payment method used to pay for this order e.g Cash">
                                <option v-for="(paymentMethod, index) in markAsPaid.paymentMethods" :value="paymentMethod.id.toString()" :key="index">
                                    {{ paymentMethod.name }}
                                </option>
                            </SelectInput>

                        </div>

                    </div>

                </template>

                <template #trigger="triggerProps">

                    <!-- Mark As Paid Button - Triggers Confirmation Modal -->
                    <PrimaryButton ref="confirmMarkAsPaid" @click="triggerProps.showModal" class="hidden">
                        Mark As Paid
                    </PrimaryButton>

                </template>


            </ConfirmModal>

        </form>

    </div>

</template>

<script>
    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import InputTags from '@Partials/inputs/InputTags.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import OrderStatus from '@Components/order/OrderStatus.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import SelectInputTags from '@Partials/inputs/SelectInputTags.vue';
    import ButtonSkeleton from '@Partials/skeletons/ButtonSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import LoadingBackdrop from '@Partials/backdrops/LoadingBackdrop.vue';
    import CartSummary from '@Components/order/cart-summary/CartSummary.vue';
    import OrderPaymentStatus from '@Components/order/OrderPaymentStatus.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import PaymentSummary from '@Components/order/payment-summary/PaymentSummary.vue';
    import CustomerSummary from '@Components/order/customer-summary/CustomerSummary.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import CollectionSummary from '@Components/order/collection-summary/CollectionSummary.vue';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Alert, TextInput, TextHeader, InputTags, BackButton, NumberInput, SelectInput, OrderStatus, ConfirmModal,
            ShineEffect, TextareaInput, LineSkeleton, PrimaryButton, SpiningLoader, OtpInput, SelectInputTags, ButtonSkeleton,
            MoreInfoPopover, LoadingBackdrop, CartSummary, OrderPaymentStatus, BadgeIndicator, PaymentSummary,
            CustomerSummary, CollectionSummary
        },
        data() {
            return {
                form: {
                    number: '',
                },
                markAsPaid: {
                    percentage: null,
                    paymentMethods: [],
                    paymentMethodId: null,
                    proofOfPaymentPhoto: null,
                },
                _requestPayment: {
                    percentage: null,
                    paymentMethods: [],
                    paymentMethodId: null,
                },
                order: null,
                isDeleting: false,
                originalForm: null,
                collectionCode: '',
                collectionNote: '',
                isSubmitting: false,
                markAsPaidAmount: 0,
                followUpStatus: null,
                isLoadingOrder: false,
                cancellationReason: '',
                isMarkingAsPaid: false,
                cancellationReasons: [],
                apiState: useApiState(),
                markAsPaidPercentage: 0,
                proofOfPaymentPhoto: null,
                isRequestingPayment: false,
                storeState: useStoreState(),
                isUpdatingOrderStatus: false,
                payableAmountPercentage: null,
                isLoadingCancellationReasons: false,
            }
        },
        watch: {
            '$route.params.order_href'(newValue, oldValue) {

                // Scroll to the top whenever $route.params.order_href changes
                window.scrollTo(0, 0);

                //  Get the order matching the route order_href
                this.getOrder();

            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isVerified() {
                return ((this.order || {}).collectionVerified || {}).status;
            },
            canMarkAsPaid() {
                return ((this.order || {})._attributes || {}).canMarkAsPaid;
            },
            followUpStatuses() {
                return ((this.order || {})._attributes || {}).followUpStatuses;
            },
            canRequestPayment() {
                return ((this.order || {})._attributes || {}).canRequestPayment;
            },
            mobileVerificationShortcode() {
                return this.apiState.apiHome['mobileVerificationShortcode'];
            },
            isCreating() {
                return this.$route.name === 'create-store-order';
            },
            isEditting() {
                return this.$route.name === 'show-store-order';
            },
            statusBadgeType() {

                var status = ((this.order || {}).status || {}).name.toLowerCase();

                if(status == 'completed') {
                    return 'success';
                }else if(status == 'cancelled') {
                    return 'warning';
                }else if(status == 'on its way') {
                    return 'primary';
                }else if(status == 'ready for pickup') {
                    return 'primary';
                }else{
                    return 'info';
                }
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.isEditting && this.formHasChanged && !this.isLoadingOrder && !this.isSubmitting;
            },
            mustCreate() {
                return this.isCreating && this.formHasChanged && !this.isLoadingOrder && !this.isSubmitting;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({ name: 'show-store-orders', params: { 'store_href': this.store._links.showStore } });
            },
            setOrderFields() {

                this.form.number = this.order.number;

                if( this.order._attributes.payableAmounts.length ) {
                    this._requestPayment.percentage = this.order._attributes.payableAmounts[0].percentage.toString();
                    this.markAsPaid.percentage = this.order._attributes.payableAmounts[0].percentage.toString();
                }

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            confirmUpdateStatus(followUpStatus) {

                this.followUpStatus = followUpStatus;

                if(this.followUpStatus.name.toLowerCase() == 'cancelled' && this.cancellationReasons.length == 0) {
                    this.getCancellationReasons();
                }

                /**
                 *  After setting the followUpStatus, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  followUpStatus.name value. This is only available
                 *  on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmUpdateOrderStatus.$el.click();
                });
            },
            confirmMarkAsPaid() {
                this.$refs.confirmMarkAsPaid.$el.click();
            },
            confirmRequestPayment() {
                this.$refs.confirmRequestPayment.$el.click();
            },
            getOrder() {

                //  Start loader
                this.isLoadingOrder = true;

                //  Set the query params
                const params = {
                    '_relationships': 'cart,customer,occasion,collectionVerifiedByUser'
                }

                getApi(this.$route.params.order_href, params).then(response => {

                    if(response.status == 200) {

                        if(response.data.exists) {

                            this.order = response.data.order;
                            this.setOrderFields();

                            if(this.canRequestPayment && this._requestPayment.paymentMethods.length == 0) {
                                this.showPaymentMethodsForRequestingOrderPayment();
                            }

                            if(this.markAsPaid.paymentMethods.length == 0) {
                                this.showPaymentMethodsForMarkingAsPaid();
                            }

                        }else{

                            this.notificationState.addWarningNotification('This order does not exist');

                            //  Navigate to show orders
                            this.$router.push({ name: 'show-store-orders', params: { 'store_href': this.store._links.showStore } });

                        }
                    }

                    //  Stop loader
                    this.isLoadingOrder = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingOrder = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            showPaymentMethodsForRequestingOrderPayment() {

                //  Start loader
                this.isLoadingPaymentMethodsForMarkingAsPaidForRequestingOrderPayment = true;

                getApi(this.order._links.showPaymentMethodsForRequestingOrderPayment).then(response => {

                    if(response.status == 200) {

                        this._requestPayment.paymentMethods = response.data.data;

                        if(this._requestPayment.paymentMethods.length) {
                            this._requestPayment.paymentMethodId = this._requestPayment.paymentMethods[0].id.toString();
                        }

                    }

                    //  Stop loader
                    this.isLoadingPaymentMethodsForMarkingAsPaidForRequestingOrderPayment = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingPaymentMethodsForMarkingAsPaidForRequestingOrderPayment = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            showPaymentMethodsForMarkingAsPaid() {

                //  Start loader
                this.isLoadingPaymentMethodsForMarkingAsPaid = true;

                getApi(this.order._links.showPaymentMethodsForMarkingAsPaid).then(response => {

                    if(response.status == 200) {

                        this.markAsPaid.paymentMethods = response.data.data;

                        if(this.markAsPaid.paymentMethods.length) {
                            this.markAsPaid.paymentMethodId = this.markAsPaid.paymentMethods[0].id.toString();
                        }

                    }

                    //  Stop loader
                    this.isLoadingPaymentMethodsForMarkingAsPaid = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingPaymentMethodsForMarkingAsPaid = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            getCancellationReasons() {

                //  Start loader
                this.isLoadingCancellationReasons = true;

                getApi(this.order._links.showOrderCancellationReasons).then(response => {

                    if(response.status == 200) {

                        this.cancellationReasons = response.data;

                    }

                    //  Stop loader
                    this.isLoadingCancellationReasons = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingCancellationReasons = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            parseForm() {
                var data = cloneDeep(this.form);

                data.hoursOfDay = data.hoursOfDay.map(hourOfDay => hourOfDay.text );
                data.daysOfTheWeek = data.daysOfTheWeek.map(dayOfTheWeek => dayOfTheWeek.text );
                data.daysOfTheMonth = data.daysOfTheMonth.map(dayOfTheMonth => dayOfTheMonth.text );
                data.monthsOfTheYear = data.monthsOfTheYear.map(monthOfTheYear => monthOfTheYear.text );

                return data;
            },
            createOrder() {

                //  Start loader
                this.isSubmitting = true;

                postApi(this.store._links.createOrders, this.parseForm()).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order created');

                        //  Navigate to show orders
                        this.$router.push({ name: 'show-store-orders', params: { 'store_href': this.store._links.showStore } });

                        // Scroll to the top
                        window.scrollTo(0, 0);

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            updateOrder() {

                //  Start loader
                this.isSubmitting = true;

                putApi(this.order._links.showOrder, this.parseForm()).then(response => {

                    if(response.status == 200) {

                        this.originalForm = cloneDeep(this.form);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order updated');

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            updateOrderStatus(status, hideModal) {

                //  Start loader
                this.isUpdatingOrderStatus = true;

                var data = {
                    status: status
                };

                if(status.toLowerCase() == 'completed' && !this.isVerified) {
                    data.collectionCode = this.collectionCode;
                    if(this.collectionNote.trim() != '') data['collectionNote'] = this.collectionNote;
                }

                if(status.toLowerCase() == 'cancelled' && this.cancellationReason.trim() != '') {
                    data.cancellationReason = this.cancellationReason;
                }

                postApi(this.order._links.updateOrderStatus, data).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            hideModal();

                            this.getOrder();

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Order updated');

                        }else{

                            this.notificationState.addWarningNotification(response.data.message);

                        }

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
            requestPayment(hideModal) {

                //  Start loader
                this.isRequestingPayment = true;

                var data = {
                    'percentage': this._requestPayment.percentage,
                    'paymentMethodId': this._requestPayment.paymentMethodId,
                };

                return postApi(this.order._links.requestPayment, data).then(response => {

                    if(response.status == 200) {

                        hideModal();

                        this.getOrder();

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Payment requested');

                    }

                    //  Stop loader
                    this.isRequestingPayment = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isRequestingPayment = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            markAsUnverifiedPayment(hideModal) {

                //  Start loader
                this.isMarkingAsPaid = true;

                var data = {
                    'percentage': this.markAsPaid.percentage,
                    'paymentMethodId': this.markAsPaid.paymentMethodId,
                    'proofOfPaymentPhoto': this.markAsPaid.proofOfPaymentPhoto,
                };

                if(this.markAsPaidAmount) {
                    data.amount = this.markAsPaidAmount;
                }else if(this.markAsPaidPercentage) {
                    data.percentage = this.markAsPaidPercentage;
                }

                postApi(this.order._links.markAsUnverifiedPayment, data).then(response => {

                    if(response.status == 200) {

                        this.getOrder();

                        if(hideModal) hideModal();

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order marked as paid');

                    }

                    //  Stop loader
                    this.isMarkingAsPaid = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isMarkingAsPaid = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteOrder() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.order._links.deleteOrder).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order deleted');

                        //  Navigate to show orders
                        this.$router.push({ name: 'show-store-orders', params: { 'store_href': this.store._links.showStore } });

                        // Scroll to the top
                        window.scrollTo(0, 0);

                    }

                    //  Stop loader
                    this.isDeleting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeleting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
        },
        created() {
            this.originalForm = cloneDeep(this.form);
            if(this.isEditting) this.getOrder();
        }
    };

</script>
