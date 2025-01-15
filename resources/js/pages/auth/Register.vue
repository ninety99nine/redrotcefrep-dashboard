<template>

    <div class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <!-- Logo -->
            <Logo class="mx-auto"></Logo>

            <!-- Text Heading -->
            <TextHeader class="mt-10 text-center">Create your account</TextHeader>

        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <form class="space-y-6" action="#" method="POST">

                <!-- Form Error Messages -->
                <FormErrorMessages v-if="hasGeneralError"></FormErrorMessages>

                <template v-if="showVerificationCode">

                    <!-- Enter Verification Code Alert -->
                    <Alert>
                        Dial <span class="font-bold">{{ mobileVerificationShortcode }}</span> and enter the verification code below to confirm ownership of the mobile number <span class="font-bold">{{ mobileNumber }}</span>
                    </Alert>

                    <!-- Mobile Verification Pin Input -->
                    <OtpInput v-model="verificationCode" :errorText="getFormError('verificationCode')"></OtpInput>

                </template>

                <template v-else>

                    <!-- Mobile Number Input -->
                    <MobileNumberInput v-model="mobileNumber" :errorText="getFormError('mobileNumber')" @keydown.enter="handleRegistration"></MobileNumberInput>

                    <template v-if="accountExists == false">

                        <div class="grid grid-cols-2 gap-4">

                            <div class="md:col-span-1 col-span-2">

                                <!-- First Name Input -->
                                <TextInput v-model="firstName" label="First Name" autocomplete="given-name" :errorText="getFormError('firstName')" @keydown.enter="handleRegistration"></TextInput>

                            </div>

                            <div class="md:col-span-1 col-span-2">

                                <!-- Last Name Input -->
                                <TextInput v-model="lastName" label="Last Name" autocomplete="family-name" :errorText="getFormError('lastName')" @keydown.enter="handleRegistration"></TextInput>

                            </div>

                        </div>

                        <template v-if="firstName && lastName">

                            <!-- Password Input -->
                            <PasswordInput v-model="password" :showForgotPassword="false" :errorText="getFormError('password')" @keydown.enter="handleRegistration"></PasswordInput>

                            <!-- Confirm Password Input -->
                            <ConfirmPasswordInput v-model="passwordConfirmation" :errorText="getFormError('passwordConfirmation')" @keydown.enter="handleRegistration"></ConfirmPasswordInput>

                        </template>

                    </template>

                </template>

                <!-- Create Account Button -->
                <div class="flex">
                    <BackButton v-if="showVerificationCode" :action="backToRegistrationForm" class="w-16 mr-2"></BackButton>
                    <PrimaryButton :action="handleRegistration" :loading="isSubmitting" class="w-full">
                        <template v-if="showVerificationCode">Create Account</template>
                        <template v-else>Continue</template>
                    </PrimaryButton>
                </div>

            </form>

            <!-- Social Sign In Links -->
            <SocialLinks message="Or sign up with"></SocialLinks>

            <!-- Register Link -->
            <p class="text-sm text-center mt-8">
                <span class="text-gray-500 mr-1">Already have an account?</span>
                <router-link :to="{ name: 'login' }">Login</router-link>
            </p>

        </div>

    </div>

</template>

