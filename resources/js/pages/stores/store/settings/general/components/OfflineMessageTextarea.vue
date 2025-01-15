<template>

    <TextareaInput
        :rows="2"
        label="Offline Message"
        v-if="!storeForm.online"
        v-model="storeForm.offlineMessage"
        labelPopoverTitle="What Is This?"
        placeholder="Closed for the holidays"
        :errorText="getFormError('offlineMessage')"
        labelPopoverDescription="The message to show to customers who visit your store while its offline (Not available to customers)">
    </TextareaInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';

    export default {
        mixins: [FormMixin],
        components: { TextareaInput },
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
