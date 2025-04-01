<template>

    <SelectInput v-bind="$attrs">
        <option v-for="(language, index) in languages" :key="index" :value="language.code">{{ language.name }}</option>
    </SelectInput>

</template>

<script>

    import { getApi } from '@Repositories/api-repository.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        inject: ['apiState'],
        components: {
            SelectInput
        },
        data() {
            return {
                languages: [],
                isLoadingLanguages: false

            };
        },
        methods: {
            showLanguages() {

                if(this.languages.length) return;

                //  Start loader
                this.isLoadingLanguages = true;

                getApi(this.apiState.apiHome['_links']['showLanguages']).then(response => {

                    if(response.status == 200) {

                        this.languages = response.data;

                    }

                    //  Stop loader
                    this.isLoadingLanguages = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingLanguages = false;

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showLanguages();
        }
    };
</script>
