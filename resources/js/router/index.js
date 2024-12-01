import { createRouter, createWebHistory } from 'vue-router';
import { useAuthState } from '@Stores/auth-store.js';
import { useApiState } from '@Stores/api-store.js';

const routes = [
    {
        path: '/',
        redirect: '/login',
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
                name: 'show-profile',
                path: 'profile',
                component: () => import('@Pages/profile/Profile.vue')
            },
            {
                name: 'show-stores',
                path: 'stores',
                component: () => import('@Pages/stores/Stores.vue')
            },
            {
                name: 'create-store',
                path: 'stores/create',
                component: () => import('@Pages/stores/create/CreateStore.vue')
            },
            {
                name: 'store',
                path: 'stores/:store_href',
                component: () => import('@Pages/stores/store/Store.vue'),
                children: [
                    {
                        path: '',
                        name: 'show-store-home',
                        component: () => import('@Pages/stores/store/home/StoreHome.vue')
                    },
                    {
                        path: 'orders',
                        name: 'show-store-orders',
                        component: () => import('@Pages/stores/store/orders/StoreOrders.vue')
                    },
                    {
                        path: 'orders/:order_href',
                        name: 'show-store-order',
                        component: () => import('@Pages/stores/store/orders/StoreOrder.vue')
                    },
                    {
                        path: 'orders/create',
                        name: 'create-store-order',
                        component: () => import('@Pages/stores/store/orders/StoreOrder.vue')
                    },
                    {
                        path: 'reviews',
                        name: 'show-store-reviews',
                        component: () => import('@Pages/stores/store/reviews/StoreReviews.vue')
                    },
                    {
                        path: 'products',
                        name: 'show-store-products',
                        component: () => import('@Pages/stores/store/products/StoreProducts.vue')
                    },
                    {
                        path: 'products/:product_href',
                        name: 'show-store-product',
                        component: () => import('@Pages/stores/store/products/StoreProduct.vue')
                    },
                    {
                        path: 'products/create',
                        name: 'create-store-product',
                        component: () => import('@Pages/stores/store/products/StoreProduct.vue')
                    },
                    {
                        path: 'coupons',
                        name: 'show-store-coupons',
                        component: () => import('@Pages/stores/store/coupons/StoreCoupons.vue')
                    },
                    {
                        path: 'coupons/:coupon_href',
                        name: 'show-store-coupon',
                        component: () => import('@Pages/stores/store/coupons/StoreCoupon.vue')
                    },
                    {
                        path: 'coupons/create',
                        name: 'create-store-coupon',
                        component: () => import('@Pages/stores/store/coupons/StoreCoupon.vue')
                    },
                    {
                        path: 'customers',
                        name: 'show-store-customers',
                        component: () => import('@Pages/stores/store/customers/StoreCustomers.vue')
                    },
                    {
                        path: 'customers/:customer_href',
                        name: 'show-store-customer',
                        component: () => import('@Pages/stores/store/customers/StoreCustomer.vue')
                    },
                    {
                        path: 'customers/create',
                        name: 'create-store-customer',
                        component: () => import('@Pages/stores/store/customers/StoreCustomer.vue')
                    },
                    {
                        path: 'transactions',
                        name: 'show-store-transactions',
                        component: () => import('@Pages/stores/store/transactions/StoreTransactions.vue')
                    },
                    {
                        path: 'transactions/:transaction_href',
                        name: 'show-store-transaction',
                        component: () => import('@Pages/stores/store/transactions/StoreTransaction.vue')
                    },
                    {
                        path: 'transactions/create',
                        name: 'create-store-transaction',
                        component: () => import('@Pages/stores/store/transactions/StoreTransaction.vue')
                    },
                    {
                        path: 'team-members',
                        name: 'show-store-team-members',
                        component: () => import('@Pages/stores/store/team-members/StoreTeamMembers.vue')
                    },
                    {
                        path: 'team-members/:team_member_href',
                        name: 'show-store-team-member',
                        component: () => import('@Pages/stores/store/team-members/StoreTeamMember.vue')
                    },
                    {
                        path: 'team-members/invite',
                        name: 'invite-store-team-member',
                        component: () => import('@Pages/stores/store/team-members/StoreTeamMember.vue')
                    },
                    {
                        path: 'settings',
                        name: 'show-store-settings',
                        component: () => import('@Pages/stores/store/settings/StoreSettings.vue'),
                        children: [
                            {
                                path: '',
                                name: 'show-store-general-settings',
                                component: () => import('@Pages/stores/store/settings/general/GeneralSettings.vue')
                            },
                            {
                                path: 'social',
                                name: 'show-store-social-settings',
                                component: () => import('@Pages/stores/store/settings/social/SocialSettings.vue')
                            },
                            {
                                path: 'payment-methods',
                                name: 'show-store-payment-method-settings',
                                component: () => import('@Pages/stores/store/settings/payment-methods/PaymentMethodSettings.vue')
                            },
                        ]
                    },
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
        meta: { requiresAuth: false },
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
