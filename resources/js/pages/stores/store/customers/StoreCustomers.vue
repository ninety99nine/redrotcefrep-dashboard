<template>

    <div class="pt-24 pb-80 px-8 relative">

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-0">

        <div class="relative">

            <div class="flex flex-col items-center mb-8">
                <h1 class="space-x-2 text-xl text-gray-700 font-semibold bg-white rounded-full py-2 px-8 mb-4">
                    <span>😊</span>
                    <span>Customers</span>
                </h1>
                <img src="/images/store-rooftop.png" class="w-96">
            </div>

            <!-- Customers Table -->
            <BasicTable v-if="isLoadingCustomers || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingCustomers" @paginate="paginate" @search="search" @refresh="getCustomers" :totalHeaders="tableHeaders.length">

                <template #header v-if="(pagination ?? {}).total > 0">

                    <div class="flex justify-center my-4">

                        <!-- Show Everything Toggle Switch -->
                        <ToogleSwitch
                            v-model="showEverything" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on if you want to show more information about your products">
                            Show Everything
                        </ToogleSwitch>

                    </div>

                </template>

                <template #afterRefreshButton>

                    <!-- Add Customer Button -->
                    <Button :action="onAddCustomer" type="primary" size="sm" icon="add">
                        <span>Add Customer</span>
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
                    <tr @click.stop="onView(customer)" v-for="(customer, index) in customers" :key="customer.id" :class="['group cursor-pointer border-b', checkedRowIds[index] ? 'bg-blue-100' : 'bg-white hover:bg-gray-50']">

                        <!-- Checkbox -->
                        <td @click.stop class="whitespace-nowrap pl-4">

                            <Checkbox
                                size="xs"
                                v-model="checkedRowIds[index]">
                            </Checkbox>

                        </td>

                        <!-- Name -->
                        <td class="whitespace-nowrap px-4 py-4">

                            <div class="flex space-x-1 items-center w-40">
                                <span>{{ customer._attributes.name }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="customer._attributes.name" :description="customer.notes" placement="top"></MoreInfoPopover>
                            </div>

                        </td>

                        <!-- Mobile Number -->
                        <td class="px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <NoDataPlaceholder v-if="customer.mobileNumber == null"></NoDataPlaceholder>
                                <span v-else>{{ customer.mobileNumber.national }}</span>
                            </div>
                        </td>

                        <!-- Email -->
                        <td class="px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <NoDataPlaceholder v-if="customer.email == null"></NoDataPlaceholder>
                                <span v-else>{{ customer.email }}</span>
                            </div>
                        </td>

                        <!-- Birthday -->
                        <td v-if="showEverything" class="px-4 py-4">
                            <div class="flex space-x-1 items-center w-24">
                                <NoDataPlaceholder v-if="customer.birthday == null"></NoDataPlaceholder>
                                <span v-else>{{ formattedDate(customer.birthday) }}</span>
                            </div>
                        </td>

                        <!-- Total Orders -->
                        <td class="text-center px-4 py-4">
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
                        <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <span>{{ formattedDatetime(customer.lastOrderAt) }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(customer.lastOrderAt)" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Created Date -->
                        <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <span>{{ formattedDatetime(customer.createdAt) }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(customer.createdAt)" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Action -->
                        <td class="px-4 py-4 flex items-center space-x-4">

                            <!-- View Button -->
                            <a v-if="!isDeleting(customer)" href="#" @click.stop.prevent="onView(customer)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>

                            <!-- Deleting Loader -->
                            <SpinningLoader v-if="isDeleting(customer)" type="danger">
                                <span class="text-xs ml-2">Deleting...</span>
                            </SpinningLoader>

                            <!-- Delete Button -->
                            <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(customer)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

                        </td>

                    </tr>
                </template>

            </BasicTable>

            <!-- No Customers -->
            <div v-else class="flex justify-center">

                <div
                    class="animated-border-blue w-96 bg-white py-4 px-4 shadow-sm space-y-4 rounded-xl">

                    <h1 class="text-xl font-bold">
                        Add Your First Customer
                    </h1>

                    <p class="text-sm text-gray-500">
                        Start building your customer base! You can add customers directly or let them find you by marketing your store.
                    </p>

                    <div class="flex justify-end">

                        <!-- Add Button -->
                        <Button :action="onAddCustomer" type="primary" size="sm" icon="add">
                            <span>Add Customer</span>
                        </Button>

                    </div>
                </div>

            </div>

        </div>

        <!-- Confirm Delete Customer -->
        <ConfirmModal ref="deleteCustomerModal" approveText="Delete Customer" :approveAction="deleteCustomer" :isLoading="isDeleting(deletableCustomer)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p v-if="deletableCustomer" class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ deletableCustomer._attributes.name }}</span>?</p>
            </template>

        </ConfirmModal>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            Pill, Button, BasicTable, Checkbox, ConfirmModal, SpinningLoader,
            MoreInfoPopover, ToogleSwitch, NoDataPlaceholder
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
        watch: {
            isLoadingStore(newValue) {
                if(!newValue) {
                    this.getCustomers();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['', 'Name', 'Mobile Number', 'Email', 'Birthday', 'Total Orders', 'Total Average Spend', 'Total Spend', 'Last Order Date', 'Created Date', '']
                    : ['', 'Name', 'Mobile Number', 'Email', 'Total Orders', 'Total Spend', '']
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onView(customer) {

                if(this.isDeletingCustomerIds.length) return;

                this.$router.push({
                    name: 'show-store-customer',
                    params: { 'store_href': this.store._links.showStore, 'customer_href': customer._links.showCustomer }
                });
            },
            onAddCustomer() {
                if(this.isDeletingCustomerIds.length) return;
                this.$router.push({ name: 'create-store-customer', params: { 'store_href': this.store._links.showStore } });
            },
            showDeleteConfirmationModal(customer) {
                this.deletableCustomer = customer;
                this.deleteCustomerModal.showModal();
            },
            isDeleting(customer) {
                return this.isDeletingCustomerIds.findIndex((id) => id == customer.id) != -1;
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

                        if(response.data.deleted) {

                            this.showSuccessfulNotification('Customer deleted');
                            if(this.isDeletingCustomerIds.length == 0) this.getCustomers();

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingCustomerIds.splice(this.isDeletingCustomerIds.findIndex((id) => id == this.deletableCustomer.id, 1));

                    this.setServerFormErrors(errorException);

                });

            },
        },
        mounted() {
            this.deleteCustomerModal = this.$refs.deleteCustomerModal;
        },
        created() {
            this.isLoadingCustomers = true;
        }
    };

</script>
