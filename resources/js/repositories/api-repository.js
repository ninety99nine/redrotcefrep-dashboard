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
async function postApi(url, data, config = {}) {
    try {

        return axios.post(url, data, config);

    } catch (error) {

        // Handle error here
        throw error;

    }
}

// POST File function
async function postFileApi(url, fileName, file) {
    try {

        const formData = new FormData();

        if(Array.isArray(file)) {
            file.forEach(f => {
                formData.append(fileName, f);
            });
        } else {
            formData.append(fileName, file);
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        return axios.post(url, formData, config);

    } catch (error) {

        // Handle error here
        throw error;

    }
}

// PUT function
async function putApi(url, data, config = {}) {
    try {

        return axios.put(url, data, config);

    } catch (error) {

        // Handle error here
        throw error;

    }
}

// DELETE function
async function deleteApi(url, data, config = {}) {
    try {

        /**
         *  The axios.delete method in Axios does not accept the data parameter directly as part of its arguments.
         *  To send data with a DELETE request, you need to include it in the config parameter, specifically in
         *  the data property.
         */
        config.data = data;

        return axios.delete(url, config);

    } catch (error) {

        // Handle error here
        throw error;

    }
}

// Export functions
export { getApi, postApi, postFileApi, putApi, deleteApi };
