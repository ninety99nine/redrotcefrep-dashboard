<template>

    <div>

        <div class="flex justify-between items-center border-dashed py-6">

            <div class="flex items-center">

                <!-- Text Heading -->
                <TextHeader><span class="mr-2">💬</span> Reviews</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Reviews are customer feedback on products and services that you offer. This helps you and your customers make informed decisions" placement="top"></MoreInfoPopover>

            </div>

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
                    <td class="whitespace-nowrap px-4 py-4">

                        <div class="items-center">
                            <span>{{ review._relationships.user._attributes.name }}</span>
                        </div>

                    </td>

                    <!-- Subject -->
                    <td class="whitespace-nowrap px-4 py-4">

                        <div class="items-center">
                            <span>{{ review.subject }}</span>
                        </div>

                    </td>

                    <!-- Rating -->
                    <td class="whitespace-nowrap px-4 py-4">

                        <div class="flex items-center">
                            <svg v-for="(star, index) in 5" :key="index" :class="[ review.rating > index ? 'text-yellow-300' : 'text-gray-300', 'w-4 h-4']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                            </svg>
                        </div>

                    </td>

                    <!-- Comment -->
                    <td class="px-4 py-4">
                        <div class="flex space-x-1 items-center w-60">
                            <span v-if="review.comment == null">...</span>
                            <span v-else>{{ review.comment }}</span>
                        </div>
                    </td>

                    <!-- Created Date -->
                    <td class="whitespace-nowrap px-4 py-4">
                        <div class="flex space-x-1 items-center">
                            <span>{{ formattedDatetime(review.createdAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(review.createdAt)" placement="top"></MoreInfoPopover>
                        </div>
                    </td>

                </tr>
            </template>

        </BasicTable>

        <!-- No Reviews -->
        <div v-else class="flex justify-between space-x-20 bg-white shadow-lg rounded-lg border p-20">
            <div class="space-y-4">
                <h1 class="text-2xl font-bold">Discover Customer Feedback</h1>
                <div>
                    <p>See what your customers are saying about your <span class="underline decoration-dashed underline-offset-4">products</span> and <span class="underline decoration-dashed underline-offset-4">services</span>.</p>
                    <p>Reviews will appear here once customers provide feedback.</p>
                </div>
            </div>
            <div>
                <span class="text-8xl">💬</span>
            </div>
        </div>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import { getApi } from '@Repositories/api-repository.js';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { TextHeader, BasicTable, MoreInfoPopover },
        data() {
            return {
                reviews: [],
                pagination: null,
                searchTerm: null,
                isLoadingReviews: false,
                storeState: useStoreState(),
                tableHeaders: ['Customer', 'Subject', 'Rating', 'Comment', 'Created Date']
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
            paginate(url) {
                this.url = url;
                this.getReviews();
            },
            search(searchTerm) {
                this.url = this.store._links.showReviews;
                this.searchTerm = searchTerm;
                this.getReviews();
            },
            getReviews() {

                //  Start loader
                this.isLoadingReviews = true;

                //  Set the query params
                const params = {
                    'withUser': '1'
                }

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                getApi(this.url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.reviews = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingReviews = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingReviews = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.url = this.store._links.showReviews;
            this.getReviews();
        }
    };

</script>
