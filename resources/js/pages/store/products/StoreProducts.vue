<template>

    <div>

        <div class="flex justify-between items-center border-dashed border-b py-6 mb-6">

            <div class="flex items-center">

                <!-- Text Heading -->
                <TextHeader><span class="mr-2">🛍️</span> Products</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Products are physical or non physical items that customers can place orders and pay for using your preferred payment methods" placement="top"></MoreInfoPopover>


            </div>

            <template v-if="(pagination ?? {}).total > 0">

                <!-- Show Everything Toggle Switch -->
                <ToogleSwitch
                    v-model="showEverything" size="md"
                    labelPopoverTitle="What Is This?"
                    labelPopoverDescription="Turn on if you want to show more information about your products">
                    Show Everything
                </ToogleSwitch>

                <!-- Add Product Button -->
                <AddButton :action="onAddProduct" class="w-40">
                    <span class="ml-2">Add Product</span>
                </AddButton>

            </template>

        </div>

        <!-- Products Table -->
        <BasicTable v-if="isLoadingProducts || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingProducts" @paginate="paginate" @search="search" @refresh="getProducts" :totalHeaders="tableHeaders.length">

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
                    <tr @click.stop="onEdit(product)" v-for="product in products" :key="product.id" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

                        <!-- Name -->
                        <td class="whitespace-nowrap px-4 py-4">

                            <div class="flex space-x-1 items-center w-40">
                                <span>{{ product.name }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="product.name" placement="top">

                                    <template #description>
                                        <hr>
                                        <p>
                                            <span>SKU: </span>
                                            <span  v-if="product.sku" class="text-black"></span>
                                            <BadgeIndicator v-else :active="false" text="None" inactiveType="info" :showDot="false"></BadgeIndicator>
                                        </p>
                                        <p>
                                            <span>Barcode: </span>
                                            <span  v-if="product.barcode" class="text-black"></span>
                                            <BadgeIndicator v-else :active="false" text="None" inactiveType="info" :showDot="false"></BadgeIndicator>
                                        </p>
                                        <template v-if="product.showDescription.status && product.description != null">
                                            <hr>
                                            <p>{{ product.description }}</p>
                                        </template>
                                    </template>

                                </MoreInfoPopover>
                            </div>

                        </td>

                        <template v-if="showEverything">

                            <!-- Description -->
                            <td class="px-4 py-4">
                                <div class="flex space-x-1 items-center w-60">
                                    <span v-if="product.description == null">...</span>
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
                                <BadgeIndicator :active="product.visible.status" :text="product.visible.name" :inactiveType="product.visible.status ? 'success' : 'warning'" :showDot="false"></BadgeIndicator>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="product.visible.name" :description="product.visible.description" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Price -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <span v-if="product.allowVariations.status">...</span>
                            <div v-else class="flex space-x-1 items-center">
                                <BadgeIndicator v-if="product.isFree.status" :active="false" text="Free" inactiveType="info" :showDot="false"></BadgeIndicator>
                                <template v-else>
                                    <span>{{ product.unitPrice.amountWithCurrency }}</span>
                                    <BadgeIndicator v-if="product.onSale.status" :active="true" text="on sale" :showDot="false"></BadgeIndicator>
                                </template>

                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Pricing" placement="top">

                                    <template #description>
                                        <template v-if="product.hasPrice.status">
                                            <hr>
                                            <p>Regular Price: <span :class="['text-black', { 'line-through' : product.onSale.status || product.isFree.status }]">{{ product.unitRegularPrice.amountWithCurrency }}</span></p>
                                            <p v-if="product.onSale.status">Sale Price: <span :class="['text-black', { 'line-through' : product.isFree.status }]">{{ product.unitSalePrice.amountWithCurrency }}</span></p>
                                        </template>
                                        <hr>
                                        <template v-if="product.isFree.status">
                                            <p>{{ product.isFree.description }}</p>
                                            <p class="font-bold text-black">Price: <span class="text-green-500">Free</span></p>
                                        </template>
                                        <p v-else class=" text-black">Price: <span class="font-bold">{{ product.unitPrice.amountWithCurrency }}</span></p>
                                    </template>

                                </MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Stock -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <span v-if="product.allowVariations.status">...</span>
                            <div v-else class="flex space-x-1 items-center">
                                <BadgeIndicator :active="false" :text="product.hasStock.status ? (product.stockQuantityType.value == 'Unlimited' ? 'Unlimited' : product.stockQuantity.description) : product.hasStock.name" :inactiveType="product.hasStock.status ? 'info' : 'danger'" :showDot="false"></BadgeIndicator>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Stock" placement="top">

                                    <template #description>
                                        <div class="whitespace-normal">
                                            <p v-if="product.stockQuantityType.value == 'Unlimited'">{{ product.stockQuantityType.description }}</p>
                                            <p v-else>{{ product.stockQuantity.description }}</p>
                                        </div>
                                    </template>

                                </MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Allow Variations -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <BadgeIndicator :active="false" :text="product.allowVariations.name == 'Yes' ? (product.totalVisibleVariations) : 'None'" inactiveType="info" :showDot="false"></BadgeIndicator>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Allow Variations" placement="top">

                                    <template #description>
                                        <div class="whitespace-normal">
                                            <p>{{ product.allowVariations.description }}</p>
                                            <template v-if="product.allowVariations.status">
                                                <hr class="my-2">
                                                <p>Total Variations: <span>{{ product.totalVariations ?? '...' }}</span></p>
                                                <p>Total Visible Variations: <span>{{ product.totalVisibleVariations ?? '...' }}</span></p>
                                            </template>
                                        </div>
                                    </template>

                                </MoreInfoPopover>
                            </div>
                        </td>

                        <template v-if="showEverything">

                            <!-- Allowed Quantity Per Order -->
                            <td class="whitespace-nowrap px-4 py-4">
                                <div class="flex space-x-1 items-center">
                                    <BadgeIndicator :active="false" :text="product.allowedQuantityPerOrder.value == 'Unlimited' ? 'Unlimited' : product.maximumAllowedQuantityPerOrder.value" inactiveType="info" :showDot="false"></BadgeIndicator>
                                    <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Quantity Per Order" placement="top">

                                        <template #description>
                                            <div class="whitespace-normal">
                                                <p>{{ product.allowedQuantityPerOrder.description }}</p>
                                            </div>
                                        </template>

                                    </MoreInfoPopover>
                                </div>
                            </td>

                            <!-- Position -->
                            <td class="whitespace-nowrap px-4 py-4 text-center">#{{ product.position }}</td>

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

                            <!-- Edit Button -->
                            <a v-if="!isDeleting(product)" href="#" @click.stop.prevent="onEdit(product)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>

                            <!-- Deleting Loader -->
                            <SpiningLoader v-if="isDeleting(product)" type="danger">
                                <span class="text-xs ml-2">Deleting...</span>
                            </SpiningLoader>

                            <!-- Delete Button -->
                            <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(product)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>

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
        <div v-else class="flex justify-between p-20 border rounded-lg bg-gray-50">
            <div class="space-y-4">
                <h1 class="text-2xl font-bold">Add your products</h1>
                <p>Start by stocking your store with products your customers will love</p>

                <!-- Add Product Button -->
                <AddButton :action="onAddProduct" class="w-40" size="sm">
                    <span class="ml-2">Add Product</span>
                </AddButton>
            </div>
            <div>
                <span class="text-8xl">🛍️</span>
            </div>
        </div>

        <!-- Confirm Delete Product -->
        <ConfirmModal v-if="deletableProduct" approveText="Delete Product" :approveAction="deleteProduct" :isLoading="isDeleting(deletableProduct)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ deletableProduct.name }}</span>?</p>
            </template>

            <template #trigger="triggerProps">

                <!-- Delete Product Button - Triggers Confirmation Modal -->
                <PrimaryButton ref="confirmDeleteButton" @click="triggerProps.showModal" class="hidden" type="danger">
                    Delete Product
                </PrimaryButton>

            </template>


        </ConfirmModal>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import { getApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            draggable: VueDraggableNext, TextHeader, AddButton, BasicTable, ConfirmModal, SpiningLoader, PrimaryButton,
            MoreInfoPopover, ToogleSwitch, BadgeIndicator
        },
        data() {
            return {
                products: [],
                pagination: null,
                searchTerm: null,
                showEverything: false,
                deletableProduct: null,
                isDeletingProductIds: [],
                isLoadingProducts: false,
                storeState: useStoreState(),
                isUpdatingProductArrangement: false,
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['Name', 'Description', 'Visibility', 'Price', 'Stock', 'Variations', 'Quantity Per Order', 'Position', 'Created Date', '']
                    : ['Name', 'Visibility', 'Price', 'Stock', 'Variations', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onEdit(product) {
                this.$router.push({ name: 'show-store-product', params: { 'store_href': this.store._links.self, 'product_href': product._links.self } });
            },
            showDeleteConfirmationModal(product) {
                this.deletableProduct = product;

                /**
                 *  After setting the deletableProduct, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  deletableProduct.name value. This is only available
                 *  on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(product) {
                return this.isDeletingProductIds.findIndex((id) => id == product.id) != -1;
            },
            onAddProduct() {
                this.$router.push({ name: 'create-store-product', params: { 'store_href': this.store._links.self } });
            },
            paginate(url) {
                this.url = url;
                this.getProducts();
            },
            search(searchTerm) {
                this.url = this.store._links.showProducts;
                this.searchTerm = searchTerm;
                this.getProducts();
            },
            getProducts() {

                //  Start loader
                this.isLoadingProducts = true;

                //  Set the query params
                const params = {}

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                getApi(this.url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.products = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingProducts = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingProducts = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteProduct() {

                //  Start loader
                this.isDeletingProductIds.push(this.deletableProduct.id);

                deleteApi(this.deletableProduct._links.deleteProduct, this.form).then(response => {

                    //  Stop loader
                    this.isDeletingProductIds.splice(this.isDeletingProductIds.findIndex((id) => id == this.deletableProduct.id, 1));

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Product deleted');

                        //  If we are not deleting any other products, then refresh the product list
                        if(this.isDeletingProductIds.length == 0) this.getProducts();

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingProductIds.splice(this.isDeletingProductIds.findIndex((id) => id == this.deletableProduct.id, 1));

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            updateProductArrangement() {

                //  Start loader
                this.isUpdatingProductArrangement = true;

                //  Set the query params
                const params = {
                    'arrangement': this.products.map((product) => product.id)
                }

                postApi(this.store._links.updateProductArrangement, params).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Product arrangement updated');

                    }

                    //  Stop loader
                    this.isUpdatingProductArrangement = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isUpdatingProductArrangement = false;

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
            this.url = this.store._links.showProducts;
            this.getProducts();
        }
    };

</script>
