<template>

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

            <!-- Logo -->
            <Logo class="mx-auto"></Logo>

            <!-- Text Heading -->
            <TextHeader class="mt-10 text-center">Sign Up</TextHeader>

        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <form class="space-y-6" action="#" method="POST">

                <!-- Mobile Number Input -->
                <MobileNumberInput v-model="mobileNumber"></MobileNumberInput>

                <!-- Password Input -->
                <PasswordInput v-model="password" :showForgotPassword="false"></PasswordInput>

                <!-- Confirm Password Input -->
                <ConfirmPasswordInput v-model="passwordConfirmation"></ConfirmPasswordInput>

                <!-- Sign In Button -->
                <PrimaryButton :action="login">Create Account</PrimaryButton>

            </form>

            <!-- Login Link -->
            <p class="text-sm text-center mt-8">
                <span class="text-gray-500 mr-1">Already have an account?</span>
                <router-link :to="{ name: 'login' }">Login</router-link>
            </p>

        </div>

    </div>

</template>

<script>

    import axios from 'axios';
    import Logo from '@Partials/Logo.vue';
    import { RouterLink } from 'vue-router';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import ConfirmPasswordInput from '@Partials/inputs/ConfirmPasswordInput.vue';

    export default {
        components: { Logo, RouterLink, TextHeader, PasswordInput, PrimaryButton, MobileNumberInput, ConfirmPasswordInput },
        data() {
            return {
                password: '',
                apiHome: null,
                loginUrl: null,
                errorMessage: '',
                mobileNumber: '',
                passwordConfirmation: '',
            };
        },
        methods: {
            getApiHome() {
                axios.get('http://127.0.0.1:8001/api/v1')
                .then(response => {

                    //  Set the Login URL
                    this.loginUrl = response.data['_links']['login'];

                })
                .catch(error => {
                    this.errorMessage = error.response.data.message;
                });
            },
            login() {
                if(this.loginUrl != null) {

                }
                axios.post(this.loginUrl, {
                    mobileNumber: this.mobileNumber,
                    password: this.password
                })
                .then(response => {

                    //  Get the bearer token
                    const accessToken = response.data.accessToken;

                    // Set token to axios defaults to use it in future requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                    // Save token locally (you can use localStorage or sessionStorage)
                    localStorage.setItem('accessToken', accessToken);

                    // Redirect or do anything else you want upon successful login
                    // For example, you can redirect to another page:
                    // this.$router.push('/dashboard');
                })
                .catch(error => {
                    this.errorMessage = error.response.data.message;
                });
        },
        },
        created() {
            this.getApiHome();
        }
    };
</script>
