<template>

    <div>

        <!-- Right Side Alerts -->
        <RightSideAlerts></RightSideAlerts>

        <button data-drawer-target="main-sidebar" data-drawer-toggle="main-sidebar" aria-controls="main-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>

        <aside id="main-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r" aria-label="Sidebar">

            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">

                <div class="flex justify-end">
                    <svg class="w-4 h-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <!-- Profile Photo -->
                <ProfilePhoto v-if="authState.user?.profilePhoto" :user="authState.user" class="mx-auto"></ProfilePhoto>

                <!-- Logo -->
                <Logo v-else class="mx-auto"></Logo>

                <div @click="navigateToNavMenu('profile')" class="text-center px-4 py-4 cursor-pointer">
                    <p>{{ authState.user?._attributes?.name ?? '...' }}</p>
                    <p class="text-sm text-gray-500">{{ authState.user?.mobileNumber?.national ?? '...' }}</p>
                </div>

                <div class="mb-4 border-b"></div>

                <!-- General Error Info Alert -->
                <Alert v-if="getFormError('general')" class="mt-4 mb-0 mx-auto max-w-96" type="warning">
                    {{ getFormError('general') }}
                </Alert>

                <ul class="space-y-1 font-medium">

                    <!-- Spining Loader -->
                    <li v-if="isLoadingStoresAsTeamMember">
                        <div class="flex justify-center my-4">
                            <SpiningLoader></SpiningLoader>
                        </div>
                    </li>

                    <!-- Store Nav Links -->
                    <li v-for="(storeLink, index) in storeLinks"
                        @click.self="toggleStoreNavMenu(storeLink, index)" :key="index"
                        :class="storeNavMenuClasses(storeLink)">

                        <div @click="toggleStoreNavMenu(storeLink, index)" class="flex items-center space-x-2">

                            <!-- Right Pointing Arrow -->
                            <svg v-if="storeLink.isOpen" class="w-3 h-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>

                            <!-- Down Pointing Arrow -->
                            <svg v-else class="w-3 h-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                            <div class="flex justify-between items-center w-full">

                                <!-- Link Label -->
                                <div class="w-full">{{ storeLink.label }}</div>

                                <!-- Active Status -->
                                <StatusDot type="success" :animate=true></StatusDot>

                            </div>

                        </div>

                        <!-- Store Nav Sub Links -->
                        <SlideUpDown :active="storeLink.isOpen" :duration="1000">

                            <div class="w-full border-b border-gray-400 border-dashed mt-3 mb-2"></div>

                            <ul class="space-y-1 font-normal">
                                <li v-for="(storeSubLink, index2) in storeLink.children"
                                    @click="navigateToStoreSubNavMenu(storeLink, storeSubLink)" :key="index2"
                                    :class="[activeStoreSubNavMenuClasses(storeLink, storeSubLink), 'w-full px-4 py-2 text-xs hover:bg-blue-200 active:bg-blue-300 cursor-pointer rounded-lg']">

                                    <div class="flex items-center">

                                        <!-- Store Settings Icon -->
                                        <svg v-if="storeSubLink.label == 'Store Settings'" class="w-3 h-3 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                        <!-- Sub-Link Label -->
                                        <span>{{ storeSubLink.label }}</span>

                                    </div>
                                </li>
                            </ul>

                        </SlideUpDown>

                    </li>

                    <!-- Add Store -->
                    <li>

                        <AddButton :action="navigateToAddStore" class="my-4" size="sm">
                            <span class="text-xs ml-1">Add Store</span>
                        </AddButton>
                    </li>
                </ul>

                <ul class="space-y-1 font-medium">
                    <li v-for="(link, index) in links"
                        @click="navigateToNavMenu(link.name)" :key="index"
                        :class="[activeNavMenuClasses(link.name), 'w-full px-4 py-2 text-sm hover:bg-gray-200 active:bg-gray-300 cursor-pointer rounded-lg']">

                        <span>{{ link.label }}</span>

                    </li>

                    <li><div class="border-t my-2"></div></li>

                    <li @click="attemptLogout" class="flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-gray-200 active:bg-gray-300 cursor-pointer rounded-lg">

                        <!-- Spining Loader -->
                        <SpiningLoader v-if="isLoggingOut" class="my-1"></SpiningLoader>

                        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>

                        <span>Sign Out</span>

                    </li>

                </ul>

            </div>

        </aside>

        <div class="sm:ml-64 bg-gray-50">

            <!-- Dashboard Content -->
            <router-view></router-view>

            <!-- Footer -->
            <Footer class="mt-80"></Footer>

        </div>

    </div>

