import { createRouter, createWebHistory } from 'vue-router';
import { useAuthState } from '@Stores/auth-store.js';
import { useApiState } from '@Stores/api-store.js';

const routes = [
    {
        path: '/',
        name: 'home',
        meta: { requiresAuth: false },
        component: () => import('@Pages/auth/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { requiresAuth: false },
        component: () => import('@Pages/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: { requiresAuth: false },
        component: () => import('@Pages/auth/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@Pages/dashboard/Index.vue'),
        children: [
            {
                name: 'profile',
                path: 'profile',
                component: () => import('@Pages/profile/Profile.vue')
            },
            {
                name: 'stores',
                path: 'stores',
                component: () => import('@Pages/subscriptions/Subscriptions.vue')
            },
            {
                name: 'store',
                path: 'stores/:store_href',
                component: () => import('@Pages/store/Store.vue'),
                children: [
                    {
                        path: '',
                        name: 'show-store-home',
                        component: () => import('@Pages/store/orders/StoreOrders.vue')
                    },
                    {
                        path: 'orders',
                        name: 'show-store-orders',
                        component: () => import('@Pages/store/orders/StoreOrders.vue')
                    },
                    {
                        path: 'orders/:order_href',
                        name: 'show-store-order',
                        component: () => import('@Pages/store/orders/StoreOrder.vue')
                    },
                    {
                        path: 'orders/create',
                        name: 'create-store-order',
                        component: () => import('@Pages/store/orders/StoreOrder.vue')
                    },
                    {
                        path: 'reviews',
                        name: 'show-store-reviews',
                        component: () => import('@Pages/store/reviews/StoreReviews.vue')
                    },
                    {
                        path: 'products',
                        name: 'show-store-products',
                        component: () => import('@Pages/store/products/StoreProducts.vue')
                    },
                    {
                        path: 'products/:product_href',
                        name: 'show-store-product',
                        component: () => import('@Pages/store/products/StoreProduct.vue')
                    },
                    {
                        path: 'products/create',
                        name: 'create-store-product',
                        component: () => import('@Pages/store/products/StoreProduct.vue')
                    },
                    {
                        path: 'coupons',
                        name: 'show-store-coupons',
                        component: () => import('@Pages/store/coupons/StoreCoupons.vue')
                    },
                    {
                        path: 'coupons/:coupon_href',
                        name: 'show-store-coupon',
                        component: () => import('@Pages/store/coupons/StoreCoupon.vue')
                    },
                    {
                        path: 'coupons/create',
                        name: 'create-store-coupon',
                        component: () => import('@Pages/store/coupons/StoreCoupon.vue')
                    },
                    {
                        path: 'transactions',
                        name: 'show-store-transactions',
                        component: () => import('@Pages/store/transactions/StoreTransactions.vue')
                    },
                    {
                        path: 'transactions/:transaction_href',
                        name: 'show-store-transaction',
                        component: () => import('@Pages/store/transactions/StoreTransaction.vue')
                    },
                    {
                        path: 'transactions/create',
                        name: 'create-store-transaction',
                        component: () => import('@Pages/store/transactions/StoreTransaction.vue')
                    },
                    {
                        path: 'team-members',
                        name: 'show-store-team-members',
                        component: () => import('@Pages/store/team-members/StoreTeamMembers.vue')
                    },
                    {
                        path: 'team-members/:team_member_href',
                        name: 'show-store-team-member',
                        component: () => import('@Pages/store/team-members/StoreTeamMember.vue')
                    },
                    {
                        path: 'team-members/invite',
                        name: 'invite-store-team-member',
                        component: () => import('@Pages/store/team-members/StoreTeamMember.vue')
                    },
                    {
                        path: 'settings',
                        name: 'show-store-settings',
                        component: () => import('@Pages/store/settings/StoreSettings.vue')
                    }
                ]
            },
            {
                name: 'transactions',
                path: 'transactions',
                component: () => import('@Pages/transactions/Transactions.vue')
            },
            {
                name: 'subscriptions',
                path: 'subscriptions',
                component: () => import('@Pages/subscriptions/Subscriptions.vue')
            },
            {
                name: 'subscription-plans',
                path: 'subscription-plans',
                component: () => import('@Pages/subscription-plans/SubscriptionPlans.vue')
            },
        ]
    },
    {
        path: '/oops',
        name: 'oops',
        meta: { requiresAuth: false },
        component: () => import('@Pages/error/Oops.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: () => import('@Pages/error/404.vue')
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
