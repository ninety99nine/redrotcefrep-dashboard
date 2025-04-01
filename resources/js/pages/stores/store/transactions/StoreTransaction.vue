<template>

    <div>

        <div class="flex justify-between items-center border-dashed py-6">

            <div class="flex justify-start">

                <!-- Back Button -->
                <Button type="light" size="xs" icon="short-left-arrow" class="w-16 mr-4" :action="goBack"></Button>

                <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                    <span class="text-2xl font-bold tracking-tight text-gray-300 animate-pulse">Transaction #</span>
                    <div class="flex space-x-2">
                        <LineSkeleton width="w-12" :shine="true"></LineSkeleton>
                        <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                    </div>
                </div>

                <div v-else class="flex items-center">

                    <h1 class="text-2xl font-bold tracking-tight text-gray-900">{{ isCreating ? 'Add Transaction' : 'Transaction #'+transaction._attributes.number }}</h1>

                    <!-- More Info Popover -->
                    <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Transactions are detailed records of payments made by customers for purchasing products or services from your store." placement="top"></MoreInfoPopover>

                </div>

            </div>

            <div v-if="isEditting" class="flex space-x-1 items-center">
                <div v-if="isLoadingTransaction" class="flex space-x-2">
                    <LineSkeleton width="w-20" :shine="true"></LineSkeleton>
                    <LineSkeleton width="w-32" :shine="true"></LineSkeleton>
                    <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                </div>
                <template v-else>
                    <span>Created:</span>
                    <span class="font-bold">{{ formattedDatetime(transaction.createdAt) }}</span>
                    <MoreInfoPopover :title="formattedRelativeDate(transaction.createdAt)" placement="top"></MoreInfoPopover>
                </template>
            </div>

        </div>

        <!-- General Error Info Alert -->
        <Alert v-if="mustCreate || mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

            <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span>{{ isCreating ? 'Create your transaction' : 'Please save your changes'}}</span>
            </div>

            <!-- Create Transaction / Save Changes Button -->
            <Button type="primary" size="sm" :action="isCreating ? createTransaction : updateTransaction" :loading="isSubmitting">
                {{ isCreating ? 'Create Transaction' : 'Save Changes' }}
            </Button>

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
                            <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                <LineSkeleton width="w-20" :shine="true"></LineSkeleton>
                                <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                            </div>
                            <TransactionPaymentStatus v-else :transaction="transaction"></TransactionPaymentStatus>
                        </div>

                        <!-- Failure Reason -->
                        <TransactionFailureType v-if="hasTransaction && transaction.failureReason" :transaction="transaction"></TransactionFailureType>

                        <!-- Payment Method (When We Don't Have A Failure Reason) -->
                        <div v-if="isLoadingTransaction || !transaction.failureReason" class="flex items-center space-x-2">
                            <span class="text-xs">Payment Method:</span>
                            <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                <LineSkeleton width="w-24"></LineSkeleton>
                                <LineSkeleton width="w-4"></LineSkeleton>
                            </div>
                            <div v-else class="flex space-x-1 items-center">
                                <span class="text-xs font-bold">{{ paymentMethod.name }}</span>
                                <MoreInfoPopover title="What Is This?" description="This is the payment method used for this transaction" placement="top"></MoreInfoPopover>
                            </div>
                        </div>

                    </div>

                    <div>

                        <div v-if="isLoadingTransaction" class="flex items-center space-x-2 w-full">
                            <LineSkeleton width="w-8" height="h-8" :shine="true"></LineSkeleton>
                            <div class="w-full space-y-2">
                                <LineSkeleton width="w-2/3" :shine="true"></LineSkeleton>
                                <LineSkeleton width="w-1/3" :shine="true"></LineSkeleton>
                            </div>
                        </div>

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
                            <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                <LineSkeleton width="w-40" height="h-8" :shine="true"></LineSkeleton>
                                <LineSkeleton width="w-12" height="h-6" :shine="true"></LineSkeleton>
                            </div>
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
                                <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                                    <LineSkeleton width="w-40" :shine="true"></LineSkeleton>
                                    <LineSkeleton width="w-20" :shine="true"></LineSkeleton>
                                    <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                                </div>
                                <div v-else class="flex items-center space-x-2">
                                    <span>Payment Link Expires In: </span>
                                    <Countdown :showMoreInfoPopover="false" :time="transaction.metadata.dpoPaymentUrlExpiresAt" textClass="text-yellow-500 font-bold underline decoration-dashed underline-offset-4"></Countdown>
                                    <MoreInfoPopover title="This is the time left before the payment link expires" placement="top"></MoreInfoPopover>
                                </div>
                            </div>

                            <!-- Copy Payment Link & Pay Now Buttons -->
                            <div v-if="isLoadingTransaction || transaction.metadata.canPayUsingDpo" class="flex space-x-2">
                                <Button type="light" size="sm" :skeleton="isLoadingTransaction" :copyContent="transaction.metadata.dpoPaymentUrl">
                                    <span>Copy Payment Link</span>
                                </Button>
                                <Button type="primary" size="sm" :skeleton="isLoadingTransaction" :action="openPaymentLinkInNewTab()">
                                    <span>Pay Now</span>
                                </Button>
                            </div>

                        </div>

                        <!-- Renew Payment Link Buttons -->
                        <div v-else-if="transaction.metadata && transaction.metadata.dpoPaymentLinkHasExpired" class="flex justify-end">
                            <Button type="primary" size="sm" :action="renewTransactionPaymentLink()" :loading="isRenewingPaymentLink">
                                <span>Renew Payment Link</span>
                            </Button>
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
                        <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                            <LineSkeleton width="w-20" :shine="true"></LineSkeleton>
                            <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                        </div>
                        <template v-else>
                            <span class="font-bold">{{ requestedByUser._attributes.name }}</span>
                            <MoreInfoPopover title="What Is This?" description="This is the person that requested this transaction" placement="top"></MoreInfoPopover>
                        </template>
                    </div>

                    <div class="flex items-center space-x-2 text-sm">
                        <span class="whitespace-nowrap">Verifyer: </span>
                        <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                            <LineSkeleton width="w-32" :shine="true"></LineSkeleton>
                            <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                        </div>
                        <template v-else>
                            <span v-if="manuallyVerifiedByUser" class="font-bold">{{ manuallyVerifiedByUser._attributes.name }}</span>
                            <span v-else class="font-bold">{{ appName }}</span>
                            <MoreInfoPopover title="What Is This?" :description="manuallyVerifiedByUser ? 'This is the person that verified this transaction' : 'This is the application that verified this transaction'" placement="top"></MoreInfoPopover>
                        </template>
                    </div>

                    <div class="flex items-center space-x-2 text-sm">
                        <span class="whitespace-nowrap">Verification Method: </span>
                        <div v-if="isLoadingTransaction" class="flex items-center space-x-2">
                            <LineSkeleton width="w-20" :shine="true"></LineSkeleton>
                            <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                        </div>
                        <template v-else>
                            <Pill :type="transaction.verificationType.toLowerCase() == 'automatic' ? 'success' : 'info'" size="xs" :showDot="false">{{ transaction.verificationType }}</Pill>
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
                <div v-if="isLoadingTransaction">
                    <LineSkeleton width="w-20 mx-2" :shine="true"></LineSkeleton>
                </div>
                <span v-else class="font-bold text-black"> Transaction #{{ transaction._attributes.number }} </span>
                <span>? Once this transaction is deleted you will not be able to recover it.</span>
            </div>

            <div class="flex justify-end">

                <ConfirmModal approveText="Delete Order" :approveAction="deleteTransaction" :isLoading="isDeleting">

                    <template #content>
                        <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                        <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">Transaction #{{ transaction._attributes.number }}</span>?</p>
                    </template>

                    <template #trigger="triggerProps">

                        <!-- Delete Transaction Button - Triggers Confirmation Modal -->
                        <Button type="danger" size="sm" :skeleton="isEditting && isLoadingTransaction" :action="triggerProps.showModal" :loading="isDeleting">
                            Delete Transaction
                        </Button>

                    </template>


                </ConfirmModal>

            </div>

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
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import ExternalLink from '@Partials/links/ExternalLink.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import TransactionOwner from '@Components/transaction/TransactionOwner.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import { getApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import { formattedDatetime, formattedRelativeDate } from '@Utils/dateUtils.js';
    import TransactionCustomer from '@Components/transaction/TransactionCustomer.vue';
    import TransactionFailureType from '@Components/transaction/TransactionFailureType.vue';
    import TransactionPaymentStatus from '@Components/transaction/TransactionPaymentStatus.vue';

    export default {
        inject: ['apiState', 'formState', 'storeState', 'notificationState'],
        components: {
            Pill, Alert, Button, Countdown, ExternalLink, ConfirmModal, LineSkeleton, MoreInfoPopover, TransactionOwner,
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
                appName: settings.appName,
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
            formattedDatetime: formattedDatetime,
            formattedRelativeDate: formattedRelativeDate,
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

                    this.formState.setServerFormErrors(errorException);

                });

            },
            renewTransactionPaymentLink() {

                //  Start loader
                this.isRenewingPaymentLink = true;

                postApi(this.transaction._links.renewTransactionPaymentLink).then(response => {

                    if(response.status == 200) {
                        this.notificationState.showSuccessNotification('Transaction renewed');

                        this.getTransaction();

                    }

                    //  Stop loader
                    this.isRenewingPaymentLink = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isRenewingPaymentLink = false;

                    this.formState.setServerFormErrors(errorException);

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
                        this.notificationState.showSuccessNotification('Transaction updated');

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deleteTransaction() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.transaction._links.deleteTransaction).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification('Transaction deleted');

                            //  Navigate to show transactions
                            this.$router.push({ name: 'show-store-transactions', params: { 'store_href': this.store._links.showStore } });

                            // Scroll to the top
                            window.scrollTo(0, 0);

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.isDeleting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeleting = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
        },
        created() {
            this.originalForm = cloneDeep(this.form);
            if(this.isEditting) this.getTransaction();
        }
    };

</script>
