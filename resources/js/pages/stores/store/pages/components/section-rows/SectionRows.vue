<template>

    <div class="p-4">

        <draggable
            @end="onDragEnd"
            @change="onChange"
            @start="onDragStart"
            direction="vertical"
            :class="draggableClass"
            chosen-class="bg-red-50"
            ghost-class="bg-yellow-50"
            draggable=".draggable-row"
            handle=".section-row-draggable-handle"
            v-model="pageState.pageForm.sections[this.sectionIndex].rows"
            :group="{
                name: 'section-rows',
                pull: true,
                put: (to, from, item) => {
                    return item.dataset.type === 'row';  // Only accept rows
                }
            }">

            <!-- Draggable Row -->
            <div
                :key="rowIndex"
                data-type="row"
                class="border rounded-lg border-green-400 draggable-row"
                v-for="(row, rowIndex) in pageState.pageForm.sections[this.sectionIndex].rows">

                <div class="flex rounded-lg">

                    <div class="w-full bg-white">

                        <!-- Row Columns -->
                        <RowColumns :sectionIndex="sectionIndex" :rowIndex="rowIndex"></RowColumns>

                    </div>

                    <div class="flex flex-col flex-shrink-0 justify-between text-green-800 bg-green-400 py-4 px-2 space-y-4">

                        <div class="space-y-4">

                            <!-- Edit Button -->
                            <div @click.stop="() => editRow(rowIndex)" class="cursor-pointer hover:text-green-800 active:scale-90">
                                <svg class="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </div>

                            <!-- Drag & Drop Handle -->
                            <div class="section-row-draggable-handle cursor-grab hover:text-green-800 active:scale-90">
                                <svg @click.stop class="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                </svg>
                            </div>

                        </div>

                        <!-- Delete Button -->
                        <div class="cursor-pointer hover:text-green-800 active:scale-90">
                            <svg @click.stop="() => removeRow(rowIndex)" class="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>

                    </div>

                </div>

            </div>

            <!-- Add Row -->
            <transition name="fade-1" mode="out-in">

                <!-- Row Drop Zone -->
                <div v-if="isDraggingRow && !hasRows" class="absolute w-full h-full flex justify-center items-center ignore-elements">
                    <div class="flex items-center space-x-2 animate-bounce">
                        <span class="text-xl">👋</span>
                        <span class="text-sm">Drop here</span>
                    </div>
                </div>

                <div v-else-if="showAddRowButton" :class="addRowButtonClass">

                    <!-- Add Row -->
                    <div
                        @click="addRow"
                        class="w-8 h-8 bg-green-100 text-green-800 rounded-full flex justify-center items-center cursor-pointer shadow border border-green-400 hover:scale-95 hover:shadow-sm hover:border-green-400 active:scale-90 active:bg-green-200 transition-all">
                        <span>+</span>
                    </div>

                </div>

            </transition>

        </draggable>

    </div>

</template>

<script>

    import debounce from 'lodash/debounce';
    import { VueDraggableNext } from 'vue-draggable-next';
    import RowColumns from '@Pages/stores/store/pages/components/row-columns/RowColumns.vue';

    export default {
        inject: ['pageState'],
        components: {
            draggable: VueDraggableNext, RowColumns
        },
        props: {
            sectionIndex: Number
        },
        data() {
            return {
                showAddRowButton: true,
                debounceShowAddRowButton: null,
            }
        },
        watch: {
            'pageState.isDraggingRow': {
                handler(newVal) {
                    if (newVal) {
                        this.showAddRowButton = false;
                    } else {
                        this.debounceShowAddRowButton();
                    }
                }
            }
        },
        computed: {
            draggableClass() {
                return [
                    'relative min-h-24 space-y-4 rounded-lg transition-all duration-400',
                    { 'bg-gray-100' : !this.showAddRowButton }
                ]
            },
            addRowButtonClass() {
                return [
                    'w-full flex justify-center items-center ignore-elements',
                    { 'min-h-24' : !this.hasRows }
                ]
            },
            isDraggingRow() {
                return this.pageState.isDraggingRow;
            },
            selectedMode() {
                return this.pageState.selectedMode;
            },
            hasRows() {
                return this.pageState.pageForm.sections[this.sectionIndex].rows.length > 0;
            }
        },
        methods: {
            addRow() {
                this.pageState.addRow(this.sectionIndex);
            },
            removeRow(rowIndex) {
                this.pageState.removeRow(this.sectionIndex, rowIndex);
            },
            editRow(rowIndex) {
                this.pageState.moduleIndex = null;
                this.pageState.columnIndex = null;
                this.pageState.rowIndex = rowIndex;
                this.pageState.sectionIndex = this.sectionIndex;
                this.pageState.openPageEditorDrawer();
            },
            onChange() {
                this.pageState.saveStateDebounced('Row moved');
            },
            onDragStart() {
                this.pageState.isDraggingRow = true;
            },
            onDragEnd(event) {
                this.pageState.isDraggingRow = false;
            },
            initializeDebounce() {
                this.debounceShowAddRowButton = debounce(() => {
                    this.showAddRowButton = true;
                }, 500);
            },
        },
        created() {
            this.initializeDebounce();
        },
    };

</script>
