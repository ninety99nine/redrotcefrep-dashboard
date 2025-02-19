<template>

    <div class="flex flex-col min-h-screen justify-center bg-gradient-to-t from-slate-950 to-blue-900">

        <div class="w-full max-w-lg mx-auto space-y-10 mb-10">

            <!-- Logo -->
            <Logo class="mx-auto" height="h-24"></Logo>

            <!-- Heading -->
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                Oops! We couldn't find that store 😕
            </h2>

        </div>

        <div class="space-y-6 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">

            <!-- Store Not Found Alert -->
            <p class="text-xs sm:text-sm text-justify">
                It looks like the store you're looking for isn't here. But don't worry—let's create something amazing together!
            </p>

            <!-- Proceed Button -->
            <PrimaryButton :action="navigateToRegister" type="success">
                <span class="mr-2">Let’s Create Your Store</span> 🚀
            </PrimaryButton>

            <!-- Register Link -->
             <div class="text-center">
                <ExternalLink :url="appWebsiteUrl" :openInNewTab="false" class="text-xs">
                    Visit our website to learn more
                </ExternalLink>
             </div>

        </div>

    </div>

  </template>

<script>

import settings from '@Js/settings.js';
import Logo from '@Partials/logos/Logo.vue';
import Alert from '@Partials/alerts/Alert.vue';
import TextHeader from '@Partials/texts/TextHeader.vue';
import ExternalLink from '@Partials/links/ExternalLink.vue';
import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';

export default {
    components: { Logo, Alert, TextHeader, ExternalLink, PrimaryButton },
    data() {
        return {
            appWebsiteUrl: settings.appWebsiteUrl
        };
    },
    methods: {
        navigateToRegister() {
            this.$router.push({ name: 'register' });
        }
    }
};
</script>
