<template>

    <SelectInput
        width="w-full"
        label="Distance Unit"
        v-model="storeForm.distanceUnit"
        labelPopoverTitle="What Is This?"
        :errorText="getFormError('distanceUnit')"
        labelPopoverDescription="Choose the unit of measurement for distances used in your store. For example, kilometers (km) for metric systems or miles for imperial systems. This setting affects shipping calculations and location-based features.">
        <option value="km">Kilometer (km)</option>
        <option value="mile">Mile</option>
    </SelectInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        mixins: [FormMixin],
        components: { SelectInput },
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
