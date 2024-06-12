<template>

    <!-- Transaction Modal -->
    <BasicModal :onShow="loadContent" :onHide="resetContent">

        <template #content="modalProps">

            <template v-if="isLoadingTransaction || hasTransaction">

                <div class="flex items-center text-lg border-b border-dashed pb-4 mb-4">
                    <BackButton v-if="hasTransactions" :action="goBack" size="xs" class="w-8 mr-4"></BackButton>
                    <span>Transaction #</span>

                    <LineSkeleton v-if="isLoadingTransaction" width="w-20 ml-2"></LineSkeleton>
                    <span v-else>{{ transaction._attributes.number }}</span>
                </div>

                <div class="space-y-4">

                    <div class="flex items-center space-x-2 text-sm">
                        <span class="whitespace-nowrap">Paid By: </span>
                        <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                        <span v-else class="font-bold">{{ payingUser._attributes.name }}</span>
                        <MoreInfoPopover title="What Is This?" :description="'This is the person that '+(isPaid ? 'paid' : 'should pay')+' for this order'" placement="top"></MoreInfoPopover>
                    </div>

                    <div v-if="verifiedByUser" class="flex items-center space-x-2 text-sm">
                        <span class="whitespace-nowrap">Verified By: </span>
                        <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                        <span v-else class="font-bold">{{ verifiedByUser._attributes.name }}</span>
                        <MoreInfoPopover title="What Is This?" description="This is the person that verified the payment for this order" placement="top"></MoreInfoPopover>
                    </div>

                    <div v-else-if="requestedByUser && requestedByUser.id != payingUser.id" class="flex items-center space-x-2 text-sm">
                        <span class="whitespace-nowrap">Requested By: </span>
                        <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                        <span v-else class="font-bold">{{ requestedByUser._attributes.name }}</span>
                        <MoreInfoPopover title="What Is This?" description="This is the person that requested payment for this order" placement="top"></MoreInfoPopover>
                    </div>

                    <div v-if="isPaid" class="flex items-center space-x-2 text-sm">
                        <span class="whitespace-nowrap">Date Paid: </span>
                        <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                        <span v-else class="flex items-center space-x-2">
                            <span class="font-bold">{{ formattedDatetime(transaction.updatedAt) }}</span>
                            <MoreInfoPopover :title="formattedRelativeDate(transaction.updatedAt)" placement="top"></MoreInfoPopover>
                        </span>
                    </div>

                    <div class="flex items-center space-x-2 text-sm">
                        <span class="whitespace-nowrap">Method: </span>
                        <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                        <span v-else class="font-bold">{{ paymentMethod.name }}</span>
                        <MoreInfoPopover title="What Is This?" description="This is the payment method used for this transaction" placement="top"></MoreInfoPopover>
                    </div>

                    <div class="flex items-center space-x-2 text-sm">
                        <span class="whitespace-nowrap">Status: </span>
                        <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                        <TransactionPaymentStatus v-else :transaction="transaction"></TransactionPaymentStatus>
                    </div>

                    <div class="flex items-end space-x-2">
                        <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                        <template v-else>
                            <span class="text-2xl font-bold">{{ transaction.amount.amountWithCurrency }}</span>
                            <span v-if="transaction.percentage.value != 100" class="text-2xl text-gray-400">({{ transaction.percentage.valueSymbol }})</span>
                        </template>
                    </div>

                </div>

                <div class="border-t my-4"></div>

                <div v-if="isLoadingTransaction" class="flex items-center space-x-2 w-full">
                    <RoundSkeleton v-if="isLoadingTransaction" size="w-8 h-8"></RoundSkeleton>
                    <div class="w-full space-y-2">
                        <LineSkeleton v-if="isLoadingTransaction" width="w-full"></LineSkeleton>
                        <LineSkeleton v-if="isLoadingTransaction" width="w-2/3"></LineSkeleton>
                    </div>
                </div>

                <div v-else class="flex space-x-2">

                    <!-- Checkmark Icon -->
                    <svg v-if="isPaid" class="w-10 h-10 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                    </svg>

                    <!-- Clock Icon -->
                    <svg v-else-if="isPendingPayment" class="w-10 h-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                    </svg>

                    <!-- Transaction Description -->
                    <span class="text-sm">{{ transaction.description }}</span>

                </div>

                <!-- DPO Payment Link & Countdown -->
                <div v-if="hasDpoPaymentUrlExpiresAt" class="space-y-2">

                    <!-- Divider -->
                    <div class="border-t my-4"></div>

                    <!-- DPO Payment Link Countdown -->
                    <Countdown :time="dpoPaymentUrlExpiresAt" textClass="text-yellow-500 font-bold underline decoration-dashed underline-offset-4">

                        <template #suffix="props">
                            <span v-if="!props.hasExpired" class="text-sm mr-1">DPO Link Expires in</span>
                        </template>

                        <div class="flex items-center space-x-2 text-yellow-500">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            <span class="text-sm">DPO Payment Link Expired</span>
                            <MoreInfoPopover title="DPO Payment Link Expired" placement="top">
                                <template #description>
                                    <hr>
                                    <p class="mb-2">The DPO Payment link is shared with your customer to allow them to pay for this order using their <span class="text-black font-bold">Credit/Debit card</span>. </p>
                                    <p>In this case the link has expired for security reasons, therefore you should generate a new payment link to share with your customer</p>
                                </template>
                            </MoreInfoPopover>
                        </div>

                    </Countdown>

                    <!-- DPO Payment Link -->
                    <p v-if="isFutureDate(dpoPaymentUrlExpiresAt)">
                        <a class="text-xs text-blue-800 hover:text-blue-500" :href="dpoPaymentUrl" target="_blank">{{ dpoPaymentUrl }}</a>
                    </p>

                </div>

                <!-- Divider -->
                <div class="border-t my-4"></div>

                <!-- Proof Of Payment -->

                <!-- Confirm Delete Transaction -->
                <div v-if="showDeleteConfirmation" :class="['space-y-1 bg-white shadow-lg rounded-lg border p-4', isLoadingTransaction ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

                    <p class="text-sm font-bold border-b border-dashed pb-2 mb-2">Confirm Delete</p>
                    <p class="text-xs mb-4">Are you sure you want to permanently delete <span class="font-bold text-black">Transaction #{{ transaction._attributes.number }}</span>?</p>

                    <div class="flex justify-end space-x-2">

                        <!-- Cancel Button -->
                        <PrimaryButton v-if="!isDeletingTransaction" @click="showDeleteConfirmation = false" class="w-20" size="xs" type="dark">
                            Cancel
                        </PrimaryButton>

                        <!-- Delete Transaction Button -->
                        <PrimaryButton @click="(hideModal) => deleteTransaction(modalProps.hideModal)" :loading="isDeletingTransaction" class="w-40" size="xs" type="danger">
                            Delete Transaction
                        </PrimaryButton>

                    </div>

                </div>

                <!-- Delete Transaction -->
                <div v-else class="flex justify-end">

                    <!-- Delete Transaction Button - Triggers Confirmation -->
                    <PrimaryButton @click="showDeleteConfirmation = true" :loading="isDeletingTransaction" class="w-40" size="xs" type="danger">
                        Delete Transaction
                    </PrimaryButton>

                </div>

                <div v-if="isPendingPayment && hasDpoPaymentUrl">

                    <!-- Divider -->
                    <div class="border-t my-4"></div>

                    <div class="flex items-center justify-end space-x-2">

                        <template v-if="dpoPaymentLinkHasExpired">
                            <PrimaryButton @click="renewPaymentLink" :loading="isRenewingPaymentLink" type="light" size="sm">
                                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <span>Renew Payment Link</span>
                            </PrimaryButton>
                        </template>

                        <template v-else>
                            <CopyButton type="light" size="sm" :content="dpoPaymentUrl">
                                <span class="ml-1">Copy Payment Link</span>
                            </CopyButton>

                            <PrimaryButton @click="payNow" type="success" size="sm">
                                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                    <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
                                    <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                                </svg>
                                <span>Pay Now</span>
                            </PrimaryButton>
                        </template>

                    </div>
                </div>

            </template>

            <template v-else-if="isLoadingTransactions || hasTransactions">

                <div class="text-lg border-b border-dashed pb-4 mb-4">
                    <p>{{ payingUser._attributes.name }}</p>
                    <span class="text-sm text-gray-500">{{ isLoadingTransactions ? '' : totalTransactions  }} Transactions</span>
                </div>

                <div v-for="(transaction, index) in isLoadingTransactions ? 3 : transactions" :key="index"
                    :class="['shadow-sm rounded-lg border px-4 mb-2 hover:bg-gray-50 cursor-pointer', isLoadingTransactions ? 'py-2' : 'py-1']"
                    @click="isLoadingTransactions ? null :showTransaction(transaction)">

                    <div class="flex justify-between text-sm mb-1">

                        <LineSkeleton v-if="isLoadingTransactions" width="w-20"></LineSkeleton>
                        <p v-else class="font-bold">#{{ transaction._attributes.number }}</p>

                        <LineSkeleton v-if="isLoadingTransactions" width="w-16"></LineSkeleton>
                        <p v-else class="font-bold">{{ transaction.amount.amountWithCurrency }}</p>

                    </div>

                    <LineSkeleton v-if="isLoadingTransactions" width="w-32"></LineSkeleton>

                    <div class="flex items-center space-x-2" v-else>

                        <!-- Last Transaction Status -->
                        <TransactionPaymentStatus :transaction="transaction"></TransactionPaymentStatus>

                        <!-- Backslash -->
                        <span class="text-gray-200">/</span>

                        <!-- Last Transaction Payment Method -->
                        <span class="text-xs text-black">{{ transaction._relationships.paymentMethod.name }}</span>

                        <template v-if="transaction._attributes.isPaid">

                            <!-- Backslash -->
                            <span class="text-gray-200">/</span>

                            <!-- Last Transaction Date -->
                            <MoreInfoPopover title="Date Paid" placement="top">
                                <template #description>
                                    <hr class="mb-2">
                                    <p>{{ formattedDatetime(transaction.updatedAt) }}</p>
                                </template>
                            </MoreInfoPopover>

                        </template>

                    </div>

                </div>

            </template>

        </template>

        <template #trigger="triggerProps">

            <!-- Paying User Card - Triggers Transaction Modal -->
            <div class="shadow-sm rounded-lg border px-4 py-2 mb-2 bg-gray-50 hover:bg-gray-100 cursor-pointer space-y-1"
                 @click="triggerProps.showModal">

                <div class="flex justify-between">

                    <!-- Paying User Name -->
                    <p class="text-sm font-bold">{{ payingUser._attributes.name }}</p>

                    <!-- Last Transaction Amount -->
                    <p class="font-bold">{{ latestTransactionAsPayer.amount.amountWithCurrency }}</p>

                </div>

                <div class="flex justify-between">

                    <!-- Last Transaction Details -->
                    <div class="flex items-center space-x-2">

                        <!-- Last Transaction Status -->
                        <TransactionPaymentStatus :transaction="latestTransactionAsPayer"></TransactionPaymentStatus>

                        <!-- Backslash -->
                        <span class="text-gray-200">/</span>

                        <!-- Last Transaction Payment Method -->
                        <span class="text-xs text-black">{{ latestTransactionAsPayer._relationships.paymentMethod.name }}</span>

                        <!-- Backslash -->
                        <span class="text-gray-200">/</span>

                        <!-- Last Transaction Date -->
                        <span class="flex items-center space-x-2">
                            <span class="text-xs text-black">{{ formattedDatetime(latestTransactionAsPayer.updatedAt) }}</span>
                            <MoreInfoPopover :title="formattedRelativeDate(latestTransactionAsPayer.updatedAt)" placement="top"></MoreInfoPopover>
                        </span>

                    </div>

                    <!-- Total Transactions -->
                    <p class="rounded-t py-1 px-2 bg-blue-100 text-blue-500 text-xs font-bold">{{ payingUser.transactionsAsPayerCount }} {{ payingUser.transactionsAsPayerCount == 1 ? 'transaction' : 'transactions' }}</p>

                </div>

            </div>

        </template>

    </BasicModal>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import CopyButton from '@Partials/buttons/CopyButton.vue';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import BasicModal from '../../../partials/modals/BasicModal.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import { getApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import TransactionPaymentStatus from '@Components/transaction/TransactionPaymentStatus.vue';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            BackButton, CopyButton, Countdown, PrimaryButton, LineSkeleton, BasicModal,
            RoundSkeleton, MoreInfoPopover, BadgeIndicator, TransactionPaymentStatus
        },
        props: {
            order: {
                type: Object
            },
            payingUser: {
                type: Object
            },
            refreshOrder: {
                type: Function
            }
        },
        data() {
            return {
                transactions: [],
                transaction: null,
                totalTransactions: null,
                authState: useAuthState(),
                isLoadingTransaction: false,
                isRenewingPaymentLink: false,
                isLoadingTransactions: false,
                isDeletingTransaction: false,
                showDeleteConfirmation: false,
            }
        },
        computed: {
            isPaid() {
                return ((this.transaction || {})._attributes || {}).isPaid;
            },
            isPendingPayment() {
                return ((this.transaction || {})._attributes || {}).isPendingPayment;
            },
            isVerifiedByUser() {
                return ((this.transaction || {})._attributes || {}).isVerifiedByUser;
            },
            dpoPaymentUrl() {
                return (this.transaction || {}).dpoPaymentUrl;
            },
            hasDpoPaymentUrl() {
                return this.dpoPaymentUrl != null;
            },
            dpoPaymentLinkHasExpired() {
                return ((this.transaction || {})._attributes || {}).dpoPaymentLinkHasExpired;
            },
            hasTransaction() {
                return this.transaction != null;
            },
            hasTransactions() {
                return this.transactions.length > 0;
            },
            dpoPaymentUrlExpiresAt() {
                return (this.transaction || {}).dpoPaymentUrlExpiresAt || null;
            },
            hasDpoPaymentUrlExpiresAt() {
                return this.dpoPaymentUrlExpiresAt != null;
            },
            paymentMethod() {
                return ((this.transaction || {})._relationships || {}).paymentMethod || null;
            },
            verifiedByUser() {
                return ((this.transaction || {})._relationships || {}).verifiedByUser || null;
            },
            requestedByUser() {
                return ((this.transaction || {})._relationships || {}).requestedByUser || null;
            },
            latestTransactionAsPayer() {
                return this.payingUser._relationships.latestTransactionAsPayer;
            },
        },
        methods: {
            goBack() {
                this.resetContent();
                this.loadContent();
            },
            loadContent() {
                if(this.payingUser.transactionsAsPayerCount == 1) {

                    //  Get the transaction
                    this.showTransaction(this.latestTransactionAsPayer);

                }else if(this.payingUser.transactionsAsPayerCount > 1) {

                    //  Get the transactions
                    this.showTransactions();

                }
            },
            resetContent() {
                this.transactions = [];
                this.transaction = null;
                this.totalTransactions = null;
                this.isLoadingTransaction = false;
                this.isLoadingTransactions = false;
            },
            showTransaction(transaction) {

                //  Start loader
                this.isLoadingTransaction = true;

                //  Set the query params
                const params = {
                    //  'withPayingUser': '1',
                    'withVerifyingUser': '1',
                    'withPaymentMethod': '1',
                    'withRequestingUser': '1',
                };

                getApi(transaction._links.self, params).then(response => {

                    if(response.status == 200) {

                        this.transaction = response.data;

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
            renewPaymentLink() {

                //  Start loader
                this.isRenewingPaymentLink = true;

                postApi(this.transaction._links.renewPaymentLink).then(response => {

                    if(response.status == 200) {

                        this.showTransaction(this.transaction);

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
            deleteTransaction(hideModal) {

                //  Start loader
                this.isDeletingTransaction = true;

                deleteApi(this.transaction._links.self).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Transaction #'+this.transaction._attributes.number+' deleted');

                        //  Close this modal
                        hideModal();

                        //  Refresh the order
                        this.refreshOrder();

                    }

                    //  Stop loader
                    this.isDeletingTransaction = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingTransaction = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            showTransactions() {

                //  Start loader
                this.isLoadingTransactions = true;

                //  Set the query params
                const params = {
                    'withPaymentMethod': '1',
                    'paidByUserId': this.payingUser.id
                };

                getApi(this.order._links.showTransactions, params).then(response => {

                    if(response.status == 200) {

                        this.totalTransactions = response.data.total;
                        this.transactions = response.data.data;

                    }

                    //  Stop loader
                    this.isLoadingTransactions = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingTransactions = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            payNow() {
                window.open(this.dpoPaymentUrl, '_blank');
            }
        }
    };

</script>
