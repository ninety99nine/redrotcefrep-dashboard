import { useApiStore } from '@Stores/api-store.js';
import { useAuthStore } from '@Stores/auth-store.js';
import { get } from '@Repositories/api-repository.js';

const apiHomeLinks = () => useApiStore().apiHome._links;

// Get subscriptions
async function getSubscriptions(url = null, params = {}) {

    return await get(url ?? apiHomeLinks().showSubscriptions, params);

}

// Export functions
export { getSubscriptions };
