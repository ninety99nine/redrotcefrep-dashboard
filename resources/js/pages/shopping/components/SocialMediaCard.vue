<template>

    <div class="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">

        <!-- Social Media Links Heading -->
        <p class="font-bold text-xs sm:text-sm text-black">
            Social Media
        </p>

        <!-- Social Media Links -->
        <div class="flex flex-wrap gap-2 justify-center">
            <a v-for="(socialLink, index) in socialLinks" :key="index" :href="socialLink.link" target="_blank" class="p-1 border border-transparent hover:border-gray-500 rounded-lg active:scale-95 transition-all">
                <img class="w-6 md:w-8" :src="appApiUrl+'/images/social-icons/'+socialLink.name.toLowerCase()+'.png'" />
            </a>
        </div>

    </div>

</template>

<script>

import settings from '@Js/settings.js';
import { useStoreState } from '@Stores/store-store.js';

export default {
    data() {
        return {
            storeState: useStoreState(),
            appApiUrl: settings.appApiUrl,
        };
    },
    computed: {
        store() {
            return this.storeState.store;
        },
        socialLinks() {
            return this.store.socialLinks;
        },
    },
};

</script>
