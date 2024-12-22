<template>

    <TextInput
        label="Name"
        v-model="workflowForm.name"
        :errorText="getFormError('name')"
        labelPopoverTitle="What Is This?"
        placeholder="Whatsapp waiting order to team"
        labelPopoverDescription="The workflow name e.g Whatsapp waiting order to team">
    </TextInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import { useWorkflowState } from '@Stores/workflow-store.js';

    export default {
        mixins: [FormMixin],
        components: { TextInput },
        data() {
            return {
                workflowState: useWorkflowState()
            }
        },
        computed: {
            workflowForm() {
                return this.workflowState.workflowForm;
            }
        }
    };

</script>
