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

    import Tinymce from '@Partials/wizwig-editor/Tinymce.vue';

    export default {
        inject: ['pageState'],
        components: { Tinymce },
        data() {
            return {
                localModule: null
            };
        },
        methods: {
            saveStateDebounced(actionName) {
                this.pageState.saveStateDebounced(actionName);
            }
        },
    };

</script>
