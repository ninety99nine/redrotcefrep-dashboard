<template>

    <div class="pt-24 pb-80 px-8 relative">

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-0">

        <div class="relative">

            <div class="flex flex-col items-center mb-8">
                <h1 class="space-x-2 text-xl text-gray-700 font-semibold bg-white rounded-full py-2 px-8 mb-4">
                    <span>💵</span>
                    <span>Transactions</span>
                </h1>
                <img src="/images/store-rooftop.png" class="w-96">
            </div>

            <!-- Transactions Table -->
            <BasicTable v-if="isLoadingTransactions || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingTransactions" @paginate="paginate" @search="search" @refresh="getTransactions" :totalHeaders="tableHeaders.length">

                <template #header v-if="(pagination ?? {}).total > 0">

                    <div class="flex justify-center my-4">

                        <!-- Show Everything Toggle Switch -->
                        <ToogleSwitch
                            v-model="showEverything" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on if you want to show more information about your transactions">
                            Show Everything
                        </ToogleSwitch>

                    </div>

                </template>

                <template #afterRefreshButton>

                    <!-- Add Transaction Button -->
                    <Button :action="onAddTransaction" type="primary" size="sm" icon="add">
                        <span>Add Transaction</span>
                    </Button>

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
                    <tr @click.stop="onView(transaction)" v-for="(transaction, index) in transactions" :key="transaction.id" :class="['group cursor-pointer border-b', checkedRowIds[index] ? 'bg-blue-100' : 'bg-white hover:bg-gray-50']">

                        <!-- Checkbox -->
                        <td @click.stop class="whitespace-nowrap pl-4">

                            <Checkbox
                                size="xs"
                                v-model="checkedRowIds[index]">
                            </Checkbox>

                        </td>

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

                        <!-- Requester -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <span v-if="transaction._relationships.requestedByUser">{{ transaction._relationships.requestedByUser._attributes.name }}</span>
                            <span v-else class="text-xs text-center text-gray-300">---</span>
                        </td>

                        <!-- Verifyer -->
                        <td class="text-xs text-center text-gray-300">
                            <span v-if="transaction._relationships.verifiedByUser" class="whitespace-nowrap px-4 py-4">{{ transaction._relationships.verifiedByUser._attributes.name }}</span>
                            <Pill v-else type="info" :text="appName" :showDot="false"></Pill>
                        </td>

                        <!-- Payment Link -->
                        <td class="px-4 py-4" @click.stop>
                            <div v-if="transaction.metadata" class="flex items-start space-x-2">
                                <div v-if="transaction.metadata.canPayUsingDpo" class="max-w-80">
                                    <ExternalLink :url="transaction.metadata.dpoPaymentUrl" class="text-xs">{{ transaction.metadata.dpoPaymentUrl }}</ExternalLink>
                                </div>
                                <Pill v-else-if="transaction.metadata.dpoPaymentLinkHasExpired == true" type="warning" text="Expired" :showDot="false"></Pill>
                                <span v-else class="text-xs text-center text-gray-300">---</span>

                                <MoreInfoPopover v-if="transaction.metadata.canPayUsingDpo" title="Expires In" placement="top" class="opacity-0 group-hover:opacity-100 mt-1">
                                    <template #description>
                                        <div class="border-t border-dashed my-2"></div>
                                        <Countdown
                                            :showMoreInfoPopover="false"
                                            :time="transaction.metadata.dpoPaymentUrlExpiresAt">
                                        </Countdown>
                                    </template>
                                </MoreInfoPopover>
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

                            <!-- View Button -->
                            <a v-if="!isDeleting(transaction)" href="#" @click.stop.prevent="onView(transaction)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>

                            <!-- Deleting Loader -->
                            <SpinningLoader v-if="isDeleting(transaction)" type="danger">
                                <span class="text-xs ml-2">Deleting...</span>
                            </SpinningLoader>

                            <!-- Delete Button -->
                            <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(transaction)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

                        </td>

                    </tr>
                </template>

            </BasicTable>

            <!-- No Transactions -->
            <div v-else class="flex justify-between space-x-20 bg-white shadow-lg rounded-lg border p-20">
                <div class="space-y-4">
                    <h1 class="text-2xl font-bold">No Transactions Yet</h1>
                    <p>Your transactions will appear here once <Pill type="primary" text="customers" :showDot="false" :clickable="true" :action="navigateToShowCustomers"></Pill> start paying. Start promoting your store to attract buyers and generate sales. Promote your store on as many platforms as possible.</p>

                    <!-- Add Transaction Button -->
                    <AddButton :action="onAddTransaction" class="w-40" size="sm">
                        <span class="ml-2">Add Transaction</span>
                    </AddButton>
                </div>
                <div>
                    <span class="text-8xl">💵</span>
                </div>
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
                <PrimaryButton ref="confirmDeleteButton" :action="triggerProps.showModal" class="hidden" type="danger">
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
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import ExternalLink from '@Partials/links/ExternalLink.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import Pill from '@Partials/pills/Pill.vue';
    import TransactionPaymentStatus from '@Components/transaction/TransactionPaymentStatus.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            AddButton, TextHeader, BasicTable, Checkbox, Countdown, ExternalLink, ConfirmModal, SpinningLoader,
            PrimaryButton, MoreInfoPopover, ToogleSwitch, Pill, TransactionPaymentStatus
        },
        data() {
            return {
                transactions: [],
                pagination: null,
                searchTerm: null,
                checkedRowIds: [],
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
                    ? ['', 'Trans #', 'Description', 'Payment Status', 'Amount', 'Percentage', 'Payment Method', 'Requester', 'Verifyer', 'Payment Link', 'Created Date', '']
                    : ['', 'Trans #', 'Payment Status', 'Amount', 'Payment Method', 'Requester', 'Verifyer', 'Payment Link', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onView(transaction) {
                this.$router.push({
                    name: 'show-store-transaction',
                    params: { 'store_href': this.store._links.showStore, 'transaction_href': transaction._links.showTransaction }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            navigateToShowCustomers() {
                this.$router.push({ name: 'show-store-customers', params: { 'store_href': this.store._links.showStore } });
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
            onAddTransaction() {
                this.$router.push({ name: 'create-store-transaction', params: { 'store_href': this.store._links.showStore } });
            },
            paginate(url) {
                this.getTransactions(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getTransactions();
            },
            getTransactions(url = null) {

                //  Start loader
                this.isLoadingTransactions = true;

                //  Set the query params
                const params = {
                    '_relationships': 'customer,requestedByUser,manuallyVerifiedByUser,paymentMethod'
                }

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                url = url ?? this.store._links.showStoreTransactions;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.transactions = this.pagination.data;

                        this.checkedRowIds = this.transactions.map((_) => false);
                    }

                    //  Stop loader
                    this.isLoadingTransactions = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingTransactions = false;

                });

            },
            deleteTransaction() {

                //  Start loader
                this.isDeletingTransactionIds.push(this.deletableTransaction.id);

                deleteApi(this.deletableTransaction._links.deleteTransaction).then(response => {

                    //  Stop loader
                    this.isDeletingTransactionIds.splice(this.isDeletingTransactionIds.findIndex((id) => id == this.deletableTransaction.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Transaction deleted');

                            //  If we are not deleting any other transactions, then refresh the transaction list
                            if(this.isDeletingTransactionIds.length == 0) this.getTransactions();

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingTransactionIds.splice(this.isDeletingTransactionIds.findIndex((id) => id == this.deletableTransaction.id, 1));

                    this.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {

        },
        created() {
            this.getTransactions();
        }
    };

</script>
