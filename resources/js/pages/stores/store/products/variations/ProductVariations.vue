<template>

    <div>

        <div class="flex items-center">

            <!-- Text Heading -->
            <p class="font-bold text-lg">Variations <span v-if="hasVariations">({{ totalVariations }})</span></p>

            <!-- More Info Popover -->
            <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Variations are different options of the same product e.g options for sizes, colors or materials." placement="top"></MoreInfoPopover>

        </div>

        <!-- Instruction -->
        <p v-if="hasVariations" class="text-xs">Select any variations to make changes</p>

        <div v-if="!sentFirstRequest && isLoadingProductVariations" class="flex justify-center">

            <!-- Spinning Loader -->
            <SpinningLoader class="my-4"></SpinningLoader>

        </div>

        <div v-else class="mt-4">

            <!-- Product Variations Table -->
            <BasicTable v-if="totalVariations > 0" :pagination="pagination" :isLoading="isLoadingProductVariations" @paginate="paginate" @search="search" @refresh="getProductVariations" :totalHeaders="tableHeaders.length">

                <template #primaryFilters>

                    <!-- Show Everything Toggle Switch -->
                    <ToggleSwitch
                        v-model="showEverything" size="md"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="Turn on if you want to show more information about your product variations">
                        Show Everything
                    </ToggleSwitch>

                </template>

                <!-- Table Head -->
                <template v-slot:head>
                    <tr>

                        <!-- Table Header -->
                        <th v-for="(tableHeader, index) in tableHeaders" :key="index" scope="col" class="whitespace-nowrap px-4 py-3">
                            {{ tableHeader }}
                        </th>

                    </tr>
                </template>

                <!-- Table Body -->
                <template v-slot:body>
                    <tr @click.stop="onEdit(product)" v-for="(product, index) in products" :key="index" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

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
                                            <Pill v-else type="info" size="xs" :showDot="false">None</Pill>
                                        </p>
                                        <p>
                                            <span>Barcode: </span>
                                            <span  v-if="product.barcode" class="text-black"></span>
                                            <Pill v-else type="info" size="xs" :showDot="false">None</Pill>
                                        </p>
                                        <template v-if="product.showDescription.status && product.description != null">
                                            <hr>
                                            <p>{{ product.description }}</p>
                                        </template>
                                    </template>

                                </MoreInfoPopover>
                            </div>

                        </td>

                        <!-- Properties -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <div class="flex space-x-1 ">
                                <Pill v-for="(variable, index) in product._relationships.variables" :key="index" type="info" size="xs" :showDot="false">
                                    {{ variable.value }}
                                </Pill>
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
                                <Pill :type="product.visible.status ? 'success' : 'warning'" size="xs" :showDot="false">{{ product.visible.name }}</Pill>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="product.visible.name" :description="product.visible.description" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Price -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <NoDataPlaceholder v-if="product.allowVariations.status"></NoDataPlaceholder>
                            <div v-else class="flex space-x-1 items-center">
                                <Pill v-if="product.isFree.status" type="info" size="xs" :showDot="false">free</Pill>
                                <template v-else>
                                    <span>{{ product.unitPrice.amountWithCurrency }}</span>
                                    <Pill v-if="product.onSale.status" type="success" size="xs" :showDot="false">on sale</Pill>
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
                            <NoDataPlaceholder v-if="product.allowVariations.status"></NoDataPlaceholder>
                            <div v-else class="flex space-x-1 items-center">
                                <Pill :type="product.hasStock.status ? 'info' : 'danger'" size="xs" :showDot="false">{{ product.hasStock.status ? (product.stockQuantityType.value.toLowerCase() == 'unlimited' ? 'Unlimited' : product.stockQuantity.description) : product.hasStock.name }}</Pill>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Stock" placement="top">

                                    <template #description>
                                        <div class="whitespace-normal">
                                            <p v-if="product.stockQuantityType.value.toLowerCase() == 'unlimited'">{{ product.stockQuantityType.description }}</p>
                                            <p v-else>{{ product.stockQuantity.description }}</p>
                                        </div>
                                    </template>

                                </MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Allow Variations -->
                        <td class="whitespace-nowrap px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <Pill type="info" size="xs" :showDot="false">{{ product.allowVariations.name.toLowerCase() == 'yes' ? (product.totalVisibleVariations) : 'None' }}</Pill>
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
                                    <Pill type="info" size="xs" :showDot="false">{{ product.allowedQuantityPerOrder.value.toLowerCase() == 'unlimited' ? 'Unlimited' : product.maximumAllowedQuantityPerOrder.value }}</Pill>
                                    <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Quantity Per Order" placement="top">

                                        <template #description>
                                            <div class="whitespace-normal">
                                                <p>{{ product.allowedQuantityPerOrder.description }}</p>
                                            </div>
                                        </template>

                                    </MoreInfoPopover>
                                </div>
                            </td>

                            <!-- Created Date -->
                            <td class="whitespace-nowrap px-4 py-4">
                                <div class="flex space-x-1 items-center">
                                    <span>{{ formattedDatetime(product.createdAt) }}</span>
                                    <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(product.createdAt)" placement="top"></MoreInfoPopover>
                                </div>
                            </td>

                        </template>

                    </tr>

                </template>

            </BasicTable>

            <!-- No Product Variations -->
            <div v-else class="flex justify-between p-20 border rounded-lg bg-gray-50">
                <SpinningLoader v-if="isCreatingVariations">
                    <span class="ml-2">Creating variations</span>
                </SpinningLoader>
                <div v-else class="space-y-4">
                    <h1 class="text-2xl font-bold">No variations</h1>
                    <p>Add your product options above ☝️ and then <span class="underline decoration-dashed underline-offset-4">create</span> the different variations of your product</p>
                </div>
                <div :class="{ 'animate-bounce' : isCreatingVariations }">
                    <span class="text-8xl">🛍️</span>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';
    import { getApi, putApi, postApi } from '@Repositories/api-repository.js';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';
    import { formattedDatetime, formattedRelativeDate } from '@Utils/dateUtils.js';

    export default {
        inject: ['formState', 'storeState'],
        components: { Pill, MoreInfoPopover, ToggleSwitch, BasicTable, SpinningLoader, NoDataPlaceholder },
        props: {
            product: {
                type: Object
            },
            isLoadingProduct: {
                type: Boolean
            },
            isCreatingVariations: {
                type: Boolean
            }
        },
        data() {
            return {
                pagination: null,
                searchTerm: null,
                showEverything: false,
                sentFirstRequest: false,
                isLoadingProductVariations: false,
            }
        },
        watch: {
            isLoadingProduct(newValue, oldValue) {
                if(newValue == false) {
                    this.getProductVariations();
                }
            },
            isCreatingVariations(newValue, oldValue) {
                if(newValue == false) {
                    this.getProductVariations();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            products() {
                return ((this.pagination ?? {}).data ?? []);
            },
            hasVariations() {
                return this.totalVariations > 0;
            },
            totalVariations() {
                return ((this.pagination ?? {}).total ?? 0);
            },
            tableHeaders() {
                return this.showEverything
                    ? ['Name',  'Properties', 'Description', 'Visibility', 'Price', 'Stock', 'Variations', 'Quantity Per Order', 'Created Date']
                    : ['Name',  'Properties', 'Visibility', 'Price', 'Stock', 'Variations'];
            },
        },
        methods: {
            formattedDatetime: formattedDatetime,
            formattedRelativeDate: formattedRelativeDate,
            onEdit(product) {
                this.$router.push({ name: 'show-store-product', params: { 'store_href': this.store._links.showStore, 'product_href': product._links.showProduct } });
            },
            paginate(url) {
                this.getProductVariations(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getProductVariations();
            },
            getProductVariations(url = null) {

                //  Start loader
                this.isLoadingProductVariations = true;

                //  Set the query params
                const params = {};

                //  If the search term has been provided, then add to the query params
                if(this.searchTerm != null && this.searchTerm != '') params['search'] = this.searchTerm;

                url = url ?? this.product._links.showProductVariations;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                    }

                    //  Stop loader
                    this.isLoadingProductVariations = false;

                    //  Indicate that the first request has been sent
                    this.sentFirstRequest = true;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingProductVariations = false;

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {

        },
        created() {
            this.getProductVariations();
        }
    };

</script>
