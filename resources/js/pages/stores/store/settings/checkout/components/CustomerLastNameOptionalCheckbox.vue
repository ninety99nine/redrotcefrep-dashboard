<template>

    <Checkbox
        size="xs"
        v-model="storeState.online"
        :errorText="getFormError('online')">
        <div class="text-sm mt-0.5">Optional</div>
    </Checkbox>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';

    export default {
        mixins: [FormMixin],
        components: { Checkbox },
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

