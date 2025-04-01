<template>
    <div>
        <template v-if="isLoadingPage">
            <!-- Loader or Placeholder -->
        </template>

        <template v-else>

            <div class="flex flex-wrap gap-2 justify-center py-8">

                <!-- Modes -->
                <Pill
                    size="md"
                    :key="index"
                    :showDot="false"
                    :action="() => setMode(mode)"
                    v-for="(mode, index) in modes"
                    :type="selectedMode == mode.value ? 'primary' : 'info'">
                    <template v-if="modeIcons[mode.value]">
                        <svg class="w-4 h-4 mr-1" :xmlns="modeIcons[mode.value].xmlns" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path :d="modeIcons[mode.value].path" />
                        </svg>
                    </template>
                    <span>{{ mode.name }}</span>
                </Pill>

            </div>

            <!-- Undo, Redo, and History -->
            <div class="flex justify-between items-center mb-4">

                <div>

                </div>

                <div class="flex justify-center items-center space-x-2">

                    <!-- Undo Button -->
                    <svg
                        :class="buttonClasses(canUndo)"
                        @click="canUndo ? undo() : null"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>

                    <!-- History Dropdown -->
                    <Dropdown>
                        <template #trigger>
                            <button :class="buttonClasses(canUndo || canRedo)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </template>
                        <template #content>
                            <div class="z-20 w-96 bg-white divide-y divide-gray-100 rounded-lg shadow-md">
                                <div class="px-4 py-2 font-medium text-gray-700 bg-gray-50">History</div>
                                <div class="divide-y divide-gray-100">
                                    <div
                                        :key="index"
                                        @click="jumpToHistory(index)"
                                        v-for="(item, index) in historyItems"
                                        class="px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                                        <div class="flex items-center space-x-2">
                                            <span v-if="item.isActive" class="text-xs text-green-500 font-bold">✔</span>
                                            <span class="text-xs text-gray-900">{{ item.name }}</span>
                                        </div>
                                        <span class="text-xs text-gray-400">{{ formattedRelativeDate(item.timestamp) }}</span>
                                    </div>
                                </div>
                                <p v-if="historyItems.length === 1" class="text-xs text-center bg-yellow-100 p-4 mt-4">
                                    No history to undo or redo
                                </p>
                                <div v-else class="flex justify-between divide-x">
                                    <div
                                        @click="clearHistory"
                                        class="w-1/2 text-xs font-medium text-center py-2 text-blue-600 cursor-pointer hover:bg-gray-100 active:bg-blue-100 active:scale-95">
                                        Clear History
                                    </div>
                                    <div
                                        @click="resetToOriginal"
                                        class="w-1/2 text-xs font-medium text-center py-2 text-red-600 cursor-pointer hover:bg-gray-100 active:bg-red-100 active:scale-95">
                                        Reset to Original
                                    </div>
                                </div>
                            </div>
                        </template>
                    </Dropdown>

                    <!-- Redo Button -->
                    <svg
                        @click="canRedo ? redo() : null"
                        :class="buttonClasses(canRedo)"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                    </svg>
                </div>

                <div class="flex justify-end">

                </div>

            </div>

            <SaveChanges
                class="mb-4"
                :saveChanges="updatePage"
                :isSaving="isUpdatingPage"
                :undoChanges="resetPageForm"
                :mustSaveChanges="mustSaveChanges">
            </SaveChanges>

            <div :class="['w-full overflow-hidden transition-all duration-500 mb-8', isUpdatingPage ? 'h-10' : 'h-0']">
                <div class="flex justify-between items-center text-xs text-gray-500">
                    <span>{{ updateProgress.message }}</span>
                    <span>{{ updateProgress.percentage }}%</span>
                </div>
                <div class="mt-2 h-2 w-full bg-gray-100 border border-gray-200 rounded">
                    <div :style="{ width: updateProgress.percentage + '%' }" class="h-2 bg-blue-500 rounded transition-all duration-1000"></div>
                </div>
            </div>

            <!-- Page Sections -->
            <PageSections></PageSections>

            <!-- Module Editor Drawer -->
            <PageEditorDrawer></PageEditorDrawer>
        </template>
    </div>
</template>

<script>
    import Dropdown from "@Partials/dropdowns/Dropdown.vue";
    import { formattedRelativeDate } from '@Utils/dateUtils.js';
    import SaveChanges from '@Partials/save-changes/SaveChanges.vue';
    import Pill from "@Partials/pills/Pill.vue";
    import PageSections from "@Pages/stores/store/pages/components/page-sections/PageSections.vue";
    import PageEditorDrawer from "@Pages/stores/store/pages/components/page-editor-drawer/PageEditorDrawer.vue";

    export default {
        inject: ['pageState'],
        components: {
            Dropdown, SaveChanges, Pill, PageSections, PageEditorDrawer
        },
        data() {
            return {
                isSubmitting: false,
                modeIcons: {
                    "block builder": {
                        xmlns: "http://www.w3.org/2000/svg",
                        path: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z",
                    },
                    "visual builder": {
                        xmlns: "http://www.w3.org/2000/svg",
                        path: "M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59",
                    },
                },
            };
        },
        computed: {
            page() {
                return this.pageState.page;
            },
            modes() {
                return this.pageState.modes;
            },
            selectedMode() {
                return this.pageState.selectedMode;
            },
            isLoadingPage() {
                return this.pageState.isLoadingPage;
            },
            isUpdatingPage() {
                return this.pageState.isUpdatingPage;
            },
            updateProgress() {
                return this.pageState.updateProgress;
            },
            mustSaveChanges() {
                return this.pageState.mustSaveChanges;
            },
            canUndo() {
                return this.pageState.canUndo;
            },
            canRedo() {
                return this.pageState.canRedo;
            },
            history() {
                return this.pageState.history;
            },
            historyItems() {
                return this.pageState.historyItems;
            },
        },
        methods: {
            formattedRelativeDate: formattedRelativeDate,
            resetPageForm() {
                this.pageState.resetPageForm();
            },
            updatePage() {
                this.pageState.updatePage();
            },
            showPage() {
                this.pageState.showPage(this.$route.params.page_href);
            },
            setMode(mode) {
                this.pageState.setMode(mode);
            },
            undo() {
                this.pageState.undo();
            },
            redo() {
                this.pageState.redo();
            },
            jumpToHistory(index) {
                this.pageState.jumpToHistory(index);
            },
            clearHistory() {
                this.pageState.clearHistory();
            },
            buttonClasses(enabled) {
                return [
                    "w-8 h-8 p-2 flex items-center justify-center rounded-full",
                    enabled
                        ? "cursor-pointer text-blue-600 border border-blue-400 bg-blue-50 hover:text-blue-700 hover:border-blue-500 hover:bg-blue-100 active:scale-90 transition-all"
                        : "cursor-not-allowed text-gray-300 border border-gray-200",
                ];
            }
        },
        created() {
            this.pageState.pageHref = this.$route.params.page_href;
            this.showPage();
        },
    };
</script>
