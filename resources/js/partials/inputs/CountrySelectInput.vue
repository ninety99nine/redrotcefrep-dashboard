<template>

    <SelectInput v-bind="$attrs">
        <option v-for="(country, index) in countries" :key="index" :value="country.iso">{{ country.name }}</option>
    </SelectInput>

</template>

<script>

    import { useApiState } from '@Stores/api-store.js';
    import { getApi } from '@Repositories/api-repository.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        components: {
            SelectInput
        },
        data() {
            return {
                countries: [],
                apiState: useApiState(),
                isLoadingCountries: false

            };
        },
        methods: {
            showCountries() {

                if(this.countries.length) return;

                //  Start loader
                this.isLoadingCountries = true;

                getApi(this.apiState.apiHome['_links']['showCountries']).then(response => {

                    if(response.status == 200) {

                        this.countries = response.data;

                    }

                    //  Stop loader
                    this.isLoadingCountries = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingCountries = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showCountries();
        }
    };
</script>
