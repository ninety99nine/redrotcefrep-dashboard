import axios from 'axios';

// GET function
async function getApi(url, params) {
    try {

        return axios.get(url, { params: params });

    } catch (error) {

        // Handle error here
        throw error;

    }
}

// POST function
async function postApi(url, data, config) {
    try {

        return axios.post(url, data, config);

    } catch (error) {

        // Handle error here
        throw error;

    }
}

// PUT function
async function putApi(url, data, config) {
    try {

        return axios.put(url, data, config);

    } catch (error) {

        // Handle error here
        throw error;

    }
}

// DELETE function
async function deleteApi(url, data, config) {
    try {

        return axios.delete(url, data, config);

    } catch (error) {

        // Handle error here
        throw error;

    }
}

// Export functions
export { getApi, postApi, putApi, deleteApi };
