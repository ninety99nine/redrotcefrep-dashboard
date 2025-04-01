<template>

    <div :class="{ 'flex flex-col items-center' : showButton }">

        <div
            @click="triggerFileUpload"
            :class="[size, 'bg-gray-200 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all relative group']">
            <img :src="logoFilePath ? logoFilePath : '/images/logo-black-transparent.png'" alt="Store Logo" class="w-full h-full rounded-full" />

            <!-- Edit Icon on Hover -->
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg v-if="logoFilePath" class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
                <svg v-else class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>

        </div>

        <input
            type="file"
            class="hidden"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/jpeg, image/jpg, image/png, image/gif"
        />

        <button
            v-if="showButton"
            @click="triggerFileUpload"
            class="flex items-center space-x-2 mt-4 text-xs border rounded-lg px-4 py-2 hover:bg-gray-100 active:scale-95 transition-all">
                <svg v-if="logoFilePath" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
                <svg v-else class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>{{ logoFilePath ? 'Add' : 'Change' }} store logo</span>
        </button>

    </div>

</template>

<script>

    import { postApi } from '@Repositories/api-repository.js';

    export default {
        inject: ['formState', 'storeState'],
        props: {
            size: {
                type: String,
                default: 'w-20 h-20'
            },
            store: {
                type: [Object, null],
                default: null
            },
            showButton: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                localStore: null,
                logoFilePath: null,
                isUploading: false
            }
        },
        methods: {
            triggerFileUpload() {
                this.$refs.fileInput.click();
            },
            handleFileUpload(event) {
                const file = event.target.files[0];
                if (file) {
                    this.logoFilePath = URL.createObjectURL(file);
                    this.uploadStoreLogo();
                }
            },
            async uploadStoreLogo() {

                if(this.isUploading || this.$refs.fileInput.files.length == 0) return;

                let formData = new FormData();
                formData.append('return', 1);
                formData.append('store_logo', this.$refs.fileInput.files[0]);

                this.isUploading = true;

                try {

                    const response = await postApi(this.localStore._links['uploadStoreLogo'], formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });

                    if (response.status === 200) {

                        this.isUploading = false;

                        if(this.storeState.store && this.localStore.id == this.storeState.store.id) {
                            useStoreState().store._relationships.logo = response.data.mediaFile;
                        }

                    } else {

                        this.notificationState.showWarningNotification(response.data.message);
                        console.error(error);

                    }

                } catch (error) {
                    this.isUploading = false;
                    if(error.message) this.notificationState.showWarningNotification(error.message);
                    console.error(error);
                }
            }
        },
        created() {
            this.localStore = this.store ? this.store : this.storeState.store;

            if(this.localStore._relationships.logo) {
                this.logoFilePath = this.localStore._relationships.logo.filePath;
            }
        }
    };

</script>
