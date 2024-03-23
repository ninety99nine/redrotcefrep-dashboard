import { useApiStore } from '@Stores/api-store.js';
import { useAuthStore } from '@Stores/auth-store.js';
import { get } from '@Repositories/api-repository.js';

const apiHomeLinks = () => useApiStore().apiHome._links;

// Get transactions
async function getTransactions(url = null, params = {}) {

    return await get(url ?? apiHomeLinks().showTransactions, params);

}

// Export functions
export { getTransactions };
