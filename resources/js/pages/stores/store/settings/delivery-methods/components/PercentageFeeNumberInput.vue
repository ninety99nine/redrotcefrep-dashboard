<template>

    <NumberInput
        min="1"
        placeholder="100"
        label="Percentage Fee"
        v-model="form.percentageFeeRate"
        labelPopoverTitle="What Is This?"
        v-if="form.feeType == 'percentage fee'"
        :errorText="formState.getFormError('percentageFeeRate')"
        labelPopoverDescription="Set the percentage fee amount (This is the percentage fee that will be applied as a charge)">
        <template #suffix>%</template>
    </NumberInput>

</template>

<script>

    import NumberInput from '@Partials/inputs/NumberInput.vue';

    export default {
        inject: ['formState'],
        components: {
            NumberInput
        },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
