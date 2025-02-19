<template>

    <div class="min-h-screen flex flex-col items-center pt-20 pb-40">

        <div class="w-full max-w-lg">

            <!-- Store Logo -->
            <StoreLogo :showButton="false" class="flex justify-center mb-4"></StoreLogo>

            <!-- Heading -->
            <h2 class="text-2xl font-semibold text-center mb-2">Connect Your Socials</h2>

            <!-- Instruction -->
            <p class="text-gray-500 text-center mb-6">Make it easy for customers to find and follow you</p>

        </div>

        <div class="w-full max-w-lg">

            <div class="mb-4">

                <!-- Social Links (Loading Placeholder) -->
                <div v-if="isLoadingSocialMediaIcons" class="space-y-2">

                    <div v-for="(_, index) in [1,2,3]" :key="index" class="border shadow-sm rounded-lg p-4 bg-gray-50">
                        <ShineEffect class="w-full flex items-center space-x-2">
                                <LineSkeleton width="w-8"></LineSkeleton>
                                <LineSkeleton width="w-40"></LineSkeleton>
                        </ShineEffect>
                    </div>

                </div>

                <!-- Social Links -->
                <div v-else class="space-y-3 mb-4">

                    <div
                        :key="index"
                        v-for="(socialLink, index) in socialLinks"
                        class="bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                        <div class="flex justify-between items-center">

                            <div class="flex items-center space-x-2 font-bold">

                                <!-- Logo -->
                                <div class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                                    <img
                                        alt="Social Media Logo"
                                        class="h-full object-contain"
                                        :src="getMatchingSocialMediaIcon(socialLink.name).icon"
                                    />
                                </div>

                                <!-- Name -->
                                <span class="text-sm">
                                    {{ socialLink.name }}
                                </span>

                            </div>

                            <!-- Active Toogle Switch -->
                            <ToogleSwitch
                                size="md"
                                v-model="socialLink.active">
                            </ToogleSwitch>

                        </div>

                        <!-- Social Link Input -->
                        <div
                            class="w-full mt-4"
                            v-if="socialLink.active">
                            <TextInput
                                placeholder="https://"
                                v-model="socialLink.link"
                                :label="`${capitalize(socialLink.name)} link`"
                                :errorText="getFormError('socialLinks'+index+'Link')">
                            </TextInput>

                            <!-- Validation Error Message -->
                            <p
                                v-if="hasMatchingSocialLinkError(socialLink.name)"
                                class="flex space-x-1 text-xs text-yellow-600 font-semibold bg-yellow-100 border border-yellow-300 p-3 rounded-lg shadow-md mt-2">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                                <span>{{ getMatchingSocialLinkError(socialLink.name) }}</span>
                            </p>


                        </div>

                    </div>

                </div>

            </div>

            <!-- Validation Error Messages -->
            <div
                v-if="hasSocialLinkValidationErrors"
                class="list-disc text-xs text-yellow-600 bg-yellow-100 border border-yellow-300 py-3 px-4 rounded-lg shadow-md mb-4">

                <!-- Heading -->
                <p class="text-lg font-semibold mb-2">Resolve these to continue</p>

                <!-- Errors -->
                <ul class="space-y-1">
                    <li
                        :key="index"
                        v-for="(paymentMethodValidationError, index) in socialLinkValidationErrors">
                        {{ paymentMethodValidationError.message }}
                    </li>
                </ul>

            </div>

            <!-- Total Supported Social Links -->
            <div
                v-else
                class="text-blue-600 bg-blue-100 border border-blue-300 p-3 rounded-lg shadow-md mb-4">

                <div class="flex items-center space-x-2">
                    <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                    </svg>

                    <div>
                        <p v-if="hasSelectedSocialLinks" class="text-sm font-semibold">{{ store.name }} supports <span class="font-bold">{{ totalSelectedSocialLinks }} {{ totalSelectedSocialLinks == 1 ? 'social platform' : 'social platforms' }}</span></p>
                        <p :class="[hasSelectedSocialLinks ? 'text-xs' : 'text-sm font-semibold']">You can always {{ hasSelectedSocialLinks ? 'add more' : 'add' }} social links later! 😊</p>
                    </div>
                </div>
            </div>

            <!-- Form Error Messages -->
            <FormErrorMessages class="mb-4"></FormErrorMessages>

            <div class="flex justify-end">

                <transition name="fade-1" mode="out-in">

                    <!-- Continue -->
                    <PrimaryButton
                        class="w-full"
                        :action="updateStore"
                        :loading="isSubmittingStore"
                        v-if="socialLinksHaveChanged || hasSelectedSocialLinks"
                        :disabled="isSubmittingStore || hasSocialLinkValidationErrors">
                        Continue
                    </PrimaryButton>

                    <!-- Skip -->
                    <PrimaryButton
                        v-else
                        type="light"
                        class="w-40"
                        :action="navigateToAddAdvancedFeatures">
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

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import { getApi, putApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            TextInput, StoreLogo, ShineEffect, LineSkeleton, PrimaryButton,
            ToogleSwitch, FormErrorMessages
        },
        data() {
            return {
                socialLinks: [],
                socialMediaIcons: [],
                originalSocialLinks: [],
                apiState: useApiState(),
                isSubmittingStore: false,
                storeState: useStoreState(),
                isLoadingSocialMediaIcons: false,
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            hasSelectedSocialLinks() {
                return this.socialLinks.some(socialLink => socialLink.active);
            },
            totalSelectedSocialLinks() {
                return this.socialLinks.filter(socialLink => socialLink.active).length;
            },
            socialLinksHaveChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.socialLinks);
                var b = cloneDeep(this.originalSocialLinks);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            socialLinkValidationErrors() {
                return this.socialLinks
                    .filter(socialLink => socialLink.active)
                    .map(socialLink => {
                        const regex = new RegExp('^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)?[a-zA-Z0-9-]+\\.[a-zA-Z]{2,6}(:[0-9]{1,5})?(\\/[^\\s]*)?$');

                        let message = '';

                        if (socialLink.link.trim() === '') {
                            message = `The ${socialLink.name} link is required`;
                        } else if (!regex.test(socialLink.link.trim())) {
                            message = `The ${socialLink.name} link is incorrect`;
                        }

                        return message ? { name: socialLink.name, message } : null;
                    })
                    .filter(error => error !== null); // Remove null values
            },
            hasSocialLinkValidationErrors() {
                return this.socialLinkValidationErrors.length > 0;
            },
        },
        methods: {
            hasMatchingSocialLinkError(name) {
                return this.socialLinkValidationErrors.some(socialLinkValidationError => socialLinkValidationError.name == name);
            },
            getMatchingSocialLinkError(name) {
                const socialLinkValidationError = this.socialLinkValidationErrors.find(socialLinkValidationError => socialLinkValidationError.name == name);
                return socialLinkValidationError ? socialLinkValidationError.message : null;
            },
            getMatchingSocialMediaIcon(name) {
                return this.socialMediaIcons.find(socialMediaIcon => socialMediaIcon.name.toLowerCase() === name.toLowerCase());
            },
            showSocialMediaIcons() {

                if(this.socialMediaIcons.length) return;

                //  Start loader
                this.isLoadingSocialMediaIcons = true;

                getApi(this.apiState.apiHome['_links']['showSocialMediaIcons']).then(response => {

                    if(response.status == 200) {

                        this.socialMediaIcons = response.data;

                        this.socialLinks = cloneDeep(this.socialMediaIcons.map((socialMediaIcon) => {

                            const socialLink = this.store.socialLinks.find((socialLink) => socialLink.name.toLowerCase() == socialMediaIcon.name.toLowerCase());

                            return socialLink ? socialLink :  {
                                link: '',
                                active: false,
                                name: socialMediaIcon.name,
                            }

                        }));

                        this.originalSocialLinks = cloneDeep(this.socialLinks);

                    }

                    //  Stop loader
                    this.isLoadingSocialMediaIcons = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingSocialMediaIcons = false;

                    this.setServerFormErrors(errorException);

                });

            },
            updateStore() {

                this.isSubmittingStore = true;

                const socialLinks = this.socialLinks.filter((socialLink) => socialLink.link != null && socialLink.link.trim() != '');

                const data = {
                    return: '1',
                    socialLinks: socialLinks
                }

                putApi(this.store._links.updateStore, data).then(response => {

                    if(response.status == 200 && response.data['updated'] == true) {

                        this.showSuccessfulNotification('Social links updated');
                        this.originalSocialLinks = cloneDeep(this.socialLinks);
                        this.storeState.setStore(response.data.store);
                        this.navigateToAddAdvancedFeatures();

                    }else{

                        this.showUnsuccessfulNotification(response.data.message ?? 'Social link update failed');
                        useNotificationState().addWarningNotification(response.data.message);

                    }

                    this.isSubmittingStore = false;

                }).catch(errorException => {

                    this.isSubmittingStore = false;
                    this.setServerFormErrors(errorException);

                });

            },
            navigateToAddAdvancedFeatures() {
                this.$router.push({
                    name: 'advanced-features',
                    params: { 'store_href': this.store._links.showStore }
                });
            }
        },
        beforeRouteLeave(to, from, next) {

            if (this.isSubmittingStore || this.socialLinksHaveChanged) {

                const answer = window.confirm("You have unsaved changes. Are you sure you want to leave?");

                if (!answer) {
                    return next(false);
                }

            }

            next();
        },
        created() {
            this.showSocialMediaIcons();
        }
    };

</script>
