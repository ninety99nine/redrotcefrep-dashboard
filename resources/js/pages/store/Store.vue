<template>

    <div class="px-16 pt-8">

        <div v-if="store">

            <!-- Text Heading -->
            <TextHeader>{{ store._attributes.nameWithEmoji }}</TextHeader>

            <!-- Description -->
            <p v-if="store.description" class="mt-2">{{ store.description }}</p>

        </div>

        <!-- Store Content -->
        <router-view v-if="store" :key="store.id"></router-view>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import { getStore } from '@Repositories/store-repository.js';
    import { useNotificationState } from '@Stores/notification-store.js';

    export default {
        components: { TextHeader },
        data() {
            return {
                isLoadingStore: false,
                store: useStoreState().store,
                notificationState: useNotificationState(),

                generalErrorText: '',
                generalErrorTimeout: null,
            }
        },
        watch: {
            '$route.params.store_href'(newValue, oldValue) {
                this.getRouteMatchingStore();
            }
        },
        methods: {
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
                        this.store = useStoreState().store = response.data;

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingStore = false;
                    this.setServerFormErrors(errorException);

                });
            },
            setServerFormErrors(errorException) {

                this.generalErrorText = ((errorException.response ?? {}).data ?? {}).message ?? error;
                this.generalErrorTimeout = setTimeout(() => this.generalErrorText = '', 5000);

                this.notificationState.addWarningNotification('We couldn\'t show store');

            }
        },
        created() {
            this.getRouteMatchingStore();
        }
    };

</script>