</template>

<script>

    import SlideUpDown from 'vue-slide-up-down';
    import Logo from '@Partials/logos/Logo.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import Footer from '@Pages/dashboard/Footer.vue';
    import RightSideAlerts from './RightSideAlerts.vue';
    import { useAuthState } from '@Stores/auth-store.js';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import { getApi } from '@Repositories/api-repository.js';
    import { logout } from '@Repositories/auth-repository.js';
    import StatusDot from '@Partials/status-dots/StatusDot.vue';
    import ProfilePhoto from '@Components/user/ProfilePhoto.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import { useNotificationState } from '@Stores/notification-store.js';

    export default {
        mixins: [FormMixin],
        components: { SlideUpDown, Alert, RightSideAlerts, AddButton, Logo, Footer, StatusDot, SpiningLoader, ProfilePhoto },
        data() {
            return {
                isLoggingOut: false,
                authState: useAuthState(),
                isLoadingStoresAsTeamMember: false,
                notificationState: useNotificationState(),
                storeLinks: [],
                links: [
                    {
                        label: 'My Profile',
                        name: 'show-profile',
                    },
                    {
                        label: 'Stores',
                        name: 'show-stores',
                    },
                    /*
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
                    */
                ]
            }
        },
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.navigateToSuitablePage(vm, to);
            });
        },
        beforeRouteUpdate(to, from) {
            /**
             *  1) After creating a store, we navigate to the dashboard
             *     route with the createdStore query set to "true"
             *
             *  2) After deleting a store, we navigate to the dashboard
             *     route with the deletedStore query set to "true"
             */
            if(to.query.hasOwnProperty('createdStore') || to.query.hasOwnProperty('deletedStore')) {
                this.navigateToSuitablePage(this, to);
            }
        },
        methods: {
            navigateToAddStore() {
                this.$router.push({ name: 'create-store' });
            },
            navigateToNavMenu(name) {
                this.$router.push({ name: name }).then(() => {

                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);

                });
            },
            activeNavMenuClasses(name) {
                return this.$route.name === name ? 'bg-gray-200' : '';
            },
            isActiveStoreNavMenu(storeLink) {

                let href = storeLink.href;

                if(this.$route.params.store_href == href) {

                    for (let i = 0; i < storeLink.children.length; i++) {

                        var name = storeLink.children[i].name;
                        var relatedLinks = storeLink.children[i].relatedLinks;

                        if(this.$route.name == name) {

                            return true;

                        }else if(relatedLinks != undefined) {

                            for (let x = 0; x < relatedLinks.length; x++) {

                                name = relatedLinks[x];

                                if(this.$route.name == name) {

                                    return true;

                                }

                            }

                        }

                    }

                }

                return false;
            },
            storeNavMenuClasses(storeLink) {
                var classes = ['w-full px-4 py-2 text-sm cursor-pointer rounded-lg'];

                if(this.isActiveStoreNavMenu(storeLink)) {
                    classes.push('bg-white shadow border');
                }else{
                    classes.push('hover:bg-gray-100 active:bg-gray-200');
                }
                return classes;
            },
            navigateToStoreSubNavMenu(storeLink, subStoreLink) {
                this.$router.push({
                    name: subStoreLink.name,
                    params: { store_href: storeLink.href }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            activeStoreSubNavMenuClasses(storeLink, storeSubLink) {

                if(this.$route.params.store_href == storeLink.href) {

                    const activeClass = 'bg-gray-200';

                    if(this.$route.name == storeSubLink.name) {

                        return activeClass;

                    }else{

                        if(storeSubLink.relatedLinks != undefined) {

                            var relatedLinks = storeSubLink.relatedLinks;

                            for (let x = 0; x < relatedLinks.length; x++) {

                                var name = relatedLinks[x];

                                if(this.$route.name == name) {

                                    return activeClass;

                                }

                            }

                        }
                    }
                }

                return '';
            },
            toggleStoreNavMenu(storeLink, index) {

                for (let i = 0; i < this.storeLinks.length; i++) {

                    if(index == i) {
                        this.storeLinks[index].isOpen = !storeLink.isOpen;
                    }else{
                        this.storeLinks[i].isOpen = false;
                    }
                }

            },
            navigateToSuitablePage(instance, to) {
                this.getStoresAsTeamMember().then(async response => {

                    //  If we have any store links that have been set
                    if(to.name == 'dashboard' && instance.storeLinks.length) {

                        /**
                         *  Redirect to the first store link settings.
                         *
                         *  The await method allows us to wait for the route to complete navigating before we
                         *  proceed to the code below that will toggle open the store navigation menu. Without
                         *  the await, we would run the isActiveStoreNavMenu() method too soon and the store
                         *  navigation menu will not open since the route is not yet entirely resolved. The
                         *  method relies on the value of "this.$route.name", therefore we must wait for
                         *  the navigation to complete so that we capture the correct route name.
                         */
                        await instance.$router.push({ name: 'show-store-home', params: { store_href: instance.storeLinks[0].href } });

                    }

                    //  Automatically open the active store link
                    for (let i = 0; i < instance.storeLinks.length; i++) {

                        //  Get the store link
                        const storeLink = instance.storeLinks[i];

                        //  Check if this store link is currently selected
                        if(instance.isActiveStoreNavMenu(storeLink)) {

                            //  Toggle open the store navigation menu drawer
                            instance.toggleStoreNavMenu(storeLink, i);

                        }

                    }

                });
            },
            getStoresAsTeamMember() {

                this.isLoadingStoresAsTeamMember = true;

                let params = {
                    '_noFields': true,
                    '_noRelationships': true,
                    'filter': 'team member joined',
                    '_includeAttributes': 'nameWithEmoji',
                    '_includeLinks': 'showStore,showStoreOrders,showStoreProducts',
                };

                return getApi(this.authState.user._links.showStores, params).then(response => {

                    if(response.status == 200) {

                        //  Stop loader
                        this.isLoadingStoresAsTeamMember = false;

                        //  Set the store links
                        this.storeLinks = response.data.data.map( store => {

                            return {
                                name: 'show-store-home',
                                href: store._links.showStore,
                                label: store._attributes.nameWithEmoji,
                                children: [
                                    {
                                        label: 'Home',
                                        name: 'show-store-home',
                                    },
                                    {
                                        label: 'Orders',
                                        name: 'show-store-orders',
                                        relatedLinks: ['show-store-order', 'create-store-order']
                                    },
                                    {
                                        label: 'Reviews',
                                        name: 'show-store-reviews'
                                    },
                                    {
                                        label: 'Products',
                                        name: 'show-store-products',
                                        relatedLinks: ['show-store-product', 'create-store-product']
                                    },
                                    {
                                        label: 'Coupons',
                                        name: 'show-store-coupons',
                                        relatedLinks: ['show-store-coupon', 'create-store-coupon']
                                    },
                                    {
                                        label: 'Customers',
                                        name: 'show-store-customers',
                                        relatedLinks: ['show-store-customer', 'create-store-customer']
                                    },
                                    {
                                        label: 'Transactions',
                                        name: 'show-store-transactions',
                                        relatedLinks: ['show-store-transaction', 'create-store-transaction']
                                    },
                                    {
                                        label: 'Team Members',
                                        name: 'show-store-team-members',
                                        relatedLinks: ['show-store-team-member', 'invite-store-team-member']
                                    },
                                    {
                                        label: 'Store Settings',
                                        name: 'show-store-general-settings',
                                    }
                                ]
                            };

                        });

                    }

                    return response;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingStoresAsTeamMember = false;

                    this.showErrors(errorException, 'getStoresAsTeamMember');

                    return errorException;

                });
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

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoggingOut = false;

                    this.showErrors(errorException, 'attemptLogout');

                });
            },
            showErrors(errorException, method) {

                /**
                 *  Note: the setServerFormErrors() method is part of the FormMixin methods
                 */
                this.setServerFormErrors(errorException);

                if(method == 'getStoresAsTeamMember') {

                    this.notificationState.addWarningNotification('We couldn\'t show stores');

                }else if(method == 'attemptLogout') {

                    this.notificationState.addWarningNotification('We couldn\'t logout');

                }

            }
        }
    };

</script>
