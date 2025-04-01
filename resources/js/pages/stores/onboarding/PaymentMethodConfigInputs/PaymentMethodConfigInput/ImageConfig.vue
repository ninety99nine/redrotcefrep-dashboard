<template>

    <div>

        <!-- Input Label -->
        <InputLabel :secondaryLabel="configSchemaEntity.optional ? '(optional)' : null">
            {{ configSchemaEntity.label }}
        </InputLabel>

        <!-- Drag & Drop or Clickable Area -->
        <div
            @dragover.prevent
            @drop="handleDrop"
            @click="triggerFileInput"
            v-if="!localModelValue.filePath"
            class="mt-2 w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <p>Click or Drag & Drop Image</p>
            <input
                type="file"
                class="hidden"
                ref="fileInput"
                @change="handleFileUpload"
                :accept="acceptedFileTypes"
            />
        </div>

        <!-- Image Preview & Upload Indicators -->
        <div
            v-else
            class="relative mt-2">

            <div
                v-if="!localModelValue.uploading"
                class="absolute z-10 top-0 right-0 h-full p-2 flex flex-col items-end justify-between space-y-2">

                <div class="flex flex-col items-end space-y-2">

                    <!-- Retry Button -->
                    <button
                        @click="uploadImage"
                        v-if="localModelValue.uploadFailed === true"
                        class="cursor-pointer bg-yellow-500  hover:bg-yellow-600 text-white rounded-full w-fit px-4 py-1 flex items-center justify-center text-xs active:scale-95 transition-all">
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd"/>
                            </svg>
                            <span class="text-xs">Retry</span>
                        </div>
                    </button>

                    <!-- Remove Image Button -->
                    <button
                        @click="removeImage"
                        v-if="!localModelValue.uploading"
                        class="cursor-pointer bg-red-500  hover:bg-red-600 text-white rounded-full w-fit px-4 py-1 flex items-center justify-center text-xs active:scale-95 transition-all">
                        Remove
                    </button>

                </div>

                <div class="flex">

                    <!-- Success Tick -->
                    <div
                        v-if="localModelValue.uploaded === true"
                        class="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>

                    <!-- Failure Cross -->
                    <div
                        v-if="localModelValue.uploaded === false"
                        class="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd"/>
                        </svg>
                    </div>

                </div>

            </div>

            <!-- Uploading Indicator -->
            <div v-if="localModelValue.uploading"
                class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <span class="text-white text-xs font-bold">Uploading...</span>
            </div>

            <!-- Deleting Indicator -->
            <div v-if="localModelValue.deleting"
                class="absolute inset-0 bg-red-900 bg-opacity-50 flex items-center justify-center">
                <span class="text-white text-xs font-bold">Deleting...</span>
            </div>

            <!-- Image Preview -->
            <img
                @click="triggerFileInput"
                :src="localModelValue.filePath"
                class="w-full h-40 p-4 object-contain rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer hover:opacity-80 transition"
            />

            <input
                type="file"
                class="hidden"
                ref="fileInput"
                @change="handleFileUpload"
                :accept="acceptedFileTypes"
            />

        </div>

    </div>

</template>

<script>

    import QrScanner from 'qr-scanner';
    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';

    export default {
        inject: ['onboardingState'],
        components: { InputLabel },
        props: {
            modelValue: {
                type: Object,
                default: () => null
            },
            configSchemaEntity: {
                type: Object
            },
            paymentMethod: {
                type: Object
            }
        },
        data() {
            return {
                localModelValue: null,
                originalModelValue: null
            };
        },
        watch: {
            modelValue: {
                immediate: true,
                handler(newValue) {
                    this.localModelValue = cloneDeep(newValue);
                    if(this.originalModelValue == null) this.originalModelValue = cloneDeep(newValue);
                },
                deep: true
            },
            localModelValue: {
                handler(newValue) {
                    if(!isEqual(this.modelValue, newValue)) {
                        this.$emit('update:modelValue', newValue);
                    }
                },
                deep: true
            }
        },
        computed: {
            acceptedFileTypes() {

                // Check if `validationRules` exist and contain `mimeTypes`
                if (this.configSchemaEntity?.validationRules?.mimeTypes) {

                    const [allowedTypes] = this.configSchemaEntity.validationRules.mimeTypes;

                    // Ensure it's an array and return a comma-separated list
                    if (Array.isArray(allowedTypes) && allowedTypes.length > 0) {
                        return allowedTypes.join(",");
                    }

                }

                // Default to "image/*" if no specific types are set
                return "image/*";

            },
            hasSelectedImage() {
                return this.localModelValue?.filePath && this.localModelValue?.filePath.startsWith("blob:");
            }
        },
        methods: {
            triggerFileInput() {
                this.$refs.fileInput.click();
            },
            handleFileUpload(event) {
                const file = event.target.files[0];
                if (!file) return;
                this.processFile(file);
            },
            handleDrop(event) {
                event.preventDefault();
                const file = event.dataTransfer.files[0];
                if (!file) return;
                this.processFile(file);
            },
            processFile(file) {
                if (!file) return;

                // Process file and update state asynchronously
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        this.localModelValue.filePath = URL.createObjectURL(file);
                        this.localModelValue.uploading = false;
                        this.localModelValue.uploaded = null;
                        this.localModelValue.fileRef = file;

                        if (this.configSchemaEntity.validationRules?.qrCode) {

                            // Validate QR Code
                            this.validateQRCode();

                        }

                        resolve(); // Ensure the file is completely processed
                    };
                    reader.readAsDataURL(file);
                }).then(() => {
                    this.uploadImage();
                });
            },
            async validateQRCode() {

                try {

                    // Dynamically import QrScanner
                    const QrScanner = (await import('qr-scanner')).default;

                    // Scan QR code
                    const scanResult = await QrScanner.scanImage(this.localModelValue.filePath, { returnDetailedScanResult: true });

                    // Extract QR data (supporting both old & new API formats)
                    const qrData = scanResult?.data ?? scanResult;

                    if (qrData) {

                        console.log(`✅ QR Code detected: ${qrData}`);

                        // Update state with valid QR Code
                        this.localModelValue = {
                            ...this.localModelValue,
                            validQR: true,
                            qrData
                        };

                    } else {
                        throw new Error("Invalid QR Code");
                    }

                } catch (error) {

                    console.error("❌ Invalid QR Code:", error);

                    // Update state with invalid QR Code
                    this.localModelValue = {
                        ...this.localModelValue,
                        validQR: false
                    };

                }
            },
            async removeImage() {

                if (this.hasSelectedImage) {

                    this.localModelValue = cloneDeep(this.originalModelValue);

                }else if(this.localModelValue.filePath != null) {

                    await this.onboardingState.deletePaymentMethodImage(this.paymentMethod, this.configSchemaEntity.attribute);

                }
            },
            async uploadImage() {
                const { attribute } = this.configSchemaEntity;

                // ✅ Correct: Dynamically set the key using [attribute]
                const configs = {
                    [attribute]: this.paymentMethod.configs[attribute]
                };

                if (!configs[attribute]) {
                    console.warn(`⚠️ No valid config found for '${attribute}'`);
                    return;
                }

                const validationErrors = this.onboardingState.getPaymentMethodValidationErrors(this.configSchemaEntity, configs);

                if (!validationErrors.length) {
                    await this.onboardingState.uploadSinglePaymentMethodImage(this.paymentMethod, attribute);
                } else {
                    console.warn(`❌ Upload failed due to validation errors:`, validationErrors);
                }
            }
        }
    };
</script>
