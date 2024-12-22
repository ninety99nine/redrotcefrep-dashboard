<template>

    <ToogleSwitch
        size="md"
        v-model="workflowForm.active"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('active')"
        labelPopoverDescription="Turn on so that your workflow automates processes. Turn off so that your workflow does not automate processes">
        Active
    </ToogleSwitch>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useWorkflowState } from '@Stores/workflow-store.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';

    export default {
        mixins: [FormMixin],
        components: { ToogleSwitch },
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
