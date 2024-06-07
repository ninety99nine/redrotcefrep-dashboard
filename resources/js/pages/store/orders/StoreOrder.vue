<template>

    <div>

        <div class="flex justify-between items-center border-dashed border-b py-6 mb-6">

            <div class="flex justify-start">

                <!-- Back Button -->
                <BackButton class="w-16 mr-4"></BackButton>

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
        <form class="relative mt-10" action="#" method="POST">

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

                    <div class="shadow-lg rounded-lg border space-y-4 p-4 mb-4">

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
                            <span>
                                <svg class="w-6 h-6 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                                </svg>
                                <span class="font-bold mr-1">Cancellation Reason:</span>
                            </span>
                            <span>{{ order.cancellationReason }}</span>
                        </Alert>

                    </div>

                    <!-- General Error Info Alert -->
                    <Alert v-if="getFormError('general')" type="warning" class="shadow mb-4">
                        {{ getFormError('general') }}
                    </Alert>

                    <!-- Cart Summary -->
                    <CartSummary :order="order" :isLoadingOrder="isLoadingOrder"></CartSummary>

                    <OrderTransactions :order="order"></OrderTransactions>

                    <!-- Payment Summary -->
                    <PaymentSummary :order="order" :isLoadingOrder="isLoadingOrder" :refreshOrder="getOrder"></PaymentSummary>

                    <!-- Collection Summary -->
                    <CollectionSummary :order="order" :isLoadingOrder="isLoadingOrder"></CollectionSummary>

                    <!-- Customer Summary -->
                    <CustomerSummary :order="order" :isLoadingOrder="isLoadingOrder"></CustomerSummary>

                </div>

                <div class="col-span-4">

                    <div class="flex flex-col justify-between h-full shadow-lg rounded-lg border p-4">

                        <div class="space-y-8">

                            <div class="space-y-4">

                                <p class="font-bold text-lg mb-4">Change Status</p>

                                <div v-if="isLoadingOrder" class="flex items-center space-x-2">
                                    <ShineEffect>
                                        <LineSkeleton v-for="(followUpStatus, index) in 4" :key="index"></LineSkeleton>
                                    </ShineEffect>
                                </div>

                                <template v-else-if="followUpStatuses.length > 0">
                                    <span v-for="(followUpStatus, index) in followUpStatuses" :key="index" @click="confirmUpdateStatus(followUpStatus)" class="cursor-pointer hover:opacity-50 mr-1">
                                        <BadgeIndicator
                                            :active="false" :text="followUpStatus.name" inactiveType="info" :showDot="false">
                                        </BadgeIndicator>
                                    </span>
                                </template>

                            </div>

                            <div class="flex justify-end">

                                <div class="flex flex-col items-end space-y-4">

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

                                    <!-- Cancel / Uncancel Skeleton Button -->
                                    <ButtonSkeleton v-if="isEditting && isLoadingOrder" size="xs">
                                        <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
                                        </svg>
                                        <span>Cancel Order</span>
                                    </ButtonSkeleton>

                                    <!-- Cancel / Uncancel Button -->
                                    <PrimaryButton v-else-if="order" :action="order._attributes.isCancelled ? uncancelOrder : confirmCancelOrder" :loading="isCancelling || isUncancelling" :type="order._attributes.isCancelled ? 'light' : 'warning'" size="xs">
                                        <svg v-if="canCancel" class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
                                        </svg>
                                        <svg v-else-if="canUncancel" class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3" />
                                        </svg>
                                        <span class="whitespace-nowrap">{{ order._attributes.isCancelled ? 'Uncancel Order' : 'Cancel Order' }}</span>
                                    </PrimaryButton>

                                </div>

                            </div>

                        </div>

                        <div class="flex justify-end mt-8">

                            <ButtonSkeleton v-if="isLoadingOrder" class="w-40">{{ isCreating ? 'Create Order' : 'Save Changes' }}</ButtonSkeleton>

                            <!-- Create Order / Save Changes Button -->
                            <PrimaryButton v-else :action="isCreating ? createOrder : updateOrder" :disabled="(isCreating && !mustCreate) || (isEditting && !mustSaveChanges)" :loading="isSubmitting" class="w-40">
                                {{ isCreating ? 'Create Order' : 'Save Changes' }}
                            </PrimaryButton>

                        </div>

                    </div>

                </div>

            </div>

            <div v-if="order && canDelete" :class="['space-y-4 shadow-lg rounded-lg border p-4', isLoadingOrder ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

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
                approveText="Yes" declineText="No"
                :autoHide="false" :isLoading="isUpdatingOrderStatus"
                approveType="primary" :approveAction="(hideModal) => updateOrderStatus(followUpStatus.name, hideModal)">

                <template #content>
                    <p class="text-lg border-b border-dashed pb-4 mb-4">Mark As <span class="font-bold">{{ followUpStatus.name }}</span></p>
                    <p class="mb-8">{{ followUpStatus.description }}</p>

                    <div :class="{ 'mb-8 space-y-4' : followUpStatus.name == 'Completed' }">

                        <template v-if="followUpStatus.name == 'Completed'">

                            <!-- Collection Code Instruction (Seller) -->
                            <Alert>{{ order._attributes.dialToShowCollectionCode.instruction }}</Alert>

                            <!-- Collection Code Input -->
                            <OtpInput v-model="collectionCode" :errorText="getFormError('collectionCode')"></OtpInput>

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

            <!-- Cancel Order Modal -->
            <ConfirmModal
                v-if="order"
                approveText="Yes" declineText="No"
                :autoHide="false" :isLoading="isCancelling"
                approveType="primary" :approveAction="(hideModal) => cancelOrder(hideModal)">

                <template #content>
                    <p class="text-lg border-b border-dashed pb-4 mb-4">Mark As <span class="font-bold">Cancelled</span></p>
                    <p class="mb-4">Why are you cancelling this order?</p>

                    <div class="mb-8 space-y-4">

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

                    </div>

                </template>

                <template #trigger="triggerProps">

                    <!-- Cancel Order Button - Triggers Confirmation Modal -->
                    <PrimaryButton ref="confirmCancelOrder" @click="triggerProps.showModal" class="hidden">
                        Cancel Order
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
    import OrderTransactions from '@Components/order/transactions/OrderTransactions.vue';
    import CollectionSummary from '@Components/order/collection-summary/CollectionSummary.vue';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Alert, TextInput, TextHeader, InputTags, BackButton, NumberInput, SelectInput, OrderStatus, ConfirmModal,
            ShineEffect, LineSkeleton, PrimaryButton, SpiningLoader, OtpInput, SelectInputTags, ButtonSkeleton, MoreInfoPopover,
            LoadingBackdrop, CartSummary, OrderPaymentStatus, BadgeIndicator, PaymentSummary, CustomerSummary,
            OrderTransactions, CollectionSummary
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
                isCancelling: false,
                isSubmitting: false,
                markAsPaidAmount: 0,
                followUpStatus: null,
                isUncancelling: false,
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
            followUpStatuses() {
                return this.order._attributes.followUpStatuses;
            },
            mobileVerificationShortcode() {
                return this.apiState.apiHome['mobileVerificationShortcode'];
            },
            canCancel() {
                return this.order._attributes.canCancel;
            },
            canUncancel() {
                return this.order._attributes.canUncancel;
            },
            canDelete() {
                return this.order._attributes.canDelete;
            },
            canMarkAsPaid() {
                return this.order._attributes.canMarkAsPaid;
            },
            canRequestPayment() {
                return this.order._attributes.canRequestPayment;
            },
            isCreating() {
                return this.$route.name === 'create-store-order';
            },
            isEditting() {
                return this.$route.name === 'show-store-order';
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

                if(followUpStatus.name == 'Cancelled') {

                    this.confirmCancelOrder();

                }else{

                    this.followUpStatus = followUpStatus;

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

                }
            },
            confirmCancelOrder() {
                this.$refs.confirmCancelOrder.$el.click();
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
                    'withCart': '1',
                    'withCustomer': '1',
                }

                getApi(this.$route.params.order_href, params).then(response => {

                    if(response.status == 200) {

                        this.order = response.data;
                        this.setOrderFields();

                        if(this.cancellationReasons.length == 0) {
                            this.getCancellationReasons();
                        }

                        if(this.canRequestPayment && this._requestPayment.paymentMethods.length == 0) {
                            this.getRequestPaymentPaymentMethods();
                        }

                        if(this.markAsPaid.paymentMethods.length == 0) {
                            this.getMarkAsUnverifiedPaymentPaymentMethods();
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
            getRequestPaymentPaymentMethods() {

                //  Start loader
                this.isLoadingRequestPaymentPaymentMethods = true;

                getApi(this.order._links.showRequestPaymentPaymentMethods).then(response => {

                    if(response.status == 200) {

                        this._requestPayment.paymentMethods = response.data.data;

                        if(this._requestPayment.paymentMethods.length) {
                            this._requestPayment.paymentMethodId = this._requestPayment.paymentMethods[0].id.toString();
                        }

                    }

                    //  Stop loader
                    this.isLoadingRequestPaymentPaymentMethods = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingRequestPaymentPaymentMethods = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            getMarkAsUnverifiedPaymentPaymentMethods() {

                //  Start loader
                this.isLoadingPaymentMethods = true;

                getApi(this.order._links.showMarkAsUnverifiedPaymentPaymentMethods).then(response => {

                    if(response.status == 200) {

                        this.markAsPaid.paymentMethods = response.data.data;

                        if(this.markAsPaid.paymentMethods.length) {
                            this.markAsPaid.paymentMethodId = this.markAsPaid.paymentMethods[0].id.toString();
                        }

                    }

                    //  Stop loader
                    this.isLoadingPaymentMethods = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingPaymentMethods = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            getCancellationReasons() {

                //  Start loader
                this.isLoadingCancellationReasons = true;

                getApi(this.order._links.showCancellationReasons).then(response => {

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

                    if(response.status == 201) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order created');

                        //  Navigate to show orders
                        this.$router.push({ name: 'show-store-orders', params: { 'store_href': this.store._links.self } });

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

                putApi(this.order._links.self, this.parseForm()).then(response => {

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

                if(status == 'Cancelled') {

                    this.cancelOrder().then(response => {

                        hideModal();

                    });

                }else{

                    //  Start loader
                    this.isUpdatingOrderStatus = true;

                    var data = {
                        status: status
                    };

                    if(status == 'Completed') {
                        data.collectionCode = this.collectionCode;
                    }

                    putApi(this.order._links.updateStatus, data).then(response => {

                        if(response.status == 200) {

                            hideModal();

                            this.getOrder();

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Order updated');

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

                }

            },
            cancelOrder(hideModal) {

                //  Start loader
                this.isCancelling = true;

                var data = {};

                if(this.cancellationReason.trim() != '') {
                    data.cancellationReason = this.cancellationReason;
                }

                return putApi(this.order._links.cancelOrder, data).then(response => {

                    if(response.status == 200) {

                        hideModal();

                        this.getOrder();

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order cancelled');

                    }

                    //  Stop loader
                    this.isCancelling = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isCancelling = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            uncancelOrder() {

                //  Start loader
                this.isUncancelling = true;

                putApi(this.order._links.uncancelOrder).then(response => {

                    if(response.status == 200) {

                        this.getOrder();

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order uncancelled');

                    }

                    //  Stop loader
                    this.isUncancelling = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isUncancelling = false;

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

                deleteApi(this.order._links.deleteOrder, this.form).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order deleted');

                        //  Navigate to show orders
                        this.$router.push({ name: 'show-store-orders', params: { 'store_href': this.store._links.self } });

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
