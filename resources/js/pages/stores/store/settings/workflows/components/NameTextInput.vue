<template>

    <TextInput
        label="Name"
        v-model="workflowForm.name"
        :errorText="formState.getFormError('name')"
        labelPopoverTitle="What Is This?"
        placeholder="Whatsapp waiting order to team"
        labelPopoverDescription="The workflow name e.g Whatsapp waiting order to team">
    </TextInput>

</template>

<script>

    import TextInput from '@Partials/inputs/TextInput.vue';

    export default {
        inject: ['formState', 'workflowState'],
        components: { TextInput },
        computed: {
            workflowForm() {
                return this.workflowState.workflowForm;
            }
        }
    };

</script>
