<template>

    <div class="flex justify-center">

        <CustomModal
            ref="modal"
            :onShow="onShow"
            triggerSize="sm"
            triggerIcon="add"
            contentClass="px-4"
            triggerType="light"
            header="Add Product"
            :scrollOnContent="false"
            triggerText="Add Product"
            :showApproveButton="false"
            :triggerLoading="isLoadingStore || isLoadingOrder || (isEditting && !hasOrder)">

            <template #content>

                <div v-if="hasLoadedInitialProducts && !selectedProduct" class="flex justify-center items-center space-x-4">

                    <CustomInput
                        type="search"
                        class="w-full"
                        :debounced="true"
                        v-model="searchTerm"
                        placeholder="Search products"
                        @input="isLoadingProducts = true"
                        :skeleton="isLoadingStore || isLoadingOrder || (isEditting && !hasOrder)">
                    </CustomInput>

                    <Button :action="addNew" type="light" size="xs" icon="add" class="my-2">
                        <span>Add New</span>
                    </Button>

                </div>

                <template v-if="isLoadingProducts">

                    <div
                        class="space-y-2 mb-4">

                        <div
                            :key="index"
                            v-for="(_, index) in [1, 2, 3]"
                            class="flex items-center space-x-2 border-b shadow-sm rounded-lg p-2 bg-gray-50 w-full">

                            <!-- Skeleton Loading -->
                            <LineSkeleton width="w-10" height="h-10" rounded="rounded-lg" :shine="true" class="flex-shrink-0"></LineSkeleton>

                            <div class="w-full space-y-2">
                                <LineSkeleton width="w-2/3" :shine="true"></LineSkeleton>
                                <LineSkeleton width="w-1/3" :shine="true"></LineSkeleton>
                            </div>

                        </div>

                    </div>

                </template>

                <template v-else-if="selectedProduct">

                    <Button :action="removeSelectedProduct" type="light" size="xs" icon="short-left-arrow" class="mt-4">
                        <span>Back</span>
                    </Button>

                    <p class="text-lg font-bold border-b border-dashed my-4 pb-4">
                        {{ selectedProduct.name }}
                    </p>

                    <ProductVariationOptions
                        :onSelectProduct=onSelectProduct
                        :selectedProduct="selectedProduct">
                    </ProductVariationOptions>

                </template>

                <template v-else>

                    <ProductOptions
                        v-if="hasProducts"
                        :products="products"
                        :onSelectProduct=onSelectProduct>
                    </ProductOptions>

                    <p v-else class="text-sm text-center p-4 rounded-lg bg-gray-50 mb-4">
                        No products found
                    </p>

                </template>

            </template>

        </CustomModal>

    </div>

</template>

<script>

    import axios from 'axios';
    import Button from '@Partials/buttons/Button.vue';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import CustomModal from '@Partials/inputs/CustomModal.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import ProductOptions from '@Pages/stores/store/orders/order/editable/components/products/add-product/product-options/ProductOptions.vue';
    import ProductVariationOptions from '@Pages/stores/store/orders/order/editable/components/products/add-product/product-variation-options/ProductVariationOptions.vue';

    export default {
        inject: ['formState', 'orderState', 'storeState'],
        components: { Button, CustomInput, CustomModal, LineSkeleton, ProductOptions, ProductVariationOptions },
        data() {
            return {
                products: [],
                searchTerm: null,
                lastSearchTerm: null,
                selectedProduct: null,
                isLoadingProducts: false,
                hasLoadedInitialProducts: false
            }
        },
        watch: {
            searchTerm() {
                this.getProducts();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            order() {
                return this.orderState.order;
            },
            hasOrder() {
                return this.orderState.hasOrder;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isEditting() {
                return this.$route.name === 'edit-store-order';
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            },
            hasProducts() {
                return this.products.length > 0;
            },
        },
        methods: {
            onShow() {
                this.hasLoadedInitialProducts = false;
                this.selectedProduct = null;
                this.lastSearchTerm = null;
                this.searchTerm = null;
                this.products = [];
                this.getProducts();
            },
            async getProducts() {

                this.isLoadingProducts = true;

                const url = this.store._links.showStoreProducts;

                let config = {
                    params: {
                        'store_id': this.store.id,
                        '_relationships': 'photo'
                    }
                };

                if (this.hasSearchTerm) {
                    config.params['search'] = this.searchTerm;
                }

                this.lastSearchTerm = this.searchTerm;

                try {
                    const response = await axios.get(url, config);

                    if (response.status === 200) {

                        if (this.searchTerm === this.lastSearchTerm) {
                            const pagination = response.data;
                            this.products = pagination.data;
                        }

                    } else {
                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);
                    }
                } catch (errorException) {
                    this.formState.setServerFormErrors(errorException);
                }

                if (this.searchTerm === this.lastSearchTerm) {
                    this.isLoadingProducts = false;
                    this.hasLoadedInitialProducts = true;
                }
            },
            onSelectProduct(product) {

                const allowVariations = product.allowVariations.status;

                if(allowVariations) {
                    this.selectedProduct = product;
                }else{
                    this.$refs.modal.hideModal();
                    this.orderState.addCartProductUsingProduct(product);
                }

            },
            removeSelectedProduct() {
                this.selectedProduct = null;
            },
            addNew() {
                this.$refs.modal.hideModal();
                this.orderState.addCartProduct();
            },
        }
    };

</script>
