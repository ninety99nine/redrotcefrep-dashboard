import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';
import { getApi } from '@Repositories/api-repository.js';

const apiHomeLinks = () => useApiState().apiHome._links;

// Get subscriptions
async function getSubscriptions(url = null, params = {}) {

    return await getApi(url ?? apiHomeLinks().showSubscriptions, params);

}

// Export functions
export { getSubscriptions };
