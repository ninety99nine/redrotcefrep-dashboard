<template>

    <div>

        <div class="flex justify-between items-center border-dashed border-b py-6 mb-6">

            <div class="flex items-center">

                <!-- Text Heading -->
                <TextHeader><span class="mr-2">🎁</span> Orders</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Orders are requests placed by customers to purchase products or services from your store." placement="top"></MoreInfoPopover>


            </div>

            <template v-if="(pagination ?? {}).total > 0">

                <!-- Show Everything Toggle Switch -->
                <ToogleSwitch
                    v-model="showEverything" size="md"
                    labelPopoverTitle="What Is This?"
                    labelPopoverDescription="Turn on if you want to show more information about your orders">
                    Show Everything
                </ToogleSwitch>

                <!-- Add Order Button -->
                <AddButton :action="onAddOrder" class="w-40">
                    <span class="ml-2">Add Order</span>
                </AddButton>

            </template>

        </div>

        <!-- Orders Table -->
        <BasicTable v-if="isLoadingOrders || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingOrders" @paginate="paginate" @search="search" @refresh="getOrders" :totalHeaders="tableHeaders.length">

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
                <tr @click.stop="onEdit(order)" v-for="order in orders" :key="order.id" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

                    <!-- Number -->
                    <td class="whitespace-nowrap px-4 py-4">

                        <div class="flex space-x-1 items-center">
                            <span>#{{ order._attributes.number }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="'#'+order._attributes.number" :description="order.summary" placement="top"></MoreInfoPopover>
                        </div>

                    </td>

                    <!-- Customer -->
                    <td class="px-4 py-4">
                        <div class="w-40">
                            <span>{{  order._attributes.customerDisplayName }}</span>
                        </div>
                    </td>

                    <!-- Summary -->
                    <td class="px-4 py-4">
                        <div class="w-60">
                            <span>{{  order.summary }}</span>
                        </div>
                    </td>

                    <!-- Status -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <OrderStatus :order="order" moreInfoPopoverClasses="opacity-0 group-hover:opacity-100"></OrderStatus>
                    </td>

                    <!-- Payment Status -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <OrderPaymentStatus :order="order" moreInfoPopoverClasses="opacity-0 group-hover:opacity-100"></OrderPaymentStatus>
                    </td>

                    <!-- Grand Total -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ order.grandTotal.amountWithCurrency }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Cost Breakdown" placement="top">

                                <template #description>
                                    <hr>
                                    <p>Subtotal: <span class="text-black">{{ order._relationships.cart.subTotal.amountWithCurrency }}</span></p>
                                    <p>Sale Discount: <span class="text-black">{{ order._relationships.cart.saleDiscountTotal.amountWithCurrency }}</span></p>
                                    <p>Coupon Discount: <span class="text-black">{{ order._relationships.cart.couponDiscountTotal.amountWithCurrency }}</span></p>
                                    <hr>
                                    <p class=" text-black">Grand Total: <span class="font-bold">{{ order.grandTotal.amountWithCurrency }}</span></p>
                                </template>

                            </MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Created Date -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(order.createdAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(order.createdAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Action -->
                    <td class="px-4 py-4 flex items-center space-x-4">

                        <!-- Edit Button -->
                        <a v-if="!isDeleting(order)" href="#" @click.stop.prevent="onEdit(order)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>

                        <!-- Deleting Loader -->
                        <SpiningLoader v-if="isDeleting(order)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpiningLoader>

                        <!-- Delete Button -->
                        <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(order)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

                    </td>

                </tr>
            </template>

        </BasicTable>

        <!-- No Orders -->
        <div v-else class="flex justify-between space-x-20 p-20 border rounded-lg bg-gray-50">
            <div class="space-y-4">
                <h1 class="text-2xl font-bold">Ready For Your First Sale?</h1>
                <p>Your orders will appear here once customers start shopping. Start promoting your store to attract buyers and generate sales. Promote your store on as many platforms as possible.</p>

                <!-- Add Order Button -->
                <AddButton :action="onAddOrder" class="w-40" size="sm">
                    <span class="ml-2">Add Order</span>
                </AddButton>
            </div>
            <div>
                <span class="text-8xl">🎁</span>
            </div>
        </div>

        <!-- Confirm Delete Order -->
        <ConfirmModal v-if="deletableOrder" approveText="Delete Order" :approveAction="deleteOrder" :isLoading="isDeleting(deletableOrder)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ deletableOrder.name }}</span>?</p>
            </template>

            <template #trigger="triggerProps">

                <!-- Delete Order Button - Triggers Confirmation Modal -->
                <PrimaryButton ref="confirmDeleteButton" @click="triggerProps.showModal" class="hidden" type="danger">
                    Delete Order
                </PrimaryButton>

            </template>


        </ConfirmModal>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import OrderStatus from '@Components/order/OrderStatus.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import OrderPaymentStatus from '@Components/order/OrderPaymentStatus.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { TextHeader, AddButton, BasicTable, OrderStatus, ConfirmModal, SpiningLoader, PrimaryButton, MoreInfoPopover, ToogleSwitch, OrderPaymentStatus },
        data() {
            return {
                orders: [],
                pagination: null,
                searchTerm: null,
                showEverything: false,
                deletableOrder: null,
                isDeletingOrderIds: [],
                isLoadingOrders: false,
                storeState: useStoreState(),
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['Name', 'Customer', 'Summary', 'status', 'Payment Status', 'Grand Total', 'Created Date', '']
                    : ['Name', 'Customer', 'Summary', 'status', 'Payment Status', 'Grand Total', 'Created Date', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onEdit(order) {
                this.$router.push({ name: 'show-store-order', params: { 'store_href': this.store._links.self, 'order_href': order._links.self } });
            },
            showDeleteConfirmationModal(order) {
                this.deletableOrder = order;

                /**
                 *  After setting the deletableOrder, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  deletableOrder.name value. This is only available
                 *  on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(order) {
                return this.isDeletingOrderIds.findIndex((id) => id == order.id) != -1;
            },
            onAddOrder() {
                this.$router.push({ name: 'create-store-order', params: { 'store_href': this.store._links.self } });
            },
            paginate(url) {
                this.url = url;
                this.getOrders();
            },
            search(searchTerm) {
                this.url = this.store._links.showOrders;
                this.searchTerm = searchTerm;
                this.getOrders();
            },
            getOrders() {

                //  Start loader
                this.isLoadingOrders = true;

                //  Set the query params
                const params = {
                    'withCart': '1',
                    'userOrderAssociation': 'teamMember'
                }

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                getApi(this.url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.orders = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingOrders = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingOrders = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteOrder() {

                //  Start loader
                this.isDeletingOrderIds.push(this.deletableOrder.id);

                deleteApi(this.deletableOrder._links.deleteOrder, this.form).then(response => {

                    //  Stop loader
                    this.isDeletingOrderIds.splice(this.isDeletingOrderIds.findIndex((id) => id == this.deletableOrder.id, 1));

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Order deleted');

                        //  If we are not deleting any other orders, then refresh the order list
                        if(this.isDeletingOrderIds.length == 0) this.getOrders();

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingOrderIds.splice(this.isDeletingOrderIds.findIndex((id) => id == this.deletableOrder.id, 1));

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
            this.url = this.store._links.showOrders;
            this.getOrders();
        }
    };

</script>
