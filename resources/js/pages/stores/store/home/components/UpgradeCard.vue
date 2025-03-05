<template>

    <div class="animated-border-blue bg-white space-y-4 py-4 px-4 shadow-sm rounded-xl">

        <div class="w-full flex items-center justify-between">

            <h1 class="space-x-2 text-md text-gray-700 font-bold">

                <LineSkeleton v-if="isLoadingStore" width="w-32"></LineSkeleton>
                <span v-else>
                    <template v-if="pricingPlan">{{ pricingPlan.name }} Plan</template>
                    <template v-else>Free Plan</template>
                </span>

            </h1>

            <Button v-if="isLoadingStore" id="upgradeButton" :action="navigateToPricingPlans" type="primary" size="xs">
                <span>Upgrade</span>
            </Button>

            <Button v-else type="primary" size="xs" :skeleton="isLoadingStore" :action="navigateToSubscription">
                <span>View Subscription</span>
            </Button>

        </div>

        <div v-if="isLoadingStore" class="space-y-2">
            <LineSkeleton width="w-2/3"></LineSkeleton>
            <LineSkeleton width="w-1/2"></LineSkeleton>
        </div>

        <div v-else-if="activeSubscription">

            <p class="text-xs text-gray-600 mb-2">
                You are now subscribed to the {{ pricingPlan.name }} plan
            </p>

            <Countdown :showMoreInfoPopover="false" :time="activeSubscription.endAt" textClass="text-xs">
                <template #prefix="props">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span v-if="!props.hasExpired" class="text-xs">Expires in</span>
                </template>
            </Countdown>

        </div>

        <p v-else class="text-xs text-gray-600">
            You are on the Free plan with limited features.
            Do so much more with an upgrade ✨
        </p>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { useStoreState } from '@Stores/store-store.js';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        components: {
            Button, Countdown, LineSkeleton
        },
        data() {
            return {
                storeState: useStoreState(),
                upgradeButtonAnimationTimeout: null
            };
        },
        watch: {
            isLoadingStore(newValue) {
                if(!newValue && !this.activeSubscription) {
                    this.manageUpgradeButtonAnimation();
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
            activeSubscription() {
                return this.store._relationships.activeSubscription;
            },
            pricingPlan() {
                return this.activeSubscription ? this.activeSubscription._relationships.pricingPlan : null;
            },
        },
        methods: {
            navigateToPricingPlans() {
                this.$router.push({
                    name: 'show-store-pricing-plans',
                    params: { 'store_href': this.store._links.showStore }
                })
            },
            navigateToSubscription() {
                this.$router.push({
                    name: 'show-store-subscription',
                    params: {
                        'store_href': this.store._links.showStore,
                        'subscription_href': this.activeSubscription._links.showSubscription,
                     }
                })
            },
            manageUpgradeButtonAnimation() {

                // Get the element
                const upgradeButton = document.getElementById("upgradeButton");

                if(upgradeButton) {

                    // Add the bounce class after 5 seconds
                    setTimeout(() => {
                        upgradeButton.classList.add("smooth-bounce");
                    }, 5000);

                    // Function to toggle the bounce animation
                    const toggleBounce = () => {

                        // Remove the bounce class smoothly
                        upgradeButton.classList.remove("smooth-bounce");

                        // After 5 seconds, add the bounce class smoothly
                        setTimeout(() => {
                            upgradeButton.classList.add("smooth-bounce");
                        }, 5000);

                    };

                    // Set interval to add and remove the class every 10 seconds (5s on, 5s off)
                    this.upgradeButtonAnimationTimeout = setInterval(() => {
                        toggleBounce();
                    }, 10000); // This runs the toggle function every 10 seconds

                }

            }
        },
        unmounted() {
            if (this.upgradeButtonAnimationTimeout) {
                clearInterval(this.upgradeButtonAnimationTimeout);
            }
        }
    };

</script>

<style>

    /* Smooth transition for the scale and bounce */
    @keyframes bounceSmooth {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    /* Apply smooth bounce effect */
    .smooth-bounce {
        animation: bounceSmooth 2.5s ease infinite;
    }

</style>
