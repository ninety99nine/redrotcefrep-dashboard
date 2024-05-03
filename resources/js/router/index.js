import SubscriptionPlans from '@Pages/subscription-plans/SubscriptionPlans.vue';
import StoreSettings from '@Pages/store/settings/StoreSettings.vue';
import Subscriptions from '@Pages/subscriptions/Subscriptions.vue';
import Transactions from '@Pages/transactions/Transactions.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthState } from '@Stores/auth-store.js';
import { useApiState } from '@Stores/api-store.js';
import Dashboard from '@Pages/dashboard/Index.vue';
import Store from '@Pages/store/Store.vue';
import Profile from '@Pages/profile/Profile.vue';
import Register from '@Pages/auth/Register.vue';
import NotFound from '@Pages/error/404.vue';
import Login from '@Pages/auth/Login.vue';
import Oops from '@Pages/error/Oops.vue';
import Home from '@Pages/auth/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { requiresAuth: false }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        children: [
            {
                name: 'profile',
                path: 'profile',
                component: Profile
            },
            {
                name: 'stores',
                path: 'stores',
                component: Subscriptions
            },
            {
                name: 'store',
                path: 'stores/:href',
                component: Store,
                children: [
                    {
                        path: '',
                        name: 'store-home',
                        component: Transactions
                    },
                    {
                        path: 'orders',
                        name: 'store-orders',
                        component: Transactions
                    },
                    {
                        path: 'reviews',
                        name: 'store-reviews',
                        component: Transactions
                    },
                    {
                        path: 'products',
                        name: 'store-products',
                        component: Transactions
                    },
                    {
                        path: 'coupons',
                        name: 'store-coupons',
                        component: Transactions
                    },
                    {
                        path: 'transactions',
                        name: 'store-transactions',
                        component: Transactions
                    },
                    {
                        path: 'team-members',
                        name: 'store-team-members',
                        component: Transactions
                    },
                    {
                        path: 'settings',
                        name: 'store-settings',
                        component: StoreSettings
                    }
                ]
            },


            {
                name: 'subscriptions',
                path: 'subscriptions',
                component: Subscriptions
            },
            {
                name: 'transactions',
                path: 'transactions',
                component: Transactions
            },
            {
                name: 'subscription-plans',
                path: 'subscription-plans',
                component: SubscriptionPlans
            },
        ]
    },
    {
        path: '/oops',
        name: 'oops',
        component: Oops,
        meta: { requiresAuth: false }
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

/**
 *  Reference: https://v3.router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 */
router.beforeEach(async (to, from, next) => {

    //  If we are navigating to the oops page
    if(to.name == 'oops') {

        //  Proceed navigation to the oops page
        next();

    }else{

        //  Capture the useApiState instance
        const _useApiStore = useApiState();

        if(_useApiStore.hasApiHome == false) {

            //  Wait for this to complete
            await _useApiStore.setApiHome();

            //  If we have encountered an error
            if(_useApiStore.hasLastErrorMessage) {

                //  Navigate to the oops page
                next({ name: 'oops', replace: true });

                //  Prevent executing any other next() function below
                return;

            }

        }

        //  Capture the useAuthState instance
        const auth = useAuthState();

        // Check if the route has meta data and requiresAuth is explicitly set to false
        if (to.meta && to.meta.requiresAuth === false) {

            /**
             *  For non-protected routes, check if the user is authenticated.
             *  If authenticated, redirect to the dashboard.
             */
            if (auth.authenticated) {

                //  Navigate to the dashboard page
                next({ name: 'dashboard', replace: true });

            } else {

                // If not authenticated, allow navigation
                next();

            }

        } else {

            /**
             *  For all other routes, assume they are protected and require authentication.
             *  We must always check if the user is authenticated before navigation.
             */
            if (auth.authenticated) {

                // If authenticated, allow navigation
                next();

            } else {

                // If not authenticated, redirect to login page
                next({ name: 'login', query: { redirect: to.fullPath }, replace: true });

            }

        }

    }

});

export default router;
