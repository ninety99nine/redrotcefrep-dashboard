<template>

    <div v-if="!isLoadingStore && !activeSubscription" class="animated-border-blue shadow-sm rounded-xl overflow-hidden mb-8">
        <div class="bg-white space-y-2 py-4 px-4">

            <div class="w-full flex items-center justify-between">

                <div class="flex items-center space-x-2 text-md text-gray-700 font-bold">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <span>Free Plan</span>
                </div>

                <Button id="upgradeButton" :action="navigateToPricingPlans" type="primary" size="sm" icon="rocket">
                    <span>Upgrade</span>
                </Button>

            </div>

            <p class="text-xs text-gray-600">
                You are on the Free plan with limited features.
                Do so much more with an upgrade ✨
            </p>

        </div>
    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { useStoreState } from '@Stores/store-store.js';

    export default {
        components: {
            Button
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
            }
        },
        methods: {
            navigateToPricingPlans() {
                this.$router.push({
                    name: 'show-store-pricing-plans',
                    params: { 'store_href': this.store._links.showStore }
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
