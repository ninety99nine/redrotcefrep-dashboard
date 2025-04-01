<template>

    <div class="w-full grid grid-cols-2 bg-gradient-to-b from-blue-100 to-white-100 min-h-screen overflow-x-hidden">

        <div class="col-span-1 flex flex-col justify-center px-6 py-12 lg:px-8">

            <div class="sm:mx-auto sm:w-full sm:max-w-sm">

                <!-- Logo -->
                <Logo class="mx-auto"></Logo>

                <!-- Text Heading -->
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-10 text-center">Sign in to your account</h1>

            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <div class="space-y-6">

                    <!-- Form Error Messages -->
                    <FormErrorMessages v-if="formState.hasGeneralError"></FormErrorMessages>

                    <!-- Mobile Number Input -->
                    <MobileNumberInput
                        v-model="mobileNumber"
                        @keydown.enter="handleLogin"
                        :errorText="formState.getFormError('mobileNumber')"
                        description="The sim card used to create your Perfect Order account using a mobile network e.g Orange">
                    </MobileNumberInput>

                    <template v-if="accountExists">

                        <!-- Set New Password Info Alert -->
                        <Alert v-if="requiresPassword">
                            Please set a new password for your account.
                        </Alert>

                        <!-- Password Input -->
                        <PasswordInput v-model="password" :showForgotPassword="!requiresPassword" :errorText="formState.getFormError('password')" @keydown.enter="handleLogin"></PasswordInput>

                        <template v-if="requiresPassword">

                            <!-- Confirm Password Input -->
                            <ConfirmPasswordInput v-model="passwordConfirmation" :errorText="formState.getFormError('passwordConfirmation')" @keydown.enter="handleLogin"></ConfirmPasswordInput>

                            <!-- Enter Verification Code Alert -->
                            <Alert>
                                Dial <span class="font-bold">{{ mobileVerificationShortcode }}</span> and enter the verification code below to confirm ownership of the mobile number <span class="font-bold">{{ mobileNumber }}</span>
                            </Alert>

                            <!-- Mobile Verification Pin Input -->
                            <OtpInput v-model="verificationCode" :errorText="formState.getFormError('verificationCode')"></OtpInput>

                        </template>

                    </template>

                    <!-- Sign In Button -->
                    <Button
                        size="sm"
                        class="w-full"
                        type="primary"
                        :action="handleLogin"
                        :loading="isSubmitting"
                        :disabled="isSubmitting">
                        <template v-if="accountExists && requiresPassword">Set Password</template>
                        <template v-else-if="accountExists && !requiresPassword">Sign In</template>
                        <template v-else-if="!accountExists && !requiresPassword">Continue</template>
                    </Button>

                </div>

                <!-- Social Sign In Links -->
                <SocialLinks></SocialLinks>

                <!-- Register Link -->
                <p class="text-sm text-center mt-8">
                    <span class="text-gray-500 mr-1">Don't have an account?</span>
                    <router-link :to="{ name: 'register' }">Register</router-link>
                </p>

            </div>

        </div>

        <div class="col-span-1 relative">

            <img
                :key="index"
                :src="image"
                v-for="(image, index) in images"
                class="absolute w-full h-full object-cover object-left transition-opacity duration-1000"
                :class="{ 'opacity-100': index === currentImageIndex, 'opacity-0': index !== currentImageIndex }"
            />

        </div>

    </div>

</template>

