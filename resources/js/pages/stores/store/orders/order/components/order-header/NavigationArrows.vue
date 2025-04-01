<template>

    <div class="flex space-x-2 items-center">

        <!-- Previous Order -->
        <Button
            size="xs"
            type="light"
            icon="chevron-left-arrow"
            :disabled="!hasPreviousOrder"
            :action="() => onView('prev')"
            :skeleton="isLoadingStore || isLoadingOrder">
        </Button>

        <!-- Next Order -->
        <Button
            size="xs"
            type="light"
            :disabled="!hasNextOrder"
            icon="chevron-right-arrow"
            :action="() => onView('next')"
            :skeleton="isLoadingStore || isLoadingOrder">
        </Button>

    </div>

</template>

<script>

    import axios from 'axios';
    import Button from '@Partials/buttons/Button.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';

    export default {
        inject: ['apiState', 'formState', 'orderState', 'storeState'],
        components: { Button, ConfirmModal },
        data() {
            return {
                pagination: null,
                searchTerm: null,
                filterExpressions: [],
                sortingExpressions: [],
                isLoadingOrders: false
            }
        },
        watch: {
            isLoadingOrder(newValue) {
                if(!newValue) {
                    this.getOrders();
                }
            }
        },
        computed: {
            order() {
                return this.orderState.order;
            },
            store() {
                return this.storeState.store;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            },
            hasFilterExpressions() {
                return this.filterExpressions.length > 0;
            },
            hasSortingExpressions() {
                return this.sortingExpressions.length > 0;
            },
            hasNextOrder() {
                if(this.isLoadingOrder || this.isLoadingOrders || !this.pagination || !this.pagination.data.length) return false;

                let currentIndex = this.pagination.data.findIndex(order => order._links.showOrder === this.order._links.showOrder);

                // Check if there's another order in the same page OR another page exists
                return currentIndex < this.pagination.data.length - 1 || this.pagination.nextPageUrl !== null;
            },
            hasPreviousOrder() {
                if(this.isLoadingOrder || this.isLoadingOrders || !this.pagination || !this.pagination.data.length) return false;

                let currentIndex = this.pagination.data.findIndex(order => order._links.showOrder === this.order._links.showOrder);

                // Check if there's a previous order in the same page OR another page exists
                return currentIndex > 0 || this.pagination.prevPageUrl !== null;
            }
        },
        methods: {
            onView(direction) {

                let currentIndex = this.pagination.data.findIndex(order => order._links.showOrder === this.order._links.showOrder);

                const query = {
                    searchTerm: this.searchTerm,
                    filterExpressions: this.filterExpressions.join('|'),
                    sortingExpressions: this.sortingExpressions.join('|'),
                }

                if(direction === 'next') {

                    if(currentIndex < this.pagination.data.length - 1) {

                        // Go to next order in the same page
                        this.$router.push({
                            name: 'show-store-order',
                            query: query,
                            params: {
                                'store_href': this.store._links.showStore,
                                'order_href': this.pagination.data[currentIndex + 1]._links.showOrder
                            }
                        });

                    }else if(this.pagination.nextPageUrl) {

                        // Load the next page of orders
                        this.getOrders(this.pagination.nextPageUrl);

                    }

                }else if(direction === 'prev') {

                    if(currentIndex > 0) {

                        // Go to previous order in the same page
                        this.$router.push({
                            name: 'show-store-order',
                            query: query,
                            params: {
                                'store_href': this.store._links.showStore,
                                'order_href': this.pagination.data[currentIndex - 1]._links.showOrder
                            }
                        });

                    }else if(this.pagination.prevPageUrl) {

                        // Load the previous page of orders
                        this.getOrders(this.pagination.prevPageUrl);

                    }

                }

            },
            async getOrders(url = null) {

                this.isLoadingOrders = true;
                url = url ?? this.store._links.showStoreOrders;

                let config = {
                    params: {
                        '_noFields': '1',
                        '_noAttributes': '1',
                        '_noRelationships': '1',
                        'per_page': this.perPage,
                        'association': 'team member',
                        '_includeLinks': 'showOrder',
                    }
                }

                if(this.hasSearchTerm) config.params['search'] = this.searchTerm;

                if(this.hasFilterExpressions) {
                    config.params['_filters'] = this.filterExpressions.join('|');
                }

                if(this.hasSortingExpressions) {
                    config.params['_sort'] = this.sortingExpressions.join('|');
                }

                await axios.get(url, config).then(response => {

                    if(response.status == 200) {

                        this.pagination = response.data;

                    }else{

                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);

                    }

                }).catch(errorException => {
                    this.formState.setServerFormErrors(errorException);
                });

                this.isLoadingOrders = false;

            }
        },
        created() {
            this.searchTerm = this.$route.query.searchTerm;
            if(this.$route.query.filterExpressions) this.filterExpressions = this.$route.query.filterExpressions.split('|');
            if(this.$route.query.sortingExpressions) this.sortingExpressions = this.$route.query.sortingExpressions.split('|');
        }
    };

</script>
