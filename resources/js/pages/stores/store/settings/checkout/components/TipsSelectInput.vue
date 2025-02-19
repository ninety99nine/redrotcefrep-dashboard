<template>

    <InputTags
        :label="'Tips (%)'"
        :key="storeForm.tips"
        :tags="storeForm.tips"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('tips')"
        @onTagsChanged="(newValues) => storeForm.tips = newValues"
        labelPopoverDescription="Specify the percentage tips, e.g., 10, 20 and 30">
    </InputTags>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import InputTags from '@Partials/inputs/InputTags.vue';

    export default {
        mixins: [FormMixin],
        components: { InputTags },
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
