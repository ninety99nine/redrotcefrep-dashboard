<template>

    <div>

        <Tinymce
            label="Content"
            @change="saveStateDebounced('Text content changed')"
            v-model="pageState.pageForm.sections[this.pageState.sectionIndex].rows[this.pageState.rowIndex].columns[this.pageState.columnIndex].modules[this.pageState.moduleIndex].settings.content"
        />

    </div>

</template>

<script>

    import { usePageState } from '@Stores/page-store.js';
    import Tinymce from '@Partials/wizwig-editor/Tinymce.vue';

    export default {
        components: { Tinymce },
        data() {
            return {
                localModule: null,
                pageState: usePageState()
            };
        },
        methods: {
            saveStateDebounced(actionName) {
                this.pageState.saveStateDebounced(actionName);
            }
        },
    };

</script>
