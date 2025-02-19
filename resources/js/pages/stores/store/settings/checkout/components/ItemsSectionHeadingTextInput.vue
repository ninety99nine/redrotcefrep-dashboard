<template>

    <TextInput
        label="Section heading"
        v-model="storeForm.name"
        placeholder="Baby Cakes 🧁"
        :errorText="getFormError('name')"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The heading of the items section">
    </TextInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import { useStoreState } from '@Stores/store-store.js';

    export default {
        mixins: [FormMixin],
        components: { TextInput },
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
