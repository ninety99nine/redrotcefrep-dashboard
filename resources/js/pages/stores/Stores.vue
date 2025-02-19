<template>

    <div class="pt-24 px-20 min-h-screen">

        <div class="flex flex-col items-center my-16">

            <h1 class="space-x-2 text-xl text-gray-700 font-semibold mb-2">
                <template v-if="isLoadingStores">Searching Your Stores</template>
                <template v-else-if="hasStores">Let’s Get Selling!</template>
                <template v-else>Start Selling Today!</template>
            </h1>

            <p class="text-sm text-gray-500">
                <template v-if="isLoadingStores">Hang tight! We're getting everything ready for you.</template>
                <template v-else-if="hasStores">Select a store to start managing your business.</template>
                <template v-else>You haven’t created a store yet—let’s get your first one up and running! 🚀</template>
            </p>

        </div>

        <!-- Loader -->
        <div
            v-if="isLoadingStores"
            class="flex justify-center">
            <SpinningLoader></SpinningLoader>
        </div>

        <div v-else class="flex justify-center">

            <div class="w-full max-w-5xl flex flex-wrap justify-center gap-4">

                <!-- Store Cards -->
                <StoreCard
                    class="w-80"
                    :key="index"
                    :store="store"
                    v-for="(store, index) in stores">
                </StoreCard>

                <!-- Add Store Card -->
                <AddStoreCard :hasStores="hasStores" class="w-80"></AddStoreCard>

            </div>

        </div>

    </div>

</template>

<script>

    import { useApiState } from '@Stores/api-store.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import { getApi } from '@Repositories/api-repository.js';
    import StoreCard from '@Pages/stores//components/StoreCard.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import AddStoreCard from '@Pages/stores//components/AddStoreCard.vue';

    export default {
        components: {
            StoreCard, SpinningLoader, AddStoreCard
        },
        data() {
            return {
                stores: [],
                pagination: null,
                isLoadingStores: false,
                apiState: useApiState(),
                authState: useAuthState()
            };
        },
        computed: {
            authUser() {
                return this.authState.user;
            },
            hasStores() {
                return this.stores.length > 0;
            }
        },
        methods: {
            showStores() {

                this.isLoadingStores = true;

                let relationships = ['logo', 'activeSubscription'];

                let params = {
                    'association': 'team member',
                    '_relationships': relationships.join(',')
                };

                getApi(this.apiState.apiHome._links['showStores'], params).then(response => {

                    if(response.status == 200) {

                        this.pagination = response.data;
                        this.stores = this.pagination.data;

                    }

                    this.isLoadingStores = false;

                }).catch(errorException => {

                    this.isLoadingStores = false;

                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showStores();
        }
    };

</script>
