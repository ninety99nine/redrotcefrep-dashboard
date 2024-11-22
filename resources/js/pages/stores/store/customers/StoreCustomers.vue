<template>

    <div>

        <div class="flex justify-between items-center border-dashed py-6">

            <div class="flex items-center">

                <!-- Text Heading -->
                <TextHeader><span class="mr-2">😊</span> Customers</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Customers are people who are interested in buying your goods or services" placement="top"></MoreInfoPopover>


            </div>

            <template v-if="(pagination ?? {}).total > 0">

                <!-- Show Everything Toggle Switch -->
                <ToogleSwitch
                    v-model="showEverything" size="md"
                    labelPopoverTitle="What Is This?"
                    labelPopoverDescription="Turn on if you want to show more information about your customers">
                    Show Everything
                </ToogleSwitch>

                <!-- Add Customer Button -->
                <AddButton :action="onAddCustomer" class="w-44">
                    <span class="ml-2">Add Customer</span>
                </AddButton>

            </template>

        </div>

        <!-- Customers Table -->
        <BasicTable v-if="isLoadingCustomers || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingCustomers" @paginate="paginate" @search="search" @refresh="getCustomers" :totalHeaders="tableHeaders.length">

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
                <tr @click.stop="onView(customer)" v-for="(customer, index) in customers" :key="customer.id" :class="['group cursor-pointer border-b', checkedRowIds[index] ? 'bg-blue-100' : 'bg-white hover:bg-gray-50']">

                    <!-- Checkbox -->
                    <td @click.stop class="whitespace-nowrap pl-4">

                        <Checkbox
                            size="xs"
                            v-model="checkedRowIds[index]">
                        </Checkbox>

                    </td>

                    <!-- Name -->
                    <td class="whitespace-nowrap align-top px-4 py-4">

                        <div class="flex space-x-1 items-center w-40">
                            <span>{{ customer._attributes.name }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="customer._attributes.name" :description="customer.notes" placement="top"></MoreInfoPopover>
                        </div>

                    </td>

                    <!-- Mobile Number -->
                    <td class="align-top px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <NoDataPlaceholder v-if="customer.mobileNumber == null"></NoDataPlaceholder>
                            <span v-else>{{ customer.mobileNumber.national }}</span>
                        </div>
                    </td>

                    <!-- Email -->
                    <td class="align-top px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <NoDataPlaceholder v-if="customer.email == null"></NoDataPlaceholder>
                            <span v-else>{{ customer.email }}</span>
                        </div>
                    </td>

                    <!-- Birthday -->
                    <td v-if="showEverything" class="align-top px-4 py-4">
                        <div class="flex space-x-1 items-center w-24">
                            <NoDataPlaceholder v-if="customer.birthday == null"></NoDataPlaceholder>
                            <span v-else>{{ formattedDate(customer.birthday) }}</span>
                        </div>
                    </td>

                    <!-- Total Orders -->
                    <td class="align-top px-4 py-4">
                        <span>{{ customer.totalOrders }}</span>
                    </td>

                    <!-- Total Spend -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <span>{{ customer.totalSpend.amountWithCurrency }}</span>
                    </td>

                    <!-- Total Average Spend -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <span>{{ customer.totalAverageSpend.amountWithCurrency }}</span>
                    </td>

                    <!-- Last Order At Date -->
                    <td v-if="showEverything" class="whitespace-nowrap align-top px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(customer.lastOrderAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(customer.lastOrderAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Created Date -->
                    <td v-if="showEverything" class="whitespace-nowrap align-top px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(customer.createdAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(customer.createdAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Action -->
                    <td class="align-top px-4 py-4 flex items-center space-x-4">

                        <!-- View Button -->
                        <a v-if="!isDeleting(customer)" href="#" @click.stop.prevent="onView(customer)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>

                        <!-- Deleting Loader -->
                        <SpiningLoader v-if="isDeleting(customer)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpiningLoader>

                        <!-- Delete Button -->
                        <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(customer)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

                    </td>

                </tr>
            </template>

        </BasicTable>

        <!-- No Customers -->
        <div v-else class="flex justify-between space-x-20 bg-white shadow-lg rounded-lg border p-20">
            <div class="space-y-4">
                <h1 class="text-2xl font-bold">Add your first customer</h1>
                <p>Start building your customer base! You can <BadgeIndicator type="primary" text="invite customers" :showDot="false"></BadgeIndicator> directly or let them find you through your amazing offers and services.</p>

                <!-- Add Customer Button -->
                <AddButton :action="onAddCustomer" class="w-40" size="sm">
                    <span class="ml-2">Add Customer</span>
                </AddButton>
            </div>
            <div>
                <span class="text-8xl">🎉</span>
            </div>
        </div>

        <!-- Confirm Delete Customer -->
        <ConfirmModal v-if="deletableCustomer" approveText="Delete Customer" :approveAction="deleteCustomer" :isLoading="isDeleting(deletableCustomer)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ deletableCustomer.name }}</span>?</p>
            </template>

            <template #trigger="triggerProps">

                <!-- Delete Customer Button - Triggers Confirmation Modal -->
                <PrimaryButton ref="confirmDeleteButton" @click="triggerProps.showModal" class="hidden" type="danger">
                    Delete Customer
                </PrimaryButton>

            </template>


        </ConfirmModal>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            AddButton, TextHeader, BasicTable, Checkbox, ConfirmModal, PrimaryButton,
            SpiningLoader, MoreInfoPopover, ToogleSwitch, BadgeIndicator,
            NoDataPlaceholder
        },
        data() {
            return {
                customers: [],
                pagination: null,
                searchTerm: null,
                checkedRowIds: [],
                showEverything: false,
                deletableCustomer: null,
                isDeletingCustomerIds: [],
                isLoadingCustomers: false,
                storeState: useStoreState(),
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['', 'Name', 'Mobile Number', 'Email', 'Birthday', 'Total Orders', 'Total Spend', 'Total Average Spend', 'Last Order Date', 'Created Date', '']
                    : ['', 'Name', 'Mobile Number', 'Email', 'Total Orders', 'Total Spend', '']
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onView(customer) {
                this.$router.push({
                    name: 'show-store-customer',
                    params: { 'store_href': this.store._links.showStore, 'customer_href': customer._links.showCustomer }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            showDeleteConfirmationModal(customer) {
                this.deletableCustomer = customer;

                /**
                 *  After setting the deletableCustomer, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  deletableCustomer.name value. This is only available
                 *  on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(customer) {
                return this.isDeletingCustomerIds.findIndex((id) => id == customer.id) != -1;
            },
            onAddCustomer() {
                this.$router.push({ name: 'create-store-customer', params: { 'store_href': this.store._links.showStore } });
            },
            paginate(url) {
                this.getCustomers(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getCustomers();
            },
            getCustomers(url = null) {

                //  Start loader
                this.isLoadingCustomers = true;

                //  Set the query params
                const params = {}

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                url = url ?? this.store._links.showStoreCustomers;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.customers = this.pagination.data;

                        this.checkedRowIds = this.customers.map((_) => false);
                    }

                    //  Stop loader
                    this.isLoadingCustomers = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingCustomers = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteCustomer() {

                //  Start loader
                this.isDeletingCustomerIds.push(this.deletableCustomer.id);

                deleteApi(this.deletableCustomer._links.deleteCustomer).then(response => {

                    //  Stop loader
                    this.isDeletingCustomerIds.splice(this.isDeletingCustomerIds.findIndex((id) => id == this.deletableCustomer.id, 1));

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Customer deleted');

                        //  If we are not deleting any other customers, then refresh the customer list
                        if(this.isDeletingCustomerIds.length == 0) this.getCustomers();

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingCustomerIds.splice(this.isDeletingCustomerIds.findIndex((id) => id == this.deletableCustomer.id, 1));

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {

        },
        created() {
            this.getCustomers();
        }
    };

</script>
