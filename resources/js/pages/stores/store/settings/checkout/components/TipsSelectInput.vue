<template>

    <InputTags
        :label="'Tips (%)'"
        :key="storeForm.tips"
        :tags="storeForm.tips"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('tips')"
        @onTagsChanged="(newValues) => storeForm.tips = newValues"
        labelPopoverDescription="Specify the percentage tips, e.g., 10, 20 and 30">
    </InputTags>

</template>

<script>

    import InputTags from '@Partials/inputs/InputTags.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { InputTags },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };
</script>
