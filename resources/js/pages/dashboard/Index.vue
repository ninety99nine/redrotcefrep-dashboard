<template>

    <div>

        <button data-drawer-target="main-sidebar" data-drawer-toggle="main-sidebar" aria-controls="main-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>

        <aside id="main-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">

            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">

                <div class="flex justify-end">
                    <svg class="w-4 h-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <Logo class="mx-auto"></Logo>

                <div class="text-center px-4 py-4 mb-4 border-b">
                    <p>{{ auth.user?._attributes?.name ?? '...' }}</p>
                    <p class="text-sm text-gray-500">{{ auth.user?.mobileNumber?.withoutExtension ?? '...' }}</p>
                </div>

                <ul class="space-y-1 font-medium">

                    <li v-for="(link, index) in links" @click="navigateToNavMenu(link.name)" :key="index" :class="[activeLinkClasses(link.name), 'w-full px-4 py-2 text-sm hover:bg-gray-200 active:bg-gray-300 cursor-pointer rounded-lg']">
                        <span>{{ link.label }}</span>
                    </li>

                    <li><div class="border-t my-2"></div></li>

                    <li @click="attemptLogout" class="flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-gray-200 active:bg-gray-300 cursor-pointer rounded-lg">

                        <SpiningLoader v-if="isLoggingOut" class="my-1"></SpiningLoader>
                        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>

                        <span>Sign Out</span>

                    </li>

                </ul>

            </div>

        </aside>

        <div class="sm:ml-64">

            <!-- Dashboard Content -->
            <router-view></router-view>

            <!-- Footer -->
            <Footer class="mt-80"></Footer>

        </div>

    </div>

</template>

<script>

    import Logo from '@Partials/Logo.vue';
    import Footer from '@Pages/dashboard/Footer.vue';
    import { useAuthStore } from '@Stores/auth-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import { logout } from '@Repositories/auth-repository.js';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';

    export default {
        components: { Logo, Footer, TextHeader, SpiningLoader },
        data() {
            return {
                isLoggingOut: false,
                auth: useAuthStore(),
                links: [
                    {
                        label: 'Subscriptions',
                        name: 'subscriptions',
                    },
                    {
                        label: 'Transactions',
                        name: 'transactions',
                    },
                    {
                        label: 'Subscription Plans',
                        name: 'subscription-plans',
                    }
                ]
            }
        },
        methods: {
            activeLinkClasses(name) {
                return this.$route.name === name ? 'bg-gray-200' : '';
            },
            navigateToNavMenu(name) {
                this.$router.push({ name: name });
            },
            attemptLogout() {

                this.isLoggingOut = true;

                logout().then(response => {

                    if(response.status == 200) {

                        //  Stop loader
                        this.isLoggingOut = false;

                        // Redirect to login
                        this.$router.replace({ name: 'login' });

                    }

                }).catch(error => {

                    //  Stop loader
                    this.isLoggingOut = false;
                    this.showServerErrors(error);

                });
            },

        }
    };

</script>
