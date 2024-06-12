<template>

    <div>

        <div class="flex justify-between items-center border-dashed border-b pb-4 mb-4">

            <div class="flex items-center">

                <!-- Text Heading -->
                <p class="font-bold text-sm">Transactions <span v-if="(pagination ?? {}).total > 0">({{ (pagination ?? {}).total }})</span></p>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Transactions are records of payments made by customers for their orders." placement="top"></MoreInfoPopover>

            </div>

            <template v-if="(pagination ?? {}).total > 0">

                <!-- Transaction Action Buttons -->
                <slot name="actionButtons"></slot>

            </template>

        </div>

        <!-- Transactions Table -->
        <BasicTable v-if="isLoadingTransactions || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingTransactions" @paginate="paginate" @search="search" @refresh="getTransactions" :totalHeaders="tableHeaders.length">

            <template #primaryFilters>

                <!-- Show Everything Toggle Switch -->
                <ToogleSwitch
                    v-model="showEverything" size="md"
                    labelPopoverTitle="What Is This?"
                    labelPopoverDescription="Turn on if you want to show more information about your transactions">
                    Show Everything
                </ToogleSwitch>

            </template>

            <!-- Table Head -->
            <template #head>
                <tr>

                    <!-- Table Header -->
                    <th v-for="(tableHeader, index) in tableHeaders" :key="index" scope="col" class="whitespace-nowrap px-4 py-3">
                        {{ tableHeader }}
                    </th>

                </tr>
            </template>

            <!-- Table Body -->
            <template #body>

                <!-- Loading Skeleton Rows-->
                <template v-if="isLoadingTransactions">
                    <tr v-for="(row, rowIndex) in 3" :key="rowIndex" class="border-b">
                        <td v-for="(cell, cellIndex) in tableHeaders" :key="cellIndex" class="whitespace-nowrap px-4 py-3">
                            <ShineEffect>
                                <LineSkeleton></LineSkeleton>
                            </ShineEffect>
                        </td>
                    </tr>
                </template>

                <template v-else>
                    <tr @click.stop="onView(transaction)" v-for="transaction in transactions" :key="transaction.id" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

                        <!-- Number -->
                        <td class="whitespace-nowrap px-4 py-4">

                            <div class="flex space-x-1 items-center">
                                <span>#{{ transaction._attributes.number }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="'#'+transaction._attributes.number" :description="transaction.description" placement="top"></MoreInfoPopover>
                            </div>

                        </td>

                        <!-- Description -->
                        <td v-if="showEverything" class="px-4 py-4">
                            <div class="min-w-80">{{ transaction.description }}</div>
                        </td>

                        <!-- Payment Status -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <TransactionPaymentStatus :transaction="transaction"></TransactionPaymentStatus>
                        </td>

                        <!-- Amount -->
                        <td class="whitespace-nowrap px-4 py-4 text-center">{{ transaction.amount.amountWithCurrency }}</td>

                        <!-- Percentage -->
                        <td v-if="showEverything" class="whitespace-nowrap px-4 py-4 text-center">{{ transaction.percentage.valueSymbol }}</td>

                        <!-- Payment Method -->
                        <td class="whitespace-nowrap px-4 py-4 text-center">{{ transaction._relationships.paymentMethod.name }}</td>

                        <!-- Paid By -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <span v-if="transaction._relationships.paidByUser">{{ transaction._relationships.paidByUser._attributes.name }}</span>
                            <span v-else class="text-xs text-center text-gray-300">---</span>
                        </td>

                        <!-- Verified By -->
                        <td class="text-xs text-center text-gray-300">
                            <span v-if="transaction._relationships.verifiedByUser" class="whitespace-nowrap px-4 py-4">{{ transaction._relationships.verifiedByUser._attributes.name }}</span>
                            <BadgeIndicator v-else :active="false" :text="appName" inactiveType="info" :showDot="false"></BadgeIndicator>
                        </td>

                        <!-- Requested By -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <span v-if="transaction._relationships.requestedByUser">{{ transaction._relationships.requestedByUser._attributes.name }}</span>
                            <span v-else class="text-xs text-center text-gray-300">---</span>
                        </td>

                        <!-- DPO Payment Link -->
                        <td class="px-4 py-4">
                            <div v-if="transaction.dpoPaymentUrl" class="max-w-80">
                                <ExternalLink :url="transaction.dpoPaymentUrl" class="text-xs">{{ transaction.dpoPaymentUrl }}</ExternalLink>
                            </div>
                            <span v-else class="text-xs text-center text-gray-300">---</span>
                        </td>

                        <!-- DPO Link Status -->
                        <td class="text-xs text-center text-gray-300">
                            <span v-if="transaction._attributes.dpoPaymentLinkHasExpired == null" class="text-xs text-center text-gray-300">---</span>
                            <BadgeIndicator v-else :active="transaction._attributes.dpoPaymentLinkHasExpired == false" :text="transaction._attributes.dpoPaymentLinkHasExpired == false ? 'Active' : 'Expired'" inactiveType="warning" :showDot="false"></BadgeIndicator>
                        </td>

                        <!-- DPO Expiry Date -->
                        <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                            <div v-if="transaction.dpoPaymentUrlExpiresAt" class="flex space-x-1 items-center">
                                <span>{{ formattedDatetime(transaction.dpoPaymentUrlExpiresAt) }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(transaction.dpoPaymentUrlExpiresAt)" placement="top"></MoreInfoPopover>
                            </div>
                            <span v-else class="text-xs text-center text-gray-300">---</span>
                        </td>

                        <!-- Created At -->
                        <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <span>{{ formattedDatetime(transaction.createdAt) }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(transaction.createdAt)" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Action -->
                        <td class="px-4 py-4 flex items-center space-x-4">

                            <!-- Edit Button -->
                            <a v-if="!isDeleting(transaction)" href="#" @click.stop.prevent="onView(transaction)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>

                            <!-- Deleting Loader -->
                            <SpiningLoader v-if="isDeleting(transaction)" type="danger">
                                <span class="text-xs ml-2">Deleting...</span>
                            </SpiningLoader>

                            <!-- Delete Button -->
                            <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(transaction)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

                        </td>

                    </tr>
                </template>

            </template>

        </BasicTable>

        <!-- No Transactions -->
        <div v-else class="p-8 border rounded-lg bg-gray-50">

            <div class="flex justify-between space-x-20 mb-2">

                <div>
                    <span class="text-8xl">💵</span>
                </div>

                <div class="space-y-3">

                    <!-- No Transactions Header -->
                    <h1 class="text-lg font-bold">No Transactions Yet</h1>

                    <!-- No Transactions Instruction -->
                    <p class="text-sm">Your transactions will appear here once customers start paying for this order. <span class="underline decoration-dashed underline-offset-4">Request payments</span> or <span class="underline decoration-dashed underline-offset-4">mark this order as paid</span>.</p>

                </div>

            </div>

            <div class="flex justify-end">

                <!-- Transaction Action Buttons -->
                <slot name="actionButtons"></slot>

            </div>

        </div>

        <!-- Confirm Delete Transaction -->
        <ConfirmModal v-if="deletableTransaction" approveText="Delete Transaction" :approveAction="deleteTransaction" :isLoading="isDeleting(deletableTransaction)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">transaction #{{ deletableTransaction._attributes.number }}</span>?</p>
            </template>

            <template #trigger="triggerProps">

                <!-- Delete Transaction Button - Triggers Confirmation Modal -->
                <PrimaryButton ref="confirmDeleteButton" @click="triggerProps.showModal" class="hidden" type="danger">
                    Delete Transaction
                </PrimaryButton>

            </template>


        </ConfirmModal>

    </div>

</template>

<script>

    import settings from '@Js/settings.js';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ExternalLink from '@Partials/links/ExternalLink.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import TransactionPaymentStatus from '@Components/transaction/TransactionPaymentStatus.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            AddButton, TextHeader, BasicTable, ExternalLink, ConfirmModal, ShineEffect, LineSkeleton, SpiningLoader,
            PrimaryButton, MoreInfoPopover, ToogleSwitch, BadgeIndicator, TransactionPaymentStatus
        },
        props: {
            order: {
                type: Object
            },
            isLoadingOrder: {
                type: Boolean
            },
            refreshOrder: {
                type: Function
            }
        },
        data() {
            return {
                transactions: [],
                pagination: null,
                searchTerm: null,
                showEverything: false,
                appName: settings.appName,
                deletableTransaction: null,
                isDeletingTransactionIds: [],
                isLoadingTransactions: false,
                storeState: useStoreState(),
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['#', 'Description', 'Payment Status', 'Amount', 'Percentage', 'Payment Method', 'Paid By', 'Verified By', 'Requested By', 'DPO Payment Link', 'DPO Link Status', 'DPO Expiry Date', 'Created Date', '']
                    : ['#', 'Payment Status', 'Amount', 'Payment Method', 'Paid By', 'Verified By', 'Requested By', 'DPO Payment Link', 'DPO Link Status', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onView(transaction) {
                this.$router.push({
                    name: 'show-store-transaction',
                    params: { 'store_href': this.store._links.self, 'transaction_href': transaction._links.self }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            showDeleteConfirmationModal(transaction) {
                this.deletableTransaction = transaction;

                /**
                 *  After setting the deletableTransaction, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  deletableTransaction._attributes.number value. This is
                 *  only available on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(transaction) {
                return this.isDeletingTransactionIds.findIndex((id) => id == transaction.id) != -1;
            },
            paginate(url) {
                this.url = url;
                this.getTransactions();
            },
            search(searchTerm) {
                this.url = this.store._links.showTransactions;
                this.searchTerm = searchTerm;
                this.getTransactions();
            },
            getTransactions() {

                //  Start loader
                this.isLoadingTransactions = true;

                //  Set the query params
                const params = {
                    'withPayingUser': '1',
                    'withVerifyingUser': '1',
                    'withPaymentMethod': '1',
                    'withRequestingUser': '1'
                }

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                getApi(this.url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.transactions = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingTransactions = false;

                }).catch(errorException => {

                    console.log(errorException);

                    //  Stop loader
                    this.isLoadingTransactions = false;

                });

            },
            deleteTransaction() {

                //  Start loader
                this.isDeletingTransactionIds.push(this.deletableTransaction.id);

                deleteApi(this.deletableTransaction._links.deleteTransaction, this.form).then(response => {

                    //  Stop loader
                    this.isDeletingTransactionIds.splice(this.isDeletingTransactionIds.findIndex((id) => id == this.deletableTransaction.id, 1));

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Transaction deleted');

                        //  If we are not deleting any other transactions, then refresh the transaction list
                        if(this.isDeletingTransactionIds.length == 0) this.getTransactions();

                        //this.refreshOrder();

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingTransactionIds.splice(this.isDeletingTransactionIds.findIndex((id) => id == this.deletableTransaction.id, 1));

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {

            this.url = this.order._links.showTransactions;
            this.getTransactions();

        }
    };

</script>
