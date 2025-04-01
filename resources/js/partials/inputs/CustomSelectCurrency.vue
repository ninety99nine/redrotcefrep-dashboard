<template>

    <CustomSelect
        v-bind="$props"
        :options="currencyOptions"
        placeholder="Select a currency"
        noResultsText="No currencies found"
        :searchableFields="['label', 'value']">
    </CustomSelect>

</template>

<script>

    import currencies from '@Json/currencies.json';
    import CustomSelect from '@Partials/inputs/CustomSelect.vue';

    export default {
        components: { CustomSelect },
        data() {
            return {
                currencyOptions: []
            }
        },
        created() {
            this.currencyOptions = Object.values(currencies).map((currency) => {
                return {
                    'label': `${currency.name} (${currency.code})`,
                    'value': currency.code
                };
            });
        }
    }

</script>
