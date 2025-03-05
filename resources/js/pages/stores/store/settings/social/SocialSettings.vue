<template>

    <div class="bg-white shadow-lg border p-8 rounded-lg mb-4">

        <h1 class="text-lg font-bold mb-2">Social Links</h1>

        <p class="text-sm text-gray-500">
            Connect with your customers!
        </p>

        <p class="text-sm text-gray-500">
            Share your store’s social pages, groups, channels, or profiles to showcase your online community.
        </p>

        <div class="space-y-4 mt-4">

            <!-- Form Error Messages -->
            <FormErrorMessages></FormErrorMessages>

            <!-- Save Changes Alert -->
            <SaveChangesAlert></SaveChangesAlert>

            <!-- Social Links (Loading Placeholder) -->
            <div v-if="isLoadingSocialMediaIcons" class="space-y-2">

                <div v-for="(_, index) in [1,2,3]" :key="index" class="border shadow-sm rounded-lg p-4 bg-gray-50">
                    <div class="w-full flex items-center space-x-2">
                        <LineSkeleton width="w-8" :shine="true"></LineSkeleton>
                        <LineSkeleton width="w-40" :shine="true"></LineSkeleton>
                    </div>
                </div>

            </div>

            <!-- Social Links -->
            <template v-else>

                <draggable
                    class="space-y-2"
                    v-model="storeForm.socialLinks"
                    handle=".draggable-handle"
                    ghost-class="bg-yellow-50">
                    <div v-for="(socialLink, index) in storeForm.socialLinks" :key="index" class="flex items-center justify-between space-x-4">

                        <!-- Social Link Input -->
                        <div class="w-full">
                            <TextInput
                                placeholder="https://"
                                v-model="storeForm.socialLinks[index].link"
                                :errorText="getFormError('socialLinks'+index+'Name') || getFormError('socialLinks'+index+'Link')">

                                <template #prepend>
                                    <div class="flex items-center py-1.5 pl-4 pr-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap">
                                        <img v-if="hasMatchingSocialMediaIcon(socialLink.name)" class="w-8" :src="settings.appApiUrl+'/images/social-icons/'+socialLink.name.toLowerCase()+'.png'" />
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

            </template>

            <div v-if="!isLoadingSocialMediaIcons" class="flex justify-end">

                <BasicModal>

                    <template #content="slotProps">

                        <h1 class="font-lg font-bold mb-2">Add Social Link</h1>

                        <p class="text-sm text-gray-500 mb-4">Give us the name of the social media platform and your store link</p>

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
                            <AddButton :action="triggerProps.showModal" size="sm">
                                <span class="ml-2">Add</span>
                            </AddButton>
                        </slot>

                    </template>

                </BasicModal>

            </div>

        </div>

    </div>

</template>

<script>

    import settings from '@Js/settings.js';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicModal from '@Partials/modals/BasicModal.vue';
    import { getApi } from '@Repositories/api-repository.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import SaveChangesAlert from '@Pages/stores/store/settings/general/components/SaveChangesAlert.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            draggable: VueDraggableNext, TextInput, AddButton, BasicModal,
            LineSkeleton, PrimaryButton, FormErrorMessages, SaveChangesAlert
        },
        data() {
            return {
                socialLink: {
                    name: '',
                    link: ''
                },
                settings: settings,
                socialMediaIcons: [],
                apiState: useApiState(),
                storeState: useStoreState(),
                isLoadingSocialMediaIcons: false,
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            storeForm() {
                return this.storeState.storeForm;
            },
            canAddSocialLink() {
                return this.socialLink.name.length && this.socialLink.link.length
            }
        },
        methods: {
            hasMatchingSocialMediaIcon(name) {
                return this.socialMediaIcons.some(socialMediaIcon => socialMediaIcon.name.toLowerCase() === name.toLowerCase());
            },
            addSocialLink(hideModal) {

                const exists = this.storeForm.socialLinks.some(link => link.name === name);

                if(!exists) {

                    this.storeForm.socialLinks.push({
                        name: this.socialLink.name,
                        link: this.socialLink.link
                    });

                }

                this.socialLink.name = '';
                this.socialLink.link = '';

                hideModal();
            },
            removeSocialLink(name) {
                this.storeForm.socialLinks = this.storeForm.socialLinks.filter(socialLink => socialLink.name !== name);
            },
            showSocialMediaIcons() {

                if(this.socialMediaIcons.length) return;

                //  Start loader
                this.isLoadingSocialMediaIcons = true;

                getApi(this.apiState.apiHome['_links']['showSocialMediaIcons']).then(response => {

                    if(response.status == 200) {

                        this.socialMediaIcons = response.data;
                        this.setStoreForm();

                    }

                    //  Stop loader
                    this.isLoadingSocialMediaIcons = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingSocialMediaIcons = false;

                    this.setServerFormErrors(errorException);

                });

            },
            setStoreForm() {
                this.storeState.setStoreForm(this.store);
            }
        },
        created() {
            this.showSocialMediaIcons();
        }
    };

</script>
