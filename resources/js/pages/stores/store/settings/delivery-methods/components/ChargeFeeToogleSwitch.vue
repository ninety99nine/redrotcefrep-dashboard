<template>

    <ToogleSwitch
        size="md"
        v-model="form.chargeFee"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('chargeFee')"
        labelPopoverDescription="Turn on so that your delivery method charges a fee. Turn off so that your delivery method is free of charge">
        Charge fee
    </ToogleSwitch>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';

    export default {
        mixins: [FormMixin],
        components: { ToogleSwitch },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
