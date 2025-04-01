<template>

    <div class="bg-white shadow-lg border p-6 mt-6 rounded-lg">

        <div class="flex justify-between items-center mb-4">

            <h1 class="flex items-center text-lg font-bold mb-2">

                <!-- Page Icon -->
                <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>

                <!-- Title -->
                <span>Pages</span>

            </h1>

            <template v-if="hasSearchTerm || hasPages">

                <!-- Add Page Button -->
                <Button type="primary" size="sm" icon="add" :skeleton="isLoadingPages" :action="() => onAddPage()" class="w-40">
                    <span>Add Page</span>
                </Button>

            </template>

        </div>

        <div class="space-y-4">

            <!-- Search Input -->
            <SearchInput v-if="hasSearchTerm || hasPages" v-model="searchTerm" :isSearching="isSearching" class="md:max-w-80"></SearchInput>

            <!-- Pages (Loading Placeholder) -->
            <div v-if="isLoadingPages" class="space-y-2">

                <div v-for="(_, index) in [1,2,3]" :key="index" class="border shadow-sm rounded-lg p-4 bg-gray-50">
                    <div class="w-full flex items-center justify-between">
                        <LineSkeleton width="w-32"></LineSkeleton>
                        <LineSkeleton width="w-16"></LineSkeleton>
                    </div>
                </div>

            </div>

            <!-- Pages -->
            <template v-else>

                <draggable
                    v-model="pages"
                    class="space-y-2"
                    handle=".draggable-handle"
                    ghost-class="bg-yellow-50"
                    @change="updatePageArrangement">

                    <div
                        :key="index"
                        v-for="(page, index) in pages"
                        @click="() => onViewPage(page)"
                        class="flex items-center justify-between space-x-4 border shadow-sm rounded-lg p-4 bg-gray-50 cursor-pointer hover:border-blue-200 hover:bg-blue-50 group">

                        <!-- Page -->
                        <div class="w-full flex items-center justify-between">

                             <div :class="['flex items-center space-x-2', { 'text-blue-500' : page.homepage }]">

                                <!-- Home Icon -->
                                <svg v-if="page.homepage" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                </svg>

                                <!-- Link Icon -->
                                <svg v-else class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>

                                <!-- Title -->
                                <h1 class="text-sm font-semibold">{{ page.title }}</h1>

                             </div>

                            <div class="flex items-center space-x-2">

                                <!-- Visible Status Badge -->
                                <Pill :type="page.visible ? 'success' : 'warning'" size="xs" :showDot="false">{{ page.visible ? 'visible' : 'hidden' }}</Pill>

                            </div>

                        </div>

                        <!-- Deleting Loader -->
                        <SpinningLoader v-if="isDeleting(page)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpinningLoader>

                        <!-- Delete Button - Triggers Confirmation Modal -->
                        <svg v-else @click.stop.prevent="showDeleteConfirmationModal(page)" class="w-4 h-4 cursor-pointer hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        <!-- Drag & Drop Handle -->
                        <svg @click.stop class="draggable-handle w-4 h-4 cursor-grab hover:text-yellow-500 visible:cursor-grabbing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>

                    </div>

                </draggable>

                <!-- No Pages -->
                <div v-if="!hasPages">

                    <div class="flex items-center space-x-8 p-8 border rounded-lg bg-gray-50">

                        <span class="text-9xl">🎨</span>

                        <div class="space-y-4">
                            <p v-if="hasSearchTerm" class="text-sm font-bold">No pages found.</p>
                            <div v-else class="space-y-1">
                                <p class="text-2xl font-bold">Pages help build your shop</p>
                                <p class="text-sm">Home, about us, terms and conditions and more are created using pages</p>
                            </div>
                            <Pill type="primary" text="+ Add Page" size="xs" :showDot="false" :action="onAddPage"></Pill>
                        </div>

                    </div>

                </div>

            </template>

            <!-- Confirm Delete Page -->
            <ConfirmModal v-if="deletablePage" approveText="Delete" :approveAction="(hideModal) => deletePage(hideModal)" :isLoading="isDeleting(deletePage)">

                <template #content>
                    <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                    <p class="mb-8">Are you sure you want to delete <span class="font-bold text-black">{{ deletablePage.name }}</span>?</p>
                </template>

            </ConfirmModal>

        </div>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import { VueDraggableNext } from 'vue-draggable-next';
    import SearchInput from '@Partials/inputs/SearchInput.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import { getApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        inject: ['apiState', 'formState', 'storeState', 'notificationState'],
        components: {
            Pill, Button, draggable: VueDraggableNext, SearchInput, ConfirmModal,
            SpinningLoader, LineSkeleton
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                pages: [],
                searchTerm: '',
                deletablePage: null,
                isDeletingPageIds: [],
                isLoadingPages: false,
                isUpdatingPageArrangement: false,
            }
        },
        watch: {
            searchTerm(newValue, oldValue) {
                this.showPages();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isSearching() {
                return this.hasSearchTerm && this.isLoadingPages;
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            },
            hasPages() {
                return this.pages.length > 0;
            },
        },
        methods: {
            onViewPage(page) {
                this.$router.push({
                    name: 'show-store-page',
                    params: { 'page_href': page._links.showPage }
                });
            },
            onAddPage() {
                this.$router.push({ name: 'create-store-page', params: { 'store_href': this.store._links.showStore } });
            },
            showDeleteConfirmationModal(page) {
                this.deletablePage = page;
                /**
                 *  After setting the deletablePage, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which opens the
                 *  confirmation modal dialog. This is so that when the dialog opens we don't
                 *  get an error trying to access the deletablePage values. This
                 *  is only available on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(page) {
                return this.isDeletingPageIds.findIndex((id) => id == page.id) != -1;
            },
            showPages() {

                //  Start loader
                this.isLoadingPages = true;

                const params = {
                    'storeId': this.store.id
                };

                if(this.searchTerm) params['search'] = this.searchTerm;

                getApi(this.store._links['showStorePages'], params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.pages = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingPages = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingPages = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            updatePageArrangement() {

                //  Start loader
                this.isUpdatingPageArrangement = true;

                //  Set the query params
                const params = {
                    'storeId': this.store.id,
                    'pageIds': this.pages.map((page) => page.id)
                }

                postApi(this.apiState.apiHome['_links']['updatePageArrangement'], params).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            this.notificationState.showSuccessNotification('Page arrangement updated');

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.isUpdatingPageArrangement = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isUpdatingPageArrangement = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deletePage(hideModal) {

                //  Start loader
                this.isDeletingPageIds.push(this.deletablePage.id);

                deleteApi(this.deletablePage._links.deletePage).then(response => {

                    hideModal();

                    //  Stop loader
                    this.isDeletingPageIds.splice(this.isDeletingPageIds.findIndex((id) => id == this.deletePage.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification('Page deleted');

                            //  If we are not deleting any other page, then refresh the page list
                            if(this.isDeletingPageIds.length == 0) this.showPages();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingPageIds.splice(this.isDeletingPageIds.findIndex((id) => id == this.deletePage.id, 1));

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showPages();
        }
    };

</script>
