<template>

    <ToogleSwitch
        size="md"
        v-model="storeForm.online"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('online')"
        labelPopoverDescription="Turn on so that your store is online (Made available to customers). Turn off so that your store is offline (Not available to customers)">
        Online
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
