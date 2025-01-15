<template>

    <div class="mt-8">

        <!-- message -->
        <p class="text-sm text-center text-gray-500">{{ message }}</p>

        <div class="space-y-1 mt-4">

            <!-- Social Sign In Link -->
            <a
                :key="index"
                v-for="(socialLoginLink, index) in socialLoginLinks"
                :href="disableSocialLoginLinks ? null : socialLoginLink.url"
                @click="handleSocialLoginClick(index, socialLoginLink.url)"
                :class="['flex items-center space-x-4 p-4 border bg-white border-gray-300 shadow-sm font-medium rounded-md', disableSocialLoginLinks ? ' cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 hover:scale-105 hover:shadow-md active:scale-100 transition-all']">

                <!-- Spinning Loader -->
                <SpinningLoader v-if="socialLoginLink.isLoading" color="border-gray-400" class="mr-2"></SpinningLoader>

                <!-- Icon -->
                <img
                    v-else
                    class="w-8 h-8 mr-1"
                    :alt="socialLoginLink.name"
                    :src="socialLoginLink.logoUrl"/>

                <!-- Name -->
                <span class="text-sm text-gray-400">{{ socialLoginLink.label }}</span>
            </a>

        </div>
    </div>

</template>

<script>

    import { useApiState } from '@Stores/api-store.js';
    import { getApi } from '@Repositories/api-repository.js';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';

    export default {
        props: {
            message: {
                type: String,
                default: 'Or sign in with'
            }
        },
        components: {
            SpinningLoader
        },
        data() {
            return {
                socialLoginLinks: [],
                apiState: useApiState(),
                disableSocialLoginLinks: false,
                isLoadingSocialLoginLinks: false,
            };
        },
        methods: {
            handleSocialLoginClick(index, url) {

                if (this.disableSocialLoginLinks) {
                    return false;
                }

                this.socialLoginLinks[index].isLoading = true;
                this.disableSocialLoginLinks = true;

                window.location.href = url;

            },
            showSocialLoginLinks() {

                //  Start loader
                this.isLoadingSocialLoginLinks = true;

                getApi(this.apiState.apiHome['_links']['showSocialLoginLinks']).then(response => {

                    if(response.status == 200) {

                        this.socialLoginLinks = response.data.map(socialLoginLink => ({
                            ...socialLoginLink,
                            isLoading: false
                        }));

                    }

                    //  Stop loader
                    this.isLoadingSocialLoginLinks = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingSocialLoginLinks = false;

                    this.setServerFormErrors(errorException);

                });

            },
        },
        created() {
            this.showSocialLoginLinks();
        }
    };
</script>
