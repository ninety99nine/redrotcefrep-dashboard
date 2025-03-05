<template>

    <div class="pt-24 pb-80 px-8 relative">

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-0">

        <div class="relative">

            <div class="flex flex-col items-center mb-8">
                <h1 class="space-x-2 text-xl text-gray-700 font-semibold bg-white rounded-full py-2 px-8 mb-4">
                    <span>🚀</span>
                    <span>Subscriptions</span>
                </h1>
                <img src="/images/store-rooftop.png" class="w-96">
            </div>

            <!-- Subscriptions Table -->
            <BasicTable v-if="isLoadingSubscriptions || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingSubscriptions" @paginate="paginate" @search="search" @refresh="getSubscriptions" :totalHeaders="tableHeaders.length">

                <!-- Table Head -->
                <template #head>
                    <tr>

                        <!-- Table Header -->
                        <th v-for="(tableHeader, index) in tableHeaders" :key="index" scope="col" class="whitespace-nowrap px-4 py-3">
                            {{ tableHeader }}
                        </th>

                    </tr>
                </template>

                <template #afterRefreshButton>

                    <!-- Add Subscription Button -->
                    <Button :action="onAddSubscription" type="primary" size="sm" icon="add">
                        <span>Add Subscription</span>
                    </Button>

                </template>

                <!-- Table Body -->
                <template #body>

                    <tr
                        :key="subscription.id"
                        @click.stop="onView(subscription)"
                        v-for="subscription in subscriptions"
                        class="group cursor-pointer border-b bg-white hover:bg-gray-50">

                        <!-- Plan Name -->
                        <td class="whitespace-nowrap px-4 py-4 align-top">
                            {{ subscription._relationships.pricingPlan.name }}
                        </td>

                        <!-- Status -->
                        <td class="whitespace-nowrap px-4 py-4 align-top">

                            <div class="flex items-center space-x-2">
                                <Pill :type="getStatusType(subscription)" size="xs">
                                    {{ subscription._attributes.status }}
                                </Pill>
                                <MoreInfoPopover title="What Is This?" placement="top">
                                    <template #description>
                                        <p class="whitespace-normal text-xs space-y-2 mt-4">{{ subscription._attributes.statusDescription }}</p>
                                    </template>
                                </MoreInfoPopover>
                            </div>

                        </td>

                        <!-- Start At -->
                        <td class="whitespace-nowrap px-4 py-4 align-top">
                            <span>{{ formattedDatetime(subscription.startAt) }}</span>
                        </td>

                        <!-- End At -->
                        <td class="whitespace-nowrap px-4 py-4 align-top">
                            <span>{{ formattedDatetime(subscription.endAt) }}</span>
                        </td>

                        <!-- Amount -->
                        <td class="whitespace-nowrap px-4 py-4 align-top">
                            <span>{{ subscription._relationships.transaction.amount.amountWithCurrency }}</span>
                        </td>

                        <!-- Action -->
                        <td class="px-4 py-4 space-x-4 align-top">

                            <!-- View Button -->
                            <span @click.stop.prevent="onView(subscription)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</span>

                        </td>

                    </tr>

                </template>

            </BasicTable>

            <!-- No Subscriptions -->
            <div v-else class="flex justify-center">

                <div
                    class="animated-border-blue w-96 bg-white py-4 px-4 shadow-sm space-y-4 rounded-xl">

                    <h1 class="text-xl font-bold">
                        Update Now
                    </h1>

                    <p class="text-sm text-gray-500">
                        You are on the Free plan with limited features.
                        Do so much more with an upgrade ✨
                    </p>

                    <div class="flex justify-end">

                        <!-- Upgrade Button -->
                        <Button :action="onAddSubscription" type="primary" size="sm">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                            <span>Upgrade</span>
                        </Button>

                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import ProfilePhoto from '@Components/user/ProfilePhoto.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            Button, TextHeader, AddButton, BasicTable, Checkbox, ProfilePhoto, ConfirmModal,
            PrimaryButton, SpinningLoader, MoreInfoPopover, ToogleSwitch, Pill,
        },
        data() {
            return {
                pagination: null,
                searchTerm: null,
                subscriptions: [],
                storeState: useStoreState(),
                isLoadingSubscriptions: false,
                tableHeaders: ['Plan Name', 'Status', 'Start At', 'End At', 'Amount', '']
            }
        },
        watch: {
            isLoadingStore(newValue) {
                if(!newValue) {
                    this.getSubscriptions();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onView(subscription) {
                this.$router.push({
                    name: 'show-store-subscription',
                    params: {
                        'store_href': this.store._links.showStore,
                        'subscription_href': subscription._links.showSubscription
                    }
                });
            },
            onAddSubscription() {
                this.$router.push({ name: 'show-store-pricing-plans', params: { 'store_href': this.store._links.showStore } });
            },
            getStatusType(subscription) {

                const status = subscription._attributes.status.toLowerCase();

                if(status == 'active') {
                    return 'success';
                }else if(status == 'expired') {
                    return 'warning';
                }else{
                    return 'light';
                }
            },
            paginate(url) {
                this.getSubscriptions(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getSubscriptions();
            },
            getSubscriptions(url = null) {

                //  Start loader
                this.isLoadingSubscriptions = true;

                let relationships = ['transaction', 'pricingPlan'];

                let params = {
                    '_relationships': relationships.join(',')
                };

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                url = url ?? this.store._links.showStoreSubscriptions;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.subscriptions = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingSubscriptions = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingSubscriptions = false;

                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.isLoadingSubscriptions = true;
        }
    };

</script>
