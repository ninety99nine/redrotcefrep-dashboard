<template>

    <div class="min-h-screen flex flex-col items-center pt-20 pb-40">

        <div class="w-full max-w-lg">

            <!-- Store Logo -->
            <StoreLogo :showButton="false" class="flex justify-center mb-4"></StoreLogo>

            <!-- Heading -->
            <h2 class="text-2xl font-semibold text-center mb-2">Add Payment Methods</h2>

            <!-- Instruction -->
            <p class="text-gray-500 text-center mb-6">Make it easy for customers to pay! Pick the payment options you’d like to accept</p>

        </div>

        <div class="w-full max-w-lg">

            <!-- Payment Methods -->
            <div class="space-y-3 mb-4">

                <div
                    :key="paymentMethodIndex"
                    v-for="(paymentMethod, paymentMethodIndex) in paymentMethods"
                    class="bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                    <div class="flex justify-between items-center">

                        <div class="flex items-center space-x-2 font-bold">

                            <!-- Logo -->
                            <div class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                                <img
                                    alt="Payment Method Logo"
                                    class="h-full object-contain"
                                    :src="paymentMethod.configs.logo && paymentMethod.configs.logo.filePath ? paymentMethod.configs.logo.filePath : paymentMethod.logo"
                                />
                            </div>

                            <!-- Name -->
                            <span class="text-sm">{{ paymentMethod.type == 'other' && paymentMethod.customName ? paymentMethod.customName : paymentMethod.name }}</span>

                        </div>

                        <!-- Active Toogle Switch -->
                        <ToogleSwitch
                            size="md"
                            v-model="paymentMethod.active">
                        </ToogleSwitch>

                    </div>

                    <!-- Configurations -->
                    <PaymentMethodConfigInputs
                        :paymentMethod="paymentMethod"
                        :paymentMethodIndex="paymentMethodIndex">
                    </PaymentMethodConfigInputs>

                </div>

            </div>

            <!-- Validation Error Messages -->
            <div
                v-if="hasPaymentMethodValidationErrors"
                class="list-disc text-xs text-yellow-600 bg-yellow-100 border border-yellow-300 py-3 px-4 rounded-lg shadow-md mb-4">

                <!-- Heading -->
                <p class="text-lg font-semibold mb-2">Resolve these to continue</p>

                <!-- Errors -->
                <ul class="space-y-1">
                    <li
                        :key="index"
                        v-for="(paymentMethodValidationError, index) in paymentMethodValidationErrors">
                        {{ paymentMethodValidationError }}
                    </li>
                </ul>

            </div>

            <!-- Total Supported Payment Methods -->
            <div
                v-else
                class="text-blue-600 bg-blue-100 border border-blue-300 p-3 rounded-lg shadow-md mb-4">

                <div class="flex items-center space-x-2">
                    <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    <div>
                        <p v-if="hasSelectedPaymentMethods" class="text-sm font-semibold">{{ store.name }} supports <span class="font-bold">{{ totalSelectedPaymentMethods }} {{ totalSelectedPaymentMethods == 1 ? 'payment method' : 'payment methods' }}</span></p>
                        <p :class="[hasSelectedPaymentMethods ? 'text-xs' : 'text-sm font-semibold']">You can always {{ hasSelectedPaymentMethods ? 'add more' : 'add' }} payment options later! 😊</p>
                    </div>
                </div>
            </div>

            <!-- Global Upload Progress Bar -->
            <div v-if="isSubmittingPaymentMethods || isUploading || (progressPercentage === 100)" class="mb-4">
                <div class="w-full max-w-lg bg-gray-200 rounded-full h-2 mb-2">
                    <div
                        class="h-2 rounded-full transition-all duration-500"
                        :class="progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'"
                        :style="{ width: progressPercentage + '%' }">
                    </div>
                </div>
                <p class="text-xs text-center mt-2 font-bold">
                    {{ progressPercentage === 100 ? 'Payment Methods Ready 🎉' : `${uploadMessage} (${progressPercentage}%)` }}
                </p>
            </div>

            <div
                v-if="hasFailedUploads"
                class="text-xs text-blue-600 font-semibold bg-blue-100 border border-blue-300 p-3 rounded-lg shadow-md mb-4">

                <div class="flex items-center space-x-2">
                    <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    <div>
                        <p>
                            We could not upload
                            <span v-if="totalFailedUploads">
                                {{ totalFailedUploads }} {{ totalFailedUploads == 1 ? 'photo' : 'photos' }}.
                            </span>
                        </p>
                        <p>But no worries—you can always add more later! 😊</p>
                    </div>
                </div>

                <div class="mt-2 p-2 border-t border-dotted border-blue-300">
                    <ul class="font-normal space-y-1">
                        <li>✅ Make sure you’re uploading images (jpeg, jpg, png, gif or svg).</li>
                        <li>✅ Ensure your images are not too large (we accept up to 5MB).</li>
                        <li>✅ Use
                            <a href="https://tinypng.com/" target="_blank" class="underline inline-flex items-center">
                                tinypng.com
                                <svg class="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                            to reduce image size (it’s free).
                        </li>
                    </ul>
                </div>

            </div>

            <div class="flex justify-end">

                <transition name="fade-1" mode="out-in">

                    <!-- Continue -->
                    <PrimaryButton
                        class="w-full"
                        :action="submitPaymentMethods"
                        :loading="isSubmittingPaymentMethods"
                        v-if="hasSelectedPaymentMethods || hasAssociatedPaymentMethods"
                        :disabled="isLoadingAssociatedPaymentMethods || isLoadingUnassociatedPaymentMethods || isSubmittingPaymentMethods || hasPaymentMethodValidationErrors">
                        Continue
                    </PrimaryButton>

                    <!-- Skip -->
                    <PrimaryButton
                        v-else
                        type="light"
                        class="w-40"
                        :action="navigateToAddSocials">
                        <span>Skip</span>
                        <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </PrimaryButton>

                </transition>

            </div>

        </div>

    </div>

