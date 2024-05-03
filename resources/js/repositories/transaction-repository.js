import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';
import { getApi } from '@Repositories/api-repository.js';

const apiHomeLinks = () => useApiState().apiHome._links;

// Get transactions
async function getTransactions(url = null, params = {}) {

    return await getApi(url ?? apiHomeLinks().showTransactions, params);

}

// Export functions
export { getTransactions };
