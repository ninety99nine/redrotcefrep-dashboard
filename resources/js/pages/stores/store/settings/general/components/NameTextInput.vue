<template>

    <TextInput
        label="Name"
        @keyup="syncWithAlias"
        v-model="storeForm.name"
        placeholder="Baby Cakes 🧁"
        autocomplete="organization"
        :errorText="getFormError('name')"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The name of your store e.g Baby Cakes 🧁">
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
        },
        methods: {
            syncWithAlias() {
                this.storeState.syncWithAlias();
            }
        }
    };

</script>
