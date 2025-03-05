<template>

    <div class="animated-border-pink bg-white space-y-4 py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <h1 class="space-x-2 text-sm text-gray-700 font-bold">
            Share Your Store
        </h1>

        <!-- Share On Social Platforms -->
        <div class="w-full">

            <a
                :key="index"
                target="_blank"
                :href="socialPlatform.link"
                v-for="(socialPlatform, index) in socialPlatforms">

                <div class="flex justify-between items-center gap-2 bg-white py-3 px-4 rounded-xl transition-all duration-300 border border-transparent hover:shadow-sm hover:border-gray-300 cursor-pointer">

                    <div class="w-full flex items-center space-x-4">

                        <!-- Social Platform Logo -->
                        <LineSkeleton v-if="isLoadingStore" width="w-8" height="h-8" :shine="true"></LineSkeleton>
                        <img v-else :src="`/images/social-icons/${socialPlatform.name.toLowerCase()}.png`" :alt="`${socialPlatform.name} Logo`" class="w-8 h-8" />

                        <!-- Social Platform Name -->
                        <div class="w-full space-y-1 text-sm">

                            <LineSkeleton v-if="isLoadingStore" width="w-1/3" :shine="true"></LineSkeleton>
                            <p v-else class="font-bold">{{ socialPlatform.name }}</p>

                            <LineSkeleton v-if="isLoadingStore" width="w-4/5" :shine="true"></LineSkeleton>
                            <p v-else class="text-xs">{{ socialPlatform.description }}</p>

                        </div>

                    </div>

                    <LineSkeleton v-if="isLoadingStore" width="w-5" height="h-5" :shine="true"></LineSkeleton>
                    <div v-else class="rounded-md border p-1 border-transparent hover:border-gray-300 hover:bg-gray-50">
                        <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </div>

                </div>
            </a>

        </div>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        components: {
            LineSkeleton
        },
        data() {
            return {
                storeState: useStoreState()
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            socialPlatforms() {

                return [
                    {
                        name: 'Facebook',
                        description: 'Reach your customers by posting your store link',
                        link: this.isLoadingStore ? null : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.store._attributes.webLink)}`
                    },
                    {
                        name: 'Whatsapp',
                        description: 'Share your store with friends and family instantly',
                        link: this.isLoadingStore ? null : `https://wa.me/?text=${encodeURIComponent(
                            `${this.store.name}\n\nVisit our store: ${this.store._attributes.webLink}`
                        )}`
                    },
                    {
                        name: 'Instagram',
                        description: 'Add your store link to your bio and attract visitors',
                        link: this.isLoadingStore ? null : 'https://www.instagram.com/accounts/edit'
                    },
                    {
                        name: 'LinkedIn',
                        description: 'Share your store link with professional connections',
                        link: this.isLoadingStore ? null : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.store._attributes.webLink)}`
                    },
                ];

            }
        }
    };

</script>
