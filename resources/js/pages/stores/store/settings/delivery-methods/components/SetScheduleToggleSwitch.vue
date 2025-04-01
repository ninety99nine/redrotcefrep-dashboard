<template>

    <ToggleSwitch
        size="md"
        v-model="form.setSchedule"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('setSchedule')"
        labelPopoverDescription="Turn on so that customers specify delivery dates and times. Turn off so that customers do not specify delivery dates and times">
        Set schedule
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
