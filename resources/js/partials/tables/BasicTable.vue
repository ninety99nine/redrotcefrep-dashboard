<template>
    <!--
        Component Referece: https://flowbite.com/docs/components/tables/
     -->
    <div>

        <div class="flex justify-between items-center mb-4">

            <div class="flex justify-center items-center space-x-4">

                <!-- Search Input -->
                <SearchInput v-model="searchTerm" :isSearching="isSearching"></SearchInput>

                <!-- Primary Filters -->
                <slot name="primaryFilters"></slot>

            </div>

            <!-- Refresh Button -->
            <button @click.prevent="refresh" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button>

        </div>

        <template v-if="showAddFilter">

            <div class="flex justify-start items-center bg-gray-50 rounded-lg p-4 mb-4">

                <!-- Add Filter Button -->
                <button @click="showFilterModal" type="button" class="text-xs text-blue-500 rounded-lg py-1 px-4 whitespace-nowrap cursor-pointer border border-blue-300 bg-blue-50 hover:text-blue-400 hover:border-blue-200 active:text-blue-300 active:border-blue-100">
                    + Add Filter
                </button>

                <!-- Separator -->
                <div class="h-4 border-r border-gray-300 mx-4"></div>

                <!-- Selected Filters -->
                <div class="flex flex-wrap">

                    <button @click.self="showSelectedFilter(filter)" type="button" class="flex items-center mr-2 text-xs text-white rounded-lg py-1 px-2 whitespace-nowrap cursor-pointer border border-white bg-blue-500"
                        v-for="(filter, filterIndex) in filters" :key="filterIndex">

                        <!-- Filter Display Name -->
                        <span @click.self="showSelectedFilter(filter, filterIndex)">{{ filter.displayName }}</span>

                        <!-- Remove Filter Button -->
                        <svg @click.self="removeFilter(filterIndex)" class="w-4 h-4 ml-2 hover:text-blue-400 hover:border-blue-200 active:text-blue-300 active:border-blue-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path  @click.self="removeFilter(filterIndex)" stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>

                </div>

            </div>

            <!-- Add Filter Modal -->
            <div :id="uniqueModalId" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                <div class="relative p-4 w-full max-w-md max-h-full">

                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">

                            <!-- Modal Title -->
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                {{ filter == null ? '+ Add Filter' : 'Edit Filter' }}
                            </h3>

                            <!-- Modal Close Icon Button -->
                            <button @click="hideFilterModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>

                        </div>

                        <!-- Modal body -->
                        <div class="grid grid-col-12 lg:gap-4 gap-4 p-4">

                            <!-- Modal Filters -->
                            <slot name="modalFilters"></slot>

                            <div class="col-span-12 flex justify-end">

                                <!-- Modal Add Filter Button -->
                                <button @click.prevent="addOrUpdateFilter" @click="hideFilterModal" type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg v-if="filter == null" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    {{ filter == null ? 'Add Filter' : 'Done' }}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </template>

        <!-- Top Pagination -->
        <Pagination v-if="pagination && pagination.total > 5" :pagination="pagination" @paginate="paginate" class="mb-4"></Pagination>

        <!-- Table -->
        <div class="relative overflow-y-auto bg-white border rounded-lg shadow">

            <!-- Table Loader -->
            <div v-if="pagination && isLoading && !isSearching" class="absolute top-0 bottom-0 left-0 right-0 bg-white/50 flex justify-center items-center">
                <SpiningLoader v-if="!isSearching"></SpiningLoader>
            </div>

            <table class="w-full text-sm text-left rtl:text-right text-gray-500">

                <!-- Table Head -->
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <slot name="head"></slot>

                </thead>

                <!-- Pulsing Placeholder Rows -->
                <tbody v-if="!pagination && isLoading && totalHeaders > 0">

                    <tr v-for="(row, index) in [1,2,3]" :key="index" class="animate-pulse">
                        <td v-for="(count, index) in totalHeaders" :key="index">
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mx-4 my-4"></div>
                        </td>
                    </tr>

                </tbody>

                <!--
                    Table Body Without <tbody> wrapper tag.
                    This slot is mainly used by the Vue Draggable Component which will define the <tbody> wrapper tag itself e.g:

                    The component would define this as follows:

                    <BasicTable>

                        <template #thead>
                            <tr>
                                ...
                            </tr>
                        </template>

                        <template #tbody>
                            <draggable tag="tbody">
                                <tr v-for="item in items">
                                    ...
                                </td>
                            </draggable>
                        </template>

                    </BasicTable>
                -->
                <slot v-else-if="$slots.tbody" name="tbody"></slot>

                <!--
                    Table Body With <tbody> wrapper tag.
                    This slot is maily used by most Components to simply set the <tr> tags only e.g:

                    The component would define this as follows:

                    <BasicTable>

                        <template #thead>
                            <tr>
                                ...
                            </tr>
                        </template>

                        <template #tbody>
                            <tr v-for="item in items">
                                ...
                            </td>
                        </template>

                    </BasicTable>
                -->
                <tbody v-else>
                    <slot name="body"></slot>

                </tbody>

            </table>

            <!-- No Results Desclaimer -->
            <div v-if="pagination && pagination.total == 0" class="text-xs text-gray-700 text-center py-16 bg-gray-50 border-t">
                No results found
            </div>

        </div>

        <!-- Bottom Pagination -->
        <Pagination v-if="pagination" :pagination="pagination" @paginate="paginate" class="mt-4"></Pagination>

    </div>

