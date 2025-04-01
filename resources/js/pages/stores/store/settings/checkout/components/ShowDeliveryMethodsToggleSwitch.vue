<template>

    <ToggleSwitch
        size="md"
        v-model="storeForm.online"
        :errorText="formState.getFormError('online')">
        Show delivery methods
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
