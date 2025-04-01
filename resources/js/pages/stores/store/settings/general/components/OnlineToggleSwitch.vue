<template>

    <ToggleSwitch
        size="md"
        v-model="storeForm.online"
        labelPopoverTitle="What Is This?"
        :errorText="formState.getFormError('online')"
        labelPopoverDescription="Turn on so that your store is online (Made available to customers). Turn off so that your store is offline (Not available to customers)">
        Online
    </ToggleSwitch>

</template>

<script>

    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { ToggleSwitch },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
