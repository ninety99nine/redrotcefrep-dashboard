<template>

    <div class="flex h-screen flex-col px-6 py-12 lg:px-8 bg-gray-100">

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <!-- Logo -->
            <Logo class="mx-auto"></Logo>

            <!-- Large Text Heading -->
            <h1 class="text-8xl font-bold leading-3 tracking-tight text-gray-900 text-center mt-20">404</h1>

            <!-- Text Heading -->
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-20 text-center">Sorry, we couldn't find that page</h1>

            <!-- Guidance -->
            <p class="text-center mt-4 text-gray-500">Hey, don't worry 😊</p>
            <p class="text-center text-gray-500">Check out our links below to get back on track</p>

        </div>

        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm flex space-x-4 justify-center">

            <template v-if="authState.authenticated">

                <router-link :to="{ name: 'show-stores'}">Dashboard</router-link>

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

    export default {
        inject: ['authState'],
        components: { Logo, RouterLink }
    };
</script>
