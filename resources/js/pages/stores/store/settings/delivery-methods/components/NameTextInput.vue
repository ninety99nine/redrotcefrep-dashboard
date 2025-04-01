<template>

    <TextInput
        label="Name"
        v-model="form.name"
        placeholder="In-house Delivery"
        :errorText="formState.getFormError('name')"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The delivery method name e.g In-house delivery, Self pickup or Dine in">
    </TextInput>

</template>

<script>

    import TextInput from '@Partials/inputs/TextInput.vue';

    export default {
        inject: ['formState'],
        components: { TextInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
