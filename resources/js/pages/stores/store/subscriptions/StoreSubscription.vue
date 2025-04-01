<template>

    <div class="min-h-screen relative overflow-hidden pb-80">

        <div class="z-10 pt-32 px-20 relative">

            <div class="flex justify-center items-center mb-8">

                <Button @click="navigateToSubscriptions" type="light" size="xs">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>

                    <span>Subscriptions</span>
                </Button>

            </div>

            <div class="flex justify-center space-x-4 mb-8">

                <div
                    class="animated-border-blue w-96 bg-white py-4 px-4 shadow-sm rounded-xl">

                        <h1 class="text-xl font-bold mb-4">
                            Subscription
                        </h1>

                        <template v-if="isLoadingSubscription">

                            <p class="text-sm text-gray-500">
                                Hang tight! We're checking the subscription status
                            </p>

                            <div class="flex justify-center my-8">

                                <!-- Loader -->
                                <SpinningLoader></SpinningLoader>

                            </div>

                        </template>

                        <template v-else>

                            <div class="flex items-center space-x-2 mb-4">

                                <Pill type="light" size="xs">
                                    {{ pricingPlan.name }}
                                </Pill>

                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>

                                <Pill type="light" size="xs">
                                    {{ store.name }}
                                </Pill>

                            </div>

                            <h2 class="text-sm mb-4">
                                {{ transaction.description }}
                            </h2>

                            <div class="flex items-center space-x-2 mb-4">
                                <span class="font-bold text-xs">Status: </span>
                                <div class="flex items-center space-x-2">
                                    <Pill :type="getStatusType" size="xs">
                                        {{ subscription._attributes.status }}
                                    </Pill>
                                    <MoreInfoPopover title="What Is This?" placement="top">
                                        <template #description>
                                            <p class="whitespace-normal text-xs space-y-2 mt-4">{{ subscription._attributes.statusDescription }}</p>
                                        </template>
                                    </MoreInfoPopover>
                                </div>
                            </div>

                            <div class="flex space-x-4 items-center border-b border-dashed pb-4 mb-4">

                                <div class="flex items-center space-x-2 text-xs">
                                    <span class="font-bold text-xs">Start: </span>
                                    <span class="text-xs">{{ formattedDate(subscription.startAt) }}</span>
                                </div>

                                <div class="flex items-center space-x-2 text-xs">
                                    <span class="font-bold text-xs">End: </span>
                                    <span class="text-xs">{{ formattedDate(subscription.endAt) }}</span>
                                </div>

                            </div>

                            <h2 class="text-3xl font-bold space-x-1 mb-4">
                                <span>{{ transaction.amount.amountWithCurrency }}</span>
                            </h2>

                            <div class="bg-blue-50 border border-blue-500 p-4 rounded-lg mb-4">
                                <div
                                    :key="index"
                                    v-for="(feature, index) in pricingPlan.features">

                                    <span class="text-blue-500 text-xs">{{ feature }}</span>

                                </div>
                            </div>

                            <div class="flex items-center space-x-2 text-xs">
                                <span class="text-gray-400">{{ subscription.id }}</span>
                                <MoreInfoPopover title="What Is This?" description="This is the subscription ID" placement="top"></MoreInfoPopover>
                            </div>

                        </template>

                </div>

            </div>

        </div>

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-32">

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import { formattedDate } from '@Utils/dateUtils.js';
    import { getApi } from '@Repositories/api-repository.js';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { Pill, Button, SpinningLoader, MoreInfoPopover },
        data() {
            return {
                subscription: null,
                subscriptionHref: null,
                isLoadingSubscription: false,
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            transaction() {
                return this.subscription._relationships.transaction;
            },
            pricingPlan() {
                return this.subscription._relationships.pricingPlan;
            },
            getStatusType() {

                const status = this.subscription._attributes.status.toLowerCase();

                if(status == 'active') {
                    return 'success';
                }else if(status == 'expired') {
                    return 'warning';
                }else{
                    return 'light';
                }
            },
        },
        methods: {
            formattedDate: formattedDate,
            showSubscription() {

                this.isLoadingSubscription = true;

                let relationships = ['transaction', 'pricingPlan'];

                let params = {
                    '_relationships': relationships.join(',')
                };

                getApi(this.$route.params.subscription_href, params).then(response => {

                    if(response.status == 200 && response.data.exists) {

                        this.subscription = response.data.subscription;

                    }

                    this.isLoadingSubscription = false;

                }).catch(errorException => {

                    this.isLoadingSubscription = false;
                    this.formState.setServerFormErrors(errorException);

                });

            },
            navigateToSubscriptions() {
                this.$router.push({
                    name: 'show-store-subscriptions',
                    params: { 'store_href': this.store._links.showStore }
                });
            }
        },
        created() {
            this.showSubscription();
        }
    };

</script>
