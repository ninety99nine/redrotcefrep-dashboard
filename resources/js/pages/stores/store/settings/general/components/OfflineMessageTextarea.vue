<template>

    <TextareaInput
        :rows="2"
        label="Offline Message"
        v-if="!storeForm.online"
        v-model="storeForm.offlineMessage"
        labelPopoverTitle="What Is This?"
        placeholder="Closed for the holidays"
        :errorText="formState.getFormError('offlineMessage')"
        labelPopoverDescription="The message to show to customers who visit your store while its offline (Not available to customers)">
    </TextareaInput>

</template>

<script>

    import TextareaInput from '@Partials/inputs/TextareaInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { TextareaInput },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
