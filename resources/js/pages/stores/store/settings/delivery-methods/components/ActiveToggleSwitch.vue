<template>

    <ToggleSwitch
        size="md"
        v-model="form.active"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('active')"
        labelPopoverDescription="Turn on so that your delivery method is made available to customers. Turn off so that your delivery method not available to customers">
        Active
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
