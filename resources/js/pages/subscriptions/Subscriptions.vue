<template>

    <div class="px-16 pt-8">

        <div class="flex items-center border-dashed border-b py-6 mb-6">

            <!-- Text Heading -->
            <TextHeader>Subscriptions</TextHeader>

            <!-- More Info Popover -->
            <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Subscriptions are records of transactions for services that have a start and end date such as Store or AI Assistant subscriptions" placement="top"></MoreInfoPopover>

        </div>

        <!-- Subscriptions Table -->
        <BasicTable :pagination="pagination" :isLoading="isFetching" @paginate="paginate" @search="search" @refresh="_getSubscriptions" :showAddFilter="true" :filters="filters" @addOrUpdateFilter="addOrUpdateFilter" @showSelectedFilter="showSelectedFilter" @hideFilterModal="hideFilterModal" @removeFilter="removeFilter" :totalHeaders="tableHeaders.length">

            <!-- Filters -->
            <template v-slot:primaryFilters>

                <!-- Service Filter -->
                <select v-model="serviceFilter" @change="_getSubscriptions" id="select-service" class="w-40 block p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="all">Service = All</option>
                    <option value="store">Store</option>
                    <option value="sms alert">Sms Alerts</option>
                    <option value="ai assistant">Ai Assistant</option>
                </select>

                <!-- Status Filter -->
                <select v-model="statusFilter" @change="_getSubscriptions" id="select-status" class="w-40 block p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="all">Status = All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
                <tr @click.stop="onView(subscription)" v-for="(subscription, index) in subscriptions" :key="index" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

                    <!-- User Name -->
                    <td class="whitespace-nowrap px-4 py-4">{{ subscription._relationships.user._attributes.name }}</td>

                    <!-- Mobile Number -->
                    <td class="whitespace-nowrap px-4 py-4">{{ subscription._relationships.user.mobileNumber.national }}</td>

                    <td class="whitespace-nowrap px-4 py-4">

                        <!-- Store Name -->
                        <template v-if="subscription.ownerType.toLowerCase() == 'store'">
                            <div class="flex space-x-1 items-center">
                                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                </svg>
                                <span>{{ subscription._relationships.owner.name }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="subscription._relationships.owner.name" placement="top">

                                    <template v-slot:description>

                                        <p>{{ subscription._relationships.owner.description }}</p>

                                    </template>

                                </MoreInfoPopover>
                            </div>
                        </template>

                        <!-- AI Assistant -->
                        <template v-else-if="subscription.ownerType.toLowerCase() == 'ai assistant'">
                            <div class="flex space-x-1 items-center text-blue-500">
                                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <span>Ai Assistant</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Ai Assistant" placement="top">

                                    <template v-slot:description>

                                        <p>Total Requests: {{ subscription._relationships.owner.totalRequests }}</p>
                                        <p>Remaining Tokens: {{ subscription._relationships.owner.remainingPaidTokens }}</p>
                                        <div class="my-4 border-b"></div>
                                        <p>Request Tokens Used: {{ subscription._relationships.owner.requestTokensUsed }}</p>
                                        <p>Response Tokens Used: {{ subscription._relationships.owner.responseTokensUsed }}</p>

                                    </template>

                                </MoreInfoPopover>
                            </div>
                        </template>

                        <!-- SMS Alert -->
                        <template v-else-if="subscription.ownerType.toLowerCase() == 'sms alert'">
                            <div class="flex space-x-1 items-center text-green-500">
                                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                </svg>
                                <span>Sms Alerts</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Sms Alerts" placement="top">

                                    <template v-slot:description>

                                        <p>Sms Credits Left: {{ subscription._relationships.owner.smsCredits }}</p>

                                    </template>

                                </MoreInfoPopover>
                            </div>
                        </template>
                        <template v-else>{{ capitalizeAllWords(subscription.ownerType) }}</template>
                    </td>

                    <!-- Status -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <Pill :type="subscription.hasExpired == false ? 'success' : 'warning'" :text="subscription.hasExpired ? 'Inactive' : 'Active'" :showDot="false"></Pill>
                    </td>

                    <!-- Start At -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(subscription.startAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(subscription.startAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- End At -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(subscription.endAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(subscription.endAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Subscription Plan -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ subscription._relationships.subscriptionPlan.name }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="subscription._relationships.subscriptionPlan.name" placement="top">

                                <template v-slot:description>

                                    <p>{{ subscription._relationships.subscriptionPlan.description }}</p>

                                </template>

                            </MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Action -->
                    <td class="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-4 space-x-4">
                        <a href="#" @click.stop.prevent="onEdit(subscription)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        <a href="#" @click.stop.prevent="onDelete(subscription)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                    </td>

                </tr>
            </template>

        </BasicTable>

    </div>

</template>

<script>

    import { initFlowbite } from "flowbite";
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import Datepicker from '@Partials/datepicker/Datepicker.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getSubscriptions } from '@Repositories/subscription-repository.js';

    export default {
        mixins: [UtilsMixin],
        components: { TextHeader, BasicTable, Datepicker, MoreInfoPopover },
        data() {
            return {
                url: null,
                searchTerm: null,
                pagination: null,
                isFetching: false,
                subscriptions: [],
                tableHeaders: ['Name', 'Mobile #', 'Service', 'Status', 'Start Date', 'End Date', 'Plan', ''],

                serviceFilter: 'all',
                statusFilter: 'all',

                dateNameFilter: null,
                dateValueFilter: null,
                dateOperationFilter: null,
                filters: [

                ]
            }
        },
        methods: {
            onView(subscription) {
                console.log('view:'+subscription.name);
            },
            onEdit(subscription) {
                console.log('edit:'+subscription.name);
            },
            onDelete(subscription) {
                console.log('delete:'+subscription.name);
            },
            paginate(url) {
                this.url = url;
                this._getSubscriptions();
            },
            search(searchTerm) {
                this.url = null;
                this.searchTerm = searchTerm;
                this._getSubscriptions();
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

                this._getSubscriptions();
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
                this._getSubscriptions();
            },
            _getSubscriptions() {

                this.isFetching = true;

                const params = {
                    'with_user': '1',
                    'with_owner': '1',
                    'search': this.searchTerm,
                    'with_subscription_plan': '1',
                }

                if(this.statusFilter != 'all') params['status'] = this.statusFilter;
                if(this.serviceFilter != 'all') params['service'] = this.serviceFilter;

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

                getSubscriptions(this.url, params).then(response => {

                    if(response.status == 200) {

                        this.pagination = response.data;
                        this.subscriptions = this.pagination.data;

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
            this._getSubscriptions();
        }
    };

</script>
