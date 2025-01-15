<template>

    <ToogleSwitch
        size="md"
        labelPopoverTitle="What Is This?"
        v-model="storeForm.allowCheckoutOnClosedHours"
        :errorText="getFormError('allowCheckoutOnClosedHours')"
        labelPopoverDescription="Turn on to allow customers to place orders during closed hours">
        Allow checkout during closed hours
    </ToogleSwitch>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';

    export default {
        mixins: [FormMixin],
        components: { ToogleSwitch },
        data() {
            return {
                storeState: useStoreState(),
            }
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
