<template>

    <SaveChanges
        :saveChanges="updateStore"
        :undoChanges="resetStoreForm"
        :isSaving="isSubmittingStore"
        :mustSaveChanges="mustSaveChanges">
    </SaveChanges>

</template>

<script>

    import SaveChanges from '@Partials/save-changes/SaveChanges.vue';

    export default {
        inject: ['storeState'],
        components: { SaveChanges },
        computed: {
            isSubmittingStore() {
                return this.storeState.isSubmittingStore;
            },
            mustSaveChanges() {
                return this.storeState.mustSaveChanges;
            }
        },
        methods: {
            resetStoreForm() {
                this.storeState.resetStoreForm();
            },
            updateStore() {
                this.storeState.updateStore();
            }
        }
    };

</script>
