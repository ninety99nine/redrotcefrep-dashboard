<template>

    <div class="animated-border-blue bg-white space-y-4 py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <div class="w-full flex items-center justify-between">

            <h1 class="space-x-2 text-md text-gray-700 font-bold">
                Basic Plan
            </h1>

            <Button id="upgradeButton" :action="navigateToPricingPlans" type="primary" size="xs">
                <span>Upgrade</span>
            </Button>

        </div>

        <p class="text-xs text-gray-600">
            You are on the basic plan with limited features.
            Do so much more with an upgrade ✨
        </p>

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
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
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
        mounted() {
            this.manageUpgradeButtonAnimation();
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
