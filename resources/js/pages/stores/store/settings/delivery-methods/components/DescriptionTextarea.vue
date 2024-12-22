<template>

    <TextareaInput
        :rows="2"
        label="Description"
        v-model="form.description"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('description')"
        placeholder="Delivery using our in-house logistics service"
        labelPopoverDescription="A short and sweet description of how delivery/pickup will be accomplished">
    </TextareaInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';

    export default {
        mixins: [FormMixin],
        components: { TextareaInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
