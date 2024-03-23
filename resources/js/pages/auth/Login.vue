<template>

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <!-- Logo -->
            <Logo class="mx-auto"></Logo>

            <!-- Text Heading -->
            <TextHeader class="mt-10 text-center">Sign in to your account</TextHeader>

        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <form class="space-y-6" action="#" method="POST">

                <!-- Mobile Number Input -->
                <MobileNumberInput v-model="mobileNumber" :errorText="mobileNumberErrorText" @keydown.enter="handleSignIn"></MobileNumberInput>

                <template v-if="accountExists">

                    <!-- Set New Password Info Alert -->
                    <InfoAlert v-if="requiresPassword">
                        Please set a new password for your account.
                    </InfoAlert>

                    <!-- Password Input -->
                    <PasswordInput v-model="password" :showForgotPassword="!requiresPassword" :errorText="passwordErrorText" @keydown.enter="handleSignIn"></PasswordInput>

                    <template v-if="requiresPassword">

                        <!-- Confirm Password Input -->
                        <ConfirmPasswordInput v-model="passwordConfirmation" :errorText="passwordConfirmationErrorText" @keydown.enter="handleSignIn"></ConfirmPasswordInput>

                        <!-- Set New Password Info Alert -->
                        <InfoAlert>
                            Dial <span class="font-bold">{{ mobileVerificationShortcode }}</span> and enter the verification code below to confirm ownership of the mobile number ({{ mobileNumber }})
                        </InfoAlert>

                        <!-- Mobile Verification Pin Input -->
                        <OtpInput v-model="verificationCode" :errorText="verificationCodeErrorText"></OtpInput>

                    </template>

                </template>

                <!-- Sign In Button -->
                <PrimaryButton :action="handleSignIn" :disabled="isLoading" :loading="isSubmitting">
                    <template v-if="accountExists && requiresPassword">Set Password</template>
                    <template v-else-if="accountExists && !requiresPassword">Sign In</template>
                    <template v-else-if="!accountExists && !requiresPassword">Continue</template>
                </PrimaryButton>

            </form>

            <!-- Register Link -->
            <p class="text-sm text-center mt-8">
                <span class="text-gray-500 mr-1">Don't have an account?</span>
                <router-link :to="{ name: 'register' }">Register</router-link>
            </p>

        </div>

    </div>

</template>

<script>

    import axios from 'axios';
    import Logo from '@Partials/Logo.vue';
    import settings from '@Js/settings.js';
    import { RouterLink } from 'vue-router';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import { login } from '@Repositories/auth-repository.js';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';

    export default {
        mixins: [UtilsMixin],
        components: { Logo, RouterLink, TextHeader, PasswordInput, PrimaryButton, OtpInput, MobileNumberInput },
        data() {
            return {
                apiHome: null,
                loginUrl: null,
                isLoading: true,
                errorMessage: '',
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

                passwordErrorText: '',
                mobileNumberErrorText: '',
                verificationCodeErrorText: '',
                passwordConfirmationErrorText: '',
            };
        },
        watch: {
            mobileNumber(newValue, oldValue) {
                this.accountExists = '';
                this.requiresPassword = '';
                this.passwordErrorText = '';
                this.mobileNumberErrorText = '';
                this.showPasswordConfirmation = false;
                this.passwordConfirmationErrorText = '';
            }
        },
        methods: {
            getApiHome() {

                axios.get(settings.appApiHomeUrl)
                .then(response => {

                    this.isLoading = false;
                    this.loginUrl = response.data['_links']['login'];
                    this.accountExistsUrl = response.data['_links']['accountExists'];

                    this.mobileVerificationShortcode = response.data['mobileVerificationShortcode'];

                })
                .catch(error => {
                    this.errorMessage = error.response.data.message;
                });
            },
            handleSignIn() {
                if(this.accountExists) {
                    this.attemptLogin();
                }else{
                    this.checkIfAccountExists();
                }
            },
            checkIfAccountExists() {
                if(this.mobileNumber.trim() == '') {

                    this.mobileNumberErrorText = 'Enter your mobile number';
                    setTimeout(() => this.mobileNumberErrorText = '', 3000);

                }else if(this.accountExistsUrl != null) {

                    this.isSubmitting = true;

                    axios.post(this.accountExistsUrl, {
                        mobileNumber: this.mobileNumber
                    })
                    .then(response => {

                        this.isSubmitting = false;

                        this.accountExists = response.data['exists'];

                        if(this.accountExists) {

                            this.requiresPassword = response.data['accountSummary']['requiresPassword'];

                        }else{

                            this.$router.push({ name: 'register' });

                        }

                    })
                    .catch(error => {
                        this.isSubmitting = false;
                        this.showServerErrors(error);
                    });

                }
            },
            attemptLogin() {
                if(this.mobileNumber.trim() == '') {

                    this.mobileNumberErrorText = 'Enter your mobile number';
                    setTimeout(() => this.mobileNumberErrorText = '', 3000);

                }else if(this.password.trim() == '') {

                    this.passwordErrorText = 'Enter your password';
                    setTimeout(() => this.passwordErrorText = '', 3000);

                }else if(this.requiresPassword && this.passwordConfirmation.trim() == '') {

                    this.passwordConfirmationErrorText = 'Enter your password confirmation';
                    setTimeout(() => this.passwordConfirmationErrorText = '', 3000);

                }else if(this.requiresPassword && this.password != this.passwordConfirmation) {

                    this.passwordErrorText = 'Password does not match confirmation';
                    setTimeout(() => this.passwordErrorText = '', 3000);

                }else if(this.requiresPassword && this.verificationCode.trim() == '') {

                    this.verificationCodeErrorText = 'Enter your verification code';
                    setTimeout(() => this.verificationCodeErrorText = '', 3000);

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

                            //  Stop loader
                            this.isSubmitting = false;

                            // Get the redirect query from the URL if present
                            const redirect = this.$route.query.redirect;

                            if (redirect) {

                                // Redirect to the specified route
                                this.$router.replace(redirect);

                            } else {

                                // Redirect to the dashboard
                                this.$router.replace({ name: 'dashboard' });

                            }

                        }

                    }).catch(error => {

                        //  Stop loader
                        this.isSubmitting = false;
                        this.showServerErrors(error);

                    });

                }
            },
            showServerErrors(error) {
                if(error.response.status == 422) {

                    if (error.response && error.response.data && error.response.data.errors) {

                        const errors = error.response.data.errors;

                        if (errors.mobileNumber) {
                            this.mobileNumberErrorText = errors.mobileNumber[0];
                            setTimeout(() => this.mobileNumberErrorText = '', 3000);
                        }

                        if (errors.password) {
                            this.passwordErrorText = errors.password[0];
                            setTimeout(() => this.passwordErrorText = '', 3000);
                        }

                        if (errors.verificationCode) {
                            this.verificationCodeErrorText = errors.verificationCode[0];
                            setTimeout(() => this.verificationCodeErrorText = '', 3000);
                        }

                    }

                }
            }
        },
        created() {
            this.getApiHome();
        }
    };
</script>
