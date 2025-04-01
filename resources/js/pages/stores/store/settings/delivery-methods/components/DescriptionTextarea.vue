<template>

    <TextareaInput
        :rows="2"
        label="Description"
        v-model="form.description"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('description')"
        placeholder="Delivery using our in-house logistics service"
        labelPopoverDescription="A short and sweet description of how delivery/pickup will be accomplished">
    </TextareaInput>

</template>

<script>

    import TextareaInput from '@Partials/inputs/TextareaInput.vue';

    export default {
        inject: ['formState'],
        components: { TextareaInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
