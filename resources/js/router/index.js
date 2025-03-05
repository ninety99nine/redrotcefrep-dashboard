import { createRouter, createWebHistory } from 'vue-router';
import { useLoaderState } from '@Stores/loader-store.js';
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
        path: '/social-login',
        name: 'social-login',
        meta: { requiresAuth: false },
        component: () => import('@Pages/auth/SocialLogin.vue')
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
                name: 'show-components',
                path: 'components',
                component: () => import('@Pages/components/Components.vue')
            },
            {
                name: 'show-profile',
                path: 'profile',
                component: () => import('@Pages/profile/Profile.vue')
            },
            {
                name: 'show-transaction-status',
                path: 'transaction-status',
                component: () => import('@Pages/transactions/TransactionStatus.vue')
            },
            {
                name: 'show-stores',
                path: 'stores',
                component: () => import('@Pages/stores/Stores.vue')
            },
            {
                path: '/store-onboarding',
                meta: { onboarding: true },
                component: () => import('@Pages/stores/onboarding/StoreOnboarding.vue'),
                children: [
                    {
                        path: 'create/store',
                        name: 'create-store',
                        component: () => import('@Pages/stores/onboarding/CreateStore.vue'),
                    },
                    {
                        path: '/:store_href',
                        children: [
                            {
                                path: 'add/products',
                                name: 'add-products',
                                component: () => import('@Pages/stores/onboarding/AddProducts.vue'),
                            },
                            {
                                path: 'add/payments',
                                name: 'add-payments',
                                component: () => import('@Pages/stores/onboarding/AddPayments.vue'),
                            },
                            {
                                path: 'add/socials',
                                name: 'add-socials',
                                component: () => import('@Pages/stores/onboarding/AddSocials.vue'),
                            },
                            {
                                path: 'add/pages',
                                name: 'add-pages',
                                component: () => import('@Pages/stores/onboarding/AddPages.vue'),
                            },
                            {
                                path: 'advanced/features',
                                name: 'advanced-features',
                                component: () => import('@Pages/stores/onboarding/AddAdvancedFeatures.vue')
                            },
                            {
                                path: 'share',
                                name: 'share',
                                component: () => import('@Pages/stores/onboarding/Share.vue')
                            }
                        ]
                    }
                ]
            },
            {
                name: 'store',
                path: 'stores/:store_href',
                children: [
                    {
                        path: '',
                        name: 'show-store-home',
                        component: () => import('@Pages/stores/store/home/StoreHome.vue')
                    },
                    {
                        path: 'components',
                        name: 'show-store-components',
                        component: () => import('@Pages/stores/store/pricing-plans/PricingPlans.vue')
                    },
                    {
                        path: 'pricing-plans',
                        name: 'show-store-pricing-plans',
                        component: () => import('@Pages/stores/store/pricing-plans/PricingPlans.vue')
                    },
                    {
                        path: 'orders',
                        name: 'show-store-orders',
                        component: () => import('@Pages/stores/store/orders/StoreOrders.vue')
                    },
                    {
                        path: 'orders/:order_href',
                        name: 'show-store-order',
                        component: () => import('@Pages/stores/store/orders/order/StoreOrder.vue')
                    },
                    {
                        path: 'orders/create',
                        name: 'create-store-order',
                        component: () => import('@Pages/stores/store/orders/order/StoreOrder.vue')
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
                        path: 'pages',
                        name: 'show-store-pages',
                        component: () => import('@Pages/stores/store/pages/StorePages.vue')
                    },
                    {
                        path: 'pages/:page_href',
                        name: 'show-store-page',
                        component: () => import('@Pages/stores/store/pages/StorePage.vue')
                    },
                    {
                        path: 'pages/:page_href/preview',
                        name: 'show-store-page-preview',
                        component: () => import('@Pages/stores/store/pages/StorePagePreview.vue')
                    },
                    {
                        path: 'pages/create',
                        name: 'create-store-page',
                        component: () => import('@Pages/stores/store/pages/StorePage.vue')
                    },
                    {
                        path: 'offline',
                        name: 'show-offline-store',
                        component: () => import('@Pages/stores/store/offline/OfflineStore.vue')
                    },
                    {
                        path: 'promotions',
                        name: 'show-store-promotions',
                        component: () => import('@Pages/stores/store/promotions/StorePromotions.vue')
                    },
                    {
                        path: 'promotions/:promotion_href',
                        name: 'show-store-promotion',
                        component: () => import('@Pages/stores/store/promotions/StorePromotion.vue')
                    },
                    {
                        path: 'promotions/create',
                        name: 'create-store-promotion',
                        component: () => import('@Pages/stores/store/promotions/StorePromotion.vue')
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
                        path: 'subscriptions',
                        name: 'show-store-subscriptions',
                        component: () => import('@Pages/stores/store/subscriptions/StoreSubscriptions.vue')
                    },
                    {
                        path: 'subscriptions/:subscription_href',
                        name: 'show-store-subscription',
                        component: () => import('@Pages/stores/store/subscriptions/StoreSubscription.vue')
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
                                path: 'workflows',
                                name: 'show-store-workflows',
                                component: () => import('@Pages/stores/store/settings/workflows/Workflows.vue')
                            },
                            {
                                path: 'workflows/:workflow_href',
                                name: 'show-store-workflow',
                                component: () => import('@Pages/stores/store/settings/workflows/Workflow.vue')
                            },
                            {
                                path: 'workflows/create',
                                name: 'create-store-workflow',
                                component: () => import('@Pages/stores/store/settings/workflows/Workflow.vue')
                            },
                            {
                                path: 'delivery-methods',
                                name: 'show-store-delivery-methods',
                                component: () => import('@Pages/stores/store/settings/delivery-methods/DeliveryMethods.vue')
                            },
                            {
                                path: 'delivery-methods/:delivery_method_href',
                                name: 'show-store-delivery-method',
                                component: () => import('@Pages/stores/store/settings/delivery-methods/DeliveryMethod.vue')
                            },
                            {
                                path: 'delivery-methods/create',
                                name: 'create-store-delivery-method',
                                component: () => import('@Pages/stores/store/settings/delivery-methods/DeliveryMethod.vue')
                            },
                            {
                                path: 'payment-methods',
                                name: 'show-store-payment-method-settings',
                                component: () => import('@Pages/stores/store/settings/payment-methods/PaymentMethodSettings.vue')
                            },
                            {
                                path: 'checkout',
                                name: 'show-store-checkout-settings',
                                component: () => import('@Pages/stores/store/settings/checkout/CheckoutSettings.vue')
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
        path: '/:alias',
        meta: { requiresAuth: false },
        component: () => import('@Pages/shopping/Index.vue'),
        children: [
            {
                name: 'storefront',
                path: '/:alias',
                component: () => import('@Pages/shopping/storefront/Storefront.vue')
            },
            {
                name: 'checkout',
                path: 'checkout',
                component: () => import('@Pages/shopping/checkout/Checkout.vue')
            },
        ]
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
    routes,
    scrollBehavior(to, from, savedPosition) {
        // If there's a saved position (e.g., from browser back/forward), use it
        if (savedPosition) {
            return savedPosition;
        }
        // Otherwise, scroll to the top
        return { top: 0 };
    }
});

/**
 *  Reference: https://v3.router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 */
router.beforeEach(async (to, from, next) => {

    // Show the loader before navigation
    const loader = useLoaderState();
    loader.show();

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
        if(to.meta && to.meta.requiresAuth === false) {

            if(auth.authenticated) {

                const restrictedRouteNames = ['login', 'register'];

                if(restrictedRouteNames.includes(to.name)) {

                    //  Navigate to the show stores page
                    next({ name: 'show-stores', replace: true });

                }else{

                    // Authenticated - Allow navigation
                    next();

                }

            } else {

                // Not Authenticated - Allow navigation
                next();

            }

        } else {

            if(auth.authenticated) {

                // Authenticated - Allow navigation
                next();

            } else {

                // Not Authenticated - Redirect to login page
                next({ name: 'login', query: { redirect: to.fullPath }, replace: true });

            }

        }

    }

});

router.afterEach(() => {
    // Hide the loader after navigation is complete
    const loader = useLoaderState();
    loader.hide();
});

export default router;
