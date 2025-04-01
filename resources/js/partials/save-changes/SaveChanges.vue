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
            <Button type="light" size="xs" :action="undoChanges">
                <span class="ml-1">Undo</span>
            </Button>

            <!-- Save Changes Button -->
            <Button type="light" size="xs" :action="saveChanges" :loading="isSaving">
                Save Changes
            </Button>

        </div>

    </Alert>

</template>

<script>

    import Alert from '@Partials/alerts/Alert.vue';
    import Button from '@Partials/buttons/Button.vue';

    export default {
        components: {
            Alert, Button
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
            undoChanges: {
                type: Function,
                default: null
            },
        }
    };

</script>
