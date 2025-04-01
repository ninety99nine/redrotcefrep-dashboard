<template>

    <EmailInput
        placeholder="sales@example.com"
        v-model="workflowStepForm.settings.email"
        :errorText="formState.getFormError('settingsEmail')">
    </EmailInput>

</template>

<script>

    import EmailInput from '@Partials/inputs/EmailInput.vue';

    export default {
        inject: ['formState'],
        components: { EmailInput },
        props: {
            workflowStepForm: {
                type: Object
            }
        }
    };

</script>
