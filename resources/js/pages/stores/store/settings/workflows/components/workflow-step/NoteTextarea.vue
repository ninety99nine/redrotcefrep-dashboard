<template>

    <TextareaInput
        :rows="2"
        placeholder="Additional notes"
        labelPopoverTitle="What Is This?"
        v-model="workflowStepForm.settings.note"
        :errorText="formState.getFormError('settingsNote')"
        labelPopoverDescription="Addtional notes to include together with the message">
    </TextareaInput>

</template>

<script>

    import TextareaInput from '@Partials/inputs/TextareaInput.vue';

    export default {
        inject: ['formState'],
        components: { TextareaInput },
        props: {
            workflowStepForm: {
                type: Object
            }
        }
    };

</script>
