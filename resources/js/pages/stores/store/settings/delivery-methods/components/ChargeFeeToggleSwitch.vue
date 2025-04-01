<template>

    <ToggleSwitch
        size="md"
        v-model="form.chargeFee"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('chargeFee')"
        labelPopoverDescription="Turn on so that your delivery method charges a fee. Turn off so that your delivery method is free of charge">
        Charge fee
    </ToggleSwitch>

</template>

<script>

    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';

    export default {
        inject: ['formState'],
        components: { ToggleSwitch },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
