<template>

    <div
        :style="'background:'+storeForm.cardPrimaryColor+';'"
        class="border-b rounded-t-lg shadow-sm p-6">

        <!-- Category Heading -->
        <CategoryHeading></CategoryHeading>

        <!-- Category Options -->
        <CategoryOptions></CategoryOptions>

        <!-- Search Input -->
        <SearchInput
            class=" mt-4"
            :isSearching="isSearchingProducts"
            v-model="shoppingCartState.searchTerm"
            @beforeSearch="setIsSearchingProducts">
        </SearchInput>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import SearchInput from '@Partials/inputs/SearchInput.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
import CategoryHeading from '@Pages/shopping/components/CategoryHeading.vue';
import CategoryOptions from '@Pages/shopping/components/CategoryOptions.vue';

export default {
    components: { SearchInput, CategoryHeading, CategoryOptions },
    data() {
        return {
            storeState: useStoreState(),
            shoppingCartState: useShoppingCartState(),
        };
    },
    watch: {
        'shoppingCartState.searchTerm'(newValue, oldValue) {
            this.showShoppingProducts();
        }
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
        },
        isSearchingProducts() {
            return this.shoppingCartState.isSearchingProducts;
        },
    },
    methods: {
        showShoppingProducts() {
            return this.shoppingCartState.showShoppingProducts();
        },
        setIsSearchingProducts() {
            return this.shoppingCartState.setIsSearchingProducts(true);
        },
    }
};
</script>
