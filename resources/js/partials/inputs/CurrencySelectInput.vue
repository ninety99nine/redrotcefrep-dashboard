<template>

    <SelectInput v-bind="$attrs">
        <option v-for="(currency, index) in currencies" :key="index" :value="currency.code">
            {{ currency.code }}
        </option>
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
                currencies: [],
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

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showCurrencies();
        }
    };
</script>
