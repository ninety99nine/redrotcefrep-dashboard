<template>

    <CountrySelectInput
        width="w-full"
        label="Country"
        v-model="storeForm.country"
        labelPopoverTitle="What Is This?"
        labelPopoverDescription="The country that your store is operating from">
    </CountrySelectInput>

</template>

<script>

    import CountrySelectInput from '@Partials/inputs/CountrySelectInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { CountrySelectInput },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
