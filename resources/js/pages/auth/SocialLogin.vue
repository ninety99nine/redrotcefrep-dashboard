<template>

    <div class="w-full grid grid-cols-2 bg-gradient-to-b from-blue-100 to-white-100 min-h-screen overflow-x-hidden">

        <div class="col-span-1 flex flex-col justify-center items-center px-6 py-12 lg:px-8">

            <!-- Loading effect -->
            <div class="relative inline-flex items-center justify-center w-28 h-28">

                <!-- Spinning Ring -->
                <div :class="['absolute inset-0 animate-spin rounded-full border-4 border-gray-300']" :style="'border-top-color:'+borderColor+';'"></div>

                <transition name="fade-1" mode="out-in">

                    <!-- Logo Placeholder -->
                    <LineSkeleton v-if="isLoadingLogo" width="w-20" height="h-20" color="bg-gray-200" class="border border-gray-300"></LineSkeleton>

                    <!-- Logo -->
                    <img v-else :src="logoUrl" alt="Social Logo" class="w-20 h-20 relative" />

                </transition>

            </div>

            <!-- Load Image -->
            <img :src="logoUrl" @load="onLogoLoaded" class="hidden"/>

            <div v-if="errorMessage" class="mt-8">

                <!-- Error Message -->
                <p class="font-medium text-red-500 text-sm mb-4">{{ errorMessage }}</p>

                <!-- Redirecting In Text -->
                <p class="text-gray-400 text-sm text-center ">{{ countdown == 0 ? 'Redirecting...' : `${'Redirecting in ' + countdown}` }}</p>

            </div>

            <!-- Logging In Text -->
            <p v-else class="text-gray-400 text-center mt-8">Logging In</p>

        </div>

        <div class="col-span-1 relative">

            <img
                src="/images/lady-holding-boxes.jpg"
                class="absolute w-full h-full object-cover object-left transition-opacity duration-1000"
            />

        </div>

    </div>

</template>

<script>

    import { socialLogin } from '@Repositories/auth-repository.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';

    export default {
        inject: ['authState', 'formState'],
        components: { LineSkeleton, FormErrorMessages },
        data() {
            return {
                countdown: 5,
                errorMessage: null,
                isLoadingLogo: true,
                countdownInterval: null,
                error: this.$route.query.error,
                logoUrl: this.$route.query.logo_url,
                provider: this.$route.query.provider,
                accessToken: this.$route.query.token,
                errorDescription: this.$route.query.error_description
            };
        },
        computed : {
            borderColor() {
                if(this.errorMessage) {

                    return '#e02523';

                }else{

                    const colorMapping = {
                        'google': '#df4b39',
                        'linkedin': '#117bb8',
                        'facebook': '#3f5c9b',
                    }

                    return colorMapping[this.provider];

                }
            }
        },
        methods: {
            onLogoLoaded() {
                this.isLoadingLogo = false;
            },
            startCountdown() {
                this.countdownInterval = setInterval(() => {
                    if (this.countdown > 0) {
                        this.countdown -= 1;
                    } else {
                        clearInterval(this.countdownInterval);
                        this.$router.replace({ name: 'login' });
                    }
                }, 1000);
            },
            attemptSocialLogin() {

                socialLogin(this.accessToken).then(response => {

                    if(response.status == 200) {
                        this.$router.replace({ name: 'show-stores'});
                    }

                }).catch(errorException => {

                    this.formState.setServerFormErrors(errorException);

                    if(this.formState.hasErrors) this.errorMessage = this.formErrors[0];

                });

            }

        },
        created() {
            if(this.errorDescription || this.error) {

                this.errorMessage = this.errorDescription || this.error;
                this.startCountdown();

            }else{
                this.attemptSocialLogin();
            }
        }
    };

</script>
