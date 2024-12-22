<template>

    <EmailInput
        placeholder="sales@example.com"
        v-model="workflowStepForm.settings.email"
        :errorText="getFormError('settingsEmail')">
    </EmailInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import EmailInput from '@Partials/inputs/EmailInput.vue';

    export default {
        mixins: [FormMixin],
        components: { EmailInput },
        props: {
            workflowStepForm: {
                type: Object
            }
        }
    };

</script>
