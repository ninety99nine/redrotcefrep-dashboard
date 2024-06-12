<template>

    <div>

        <div class="flex items-center">

            <!-- Text Heading -->
            <p class="font-bold text-lg">Variations <span v-if="(pagination ?? {}).total > 0">({{ (pagination ?? {}).total }})</span></p>

            <!-- More Info Popover -->
            <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Variations are different options of the same product e.g options for sizes, colors or materials." placement="top"></MoreInfoPopover>

        </div>

        <div v-if="!sentFirstRequest && isLoadingProductVariations" class="flex justify-center">

            <!-- Spining Loader -->
            <SpiningLoader class="my-4"></SpiningLoader>

        </div>

        <div v-else class="mt-4">

            <!-- Product Variations Table -->
            <BasicTable v-if="(pagination ?? {}).total > 0" :pagination="pagination" :isLoading="isLoadingProductVariations" @paginate="paginate" @search="search" @refresh="getProductVariations" :totalHeaders="tableHeaders.length">

                <template #primaryFilters>

                    <!-- Show Everything Toggle Switch -->
                    <ToogleSwitch
                        v-model="showEverything" size="md"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="Turn on if you want to show more information about your product variations">
                        Show Everything
                    </ToogleSwitch>

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
                <SpiningLoader v-if="isCreatingVariations">
                    <span class="ml-2">Creating variations</span>
                </SpiningLoader>
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

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import { getApi, putApi, postApi } from '@Repositories/api-repository.js';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { MoreInfoPopover, ToogleSwitch, BasicTable, SpiningLoader, BadgeIndicator },
        props: {
            product: {
                type: Object
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
                storeState: useStoreState(),
                isLoadingProductVariations: false,
            }
        },
        watch: {
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
            tableHeaders() {
                return this.showEverything
                    ? ['Name', 'Description', 'Visibility', 'Price', 'Stock', 'Variations', 'Quantity Per Order', 'Created Date']
                    : ['Name', 'Visibility', 'Price', 'Stock', 'Variations'];
            },
        },
        methods: {
            onEdit(product) {
                this.$router.push({ name: 'show-store-product', params: { 'store_href': this.store._links.self, 'product_href': product._links.self } });
            },
            paginate(url) {
                this.url = url;
                this.getProductVariations();
            },
            search(searchTerm) {
                this.url = this.product._links.showVariations;
                this.searchTerm = searchTerm;
                this.getProductVariations();
            },
            getProductVariations() {

                //  Start loader
                this.isLoadingProductVariations = true;

                //  Set the query params
                const params = {}

                //  If the search term has been provided, then add to the query params
                if(this.searchTerm != null && this.searchTerm != '') params['search'] = this.searchTerm;

                getApi(this.url, params).then(response => {

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
            this.url = this.product._links.showVariations;
            this.getProductVariations();
        }
    };

</script>
