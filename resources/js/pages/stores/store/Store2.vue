<template>

    <div class="px-16 pt-8">

        <div v-if="store" class="grid grid-cols-2 pb-4 border-b border-dashed">

            <div class="col-span-1">

                <!-- Text Heading -->
                <LineSkeleton v-if="isLoadingStore" width="w-32" height="h-4" :shine="true"></LineSkeleton>
                <TextHeader v-else>{{ store._attributes.nameWithEmoji }}</TextHeader>

                <!-- Description -->
                <LineSkeleton v-if="isLoadingStore" width="w-40" :shine="true"></LineSkeleton>
                <p v-else-if="store.description" class="mt-2">{{ store.description }}</p>

                <template v-if="$route.name != 'show-store-home'">

                    <template v-if="!completedQuickStartGuide">

                        <div class="flex justify-between items-end bg-white shadow-lg rounded-lg border py-4 px-8 mt-4">

                            <div class="space-y-3">

                                <!-- Quick Start Guide (Heading) -->
                                <h1 class="text-lg font-bold">Quick Start Guide</h1>

                                <!-- Quick Start Guide (Instructions) -->
                                <p class="text-sm text-gray-500">Let's continue setting up your store</p>

                                <LineSkeleton v-if="isLoadingStore" width="w-32" height="h-4" :shine="true"></LineSkeleton>

                                <!-- Quick Start Guide (Progress) -->
                                <StoreQuickStartGuideProgress v-else></StoreQuickStartGuideProgress>

                            </div>

                            <div>

                                <PrimaryButton :action="navigateToStoreHome" class="w-40" size="xs" type="success">
                                    <span class="mr-2">Continue</span>
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </PrimaryButton>

                            </div>

                        </div>

                    </template>

                    <!-- User Store Subscription Countdown -->
                    <div class="bg-white shadow-lg rounded-lg border border-b-2 p-4 mt-4">
                        <UserStoreSubscriptionCountdown></UserStoreSubscriptionCountdown>
                    </div>

                </template>

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
    import { getApi } from '@Repositories/api-repository.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import { useNotificationState } from '@Stores/notification-store.js';
    import StoreQuickStartGuideProgress from '@Components/store/StoreQuickStartGuideProgress.vue';
    import UserStoreSubscriptionCountdown from '@Components/store/UserStoreSubscriptionCountdown.vue';

    export default {
        mixins: [FormMixin],
        components: { Alert, TextHeader, LineSkeleton, PrimaryButton, StoreQuickStartGuideProgress, UserStoreSubscriptionCountdown },
        data() {
            return {
                storeState: useStoreState(),
                notificationState: useNotificationState()
            }
        },
        watch: {
            '$route.params.store_href'(newValue, oldValue) {
                this.showStore();
            },
            'storeState.shouldUpdate'(newValue, oldValue) {
                this.storeState.setShouldUpdate(false);
                this.showStore();
            }
        },
        beforeRouteUpdate(to, from) {
            this.showQuickStartGuide();
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            quickStartGuide() {
                return this.storeState.quickStartGuide;
            },
            activeSubscription() {
                return this.store._relationships.activeSubscription;
            },
            completedQuickStartGuide() {
                return this.storeState.completedQuickStartGuide;
            }
        },
        methods: {
            navigateToStoreHome() {
                this.$router.push({ name: 'show-store-home', params: { 'store_href': this.store._links.showStore } });
            },
            showStore() {

                this.storeState.setIsLoadingStore(true);

                let countableRelationships = ['subscriptions'];
                let relationships = ['address', 'storeRollingNumbers', 'activeSubscription', 'userStoreAssociation'];

                let params = {
                    '_relationships': relationships.join(','),
                    '_countable_relationships': countableRelationships.join(',')
                };

                getApi(this.$route.params.store_href, params).then(response => {

                    if(response.status == 200) {

                        if(response.data.exists) {

                            //  Set the store on the component state and the pinia store state
                            this.storeState.setStore(response.data.store);

                            //  Load the store quick start guide
                            this.showQuickStartGuide();

                        }

                    }

                    //  Stop loader
                    this.storeState.setIsLoadingStore(false);

                }).catch(errorException => {

                    //  Stop loader
                    this.storeState.setIsLoadingStore(false);

                    this.setServerFormErrors(errorException);

                });
            },
            showQuickStartGuide() {

                //  Start loader
                this.storeState.setIsLoadingQuickStartGuide(true);

                getApi(this.store._links.showStoreQuickStartGuide).then(response => {

                    if(response.status == 200) {

                        //  Set the quickStartGuide on the component state and the pinia store state
                        this.storeState.setQuickStartGuide(response.data);

                    }

                    //  Stop loader
                    this.storeState.setIsLoadingQuickStartGuide(false);

                }).catch(errorException => {

                    //  Stop loader
                    this.storeState.setIsLoadingQuickStartGuide(false);

                    this.setServerFormErrors(errorException);

                });

            },
        },
        created() {
            this.showStore();
        }
    };

</script>
