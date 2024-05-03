import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';
import { putApi, postApi } from '@Repositories/api-repository.js';

// Update user
async function updateUser(user, data) {
    return await putApi(user._links.updateUser, data);
}

// Update user profile photo
async function updateUserProfilePhoto(user, profilePhoto) {

    // Prepare the FormData
    const formData = new FormData();

    //  Add the profile photo file to this FormData
    formData.append('profile_photo', profilePhoto);

    return await postApi(user._links.updateProfilePhoto, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
}

// Export functions
export { updateUser, updateUserProfilePhoto };
