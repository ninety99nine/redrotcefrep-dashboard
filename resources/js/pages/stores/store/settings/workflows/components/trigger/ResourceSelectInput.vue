<template>

    <SelectInput
        class="w-60"
        v-model="workflowForm.resource"
        :errorText="formState.getFormError('resource')">
        <option v-for="resource in resources" :key="resource" :value="resource">
            <span v-capitalize>{{ resource }}</span>
        </option>
    </SelectInput>

</template>

<script>

    import capitalize from '@Directives/capitalize.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        inject: ['formState', 'workflowState'],
        directives: { capitalize },
        components: { SelectInput },
        data() {
            return {
                resources: ['order', 'inventory']
            }
        },
        computed: {
            workflowForm() {
                return this.workflowState.workflowForm;
            }
        }
    };

</script>
