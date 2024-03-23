import axios from 'axios';

// GET function
async function get(url, params) {
    try {

        return axios.get(url, { params: params });

    } catch (error) {

        // Handle error
        console.error('GET error for ('+url+'):', error);
        throw error;

    }
}

// Export functions
export { get };
