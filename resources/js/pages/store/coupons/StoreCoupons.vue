<template>

    <div>

        <div class="flex justify-between items-center border-dashed border-b py-6 mb-6">

            <div class="flex items-center">

                <!-- Text Heading -->
                <TextHeader><span class="mr-2">🥰</span> Coupons</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Coupons are promotional incentives that customers can claim while placing orders, such as discounts or free delivery. This encourages purchases and enhances the customer shopping experience." placement="top"></MoreInfoPopover>


            </div>

            <template v-if="(pagination ?? {}).total > 0">

                <!-- Show Everything Toggle Switch -->
                <ToogleSwitch
                    v-model="showEverything" size="md"
                    labelPopoverTitle="What Is This?"
                    labelPopoverDescription="Turn on if you want to show more information about your coupons">
                    Show Everything
                </ToogleSwitch>

                <!-- Add Coupon Button -->
                <AddButton :action="onAddCoupon" class="w-40">
                    <span class="ml-2">Add Coupon</span>
                </AddButton>

            </template>

        </div>

        <!-- Coupons Table -->
        <BasicTable v-if="isLoadingCoupons || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingCoupons" @paginate="paginate" @search="search" @refresh="getCoupons" :totalHeaders="tableHeaders.length">

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
                <tr @click.stop="onEdit(coupon)" v-for="coupon in coupons" :key="coupon.id" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

                    <!-- Name -->
                    <td class="whitespace-nowrap align-top px-4 py-4">

                        <div class="flex space-x-1 items-center w-40">
                            <span>{{ coupon.name }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="coupon.name" :description="coupon.description" placement="top"></MoreInfoPopover>
                        </div>

                    </td>

                    <!-- Description -->
                    <td class="align-top px-4 py-4">
                        <div class="flex space-x-1 items-center w-80">
                            <span v-if="coupon.description == null">...</span>
                            <span v-else>{{ coupon.description }}</span>
                        </div>
                    </td>

                    <!-- Instruction -->
                    <td v-if="showEverything" class="align-top px-4 py-4">
                        <div class="w-80 bg-gray-100 border py-2 px-6 mb-2 shadow-md">
                            <ul class="space-y-2 list-disc">
                                <li v-for="(instruction, index) in coupon._attributes.instructions" :key="index">{{ instruction }}</li>
                            </ul>
                        </div>
                    </td>

                    <!-- Active -->
                    <td class="whitespace-nowrap align-top px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <BadgeIndicator :active="coupon.active.status" :text="coupon.active.name" :inactiveType="coupon.active.status ? 'success' : 'warning'" :showDot="false"></BadgeIndicator>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :description="coupon.active.description" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Offers -->
                    <td class="whitespace-nowrap align-top px-4 py-4">

                        <div class="flex items-center space-x-2">
                            <template v-if="coupon.offerDiscount.status">
                                <BadgeIndicator v-if="coupon.discountType == 'Fixed'" :active="true" :text="coupon.discountFixedRate.amountWithCurrency+' Discount'" :showDot="false"></BadgeIndicator>
                                <BadgeIndicator v-else-if="coupon.discountType == 'Percentage'" :active="true" :text="coupon.discountPercentageRate.valueSymbol+' Discount'" :showDot="false"></BadgeIndicator>
                            </template>
                            <BadgeIndicator v-if="coupon.offerFreeDelivery.status" :active="true" text="Free Delivery" :showDot="false"></BadgeIndicator>

                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Instructions" placement="top">

                                <template #description>
                                    <div class="whitespace-normal space-y-2 border-t border-dashed pt-2 mt-4">
                                        <p v-for="(instruction, index) in coupon._attributes.instructions" :key="index">{{ instruction }}</p>
                                    </div>
                                </template>

                            </MoreInfoPopover>

                        </div>

                    </td>

                    <!-- Created Date -->
                    <td v-if="showEverything" class="whitespace-nowrap align-top px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(coupon.createdAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(coupon.createdAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                    <!-- Action -->
                    <td class="align-top px-4 py-4 flex items-center space-x-4">

                        <!-- Edit Button -->
                        <a v-if="!isDeleting(coupon)" href="#" @click.stop.prevent="onEdit(coupon)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>

                        <!-- Deleting Loader -->
                        <SpiningLoader v-if="isDeleting(coupon)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpiningLoader>

                        <!-- Delete Button -->
                        <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(coupon)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

                    </td>

                </tr>
            </template>

        </BasicTable>

        <!-- No Coupons -->
        <div v-else class="flex justify-between space-x-20 p-20 border rounded-lg bg-gray-50">
            <div class="space-y-4">
                <h1 class="text-2xl font-bold">Add your coupons</h1>
                <p>Create amazing incentives for your customers, such as offering <span class="underline decoration-dashed underline-offset-4">discounts</span> or <span class="underline decoration-dashed underline-offset-4">free delivery</span>, while determining who can claim them and when.</p>

                <!-- Add Coupon Button -->
                <AddButton :action="onAddCoupon" class="w-40" size="sm">
                    <span class="ml-2">Add Coupon</span>
                </AddButton>
            </div>
            <div>
                <span class="text-8xl">🥰</span>
            </div>
        </div>

        <!-- Confirm Delete Coupon -->
        <ConfirmModal v-if="deletableCoupon" approveText="Delete Coupon" :approveAction="deleteCoupon" :isLoading="isDeleting(deletableCoupon)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ deletableCoupon.name }}</span>?</p>
            </template>

            <template #trigger="triggerProps">

                <!-- Delete Coupon Button - Triggers Confirmation Modal -->
                <PrimaryButton ref="confirmDeleteButton" @click="triggerProps.showModal" class="hidden" type="danger">
                    Delete Coupon
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
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            AddButton, TextHeader, BasicTable, ConfirmModal, PrimaryButton,
            SpiningLoader, MoreInfoPopover, ToogleSwitch, BadgeIndicator

        },
        data() {
            return {
                coupons: [],
                pagination: null,
                searchTerm: null,
                showEverything: false,
                deletableCoupon: null,
                isDeletingCouponIds: [],
                isLoadingCoupons: false,
                storeState: useStoreState(),
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['Name', 'Description', 'Instructions', 'Status', 'Offers', 'Created Date', '']
                    : ['Name', 'Description', 'Status', 'Offers', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onEdit(coupon) {
                this.$router.push({ name: 'show-store-coupon', params: { 'store_href': this.store._links.self, 'coupon_href': coupon._links.self } });
            },
            showDeleteConfirmationModal(coupon) {
                this.deletableCoupon = coupon;

                /**
                 *  After setting the deletableCoupon, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  deletableCoupon.name value. This is only available
                 *  on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(coupon) {
                return this.isDeletingCouponIds.findIndex((id) => id == coupon.id) != -1;
            },
            onAddCoupon() {
                this.$router.push({ name: 'create-store-coupon', params: { 'store_href': this.store._links.self } });
            },
            paginate(url) {
                this.url = url;
                this.getCoupons();
            },
            search(searchTerm) {
                this.url = this.store._links.showCoupons;
                this.searchTerm = searchTerm;
                this.getCoupons();
            },
            getCoupons() {

                //  Start loader
                this.isLoadingCoupons = true;

                //  Set the query params
                const params = {}

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                getApi(this.url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.coupons = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingCoupons = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingCoupons = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteCoupon() {

                //  Start loader
                this.isDeletingCouponIds.push(this.deletableCoupon.id);

                deleteApi(this.deletableCoupon._links.deleteCoupon, this.form).then(response => {

                    //  Stop loader
                    this.isDeletingCouponIds.splice(this.isDeletingCouponIds.findIndex((id) => id == this.deletableCoupon.id, 1));

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Coupon deleted');

                        //  If we are not deleting any other coupons, then refresh the coupon list
                        if(this.isDeletingCouponIds.length == 0) this.getCoupons();

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingCouponIds.splice(this.isDeletingCouponIds.findIndex((id) => id == this.deletableCoupon.id, 1));

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
            this.url = this.store._links.showCoupons;
            this.getCoupons();
        }
    };

</script>
