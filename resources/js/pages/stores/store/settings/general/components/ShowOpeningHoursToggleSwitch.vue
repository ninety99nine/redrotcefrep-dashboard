<template>

    <ToogleSwitch
        size="md"
        labelPopoverTitle="What Is This?"
        v-model="storeForm.showOpeningHours"
        :errorText="getFormError('showOpeningHours')"
        labelPopoverDescription="Turn on if you would like your store to showcase its open or closed hours">
        Show opening hours
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
