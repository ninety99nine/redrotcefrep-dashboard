<template>
    <div :class="[...rowLayoutClass]">

        <!-- Columns -->
        <div
            class="p-4"
            :key="columnIndex"
            v-for="(column, columnIndex) in pageState.pageForm.sections[this.sectionIndex].rows[this.rowIndex].columns">

            <!-- Column Modules -->
            <ColumnModules :sectionIndex="sectionIndex" :rowIndex="rowIndex" :columnIndex="columnIndex"></ColumnModules>

        </div>

    </div>
</template>

<script>
import { usePageState } from '@Stores/page-store.js';
import ColumnModules from '@Pages/stores/store/pages/components/column-modules/ColumnModules.vue';

export default {
    components: {
        ColumnModules,
    },
    props: {
        rowIndex: Number,
        sectionIndex: Number,
    },
    data() {
        return {
            pageState: usePageState(),
        };
    },
    computed: {
        rowLayoutClass() {
            let classes = ['h-full divide-x divide-dashed grid'];

            // Map `row.layout` values to Tailwind CSS grid classes
            switch (this.row.layout) {
                case '4_4': // One column
                    classes.push('grid-cols-1');
                    break;

                case '1_2,1_2': // Two equal columns
                    classes.push('grid-cols-2');
                    break;

                case '1_3,1_3,1_3': // Three equal columns
                    classes.push('grid-cols-3');
                    break;

                case '1_4,1_4,1_4,1_4': // Four equal columns
                    classes.push('grid-cols-4');
                    break;

                case '1_5,1_5,1_5,1_5,1_5': // Five equal columns
                    classes.push('grid-cols-5');
                    break;

                case '1_6,1_6,1_6,1_6,1_6,1_6': // Six equal columns
                    classes.push('grid-cols-6');
                    break;

                case '2_5,3_5': // Two-fifths and three-fifths
                    classes.push('grid-cols-2', 'grid-cols-[2fr_3fr]');
                    break;

                case '3_5,2_5': // Three-fifths and two-fifths
                    classes.push('grid-cols-2', 'grid-cols-[3fr_2fr]');
                    break;

                case '1_3,2_3': // One-third and two-thirds
                    classes.push('grid-cols-2', 'grid-cols-[1fr_2fr]');
                    break;

                case '2_3,1_3': // Two-thirds and one-third
                    classes.push('grid-cols-2', 'grid-cols-[2fr_1fr]');
                    break;

                case '1_4,3_4': // One-fourth and three-fourths
                    classes.push('grid-cols-2', 'grid-cols-[1fr_3fr]');
                    break;

                case '3_4,1_4': // Three-fourths and one-fourth
                    classes.push('grid-cols-2', 'grid-cols-[3fr_1fr]');
                    break;

                case '1_4,1_2,1_4': // One-fourth, one-half, one-fourth
                    classes.push('grid-cols-3', 'grid-cols-[1fr_2fr_1fr]');
                    break;

                case '1_5,3_5,1_5': // One-fifth, three-fifths, one-fifth
                    classes.push('grid-cols-3', 'grid-cols-[1fr_3fr_1fr]');
                    break;

                case '1_4,1_4,1_2': // One-fourth, one-fourth, one-half
                    classes.push('grid-cols-3', 'grid-cols-[1fr_1fr_2fr]');
                    break;

                case '1_2,1_4,1_4': // One-half, one-fourth, one-fourth
                    classes.push('grid-cols-3', 'grid-cols-[2fr_1fr_1fr]');
                    break;

                case '1_5,1_5,3_5': // One-fifth, one-fifth, three-fifths
                    classes.push('grid-cols-3', 'grid-cols-[1fr_1fr_3fr]');
                    break;

                case '3_5,1_5,1_5': // Three-fifths, one-fifth, one-fifth
                    classes.push('grid-cols-3', 'grid-cols-[3fr_1fr_1fr]');
                    break;

                case '1_6,1_6,1_6,1_2': // One-sixth, one-sixth, one-sixth, one-half
                    classes.push('grid-cols-4', 'grid-cols-[1fr_1fr_1fr_3fr]');
                    break;

                case '1_2,1_6,1_6,1_6': // One-half, one-sixth, one-sixth, one-sixth
                    classes.push('grid-cols-4', 'grid-cols-[3fr_1fr_1fr_1fr]');
                    break;

                default: // Fallback
                    classes.push('grid-cols-1');
                    break;
            }
            return classes;
        },
        isDraggingRow() {
            return this.pageState.isDraggingRow;
        },
        selectedMode() {
            return this.pageState.selectedMode;
        },
        section() {
            return this.pageState.pageForm.sections[this.sectionIndex];
        },
        row() {
            return this.section.rows[this.rowIndex];
        },
    },
    methods: {
        addColumn() {
            // Logic for adding a column
        },
    },
};
</script>
