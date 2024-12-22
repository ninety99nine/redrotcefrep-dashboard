<template>

    <div>

        <div class="flex justify-between items-center border-dashed py-6">

            <div class="flex justify-start">

                <!-- Back Button -->
                <BackButton class="w-16 mr-4" :action="goBack"></BackButton>

                <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                    <span class="text-2xl font-bold tracking-tight text-gray-300 animate-pulse">Transaction #</span>
                    <ShineEffect class="flex space-x-2">
                        <LineSkeleton width="w-12 mt-2"></LineSkeleton>
                        <LineSkeleton width="w-4 mt-2"></LineSkeleton>
                    </ShineEffect>
                </div>

                <div v-else class="flex items-center">

                    <TextHeader>{{ isCreating ? 'Add Transaction' : 'Transaction #'+transaction._attributes.number }}</TextHeader>

                    <!-- More Info Popover -->
                    <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Transactions are detailed records of payments made by customers for purchasing products or services from your store." placement="top"></MoreInfoPopover>

                </div>

            </div>

            <div v-if="isEditting" class="flex space-x-1 items-center">
                <ShineEffect v-if="isLoadingTransaction" class="flex space-x-2">
                    <LineSkeleton width="w-20"></LineSkeleton>
                    <LineSkeleton width="w-32"></LineSkeleton>
                    <LineSkeleton width="w-4"></LineSkeleton>
                </ShineEffect>
                <template v-else>
                    <span>Created:</span>
                    <span class="font-bold">{{ formattedDatetime(transaction.createdAt) }}</span>
                    <MoreInfoPopover :title="formattedRelativeDate(transaction.createdAt)" placement="top"></MoreInfoPopover>
                </template>
            </div>

        </div>

        <!-- Transaction Form -->
        <form class="relative" action="#" method="POST">

            <!-- General Error Info Alert -->
            <Alert v-if="mustCreate || mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{{ isCreating ? 'Create your transaction' : 'Please save your changes'}}</span>
                </div>

                <!-- Create Transaction / Save Changes Button -->
                <PrimaryButton :action="isCreating ? createTransaction : updateTransaction" :loading="isSubmitting">
                    {{ isCreating ? 'Create Transaction' : 'Save Changes' }}
                </PrimaryButton>

            </Alert>

            <div class="grid grid-cols-12 gap-4 mb-8">

                <div class="col-span-8">

                    <!-- Form Error Messages -->
                    <FormErrorMessages></FormErrorMessages>

                    <div class="bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4">

                        <div class="flex items-center space-x-8">

                            <!-- Status -->
                            <div class="flex items-center space-x-2">
                                <span class="text-xs">Status:</span>
                                <ShineEffect v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                    <LineSkeleton width="w-24"></LineSkeleton>
                                    <LineSkeleton width="w-4"></LineSkeleton>
                                </ShineEffect>
                                <TransactionPaymentStatus v-else :transaction="transaction"></TransactionPaymentStatus>
                            </div>

                            <!-- Failure Reason -->
                            <TransactionFailureType v-if="hasTransaction && transaction.failureReason" :transaction="transaction"></TransactionFailureType>

                            <!-- Payment Method (When We Don't Have A Failure Reason) -->
                            <div v-if="isLoadingTransaction || !transaction.failureReason" class="flex items-center space-x-2">
                                <span class="text-xs">Payment Method:</span>
                                <ShineEffect v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                    <LineSkeleton width="w-24"></LineSkeleton>
                                    <LineSkeleton width="w-4"></LineSkeleton>
                                </ShineEffect>
                                <div v-else class="flex space-x-1 items-center">
                                    <span class="text-xs font-bold">{{ paymentMethod.name }}</span>
                                    <MoreInfoPopover title="What Is This?" description="This is the payment method used for this transaction" placement="top"></MoreInfoPopover>
                                </div>
                            </div>

                        </div>

                        <div>

                            <ShineEffect v-if="isLoadingTransaction" class="flex items-center space-x-2 w-full">
                                <RoundSkeleton size="w-8 h-8 flex-shrink-0"></RoundSkeleton>
                                <div class="w-full space-y-2">
                                    <LineSkeleton width="w-2/3"></LineSkeleton>
                                    <LineSkeleton width="w-1/3"></LineSkeleton>
                                </div>
                            </ShineEffect>

                            <div v-else>

                                <!-- Payment Method (When We Have A Failure Reason) -->
                                <div v-if="transaction.failureReason" class="flex items-center space-x-2 border-b border-dashed pb-4 mb-4">
                                    <span class="text-xs">Payment Method:</span>
                                    <div class="flex space-x-1 items-center">
                                        <span class="text-xs font-bold">{{ paymentMethod.name }}</span>
                                        <MoreInfoPopover title="What Is This?" description="This is the payment method used for this transaction" placement="top"></MoreInfoPopover>
                                    </div>
                                </div>

                                <!-- Transaction Description -->
                                <div class="flex items-center space-x-2 text-sm">
                                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span>{{ transaction.description }}</span>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="flex items-center bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4">

                        <div class="w-full space-y-4">

                            <!-- Amount & Percentage -->
                            <div class="flex items-end space-x-2">
                                <ShineEffect v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                    <LineSkeleton width="w-40 h-8"></LineSkeleton>
                                    <LineSkeleton width="w-12 h-6"></LineSkeleton>
                                </ShineEffect>
                                <template v-else>
                                    <span class="text-4xl font-bold">{{ transaction.amount.amountWithCurrency }}</span>
                                    <span v-if="transaction.percentage.value != 100" class="text-2xl text-gray-400">({{ transaction.percentage.valueSymbol }})</span>
                                </template>
                            </div>

                            <!-- Date Paid -->
                            <div v-if="isPaid" class="flex items-center space-x-2 text-sm">
                                <span class="whitespace-nowrap">Date Paid: </span>
                                <span class="flex items-center space-x-2">
                                    <span class="font-bold">{{ formattedDatetime(transaction.updatedAt) }}</span>
                                    <MoreInfoPopover :title="formattedRelativeDate(transaction.updatedAt)" placement="top"></MoreInfoPopover>
                                </span>
                            </div>

                            <div v-if="isLoadingTransaction || (transaction.metadata && transaction.metadata.canPayUsingDpo)" class="flex items-center justify-between">

                                <!-- Payment Link Expires In -->
                                <div>
                                    <ShineEffect v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                        <LineSkeleton width="w-40"></LineSkeleton>
                                        <LineSkeleton width="w-20"></LineSkeleton>
                                        <LineSkeleton width="w-4"></LineSkeleton>
                                    </ShineEffect>
                                    <div v-else class="flex items-center space-x-2">
                                        <span>Payment Link Expires In: </span>
                                        <Countdown :showMoreInfoPopover="false" :time="transaction.metadata.dpoPaymentUrlExpiresAt" textClass="text-yellow-500 font-bold underline decoration-dashed underline-offset-4"></Countdown>
                                        <MoreInfoPopover title="This is the time left before the payment link expires" placement="top"></MoreInfoPopover>
                                    </div>
                                </div>

                                <!-- Copy Payment Link & Pay Now Buttons -->
                                <template v-if="isLoadingTransaction || transaction.metadata.canPayUsingDpo">
                                    <ShineEffect v-if="isLoadingTransaction" class="flex space-x-2">
                                        <ButtonSkeleton size="sm">
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                            </svg>
                                            <span class="ml-1">Copy Payment Link</span>
                                        </ButtonSkeleton>
                                        <ButtonSkeleton size="sm">
                                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                            </svg>
                                            <span>Pay Now</span>
                                        </ButtonSkeleton>
                                    </ShineEffect>
                                    <div v-else class="flex space-x-2">
                                        <CopyButton type="light" size="sm" :content="transaction.metadata.dpoPaymentUrl">
                                            <span class="ml-1">Copy Payment Link</span>
                                        </CopyButton>
                                        <PrimaryButton @click="openPaymentLinkInNewTab()" type="primary" size="sm">
                                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                            </svg>
                                            <span>Pay Now</span>
                                        </PrimaryButton>
                                    </div>
                                </template>

                            </div>

                            <!-- Renew Payment Link Buttons -->
                            <div v-else-if="transaction.metadata && transaction.metadata.dpoPaymentLinkHasExpired" class="flex justify-end">
                                <PrimaryButton @click="renewTransactionPaymentLink()" type="primary" size="sm" :loading="isRenewingPaymentLink">
                                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    <span>Renew Payment Link</span>
                                </PrimaryButton>
                            </div>

                        </div>

                        <!-- Checkmark Icon -->
                        <span v-if="isPaid" class="border rounded-full bg-gray-50">
                            <svg class="w-20 h-20 text-green-500"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                            </svg>
                        </span>

                    </div>

                </div>

                <div class="col-span-4 space-y-4">

                    <!-- Transaction Owner -->
                    <TransactionOwner :transaction="transaction" :isLoadingTransaction="isLoadingTransaction"></TransactionOwner>

                    <!-- Transaction Customer -->
                    <TransactionCustomer :transaction="transaction" :isLoadingTransaction="isLoadingTransaction"></TransactionCustomer>

                    <div class="flex flex-col justify-between bg-white shadow-lg rounded-lg border space-y-2 p-4">
                        <div class="flex items-center space-x-2 text-sm">
                            <span class="whitespace-nowrap">Requester: </span>
                            <ShineEffect v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                <LineSkeleton width="w-20"></LineSkeleton>
                                <LineSkeleton width="w-4"></LineSkeleton>
                            </ShineEffect>
                            <template v-else>
                                <span class="font-bold">{{ requestedByUser._attributes.name }}</span>
                                <MoreInfoPopover title="What Is This?" description="This is the person that requested this transaction" placement="top"></MoreInfoPopover>
                            </template>
                        </div>

                        <div class="flex items-center space-x-2 text-sm">
                            <span class="whitespace-nowrap">Verifyer: </span>
                            <ShineEffect v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                <LineSkeleton width="w-32"></LineSkeleton>
                                <LineSkeleton width="w-4"></LineSkeleton>
                            </ShineEffect>
                            <template v-else>
                                <span v-if="manuallyVerifiedByUser" class="font-bold">{{ manuallyVerifiedByUser._attributes.name }}</span>
                                <span v-else class="font-bold">{{ appName }}</span>
                                <MoreInfoPopover title="What Is This?" :description="manuallyVerifiedByUser ? 'This is the person that verified this transaction' : 'This is the application that verified this transaction'" placement="top"></MoreInfoPopover>
                            </template>
                        </div>

                        <div class="flex items-center space-x-2 text-sm">
                            <span class="whitespace-nowrap">Verification Method: </span>
                            <ShineEffect v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                <LineSkeleton width="w-20"></LineSkeleton>
                                <LineSkeleton width="w-4"></LineSkeleton>
                            </ShineEffect>
                            <template v-else>
                                <BadgeIndicator :type="transaction.verificationType.toLowerCase() == 'automatic' ? 'success' : 'info'" :text="transaction.verificationType" :showDot="false"></BadgeIndicator>
                                <MoreInfoPopover title="What Is This?" description="This indicates whether the transaction was verified manually by a person or automatically by the application" placement="top"></MoreInfoPopover>
                            </template>
                        </div>

                    </div>

                </div>

            </div>

            <div v-if="transaction" :class="['space-y-4 shadow-lg rounded-lg border p-4', isLoadingTransaction ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

                <!-- Delete Transaction Info -->
                <div class="flex items-center whitespace-pre">
                    <span>Do you want to permanently delete</span>
                    <ShineEffect v-if="isLoadingTransaction">
                        <LineSkeleton width="w-20 mx-2"></LineSkeleton>
                    </ShineEffect>
                    <span v-else class="font-bold text-black"> Transaction #{{ transaction._attributes.number }} </span>
                    <span>? Once this transaction is deleted you will not be able to recover it.</span>
                </div>

                <div class="flex justify-end">

                    <ButtonSkeleton v-if="isEditting && isLoadingTransaction">Delete Transaction</ButtonSkeleton>

                    <ConfirmModal v-else approveText="Delete Order" :approveAction="deleteTransaction" :isLoading="isDeleting">

                        <template #content>
                            <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                            <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">Transaction #{{ transaction._attributes.number }}</span>?</p>
                        </template>

                        <template #trigger="triggerProps">

                            <!-- Delete Transaction Button - Triggers Confirmation Modal -->
                            <PrimaryButton @click="triggerProps.showModal" :loading="isDeleting" type="danger">
                                Delete Transaction
                            </PrimaryButton>

                        </template>


                    </ConfirmModal>

                </div>

            </div>

        </form>

    </div>

</template>

<script>
    import isEqual from 'lodash/isEqual';
    import settings from '@Js/settings.js';
    import cloneDeep from 'lodash/cloneDeep';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import CopyButton from '@Partials/buttons/CopyButton.vue';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import ExternalLink from '@Partials/links/ExternalLink.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import ProceedButton from '@Partials/buttons/ProceedButton.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import ButtonSkeleton from '@Partials/skeletons/ButtonSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import TransactionOwner from '@Components/transaction/TransactionOwner.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import TransactionCustomer from '@Components/transaction/TransactionCustomer.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import TransactionFailureType from '@Components/transaction/TransactionFailureType.vue';
    import TransactionPaymentStatus from '@Components/transaction/TransactionPaymentStatus.vue';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Alert, TextHeader, BackButton, CopyButton, Countdown, ExternalLink, ConfirmModal, ShineEffect, LineSkeleton, PrimaryButton,
            ProceedButton, RoundSkeleton, ButtonSkeleton, MoreInfoPopover, BadgeIndicator, TransactionOwner,
            FormErrorMessages, TransactionFailureType, TransactionCustomer, TransactionPaymentStatus
        },
        data() {
            return {
                form: {
                    paymentMethodId: null,
                    description: null,
                    amount: null,
                },
                transaction: null,
                isDeleting: false,
                isSubmitting: false,
                apiState: useApiState(),
                appName: settings.appName,
                storeState: useStoreState(),
                isRenewingPaymentLink: false,
            }
        },
        watch: {
            '$route.params.transaction_href'(newValue, oldValue) {

                // Scroll to the top whenever $route.params.transaction_href changes
                window.scrollTo(0, 0);

                //  Get the transaction matching the route transaction_href
                this.getTransaction();

            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isPaid() {
                return ((this.transaction || {})._attributes || {}).isPaid;
            },
            isPendingPayment() {
                return ((this.transaction || {})._attributes || {}).isPendingPayment;
            },
            hasCustomer() {
                return this.customer != null;
            },
            hasTransaction() {
                return this.transaction != null;
            },
            customer() {
                return ((this.transaction || {})._relationships || {}).customer;
            },
            paymentMethod() {
                return ((this.transaction || {})._relationships || {}).paymentMethod || null;
            },
            requestedByUser() {
                return ((this.transaction || {})._relationships || {}).requestedByUser || null;
            },
            manuallyVerifiedByUser() {
                return ((this.transaction || {})._relationships || {}).manuallyVerifiedByUser || null;
            },
            isCreating() {
                return this.$route.name === 'create-store-transaction';
            },
            isEditting() {
                return this.$route.name === 'show-store-transaction';
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.isEditting && this.formHasChanged && !this.isLoadingTransaction && !this.isSubmitting;
            },
            mustCreate() {
                return this.isCreating && this.formHasChanged && !this.isLoadingTransaction && !this.isSubmitting;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({ name: 'show-store-transactions', params: { 'store_href': this.store._links.showStore } });
            },
            openPaymentLinkInNewTab() {
                window.open(this.transaction.metadata.dpoPaymentUrl, '_blank');
            },
            getTransaction() {

                //  Start loader
                this.isLoadingTransaction = true;

                //  Set the query params
                const params = {
                    '_relationships': 'customer,requestedByUser,manuallyVerifiedByUser,paymentMethod,owner'
                };

                getApi(this.$route.params.transaction_href, params).then(response => {

                    if(response.status == 200) {

                        this.transaction = response.data.transaction;

                    }

                    //  Stop loader
                    this.isLoadingTransaction = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingTransaction = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            renewTransactionPaymentLink() {

                //  Start loader
                this.isRenewingPaymentLink = true;

                postApi(this.transaction._links.renewTransactionPaymentLink).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Transaction renewed');

                        this.getTransaction();

                    }

                    //  Stop loader
                    this.isRenewingPaymentLink = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isRenewingPaymentLink = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            updateTransaction() {

                //  Start loader
                this.isSubmitting = true;

                //  Set the query params
                const params = {

                };

                getApi(this.transaction._links.updateTransaction, params).then(response => {

                    if(response.status == 200) {

                        this.originalForm = cloneDeep(this.form);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Transaction updated');

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
            deleteTransaction() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.transaction._links.deleteTransaction).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Transaction deleted');

                            //  Navigate to show transactions
                            this.$router.push({ name: 'show-store-transactions', params: { 'store_href': this.store._links.showStore } });

                            // Scroll to the top
                            window.scrollTo(0, 0);

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

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
            if(this.isEditting) this.getTransaction();
        }
    };

</script>
