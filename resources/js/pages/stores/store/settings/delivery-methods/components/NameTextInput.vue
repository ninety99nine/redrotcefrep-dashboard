<template>

    <TextInput
        label="Name"
        v-model="form.name"
        placeholder="In-house Delivery"
        :errorText="getFormError('name')"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The delivery method name e.g In-house delivery, Self pickup or Dine in">
    </TextInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import TextInput from '@Partials/inputs/TextInput.vue';

    export default {
        mixins: [FormMixin],
        components: { TextInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