</template>

<script>

    import StoreLogo from '@Components/store/StoreLogo.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import { useOnboardingState } from '@Stores/onboarding-store.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import PaymentMethodConfigInputs from '@Pages/stores/onboarding/PaymentMethodConfigInputs/Index.vue';

    export default {
        components: { StoreLogo, PrimaryButton, ToogleSwitch, PaymentMethodConfigInputs },
        data() {
            return {
                uploadsFailedBefore: false,
                onboardingState: useOnboardingState()
            };
        },
        computed: {
            logo() {
                return this.onboardingState.logo;
            },
            store() {
                return this.onboardingState.store;
            },
            isUploading() {
                return this.onboardingState.isUploading;
            },
            uploadMessage() {
                return this.onboardingState.uploadMessage;
            },
            hasFailedUploads() {
                return this.onboardingState.hasFailedUploads;
            },
            paymentMethods() {
                return this.onboardingState.paymentMethods;
            },
            totalFailedUploads() {
                return this.onboardingState.totalFailedUploads;
            },
            totalCompletedSteps() {
                return this.onboardingState.totalCompletedSteps;
            },
            totalCompletionSteps() {
                return this.onboardingState.totalCompletionSteps;
            },
            progressPercentage() {
                return this.onboardingState.progressPercentage;
            },
            hasChangedPaymentMethods() {
                return this.onboardingState.hasChangedPaymentMethods;
            },
            isSubmittingPaymentMethods() {
                return this.onboardingState.isSubmittingPaymentMethods;
            },
            hasSelectedPaymentMethods() {
                return this.onboardingState.hasSelectedPaymentMethods;
            },
            hasAssociatedPaymentMethods() {
                return this.onboardingState.hasAssociatedPaymentMethods;
            },
            totalSelectedPaymentMethods() {
                return this.onboardingState.totalSelectedPaymentMethods;
            },
            paymentMethodValidationErrors() {
                return this.onboardingState.paymentMethodValidationErrors;
            },
            hasPaymentMethodValidationErrors() {
                return this.onboardingState.hasPaymentMethodValidationErrors;
            },
            isLoadingAssociatedPaymentMethods() {
                return this.onboardingState.isLoadingAssociatedPaymentMethods;
            },
            isLoadingUnassociatedPaymentMethods() {
                return this.onboardingState.isLoadingUnassociatedPaymentMethods;
            },
        },
        methods: {
            submitPaymentMethods() {

                if(this.isSubmittingPaymentMethods || this.isUploading) return;

                this.onboardingState.submitPaymentMethods().then(() => {

                    if (this.totalFailedUploads == 0 || this.uploadsFailedBefore) {

                        this.navigateToAddSocials();

                    }else{

                        this.uploadsFailedBefore = true;

                    }

                });

            },
            navigateToAddSocials() {
                this.$router.push({
                    name: 'add-socials',
                    params: { 'store_href': this.store._links.showStore }
                });
            }
        },
        beforeRouteLeave(to, from, next) {

            if (this.isSubmittingPaymentMethods || this.isUploading || (this.hasChangedPaymentMethods && this.progressPercentage != 100 && !this.hasFailedUploads)) {

                const answer = window.confirm("You have unsaved changes. Are you sure you want to leave?");

                if (!answer) {
                    return next(false);
                }

            }

            next();
        },
        created() {
            this.onboardingState.reset();
            this.onboardingState.showAssociatedPaymentMethods();
            this.onboardingState.showUnassociatedPaymentMethods();
        }
    };
  </script>
