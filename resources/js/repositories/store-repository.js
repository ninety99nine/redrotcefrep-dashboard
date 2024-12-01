import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';
import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

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

// Delete store
async function deleteStore(store, data) {
    return await deleteApi(store._links.deleteStore, data);
}

// Export functions
export {
    updateStoreLogo, getAvailablePaymentMethods,
    getSupportedPaymentMethods, deleteStore
};
