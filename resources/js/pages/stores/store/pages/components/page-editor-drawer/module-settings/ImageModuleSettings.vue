<template>
    <div v-if="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex]" class="space-y-4">

        <!-- Image Upload Area -->
        <div>

            <!-- Title -->
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Images</label>

            <!-- Drag & Drop or Clickable Area -->
            <div
                @dragover.prevent
                @drop="handleDrop"
                @click="triggerFileInput"
                class="mt-2 w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <span v-if="!pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].mediaFiles.length">Click or Drag & Drop Images</span>
                <span v-else>Upload More Images</span>
                <input
                    multiple
                    type="file"
                    class="hidden"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleFileUpload"
                />
            </div>
        </div>

        <!-- Image Previews -->
        <div v-if="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].mediaFiles.length" class="grid grid-cols-3 gap-2">
            <div v-for="(image, index) in pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].mediaFiles" :key="index" class="relative group">

                <img :src="image.filePath" class="w-full h-24 p-4 object-contain rounded-lg border border-gray-300 dark:border-gray-700" />

                <!-- Uploading Indicator -->
                <div v-if="image.uploading" class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <span class="text-white text-xs">Uploading...</span>
                </div>

                <!-- Remove Image Button -->
                <button
                    @click.stop="removeImage(index)"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition">
                    ✕
                </button>
            </div>
        </div>

        <!-- Alt Text -->
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Alt Text</label>
            <input
                type="text"
                v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].settings.alt"
                @input="saveStateDebounced('Image alt text changed')"
                class="mt-1 w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            />
        </div>

        <!-- Width & Height -->
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Width</label>
                <input
                    type="text"
                    v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].settings.width"
                    class="mt-1 w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    @input="saveStateDebounced('Image width changed')"
                />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Height</label>
                <input
                    type="text"
                    v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].settings.height"
                    @input="saveStateDebounced('Image height changed')"
                    class="mt-1 w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                />
            </div>
        </div>

        <!-- Border Radius -->
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Border Radius</label>
            <input
                min="0"
                max="50"
                type="range"
                class="w-full mt-2"
                v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].settings.borderRadius"
                @input="saveStateDebounced('Image border-radius changed')"
            />
            <p class="text-xs text-gray-500 mt-1">Current: {{ pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].settings.borderRadius }}px</p>
        </div>

    </div>
</template>

<script>
import { usePageState } from "@Stores/page-store.js";

export default {
    data() {
        return {
            pageState: usePageState(),
        };
    },
    methods: {
        saveStateDebounced(actionName) {
            this.pageState.saveStateDebounced(actionName);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const files = event.target.files;
            this.processFiles(files);
        },
        handleDrop(event) {
            event.preventDefault();
            const files = event.dataTransfer.files;
            this.processFiles(files);
        },
        processFiles(files) {
            if (!files.length) return;

            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].mediaFiles.push({
                        filePath: URL.createObjectURL(file),
                        errorMessage: null,
                        uploading: null,
                        uploaded: null,
                        fileRef: file,  // Don't use [file: file] use [fileRef: file for Non-reactive, best for performance]
                    });
                    this.saveStateDebounced(`${files.length} ${ files.length == 1 ? 'image' : 'images'} added`);
                };
                reader.readAsDataURL(file);
            });
        },
        removeImage(index) {
            this.pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].mediaFiles.splice(index, 1);
            this.saveStateDebounced("Image removed");
        }
    },
};
</script>
