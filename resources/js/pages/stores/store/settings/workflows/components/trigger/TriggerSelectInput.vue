<template>

    <SelectInput
        class="w-60"
        v-model="workflowForm.trigger"
        :errorText="getFormError('trigger')">
        <optgroup
            :key="group.name"
            :label="group.name"
            v-for="group in triggerGroups">
            <option v-for="option in group.options" :key="option" :value="option">
                {{ capitalize(option) }}
            </option>
        </optgroup>
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
                workflowState: useWorkflowState()
            }
        },
        watch: {
            'workflowForm.resource'(newValue) {
                if(newValue) {
                    if(this.triggerGroups.length > 0) {
                        this.workflowState.workflowForm.trigger = this.triggerGroups[0]['options'][0];
                    }
                }
            }
        },
        computed: {
            workflowForm() {
                return this.workflowState.workflowForm;
            },
            triggerGroups() {
                if(this.workflowForm.resource == 'order') {

                    return [
                        {
                            'name': 'Status',
                            'options': ['waiting','cancelled','completed','on its way','ready for pickup']
                        },
                        {
                            'name': 'Payment status',
                            'options': ['paid','unpaid','partially paid','pending payment']
                        }
                    ];

                }else if(this.workflowForm.resource == 'inventory') {

                    return [
                        {
                            'name': 'Stock levels',
                            'options': ['low stock']
                        }
                    ];

                }else{
                    return [];
                }
            },
        },
    };

</script>
