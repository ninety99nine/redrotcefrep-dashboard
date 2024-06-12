<template>

    <div>

        <div class="flex justify-between items-center border-dashed py-6">

            <div class="flex justify-start">

                <!-- Back Button -->
                <BackButton class="w-16 mr-4"></BackButton>

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

                    <div class="bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4">

                        <div class="flex items-center space-x-8">

                            <div class="flex items-center space-x-2">
                                <span class="text-xs">Status:</span>
                                <ShineEffect v-if="isLoadingTransaction">
                                    <LineSkeleton width="w-24"></LineSkeleton>
                                </ShineEffect>
                                <TransactionPaymentStatus v-else :transaction="transaction"></TransactionPaymentStatus>
                            </div>

                            <div class="flex items-center space-x-2">
                                <span class="text-xs">Method:</span>
                                <ShineEffect v-if="isLoadingTransaction">
                                    <LineSkeleton width="w-24"></LineSkeleton>
                                </ShineEffect>
                                <div v-else class="flex space-x-1 items-center">
                                    <span class="text-xs font-bold">{{ paymentMethod.name }}</span>
                                    <MoreInfoPopover title="What Is This?" description="This is the payment method used for this transaction" placement="top"></MoreInfoPopover>
                                </div>
                            </div>

                        </div>

                        <div>
                            <div v-if="isLoadingTransaction" class="flex items-center space-x-2 w-full">
                                <RoundSkeleton v-if="isLoadingTransaction" size="w-8 h-8"></RoundSkeleton>
                                <div class="w-full space-y-2">
                                    <LineSkeleton v-if="isLoadingTransaction" width="w-full"></LineSkeleton>
                                    <LineSkeleton v-if="isLoadingTransaction" width="w-2/3"></LineSkeleton>
                                </div>
                            </div>

                            <div v-else class="flex items-center space-x-2">

                                <!-- Checkmark Icon -->
                                <svg v-if="isPaid" class="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                </svg>

                                <!-- Clock Icon -->
                                <svg v-else-if="isPendingPayment" class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                                </svg>

                                <!-- Transaction Description -->
                                <span class="text-sm">{{ transaction.description }}</span>

                            </div>
                        </div>

                    </div>

                    <!-- General Error Info Alert -->
                    <Alert v-if="getFormError('general')" type="warning" class="shadow mb-4">
                        {{ getFormError('general') }}
                    </Alert>

                    <div class="bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4">

                        <div class="space-y-4">

                            <div class="flex items-center space-x-2 text-sm">
                                <span class="whitespace-nowrap">Paid By: </span>
                                <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                                <span v-else class="font-bold">{{ paidByUser._attributes.name }}</span>
                                <MoreInfoPopover title="What Is This?" :description="'This is the person that '+(isPaid ? 'paid' : 'should pay')+' for this order'" placement="top"></MoreInfoPopover>
                            </div>

                            <div v-if="verifiedByUser" class="flex items-center space-x-2 text-sm">
                                <span class="whitespace-nowrap">Verified By: </span>
                                <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                                <span v-else class="font-bold">{{ verifiedByUser._attributes.name }}</span>
                                <MoreInfoPopover title="What Is This?" description="This is the person that verified the payment for this order" placement="top"></MoreInfoPopover>
                            </div>

                            <div v-else-if="requestedByUser && requestedByUser.id != paidByUser.id" class="flex items-center space-x-2 text-sm">
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

                            <div class="flex items-end space-x-2">
                                <LineSkeleton v-if="isLoadingTransaction" width="w-40"></LineSkeleton>
                                <template v-else>
                                    <span class="text-4xl font-bold">{{ transaction.amount.amountWithCurrency }}</span>
                                    <span v-if="transaction.percentage.value != 100" class="text-2xl text-gray-400">({{ transaction.percentage.valueSymbol }})</span>
                                </template>
                            </div>

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

                                <div class="w-full flex justify-between items-center">

                                    <!-- DPO Payment Link Expired -->
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

                                    <!-- Renew Payment Link -->
                                    <PrimaryButton @click="renewPaymentLink" :loading="isRenewingPaymentLink" type="light" size="sm">
                                        <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                        <span>Renew Payment Link</span>
                                    </PrimaryButton>

                                </div>
                            </Countdown>

                            <!-- DPO Payment Link -->
                            <p v-if="isFutureDate(dpoPaymentUrlExpiresAt)">
                                <a class="text-xs text-blue-800 hover:text-blue-500" :href="dpoPaymentUrl" target="_blank">{{ dpoPaymentUrl }}</a>
                            </p>

                        </div>

                        <!-- Proof Of Payment -->


                        <!-- Can Pay Using DPO -->
                        <template v-if="canPayUsingDpo">

                            <!-- Divider -->
                            <div class="border-t my-4"></div>

                            <div class="flex items-center justify-end space-x-2">

                                <CopyButton type="light" size="sm" :content="dpoPaymentUrl">
                                    <span class="ml-1">Copy Payment Link</span>
                                </CopyButton>

                                <PrimaryButton @click="openDpoLinkInNewTab" type="success" size="sm">
                                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                        <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
                                        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                                    </svg>
                                    <span>Pay Now</span>
                                </PrimaryButton>

                            </div>

                        </template>

                    </div>

                    <div v-if="transactionForOrder" class="bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4">

                        <div class="flex justify-between">

                            <TextHeader>{{ 'Order #'+owner._attributes.number }}</TextHeader>

                            <ProceedButton :action="viewOrder" size="sm">
                                <span class="mr-2">View Order</span>
                            </ProceedButton>

                        </div>

                    </div>

                </div>

                <div class="col-span-4">

                    <div class="flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4">

                        <div class="flex justify-end mt-8">

                            <ButtonSkeleton v-if="isLoadingTransaction">{{ isCreating ? 'Create Transaction' : 'Save Changes' }}</ButtonSkeleton>

                            <!-- Create Transaction / Save Changes Button -->
                            <PrimaryButton v-else :action="isCreating ? createTransaction : updateTransaction" :disabled="(isCreating && !mustCreate) || (isEditting && !mustSaveChanges)" :loading="isSubmitting">
                                {{ isCreating ? 'Create Transaction' : 'Save Changes' }}
                            </PrimaryButton>

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
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import ProceedButton from '@Partials/buttons/ProceedButton.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import ButtonSkeleton from '@Partials/skeletons/ButtonSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import CartSummary from '@Components/order/cart-summary/CartSummary.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import TransactionPaymentStatus from '@Components/transaction/TransactionPaymentStatus.vue';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Alert, TextHeader, BackButton, CopyButton, Countdown, ConfirmModal, ShineEffect, LineSkeleton, PrimaryButton,
            ProceedButton, RoundSkeleton, ButtonSkeleton, MoreInfoPopover, CartSummary, TransactionPaymentStatus
        },
        data() {
            return {
                form: {
                    paymentMethodId: null,
                    paidByUserId: null,
                    description: null,
                    amount: null,
                },
                transaction: null,
                isDeleting: false,
                isSubmitting: false,
                apiState: useApiState(),
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
            isVerifiedByUser() {
                return ((this.transaction || {})._attributes || {}).isVerifiedByUser;
            },
            dpoPaymentUrl() {
                return (this.transaction || {}).dpoPaymentUrl;
            },
            canPayUsingDpo() {
                return ((this.transaction || {})._attributes || {}).canPayUsingDpo;
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
            paidByUser() {
                return ((this.transaction || {})._relationships || {}).paidByUser || null;
            },
            verifiedByUser() {
                return ((this.transaction || {})._relationships || {}).verifiedByUser || null;
            },
            requestedByUser() {
                return ((this.transaction || {})._relationships || {}).requestedByUser || null;
            },
            owner() {
                return ((this.transaction || {})._relationships || {}).owner || null;
            },
            transactionForOrder() {
                return (this.transaction || {}).ownerType == 'order';
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
            openDpoLinkInNewTab() {
                window.open(this.dpoPaymentUrl, '_blank');
            },
            viewOrder() {
                this.$router.push({ name: 'show-store-order', params: { 'store_href': this.store._links.self, 'order_href': this.owner._links.self } });
            },
            getTransaction() {

                //  Start loader
                this.isLoadingTransaction = true;

                //  Set the query params
                const params = {
                    'withOwner': '1',
                    'withPayingUser': '1',
                    'withVerifyingUser': '1',
                    'withPaymentMethod': '1',
                    'withRequestingUser': '1',
                };

                getApi(this.$route.params.transaction_href, params).then(response => {

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

                deleteApi(this.order._links.deleteTransaction, this.form).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Transaction deleted');

                        //  Navigate to show transactions
                        this.$router.push({ name: 'show-store-transactions', params: { 'store_href': this.store._links.self } });

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
            if(this.isEditting) this.getTransaction();
        }
    };

</script>
