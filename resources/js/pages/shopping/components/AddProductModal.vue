<template>

    <BasicModal :onShow="showNonSelectedShoppingProducts">

        <template #content="slotProps">

            <h1 class="font-lg font-bold mb-2">Add Product</h1>

            <p class="text-sm text-gray-500 mb-4">Select items to add to your cart</p>

            <div class="relative">

                <!-- Loading Backdrop -->
                <BackdropLoader v-if="isLoadingNonSelectedProducts || isSearchingNonSelectedProducts" :showBorder="false"></BackdropLoader>

                <div class="divide-y">

                    <!-- Products (Loading Placeholder) -->
                    <div v-if="isLoadingNonSelectedProducts || isSearchingNonSelectedProducts">

                        <div v-for="(_, index) in [1,2,3]" :key="index" :class="[{ 'border-t' : index == 0 }, 'border-b border-l border-r shadow-sm py-6 px-4 bg-gray-50']">
                            <div class="w-full flex items-center justify-between">
                                <LineSkeleton v-if="isLoadingTransaction" width="w-32" :shine="true"></LineSkeleton>
                                <LineSkeleton v-if="isLoadingTransaction" width="w-16" :shine="true"></LineSkeleton>
                            </div>
                        </div>

                    </div>

                    <template v-else>

                        <template v-if="hasNonSelectedProducts">

                            <!-- Non Selected Products -->
                            <div
                                :key="index"
                                v-for="(product, index) in nonSelectedProducts"
                                @click.stop="isAddedToCart(product.id) ? increaseQuantity(product.id) : addToCart(product)"
                                :style="{ '--product-background': storeForm.productBgColor, '--product-background-hover': storeForm.productHoverBgColor }"
                                :class="['flex justify-between items-center px-6 cursor-pointer bg-[var(--product-background)] hover:bg-[var(--product-background-hover)] transition-colors group', index === 0 ? 'pt-4 pb-2' : 'py-2']">

                                <div class="w-full">
                                    <span
                                        class="text-sm text-[var(--product-name-color)] group-hover:text-[var(--product-name-color-hover)] transition-colors"
                                        :style="{ '--product-name-color': storeForm.productNameColor, '--product-name-color-hover': storeForm.productHoverNameColor }">
                                        {{ product.name }}
                                    </span>
                                    <div class="space-x-1">
                                        <template v-if="product.allowVariations.name.toLowerCase() == 'yes'">
                                            <Pill type="success" size="xs" :showDot="false">{{ product.totalVisibleVariations+(product.totalVisibleVariations == 1 ? ' option' : ' options') }}</Pill>
                                        </template>
                                        <template v-else>
                                            <Pill v-if="product.isFree.status" type="success" size="xs" :showDot="false">free</Pill>
                                            <Pill v-if="product.onSale.status" type="success" size="xs" :showDot="false">on sale</Pill>
                                            <span
                                                v-if="!product.isFree.status"
                                                class="text-sm text-[var(--product-price-color)] group-hover:text-[var(--product-price-color-hover)] transition-colors"
                                                :style="{ '--product-price-color': storeForm.productPriceColor, '--product-price-color-hover': storeForm.productHoverPriceColor }">
                                                {{ product.unitPrice.amountWithCurrency }}
                                            </span>
                                        </template>
                                    </div>
                                </div>

                                <div>

                                    <transition name="fade-1" mode="out-in">

                                        <div v-if="isAddedToCart(product.id)" class="flex items-center space-x-4">

                                            <div class="flex items-center space-x-2">

                                                <!-- Decrease Quantity Icon Button -->
                                                <svg v-if="hasQuantity(product.id)" @click.stop="() => decreaseQuantity(product.id)" class="w-5 h-5 flex-shrink-0 text-red-500 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>

                                                <!-- Minimum Total Products Input -->
                                                <div>
                                                    <input
                                                        min="0"
                                                        @click.stop
                                                        type="number"
                                                        v-only-numbers
                                                        placeholder="..."
                                                        v-model="mappedCartProducts[product.id].quantity"
                                                        :style="{ '--product-quantity-color': storeForm.productQuantityColor, '--product-quantity-color-hover': storeForm.productHoverQuantityColor }"
                                                        class="w-10 border-0 rounded-full !ring-gray-300 remove-arrow p-0 bg-transparent text-center text-sm text-[var(--product-quantity-color)] group-hover:text-[var(--product-quantity-color-hover)] transition-colors"
                                                    />
                                                </div>

                                                <!-- Increase Quantity Icon Button -->
                                                <svg @click.stop="() => increaseQuantity(product.id)" class="w-5 h-5 flex-shrink-0 text-green-500 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>

                                            </div>

                                            <!-- Remove Icon Button -->
                                            <svg
                                                @click.stop="() => removeFromCart(product.id)"
                                                class="w-5 h-5 flex-shrink-0 text-gray-300 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>

                                        </div>

                                        <Button
                                            v-else
                                            size="xs"
                                            type="primary"
                                            :action="() => addToCart(product)"
                                            :bgColor="storeForm.secondaryButtonColor"
                                            :textColor="storeForm.secondaryButtonTextColor">
                                            <span class="whitespace-nowrap">
                                                {{ product.allowVariations.name.toLowerCase() == 'yes' ? 'Select option' : 'Add to cart' }}
                                            </span>
                                        </Button>

                                    </transition>

                                </div>

                            </div>

                        </template>

                        <div v-else>

                            <!-- No Products Found Alert -->
                            <div class="w-full flex justify-between items-center p-4 rounded-lg"
                                :style="'color:'+storeForm.textColor+';background:'+storeForm.bgColor+';'">

                                <transition name="fade-1" mode="out-in">
                                    <span v-if="isSearchingNonSelectedProducts" class="text-xs inline-block" :style="'color:'+storeForm.textColor+';'">Searching...</span>
                                    <span v-else class="text-xs inline-block" :style="'color:'+storeForm.textColor+';'">{{ hasCartProducts ? 'selected every product' : 'No products found' }}</span>
                                </transition>

                                <Button
                                    size="xs"
                                    type="primary"
                                    :action="clearSearch"
                                    v-if="!isSearchingNonSelectedProducts && hasSearchTerm"
                                    :bgColor="storeForm.secondaryButtonColor"
                                    :textColor="storeForm.secondaryButtonTextColor">
                                    <div class="flex items-center space-x-1"
                                        :style="'color:'+storeForm.textColor+';'">
                                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="text-xs whitespace-nowrap">clear search</span>
                                    </div>
                                </Button>

                            </div>

                        </div>

                    </template>

                </div>

            </div>

            <Button
                size="xs"
                class="mt-4"
                type="primary"
                :disabled="!hasCartProducts"
                v-if="hasNonSelectedProducts"
                :bgColor="storeForm.primaryButtonColor"
                :textColor="storeForm.primaryButtonTextColor"
                :action="() => addSelectedToCart(slotProps.hideModal)">
                Add
            </Button>

        </template>

        <template #trigger="triggerProps">

            <!-- Add Button - Triggers Modal -->
            <slot name="trigger" :showModal="triggerProps.showModal">
                <Button
                    size="xs"
                    class="m-4"
                    type="custom"
                    :action="triggerProps.showModal"
                    :bgColor="storeForm.primaryButtonColor"
                    :textColor="storeForm.primaryButtonTextColor">
                    <span class="ml-2">Add</span>
                </Button>
            </slot>

        </template>

    </BasicModal>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import onlyNumbers from '@Directives/onlyNumbers.js';
    import BasicModal from '@Partials/modals/BasicModal.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import BackdropLoader from '@Partials/loaders/BackdropLoader.vue';
    import CategoryHeading from '@Pages/shopping/components/CategoryHeading.vue';
    import CategoryOptions from '@Pages/shopping/components/CategoryOptions.vue';

    export default {
        inject: ['storeState', 'shoppingCartState'],
        directives: { onlyNumbers },
        components: {
            Pill, Button, BasicModal, LineSkeleton, BackdropLoader,
            CategoryHeading, CategoryOptions
        },
        data() {
            return {
                mappedCartProducts: {}
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            storeForm() {
                return this.storeState.storeForm;
            },
            nonSelectedProducts() {
                return this.shoppingCartState.nonSelectedProducts;
            },
            hasCartProducts() {
                return this.shoppingCartState.hasCartProducts(this.mappedCartProducts);
            },
            hasNonSelectedProducts() {
                return this.shoppingCartState.hasNonSelectedProducts;
            },
            hasSearchTerm() {
                return this.shoppingCartState.hasSearchTerm;
            },
            shoppingCart() {
                return this.shoppingCartState.shoppingCart;
            },
            isLoadingNonSelectedProducts() {
                return this.shoppingCartState.isLoadingNonSelectedProducts;
            },
            isSearchingNonSelectedProducts() {
                return this.shoppingCartState.isSearchingNonSelectedProducts;
            },
        },
        methods: {
            hasQuantity(productId) {
                return this.shoppingCartState.hasQuantity(productId, this.mappedCartProducts);
            },
            isAddedToCart(productId) {
                return this.shoppingCartState.isAddedToCart(productId, this.mappedCartProducts);
            },
            addToCart(product) {
                this.shoppingCartState.addToCart(product, '1', this.mappedCartProducts);
            },
            addSelectedToCart(hideModal) {
                Object.values(this.mappedCartProducts).forEach((mappedCartProduct) => {
                    this.shoppingCartState.removeFromCart(mappedCartProduct.id, this.mappedCartProducts);
                    this.shoppingCartState.addToCart(mappedCartProduct, mappedCartProduct.quantity);
                });
                hideModal();
            },
            increaseQuantity(productId) {
                this.shoppingCartState.increaseQuantity(productId, '1', this.mappedCartProducts);
            },
            decreaseQuantity(productId) {
                this.shoppingCartState.decreaseQuantity(productId, '1', this.mappedCartProducts);
            },
            removeFromCart(productId) {
                this.shoppingCartState.removeFromCart(productId, this.mappedCartProducts);
            },
            clearSearch() {
                this.shoppingCartState.clearSearch();
            },
            showNonSelectedShoppingProducts() {
                this.shoppingCartState.showNonSelectedShoppingProducts();
            }
        }
    };

</script>
