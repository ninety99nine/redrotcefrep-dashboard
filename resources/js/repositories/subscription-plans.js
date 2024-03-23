import { useApiStore } from '@Stores/api-store.js';
import { useAuthStore } from '@Stores/auth-store.js';
import { get } from '@Repositories/api-repository.js';

const apiHomeLinks = () => useApiStore().apiHome._links;

// Get subscription plans
async function getSubscriptionPlans(url = null, searchTerm = null) {

    return await get(url ?? apiHomeLinks().showSubscriptionPlans, {
        'search': searchTerm
    });

}

// Export functions
export { getSubscriptionPlans };
