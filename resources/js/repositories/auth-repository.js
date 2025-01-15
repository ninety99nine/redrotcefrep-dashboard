import axios from 'axios';
import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';

const apiHomeLinks = () => useApiState().apiHome._links;

// Login function
async function login(data) {
    try {

        const response = await axios.post(apiHomeLinks().login, data);

        if(response.status == 200) {
            saveAccessToken(response.data.accessToken);
            saveUser(response.data.user);
        }

        return response;

    } catch (error) {

        // Handle error
        console.error('Login error:', error);
        throw error;

    }
}

// Social Login function
async function socialLogin(accessToken) {
    try {

        saveAccessToken(accessToken);
        const response = await axios.get(apiHomeLinks().showAuthUser);

        if(response.status == 200) {

            if(response.data.exists) {

                saveUser(response.data.user);

                console.log('response.data.user');
                console.log(response.data.user);

            }
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

        return await axios.post(apiHomeLinks().validateRegister, data);

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
            saveAccessToken(response.data.accessToken);
            saveUser(response.data.user);
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
function saveAccessToken(accessToken) {

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
function saveUser(user) {

    //  Get the Auth Store instance
    const auth = useAuthState();

    //  Set the authenticated status
    auth.authenticated = true;

    //  Set the response user
    auth.user = user;
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
export { login, socialLogin, validateRegister, register, logout };
