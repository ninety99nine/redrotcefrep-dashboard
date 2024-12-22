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

                <!-- Form Error Messages -->
                <FormErrorMessages v-if="hasGeneralError"></FormErrorMessages>

                <!-- Mobile Number Input -->
                <MobileNumberInput v-model="mobileNumber" :errorText="getFormError('mobileNumber')" @keydown.enter="handleLogin"></MobileNumberInput>

                <template v-if="accountExists">

                    <!-- Set New Password Info Alert -->
                    <Alert v-if="requiresPassword">
                        Please set a new password for your account.
                    </Alert>

                    <!-- Password Input -->
                    <PasswordInput v-model="password" :showForgotPassword="!requiresPassword" :errorText="getFormError('password')" @keydown.enter="handleLogin"></PasswordInput>

                    <template v-if="requiresPassword">

                        <!-- Confirm Password Input -->
                        <ConfirmPasswordInput v-model="passwordConfirmation" :errorText="getFormError('passwordConfirmation')" @keydown.enter="handleLogin"></ConfirmPasswordInput>

                        <!-- Enter Verification Code Alert -->
                        <Alert>
                            Dial <span class="font-bold">{{ mobileVerificationShortcode }}</span> and enter the verification code below to confirm ownership of the mobile number <span class="font-bold">{{ mobileNumber }}</span>
                        </Alert>

                        <!-- Mobile Verification Pin Input -->
                        <OtpInput v-model="verificationCode" :errorText="getFormError('verificationCode')"></OtpInput>

                    </template>

                </template>

                <!-- Sign In Button -->
                <PrimaryButton :action="handleLogin" :loading="isSubmitting" class="w-full">
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
    import { RouterLink } from 'vue-router';
    import Logo from '@Partials/logos/Logo.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import { login } from '@Repositories/auth-repository.js';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import { useNotificationState } from '@Stores/notification-store.js';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import ConfirmPasswordInput from '@Partials/inputs/ConfirmPasswordInput.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { Logo, Alert, RouterLink, TextHeader, PasswordInput, OtpInput, PrimaryButton, MobileNumberInput, FormErrorMessages, ConfirmPasswordInput },
        data() {
            return {
                loginUrl: null,
                isSubmitting: false,
                accountExistsUrl: null,
                apiState: useApiState(),
                authState: useAuthState(),
                showPasswordConfirmation: false,
                mobileVerificationShortcode: null,
                notificationState: useNotificationState(),

                accountExists: false,
                requiresPassword: false,

                password: '',
                mobileNumber: '',
                verificationCode: '',
                passwordConfirmation: '',
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
            setUrls() {
                this.loginUrl = this.apiState.apiHome['_links']['login'];
                this.accountExistsUrl = this.apiState.apiHome['_links']['accountExists'];
                this.mobileVerificationShortcode = this.apiState.apiHome['mobileVerificationShortcode'];
            },
            handleLogin() {
                /**
                 *  Note: the hideFormErrors() method is part of the FormMixin methods
                 */
                this.hideFormErrors();

                if(this.accountExists) {
                    this.attemptLogin();
                }else{
                    this.checkIfAccountExists();
                }
            },
            checkIfAccountExists() {
                /**
                 *  Note: the setFormError() method is part of the FormMixin methods
                 */
                if(this.mobileNumber.trim() == '') {

                    this.setFormError('mobileNumber', 'Enter your mobile number');

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

                            this.$router.push({ name: 'register', query: { 'mobileNumber': this.mobileNumber } });

                        }

                    })
                    .catch(errorException => {

                        this.isSubmitting = false;

                        /**
                         *  Note: the setServerFormErrors() method is part of the FormMixin methods
                         */
                        this.setServerFormErrors(errorException);

                    });

                }else {

                    /**
                     *  Note: the setGeneralFormError() method is part of the FormMixin methods
                     */
                    this.setGeneralFormError('The accountExistsUrl does not exist');

                }
            },
            attemptLogin() {

                /**
                 *  Note: the setFormError() method is part of the FormMixin methods
                 */
                if(this.mobileNumber.trim() == '') {

                    this.setFormError('mobileNumber', 'Enter your mobile number');

                }else if(this.password.trim() == '') {

                    this.setFormError('password', 'Enter your password');

                }else if(this.requiresPassword && this.passwordConfirmation.trim() == '') {

                    this.setFormError('passwordConfirmation', 'Enter your password confirmation');

                }else if(this.requiresPassword && this.password != this.passwordConfirmation) {

                    this.setFormError('password', 'Password does not match confirmation');

                }else if(this.requiresPassword && this.verificationCode.trim() == '') {

                    this.setFormError('verificationCode', 'Enter your verification code');

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

                            if(redirect) {

                                // Redirect to the specified route
                                this.$router.replace(redirect);

                            } else {

                                // Redirect to the dashboard
                                this.$router.replace({ name: 'dashboard' });

                                /**
                                 *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                                 */
                                this.showSuccessfulNotification('Welcome back '+this.authState.user.firstName);

                            }

                        }

                    }).catch(errorException => {

                        //  Stop loader
                        this.isSubmitting = false;

                        /**
                         *  Note: the setServerFormErrors() method is part of the FormMixin methods
                         */
                        this.setServerFormErrors(errorException);

                    });

                }else {

                    /**
                     *  Note: the setGeneralFormError() method is part of the FormMixin methods
                     */
                    this.setGeneralFormError('The loginUrl does not exist');

                }
            }
        },
        created() {
            this.setUrls();
        }
    };
</script>