<script>

    import axios from 'axios';
    import settings from '@Js/settings.js';
    import { RouterLink } from 'vue-router';
    import Logo from '@Partials/logos/Logo.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SocialLinks from '@Pages/auth/components/SocialLinks.vue';
    import { useNotificationState } from '@Stores/notification-store.js';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import ConfirmPasswordInput from '@Partials/inputs/ConfirmPasswordInput.vue';
    import { validateRegister, register } from '@Repositories/auth-repository.js';
    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            Logo, Alert, RouterLink, TextInput, TextHeader, BackButton, PasswordInput, OtpInput,
            PrimaryButton, SocialLinks, MobileNumberInput, FormErrorMessages, ConfirmPasswordInput
        },
        data() {
            return {
                registerUrl: null,
                isSubmitting: false,
                accountExistsUrl: null,
                apiState: useApiState(),
                validateRegisterUrl: null,
                appName: settings.appName,
                mobileVerificationShortcode: null,
                notificationState: useNotificationState(),

                accountExists: null,
                showVerificationCode: false,

                lastName: '',
                password: '',
                firstName: '',
                mobileNumber: '',
                verificationCode: '',
                passwordConfirmation: ''
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                /**
                 *  Check if the mobile number in included as part of the query params.
                 *  This happens whenever we are redirected from the login page to
                 *  the register page when an account matching the provided mobile
                 *  number does not exist. We simply redirect to the reigter page
                 *  to handle reigistration using this mobile number.
                 */
                if(to.query.hasOwnProperty('mobileNumber')) {
                    vm.mobileNumber = to.query.mobileNumber;
                    vm.handleRegistration();
                }
            });
        },
        methods: {
            handleRegistration() {

                /**
                 *  Note: the hideFormErrors() method is part of the FormMixin methods
                 */
                this.hideFormErrors();

                if(this.showVerificationCode) {
                    this.attemptRegistration();
                }else if(this.accountExists == null) {
                    this.checkIfAccountExists();
                }else{
                    this.validateRegistration();
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

                            this.$router.push({ name: 'login', query: { 'mobileNumber': this.mobileNumber } });

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
            validateRegistration() {

                /**
                 *  Note: the setFormError() method is part of the FormMixin methods
                 */
                if(this.firstName.trim() == '') {

                    this.setFormError('firstName', 'Enter your first name');

                }else if(this.lastName.trim() == '') {

                    this.setFormError('lastName', 'Enter your last name');

                }else if(this.mobileNumber.trim() == '') {

                    this.setFormError('mobileNumber', 'Enter your mobile number');

                }else if(this.password.trim() == '') {

                    this.setFormError('password', 'Enter your password');

                }else if(this.passwordConfirmation.trim() == '') {

                    this.setFormError('passwordConfirmation', 'Enter your password confirmation');

                }else if(this.password != this.passwordConfirmation) {

                    this.setFormError('password', 'Password does not match confirmation');

                }else if(this.validateRegisterUrl != null) {

                    this.isSubmitting = true;

                    let data = {
                        lastName: this.lastName,
                        password: this.password,
                        firstName: this.firstName,
                        mobileNumber: this.mobileNumber,
                        passwordConfirmation: this.passwordConfirmation,
                    }

                    validateRegister(data).then(response => {

                        if(response.status == 200) {

                            //  Stop loader
                            this.isSubmitting = false;

                            //  Show verification code
                            this.showVerificationCode = true;

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
                    this.setGeneralFormError('The validateRegisterUrl does not exist');

                }
            },
            attemptRegistration() {

                /**
                 *  Note: the setFormError() method is part of the FormMixin methods
                 */
                if(this.verificationCode.trim() == '') {

                    this.setFormError('verificationCode', 'Enter your verification code');

                }else if(this.registerUrl != null) {

                    this.isSubmitting = true;

                    let data = {
                        lastName: this.lastName,
                        password: this.password,
                        firstName: this.firstName,
                        mobileNumber: this.mobileNumber,
                        verificationCode: this.verificationCode,
                        passwordConfirmation: this.passwordConfirmation,
                    }

                    register(data).then(response => {

                        if(response.status == 200) {

                            //  Stop loader
                            this.isSubmitting = false;

                            // Redirect to the dashboard
                            this.$router.replace({ name: 'dashboard' });

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Welcome to ' + this.appName);

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
                    this.setGeneralFormError('The registerUrl does not exist');

                }
            },
            backToRegistrationForm() {
                this.showVerificationCode = false;
            }
        },
        created() {
            this.registerUrl = this.apiState.apiHome['_links']['register'];
            this.accountExistsUrl = this.apiState.apiHome['_links']['accountExists'];
            this.validateRegisterUrl = this.apiState.apiHome['_links']['validateRegister'];
            this.mobileVerificationShortcode = this.apiState.apiHome['mobileVerificationShortcode'];
        }
    };
</script>
