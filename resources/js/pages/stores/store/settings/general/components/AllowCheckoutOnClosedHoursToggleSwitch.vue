<template>

    <ToggleSwitch
        size="md"
        labelPopoverTitle="What Is This?"
        v-model="storeForm.allowCheckoutOnClosedHours"
        :errorText="formState.getFormError('allowCheckoutOnClosedHours')"
        labelPopoverDescription="Turn on to allow customers to place orders during closed hours">
        Allow checkout during closed hours
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
