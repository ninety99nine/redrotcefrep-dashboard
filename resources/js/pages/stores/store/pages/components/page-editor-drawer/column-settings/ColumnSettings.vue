<template>

    <div>

        Column settings

    </div>

</template>

<script>

    import cloneDeep from 'lodash/cloneDeep';
    import { usePageState } from '@Stores/page-store.js';

    export default {
        data() {
            return {
                localColumn: null,
                pageState: usePageState()
            };
        },
        computed: {
            section() {
                return this.pageState.sectionIndex == null ? null : this.pageState.pageForm.sections[this.pageState.sectionIndex];
            },
            column() {
                return this.pageState.columnIndex == null ? null : this.row.columns[this.pageState.columnIndex];
            },
            row() {
                return this.pageState.rowIndex == null ? null : this.section.rows[this.pageState.rowIndex];
            },
        },
        created() {
            this.localColumn = cloneDeep(this.column);
        }
    };

</script>
