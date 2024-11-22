import axios from 'axios';
import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';

const apiHomeLinks = () => useApiState().apiHome._links;

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

// Validate Register function
async function validateRegister(data) {
    try {

        const response = await axios.post(apiHomeLinks().validateRegister, data);
        if(response.status == 200) {
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

// Register function
async function register(data) {
    try {

        const response = await axios.post(apiHomeLinks().register, data);
        if(response.status == 200) {
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
        const auth = useAuthState();

        const response = await axios.post(auth.user._links.logoutUser);
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
    const auth = useAuthState();

    //  Set the authenticated status
    auth.authenticated = true;

    //  Set the response user
    auth.user = response.data.user;
}

// Remove user
function removeUser() {

    //  Get the Auth Store instance
    const auth = useAuthState();

    //  Set the authenticated status
    auth.authenticated = false;

    //  Set the response user
    auth.user = null;
}

// Export functions
export { login, validateRegister, register, logout };
