<template>

    <div class="min-h-screen flex flex-col items-center pt-20 pb-40">

        <div class="w-full max-w-lg">

            <!-- Store Logo -->
            <StoreLogo :showButton="false" class="flex justify-center mb-4"></StoreLogo>

            <!-- Heading -->
            <h2 class="text-2xl font-semibold text-center mb-2">Add Products</h2>

            <!-- Instruction -->
            <p class="text-gray-500 text-center mb-6">Keep it simple—just the essentials to get started! 🚀</p>

        </div>

        <div class="w-full max-w-lg">

            <!-- Form -->
            <form @submit.prevent="submit">

                <div class="space-y-2 mb-4">

                    <div
                        :key="index"
                        v-for="(product, index) in products"
                        :class="['space-y-3 bg-white p-4 shadow-lg rounded-xl']">

                        <div class="flex items-center space-x-1 font-bold mb-4">
                            <span class="text-sm">Product</span>
                            <div class="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full text-xs">{{ index + 1}}</div>
                        </div>

                        <!-- Name Input -->
                        <TextInput
                            v-model="product.name"
                            placeholder="Standard Ticket"
                            :errorText="getFormError('name', index)">
                        </TextInput>

                        <!-- Unit Regular Price Money Input -->
                        <MoneyInput
                            v-model="product.unitRegularPrice"
                            :currencySymbol="store.currency.symbol"
                            :errorText="getFormError('unitRegularPrice', index)">
                        </MoneyInput>

                        <!-- Image Upload Area -->
                        <div>

                            <!-- Title -->
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Images
                                <span class="font-normal text-gray-500">(Optional)</span>
                            </label>

                            <!-- Drag & Drop or Clickable Area -->
                            <div
                                @dragover.prevent
                                @click="() => triggerFileInput(index)"
                                @drop="(event) => handleDrop(event, index)"
                                v-if="product.photos.length < maxPhotosPerProduct"
                                class="mt-2 w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                <p v-if="!product.photos.length">Click or Drag & Drop Images</p>
                                <p v-else>Upload More Images</p>
                                <input
                                    multiple
                                    type="file"
                                    class="hidden"
                                    accept="image/*"
                                    :ref="(el) => setFileInputRef(el, index)"
                                    @change="(event) => handleFileUpload(event, index)"
                                />
                            </div>

                        </div>

                        <!-- Image Previews -->
                        <div v-if="product.photos.length" class="grid grid-cols-3 gap-2">
                            <div v-for="(photo, photoIndex) in product.photos" :key="photoIndex" class="relative group">

                                <template v-if="!photo.uploading">

                                    <!-- Success Tick -->
                                    <div v-if="photo.uploaded === true" class="absolute z-10 top-1 right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    </div>

                                    <!-- Failure Cross -->
                                    <div v-if="photo.uploaded === false" class="absolute z-10 top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                                        </svg>
                                    </div>

                                    <!-- Retry Button -->
                                    <button
                                        v-if="photo.uploaded === false"
                                        @click="() => uploadProductImages(product, photoIndex)"
                                        class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 active:scale-95 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
                                        </svg>
                                    </button>

                                    <!-- Remove Image Button -->
                                    <button
                                        v-if="(!photo.uploaded && !photo.uploading)"
                                        @click.stop="(event) => removePhoto(event, index, photoIndex)"
                                        class="absolute z-10 top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition">
                                        ✕
                                    </button>

                                    <!-- Failed Indicator -->
                                    <div v-if="photo.uploaded === false" class="absolute inset-0 bg-white bg-opacity-80 border border-red-500 rounded-lg flex items-center justify-center"></div>

                                </template>

                                <!-- Uploading Indicator -->
                                <div v-if="photo.uploading" class="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">Uploading...</span>
                                </div>

                                <!-- Image -->
                                <img
                                    :src="photo.filePath"
                                    class="w-full h-24 p-4 object-contain rounded-lg border border-gray-300 dark:border-gray-700"
                                />

                            </div>
                        </div>

                        <div v-if="productHasFailedUploads(index)" :class="['flex justify-end pt-2', { 'pb-4' : index == products.length - 1 }]">

                            <RetryButton
                                size="xs"
                                class="w-40"
                                :disabled="productIsUploading(index)"
                                :action="() => uploadProductImages(product)">
                                <span class="ml-2">Retry Uplaods</span>
                            </RetryButton>

                        </div>

                        <div v-if="products.length > 1 && !hasCompletedSteps" :class="['flex justify-end pt-2', { 'pb-4' : index == products.length - 1 }]">

                            <DeleteButton
                                size="xs"
                                class="w-40"
                                type="danger"
                                :action="removeProduct"
                                v-if="!isCreatingProducts">
                                <span class="ml-2">Remove Product</span>
                            </DeleteButton>

                        </div>

                        <div v-if="(index == products.length - 1) && !hasReachedProductLimit && !hasCompletedSteps" :class="['flex justify-center pt-4', { 'border-t-2 border-dashed' : products.length > 1 }]">

                            <AddButton
                                size="sm"
                                class="w-40"
                                type="primary"
                                :action="addProduct"
                                v-if="index == products.length - 1 && !isCreatingProducts">
                                Add Product
                            </AddButton>

                        </div>

                    </div>

                </div>

                <div v-if="hasReachedProductLimit || hasFailedUploads || hasErrors" class="space-y-2 mb-4">

                    <p
                        v-if="hasReachedProductLimit"
                        class="text-sm text-blue-600 font-semibold bg-blue-100 border border-blue-300 p-3 rounded-lg shadow-md text-center">
                        Let's work with <span class="underline"><span class="font-bold">{{ maxProducts }}</span> products</span> for now! 🚀
                    </p>

                    <div
                        v-if="hasFailedUploads"
                        class="text-xs text-blue-600 font-semibold bg-blue-100 border border-blue-300 p-3 rounded-lg shadow-md">

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

                    <!-- Form Error Messages -->
                    <FormErrorMessages :index="formErrorMessagesIndex"></FormErrorMessages>

                </div>

                <!-- Global Upload Progress Bar -->
                <div v-if="isCreatingProducts || isUploading || (progressPercentage === 100)" class="mb-4">
                    <div class="w-full max-w-lg bg-gray-200 rounded-full h-2 mb-2">
                        <div
                            class="h-2 rounded-full transition-all duration-500"
                            :class="progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'"
                            :style="{ width: progressPercentage + '%' }">
                        </div>
                    </div>
                    <p class="text-xs text-center mt-2 font-bold">
                        {{ progressPercentage === 100 ? 'Upload Complete 🎉' : `${uploadMessage} (${progressPercentage}%)` }}
                    </p>
                </div>

                <!-- Continues -->
                <PrimaryButton
                    class="w-full"
                    :action="submit"
                    :loading="isCreatingProducts"
                    :disabled="isCreatingProducts">
                    Continue
                </PrimaryButton>

            </form>

        </div>

    </div>

  </template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import { useStoreState } from '@Stores/store-store.js';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import { postApi } from '@Repositories/api-repository.js';
    import RetryButton from '@Partials/buttons/RetryButton.vue';
    import DeleteButton from '@Partials/buttons/DeleteButton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';

    export default {
        mixins: [FormMixin],
        components: {
            TextInput, AddButton, StoreLogo, MoneyInput, RetryButton, DeleteButton, PrimaryButton, FormErrorMessages
        },
        data() {
            return {
                products: [
                    {
                        name: '',
                        photos: [],
                        unitRegularPrice: '0.00',

                        //  Other properties
                        createProductPhoto: null
                    }
                ],
                maxProducts: 5,
                fileInputs: [],
                uploadMessage: '',
                isUploading: false,
                totalCompletedSteps: 0,
                maxPhotosPerProduct: 5,
                apiState: useApiState(),
                totalCompletedUploads: 0,
                isCreatingProducts: false,
                storeState: useStoreState(),
                formErrorMessagesIndex: null
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            logo() {
                return this.store._relationships.logo;
            },
            progressPercentage() {
                return this.totalCompletionSteps === 0 ? 0 : Math.round((this.totalCompletedSteps / this.totalCompletionSteps) * 100);
            },
            totalUploads() {
                return this.products.reduce((sum, product) => {
                    return sum + product.photos.length;
                }, 0);
            },
            totalFailedUploads() {
                return this.products.reduce((sum, product) => {
                    return sum + product.photos.filter(photo => photo.uploaded === false).length;
                }, 0);
            },
            totalCompletionSteps() {
                return this.products.length + this.totalUploads;
            },
            hasCompletedSteps() {
                return this.totalCompletedSteps > 0;
            },
            hasFailedUploads() {
                return this.totalFailedUploads > 0;
            },
            hasReachedProductLimit() {
                return this.maxProducts == this.products.length;
            }
        },
        methods: {
            addProduct() {

                this.products.push({
                    name: '',
                    photos: [],
                    unitRegularPrice: '0.00',

                    //  trackers
                    created: false
                });
            },
            removeProduct(index) {
                this.products.splice(index, 1);
            },
            productIsUploading(index) {
                return this.products[index].photos.filter(photo => photo.uploading === true).length > 0;
            },
            productHasFailedUploads(index) {
                return this.products[index].photos.filter(photo => photo.uploaded === false).length
            },
            setFileInputRef(el, index) {
                if (el) {
                    this.fileInputs[index] = el;
                }
            },
            triggerFileInput(index) {
                if(this.isCreatingProducts || this.isUploading) {
                    this.showUnsuccessfulNotification(`Still creating products`);
                    return;
                }

                if (typeof index !== "number") {
                    console.warn(`⚠️ Invalid index: ${index}`, index);
                    return;
                }

                if (this.fileInputs[index]) {
                    this.fileInputs[index].click();
                } else {
                    console.warn(`⚠️ File input not found for index: ${index}`);
                }
            },
            handleFileUpload(event, index) {
                const files = event.target.files;

                if (!files.length) return;

                this.processFiles(files, index);

                this.$nextTick(() => {
                    this.fileInputs[index].value = '';
                });
            },
            handleDrop(event, index) {
                event.preventDefault();
                const files = event.dataTransfer.files;
                this.processFiles(files, index);
            },
            processFiles(files, index) {
                if (!files.length) return;

                const product = this.products[index];
                const currentPhotosCount = product.photos.length;
                const remainingSlots = this.maxPhotosPerProduct - currentPhotosCount;

                if (remainingSlots <= 0) {
                    this.showUnsuccessfulNotification(`You can only upload up to ${this.maxPhotosPerProduct} photos per product.`);
                    return;
                }

                // Take only the allowed number of new photos
                const filesToUpload = Array.from(files).slice(0, remainingSlots);

                // Convert new files into objects and add them to the product's photo array (use Promises)
                const filePromises = filesToUpload.map((file) => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            product.photos.push({
                                filePath: URL.createObjectURL(file),
                                uploading: false,
                                uploaded: null,
                                fileRef: file,
                            });
                            resolve(); // Mark file as processed
                        };
                        reader.readAsDataURL(file);
                    });
                });

                // Wait for all FileReaders to finish processing
                Promise.all(filePromises).then(() => {
                    this.uploadProductImages(product);
                });
            },
            removePhoto(event, productIndex, imgIndex) {
                if (event) {
                    event.preventDefault(); // Prevent form validation
                    event.stopPropagation(); // Stop the click event from bubbling up
                }

                this.products[productIndex].photos.splice(imgIndex, 1);
            },
            submit() {
                if(this.isCreatingProducts || this.isUploading) return;

                if(this.totalCompletedSteps == 0) {
                    this.submitProducts();
                }else{
                    this.navigateToAddPayments();
                }
            },
            async submitProducts() {

                // Check if any product is missing required fields
                for (const [index, product] of this.products.entries()) {
                    if (product.name.trim() === '') {
                        this.setFormError('name', 'The product name is required', index);
                        this.showUnsuccessfulNotification(`The product name is required`);
                        this.formErrorMessagesIndex = index;
                        return;
                    }

                    if (product.unitRegularPrice.trim() === '') {
                        this.setFormError('unitRegularPrice', 'The product price is required', index);
                        this.showUnsuccessfulNotification(`The product price is required`);
                        this.formErrorMessagesIndex = index;
                        return;
                    }
                }

                // Indicate that product creation is in progress
                this.isCreatingProducts = true;

                // Store API URL for product creation
                const createProductUrl = this.apiState.apiHome['_links']['createProduct'];

                // Create all products one by one
                let productCreationPromises = this.products.map((localProduct) => {
                    let productData = {
                        return: '1',
                        storeId: this.store.id,
                        name: localProduct.name,
                        unitRegularPrice: localProduct.unitRegularPrice
                    };

                    this.uploadMessage = `Creating ${localProduct.name}`;

                    return postApi(createProductUrl, productData).then((response) => {
                        if (response.status === 200) {
                            this.totalCompletedSteps++;
                            let createdProduct = response.data.product;
                            localProduct.createProductPhoto = createdProduct._links.createProductPhoto;

                            return this.uploadProductImages(localProduct);
                        }
                    });
                });

                // Process all product creation requests
                await Promise.allSettled(productCreationPromises)
                    .then((results) => {
                        let successCount = 0;
                        let errors = [];

                        results.forEach((result, index) => {
                            if (result.status === 'fulfilled') {
                                successCount++;
                                this.showSuccessfulNotification(`${this.products[index].name} created successfully`);
                            } else {
                                errors.push(`Product ${index + 1}: ${result.reason?.message || 'An error occurred'}`);
                                this.formErrorMessagesIndex = index;
                                this.setServerFormErrors(result.reason, index);
                            }
                        });

                        if (successCount) {
                            this.showSuccessfulNotification('Products added!');
                        }

                        if (errors.length > 0) {
                            this.showUnsuccessfulNotification(errors.join('\n'));
                        }
                    })
                    .catch((error) => {
                        this.showUnsuccessfulNotification('An unexpected error occurred while submitting products.');
                        console.error(error);
                    })
                    .finally(() => {
                        this.isCreatingProducts = false; // ✅ Product creation done
                    });

                if (this.totalCompletedSteps > 0 && (!this.isUploading && this.totalFailedUploads == 0)) {
                    this.navigateToAddPayments();
                }
            },
            async uploadProductImages(localProduct, photoIndex = null) {

                if (!localProduct.createProductPhoto) return Promise.resolve();

                let imageUploadPromises = [];

                for (let index = 0; index < localProduct.photos.length; index++) {
                    const photo = localProduct.photos[index];

                    if(photo.uploaded === null || photo.uploaded === false) {
                        if(photoIndex == null || photoIndex == index) {
                            imageUploadPromises.push(
                                this.uploadSingleImage(localProduct, photo, index)
                            );
                        }
                    }
                }

                if (!imageUploadPromises.length) return Promise.resolve();

                this.isUploading = true;
                this.uploadMessage = `Uploading photos`;

                return Promise.allSettled(imageUploadPromises).then((results) => {

                    let failedUploads = results.filter(result => result.status === 'rejected').length;
                    if (failedUploads > 0) {
                        this.showUnsuccessfulNotification(`⚠️ ${failedUploads} image(s) failed to upload. You can retry manually.`);
                    }

                    this.isUploading = false; // ✅ All images uploaded (successful or failed)
                });
            },
            async uploadSingleImage(localProduct, photo, index, retryCount = 0) {
                if (retryCount > 2) {
                    console.warn(`❌ Image ${index + 1} permanently failed after 3 attempts.`);
                    photo.uploaded = false;
                    return Promise.reject(`Failed after 3 attempts`);
                }

                let formData = new FormData();
                formData.append('product_photo', photo.fileRef);
                photo.uploading = true;

                return postApi(localProduct.createProductPhoto, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then((response) => {
                    if (response.status === 200) {
                        photo.uploaded = true;
                        this.totalCompletedSteps++;
                        this.totalCompletedUploads++;

                        this.uploadMessage = `Uploaded ${this.totalCompletedUploads}/${this.totalUploads} photos`;
                        console.log(`✅ Image ${index + 1} uploaded successfully.`);

                        return response;
                    } else {
                        throw new Error(`Upload failed`);
                    }
                })
                .catch((error) => {
                    console.error(`⚠️ Image ${index + 1} upload attempt ${retryCount + 1} failed.`);
                    return this.uploadSingleImage(localProduct, photo, index, retryCount + 1);
                })
                .finally(() => {
                    photo.uploading = false;
                });
            },
            navigateToAddPayments() {
                this.$router.push({
                    name: 'add-payments',
                    params: { 'store_href': this.store._links.showStore }
                });
            }
        },
        beforeRouteLeave(to, from, next) {

            if (this.isCreatingProducts || this.isUploading) {

                const answer = window.confirm("You have unsaved changes. Are you sure you want to leave?");
                if (!answer) {
                    return next(false);
                }

            } else if (this.totalCompletedSteps == 0 && this.products.some(product => product.name.trim() !== '' || product.photos.length > 0)) {

                const answer = window.confirm("Are you sure you want to leave before adding products?");
                if (!answer) {
                    return next(false);
                }

            }

            next();
        }
    };
  </script>
