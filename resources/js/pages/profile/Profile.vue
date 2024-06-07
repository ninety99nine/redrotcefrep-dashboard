<template>

    <div class="px-16 pt-8">

        <div class="flex min-h-full flex-col justify-center">

            <div class="sm:mx-auto sm:w-full sm:max-w-md p-4 border border-gray-200 rounded-lg shadow sm:p-6">

                <!-- Profile Photo -->
                <ProfilePhoto :user="authState.user" class="mx-auto" width="w-40" height="h-40"></ProfilePhoto>

                <!-- Profile Form -->
                <form class="mt-10 space-y-6" action="#" method="POST">

                    <div class="grid grid-cols-2 gap-4">

                        <div class="md:col-span-1 col-span-2">

                            <!-- First Name Input -->
                            <TextInput v-model="firstName" label="First Name" _autocomplete="given-name" :errorText="getFormError('firstName')" @keydown.enter="updateUser"></TextInput>

                        </div>

                        <div class="md:col-span-1 col-span-2">

                            <!-- Last Name Input -->
                            <TextInput v-model="lastName" label="Last Name" _autocomplete="family-name" :errorText="getFormError('lastName')" @keydown.enter="updateUser"></TextInput>

                        </div>

                        <div class="md:col-span-2">

                            <!-- About Me Textarea -->
                            <TextareaInput v-model="aboutMe" label="About Me" _placeholder="Say something about yourself" :_rows="2" :errorText="getFormError('aboutMe')" @keydown.enter="updateUser"></TextareaInput>

                        </div>

                    </div>

                    <!-- Change Password Toggle Switch -->
                    <ToogleSwitch v-model="changePassword">Change Password</ToogleSwitch>

                    <template v-if="changePassword">

                        <!-- Current Password Input -->
                        <CurrentPasswordInput v-model="currentPassword" :showForgotPassword="false" :errorText="getFormError('currentPassword')" @keydown.enter="updateUser"></CurrentPasswordInput>

                        <!-- Password Input -->
                        <PasswordInput v-model="password" :showForgotPassword="false" :errorText="getFormError('password')" @keydown.enter="updateUser"></PasswordInput>

                        <!-- Confirm Password Input -->
                        <ConfirmPasswordInput v-model="passwordConfirmation" :errorText="getFormError('passwordConfirmation')" @keydown.enter="updateUser"></ConfirmPasswordInput>

                    </template>

                    <!-- Change Mobile NUmber Toggle Switch -->
                    <ToogleSwitch v-model="changeMobileNumber">Change Mobile Number</ToogleSwitch>

                    <template v-if="changeMobileNumber">

                        <!-- Mobile Number Input -->
                        <MobileNumberInput v-model="mobileNumber" :errorText="getFormError('mobileNumber')" @keydown.enter="updateUser"></MobileNumberInput>

                        <template v-if="hasChangedMobileNumber">

                            <!-- Enter Verification Code Alert -->
                            <Alert>
                                Dial <span class="font-bold">{{ mobileVerificationShortcode }}</span> on <span class="font-bold">{{ mobileNumber }}</span> to confirm ownership of this mobile number.
                            </Alert>

                            <!-- Mobile Verification Pin Input -->
                            <OtpInput v-model="verificationCode" :errorText="getFormError('verificationCode')"></OtpInput>

                        </template>

                    </template>

                    <!-- General Error Info Alert -->
                    <Alert v-if="getFormError('general')" class="mt-4 mb-0 mx-auto max-w-96" type="warning">
                        {{ getFormError('general') }}
                    </Alert>

                    <!-- Save Changes Button -->
                    <PrimaryButton :action="updateUser" :loading="isSubmitting" class="w-full">
                        Save Changes
                    </PrimaryButton>

                </form>

            </div>

        </div>

    </div>

</template>

<script>

    import { initFlowbite } from "flowbite";
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import ProfilePhoto from '@Components/user/ProfilePhoto.vue';
    import { updateUser } from '@Repositories/user-repository.js';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { useNotificationState } from '@Stores/notification-store.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import ConfirmPasswordInput from '@Partials/inputs/ConfirmPasswordInput.vue';
    import CurrentPasswordInput from '@Partials/inputs/CurrentPasswordInput.vue';

    export default {
        mixins: [FormMixin],
        components: {
            Alert, TextInput, TextareaInput, PasswordInput, OtpInput, PrimaryButton,
            MoreInfoPopover, ProfilePhoto, ToogleSwitch, ConfirmPasswordInput, CurrentPasswordInput
        },
        data() {
            return {
                isSubmitting: false,
                changePassword: false,
                apiState: useApiState(),
                authState: useAuthState(),
                changeMobileNumber: false,
                notificationState: useNotificationState(),

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
                this.mobileNumber = this.authState.user.mobileNumber.withoutExtension;
                this.originalMobileNumber = this.authState.user.mobileNumber.withoutExtension;
                this.mobileVerificationShortcode = this.apiState.apiHome['mobileVerificationShortcode'];
            },
            updateUser() {

                /**
                 *  Note: the hideFormErrors() method is part of the FormMixin methods
                 */
                this.hideFormErrors();

                /**
                 *  Note: the setFormError() method is part of the FormMixin methods
                 */
                if(this.firstName.trim() == '') {

                    this.setFormError('firstName', 'Enter your first name');

                }else if(this.lastName.trim() == '') {

                    this.setFormError('lastName', 'Enter your last name');

                }else if(this.changePassword && this.currentPassword.trim() == '') {

                    this.setFormError('currentPassword', 'Enter your current password');

                }else if(this.changePassword && this.password.trim() == '') {

                    this.setFormError('password', 'Enter your password');

                }else if(this.changePassword && this.passwordConfirmation.trim() == '') {

                    this.setFormError('passwordConfirmation', 'Enter your password confirmation');

                }else if(this.changePassword && this.password != this.passwordConfirmation) {

                    this.setFormError('password', 'Password does not match confirmation');

                }else if(this.changeMobileNumber && this.mobileNumber.trim() == '') {

                    this.setFormError('mobileNumber', 'Enter your mobile number');

                }else if(this.changeMobileNumber && this.hasChangedMobileNumber && this.verificationCode.trim() == '') {

                    this.setFormError('verificationCode', 'Enter your verification code');

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

                            //  Stop loader
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

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Profile updated');

                        }

                    }).catch(errorException => {

                        this.isSubmitting = false;

                        /**
                         *  Note: the setServerFormErrors() method is part of the FormMixin methods
                         */
                        this.setServerFormErrors(errorException);

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
