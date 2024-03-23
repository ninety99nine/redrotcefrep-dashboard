import axios from 'axios';
import { useApiStore } from '@Stores/api-store.js';
import { useAuthStore } from '@Stores/auth-store.js';

const apiHomeLinks = () => useApiStore().apiHome._links;

// Login function
async function login(data) {
    try {

        const response = await axios.post(apiHomeLinks().login, data);
        if(response.status == 200) {
            saveAccessToken(response);
            saveUser(response);
        }
        return response;

    } catch (error) {

        // Handle error
        console.error('Login error:', error);
        throw error;

    }
}

// Register function
async function register(data) {
    try {

        const response = await axios.post(apiHomeLinks().register, data);
        if(response.status == 201) {
            saveAccessToken(response);
            saveUser(response);
        }
        return response;

    } catch (error) {

        // Handle error
        console.error('Registration error:', error);
        throw error;

    }
}

// Logout function
async function logout() {
    try {

        //  Get the Auth Store instance
        const auth = useAuthStore();

        const response = await axios.post(auth.user._links.logout);
        if(response.status == 200) {
            removeAccessToken();
            removeUser();
        }
        return response;

    } catch (error) {

        // Handle error
        console.error('Logout error:', error);
        throw error;

    }
}

// Save access token
function saveAccessToken(response) {

    //  Get the access token
    const accessToken = response.data.accessToken;

    // Set token to axios defaults to use it in future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // Save token locally
    localStorage.setItem('accessToken', accessToken);

}

// Remove access token
function removeAccessToken() {

    // Unset token from axios defaults so that it is not used in future requests
    axios.defaults.headers.common['Authorization'] = null;

    // Remove token save locally
    localStorage.removeItem('accessToken');
}

// Save user
function saveUser(response) {

    //  Get the Auth Store instance
    const auth = useAuthStore();

    //  Set the authenticated status
    auth.authenticated = true;

    //  Set the response user
    auth.user = response.data.user;
}

// Remove user
function removeUser() {

    //  Get the Auth Store instance
    const auth = useAuthStore();

    //  Set the authenticated status
    auth.authenticated = false;

    //  Set the response user
    auth.user = null;
}

// Export functions
export { login, register, logout };