<script>

    import { RouterLink } from 'vue-router';
    import Logo from '@Partials/logos/Logo.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import Button from '@Partials/buttons/Button.vue';
    import { login } from '@Repositories/auth-repository.js';
    import { postApi } from '@Repositories/api-repository.js';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import SocialLinks from '@Pages/auth/components/SocialLinks.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import ConfirmPasswordInput from '@Partials/inputs/ConfirmPasswordInput.vue';

    export default {
        inject: ['apiState', 'formState'],
        components: {
            Logo, Alert, Button, RouterLink, PasswordInput, OtpInput, SocialLinks,
            SpinningLoader, MobileNumberInput, FormErrorMessages, ConfirmPasswordInput
        },
        data() {
            return {
                loginUrl: null,
                isSubmitting: false,
                accountExistsUrl: null,
                showPasswordConfirmation: false,
                mobileVerificationShortcode: null,

                accountExists: false,
                requiresPassword: false,

                password: '',
                mobileNumber: '',
                verificationCode: '',
                passwordConfirmation: '',

                currentImageIndex: 0,
                slideShowSetInterval: null,
                images: [
                    '/images/lady-holding-boxes.jpg'
                ]
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                /**
                 *  Check if the mobile number in included as part of the query params.
                 *  This happens whenever we are redirected from the register page to
                 *  the login page when an account matching the provided mobile
                 *  number exists. We simply redirect to the login page to
                 *  handle login using this mobile number.
                 */
                if(to.query.hasOwnProperty('mobileNumber')) {
                    vm.mobileNumber = to.query.mobileNumber;
                    vm.handleLogin();
                }
            });
        },
        methods: {
            handleLogin() {
                this.formState.hideFormErrors();

                if(this.accountExists) {
                    this.attemptLogin();
                }else{
                    this.checkIfAccountExists();
                }
            },
            checkIfAccountExists() {
                if(this.mobileNumber.trim() == '') {

                    this.formState.setFormError('mobileNumber', 'Enter your mobile number');

                }else if(this.accountExistsUrl != null) {

                    this.isSubmitting = true;

                    const data = {
                        mobileNumber: this.mobileNumber
                    };

                    postApi(this.accountExistsUrl, data).then(response => {

                        this.isSubmitting = false;

                        this.accountExists = response.data['exists'];

                        if(this.accountExists) {

                            this.requiresPassword = response.data['accountSummary']['requiresPassword'];

                        }else{

                            this.$router.push({ name: 'register', query: { 'mobileNumber': this.mobileNumber } });

                        }

                    })
                    .catch(errorException => {

                        this.isSubmitting = false;
                        this.formState.setServerFormErrors(errorException);

                    });

                }else {
                    this.formState.setGeneralFormError('The accountExistsUrl does not exist');
                }
            },
            attemptLogin() {

                if(this.mobileNumber.trim() == '') {

                    this.formState.setFormError('mobileNumber', 'Enter your mobile number');

                }else if(this.password.trim() == '') {

                    this.formState.setFormError('password', 'Enter your password');

                }else if(this.requiresPassword && this.passwordConfirmation.trim() == '') {

                    this.formState.setFormError('passwordConfirmation', 'Enter your password confirmation');

                }else if(this.requiresPassword && this.password != this.passwordConfirmation) {

                    this.formState.setFormError('password', 'Password does not match confirmation');

                }else if(this.requiresPassword && this.verificationCode.trim() == '') {

                    this.formState.setFormError('verificationCode', 'Enter your verification code');

                }else if(this.loginUrl != null) {

                    this.isSubmitting = true;

                    let data = {
                        password: this.password,
                        mobileNumber: this.mobileNumber
                    }

                    if(this.requiresPassword) {
                        data['verificationCode'] = this.verificationCode;
                        data['passwordConfirmation'] = this.passwordConfirmation;
                    }

                    login(data).then(response => {

                        if(response.status == 200) {

                            this.isSubmitting = false;
                            const redirect = this.$route.query.redirect;

                            if(redirect) {
                                this.$router.replace(redirect);
                            } else {
                                this.$router.replace({ name: 'show-stores'});
                            }

                        }

                    }).catch(errorException => {

                        this.isSubmitting = false;
                        this.formState.setServerFormErrors(errorException);

                    });

                }else {
                    this.formState.setGeneralFormError('The loginUrl does not exist');

                }
            },
            startSlideshow() {
                this.slideShowSetInterval = setInterval(() => {
                    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
                }, 3000);
            },
            stopSlideshow() {
                if (this.slideShowSetInterval) {
                    clearInterval(this.slideShowSetInterval);
                    this.slideShowSetInterval = null;
                }
            },
        },
        beforeUnmount() {
            this.stopSlideshow();
        },
        created() {
            this.startSlideshow();
            this.loginUrl = this.apiState.apiHome['_links']['login'];
            this.accountExistsUrl = this.apiState.apiHome['_links']['accountExists'];
            this.mobileVerificationShortcode = this.apiState.apiHome['mobileVerificationShortcode'];
        }
    };
</script>
