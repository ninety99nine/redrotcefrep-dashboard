<template>

    <ToogleSwitch
        size="md"
        v-model="form.setSchedule"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('setSchedule')"
        labelPopoverDescription="Turn on so that customers specify delivery dates and times. Turn off so that customers do not specify delivery dates and times">
        Set schedule
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
