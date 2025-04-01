<template>

    <MoneyInput
        label="Flat Fee"
        v-model="form.flatFeeRate"
        labelPopoverTitle="What Is This?"
        v-if="form.feeType == 'flat fee'"
        :errorText="formState.getFormError('flatFeeRate')"
        labelPopoverDescription="Set the flat fee amount (This is the flat fee that will be applied as a charge)">
    </MoneyInput>

</template>

<script>

    import MoneyInput from '@Partials/inputs/MoneyInput.vue';

    export default {
        inject: ['formState'],
        components: {
            MoneyInput
        },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
