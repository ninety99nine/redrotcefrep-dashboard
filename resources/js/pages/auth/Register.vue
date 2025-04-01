<template>

    <div class="w-full grid grid-cols-2 bg-gradient-to-b from-blue-100 to-white-100 min-h-screen overflow-x-hidden">

        <div class="col-span-1 flex flex-col justify-center px-6 py-12 lg:px-8">

            <div class="sm:mx-auto sm:w-full sm:max-w-sm">

                <!-- Logo -->
                <Logo class="mx-auto"></Logo>

                <!-- Text Heading -->
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-10 text-center">Create your account</h1>

            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <div class="space-y-6">

                    <!-- Form Error Messages -->
                    <FormErrorMessages v-if="formState.hasGeneralError"></FormErrorMessages>

                    <template v-if="showVerificationCode">

                        <!-- Enter Verification Code Alert -->
                        <Alert>
                            Dial <span class="font-bold">{{ mobileVerificationShortcode }}</span> and enter the verification code below to confirm ownership of the mobile number <span class="font-bold">{{ mobileNumber }}</span>
                        </Alert>

                        <!-- Mobile Verification Pin Input -->
                        <OtpInput v-model="verificationCode" :errorText="formState.getFormError('verificationCode')"></OtpInput>

                    </template>

                    <template v-else>

                        <!-- Mobile Number Input -->
                        <MobileNumberInput
                            v-model="mobileNumber"
                            @keydown.enter="handleRegistration"
                            :errorText="formState.getFormError('mobileNumber')"
                            description="We will recognize this sim card when using Perfect Order on a mobile network e.g Orange">
                        </MobileNumberInput>

                        <template v-if="accountExists == false">

                            <div class="grid grid-cols-2 gap-4">

                                <div class="md:col-span-1 col-span-2">

                                    <!-- First Name Input -->
                                    <TextInput v-model="firstName" label="First Name" autocomplete="given-name" :errorText="formState.getFormError('firstName')" @keydown.enter="handleRegistration"></TextInput>

                                </div>

                                <div class="md:col-span-1 col-span-2">

                                    <!-- Last Name Input -->
                                    <TextInput v-model="lastName" label="Last Name" autocomplete="family-name" :errorText="formState.getFormError('lastName')" @keydown.enter="handleRegistration"></TextInput>

                                </div>

                            </div>

                            <template v-if="firstName && lastName">

                                <!-- Password Input -->
                                <PasswordInput v-model="password" :showForgotPassword="false" :errorText="formState.getFormError('password')" @keydown.enter="handleRegistration"></PasswordInput>

                                <!-- Confirm Password Input -->
                                <ConfirmPasswordInput v-model="passwordConfirmation" :errorText="formState.getFormError('passwordConfirmation')" @keydown.enter="handleRegistration"></ConfirmPasswordInput>

                            </template>

                        </template>

                    </template>

                    <!-- Create Account Button -->
                    <div class="flex">

                        <Button v-if="showVerificationCode" :action="backToRegistrationForm" type="light" size="sm" icon="short-left-arrow" class="w-16 mr-2"></Button>

                        <Button
                            size="sm"
                            class="w-full"
                            type="primary"
                            :loading="isSubmitting"
                            :disabled="isSubmitting"
                            :action="handleRegistration">
                            <template v-if="showVerificationCode">Create Account</template>
                            <template v-else>Continue</template>
                        </Button>

                    </div>

                </div>

                <!-- Social Sign In Links -->
                <SocialLinks message="Or sign up with"></SocialLinks>

                <!-- Register Link -->
                <p class="text-sm text-center mt-8">
                    <span class="text-gray-500 mr-1">Already have an account?</span>
                    <router-link :to="{ name: 'login' }">Login</router-link>
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

    import axios from 'axios';
    import settings from '@Js/settings.js';
    import { RouterLink } from 'vue-router';
    import Logo from '@Partials/logos/Logo.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import Button from '@Partials/buttons/Button.vue';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import SocialLinks from '@Pages/auth/components/SocialLinks.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import ConfirmPasswordInput from '@Partials/inputs/ConfirmPasswordInput.vue';
    import { validateRegister, register } from '@Repositories/auth-repository.js';

    export default {
        inject: ['apiState', 'formState', 'notificationState'],
        components: {
            Logo, Alert, Button, RouterLink, TextInput, PasswordInput, OtpInput,
            SocialLinks, MobileNumberInput, FormErrorMessages, ConfirmPasswordInput
        },
        data() {
            return {
                registerUrl: null,
                isSubmitting: false,
                accountExistsUrl: null,
                validateRegisterUrl: null,
                appName: settings.appName,
                mobileVerificationShortcode: null,

                accountExists: null,
                showVerificationCode: false,

                lastName: '',
                password: '',
                firstName: '',
                mobileNumber: '',
                verificationCode: '',
                passwordConfirmation: '',

                currentImageIndex: 0,
                slideShowSetInterval: null,
                images: [
                    '/images/lady-with-laptop.jpg'
                ]
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

                this.formState.hideFormErrors();

                if(this.showVerificationCode) {
                    this.attemptRegistration();
                }else if(this.accountExists == null) {
                    this.checkIfAccountExists();
                }else{
                    this.validateRegistration();
                }
            },
            checkIfAccountExists() {
                if(this.mobileNumber.trim() == '') {

                    this.formState.setFormError('mobileNumber', 'Enter your mobile number');

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
                         this.formState.setServerFormErrors(errorException);

                    });

                }else {
                    this.setGeneralFormError('The accountExistsUrl does not exist');
                }
            },
            validateRegistration() {

                if(this.firstName.trim() == '') {

                    this.formState.setFormError('firstName', 'Enter your first name');

                }else if(this.lastName.trim() == '') {

                    this.formState.setFormError('lastName', 'Enter your last name');

                }else if(this.mobileNumber.trim() == '') {

                    this.formState.setFormError('mobileNumber', 'Enter your mobile number');

                }else if(this.password.trim() == '') {

                    this.formState.setFormError('password', 'Enter your password');

                }else if(this.passwordConfirmation.trim() == '') {

                    this.formState.setFormError('passwordConfirmation', 'Enter your password confirmation');

                }else if(this.password != this.passwordConfirmation) {

                    this.formState.setFormError('password', 'Password does not match confirmation');

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

                            this.isSubmitting = false;

                            //  Show verification code
                            this.showVerificationCode = true;

                        }

                    }).catch(errorException => {

                        this.isSubmitting = false;
                        this.formState.setServerFormErrors(errorException);

                    });

                }else {
                    this.setGeneralFormError('The validateRegisterUrl does not exist');

                }
            },
            attemptRegistration() {

                if(this.verificationCode.trim() == '') {

                    this.formState.setFormError('verificationCode', 'Enter your verification code');

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

                            this.isSubmitting = false;

                            // Redirect to the dashboard
                            this.$router.replace({ name: 'show-stores'});

                            this.notificationState.showSuccessNotification('Welcome to ' + this.appName);

                        }

                    }).catch(errorException => {

                        this.isSubmitting = false;
                         this.formState.setServerFormErrors(errorException);

                    });

                }else {
                    this.setGeneralFormError('The registerUrl does not exist');

                }
            },
            backToRegistrationForm() {
                this.showVerificationCode = false;
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
            this.registerUrl = this.apiState.apiHome['_links']['register'];
            this.accountExistsUrl = this.apiState.apiHome['_links']['accountExists'];
            this.validateRegisterUrl = this.apiState.apiHome['_links']['validateRegister'];
            this.mobileVerificationShortcode = this.apiState.apiHome['mobileVerificationShortcode'];
        }
    };
</script>
