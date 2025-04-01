<template>

    <TextareaInput
        :rows="2"
        label="Description"
        v-model="storeForm.description"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('description')"
        placeholder="The sweetest cakes in the world 🍰"
        labelPopoverDescription="A short and sweet description of your store e.g The sweetest cakes in the world 🍰">
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
