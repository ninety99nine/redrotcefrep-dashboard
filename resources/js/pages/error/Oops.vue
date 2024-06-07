<template>

    <div class="flex h-screen flex-col px-6 py-12 lg:px-8 bg-gray-100">

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <!-- Logo -->
            <Logo class="mx-auto"></Logo>

            <!-- Large Text Heading -->
            <LargeTextHeader class="mt-20">Oops</LargeTextHeader>

            <!-- Text Heading -->
            <TextHeader class="mt-20 text-center">Seems like something went wrong</TextHeader>

            <!-- API Call Last Error Message Info Alert -->
            <Alert v-if="api.hasLastErrorMessage" class="mt-4 mb-0 mx-auto max-w-96" type="warning">
                {{ api.lastErrorMessage }}
            </Alert>

            <!-- Guidance -->
            <p class="text-center mt-4 text-gray-500">Hey, don't worry, check out our links below to get back on track</p>

        </div>

        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm flex space-x-4 justify-center">
            <router-link :to="{ name: 'login' }">Login</router-link>
            <router-link :to="{ name: 'register' }">Register</router-link>
        </div>

    </div>

</template>

<script>

    import { RouterLink } from 'vue-router';
    import Logo from '@Partials/logos/Logo.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import { useApiState } from '@Stores/api-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import LargeTextHeader from '@Partials/texts/LargeTextHeader.vue';

    export default {
        components: { Logo, Alert, RouterLink, TextHeader, LargeTextHeader },
        data() {
            return {
                api: useApiState()
            }
        }
    };
</script>
