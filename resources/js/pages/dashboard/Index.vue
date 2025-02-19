<template>

    <div class="bg-gradient-to-b from-blue-100 to-white-100 min-h-screen">

        <!-- Right Side Alerts -->
        <RightSideAlerts></RightSideAlerts>

        <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">

            <div class="px-3 py-3 lg:px-5 lg:pl-3">

                <div class="flex items-center justify-between">

                    <div class="flex items-center justify-start rtl:justify-end">

                        <!-- Menu Toggle Button -->
                        <button type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <span class="sr-only">Open sidebar</span>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>

                        <div class="flex items-center space-x-4">

                            <template v-if="storeMode">

                                <!-- Logo -->
                                <ShineEffect v-if="isLoadingStore">
                                    <RoundSkeleton size="w-10 h-10"></RoundSkeleton>
                                </ShineEffect>
                                <StoreLogo v-else size="w-10 h-10" :showButton="false"></StoreLogo>

                                <!-- Store Name -->
                                <ShineEffect v-if="isLoadingStore">
                                    <LineSkeleton width="w-32"></LineSkeleton>
                                </ShineEffect>

                                <a v-else :href="this.store._attributes.webLink" target="_blank" class="cursor-pointer active:scale-95 transition-all duration-250">
                                    <h2 class="text-xl font-semibold">{{ store.name }}</h2>
                                </a>

                                <!-- Visit Store Icon -->
                                <ShineEffect v-if="isLoadingStore">
                                    <LineSkeleton width="w-8"></LineSkeleton>
                                </ShineEffect>
                                <a v-else :href="this.store._attributes.webLink" target="_blank" class="cursor-pointer rounded-md border p-1 border-transparent hover:border-gray-300 hover:bg-gray-50">
                                    <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>

                            </template>

                            <template v-else>

                                <!-- Logo -->
                                <Logo
                                    height="h-10"
                                    @click.stop="navigateToManageStores"
                                    class="cursor-pointer hover:shadow-sm active:scale-95 transition-all duration-250">
                                </Logo>

                            </template>

                        </div>

                    </div>

                    <div @click.stop="navigateToManageStores" class="cursor-pointer animated-border-blue rounded-full overflow-hidden hover:shadow-sm active:scale-95 transition-all duration-250">
                        <h2 class="py-2 px-8 text-xs text-blue-500 bg-blue-50 font-semibold">Helping {{ authUser.firstName }} sell better</h2>
                    </div>

                    <div class="flex items-center space-x-8">

                        <div v-if="storeMode" class="flex items-center space-x-4">

                            <!-- Manage Stores -->
                            <ShineEffect v-if="isLoadingStore">
                                <ButtonSkeleton size="sm">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    <span>Manage Stores</span>
                                </ButtonSkeleton>
                            </ShineEffect>

                            <Button v-else :action="navigateToManageStores" type="light" size="sm">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <span>Manage Stores</span>
                            </Button>

                            <!-- Upgrade -->
                            <ShineEffect v-if="isLoadingStore">
                                <ButtonSkeleton size="sm">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                    </svg>
                                    <span>Upgrade</span>
                                </ButtonSkeleton>
                            </ShineEffect>

                            <Button v-else :action="navigateToPricingPlans" type="primary" size="sm">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                </svg>
                                <span>Upgrade</span>
                            </Button>

                        </div>

                        <div class="flex items-center ms-3">

                            <!-- Profile Avatar -->
                            <div>
                                <div id="profile-dropdown-trigger" class="cursor-pointer flex text-sm bg-gray-100 rounded-full focus:ring-4 focus:ring-gray-250">
                                    <span class="sr-only">Open user menu</span>
                                    <div class="w-8 h-8 border border-gray-300 text-gray-500 rounded-full p-2 hover:scale-110 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Profile Menu -->
                            <div id="profile-dropdown" class="min-w-60 border z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm">

                                <div class="px-4 py-3" role="none">

                                    <!-- Name -->
                                    <p class="text-sm text-gray-900" role="none">
                                        Neil Sims
                                    </p>

                                    <!-- Email -->
                                    <p class="text-sm font-medium text-gray-900 truncate" role="none">
                                        neil.sims@flowbite.com
                                    </p>

                                </div>

                                <!-- Profile Menu Items -->
                                <ul class="py-1" role="none">
                                    <li>
                                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                                    </li>
                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </nav>

        <aside v-if="storeMode" class="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0">

            <div class="h-full py-6 overflow-y-auto bg-white">

                <div class="font-medium">

                    <template
                        :key="index"
                        v-for="(navMenu, index) in navMenus">

                        <div :class="[{ 'bg-gray-100' : isActiveNavMenu(navMenu.routeName) }, 'cursor-pointer flex items-center py-3 px-4 text-gray-900 hover:bg-gray-100 group']">

                            <RoundSkeleton v-if="isLoadingStore" size="w-5 h-5"></RoundSkeleton>

                            <!-- Home Icon -->
                            <svg v-else-if="navMenu.name == 'Home'" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75V21h5.25v-4.5a2.25 2.25 0 014.5 0V21H21V9.75M1.5 12L12 2.25 22.5 12" />
                            </svg>

                            <!-- Orders Icon -->
                            <svg v-else-if="navMenu.name == 'Orders'" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                            </svg>

                            <!-- Products Icon -->
                            <svg v-else-if="navMenu.name == 'Products'" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>

                            <!-- Customers Icon -->
                            <svg v-else-if="navMenu.name == 'Customers'" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>

                            <!-- Coupons Icon -->
                            <svg v-else-if="navMenu.name == 'Coupons'" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>

                            <!-- Reviews Icon -->
                            <svg v-else-if="navMenu.name == 'Reviews'" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>

                            <!-- Pages Icon -->
                            <svg v-else-if="navMenu.name == 'Pages'" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>

                            <!-- Settings Icon -->
                            <svg v-else-if="navMenu.name == 'Settings'" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            <ShineEffect v-if="isLoadingStore" class="ms-3">
                                <LineSkeleton width="w-24"></LineSkeleton>
                            </ShineEffect>
                            <span v-else :class="[{ 'text-gray-900' : isActiveNavMenu(navMenu.routeName) }, 'text-sm ms-3 text-gray-500 group-hover:text-gray-900']">{{ navMenu.name }}</span>

                        </div>

                        <div v-if="['Reviews', 'Settings'].includes(navMenu.name)" class="border-t border-dashed pt-2 mt-2"></div>

                    </template>

                    <div class="cursor-pointer">

                        <div class="flex items-center py-3 px-4 text-gray-900 hover:bg-gray-100 group">

                            <!-- Sign Out Icon -->
                            <RoundSkeleton v-if="isLoadingStore" size="w-5 h-5"></RoundSkeleton>

                            <svg v-else class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>

                            <ShineEffect v-if="isLoadingStore" class="ms-3">
                                <LineSkeleton width="w-24"></LineSkeleton>
                            </ShineEffect>
                            <span v-else class="text-sm ms-3 text-gray-500 group-hover:text-gray-900">Sign Out</span>

                        </div>

                    </div>

                </div>

            </div>

        </aside>

        <div :class="{ 'sm:ml-64' : storeMode }">

            <!-- Page Loader -->
            <PageLoader></PageLoader>

            <!-- Dashboard Content -->
            <router-view></router-view>

            <!-- Footer -->
            <Footer class="mt-80"></Footer>

        </div>

    </div>

