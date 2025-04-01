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

    import LanguageSelectInput from '@Partials/inputs/LanguageSelectInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { LanguageSelectInput },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
