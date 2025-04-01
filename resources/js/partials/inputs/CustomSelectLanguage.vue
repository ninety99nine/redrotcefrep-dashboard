<template>

    <CustomSelect
        v-bind="$props"
        :options="languageOptions"
        placeholder="Select a language"
        noResultsText="No languages found"
        :searchableFields="['label', 'value']">
    </CustomSelect>

</template>

<script>

    import languages from '@Json/languages.json';
    import CustomSelect from '@Partials/inputs/CustomSelect.vue';

    export default {
        components: { CustomSelect },
        data() {
            return {
                languageOptions: []
            }
        },
        created() {
            this.languageOptions = languages.map((language) => {
                return {
                    'label': language.name,
                    'value': language.code
                };
            });
        }
    }

</script>
