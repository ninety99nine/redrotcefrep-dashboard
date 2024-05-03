import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';
import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

// Get store
async function getStore(href, params = {}) {
    return await getApi(href, params);
}

// Update store
async function updateStore(store, data) {
    return await putApi(store._links.updateStore, data);
}

// Update store logo
async function updateStoreLogo(store, logo) {

    // Prepare the FormData
    const formData = new FormData();

    //  Add the logo file to this FormData
    formData.append('logo', logo);

    return await postApi(store._links.updateLogo, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
}

/// Get the available payment methods of the specified store
async function getAvailablePaymentMethods(store, params = {}) {
    return await getApi(store._links.showAvailablePaymentMethods, params);
}

/// Get the supported payment methods of the specified store
async function getSupportedPaymentMethods(store, params = {}) {
    return await getApi(store._links.showSupportedPaymentMethods, params);
}

/// Get the available deposit percentages of the specified store
async function getAvailableDepositPercentages(store, params = {}) {
    return await getApi(store._links.showAvailableDepositPercentages, params);
}

/// Get the available installment percentages of the specified store
async function getAvailableInstallmentPercentages(store, params = {}) {
    return await getApi(store._links.showAvailableInstallmentPercentages, params);
}

// Delete store
async function deleteStore(store, data) {
    return await deleteApi(store._links.deleteStore, data);
}

// Get stores
async function getUserStores(user, params = {}) {
    return await getApi(user._links.showStores, params);
}

// Export functions
export {
    getStore, updateStore, updateStoreLogo, getAvailablePaymentMethods, getSupportedPaymentMethods,
    getAvailableDepositPercentages, getAvailableInstallmentPercentages, deleteStore, getUserStores
};
