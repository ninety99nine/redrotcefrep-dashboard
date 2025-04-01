<template>

    <ToggleSwitch
        size="md"
        v-model="workflowForm.active"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('active')"
        labelPopoverDescription="Turn on so that your workflow automates processes. Turn off so that your workflow does not automate processes">
        Active
    </ToggleSwitch>

</template>

<script>

    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';

    export default {
        inject: ['formState', 'workflowState'],
        components: { ToggleSwitch },
        computed: {
            workflowForm() {
                return this.workflowState.workflowForm;
            }
        }
    };

</script>
