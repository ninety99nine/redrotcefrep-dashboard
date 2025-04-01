<template>

    <div>

        <!-- Right Side Alerts -->
        <RightSideAlerts></RightSideAlerts>

        <template v-if="!store && isSearchingStore">

        </template>

        <!-- Content -->
        <router-view v-else-if="store"></router-view>

        <!-- Store Not Found -->
        <StoreNotFound v-else></StoreNotFound>

    </div>

</template>

<script>

    import { postApi } from '@Repositories/api-repository.js';
    import RightSideAlerts from '@Partials/alerts/RightSideAlerts.vue';
    import Storefront from '@Pages/shopping/storefront/Storefront.vue';
    import StoreNotFound from '@Pages/shopping/store-not-found/StoreNotFound.vue';

    export default {
        inject: ['apiState', 'formState', 'storeState'],
        components: { Storefront, RightSideAlerts, StoreNotFound },
        data() {
            return {
                isSearchingStore: false
            }
        },
        watch: {
            'storeState.shouldUpdate'(newValue, oldValue) {
                this.storeState.setShouldUpdate(false);
                this.searchStoreByAlias();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            }
        },
        methods: {
            searchStoreByAlias() {

                //  Start loader
                this.isSearchingStore = true;

                const url = this.apiState.apiHome['_links']['searchStoreByAlias'];

                // Get the store alias
                const params = {
                    'alias': this.$route.params.alias,
                    '_relationships': 'logo'
                }

                postApi(url, params).then(response => {

                    if(response.status == 200) {

                        if(response.data.exists) {

                            this.storeState.setStore(response.data.store);

                        }else{

                        }
                    }

                    //  Stop loader
                    this.isSearchingStore = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSearchingStore = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
        },
        created() {
            this.searchStoreByAlias();
        }
    };

</script>
