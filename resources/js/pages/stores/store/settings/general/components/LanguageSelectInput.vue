<template>

    <LanguageSelectInput
        width="w-full"
        label="Currency"
        v-model="storeForm.language"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The currency accepted by your store">
    </LanguageSelectInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import LanguageSelectInput from '@Partials/inputs/LanguageSelectInput.vue';

    export default {
        mixins: [FormMixin],
        components: { LanguageSelectInput },
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
