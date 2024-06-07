import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';
import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

// Get product
async function getProduct(product, params = {}) {
    return await getApi(product._links.self, params);
}

// Update product
async function updateProduct(product, data) {
    return await putApi(product._links.updateProduct, data);
}

// Update product photo
async function updateProductPhoto(product, photo) {

    // Prepare the FormData
    const formData = new FormData();

    //  Add the photo file to this FormData
    formData.append('photo', photo);

    return await postApi(product._links.updatePhoto, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
}

// Delete product
async function deleteProduct(product, data) {
    return await deleteApi(product._links.deleteProduct, data);
}

// Export functions
export {
    getProduct, updateProduct, updateProductPhoto, deleteProduct
};
