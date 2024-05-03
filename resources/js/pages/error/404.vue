<template>

    <div class="flex h-screen flex-col px-6 py-12 lg:px-8 bg-gray-100">

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <!-- Logo -->
            <Logo class="mx-auto"></Logo>

            <!-- Large Text Heading -->
            <LargeTextHeader class="mt-20">404</LargeTextHeader>

            <!-- Text Heading -->
            <TextHeader class="mt-20 text-center">Sorry, we couldn't find that page</TextHeader>

            <!-- Guidance -->
            <p class="text-center mt-4 text-gray-500">Hey, don't worry 😊</p>
            <p class="text-center text-gray-500">Check out our links below to get back on track</p>

        </div>

        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm flex space-x-4 justify-center">

            <template v-if="authState.authenticated">

                <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>

            </template>

            <template v-else>

                <router-link :to="{ name: 'login' }">Login</router-link>
                <router-link :to="{ name: 'register' }">Register</router-link>

            </template>
        </div>

    </div>

</template>

<script>

    import { RouterLink } from 'vue-router';
    import Logo from '@Partials/logos/Logo.vue';
    import { useApiState } from '@Stores/api-store.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import LargeTextHeader from '@Partials/texts/LargeTextHeader.vue';

    export default {
        components: { Logo, RouterLink, TextHeader, LargeTextHeader },
        data() {
            return {
                apiState: useApiState(),
                authState: useAuthState(),
            }
        }
    };
</script>