</template>

<script>

    import { Modal, initFlowbite } from "flowbite";
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import SearchInput from '@Partials/inputs/SearchInput.vue';
    import Pagination from '@Partials/paginations/Pagination.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';

    export default {
        mixins: [UtilsMixin],
        components: { SearchInput, Pagination, SpiningLoader },
        props: {
            isLoading: {
                type: Boolean,
                default: false
            },
            pagination: {
                type: Object
            },
            totalHeaders: {
                type: Number,
                default: 0
            },
            showAddFilter: {
                type: Boolean,
                default: false
            },
            filters: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                modal: null,
                filter: null,
                searchTerm: '',
                filterIndex: null,
                selectedFilter: null,
                uniqueModalId: this.generateUniqueId('modal'),
            }
        },
        watch: {
            searchTerm(newValue, oldValue) {
                this.$emit('search', newValue);
            }
        },
        computed: {
            isSearching() {
                return this.searchTerm.length > 0 && this.isLoading;
            }
        },
        methods: {
            refresh() {
                if(!this.isLoading) this.$emit('refresh');
            },
            paginate(url) {
                this.$emit('paginate', url);
            },
            addOrUpdateFilter() {
                this.$emit('addOrUpdateFilter', this.filterIndex);
                this.filterIndex = null;
                this.filter = null;
            },
            removeFilter(filterIndex) {
                this.filters.splice(filterIndex, 1);
                this.$emit('removeFilter');
            },
            showFilterModal() {
                this.modal.show();
                this.$emit('showFilterModal');
            },
            hideFilterModal() {
                this.modal.hide();
                this.$emit('hideFilterModal');
            },
            showSelectedFilter(filter, filterIndex) {
                this.showFilterModal();
                this.filter = filter;
                this.filterIndex = filterIndex;
                this.$emit('showSelectedFilter', filter);
            },
        },
        mounted() {

            /**
             *  Flowbite javascript will not work unless we deliberately
             *  Initialize Flowbite on mount of the Vue component.
             *
             *  Reference: https://stackoverflow.com/questions/76043935/flowbite-is-not-working-with-inertia-laravel-app
             */
            initFlowbite();

            const $targetEl = document.getElementById(this.uniqueModalId);

            if($targetEl != null) {
                this.modal = new Modal($targetEl);
            }

        }
    };
</script>
