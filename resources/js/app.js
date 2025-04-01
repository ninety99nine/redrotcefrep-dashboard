/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import 'preline';
import 'flowbite';
import './bootstrap';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useApiState } from "@Stores/api-store.js";
import { useAuthState } from "@Stores/auth-store.js";
import { useFormState } from "@Stores/form-store.js";
import { usePageState } from "@Stores/page-store.js";
import { useOrderState } from "@Stores/order-store.js";
import { useStoreState } from "@Stores/store-store.js";
import { useLoaderState } from "@Stores/loader-store.js";
import { VueClipboard } from '@soerenmartius/vue3-clipboard';
import { useWorkflowState } from "@Stores/workflow-store.js";
import { useOnboardingState } from "@Stores/onboarding-store.js";
import { useNotificationState } from "@Stores/notification-store.js";
import { useShoppingCartState } from "@Stores/shopping-cart-store.js";
import { useChangeHistoryState } from "@Stores/change-history-store.js";
import { useDeliveryMethodState } from "@Stores/delivery-method-store.js";

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

const app = createApp({});
const pinia = createPinia();

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */
app.use(pinia);
app.use(router);
app.use(VueClipboard);
app.mount('#app');

// Make Pinia States globally available
app.provide("apiState", useApiState());
app.provide("authState", useAuthState());
app.provide("formState", useFormState());
app.provide("pageState", usePageState());
app.provide("orderState", useOrderState());
app.provide("storeState", useStoreState());
app.provide("loaderState", useLoaderState());
app.provide("workflowState", useWorkflowState());
app.provide("onboardingState", useOnboardingState());
app.provide("notificationState", useNotificationState());
app.provide("shoppingCartState", useShoppingCartState());
app.provide("changeHistoryState", useChangeHistoryState());
app.provide("deliveryMethodState", useDeliveryMethodState());
