<template>

    <SelectInput v-bind="$attrs">
        <option v-for="(currency, index) in currencies" :key="index" :value="currency.code">
            {{ currency.code }}
        </option>
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
                currencies: [],
                apiState: useApiState(),
                isLoadingCurrencies: false

            };
        },
        methods: {
            showCurrencies() {

                if(this.currencies.length) return;

                //  Start loader
                this.isLoadingCurrencies = true;

                getApi(this.apiState.apiHome['_links']['showCurrencies']).then(response => {

                    if(response.status == 200) {

                        this.currencies = response.data;

                    }

                    //  Stop loader
                    this.isLoadingCurrencies = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingCurrencies = false;

                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showCurrencies();
        }
    };
</script>
