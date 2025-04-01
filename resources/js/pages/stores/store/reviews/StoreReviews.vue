<template>

    <div class="pt-24 pb-80 px-8 relative">

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-0">

        <div class="relative">

            <div class="flex flex-col items-center mb-8">
                <h1 class="space-x-2 text-xl text-gray-700 font-semibold bg-white rounded-full py-2 px-8 mb-4">
                    <span>💬</span>
                    <span>Reviews</span>
                </h1>
                <img src="/images/store-rooftop.png" class="w-96">
            </div>

            <!-- Reviews Table -->
            <BasicTable v-if="isLoadingReviews || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingReviews" @paginate="paginate" @search="search" @refresh="getReviews" :totalHeaders="tableHeaders.length">

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
                    <tr v-for="review in reviews" :key="review.id" class="group bg-white hover:bg-gray-50 border-b">

                        <!-- Customer -->
                        <td class="align-top whitespace-nowrap px-4 py-4">

                            <div class="items-center">
                                <span>{{ review._relationships.user._attributes.name }}</span>
                            </div>

                        </td>

                        <!-- Subject -->
                        <td class="align-top whitespace-nowrap px-4 py-4">

                            <div class="items-center">
                                <span>{{ review.subject }}</span>
                            </div>

                        </td>

                        <!-- Rating -->
                        <td class="align-top whitespace-nowrap px-4 py-4">

                            <div class="flex items-center">
                                <svg v-for="(star, index) in 5" :key="index" :class="[ review.rating > index ? 'text-yellow-300' : 'text-gray-300', 'w-4 h-4']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                </svg>
                            </div>

                        </td>

                        <!-- Comment -->
                        <td class="align-top px-4 py-4">
                            <div class="flex space-x-1 items-center w-60">
                                <NoDataPlaceholder v-if="review.comment == null"></NoDataPlaceholder>
                                <span v-else>{{ review.comment }}</span>
                            </div>
                        </td>

                        <!-- Created Date -->
                        <td class="align-top whitespace-nowrap px-4 py-4">
                            <div class="flex space-x-1 items-center">
                                <span>{{ formattedDatetime(review.createdAt) }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(review.createdAt)" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Action -->
                        <td class="align-top px-4 py-4 flex items-center space-x-4">

                            <!-- Deleting Loader -->
                            <SpinningLoader v-if="isDeleting(review)" type="danger">
                                <span class="text-xs ml-2">Deleting...</span>
                            </SpinningLoader>

                            <!-- Delete Button -->
                            <span v-else @click.stop.prevent="showDeleteConfirmationModal(review)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span>

                        </td>

                    </tr>
                </template>

            </BasicTable>

            <!-- No Reviews -->
            <div v-else class="flex justify-center">

                <div
                    class="animated-border-blue w-96 bg-white py-4 px-4 shadow-sm space-y-4 rounded-xl">

                    <h1 class="text-xl font-bold">
                        Get Customer Feedback
                    </h1>

                    <p class="text-sm text-gray-500">
                        See what your customers are saying about your products and services. Reviews will appear here once customers provide feedback.
                    </p>

                    <div class="flex justify-end">

                        <!-- Request Reviews Button -->
                        <Button :action="null" type="primary" size="sm" icon="short-right-arrow">
                            <span>Request Reviews</span>
                        </Button>

                    </div>
                </div>

            </div>

        </div>

        <!-- Confirm Delete Review -->
        <ConfirmModal ref="deleteReviewModal" approveText="Delete Review" :approveAction="deleteReview" :isLoading="isDeleting(deletableReview)">

            <template #content>

                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>

                <div v-if="deletableReview" class="space-y-4 mb-8">

                    <p>Are you sure you want to permanently delete this review?</p>

                    <div class="text-red-500 text-xs p-4 bg-red-50 border border-red-300 border-dashed rounded-lg space-y-2">
                        <div class="flex items-center">
                            <svg v-for="(star, index) in 5" :key="index" :class="[ deletableReview.rating > index ? 'text-yellow-300' : 'text-gray-300', 'w-4 h-4']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <p v-if="deletableReview.comment">{{ deletableReview.comment }}</p>
                    </div>

                </div>

            </template>

        </ConfirmModal>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';
    import { formattedDatetime, formattedRelativeDate } from '@Utils/dateUtils.js';

    export default {
        inject: ['formState', 'storeState', 'notificationState'],
        components: { Pill, Button, BasicTable, ConfirmModal, SpinningLoader, MoreInfoPopover, NoDataPlaceholder },
        data() {
            return {
                reviews: [],
                pagination: null,
                searchTerm: null,
                deletableReview: null,
                isLoadingReviews: false,
                deleteReviewModal: null,
                isDeletingReviewIds: [],
                tableHeaders: ['Customer', 'Subject', 'Rating', 'Comment', 'Review Date', '']
            }
        },
        watch: {
            store(newValue) {
                if(newValue) {
                    this.getReviews();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            formattedDatetime: formattedDatetime,
            formattedRelativeDate: formattedRelativeDate,
            showDeleteConfirmationModal(review) {
                this.deletableReview = review;
                this.deleteReviewModal.showModal();
            },
            isDeleting(review) {
                return this.isDeletingReviewIds.findIndex((id) => id == review.id) != -1;
            },
            paginate(url) {
                this.getReviews(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getReviews();
            },
            getReviews(url = null) {

                //  Start loader
                this.isLoadingReviews = true;

                //  Set the query params
                const params = {
                    '_relationships': 'user'
                }

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                url = url ?? this.store._links.showStoreReviews;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.reviews = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingReviews = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingReviews = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deleteReview() {

                //  Start loader
                this.isDeletingReviewIds.push(this.deletableReview.id);

                deleteApi(this.deletableReview._links.deleteReview).then(response => {

                    //  Stop loader
                    this.isDeletingReviewIds.splice(this.isDeletingReviewIds.findIndex((id) => id == this.deletableReview.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification('Review deleted');
                            if(this.isDeletingReviewIds.length == 0) this.getReviews();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingReviewIds.splice(this.isDeletingReviewIds.findIndex((id) => id == this.deletableReview.id, 1));

                    this.formState.setServerFormErrors(errorException);

                });

            },
        },
        mounted() {
            this.deleteReviewModal = this.$refs.deleteReviewModal;
        },
        created() {
            this.isLoadingReviews = true;
        }
    };

</script>
