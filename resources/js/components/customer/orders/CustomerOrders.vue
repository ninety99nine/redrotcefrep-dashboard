<template>

    <div>

        <div v-if="!(isLoadingOrders || isLoadingCustomer) && (pagination ?? {}).total > 0" class="flex justify-between items-center border-dashed pb-6">

            <div class="flex items-center">

                <!-- Text Heading -->
                <TextHeader><span class="mr-2">🎁</span> Orders</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Orders are requests placed by customers to purchase products or services from your store." placement="top"></MoreInfoPopover>

            </div>

            <template v-if="(pagination ?? {}).total > 0">

                <!-- Order Action Buttons -->
                <slot name="actionButtons"></slot>

            </template>

        </div>

        <!-- Orders Table -->
        <BasicTable v-if="isLoadingOrders || isLoadingCustomer || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingOrders || isLoadingCustomer" @paginate="paginate" @search="search" @refresh="getOrders" :totalHeaders="tableHeaders.length">

            <template #primaryFilters>

                <!-- Show Everything Toggle Switch -->
                <ToogleSwitch
                    v-model="showEverything" size="md"
                    labelPopoverTitle="What Is This?"
                    labelPopoverDescription="Turn on if you want to show more information about your orders">
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
                <tr @click.stop="onView(order)" v-for="(order, index) in orders" :key="order.id" :class="['group cursor-pointer border-b', checkedRowIds[index] ? 'bg-blue-100' : 'bg-white hover:bg-gray-50']">

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
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <OrderPaymentStatus :order="order" moreInfoPopoverClasses="opacity-0 group-hover:opacity-100"></OrderPaymentStatus>
                    </td>

                    <!-- Collection Status -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <OrderCollectionStatus :order="order" moreInfoPopoverClasses="opacity-0 group-hover:opacity-100"></OrderCollectionStatus>
                    </td>

                    <!-- Grand Total -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span class="font-bold">{{ order.grandTotal.amountWithCurrency }}</span>
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

                    <!-- Amount Paid -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ order.paidTotal.amountWithCurrency }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="'Paid: '+order.paidPercentage.valueSymbol" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Amount Pending -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ order.pendingTotal.amountWithCurrency }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="'Pending: '+order.pendingPercentage.valueSymbol" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Amount Outstanding -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ order.outstandingTotal.amountWithCurrency }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="'Outstanding: '+order.outstandingPercentage.valueSymbol" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Special Note -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <NoDataPlaceholder v-if="order.specialNote"></NoDataPlaceholder>
                            <span v-else>{{ order.specialNote }}</span>
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

                        <!-- View Button -->
                        <a v-if="!isDeleting(order)" href="#" @click.stop.prevent="onView(order)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>

                        <!-- Deleting Loader -->
                        <SpinningLoader v-if="isDeleting(order)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpinningLoader>

                        <!-- Delete Button -->
                        <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(order)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

                    </td>

                </tr>
            </template>

        </BasicTable>

        <!-- No Orders -->
        <div v-else class="p-8 border rounded-lg bg-gray-50">

            <div class="flex items-center space-x-8">

                <div>
                    <span class="text-8xl">🎁</span>
                </div>

                <div class="space-y-2">

                    <!-- No Orders Header -->
                    <h1 class="text-lg font-bold">No Orders Yet</h1>

                    <!-- No Orders Instruction -->
                    <p class="text-gray-500 text-sm">Orders will appear here once your customer starts shopping.</p>

                </div>

            </div>

            <div class="flex justify-end">

                <!-- Order Action Buttons -->
                <slot name="actionButtons"></slot>

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
                <PrimaryButton ref="confirmDeleteButton" :action="triggerProps.showModal" class="hidden" type="danger">
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
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import OrderStatus from '@Components/order/OrderStatus.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import OrderPaymentStatus from '@Components/order/OrderPaymentStatus.vue';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';
    import OrderCollectionStatus from '@Components/order/OrderCollectionStatus.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            TextHeader, AddButton, BasicTable, Checkbox, OrderStatus, ConfirmModal, SpinningLoader,
            PrimaryButton, MoreInfoPopover, ToogleSwitch, OrderPaymentStatus, NoDataPlaceholder,
            OrderCollectionStatus
        },
        props: {
            customer: {
                type: Object
            },
            isLoadingCustomer: {
                type: Boolean
            },
            refreshCustomer: {
                type: Function
            }
        },
        data() {
            return {
                orders: [],
                pagination: null,
                searchTerm: null,
                checkedRowIds: [],
                showEverything: false,
                deletableOrder: null,
                isDeletingOrderIds: [],
                isLoadingOrders: false,
                storeState: useStoreState(),
            }
        },
        watch: {
            'isLoadingCustomer'(newValue, oldValue) {

                if(newValue == false) {
                    this.getOrders();
                }

            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['', 'Name', 'Customer', 'Summary', 'status', 'Payment Status', 'Collection Status', 'Grand Total', 'Paid', 'Pending', 'Outstanding', 'Special Note', 'Created Date', '']
                    : ['', 'Name', 'Customer', 'Summary', 'status', 'Grand Total', 'Created Date', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onView(order) {
                this.$router.push({
                    name: 'show-store-order',
                    params: { 'store_href': this.store._links.showStore, 'order_href': order._links.showOrder }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            showDeleteConfirmationModal(order) {
                this.deletableOrder = order;

                /**
                 *  After setting the deletableOrder, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  deletableOrder values. This is only available
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
                this.$router.push({ name: 'create-store-order', params: { 'store_href': this.store._links.showStore } });
            },
            paginate(url) {
                this.getOrders(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getOrders();
            },
            getOrders(url = null) {

                //  Start loader
                this.isLoadingOrders = true;

                //  Set the query params
                const params = {
                    'association': 'teamMember',
                    '_relationships': 'cart'
                }

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                url = url ?? this.customer._links.showCustomerOrders;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.orders = this.pagination.data;

                        this.checkedRowIds = this.orders.map((_) => false);
                    }

                    //  Stop loader
                    this.isLoadingOrders = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingOrders = false;

                    this.setServerFormErrors(errorException);

                });

            },
            deleteOrder() {

                //  Start loader
                this.isDeletingOrderIds.push(this.deletableOrder.id);

                deleteApi(this.deletableOrder._links.deleteOrder).then(response => {

                    //  Stop loader
                    this.isDeletingOrderIds.splice(this.isDeletingOrderIds.findIndex((id) => id == this.deletableOrder.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Order deleted');

                            //  If we are not deleting any other orders, then refresh the order list
                            if(this.isDeletingOrderIds.length == 0) this.getOrders();

                            this.refreshCustomer();

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingOrderIds.splice(this.isDeletingOrderIds.findIndex((id) => id == this.deletableOrder.id, 1));

                    this.setServerFormErrors(errorException);

                });

            }
        }
    };

</script>
