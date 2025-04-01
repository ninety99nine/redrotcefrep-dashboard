<template>

    <div>

        <draggable
            @change="onChange"
            :class="draggableClass"
            ghost-class="bg-yellow-50"
            draggable=".draggable-column"
            handle=".row-column-draggable-handle"
            v-model="pageState.pageForm.sections[this.sectionIndex].rows[this.rowIndex].columns">

            <!-- Draggable Column -->
            <div
                :key="columnIndex"
                class="draggable-column py-2 px-4 bg-gray-700 rounded-lg"
                v-for="(column, columnIndex) in pageState.pageForm.sections[this.sectionIndex].rows[this.rowIndex].columns">

                <div class="flex justify-between items-center">

                    <span class="text-white text-xs">{{ column.name }}</span>

                    <div class="flex text-gray-300 space-x-2">

                        <!-- Edit Button -->
                        <div @click.stop="() => editColumn(columnIndex)" class="cursor-pointer hover:text-gray-800 active:scale-90">
                            <svg class="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>

                        <!-- Drag & Drop Handle -->
                        <div class="row-column-draggable-handle cursor-grab hover:text-gray-800 active:scale-90">
                            <svg @click.stop class="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                        </div>

                        <!-- Delete Button -->
                        <div class="cursor-pointer hover:text-gray-800 active:scale-90">
                            <svg class="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>

                    </div>

                </div>

            </div>

             <div v-if="pageState.pageForm.sections[this.sectionIndex].rows[this.rowIndex].columns.length < 6" class="pt-4">

                <!-- Add Column -->
                <Button
                    size="xs"
                    type="light"
                    :action="addColumn">
                    <span>Add</span>
                </Button>

             </div>

        </draggable>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { VueDraggableNext } from 'vue-draggable-next';

    export default {
        inject: ['pageState'],
        components: {
            Button, draggable: VueDraggableNext
        },
        props: {
            rowIndex: Number,
            sectionIndex: Number,
        },
        computed: {
            draggableClass() {
                return [
                    'relative min-h-24 bg-gray-100 space-y-2 rounded-lg overflow-hidden transition-all duration-400 p-4'
                ]
            },
            section() {
                return this.pageState.pageForm.sections[this.sectionIndex];
            },
            row() {
                return this.section.rows[this.rowIndex];
            }
        },
        methods: {
            addColumn() {

            },
            editColumn(columnIndex) {
                this.pageState.rowIndex = this.rowIndex;
                this.pageState.columnIndex = columnIndex;
                this.pageState.sectionIndex = this.sectionIndex;
                this.pageState.openColumnEditorDrawer();
            },
            onChange() {
                this.pageState.saveStateDebounced('Column moved');
            }
        }
    };

</script>
