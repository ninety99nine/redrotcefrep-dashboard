<template>

    <div class="pt-24 pb-80 px-8 relative">

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-0">

        <div class="relative">

            <div class="flex flex-col items-center mb-8">
                <h1 class="space-x-2 text-xl text-gray-700 font-semibold bg-white rounded-full py-2 px-8 mb-4">
                    <span>🤩</span>
                    <span>Promotions</span>
                </h1>
                <img src="/images/store-rooftop.png" class="w-96">
            </div>

            <!-- Promotions Table -->
            <BasicTable v-if="isLoadingPromotions || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingPromotions" @paginate="paginate" @search="search" @refresh="getPromotions" :totalHeaders="tableHeaders.length">

                <template #header v-if="(pagination ?? {}).total > 0">

                    <div class="flex justify-center my-4">

                        <!-- Show Everything Toggle Switch -->
                        <ToggleSwitch
                            v-model="showEverything" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on if you want to show more information about your promotions">
                            Show Everything
                        </ToggleSwitch>

                    </div>

                </template>

                <template #afterRefreshButton>

                    <!-- Add Promotion Button -->
                    <Button :action="onAddPromotion" type="primary" size="sm" icon="add">
                        <span>Add Promotion</span>
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
                    <tr @click.stop="onView(promotion)" v-for="(promotion, index) in promotions" :key="promotion.id" :class="['group cursor-pointer border-b', checkedRowIds[index] ? 'bg-blue-100' : 'bg-white hover:bg-gray-50']">

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
                                <span>{{ promotion.name }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="promotion.name" :description="promotion.description" placement="top"></MoreInfoPopover>
                            </div>

                        </td>

                        <!-- Description -->
                        <td class="align-top px-4 py-4">
                            <div class="flex space-x-1 items-center w-80">
                                <NoDataPlaceholder v-if="promotion.description == null"></NoDataPlaceholder>
                                <span v-else>{{ promotion.description }}</span>
                            </div>
                        </td>

                        <!-- Instruction -->
                        <td v-if="showEverything" class="align-top px-4 py-4">
                            <div class="w-80 bg-green-50 border border-green-200 rounded-md py-2 px-6 mb-2 shadow-md">
                                <ul class="space-y-2 list-disc text-xs">
                                    <li v-for="(instruction, index) in promotion._attributes.instructions" :key="index">{{ instruction }}</li>
                                </ul>
                            </div>
                        </td>

                        <!-- Status -->
                        <td class="whitespace-nowrap align-top px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <Pill :type="promotion.active.status ? 'success' : 'warning'" size="xs">{{ promotion.active.name }}</Pill>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :description="promotion.active.description" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Offers -->
                        <td class="whitespace-nowrap align-top px-4 py-4">

                            <div class="flex items-center space-x-2">

                                <template v-if="promotion.offerDiscount.status">
                                    <Pill type="success" size="xs">
                                        <template v-if="promotion.discountType.toLowerCase() == RATE_TYPES.FLAT">
                                            {{ `${promotion.discountFlatRate.amountWithCurrency} Discount` }}
                                        </template>
                                        <template v-else-if="promotion.discountType.toLowerCase() == 'percentage'">
                                            {{ `${promotion.discountPercentageRate.valueSymbol} Discount` }}
                                        </template>
                                    </Pill>
                                </template>

                                <Pill v-if="promotion.offerFreeDelivery.status" type="success" size="xs">Free Delivery</Pill>

                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Instructions" placement="top">

                                    <template #description>
                                        <div class="whitespace-normal space-y-2 border-t border-dashed pt-2 mt-4">
                                            <p v-for="(instruction, index) in promotion._attributes.instructions" :key="index">{{ instruction }}</p>
                                        </div>
                                    </template>

                                </MoreInfoPopover>

                            </div>

                        </td>

                        <!-- Created Date -->
                        <td v-if="showEverything" class="whitespace-nowrap align-top px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <span>{{ formattedDatetime(promotion.createdAt) }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(promotion.createdAt)" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Action -->
                        <td class="align-top px-4 py-4 flex items-center space-x-4">

                            <!-- View Button -->
                            <span v-if="!isDeleting(promotion)" @click.stop.prevent="onView(promotion)" class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">View</span>

                            <!-- Deleting Loader -->
                            <SpinningLoader v-if="isDeleting(promotion)" type="danger">
                                <span class="text-xs ml-2">Deleting...</span>
                            </SpinningLoader>

                            <!-- Delete Button -->
                            <span v-else @click.stop.prevent="showDeleteConfirmationModal(promotion)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span>

                        </td>

                    </tr>
                </template>

            </BasicTable>

            <!-- No Promotions -->
            <div v-else class="flex justify-center">

                <div
                    class="animated-border-blue w-96 bg-white py-4 px-4 shadow-sm space-y-4 rounded-xl">

                    <h1 class="text-xl font-bold">
                        Create Your First Promotion
                    </h1>

                    <p class="text-sm text-gray-500">
                        Create amazing incentives for your customers, such as offering discounts and free delivery, while determining who can claim them and when.
                    </p>

                    <div class="flex justify-end">

                        <!-- Add Button -->
                        <Button :action="onAddPromotion" type="primary" size="sm" icon="add">
                            <span>Add Promotion</span>
                        </Button>

                    </div>
                </div>

            </div>

        </div>

        <!-- Confirm Delete Promotion -->
        <ConfirmModal ref="deletePromotionModal" approveText="Delete Promotion" :approveAction="deletePromotion" :isLoading="isDeleting(deletablePromotion)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p v-if="deletablePromotion" class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ deletablePromotion.name }}</span>?</p>
            </template>

        </ConfirmModal>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import { RATE_TYPES } from '@Enums/enums.js';
    import Button from '@Partials/buttons/Button.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';
    import { formattedDatetime, formattedRelativeDate } from '@Utils/dateUtils.js';

    export default {
        inject: ['formState', 'storeState', 'notificationState'],
        components: {
            Pill, Button, BasicTable, Checkbox, ConfirmModal, SpinningLoader,
            MoreInfoPopover, ToggleSwitch, NoDataPlaceholder
        },
        data() {
            return {
                promotions: [],
                pagination: null,
                searchTerm: null,
                checkedRowIds: [],
                showEverything: false,
                deletablePromotion: null,
                isDeletingPromotionIds: [],
                isLoadingPromotions: false,
            }
        },
        watch: {
            store(newValue) {
                if(newValue) {
                    this.getPromotions();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['', 'Name', 'Description', 'Instructions', 'Status', 'Offers', 'Created Date', '']
                    : ['', 'Name', 'Description', 'Status', 'Offers', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            formattedDatetime: formattedDatetime,
            formattedRelativeDate: formattedRelativeDate,
            onView(promotion) {

                if(this.isDeletingPromotionIds.length) return;

                this.$router.push({
                    name: 'show-store-promotion',
                    params: { 'store_href': this.store._links.showStore, 'promotion_href': promotion._links.showPromotion }
                });
            },
            showDeleteConfirmationModal(promotion) {
                this.deletablePromotion = promotion;
                this.deletePromotionModal.showModal();
            },
            isDeleting(promotion) {
                return this.isDeletingPromotionIds.findIndex((id) => id == promotion.id) != -1;
            },
            onAddPromotion() {
                if(this.isDeletingPromotionIds.length) return;
                this.$router.push({ name: 'create-store-promotion', params: { 'store_href': this.store._links.showStore } });
            },
            paginate(url) {
                this.getPromotions(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getPromotions();
            },
            getPromotions(url = null) {

                //  Start loader
                this.isLoadingPromotions = true;

                //  Set the query params
                const params = {}

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                url = url ?? this.store._links.showStorePromotions;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.promotions = this.pagination.data;

                        this.checkedRowIds = this.promotions.map((_) => false);
                    }

                    //  Stop loader
                    this.isLoadingPromotions = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingPromotions = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deletePromotion() {

                //  Start loader
                this.isDeletingPromotionIds.push(this.deletablePromotion.id);

                deleteApi(this.deletablePromotion._links.deletePromotion).then(response => {

                    //  Stop loader
                    this.isDeletingPromotionIds.splice(this.isDeletingPromotionIds.findIndex((id) => id == this.deletablePromotion.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification('Promotion deleted');
                            if(this.isDeletingPromotionIds.length == 0) this.getPromotions();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingPromotionIds.splice(this.isDeletingPromotionIds.findIndex((id) => id == this.deletablePromotion.id, 1));

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {
            this.deletePromotionModal = this.$refs.deletePromotionModal;
        },
        created() {
            this.isLoadingPromotions = true;
        }
    };

</script>
