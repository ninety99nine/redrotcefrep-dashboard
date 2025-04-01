<template>

    <div class="pt-24 pb-80 px-8 relative">

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-0">

        <div class="relative">

            <div class="flex flex-col items-center mb-8">
                <h1 class="space-x-2 text-xl text-gray-700 font-semibold bg-white rounded-full py-2 px-8 mb-4">
                    <span>🛍️</span>
                    <span>Products</span>
                </h1>
                <img src="/images/store-rooftop.png" class="w-96">
            </div>

            <!-- Products Table -->
            <BasicTable v-if="isLoadingProducts || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingProducts" @paginate="paginate" @search="search" @refresh="getProducts" :totalHeaders="tableHeaders.length">

                <template #header v-if="(pagination ?? {}).total > 0">

                    <div class="flex justify-center my-4">

                        <!-- Show Everything Toggle Switch -->
                        <ToggleSwitch
                            v-model="showEverything" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on if you want to show more information about your products">
                            Show Everything
                        </ToggleSwitch>

                    </div>

                </template>

                <template #afterRefreshButton>

                    <!-- Add Product Button -->
                    <Button :action="onAddProduct" type="primary" size="sm" icon="add">
                        <span>Add Product</span>
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
                <template #tbody>

                    <draggable
                        tag="tbody"
                        v-model="products"
                        handle=".draggable-handle"
                        ghost-class="bg-yellow-50"
                        @change="updateProductArrangement">
                        <tr @click.stop="onView(product)" v-for="(product, index) in products" :key="product.id" :class="['group cursor-pointer border-b', checkedRowIds[index] ? 'bg-blue-100' : 'bg-white hover:bg-gray-50']">

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
                                    <span>{{ product.name }}</span>
                                    <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="product.name" placement="top">

                                        <template #description>

                                            <hr class="my-2">

                                            <div class="space-y-2">

                                                <p class="flex items-center space-x-2 mb-2">
                                                    <span>SKU: </span>
                                                    <Pill type="light" size="xs">
                                                        <span>{{ product.sku ?? 'None' }}</span>
                                                    </Pill>
                                                </p>

                                                <p class="flex items-center space-x-2">
                                                    <span>Barcode: </span>
                                                    <Pill type="light" size="xs">
                                                        <span>{{ product.barcode ?? 'None' }}</span>
                                                    </Pill>
                                                </p>

                                                <template v-if="product.showDescription.status && product.description != null">
                                                    <hr>
                                                    <p>{{ product.description }}</p>
                                                </template>

                                            </div>

                                        </template>

                                    </MoreInfoPopover>
                                </div>

                            </td>

                            <template v-if="showEverything">

                                <!-- Description -->
                                <td class="px-4 py-4">
                                    <div class="flex space-x-1 items-center w-60">
                                        <NoDataPlaceholder v-if="product.description == null"></NoDataPlaceholder>
                                        <template v-else>
                                            <span :class="{ 'line-through' : product.showDescription.status == false }">{{ product.description }}</span>
                                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :description="product.showDescription.description" placement="top"></MoreInfoPopover>
                                        </template>
                                    </div>
                                </td>

                            </template>

                            <!-- Visible -->
                            <td class="whitespace-nowrap px-4 py-4">
                                <div class="flex space-x-1 items-center">
                                    <Pill :type="product.visible.status ? 'success' : 'warning'" size="xs">{{ product.visible.name.toLowerCase() }}</Pill>
                                    <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="product.visible.name" :description="product.visible.description" placement="top"></MoreInfoPopover>
                                </div>
                            </td>

                            <!-- Price -->
                            <td class="whitespace-nowrap px-4 py-4">
                                <NoDataPlaceholder v-if="product.allowVariations.status"></NoDataPlaceholder>
                                <div v-else class="flex space-x-1 items-center">

                                    <Pill v-if="product.isFree.status" type="success" size="xs">free</Pill>

                                    <template v-else>
                                        <span>{{ product.unitPrice.amountWithCurrency }}</span>
                                        <Pill v-if="product.onSale.status" type="success" size="xs">on sale</Pill>
                                    </template>

                                    <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Pricing" placement="top">

                                        <template #description>

                                            <hr class="my-2">

                                            <div class="space-y-2">

                                                <template v-if="product.onSale.status">
                                                    <p>Regular Price: <span :class="['text-black', { 'line-through' : product.onSale.status || product.isFree.status }]">{{ product.unitRegularPrice.amountWithCurrency }}</span></p>
                                                    <p v-if="product.onSale.status">Sale Price: <span :class="['text-black', { 'line-through' : product.isFree.status }]">{{ product.unitSalePrice.amountWithCurrency }}</span></p>
                                                    <hr>
                                                </template>

                                                <template v-if="product.isFree.status">
                                                    <p>{{ product.isFree.description }}</p>
                                                    <p class="font-bold text-black">Price: <span class="text-green-500">Free</span></p>
                                                </template>

                                                <p v-else class=" text-black">Price: <span class="font-bold">{{ product.unitPrice.amountWithCurrency }}</span></p>

                                            </div>
                                        </template>

                                    </MoreInfoPopover>
                                </div>
                            </td>

                            <!-- Stock -->
                            <td class="whitespace-nowrap px-4 py-4">
                                <NoDataPlaceholder v-if="product.allowVariations.status"></NoDataPlaceholder>
                                <div v-else class="flex space-x-1 items-center">
                                    <Pill :type="product.hasStock.status ? 'success' : 'warning'" size="xs">{{ product.hasStock.status ? (product.stockQuantityType.value.toLowerCase() == 'unlimited' ? 'Unlimited' : product.stockQuantity.description) : product.hasStock.name }}</Pill>
                                    <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Stock" placement="top">

                                        <template #description>
                                            <hr class="my-2">
                                            <p v-if="product.stockQuantityType.value.toLowerCase() == 'unlimited'">{{ product.stockQuantityType.description }}</p>
                                            <p v-else>{{ product.stockQuantity.description }}</p>
                                        </template>

                                    </MoreInfoPopover>
                                </div>
                            </td>

                            <!-- Allow Variations -->
                            <td class="whitespace-nowrap px-4 py-4">
                                <div class="flex space-x-1 items-center">
                                    <Pill type="light" size="xs">{{ product.allowVariations.name.toLowerCase() == 'yes' ? (product.totalVisibleVariations) : 'None' }}</Pill>
                                    <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Allow Variations" placement="top">

                                        <template #description>
                                            <hr class="my-2">
                                            <p>{{ product.allowVariations.description }}</p>
                                            <template v-if="product.allowVariations.status">
                                                <hr class="my-2">
                                                <p>Total Variations: <span>{{ product.totalVariations ?? '...' }}</span></p>
                                                <p>Total Visible Variations: <span>{{ product.totalVisibleVariations ?? '...' }}</span></p>
                                            </template>
                                        </template>

                                    </MoreInfoPopover>
                                </div>
                            </td>

                            <template v-if="showEverything">

                                <!-- Allowed Quantity Per Order -->
                                <td class="whitespace-nowrap px-4 py-4">
                                    <div class="flex space-x-1 items-center">
                                        <Pill type="light" size="xs">{{ product.allowedQuantityPerOrder.value.toLowerCase() == 'unlimited' ? 'Unlimited' : product.maximumAllowedQuantityPerOrder.value }}</Pill>
                                        <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Quantity Per Order" placement="top">

                                            <template #description>
                                                <hr class="my-2">
                                                <p>{{ product.allowedQuantityPerOrder.description }}</p>
                                            </template>

                                        </MoreInfoPopover>
                                    </div>
                                </td>

                                <!-- Position -->
                                <td class="whitespace-nowrap px-4 py-4 text-center">
                                    <span v-if="product.position">#{{ product.position }}</span>
                                    <NoDataPlaceholder v-else></NoDataPlaceholder>
                                </td>

                                <!-- Created Date -->
                                <td class="whitespace-nowrap px-4 py-4">
                                    <div class="flex space-x-1 items-center">
                                        <span>{{ formattedDatetime(product.createdAt) }}</span>
                                        <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(product.createdAt)" placement="top"></MoreInfoPopover>
                                    </div>
                                </td>

                            </template>

                            <!-- Action -->
                            <td class="px-4 py-4 flex items-center space-x-4">

                                <!-- View Button -->
                                <span v-if="!isDeleting(product)" @click.stop.prevent="onView(product)" class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">View</span>

                                <!-- Deleting Loader -->
                                <SpinningLoader v-if="isDeleting(product)" type="danger">
                                    <span class="text-xs ml-2">Deleting...</span>
                                </SpinningLoader>

                                <!-- Delete Button -->
                                <span v-else @click.stop.prevent="showDeleteConfirmationModal(product)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span>

                                <template v-if="!isDeleting(product)">

                                    <!-- Drag & Drop Handle -->
                                    <svg class="draggable-handle w-4 h-4 cursor-grab hover:text-yellow-500 active:cursor-grabbing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                    </svg>

                                </template>

                            </td>

                        </tr>
                    </draggable>

                </template>

            </BasicTable>

            <!-- No Products -->
            <div v-else class="flex justify-center">

                <div
                    class="animated-border-blue w-96 bg-white py-4 px-4 shadow-sm space-y-4 rounded-xl">

                    <h1 class="text-xl font-bold">
                        Create Your First Product
                    </h1>

                    <p class="text-sm text-gray-500">
                        Start stocking your store with products your customers will love
                    </p>

                    <div class="flex justify-end">

                        <!-- Add Button -->
                        <Button :action="onAddProduct" type="primary" size="sm" icon="add">
                            <span>Add Product</span>
                        </Button>

                    </div>
                </div>

            </div>

        </div>

        <!-- Confirm Delete Product -->
        <ConfirmModal ref="deleteProductModal" approveText="Delete Product" :approveAction="deleteProduct" :isLoading="isDeleting(deletableProduct)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p v-if="deletableProduct" class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ deletableProduct.name }}</span>?</p>
            </template>

        </ConfirmModal>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import { VueDraggableNext } from 'vue-draggable-next';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';
    import { getApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';
    import { formattedDatetime, formattedRelativeDate } from '@Utils/dateUtils.js';

    export default {
        inject: ['apiState', 'formState', 'storeState', 'notificationState'],
        components: {
            Pill, Button, draggable: VueDraggableNext, BasicTable, Checkbox, ConfirmModal,
            SpinningLoader, MoreInfoPopover, ToggleSwitch,  NoDataPlaceholder
        },
        data() {
            return {
                products: [],
                pagination: null,
                searchTerm: null,
                checkedRowIds: [],
                showEverything: false,
                deletableProduct: null,
                isDeletingProductIds: [],
                isLoadingProducts: false,
                deleteProductModal: null,
                isUpdatingProductArrangement: false,
            }
        },
        watch: {
            store(newValue) {
                if(newValue) {
                    this.getProducts();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['', 'Name', 'Description', 'Visibility', 'Price', 'Stock', 'Variations', 'Quantity Per Order', 'Position', 'Created Date', '']
                    : ['', 'Name', 'Visibility', 'Price', 'Stock', 'Variations', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            formattedDatetime: formattedDatetime,
            formattedRelativeDate: formattedRelativeDate,
            onView(product) {

                if(this.isDeletingProductIds.length) return;

                this.$router.push({
                    name: 'show-store-product',
                    params: { 'store_href': this.store._links.showStore, 'product_href': product._links.showProduct }
                });
            },
            showDeleteConfirmationModal(product) {
                this.deletableProduct = product;
                this.deleteProductModal.showModal();
            },
            isDeleting(product) {
                return this.isDeletingProductIds.findIndex((id) => id == product.id) != -1;
            },
            onAddProduct() {
                if(this.isDeletingProductIds.length) return;
                this.$router.push({ name: 'create-store-product', params: { 'store_href': this.store._links.showStore } });
            },
            paginate(url) {
                this.getProducts(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getProducts();
            },
            getProducts(url = null) {

                //  Start loader
                this.isLoadingProducts = true;

                //  Set the query params
                const params = {}

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                url = url ?? this.store._links.showStoreProducts;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.products = this.pagination.data;

                        this.checkedRowIds = this.products.map((_) => false);
                    }

                    //  Stop loader
                    this.isLoadingProducts = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingProducts = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deleteProduct() {

                //  Start loader
                this.isDeletingProductIds.push(this.deletableProduct.id);

                deleteApi(this.deletableProduct._links.deleteProduct).then(response => {

                    //  Stop loader
                    this.isDeletingProductIds.splice(this.isDeletingProductIds.findIndex((id) => id == this.deletableProduct.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification('Product deleted');
                            if(this.isDeletingProductIds.length == 0) this.getProducts();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingProductIds.splice(this.isDeletingProductIds.findIndex((id) => id == this.deletableProduct.id, 1));

                    this.formState.setServerFormErrors(errorException);

                });

            },
            updateProductArrangement() {

                //  Start loader
                this.isUpdatingProductArrangement = true;

                //  Set the query params
                const params = {
                    'storeId': this.store.id,
                    'productIds': this.products.map((product) => product.id)
                }

                postApi(this.apiState.apiHome['_links']['updateProductArrangement'], params).then(response => {

                    if(response.status == 200) {
                        this.notificationState.showSuccessNotification('Product arrangement updated');

                    }

                    //  Stop loader
                    this.isUpdatingProductArrangement = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isUpdatingProductArrangement = false;

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {
            this.deleteProductModal = this.$refs.deleteProductModal;
        },
        created() {
            this.isLoadingProducts = true;
        }
    };

</script>
