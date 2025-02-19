import router from '@/router';
import LZString from 'lz-string';
import { diff } from 'deep-diff';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { capitalize } from 'lodash';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import { useFormState } from '@Stores/form-store.js';
import { useNotificationState } from '@Stores/notification-store.js';
import { getApi, postApi, putApi, deleteApi } from '@Repositories/api-repository.js';

const MODES = {
    BLOCK_BUILDER: { name: 'Block Builder', value: 'block builder' },
    VISUAL_BUILDER: { name: 'Visual Builder', value: 'visual builder' },
    PREVIEW: { name: 'Preview', value: 'preview' }
};

const DRAWER_TABS = {
    BASIC: { name: 'Basic', value: 'basic' },
    ADVANCED: { name: 'Advanced', value: 'advanced' }
};

export const usePageState = defineStore('page', {
    state: () => {
        return {
            page: null,
            pageHref: null,
            pageForm: null,
            pendingUploads: [],
            isDraggingRow: false,
            isLoadingPage: false,
            isDeletingPage: false,
            isUpdatingPage: false,
            originalPageForm: null,
            isDraggingModule: false,

            rowIndex: null,
            moduleIndex: null,
            columnIndex: null,
            sectionIndex: null,
            selectedDrawerTab: DRAWER_TABS.BASIC.value,

            updateProgress: {
                percentage: 0,
                totalSteps: 0,
                completedSteps: 0,
                message: "Saving...",
            },

            history: {
                timeline: [],
                currentIndex: null
            }
        }
    },
    actions: {
        saveStateDebounced: debounce(function (actionName) {
            this.saveState(actionName);
        }, 500),
        saveState(actionName) {
            if (!actionName) {
                console.warn("Action name is required to save the state.");
                return;
            }

            //  Save to storage
            this.pageForm
            localStorage.setItem(`pageForm:${pageHref}`, this.pageForm);

            if (this.history.timeline.length === 0) {
                this.history.timeline.unshift({
                    state: LZString.compress(JSON.stringify(this.pageForm)),
                    timestamp: new Date().toISOString(),
                    name: actionName,
                });
                this.history.currentIndex = 0;
                return;
            }

            if (this.history.currentIndex > 0) {
                this.history.timeline = this.history.timeline.slice(this.history.currentIndex);
                this.history.currentIndex = 0;
            }

            const lastState = JSON.parse(LZString.decompress(this.history.timeline[0].state));
            const differences = diff(lastState, this.pageForm);

            if (differences && differences.length > 0) {
                this.history.timeline.unshift({
                    state: LZString.compress(JSON.stringify(this.pageForm)),
                    timestamp: new Date().toISOString(),
                    name: actionName,
                });
                this.history.currentIndex = 0;
            }
        },
        undo() {
            if (this.canUndo) {
                this.history.currentIndex += 1;
                const previousState = this.history.timeline[this.history.currentIndex];
                this.pageForm = JSON.parse(LZString.decompress(previousState.state));
            } else {
                console.warn("Cannot undo. Already at the earliest state.");
            }
        },
        redo() {
            if (this.canRedo) {
                this.history.currentIndex -= 1;
                const nextState = this.history.timeline[this.history.currentIndex];
                this.pageForm = JSON.parse(LZString.decompress(nextState.state));
            } else {
                console.warn("Cannot redo. Already at the latest state.");
            }
        },
        jumpToHistory(index) {
            if (index >= 0 && index < this.history.timeline.length) {
                this.history.currentIndex = index;
                const selectedState = this.history.timeline[index];
                this.pageForm = JSON.parse(LZString.decompress(selectedState.state));
            } else {
                console.warn("Invalid history index.");
            }
        },
        clearHistory() {
            if (this.history.timeline.length > 0) {
                const originalState = this.history.timeline[0];
                this.history.timeline = [originalState];
                this.history.currentIndex = 0;
            } else {
                this.history.timeline = [];
                this.history.currentIndex = null;
            }
        },
        setPage(page) {
            this.page = page;
        },
        setMode(mode) {
            this.selectedMode = mode.value;
        },
        setDrawerTab(drawerTab) {
            this.selectedDrawerTab = drawerTab.value;
        },
        setIsLoadingPage(status) {
            this.isLoadingPage = status;
        },
        setIsUpdatingPage(status) {
            this.isUpdatingPage = status;
        },
        setIsDeletingPage(status) {
            this.isDeletingPage = status;
        },
        resetPageForm() {
            this.setPageForm(this.page);
        },
        setPageForm(page = null) {

            if(page) {
                this.pageForm = {
                    id: page.id,
                    title: page.title,
                    visible: page.visible,
                    homepage: page.homepage,
                    backgroundColor: page.backgroundColor,
                    sections: page._relationships.sections.map((section) => {
                        return {
                            id: section.id,
                            name: section.name,
                            visible: section.visible,
                            topDividerType: section.topDividerType,
                            backgroundColor: section.backgroundColor,
                            topDividerColor: section.topDividerColor,
                            topDividerHeight: section.topDividerHeight,
                            bottomDividerType: section.bottomDividerType,
                            bottomDividerColor: section.bottomDividerColor,
                            bottomDividerHeight: section.bottomDividerHeight,
                            rows: section._relationships.rows.map((row) => {
                                return {
                                    id: row.id,
                                    name: row.name,
                                    layout: row.layout,
                                    visible: row.visible,
                                    backgroundColor: row.backgroundColor,
                                    columns: row._relationships.columns.map((column) => {
                                        return {
                                            id: column.id,
                                            name: column.name,
                                            settings: column.settings,
                                            modules: column._relationships.modules.map((module) => {

                                                let modulePayload = {
                                                    id: module.id,
                                                    name: module.name,
                                                    type: module.type,
                                                    settings: module.settings
                                                };

                                                if(module.type == 'image') {
                                                    modulePayload.mediaFiles = module._relationships.mediaFiles;
                                                }

                                                return modulePayload;

                                            }),
                                        };
                                    }),
                                };
                            }),
                        };
                    })
                };

            }else{

                this.pageForm = {
                    title: '',
                    visible: false,
                    homepage: false
                };

            }

            this.setOriginalPageForm();

        },
        setOriginalPageForm() {
            this.originalPageForm = cloneDeep(this.pageForm);
        },
        setOriginalPageForm() {
            this.originalPageForm = cloneDeep(this.pageForm);
        },
        openPageEditorDrawer() {
            this.pageEditorDrawer.showDrawer();
        },
        togglePageEditorDrawer() {
            this.pageEditorDrawer.toggleDrawer();
        },
        closePageEditorDrawer() {
            this.pageEditorDrawer.hideDrawer();
        },

        /**
         * Add a new section to the page
         */
        addSection() {
            this.pageForm.sections.push({
                visible: 1,
                id: uuidv4(),
                name: 'Section',
                topDividerType: null,
                backgroundColor: null,
                topDividerColor: null,
                topDividerHeight: null,
                bottomDividerType: null,
                bottomDividerColor: null,
                bottomDividerHeight: null,
                rows: [],
            });
            this.saveStateDebounced('Section added');
        },

        /**
         * Remove a section from the page at the given sectionIndex
         * @param {Number} sectionIndex
         */
        removeSection(sectionIndex) {
            this.pageForm.sections.splice(sectionIndex, 1);
            this.saveStateDebounced('Section removed');
        },

        /**
         * Add a new row to the section at the given sectionIndex
         * @param {Number} sectionIndex
         */
        addRow(sectionIndex) {
            const section = this.pageForm.sections[sectionIndex];
            section.rows.push({
                name: 'Row',
                id: uuidv4(),
                visible: true,
                layout: '4_4',
                backgroundColor: null,
                columns: [{
                    name: 'Column',
                    settings: {},
                    modules: [],
                }],
            });
            this.saveStateDebounced('Row added');
        },

        /**
         * Remove a row from the section at the given sectionIndex and rowIndex
         * @param {Number} sectionIndex
         * @param {Number} rowIndex
         */
        removeRow(sectionIndex, rowIndex) {
            const section = this.pageForm.sections[sectionIndex];
            section.rows.splice(rowIndex, 1);
            this.saveStateDebounced('Row removed');
        },

        /**
         * Add a new column to the row at the given sectionIndex and rowIndex
         * @param {Number} sectionIndex
         * @param {Number} rowIndex
         */
        addColumn(sectionIndex, rowIndex) {
            const row = this.pageForm.sections[sectionIndex].rows[rowIndex];
            row.columns.push({
                name: 'Column',
                id: uuidv4(),
                settings: {},
                modules: []
            });
            this.saveStateDebounced('Column added');
        },

        /**
         * Remove a column from the row at the given sectionIndex, rowIndex, and columnIndex
         * Redistributes the modules to other columns if necessary
         * @param {Number} sectionIndex
         * @param {Number} rowIndex
         * @param {Number} columnIndexToRemove
         */
        removeColumn(sectionIndex, rowIndex, columnIndexToRemove) {
            const row = this.pageForm.sections[sectionIndex].rows[rowIndex];
            const columnToRemove = row.columns[columnIndexToRemove];

            // Redistribute modules if the column being removed has modules
            if (columnToRemove.modules && columnToRemove.modules.length > 0) {
                // Create a deep clone of the remaining columns to avoid unintended mutations
                const remainingColumns = row.columns.filter((_, index) => index !== columnIndexToRemove);

                columnToRemove.modules.forEach(module => {
                    // Deep clone and sort the remaining columns to find the column with the fewest modules
                    const sortedRemainingColumns = cloneDeep(remainingColumns).sort(
                        (a, b) => (a.modules?.length || 0) - (b.modules?.length || 0)
                    );

                    // Assign the module to the column with the fewest modules
                    const targetColumn = sortedRemainingColumns[0];
                    if (targetColumn) {
                        targetColumn.modules.push(module);
                    }
                });
            }

            // Remove the column
            row.columns.splice(columnIndexToRemove, 1);
            this.saveStateDebounced('Column removed');
        },

        /**
         * Get modules
         * @returns {Array} Modules array
         */
        getModules() {
            return [
                {
                    name: 'Text',
                    type: 'text',
                    settings: {
                        content: ''
                    }
                },
                {
                    name: 'Image',
                    type: 'image',
                    settings: {
                        height: 'auto',
                        borderRadius: '0px',
                        presentation: 'full width',   //  options: full width, grid, slideshow
                        grid: {
                            columns: 2
                        },
                        slideshow: {
                            autoslide: false
                        },
                        useImageLinks: false,        // false = upload images, true = use external links
                        imageLinks: [

                        ]
                    },
                    mediaFiles: []
                },
                {
                    name: 'Video',
                    type: 'video',
                    settings: {
                        src: '',
                        width: '100%',
                        controls: true,
                        height: 'auto',
                        autoplay: false,
                    }
                },
                {
                    name: 'Button',
                    type: 'button',
                    settings: {
                        link: '#',
                        label: 'Click Me',
                        color: '#ffffff',
                        borderRadius: '4px',
                        padding: '10px 20px',
                        backgroundColor: '#3e83f8',
                    }
                },
                {
                    name: 'Divider',
                    type: 'divider',
                    settings: {
                        height: '20px',
                    }
                },
            ];
        },

        /**
         * Get module icon
         * @param {String} type
         * @returns {String} Module icon
         */
        getModuleIcon(type) {
            const icons = {
                text: "M12,3.5C12,3.2,11.8,3,11.5,3h-8C3.2,3,3,3.2,3,3.5v1C3,4.8,3.2,5,3.5,5S4,4.8,4,4.5V4h3v6H6.5C6.2,10,6,10.2,6,10.5C6,10.8,6.2,11,6.5,11h2C8.8,11,9,10.8,9,10.5C9,10.2,8.8,10,8.5,10H8V4h3v0.5C11,4.8,11.2,5,11.5,5S12,4.8,12,4.5V3.5z",
                image: "M4,4C3.4,4,3,4.4,3,5v6c0,0.6,0.4,1,1,1h8c0.6,0,1-0.4,1-1V5c0-0.6-0.4-1-1-1H4z M12,8.5l-1.1-1.1c-0.2-0.2-0.5-0.2-0.7,0L7.9,9.5c-0.2,0.2-0.5,0.2-0.7,0L6.7,9C6.6,8.8,6.2,8.8,6.1,9L4,11V5h8V8.5z M5,7c0-0.6,0.4-1,1-1s1,0.4,1,1c0,0.6-0.4,1-1,1S5,7.6,5,7z",
                video: "M9.9,7.8C10,7.9,10,7.9,10,8c0,0.1,0,0.1-0.1,0.2c0,0.1-0.1,0.1-0.1,0.1L6.7,9.9C6.6,10,6.5,10,6.5,10c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1-0.1-0.2-0.1C6,9.8,6,9.7,6,9.7V6.3c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.2-0.1s0.1,0,0.2,0s0.2,0,0.2,0.1l3.1,1.7C9.9,7.7,9.9,7.8,9.9,7.8z M2,11V5c0-0.6,0.4-1,1-1h10c0.6,0,1,0.4,1,1v6c0,0.6-0.4,1-1,1H3C2.4,12,2,11.6,2,11z M3,11h10V5H3V11z",
                button: "M4,11h4v0.6C8,12,8.2,12.2,8.5,12l0.9-0.4L10,13l0.1,0.2c0.1,0.1,0.1,0.2,0.2,0.3c0.1,0.1,0.2,0.1,0.4,0.1c0.1,0,0.2,0,0.3-0.1c0.1-0.1,0.2-0.1,0.2-0.2c0.1-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2,0-0.3l-0.1-0.2l-0.6-1.4l0.2-0.1H12c0.6,0,1-0.4,1-1V5c0-0.6-0.4-1-1-1H4C3.4,4,3,4.4,3,5v5C3,10.6,3.4,11,4,11z M4,5h8v5h0c0-0.1-0.1-0.1-0.1-0.1L8.5,6.6C8.4,6.6,8,6.4,8,7v3H4V5z",
                divider: "M12.5,7H8V3.7l0.1,0.1C8.3,4,8.7,4,8.9,3.9C9,3.7,9,3.3,8.9,3.1l-1-1C7.8,2.1,7.6,2,7.5,2S7.2,2.1,7.1,2.1l-1,1C6,3.3,6,3.7,6.1,3.9C6.3,4,6.7,4,6.9,3.9L7,3.7V7H2.5C2.2,7,2,7.2,2,7.5C2,7.8,2.2,8,2.5,8H7v3.3l-0.1-0.1c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7l1,1C7.2,12.9,7.4,13,7.5,13s0.3-0.1,0.4-0.1l1-1c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L8,11.3V8h4.5C12.8,8,13,7.8,13,7.5C13,7.2,12.8,7,12.5,7z"
            };

            return icons[type] || null;
        },

        /**
         * Add a new module to the column at the given sectionIndex, rowIndex, and columnIndex
         * @param {Number} sectionIndex
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Object} module
         */
        addModule(sectionIndex, rowIndex, columnIndex, module) {
            const column = this.pageForm.sections[sectionIndex].rows[rowIndex].columns[columnIndex];

            module.id = uuidv4();
            column.modules.push(module);
            this.saveStateDebounced(`${capitalize(module.type)} module added`);
        },

        /**
         * Remove a module from the column at the given sectionIndex, rowIndex, columnIndex, and moduleIndex
         * @param {Number} sectionIndex
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Number} moduleIndex
         * @param {String} moduleType
         */
        removeModule(sectionIndex, rowIndex, columnIndex, moduleIndex, moduleType) {
            const column = this.pageForm.sections[sectionIndex].rows[rowIndex].columns[columnIndex];
            column.modules.splice(moduleIndex, 1);
            this.saveStateDebounced(`${capitalize(moduleType)} module removed`);
        },

        showPage(showPageUrl) {

            this.setIsLoadingPage(true);

            let params = {
                '_relationships': 'sections.rows.columns.modules.mediaFiles'
            };

            getApi(showPageUrl, params).then(response => {

                if(response.status == 200) {

                    if(response.data.exists) {

                        this.setPageForm(response.data.page);
                        this.setPage(response.data.page);
                        this.saveState('Loaded page');


                    }else{

                        useNotificationState().addWarningNotification('Page does not exist');

                    }

                }

                //  Stop loader
                this.setIsLoadingPage(false);

            }).catch(errorException => {

                //  Stop loader
                this.setIsLoadingPage(false);
                useFormState().setServerFormErrors(errorException);

            });
        },
        updatePage() {
            if (this.pageForm.title.trim() === '') {
                useFormState().setFormError('title', 'The page title is required');
                useNotificationState().addWarningNotification('The page title is required');
                return;
            }

            // Start loader & Reset Progress
            this.updateProgress.percentage = 0;
            this.updateProgress.message = "Saving page structure...";
            this.updateProgress.totalSteps = 1; // Initial step for page update

            // Start loader
            this.setIsUpdatingPage(true);

            // Extract pending uploads and remove mediaFiles before saving
            this.pendingUploads = [];

            // Create a deep copy to modify before sending to the API
            const pageFormCopy = cloneDeep(this.pageForm);

            pageFormCopy.sections.forEach(section => {
                section.rows.forEach(row => {
                    row.columns.forEach(column => {
                        column.modules.forEach(module => {
                            if (module.type === 'image') {

                                // Extract only new media files
                                const mediaFiles = module.mediaFiles.filter(file => !file.id);

                                if (mediaFiles.length) {
                                    this.pendingUploads.push({
                                        moduleId: module.id,
                                        mediaFiles: mediaFiles
                                    });
                                }

                                // Remove `mediaFiles` from request to lighten the payload
                                delete module.mediaFiles;
                            }
                        });
                    });
                });
            });

            // Increase total steps based on pending uploads
            this.updateProgress.totalSteps += this.pendingUploads.reduce((acc, curr) => acc + curr.mediaFiles.length, 0);

            const data = {
                '_relationships': 'sections.rows.columns.modules.mediaFiles',
                ...pageFormCopy,
                return: true
            };

            putApi(this.page._links.updatePage, data).then(async response => {
                if (response.status === 200 && response.data.updated) {

                    this.updateProgress.completedSteps++;
                    this.updateProgress.percentage = Math.round((this.updateProgress.completedSteps / this.updateProgress.totalSteps) * 100);
                    this.updateProgress.message = "Page structure saved. Uploading images...";

                    // Push pending uploads after page updates
                    await this.pushPendingUploads(response.data.page);

                    this.setPageForm(response.data.page);
                    this.updateProgress.message = "Page updated successfully!";
                    useNotificationState().addSuccessNotification('Page updated');

                } else {
                    useFormState().setGeneralFormError(response.data.message);
                    useNotificationState().addWarningNotification(response.data.message);
                }

                // Stop loader
                this.setIsUpdatingPage(false);

            }).catch(errorException => {
                this.setIsUpdatingPage(false);
                useFormState().setServerFormErrors(errorException);
            });
        },
        async pushPendingUploads(page) {
            if (this.pendingUploads.length === 0) {
                this.updateProgress.percentage = 100;
                return;
            }

            let totalFiles = this.pendingUploads.reduce((sum, upload) => sum + upload.mediaFiles.length, 0);
            let completedFiles = 0;
            let baseProgress = 50; // The page save process takes 50% of progress
            let perFileProgressWeight = (100 - baseProgress) / totalFiles; // Remaining 50% is split among files

            for (const pendingUpload of this.pendingUploads) {
                const module = page._relationships.sections
                    .flatMap(section => section._relationships.rows)
                    .flatMap(row => row._relationships.columns)
                    .flatMap(column => column._relationships.modules)
                    .find(m => m.id === pendingUpload.moduleId);

                if (!module || !module._links || !module._links.createModuleMediaFile) {
                    console.error(`No upload link found for module ${pendingUpload.moduleId}`);
                    continue;
                }

                const createModuleMediaFileUrl = module._links.createModuleMediaFile;

                for (const [mediaFileIndex, mediaFile] of pendingUpload.mediaFiles.entries()) {
                    if (!mediaFile.fileRef) {
                        console.warn(`No file object found for media file at index ${mediaFileIndex}`);
                        continue;
                    }

                    const formData = new FormData();
                    formData.append('module_file', mediaFile.fileRef);
                    formData.append('return', 'true');

                    mediaFile.uploading = true;
                    this.updateProgress.message = `Uploading ${mediaFile.fileRef.name}...`;
                    console.log(`Uploading ${mediaFile.fileRef.name}...`);

                    try {
                        const response = await postApi(createModuleMediaFileUrl, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                            onUploadProgress: (progressEvent) => {

                                console.log(`${progressEvent.loaded}/${progressEvent.total}`);

                                // Track the percentage of this individual file upload
                                let fileUploadProgress = (progressEvent.loaded / progressEvent.total) * perFileProgressWeight;

                                // Calculate total progress including previous completed uploads
                                this.updateProgress.percentage = baseProgress + (completedFiles * perFileProgressWeight) + fileUploadProgress;

                                console.log(`Progress: ${this.updateProgress.percentage}%`);
                            }
                        });

                        if (response.status === 200 && response.data.created) {

                            const module =
                                this.pageForm.sections
                                    ?.[this.sectionIndex]
                                    ?.rows?.[this.rowIndex]
                                    ?.columns?.[this.columnIndex]
                                    ?.modules?.[this.moduleIndex];

                            if (!module?.mediaFiles?.[mediaFileIndex]) return;

                            // Replace media file in pageForm
                            module.mediaFiles[mediaFileIndex] = response.data.mediaFiles[0];

                            this.pendingUploads.find(p => p.moduleId === pendingUpload.moduleId).mediaFiles[mediaFileIndex] = {
                                errorMessage: null,
                                uploading: false,
                                uploaded: true,
                                fileRef: null
                            };

                            completedFiles++;

                        } else {
                            mediaFile.uploading = false;
                            mediaFile.errorMessage = response.data.message || "Upload failed.";
                        }
                    } catch (error) {
                        mediaFile.uploading = false;
                        mediaFile.errorMessage = error.message || "Upload error.";
                    }

                    // Update progress only **after** the upload is fully complete
                    this.updateProgress.percentage = baseProgress + (completedFiles * perFileProgressWeight);

                    console.log(`Closing Progress: ${this.updateProgress.percentage}%`);
                    console.log(`Completed ${completedFiles}/${totalFiles}`);
                }
            }

            this.updateProgress.message = "All uploads complete!";
            this.updateProgress.percentage = 100;
        },
        deletePage() {

            //  Start loader
            this.setIsDeletingPage(true);

            deleteApi(this.page._links.deletePage).then(response => {

                if(response.status == 200) {

                    if(response.data.deleted) {

                        useNotificationState().addSuccessNotification('Page deleted');

                        //  Navigate to show dashboard
                        router.replace({ name: 'show-store-pages' }).then(() => {
                            // Ensure scroll to top after route navigation
                            window.scrollTo(0, 0);
                        });

                    }else{

                        useFormState().setGeneralFormError(response.data.message);
                        useNotificationState().addWarningNotification(response.data.message);

                    }

                }

                //  Stop loader
                this.setIsDeletingPage(false);

            }).catch(errorException => {

                //  Stop loader
                this.setIsDeletingPage(false);
                useFormState().setServerFormErrors(errorException);

            });

        }
    },
    getters: {
        modes() {
            return Object.values(MODES);
        },
        drawerTabs() {
            return Object.values(DRAWER_TABS);
        },
        showingBasicTab() {
            return this.selectedDrawerTab == DRAWER_TABS.BASIC.value;
        },
        showingAdvancedTab() {
            return this.selectedDrawerTab == DRAWER_TABS.ADVANCED.value;
        },
        canUndo() {
            return this.history.currentIndex < this.history.timeline.length - 1;
        },
        canRedo() {
            return this.history.currentIndex > 0;
        },
        formHasChanged() {
            var a = cloneDeep(this.pageForm);
            var b = cloneDeep(this.originalPageForm);
            return !isEqual(a, b);
        },
        mustSaveChanges() {
            return this.formHasChanged && !this.isSubmitting;
        }
    },
})
