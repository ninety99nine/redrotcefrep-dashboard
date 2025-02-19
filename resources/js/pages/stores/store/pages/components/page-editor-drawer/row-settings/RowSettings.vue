<template>
    <div class="space-y-4">

        <template v-if="showingBasicTab">

            <!-- Visible -->
            <ToogleSwitch
                size="md"
                v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].visible"
                @change="saveStateDebounced(pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].visible ? 'Row visibility enabled' : 'Row visibility disabled')">
                Visible
            </ToogleSwitch>

            <!-- Name -->
            <TextInput
                label="Name"
                placeholder="Row"
                @input="saveStateDebounced('Row name changed')"
                v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].name">
            </TextInput>

            <div class="border-t border-dashed"></div>

            <!-- Background Color -->
            <div class="flex items-center">
                <Colorpicker
                    @change="saveStateDebounced('Row color changed')"
                    v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].backgroundColor" :disableHistory="true" :disableAlpha="true">
                </Colorpicker>
                <span class="text-sm">Background Color</span>
            </div>

            <!-- Column Layout -->
            <ColumnSelectInput
                label="Column Layout"
                @change="onColumnLayoutChange"
                v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].layout">
            </ColumnSelectInput>

            <RowColumns :sectionIndex="this.pageState.sectionIndex" :rowIndex="this.pageState.rowIndex"></RowColumns>

        </template>

        <template v-else-if="showingAdvancedTab">

        </template>

    </div>
</template>

<script>
    import { usePageState } from "@Stores/page-store.js";
    import TextInput from '@Partials/inputs/TextInput.vue';
    import Colorpicker from '@Partials/colorpicker/Colorpicker.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import RowColumns from '@Pages/stores/store/pages/components/page-editor-drawer/row-settings/row-columns/RowColumns.vue';
    import ColumnSelectInput from '@Pages/stores/store/pages/components/page-editor-drawer/row-settings/ColumnSelectInput.vue';

    export default {
        components: { TextInput, Colorpicker, ToogleSwitch, RowColumns, ColumnSelectInput },
        data() {
            return {
                pageState: usePageState()
            };
        },
        computed: {
            showingBasicTab() {
                return this.pageState.showingBasicTab;
            },
            showingAdvancedTab() {
                return this.pageState.showingAdvancedTab;
            }
        },
        methods: {
            saveStateDebounced(actionName) {
                this.pageState.saveStateDebounced(actionName);
            },
            onColumnLayoutChange(newLayout) {
                const row = this.pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex];
                const currentColumns = row.columns;
                const layoutParts = newLayout.split(","); // Extract column layout parts (e.g., ["1_2", "1_2"])
                const requiredColumnsCount = layoutParts.length;

                if (currentColumns.length < requiredColumnsCount) {
                    // Add missing columns
                    const columnsToAdd = requiredColumnsCount - currentColumns.length;
                    for (let i = 0; i < columnsToAdd; i++) {
                        this.pageState.addColumn(this.pageState.sectionIndex, this.pageState.rowIndex);
                    }
                } else if (currentColumns.length > requiredColumnsCount) {
                    // Remove extra columns
                    const excessColumns = currentColumns.length - requiredColumnsCount;

                    // Identify columns without modules and those with fewer modules
                    const columnsWithoutModules = currentColumns.filter(col => !col.modules || col.modules.length === 0);
                    const columnsWithFewModules = currentColumns.filter(col => col.modules && col.modules.length > 0);

                    // Remove columns without modules first
                    for (let i = 0; i < excessColumns; i++) {
                        if (columnsWithoutModules.length > 0) {
                            const columnIndexToRemove = currentColumns.indexOf(columnsWithoutModules.shift());
                            this.pageState.removeColumn(this.pageState.sectionIndex, this.pageState.rowIndex, columnIndexToRemove);
                        } else if (columnsWithFewModules.length > 0) {
                            // Relocate modules from columns being removed to remaining columns
                            const columnToRemove = columnsWithFewModules.shift();
                            const columnIndexToRemove = currentColumns.indexOf(columnToRemove);
                            const remainingColumns = currentColumns.filter((col, index) => index !== columnIndexToRemove);

                            columnToRemove.modules.forEach(module => {
                                const targetColumn = remainingColumns.sort((a, b) => (a.modules?.length || 0) - (b.modules?.length || 0))[0];
                                targetColumn.modules.push(module);
                            });

                            this.pageState.removeColumn(this.pageState.sectionIndex, this.pageState.rowIndex, columnIndexToRemove);
                        }
                    }
                }

                // Save the updated layout
                this.saveStateDebounced("Row column layout changed");
            },
        },
    };
</script>
