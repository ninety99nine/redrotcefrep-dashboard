<template>
    <Drawer ref="pageEditorDrawer" placement="right" :bodyScrolling="true" :backdrop="false" :hideCloseIcon="true">
        <template #content>
            <div v-if="currentScope" class="h-full flex flex-col">
                <!-- Header -->
                <div class="flex justify-between items-center border-b shadow-sm p-4 bg-gray-100">
                    <div class="flex items-center space-x-2">
                        <h2 class="text-lg md:text-xl font-bold">
                            {{ scopeTitle }}
                        </h2>
                    </div>
                    <!-- Close Icon -->
                    <svg
                        @click="closePageEditorDrawer"
                        class="w-6 h-6 text-black cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <!-- Breadcrumb -->
                <div v-if="currentScope !== 'page'" class="flex items-center space-x-2 text-xs text-gray-600 px-4 py-2 bg-gray-100 border-b shadow-sm">
                    <span
                        :class="breadcrumbClass('page')"
                        class="cursor-pointer hover:underline hover:text-blue-600 active:text-blue-800 transition"
                        @click="onBreadcrumbClick('page')">
                        Page
                    </span>
                    <span>/</span>
                    <span
                        :class="breadcrumbClass('section')"
                        class="cursor-pointer hover:underline hover:text-blue-600 active:text-blue-800 transition"
                        @click="onBreadcrumbClick('section')">
                        Section
                    </span>
                    <template v-if="['row', 'column', 'module'].includes(currentScope)">
                        <span>/</span>
                        <span
                            :class="breadcrumbClass('row')"
                            class="cursor-pointer hover:underline hover:text-blue-600 active:text-blue-800 transition"
                            @click="onBreadcrumbClick('row')">
                            Row
                        </span>
                    </template>
                    <template v-if="['column', 'module'].includes(currentScope)">
                        <span>/</span>
                        <span
                            :class="breadcrumbClass('column')"
                            class="cursor-pointer hover:underline hover:text-blue-600 active:text-blue-800 transition"
                            @click="onBreadcrumbClick('column')">
                            Column
                        </span>
                    </template>
                    <template v-if="currentScope === 'module'">
                        <span>/</span>
                        <span
                            :class="breadcrumbClass('module')"
                            class="cursor-pointer hover:underline hover:text-blue-600 active:text-blue-800 transition">
                            Module
                        </span>
                    </template>
                </div>

                <!-- Tabs -->
                <div class="flex border-b bg-white">
                    <div
                        :key="index"
                        :class="drawerTabClass(drawerTab)"
                        @click="() => setDrawerTab(drawerTab)"
                        v-for="(drawerTab, index) in drawerTabs">
                        {{ drawerTab.name }}
                    </div>
                </div>

                <!-- Settings Content -->
                <div class="px-4 py-8 flex-1 overflow-y-auto">
                    <template v-if="currentScope === 'module'">
                        <TextModuleSettings v-if="module && module.type === 'text'" />
                        <ImageModuleSettings v-if="module && module.type === 'image'" />
                    </template>
                    <template v-else-if="currentScope === 'column'">
                        <ColumnSettings :column="column" />
                    </template>
                    <template v-else-if="currentScope === 'row'">
                        <RowSettings :row="row" />
                    </template>
                    <template v-else-if="currentScope === 'section'">
                        <SectionSettings :section="section" />
                    </template>
                    <template v-else-if="currentScope === 'page'">
                        <PageSettings :page="page" />
                    </template>
                </div>
            </div>
        </template>
    </Drawer>
</template>

<script>

    import Drawer from "@Partials/drawers/Drawer.vue";
    import RowSettings from "@Pages/stores/store/pages/components/page-editor-drawer/row-settings/RowSettings.vue";
    import PageSettings from "@Pages/stores/store/pages/components/page-editor-drawer/page-settings/PageSettings.vue";
    import ColumnSettings from "@Pages/stores/store/pages/components/page-editor-drawer/column-settings/ColumnSettings.vue";
    import SectionSettings from "@Pages/stores/store/pages/components/page-editor-drawer/section-settings/SectionSettings.vue";
    import TextModuleSettings from "@Pages/stores/store/pages/components/page-editor-drawer/module-settings/TextModuleSettings.vue";
    import ImageModuleSettings from "@Pages/stores/store/pages/components/page-editor-drawer/module-settings/ImageModuleSettings.vue";

    export default {
        inject: ['pageState'],
        components: { Drawer, RowSettings, SectionSettings, ColumnSettings, TextModuleSettings, ImageModuleSettings, PageSettings },
        data() {
            return {
                activeTab: 'Content'
            };
        },
        computed: {
            currentScope() {
                if (this.pageState.moduleIndex !== null) return "module";
                if (this.pageState.columnIndex !== null) return "column";
                if (this.pageState.rowIndex !== null) return "row";
                if (this.pageState.sectionIndex !== null) return "section";
                return "page"; // Default to "page"
            },
            scopeTitle() {
                switch (this.currentScope) {
                    case "page":
                        return "Page";
                    case "section":
                        return "Section";
                    case "row":
                        return "Row";
                    case "column":
                        return "Column";
                    case "module":
                        return "Module";
                    default:
                        return "Settings";
                }
            },
            page() {
                return this.pageState.pageForm; // Assume pageForm represents the entire page
            },
            section() {
                return this.pageState.sectionIndex !== null
                    ? this.pageState.pageForm.sections[this.pageState.sectionIndex]
                    : null;
            },
            row() {
                return this.pageState.rowIndex !== null ? this.section.rows[this.pageState.rowIndex] : null;
            },
            column() {
                return this.pageState.columnIndex !== null ? this.row.columns[this.pageState.columnIndex] : null;
            },
            module() {
                return this.pageState.moduleIndex !== null ? this.column.modules[this.pageState.moduleIndex] : null;
            },
            drawerTabs() {
                return this.pageState.drawerTabs;
            },
            selectedDrawerTab() {
                return this.pageState.selectedDrawerTab;
            },
        },
        methods: {
            breadcrumbClass(scope) {
                return this.currentScope === scope
                    ? "font-semibold text-blue-800 underline"
                    : "hover:underline hover:text-blue-600 active:text-blue-800";
            },
            drawerTabActive(drawerTab) {
                return this.selectedDrawerTab == drawerTab.value;
            },
            drawerTabClass(drawerTab) {
                var classes = ['text-xs px-4 pt-4 pb-2 cursor-pointer transition'];

                this.drawerTabActive(drawerTab)
                    ? classes.push("border-b-2 border-blue-600 font-medium text-blue-600 bg-blue-50")
                    : classes.push("text-gray-500 hover:text-blue-600");

                return classes;
            },
            setDrawerTab(drawerTab) {
                this.pageState.setDrawerTab(drawerTab);
            },
            onBreadcrumbClick(scope) {
                if (scope === "page") {
                    this.pageState.sectionIndex = null;
                    this.pageState.rowIndex = null;
                    this.pageState.columnIndex = null;
                    this.pageState.moduleIndex = null;
                } else if (scope === "section") {
                    this.pageState.rowIndex = null;
                    this.pageState.columnIndex = null;
                    this.pageState.moduleIndex = null;
                } else if (scope === "row") {
                    this.pageState.columnIndex = null;
                    this.pageState.moduleIndex = null;
                } else if (scope === "column") {
                    this.pageState.moduleIndex = null;
                }
            },
            closePageEditorDrawer() {
                this.pageState.closePageEditorDrawer();
            },
        },
        mounted() {
            this.pageState.pageEditorDrawer = this.$refs.pageEditorDrawer;
        },
    };

</script>
