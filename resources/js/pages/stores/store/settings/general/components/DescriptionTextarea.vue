<template>

    <TextareaInput
        :rows="2"
        label="Description"
        v-model="storeForm.description"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('description')"
        placeholder="The sweetest cakes in the world 🍰"
        labelPopoverDescription="A short and sweet description of your store e.g The sweetest cakes in the world 🍰">
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
