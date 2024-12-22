<template>

    <SelectInput
        class="w-60"
        v-model="workflowForm.resource"
        :errorText="getFormError('resource')">
        <option v-for="resource in resources" :key="resource" :value="resource">
            {{ capitalize(resource) }}
        </option>
    </SelectInput>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import { useWorkflowState } from '@Stores/workflow-store.js';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: { SelectInput },
        data() {
            return {
                resources: ['order', 'inventory'],
                workflowState: useWorkflowState()
            }
        },
        computed: {
            workflowForm() {
                return this.workflowState.workflowForm;
            }
        }
    };

</script>
