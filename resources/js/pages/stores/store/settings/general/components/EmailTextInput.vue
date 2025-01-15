<template>

    <EmailInput
        label="Email"
        v-model="storeForm.email"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('email')"
        :placeholder="'sales@'+(storeForm.alias || 'example')+'.com'"
        :labelPopoverDescription="'The store email address e.g sales@'+(storeForm.alias || 'example')+'.com'">
    </EmailInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import EmailInput from '@Partials/inputs/EmailInput.vue';

    export default {
        mixins: [FormMixin],
        components: { EmailInput },
        data() {
            return {
                storeState: useStoreState(),
            }
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
