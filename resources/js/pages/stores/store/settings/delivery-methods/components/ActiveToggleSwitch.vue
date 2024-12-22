<template>

    <ToogleSwitch
        size="md"
        v-model="form.active"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('active')"
        labelPopoverDescription="Turn on so that your delivery method is made available to customers. Turn off so that your delivery method not available to customers">
        Active
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
