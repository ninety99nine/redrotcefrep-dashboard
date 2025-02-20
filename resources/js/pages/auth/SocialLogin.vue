<template>

    <div class="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-200">

        <!-- Loading effect -->
        <div class="relative inline-flex items-center justify-center w-28 h-28">

            <!-- Spinning Ring -->
            <div :class="['absolute inset-0 animate-spin rounded-full border-4 border-gray-300']" :style="'border-top-color:'+borderColor+';'"></div>

            <transition name="fade-1" mode="out-in">

                <!-- Logo Placeholder -->
                <ShineEffect v-if="isLoadingLogo" class="rounded-full">
                    <RoundSkeleton color="bg-gray-200" size="w-20 h-20" class="border border-gray-300"></RoundSkeleton>
                </ShineEffect>

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

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import { socialLogin } from '@Repositories/auth-repository.js';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { ShineEffect, RoundSkeleton, FormErrorMessages },
        data() {
            return {
                countdown: 5,
                errorMessage: null,
                isLoadingLogo: true,
                countdownInterval: null,
                authState: useAuthState(),
                error: this.$route.query.error,
                logoUrl: this.$route.query.logo_url,
                provider: this.$route.query.provider,
                accessToken: this.$route.query.token,
                errorDescription: this.$route.query.error_description,
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

                        // Redirect to the dashboard
                        this.$router.replace({ name: 'show-stores'});
                        this.showSuccessfulNotification('Welcome back '+this.authState.user.firstName);
                    }

                }).catch(errorException => {

                    this.setServerFormErrors(errorException);

                    if(this.hasErrors) this.errorMessage = this.formErrors[0];

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
