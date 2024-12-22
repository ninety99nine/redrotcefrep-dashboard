<template>

    <TextareaInput
        :rows="2"
        placeholder="Additional notes"
        labelPopoverTitle="What Is This?"
        v-model="workflowStepForm.settings.note"
        :errorText="getFormError('settingsNote')"
        labelPopoverDescription="Addtional notes to include together with the message">
    </TextareaInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';

    export default {
        mixins: [FormMixin],
        components: { TextareaInput },
        props: {
            workflowStepForm: {
                type: Object
            }
        }
    };

</script>
