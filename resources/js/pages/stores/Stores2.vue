<template>

    <div class="px-16 pt-8">

        <div class="flex justify-between items-center border-dashed py-6">

            <div class="flex items-center">

                <!-- Text Heading -->
                <h1 class="text-2xl font-bold tracking-tight text-gray-900">
                    <span class="mr-2">🥰</span>
                    <span>Stores</span>
                </h1>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Stores are businesses selling goods or services to customers" placement="top"></MoreInfoPopover>

            </div>

            <template v-if="(pagination ?? {}).total > 0">

                <!-- Show Everything Toggle Switch -->
                <ToggleSwitch
                    v-model="showEverything" size="md"
                    labelPopoverTitle="What Is This?"
                    labelPopoverDescription="Turn on if you want to show more information about stores">
                    Show Everything
                </ToggleSwitch>

                <!-- Create Store Button -->
                <Button :action="onCreateStore" class="w-40">
                    <span>Create Store</span>
                </Button>

            </template>

        </div>

        <!-- Stores Table -->
        <BasicTable v-if="isLoadingStores || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingStores" @paginate="paginate" @search="search" @refresh="getStores" :totalHeaders="tableHeaders.length">

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
                <tr @click.stop="onView(store)" v-for="(store, index) in stores" :key="store.id" :class="['group cursor-pointer border-b', checkedRowIds[index] ? 'bg-blue-100' : 'bg-white hover:bg-gray-50']">

                    <!-- Checkbox -->
                    <td @click.stop class="whitespace-nowrap pl-4">

                        <Checkbox
                            size="xs"
                            v-model="checkedRowIds[index]">
                        </Checkbox>

                    </td>

                    <!-- Logo -->
                    <td class="w-20">
                        <StoreLogo v-if="store.logo != null" :store="store" :canUpload="false" width="w-10" height="h-10"></StoreLogo>
                        <NoDataPlaceholder v-else class="text-center"></NoDataPlaceholder>
                    </td>

                    <!-- Name -->
                    <td class="whitespace-nowrap px-4 py-4">

                        <div class="flex space-x-1 items-center w-40">
                            <span>{{ store.name }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="store.name" :description="store.description" placement="top"></MoreInfoPopover>
                        </div>

                    </td>

                    <!-- Description -->
                    <td v-if="showEverything" class="px-4 py-4">
                        <div class="flex space-x-1 items-center w-80">
                            <NoDataPlaceholder v-if="store.description == null"></NoDataPlaceholder>
                            <span v-else>{{ store.description }}</span>
                        </div>
                    </td>

                    <!-- Call To Action -->
                    <td v-if="showEverything" class="px-4 py-4">
                        <span>{{ store.callToAction }}</span>
                    </td>

                    <!-- Status -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <Pill :type="store.online ? 'success' : 'warning'" size="xs" :showDot="false">{{ store.online ? 'Online' : 'Offline' }}</Pill>
                            <MoreInfoPopover v-if="store.online" class="opacity-0 group-hover:opacity-100" title="Status" description="This store is online" placement="top"></MoreInfoPopover>
                            <MoreInfoPopover v-else-if="store.offlineMessage" class="opacity-0 group-hover:opacity-100" title="Offline Message" :description="store.offlineMessage" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Mobile Number -->
                    <td class="px-4 py-4">
                        <span>{{ store.contactMobileNumber.national }}</span>
                    </td>

                    <!-- Creator -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex items-center space-x-1">
                            <template v-if="store._relationships.teamMemberAsCreator.length">
                                <span>{{ store._relationships.teamMemberAsCreator[0]._attributes.name }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="store._relationships.teamMemberAsCreator[0]._attributes.name" placement="top">
                                    <template #description>
                                        <div class="space-y-2 mt-4">
                                            <div>
                                                <span>Mobile: </span>
                                                <span class="font-semibold">{{ store._relationships.teamMemberAsCreator[0].mobileNumber.national }}</span>
                                            </div>
                                            <div>
                                                <span>Joined: </span>
                                                <span class="font-semibold">{{ formattedRelativeDate(store._relationships.teamMemberAsCreator[0].createdAt) }}</span>
                                            </div>
                                        </div>
                                    </template>
                                </MoreInfoPopover>
                            </template>
                            <NoDataPlaceholder v-else></NoDataPlaceholder>
                        </div>
                    </td>

                    <!-- Total Products -->
                    <td v-if="showEverything" class="px-4 py-4 text-center">
                        <NoDataPlaceholder v-if="store.productsCount == 0"></NoDataPlaceholder>
                        <span v-else>{{ store.productsCount }}</span>
                    </td>

                    <!-- Total Coupons -->
                    <td v-if="showEverything" class="px-4 py-4 text-center">
                        <NoDataPlaceholder v-if="store.couponsCount == 0"></NoDataPlaceholder>
                        <span v-else>{{ store.couponsCount }}</span>
                    </td>

                    <!-- Total Orders -->
                    <td v-if="showEverything" class="px-4 py-4 text-center">
                        <NoDataPlaceholder v-if="store.ordersCount == 0"></NoDataPlaceholder>
                        <span v-else>{{ store.ordersCount }}</span>
                    </td>

                    <!-- Total Reviews -->
                    <td v-if="showEverything" class="px-4 py-4 text-center">
                        <NoDataPlaceholder v-if="store.reviewsCount == 0"></NoDataPlaceholder>
                        <span v-else>{{ store.reviewsCount }}</span>
                    </td>

                    <!-- Total Followers -->
                    <td v-if="showEverything" class="px-4 py-4 text-center">
                        <NoDataPlaceholder v-if="store.followersCount == 0"></NoDataPlaceholder>
                        <span v-else>{{ store.followersCount }}</span>
                    </td>

                    <!-- Total Team Members -->
                    <td v-if="showEverything" class="px-4 py-4 text-center">
                        <NoDataPlaceholder v-if="store.teamMembersCount == 0"></NoDataPlaceholder>
                        <span v-else>{{ store.teamMembersCount }}</span>
                    </td>

                    <!-- Last Subscription Ends At -->
                    <td v-if="showEverything" class="px-4 py-4">
                        <Countdown v-if="isFutureDate(store.lastSubscriptionEndAt)"
                            :time="store.lastSubscriptionEndAt"
                            textClass="text-green-500 font-bold"
                            moreInfoPopoverClass="opacity-0 group-hover:opacity-100">
                        </Countdown>
                        <div v-else class="flex items-center space-x-1">
                            <span class="text-yellow-500">{{ formattedRelativeDate(store.lastSubscriptionEndAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Subscription End Date" :description="formattedDatetime(store.lastSubscriptionEndAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Orange Money Enabled -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <template v-if="store.orangeMoneyPaymentEnabled">
                                <Pill :type="store.orangeMoneyPaymentEnabled ? 'success' : 'info'" size="xs" :showDot="false">{{ store.orangeMoneyPaymentEnabled ? 'Enabled' : 'Disabled' }}</Pill>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Orange Money Merchant Code" :description="store.orangeMoneyMerchantCode" placement="top"></MoreInfoPopover>
                            </template>
                            <NoDataPlaceholder v-else></NoDataPlaceholder>
                        </div>
                    </td>

                    <!-- DPO Payment Enabled -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <template v-if="store.dpoPaymentEnabled">
                                <Pill :type="store.dpoPaymentEnabled ? 'success' : 'info'" size="xs" :showDot="false">{{ store.dpoPaymentEnabled ? 'Enabled' : 'Disabled' }}</Pill>
                                <MoreInfoPopover v-if="store.dpoPaymentEnabled" class="opacity-0 group-hover:opacity-100" title="DPO Company Token" :description="store.dpoCompanyToken" placement="top"></MoreInfoPopover>
                            </template>
                            <NoDataPlaceholder v-else></NoDataPlaceholder>
                        </div>
                    </td>

                    <!-- Allow Delivery -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <template v-if="store.allowDelivery">
                                <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Delivery" placement="top">
                                    <template #description>

                                        <div v-if="store.allowFreeDelivery == false" class="flex items-center space-x-1 mt-2 mb-4">
                                            <span class="text-xs">Flat Fee: </span>
                                            <span v-if="store.deliveryFlatFee.amount > 0">{{ store.deliveryFlatFee.amountWithCurrency }}</span>
                                            <Pill v-else type="info" size="xs" :showDot="false">None</Pill>
                                        </div>

                                        <div v-if="store.deliveryDestinations.length">

                                            <p class="font-semibold text-gray-900 mb-2">Delivery Destinations:</p>

                                            <table class="w-full text-xs">
                                                <thead>
                                                    <tr class="bg-gray-200">
                                                        <td class="py-2 px-2">Destination</td>
                                                        <td class="py-2 px-2">Delivery Fee</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(deliveryDestination, index) in store.deliveryDestinations" :key="index" class="border-t">
                                                        <td class="p-2">

                                                            <!-- Delivery Destination Physical Address -->
                                                            <div class="flex items-center space-x-1">
                                                                <svg class="w-3 h-3 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                                </svg>

                                                                <!-- Delivery Destination Name -->
                                                                <span>{{ deliveryDestination.name }}</span>
                                                            </div>

                                                        </td>
                                                        <td class="p-2">

                                                            <!-- Free Delivery -->
                                                            <span v-if="store.allowFreeDelivery" class="text-xs text-green-500 font-bold">Free Delivery</span>

                                                            <!-- Store Cost -->
                                                            <span v-else-if="store.deliveryFlatFee.amount != 0" class="text-xs text-green-500 font-bold">{{ store.deliveryFlatFee.amountWithCurrency }} (Flat Free)</span>

                                                            <template v-else>

                                                                <!-- Delivery Destination Allow Free Delivery -->
                                                                <Pill v-if="deliveryDestination.allowFreeDelivery" type="success" size="xs" :showDot="false">Free Delivery</Pill>

                                                                <!-- Delivery Destination Cost -->
                                                                <p v-else class="text-xs">{{ deliveryDestination.cost.amountWithCurrency }}</p>

                                                            </template>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </template>
                                </MoreInfoPopover>
                            </template>
                            <NoDataPlaceholder v-else></NoDataPlaceholder>
                        </div>
                    </td>

                    <!-- Allow Pickup -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <template v-if="store.allowPickup">
                                <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <MoreInfoPopover v-if="store.pickupDestinations.length" class="opacity-0 group-hover:opacity-100" title="Pickup Destinations" placement="top">
                                    <template #description>

                                        <table class="w-full text-xs mt-4">
                                            <thead>
                                                <tr class="bg-gray-200">
                                                    <td class="py-2 px-2">Destination</td>
                                                    <td class="py-2 px-2">Address</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(pickupDestination, index) in store.pickupDestinations" :key="index" class="border-t">
                                                    <td class="p-2">

                                                        <!-- Pickup Destination Name -->
                                                        <div class="flex items-center space-x-1">
                                                            <svg class="w-3 h-3 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                            </svg>

                                                            <!-- Name Input -->
                                                            <span>{{ pickupDestination.name }}</span>

                                                        </div>

                                                    </td>
                                                    <td class="p-2">

                                                        <!-- Pickup Destination Address Input -->
                                                        <NoDataPlaceholder v-if="pickupDestination.address == null"></NoDataPlaceholder>
                                                        <span v-else>{{ pickupDestination.address }}</span>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </template>
                                </MoreInfoPopover>
                            </template>
                            <NoDataPlaceholder v-else></NoDataPlaceholder>
                        </div>
                    </td>

                    <!-- Allow Deposits -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <template v-if="store.allowDepositPayments">
                                <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <MoreInfoPopover v-if="store.depositPercentages.length" class="opacity-0 group-hover:opacity-100" title="Deposit Percentages" placement="top">
                                    <template #description>
                                        <div class="flex space-x-2 mt-4">
                                            <div v-for="(depositPercentage, index) in store.depositPercentages" :key="index" class="bg-gray-100 py-1 px-2 rounded shadow">{{ depositPercentage }}%</div>
                                        </div>
                                    </template>
                                </MoreInfoPopover>
                            </template>
                            <NoDataPlaceholder v-else></NoDataPlaceholder>
                        </div>
                    </td>

                    <!-- Allow Installments -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <template v-if="store.allowInstallmentPayments">
                                <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <MoreInfoPopover v-if="store.installmentPercentages.length" class="opacity-0 group-hover:opacity-100" title="Installment Percentages" placement="top">
                                    <template #description>
                                        <div class="flex space-x-2 mt-4">
                                            <div v-for="(installmentPercentage, index) in store.installmentPercentages" :key="index" class="bg-gray-100 py-1 px-2 rounded shadow">{{ installmentPercentage }}%</div>
                                        </div>
                                    </template>
                                </MoreInfoPopover>
                            </template>
                            <NoDataPlaceholder v-else></NoDataPlaceholder>
                        </div>
                    </td>

                    <!-- SMS Sender Name -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div v-if="store.smsSenderName" class="flex items-center space-x-2">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            <span>{{ store.smsSenderName }}</span>
                        </div>
                        <NoDataPlaceholder v-else></NoDataPlaceholder>
                    </td>

                    <!-- Created Date -->
                    <td v-if="showEverything" class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(store.createdAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(store.createdAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Action -->
                    <td class="px-4 py-4 flex items-center space-x-4">

                        <!-- View Button -->
                        <a v-if="!isDeleting(store)" href="#" @click.stop.prevent="onView(store)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>

                        <!-- Deleting Loader -->
                        <SpinningLoader v-if="isDeleting(store)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpinningLoader>

                        <!-- Delete Button -->
                        <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(store)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

                    </td>

                </tr>
            </template>

        </BasicTable>

        <!-- No Coupons -->
        <div v-else class="flex justify-between space-x-20 bg-white shadow-lg rounded-lg border p-20">
            <div class="space-y-4">
                <h1 class="text-2xl font-bold">Ready to Start Selling? <span class="text-2xl">🌟</span></h1>
                <p>Get your store up and running in just a few minutes. Let’s turn your ideas into reality and start reaching customers today!</p>

                <!-- Add Coupon Button -->
                <Button type="primary" size="xs" :action="onCreateStore" class="w-40">
                    <span>Add Store</span>
                </Button>
            </div>
            <div>
                <span class="text-8xl">🌱</span>
            </div>
        </div>

        <!-- Confirm Delete Store -->
        <ConfirmModal v-if="deletableStore" approveText="Delete Store" :approveAction="deleteStore" :isLoading="isDeleting(deletableStore)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ deletableStore.name }}</span>?</p>
            </template>

        </ConfirmModal>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';
    import { isFutureDate, formattedDatetime, formattedRelativeDate } from '@Utils/dateUtils.js';

    export default {
        inject: ['apiState', 'formState', 'notificationState'],
        components: {
            Pill, Button, StoreLogo, BasicTable, Countdown, Checkbox, ConfirmModal,
            SpinningLoader, MoreInfoPopover, ToggleSwitch, NoDataPlaceholder
        },
        data() {
            return {
                stores: [],
                pagination: null,
                searchTerm: null,
                checkedRowIds: [],
                deletableStore: null,
                showEverything: false,
                isDeletingStoreIds: [],
                isLoadingStores: false
            }
        },
        computed: {
            tableHeaders() {
                return this.showEverything
                    ? ['', 'Logo', 'Name', 'Description', 'Call To Action', 'Status', 'Mobile Number', 'Creator', 'Products', 'Coupons', 'Orders', 'Reviews', 'Followers', 'Team Members', 'Subscription End', 'Orange Money', 'Direct Pay Online', 'Delivery', 'Pickup', 'Deposits', 'Installments', 'SMS Name', 'Created Date', '']
                    : ['', 'Logo', 'Name', 'Status', 'Mobile Number', 'Orange Money', 'Direct Pay Online', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            isFutureDate: isFutureDate,
            formattedDatetime: formattedDatetime,
            formattedRelativeDate: formattedRelativeDate,
            onView(store) {
                this.$router.push({
                    name: 'show-store-home',
                    params: { 'store_href': store._links.showStore }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            showDeleteConfirmationModal(store) {
                this.deletableStore = store;

                /**
                 *  After setting the deletableStore, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  deletableStore values. This is only available
                 *  on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(store) {
                return this.isDeletingStoreIds.findIndex((id) => id == store.id) != -1;
            },
            onCreateStore() {
                this.$router.push({ name: 'create-store' });
            },
            paginate(url) {
                this.url = url;
                this.getStores();
            },
            search(searchTerm) {
                this.url = this.apiState.apiHome._links['showStores'];
                this.searchTerm = searchTerm;
                this.getStores();
            },
            getStores() {

                //  Start loader
                this.isLoadingStores = true;

                //  Set the query params
                const params = {
                    '_relationships': 'teamMemberAsCreator'
                };

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                getApi(this.url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.stores = this.pagination.data;

                        this.checkedRowIds = this.stores.map((_) => false);
                    }

                    //  Stop loader
                    this.isLoadingStores = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingStores = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deleteStore() {

                //  Start loader
                this.isDeletingStoreIds.push(this.deletableStore.id);

                deleteApi(this.deletableStore._links.deleteStore).then(response => {

                    //  Stop loader
                    this.isDeletingStoreIds.splice(this.isDeletingStoreIds.findIndex((id) => id == this.deletableStore.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification('Store deleted');

                            //  If we are not deleting any other stores, then refresh the coupon list
                            if(this.isDeletingStoreIds.length == 0) this.getStores();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingStoreIds.splice(this.isDeletingStoreIds.findIndex((id) => id == this.deletableStore.id, 1));

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {

        },
        created() {
            this.url = this.apiState.apiHome._links['showStores'];
            this.getStores();
        }
    };

</script>
