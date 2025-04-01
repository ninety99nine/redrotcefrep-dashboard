<template>

    <div class="grid grid-cols-4 gap-4 pt-8">

        <div class="col-span-1 bg-white shadow-lg border rounded-lg">

            <h1 class="font-lg font-bold p-4">Store Settings</h1>

            <ul class="overflow-hidden">
                <li v-for="(navOption, index) in navOptions"
                    @click="navigateToNavOption(navOption)" :key="index"
                    :class="[activeNavOptionClasses(navOption), 'w-full px-4 py-2 text-xs hover:bg-blue-200 active:bg-blue-300 cursor-pointer']">

                    <div class="flex items-center">

                        <!-- Nav Option Label -->
                        <span>{{ navOption.label }}</span>

                    </div>
                </li>
            </ul>

        </div>

        <div class="col-span-3">

            <!-- Dashboard Content -->
            <router-view></router-view>

        </div>

    </div>

</template>

<script>

    export default {
        inject: ['storeState'],
        data() {
            return {
                navOptions: [
                    {
                        label: 'General',
                        name: 'show-store-general-settings'
                    },
                    {
                        label: 'Checkout',
                        name: 'show-store-checkout-settings'
                    },
                    {
                        label: 'Workflows',
                        name: 'show-store-workflows'
                    },
                    {
                        label: 'Social Links',
                        name: 'show-store-social-settings'
                    },
                    {
                        label: 'Delivery / Pickup',
                        name: 'show-store-delivery-methods'
                    },
                    {
                        label: 'Payment Methods',
                        name: 'show-store-payment-method-settings'
                    }
                ],
                selectedNavOption: 'show-store-general-settings'
            }
        },
        watch: {

        },
        computed: {
            store() {
                return this.storeState.store;
            }
        },
        methods: {
            navigateToNavOption(navOption) {
                this.$router.push({
                    name: navOption.name,
                    params: { store_href: this.store._links.showStore }
                });
            },
            activeNavOptionClasses(navOption) {
                if(navOption.name == this.$route.name) {
                    return 'bg-gray-200';
                }
                return '';
            }
        },
        mounted() {

        },
        created() {

        }
    };

</script>
