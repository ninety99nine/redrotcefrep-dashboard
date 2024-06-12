<template>

    <div class="px-16 pt-8">

        <div v-if="store" class="grid grid-cols-2 pb-4 border-b border-dashed">

            <div class="col-span-1">

                <!-- Text Heading -->
                <TextHeader>{{ store._attributes.nameWithEmoji }}</TextHeader>

                <!-- Description -->
                <p v-if="store.description" class="mt-2">{{ store.description }}</p>

                <!-- User Store Subscription Countdown -->
                <div v-if="$route.name != 'show-store-home' && storeRequiresSubscription" class="bg-white shadow-lg rounded-lg border border-b-2 p-4 mt-4">
                    <UserStoreSubscriptionCountdown></UserStoreSubscriptionCountdown>
                </div>

                <Alert v-if="getFormError('general')" type="warning">
                    {{ getFormError('general') }}
                </Alert>

            </div>

            <div class="col-span-1 flex justify-end items-end">

                <!-- Home Icon -->
                <svg @click="navigateToStoreHome" class="w-8 h-8 mr-4 cursor-pointer hover:opacity-80 active:opacity-50 active:scale-90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>

            </div>


        </div>

        <!-- Store Content -->
        <router-view v-if="store" :key="store.id"></router-view>

    </div>

</template>

<script>

    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import { getStore } from '@Repositories/store-repository.js';
    import { useNotificationState } from '@Stores/notification-store.js';
    import UserStoreSubscriptionCountdown from '@Components/store/UserStoreSubscriptionCountdown.vue';

    export default {
        mixins: [FormMixin],
        components: { Alert, TextHeader, UserStoreSubscriptionCountdown },
        data() {
            return {
                isLoadingStore: false,
                storeState: useStoreState(),
                notificationState: useNotificationState()
            }
        },
        watch: {
            '$route.params.store_href'(newValue, oldValue) {
                this.getRouteMatchingStore();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            lastSubscriptionHasExpired() {
                return this.store._attributes.userStoreAssociation.lastSubscriptionHasExpired;
            },
            storeRequiresSubscription() {
                return this.lastSubscriptionHasExpired == null || this.lastSubscriptionHasExpired == true
            }
        },
        methods: {
            navigateToStoreHome() {
                this.$router.push({ name: 'show-store-home', params: { 'store_href': this.store._links.self } });
            },
            getRouteMatchingStore() {

                this.isLoadingStore = true;

                let params = {
                    //'_noFields': true,
                    //'_noRelationships': true,
                    //'_includeAttributes': 'nameWithEmoji',
                    //'_includeLinks': 'self,showOrders,showProducts',
                };

                getStore(this.$route.params.store_href, params).then(response => {

                    if(response.status == 200) {

                        //  Stop loader
                        this.isLoadingStore = false;

                        //  Set the store on the component state and the pinia store state
                        useStoreState().store = response.data;

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingStore = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });
            }
        },
        created() {
            this.getRouteMatchingStore();
        }
    };

</script>
