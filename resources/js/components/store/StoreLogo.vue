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

                    <img class="w-full h-full object-cover object-top" :key="imageUrl" :src="imageUrl" alt="Store Logo">

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

                <!-- Store Icon -->
                <svg :class="['w-full h-full rounded-full bg-gray-100 text-gray-200 border-gray-200 p-1 border-2']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>

            </div>

            <!-- Input element for selecting image -->
            <input type="file" ref="fileInput" class="hidden" @change="handleImageChange" accept="image/jpeg, image/png, image/jpg, image/gif, image/bmp">

        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="getFormError('logo')" :class="{'block text-center mt-4' : this.getFormError('logo')}"></InputErrorMessage>

    </div>

</template>


<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import { updateStoreLogo } from '@Repositories/store-repository.js';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        props: {
            store: {
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
        mixins: [FormMixin],
        components: { InputErrorMessage },
        data() {
            return {
                selectedFile: null,
                isSubmitting: false,
                imageUrl: this.store.logo,
                storeState: useStoreState(),
                originalImageUrl: this.store.logo
            };
        },
        watch: {
            'store.logo': {
                handler(newVal, oldVal) {

                    // Perform custom logic here when logo changes
                    this.imageUrl = newVal;

                },
                deep: false // Since logo is not a nested object, set deep to false
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

                    //  If the current store is the stored store
                    if(this.store.id == this.storeState.store.id) {

                        /**
                         *  Update the "useStoreState().store.logo".
                         *  This will allow the entire app to capture this selected logo.
                         */
                        useStoreState().store.logo = this.imageUrl;

                    }

                    // Emit the selected file to parent component
                    this.$emit('selectedPhoto', file);

                    //  Upload this image
                    this.uploadImage(event, file);

                }
            },
            uploadImage(event, file) {

                this.hideFormErrors();

                //  Start loader
                this.isSubmitting = true;

                updateStoreLogo(this.store, file).then(response => {

                    if(response.status == 200) {

                        //  Stop loader
                        this.isSubmitting = false;
                        this.showSuccessfulNotification('Store logo updated');

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.setServerFormErrors(errorException);

                    //  If the current store is the stored store
                    if(this.store.id == this.storeState.store.id) {

                        /**
                         *  Update the "useStoreState().store.logo".
                         *  This will allow the entire app to rollback to the original logo.
                         */
                        useStoreState().store.logo = this.originalImageUrl;

                    }

                    // Reset the input element to trigger @change event even if the same file is selected again
                    event.target.value = null;

                });
            }
        }
    };
</script>
