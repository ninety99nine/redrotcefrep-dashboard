<template>

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <!-- Logo -->
            <Logo class="mx-auto"></Logo>

            <!-- Text Heading -->
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-10 text-center">Welcome to {{ appName }}</h1>

        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex space-x-4 justify-center">

            <router-link :to="{ name: 'login' }">Login</router-link>
            <router-link :to="{ name: 'register' }">Register</router-link>

        </div>

    </div>

</template>

<script>

    import settings from '@Js/settings.js';
    import { RouterLink } from 'vue-router';
    import Logo from '@Partials/logos/Logo.vue';

    export default {
        components: { RouterLink, Logo },
        data() {
            return {
                appName: settings.appName
            };
        }
    };
</script>