</template>

<script>

    import settings from '@Js/settings.js';
    import Logo from '@Partials/logos/Logo.vue';
    import Footer from '@Pages/dashboard/Footer.vue';
    import Button from '@Partials/buttons/Button.vue';
    import { useAuthState } from '@Stores/auth-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import { getApi } from '@Repositories/api-repository.js';
    import PageLoader from '@Partials/loaders/PageLoader.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import RightSideAlerts from '@Partials/alerts/RightSideAlerts.vue';
    import ButtonSkeleton from '@Partials/skeletons/ButtonSkeleton.vue';

    export default {
        components: {
            Logo, Footer, Button, PageLoader, ShineEffect, LineSkeleton,
            StoreLogo, RoundSkeleton, RightSideAlerts, ButtonSkeleton
        },
        data() {
            return {
                navMenus: [
                    {
                        name: 'Home',
                        routeName: 'show-store-home',
                    },
                    {
                        name: 'Orders',
                        routeName: 'show-store-orders',
                    },
                    {
                        name: 'Products',
                        routeName: 'show-store-products',
                    },
                    {
                        name: 'Customers',
                        routeName: 'show-store-customers',
                    },
                    {
                        name: 'Coupons',
                        routeName: 'show-store-coupons',
                    },
                    {
                        name: 'Reviews',
                        routeName: 'show-store-reviews',
                    },
                    {
                        name: 'Pages',
                        routeName: 'show-store-pages',
                    },
                    {
                        name: 'Settings',
                        routeName: 'show-store-settings',
                    }
                ],
                storeHref: false,
                isOnboarding: false,
                authState: useAuthState(),
                appName: settings.appName,
                storeState: useStoreState(),
            }
        },
        watch: {
            '$route'(newValue, oldValue) {

                this.storeHref = this.$route.params.store_href;
                this.isOnboarding = this.$route.meta.onboarding === true;

                if(this.storeHref) this.showStore();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            authUser() {
                return this.authState.user;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            storeMode() {
                return !this.isOnboarding && this.storeHref;
            }
        },
        methods: {
            isActiveNavMenu(name) {
                return this.$route.name === name;
            },
            navigateToManageStores() {
                this.$router.push({
                    name: 'show-stores'
                });
            },
            navigateToPricingPlans() {
                this.$router.push({
                    name: 'show-store-pricing-plans',
                    params: { 'store_href': this.store._links.showStore }
                })
            },
            showStore() {

                this.storeState.setIsLoadingStore(true);

                let relationships = ['logo', 'activeSubscription', 'userStoreAssociation'];

                let params = {
                    '_relationships': relationships.join(',')
                };

                getApi(this.storeHref, params).then(response => {

                    if(response.status == 200) {

                        if(response.data.exists) {

                            //  Set the store on the pinia store state
                            this.storeState.setStore(response.data.store);

                        }

                    }

                    //  Stop loader
                    this.storeState.setIsLoadingStore(false);

                }).catch(errorException => {

                    //  Stop loader
                    this.storeState.setIsLoadingStore(false);

                    this.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {

            // Initialize Flowbite
            initFlowbite();

            const $targetEl = document.getElementById('profile-dropdown');
            const $triggerEl = document.getElementById('profile-dropdown-trigger');

            const $options = {
                triggerType: 'click',
                placement: 'bottom',
                onToggle: () => { console.log('onToggle') },
                onShow: () => { console.log('onShow') },
                onHide: () => { console.log('onHide') },
            };

            if ($targetEl) {
                this.dropdown = new Dropdown($targetEl, $triggerEl, $options);
            }
        },
        created() {
            this.storeHref = this.$route.params.store_href;
            this.isOnboarding = this.$route.meta.onboarding === true;
            if(this.storeHref) this.showStore();
        }
    };

</script>
