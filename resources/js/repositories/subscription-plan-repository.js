import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';
import { getApi } from '@Repositories/api-repository.js';

const apiHomeLinks = () => useApiState().apiHome._links;

// Get subscription plans
async function getSubscriptionPlans(url = null, searchTerm = null) {

    return await getApi(url ?? apiHomeLinks().showSubscriptionPlans, {
        'search': searchTerm
    });

}

// Export functions
export { getSubscriptionPlans };
