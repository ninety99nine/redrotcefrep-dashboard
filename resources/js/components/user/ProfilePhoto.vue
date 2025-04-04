<template>

    <div>

        <div :class="[width, height, 'relative', 'mx-auto']">

            <!-- Display selected image if exists -->
            <div v-if="imageUrl" @click="selectImage" :class="['w-full h-full', { 'cursor-pointer group' : canUpload }]">

                <div :src="imageUrl" :class="['w-full h-full rounded-full border-4 overflow-hidden relative']">

                    <!-- Loading Icon -->
                    <div v-if="isSubmitting" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <svg class="w-6 h-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>

                    <!-- Dark overlay when hovering for uploading -->
                    <div v-if="canUpload" :class="['absolute top-0 bottom-0 left-0 right-0 z-10 group-hover:bg-black/50', { 'bg-black/75' : isSubmitting }]"></div>

                    <img class="w-full h-full object-cover object-top" :key="imageUrl" :src="imageUrl" alt="Profile Photo">

                </div>

                <!-- Camera Icon -->
                <svg v-if="canUpload" class="absolute bottom-0 -right-2 w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>

            </div>

            <!-- Placeholder for uploading image -->
            <div v-else @click="selectImage" :class="['w-full h-full rounded-full border-4 border-transparent overflow-hidden relative', { 'cursor-pointer group' : canUpload }]">

                <!-- Camera Icon -->
                <div v-if="canUpload" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                </div>

                <!-- Dark overlay when hovering for uploading -->
                <div v-if="canUpload" :class="['absolute top-0 bottom-0 left-0 right-0 z-10 bg-black/75 group-hover:bg-black/50']"></div>

                <!-- Person Icon -->
                <svg :class="['w-full h-full text-gray-200 dark:text-gray-700']" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>

            </div>

            <!-- Input element for selecting image -->
            <input type="file" ref="fileInput" class="hidden" @change="handleImageChange" accept="image/jpeg, image/png, image/jpg, image/gif, image/bmp">

        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="formState.getFormError('profilePhoto')" :class="{'block text-center mt-4' : formState.getFormError('profilePhoto')}"></InputErrorMessage>

    </div>

</template>


<script>

    import { updateUserProfilePhoto } from '@Repositories/user-repository.js';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        inject: ['authState', 'formState', 'notificationState'],
        props: {
            user: {
                type: Object
            },
            width: {
                type: String,
                default: 'w-20'
            },
            height: {
                type: String,
                default: 'h-20'
            },
            canUpload: {
                type: Boolean,
                default: true
            },
        },
        components: { InputErrorMessage },
        data() {
            return {
                selectedFile: null,
                isSubmitting: false,
                imageUrl: this.user.profilePhoto,
                originalImageUrl: this.user.profilePhoto
            };
        },
        watch: {
            'user.profilePhoto': {
                handler(newVal, oldVal) {

                    // Perform custom logic here when profilePhoto changes
                    this.imageUrl = newVal;

                },
                deep: false // Since profilePhoto is not a nested object, set deep to false
            }
        },
        methods: {
            selectImage() {

                if(this.canUpload) {

                    // Trigger file input click
                    this.$refs.fileInput.click();

                }

            },
            handleImageChange(event) {

                const file = event.target.files[0];

                if(file) {

                    // Set selected file
                    this.selectedFile = file;

                    // Preview the image
                    this.imageUrl = URL.createObjectURL(file);

                    //  If the current user is the authenticated user
                    if(this.user.id == this.authState.user.id) {

                        /**
                         *  Update the "useAuthState().user.profilePhoto".
                         *  This will allow the entire app to capture this selected profilePhoto.
                         */
                        useAuthState().user.profilePhoto = this.imageUrl;

                    }

                    // Emit the selected file to parent component
                    this.$emit('selectedPhoto', file);

                    //  Upload this image
                    this.uploadImage(event, file);

                }
            },
            uploadImage(event, file) {

                this.formState.hideFormErrors();

                //  Start loader
                this.isSubmitting = true;

                updateUserProfilePhoto(this.user, file).then(response => {

                    if(response.status == 200) {

                        this.isSubmitting = false;
                        this.notificationState.showSuccessNotification('Profile photo updated');

                    }

                }).catch(errorException => {

                    this.isSubmitting = false;

                    this.formState.setServerFormErrors(errorException);

                    //  If the current user is the authenticated user
                    if(this.user.id == this.authState.user.id) {

                        /**
                         *  Update the "useAuthState().user.profilePhoto".
                         *  This will allow the entire app to rollback to the original profilePhoto.
                         */
                        useAuthState().user.profilePhoto = this.originalImageUrl;

                    }

                    // Reset the input element to trigger @change event even if the same file is selected again
                    event.target.value = null;

                });
            }
        }
    };
</script>
