<template>

    <EmailInput
        label="Email"
        v-model="storeForm.email"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('email')"
        :placeholder="'sales@'+(storeForm.alias || 'example')+'.com'"
        :labelPopoverDescription="'The store email address e.g sales@'+(storeForm.alias || 'example')+'.com'">
    </EmailInput>

</template>

<script>

    import EmailInput from '@Partials/inputs/EmailInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { EmailInput },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
