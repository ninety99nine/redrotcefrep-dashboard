<template>

    <ToggleSwitch
        size="md"
        labelPopoverTitle="What Is This?"
        v-model="storeForm.showOpeningHours"
        :errorText="formState.getFormError('showOpeningHours')"
        labelPopoverDescription="Turn on if you would like your store to showcase its open or closed hours">
        Show opening hours
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
