<template>

    <TextInput
        label="Section heading"
        v-model="storeForm.name"
        placeholder="Baby Cakes 🧁"
        :errorText="formState.getFormError('name')"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The heading of the items section">
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
        }
    };

</script>
