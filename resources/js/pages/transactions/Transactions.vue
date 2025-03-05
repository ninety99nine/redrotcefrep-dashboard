<template>

    <div class="px-16 pt-8">

        <div class="flex items-center border-dashed border-b py-6 mb-6">

            <!-- Text Heading -->
            <TextHeader>Transactions</TextHeader>

            <!-- More Info Popover -->
            <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" :description="'Transactions are records of online and offline payments for goods and services whether initiated and verified by the '+appName+' system or users within the '+appName+' ecosystem'" placement="top"></MoreInfoPopover>

        </div>

        <!-- Transactions Table -->
        <BasicTable :pagination="pagination" :isLoading="isFetching" @paginate="paginate" @search="search" @refresh="_getTransactions" :showAddFilter="true" :filters="filters" @addOrUpdateFilter="addOrUpdateFilter" @showSelectedFilter="showSelectedFilter" @hideFilterModal="hideFilterModal" @removeFilter="removeFilter" :totalHeaders="tableHeaders.length">

            <!-- Filters -->
            <template v-slot:primaryFilters>

                <!-- Payment Status Filter -->
                <select v-model="paymentStatusFilter" @change="_getTransactions" id="select-payment-status" class="w-48 block p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="all">Payment Status = All</option>
                    <option value="paid">Paid</option>
                    <option value="pending payment">Pending Payment</option>
                </select>

                <!-- Verified By Filter -->
                <select v-model="verifiedByFilter" @change="_getTransactions" id="select-verified-by" class="w-40 block p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="all">Verified By = All</option>
                    <option value="system">{{ appName }}</option>
                    <option value="user">User</option>
                </select>

                <!-- Verified Filter -->
                <select v-model="paymentMethodFilter" @change="_getTransactions" id="select-verified" class="w-48 block p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="all">Payment Method = All</option>
                    <option value="Airtime">Airtime</option>
                    <option value="Ewallet">Ewallet</option>
                    <option value="Pay2Cell">Pay2Cell</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="MyZaka">MyZaka</option>
                    <option value="BTC Smega">BTC Smega</option>
                    <option value="Unayo">Unayo</option>
                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>

            </template>

            <!-- Modal Filters -->
            <template v-slot:modalFilters>

                <!-- Modal Date Name Picker -->
                <div class="lg:col-span-6 col-span-12">

                    <label for="select-filter" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Select Filter</label>
                    <select v-model="dateNameFilter" id="select-filter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="startAt">Start date</option>
                        <option value="endAt">End date</option>
                    </select>

                </div>

                <!-- Modal Date Operation Picker -->
                <div class="lg:col-span-6 col-span-12">

                    <label for="select-filter-operation" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Select Operation</label>
                    <select v-model="dateOperationFilter" id="select-filter-operation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="gte">Greater or equal to</option>
                        <option value="lte">Less or equal to</option>
                        <option value="gt">Greater than</option>
                        <option value="lt">Less than</option>
                        <option value="e">Equal to</option>
                    </select>

                </div>

                <!-- Modal Date Value Picker -->
                <div class="col-span-12">

                    <Datepicker v-model="dateValueFilter" :key="dateValueFilter"></Datepicker>

                </div>

            </template>

            <!-- Table Head -->
            <template v-slot:head>
                <tr>

                    <!-- Table Header -->
                    <th v-for="(tableHeader, index) in tableHeaders" :key="index" scope="col" class="whitespace-nowrap px-4 py-3">
                        {{ tableHeader }}
                    </th>

                </tr>
            </template>

            <!-- Table Body -->
            <template v-slot:body>
                <tr @click.stop="onView(transaction)" v-for="(transaction, index) in transactions" :key="index" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

                    <!-- For -->
                    <td class="whitespace-nowrap px-4 py-4">{{ capitalizeAllWords(transaction.ownerType) }}</td>

                    <!-- Description -->
                    <td class="px-4 py-4">
                        <div class="min-w-80">{{ transaction.description }}</div>
                    </td>

                    <!-- Payment Status -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <Pill :type="transaction.paymentStatus.name.toLowerCase() == 'paid' ? 'success' : 'warning'" :text="transaction.paymentStatus.name"></Pill>
                    </td>

                    <!-- Amount -->
                    <td class="whitespace-nowrap px-4 py-4 text-center">{{ transaction.amount.amountWithCurrency }}</td>

                    <!-- Percentage -->
                    <td class="whitespace-nowrap px-4 py-4 text-center">{{ transaction.percentage.valueSymbol }}</td>

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
                        <Pill v-else type="info" :text="appName" :showDot="false"></Pill>
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

                    <!-- DPO Expiry Date -->
                    <td class="text-xs text-center text-gray-300">
                        <span v-if="transaction._attributes.dpoPaymentLinkHasExpired == null" class="text-xs text-center text-gray-300">---</span>
                        <Pill v-else :type="transaction._attributes.dpoPaymentLinkHasExpired == false ? 'success' : 'warning'" :text="transaction._attributes.dpoPaymentLinkHasExpired == false ? 'Active' : 'Expired'" :showDot="false"></Pill>
                    </td>

                    <!-- DPO Expiry Date -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div v-if="transaction.dpoPaymentUrlExpiresAt" class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(transaction.dpoPaymentUrlExpiresAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(transaction.dpoPaymentUrlExpiresAt)" placement="top"></MoreInfoPopover>
                        </div>
                        <span v-else class="text-xs text-center text-gray-300">---</span>
                    </td>

                    <!-- Created At -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(transaction.createdAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(transaction.createdAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Action -->
                    <td class="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-4 space-x-4">
                        <a href="#" @click.stop.prevent="onEdit(transaction)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        <a href="#" @click.stop.prevent="onDelete(transaction)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                    </td>

                </tr>
            </template>

        </BasicTable>

    </div>

</template>

<script>

    import settings from '@Js/settings.js';
    import { initFlowbite } from "flowbite";
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ExternalLink from '@Partials/links/ExternalLink.vue';
    import Datepicker from '@Partials/datepicker/Datepicker.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getTransactions } from '@Repositories/transaction-repository.js';

    export default {
        mixins: [UtilsMixin],
        components: { TextHeader, BasicTable, ExternalLink, Datepicker, MoreInfoPopover },
        data() {
            return {
                url: null,
                searchTerm: null,
                pagination: null,
                isFetching: false,
                transactions: [],
                appName: settings.appName,
                tableHeaders: ['For', 'Description', 'Payment Status', 'Amount', 'Percentage', 'Payment Method', 'Paid By', 'Verified By', 'Requested By', 'DPO Payment Link', 'DPO Link Status', 'DPO Expiry Date', 'Created Date', ''],

                paymentStatusFilter: 'all',
                verifiedByFilter: 'all',
                paymentMethodFilter: 'all',

                dateNameFilter: null,
                dateValueFilter: null,
                dateOperationFilter: null,
                filters: [

                ]
            }
        },
        methods: {
            onView(transaction) {
                console.log('view:'+transaction.name);
            },
            onEdit(transaction) {
                console.log('edit:'+transaction.name);
            },
            onDelete(transaction) {
                console.log('delete:'+transaction.name);
            },
            paginate(url) {
                this.url = url;
                this._getTransactions();
            },
            search(searchTerm) {
                this.url = null;
                this.searchTerm = searchTerm;
                this._getTransactions();
            },
            addOrUpdateFilter(filterIndex) {

                var symbol = '';

                if(this.dateOperationFilter == 'gte') {

                    symbol = '>=';

                }else if(this.dateOperationFilter == 'lte') {

                    symbol = '<=';

                }else if(this.dateOperationFilter == 'gt') {

                    symbol = '>';

                }else if(this.dateOperationFilter == 'lt') {

                    symbol = '<';

                }else if(this.dateOperationFilter == 'e') {

                    symbol = '=';

                }

                this.filters = this.filters.filter(filter => filter.name !== this.dateNameFilter);

                const newFilter = {
                    'name': this.dateNameFilter,
                    'value': this.dateValueFilter,
                    'operation': this.dateOperationFilter,
                    'displayName': this.dateNameFilter+' '+symbol+' '+this.dateValueFilter
                };

                if( filterIndex == null) {

                    //  Add new filter
                    this.filters.push(newFilter);

                }else{

                    //  Update with new filter
                    this.filters[filterIndex] = newFilter;

                }

                this._getTransactions();
            },
            showSelectedFilter(filter) {
                this.dateNameFilter = filter.name;
                this.dateValueFilter = filter.value;
                this.dateOperationFilter = filter.operation;
            },
            resetAddFilterModal() {
                this.dateNameFilter = 'startAt';
                this.dateOperationFilter = 'gte';
                this.dateValueFilter = this.formattedDate();    //  UtilsMixin
            },
            hideFilterModal() {
                this.resetAddFilterModal();
            },
            removeFilter() {
                this._getTransactions();
            },
            _getTransactions() {

                this.isFetching = true;

                const params = {
                    'with_paying_user': '1',
                    'search': this.searchTerm,
                    'with_payment_method': '1',
                    'with_verifying_user': '1',
                    'with_requesting_user': '1',
                }

                if(this.verifiedByFilter != 'all') params['verifiedBy'] = this.verifiedByFilter;
                if(this.paymentMethodFilter != 'all') params['paymentMethod'] = this.paymentMethodFilter;
                if(this.paymentStatusFilter != 'all') params['paymentStatus'] = this.paymentStatusFilter;

                for (let i = 0; i < this.filters.length; i++) {

                    const filter = this.filters[i];

                    if(['startAt', 'endAt'].includes(filter.name)) {

                        /**
                         *  Set the filter name, operation and timestamp
                         *
                         *  params['startAt'] = 'gte-170915760000';
                         *  params['endAt'] = 'gte-170915760000';
                         */
                        params[filter.name] = filter.operation+'-'+this.dateToTimestamp(filter.value);    //  UtilsMixin

                    }

                }

                getTransactions(this.url, params).then(response => {

                    if(response.status == 200) {

                        this.pagination = response.data;
                        this.transactions = this.pagination.data;

                    }

                    //  Stop loader
                    this.isFetching = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isFetching = false;

                });

            },
        },
        mounted() {

            /**
             *  Flowbite javascript will not work unless we deliberately
             *  Initialize Flowbite on mount of the Vue component.
             *
             *  Reference: https://stackoverflow.com/questions/76043935/flowbite-is-not-working-with-inertia-laravel-app
             */
            initFlowbite();

        },
        created() {
            this.resetAddFilterModal();
            this._getTransactions();
        }
    };

</script>
