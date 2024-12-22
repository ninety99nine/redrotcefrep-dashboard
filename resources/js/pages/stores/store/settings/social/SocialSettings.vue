<template>

    <div class="bg-white shadow-lg border p-8 rounded-lg mb-4">

        <h1 class="text-lg font-bold mb-2">Social Links</h1>

        <p class="text-sm text-gray-500">
            Connect with your customers!
        </p>

        <p class="text-sm text-gray-500">
            Share your store’s social pages, groups, channels, or profiles to showcase your online community.
        </p>

        <!-- Form -->
        <form class="mt-4" action="#" method="POST">

            <div class="space-y-4">

                <!-- Form Error Messages -->
                <FormErrorMessages></FormErrorMessages>

                <!-- Save Changes Info Alert -->
                <Alert v-if="mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                    <div class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>Please save your changes</span>
                    </div>

                    <div class="flex items-center space-x-2">

                        <!-- Undo Button -->
                        <UndoButton :action="resetForm" type="light" size="xs">
                            <span class="ml-1">Undo</span>
                        </UndoButton>

                        <!-- Save Changes Button -->
                        <PrimaryButton :action="updateStore" :loading="isSubmitting" class="w-40">
                            Save Changes
                        </PrimaryButton>

                    </div>

                </Alert>

                <draggable
                    class="space-y-2"
                    v-model="form.socialLinks"
                    handle=".draggable-handle"
                    ghost-class="bg-yellow-50">
                    <div v-for="(socialLink, index) in form.socialLinks" :key="index" class="flex items-center justify-between space-x-4">

                        <!-- Social Link Input -->
                        <div class="w-full">
                            <TextInput
                                placeholder="https://"
                                v-model="form.socialLinks[index].link"
                                :errorText="getFormError('socialLinks'+index+'Name') || getFormError('socialLinks'+index+'Link')">

                                <template #prepend>
                                    <div class="flex items-center py-1.5 pl-4 pr-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap">
                                        <img v-if="hasMatchingSocialMediaIcon(socialLink.name)" class="w-8" :src="settings.domainUrl+'/images/social-icons/'+socialLink.name.toLowerCase()+'.png'" />
                                        <template v-else>
                                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                            </svg>
                                            <span>{{ socialLink.name }}</span>
                                        </template>
                                    </div>
                                </template>

                            </TextInput>
                        </div>

                        <svg v-if="!this.hasMatchingSocialMediaIcon(socialLink.name)" @click="() => removeSocialLink(socialLink.name)" class="w-4 h-4 cursor-pointer hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        <!-- Drag & Drop Handle -->
                        <svg class="draggable-handle w-4 h-4 cursor-grab hover:text-yellow-500 active:cursor-grabbing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>

                    </div>
                </draggable>

                <div class="flex justify-end">

                    <BasicModal>

                        <template #content="slotProps">

                            <h1 class="font-lg font-bold mb-2">Add Social Link</h1>

                            <p class="text-sm text-gray-500 mb-4">Give us the name of the the social media platform and your store link</p>

                            <div class="space-y-4">

                                <!-- Name Input -->
                                <TextInput
                                    placeholder="MySpace"
                                    v-model="socialLink.name">
                                </TextInput>

                                <!-- Social Link Input -->
                                <TextInput
                                    v-model="socialLink.link"
                                    placeholder="https://">
                                </TextInput>

                            </div>

                            <PrimaryButton v-if="canAddSocialLink" :action="() => addSocialLink(slotProps.hideModal)" size="sm" type="success" class="mt-4">
                                Add
                            </PrimaryButton>

                        </template>

                        <template #trigger="triggerProps">

                            <!-- Add Button - Triggers Modal -->
                            <slot name="trigger" :showModal="triggerProps.showModal">
                                <AddButton @click="triggerProps.showModal" size="sm">
                                    <span class="ml-2">Add</span>
                                </AddButton>
                            </slot>

                        </template>

                    </BasicModal>

                </div>

            </div>

        </form>

    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import settings from '@Js/settings.js';
    import cloneDeep from 'lodash/cloneDeep';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicModal from '@Partials/modals/BasicModal.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import { getApi, putApi, postApi, postFileApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            Alert, draggable: VueDraggableNext, TextInput, TextHeader, StoreLogo, AddButton,
            BasicModal, UndoButton, TextareaInput, PrimaryButton, ToogleSwitch,
            MobileNumberInput, FormErrorMessages
        },
        data() {
            return {
                form: {
                    socialLinks: []
                },
                socialLink: {
                    name: '',
                    link: ''
                },
                settings: settings,
                originalForm: null,
                isSubmitting: false,
                socialMediaIcons: [],
                apiState: useApiState(),
                isLoadingSocialMediaIcons: false,
                storeState: useStoreState(),
            }
        },
        watch: {

        },
        computed: {
            store() {
                return this.storeState.store;
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            canAddSocialLink() {
                return this.socialLink.name.length && this.socialLink.link.length
            },
            mustSaveChanges() {
                return this.formHasChanged && !this.isSubmitting;
            }
        },
        methods: {
            setStoreFields() {
                this.form.socialLinks = this.store.socialLinks;

                this.ensureSocialLink('Whatsapp');
                this.ensureSocialLink('Telegram');
                this.ensureSocialLink('Messenger');
                this.ensureSocialLink('Facebook');
                this.ensureSocialLink('Instagram');
                this.ensureSocialLink('LinkedIn');
                this.ensureSocialLink('YouTube');
                this.ensureSocialLink('Snapchat');
                this.ensureSocialLink('TikTok');
                this.ensureSocialLink('Twitch');
                this.ensureSocialLink('X');

                // Capture the original form before editing
                this.originalForm = cloneDeep(this.form);
            },
            ensureSocialLink(name) {

                const exists = this.form.socialLinks.some(link => link.name === name);

                if(!exists) {
                    this.form.socialLinks.push({
                        name: name,
                        link: ''
                    });
                }
            },
            hasMatchingSocialMediaIcon(name) {
                return this.socialMediaIcons.some(socialMediaIcon => socialMediaIcon.name.toLowerCase() === name.toLowerCase());
            },
            addSocialLink(hideModal) {

                const exists = this.form.socialLinks.some(link => link.name === name);

                if(!exists) {

                    this.form.socialLinks.push({
                        name: this.socialLink.name,
                        link: this.socialLink.link
                    });

                }

                this.socialLink.name = '';
                this.socialLink.link = '';

                hideModal();
            },
            removeSocialLink(name) {
                this.form.socialLinks = this.form.socialLinks.filter(socialLink => socialLink.name !== name);
            },
            resetForm() {
                this.form = cloneDeep(this.originalForm);
            },
            showSocialMediaIcons() {

                if(this.socialMediaIcons.length) return;

                //  Start loader
                this.isLoadingSocialMediaIcons = true;

                getApi(this.apiState.apiHome['_links']['showSocialMediaIcons']).then(response => {

                    if(response.status == 200) {

                        this.socialMediaIcons = response.data;
                        this.setStoreFields();

                    }

                    //  Stop loader
                    this.isLoadingSocialMediaIcons = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingSocialMediaIcons = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            updateStore() {

                //  Start loader
                this.isSubmitting = true;

                putApi(this.store._links.updateStore, this.parseForm()).then(response => {

                    if(response.status == 200) {

                        useStoreState().shouldUpdate = true;
                        this.originalForm = cloneDeep(this.form);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Social links updated');

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            parseForm() {
                var data = cloneDeep(this.form);
                data.socialLinks = data.socialLinks.map(link => {
                    return {
                        name: link.name === '' ? null : link.name,
                        link: link.link === '' ? null : link.link
                    };
                });
                return data;
            },
        },
        mounted() {

        },
        created() {
            this.showSocialMediaIcons();
        }
    };

</script>
