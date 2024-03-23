import 'bootstrap';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';

/**
 *  Typically, the Content-Type header is used to specify the media type of the request payload,
 *  but in the case of a GET request, there's usually no request payload, therefore when making
 *  a GET Request using Axios, the Content-Type header might not be necessary, and it's
 *  reasonable for Axios not to include it automatically. This means that we should
 *  expect that any GET request will omit this header even if we explicitly set the
 *  value as seen below. The header will only appear for methods that support
 *  request payload
 */
window.axios.defaults.headers.common['Content-Type'] = 'application/json';

// Check if access token exists in localStorage and set it to axios headers if it does
const accessToken = localStorage.getItem('accessToken');

if (accessToken) {
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
