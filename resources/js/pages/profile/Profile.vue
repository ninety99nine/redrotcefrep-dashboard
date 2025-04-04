<template>

    <div class="px-16 pt-8">

        <div class="flex min-h-full flex-col justify-center">

            <div class="sm:mx-auto sm:w-full sm:max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6">

                <!-- Profile Photo -->
                <ProfilePhoto :user="authState.user" class="mx-auto" width="w-40" height="h-40"></ProfilePhoto>

                <!-- Profile Form -->
                <div class="mt-10 space-y-6">

                    <div class="grid grid-cols-2 gap-4">

                        <div class="md:col-span-1 col-span-2">

                            <!-- First Name Input -->
                            <TextInput
                                v-model="firstName"
                                label="First Name"
                                autocomplete="given-name"
                                :errorText="formState.getFormError('firstName')">
                            </TextInput>

                        </div>

                        <div class="md:col-span-1 col-span-2">

                            <!-- Last Name Input -->
                            <TextInput
                                label="Last Name"
                                v-model="lastName"
                                autocomplete="family-name"
                                :errorText="formState.getFormError('lastName')">
                            </TextInput>

                        </div>

                        <div class="md:col-span-2">

                            <!-- About Me Textarea -->
                            <TextareaInput
                                :rows="2"
                                label="About Me"
                                v-model="aboutMe"
                                :errorText="formState.getFormError('aboutMe')"
                                placeholder="Say something about yourself">
                            </TextareaInput>

                        </div>

                    </div>

                    <!-- Change Password Toggle Switch -->
                    <ToggleSwitch v-model="changePassword">Change Password</ToggleSwitch>

                    <template v-if="changePassword">

                        <!-- Current Password Input -->
                        <CurrentPasswordInput
                            v-model="currentPassword"
                            :showForgotPassword="false"
                            :errorText="formState.getFormError('currentPassword')">
                        </CurrentPasswordInput>

                        <!-- Password Input -->
                        <PasswordInput
                            v-model="password"
                            :showForgotPassword="false"
                            :errorText="formState.getFormError('password')" >
                        </PasswordInput>

                        <!-- Confirm Password Input -->
                        <ConfirmPasswordInput
                            v-model="passwordConfirmation"
                            :errorText="formState.getFormError('passwordConfirmation')">
                        </ConfirmPasswordInput>

                    </template>

                    <!-- Change Mobile NUmber Toggle Switch -->
                    <ToggleSwitch v-model="changeMobileNumber">Change Mobile Number</ToggleSwitch>

                    <template v-if="changeMobileNumber">

                        <!-- Mobile Number Input -->
                        <MobileNumberInput
                            v-model="mobileNumber"
                            :errorText="formState.getFormError('mobileNumber')">
                        </MobileNumberInput>

                        <template v-if="hasChangedMobileNumber">

                            <!-- Enter Verification Code Alert -->
                            <Alert>
                                Dial <span class="font-bold">{{ mobileVerificationShortcode }}</span> on <span class="font-bold">{{ mobileNumber }}</span> to confirm ownership of this mobile number.
                            </Alert>

                            <!-- Mobile Verification Pin Input -->
                            <OtpInput v-model="verificationCode" :errorText="formState.getFormError('verificationCode')"></OtpInput>

                        </template>

                    </template>

                    <!-- Form Error Messages -->
                    <FormErrorMessages></FormErrorMessages>

                    <!-- Save Changes Button -->
                    <Button type="primary" size="xs" :action="updateUser" :loading="isSubmitting" class="w-full">
                        Save Changes
                    </Button>

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import { initFlowbite } from "flowbite";
    import Alert from '@Partials/alerts/Alert.vue';
    import Button from '@Partials/buttons/Button.vue';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import ProfilePhoto from '@Components/user/ProfilePhoto.vue';
    import { updateUser } from '@Repositories/user-repository.js';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import ConfirmPasswordInput from '@Partials/inputs/ConfirmPasswordInput.vue';
    import CurrentPasswordInput from '@Partials/inputs/CurrentPasswordInput.vue';

    export default {
        inject: ['apiState', 'authState', 'formState', 'notificationState'],
        components: {
            Alert, Button, TextInput, TextareaInput, PasswordInput, OtpInput,
            MoreInfoPopover, ProfilePhoto, ToggleSwitch, MobileNumberInput,
            FormErrorMessages ,ConfirmPasswordInput, CurrentPasswordInput
        },
        data() {
            return {
                isSubmitting: false,
                changePassword: false,
                changeMobileNumber: false,

                aboutMe: '',
                lastName: '',
                firstName: '',
                password: '',
                mobileNumber: '',
                currentPassword: '',
                verificationCode: '',
                originalMobileNumber: '',
                passwordConfirmation: '',
                mobileVerificationShortcode: null
            }
        },
        computed: {
            hasChangedMobileNumber() {
                return this.originalMobileNumber.length == 8 && this.originalMobileNumber != this.mobileNumber;
            }
        },
        methods: {
            setUserDetails() {
                this.aboutMe = this.authState.user.aboutMe;
                this.lastName = this.authState.user.lastName;
                this.firstName = this.authState.user.firstName;
                this.mobileNumber = this.authState.user.mobileNumber.national;
                this.originalMobileNumber = this.authState.user.mobileNumber.national;
                this.mobileVerificationShortcode = this.apiState.apiHome['mobileVerificationShortcode'];
            },
            updateUser() {

                this.formState.hideFormErrors();

                if(this.firstName.trim() == '') {

                    this.formState.setFormError('firstName', 'Enter your first name');

                }else if(this.lastName.trim() == '') {

                    this.formState.setFormError('lastName', 'Enter your last name');

                }else if(this.changePassword && this.currentPassword.trim() == '') {

                    this.formState.setFormError('currentPassword', 'Enter your current password');

                }else if(this.changePassword && this.password.trim() == '') {

                    this.formState.setFormError('password', 'Enter your password');

                }else if(this.changePassword && this.passwordConfirmation.trim() == '') {

                    this.formState.setFormError('passwordConfirmation', 'Enter your password confirmation');

                }else if(this.changePassword && this.password != this.passwordConfirmation) {

                    this.formState.setFormError('password', 'Password does not match confirmation');

                }else if(this.changeMobileNumber && this.mobileNumber.trim() == '') {

                    this.formState.setFormError('mobileNumber', 'Enter your mobile number');

                }else if(this.changeMobileNumber && this.hasChangedMobileNumber && this.verificationCode.trim() == '') {

                    this.formState.setFormError('verificationCode', 'Enter your verification code');

                }else {

                    let data = {
                        lastName: this.lastName,
                        firstName: this.firstName,
                    }

                    if(this.aboutMe != null && this.aboutMe.length) {
                        data['aboutMe'] = this.aboutMe;
                    }

                    if(this.changePassword) {
                        data['password'] = this.password;
                        data['currentPassword'] = this.currentPassword;
                        data['passwordConfirmation'] = this.passwordConfirmation;
                    }

                    if(this.changeMobileNumber && this.hasChangedMobileNumber) {
                        data['mobileNumber'] = this.mobileNumber;
                        data['verificationCode'] = this.verificationCode;
                    }

                    //  Start loader
                    this.isSubmitting = true;

                    updateUser(this.authState.user, data).then(response => {

                        if(response.status == 200) {

                            this.isSubmitting = false;

                            this.password = '';
                            this.currentPassword = '';
                            this.changePassword = false;
                            this.passwordConfirmation = '';
                            this.changeMobileNumber = false;
                            this.originalMobileNumber = this.mobileNumber;

                            /**
                             *  Update the "useAuthState().user".
                             *  This will allow the entire app to capture the latest instance
                             *  of this updated user.
                             */
                            this.authState.user = response.data;

                            this.notificationState.showSuccessNotification('Profile updated');

                        }

                    }).catch(errorException => {

                        this.isSubmitting = false;
                        this.formState.setServerFormErrors(errorException);

                    });

                }
            }
        },
        mounted() {

            /**
             *  Flowbite javascript will not work unless we deliberately
             *  Initialize Flowbite on mount of the Vue component.
             *
             *  Reference: https://stackoverflow.com/questions/76043935/flowbite-is-not-working-with-inertia-laravel-app
             */
            initFlowbite();

        },
        created() {
            this.setUserDetails();
        }
    };

</script>
