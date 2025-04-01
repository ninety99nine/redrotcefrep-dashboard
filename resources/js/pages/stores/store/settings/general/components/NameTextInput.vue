<template>

    <TextInput
        label="Name"
        @keyup="syncWithAlias"
        v-model="storeForm.name"
        placeholder="Baby Cakes 🧁"
        autocomplete="organization"
        :errorText="formState.getFormError('name')"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The name of your store e.g Baby Cakes 🧁">
    </TextInput>

</template>

<script>

    import TextInput from '@Partials/inputs/TextInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { TextInput },
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
