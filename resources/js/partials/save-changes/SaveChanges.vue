<template>

    <Alert v-if="mustSaveChanges" type="warning" class="flex justify-between items-center">

        <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>Please save your changes</span>
        </div>

        <div class="flex items-center space-x-2">

            <!-- Undo Button -->
            <UndoButton :action="undo" type="light" size="xs">
                <span class="ml-1">Undo</span>
            </UndoButton>

            <!-- Save Changes Button -->
            <PrimaryButton :action="saveChanges" :loading="isSaving" class="w-40">
                Save Changes
            </PrimaryButton>

        </div>

    </Alert>

</template>

<script>

    import Alert from '@Partials/alerts/Alert.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';

    export default {
        components: {
            Alert, UndoButton, PrimaryButton
        },
        props: {
            mustSaveChanges: {
                type: Boolean,
                default: true
            },
            isSaving: {
                type: Boolean,
                default: true
            },
            saveChanges: {
                type: Function,
                default: null
            },
            undo: {
                type: Function,
                default: null
            },
        }
    };

</script>
