import { defineStore } from 'pinia';
import isEqual from 'lodash/isEqual';
import { useRoute } from 'vue-router';
import cloneDeep from 'lodash/cloneDeep';

export const useWorkflowState = defineStore('workflow', {
    state: () => {
        return {
            workflow: null,
            workflowSteps: [],
            route: useRoute(),
            workflowForm: null,
            isSuccessful: false,
            isLoadingWorkflow: false,
            unsavedWorkflowSteps: [],
            originalWorkflowSteps: [],
            uncreatedWorkflowSteps: [],
            resetableWorkflowSteps: [],
            originalWorkflowForm: null,
            updateWorkflowStepArrangement: null
        };
    },
    actions: {
        reset() {
            this.setWorkflowForm(this.workflow);
            this.resetWorkflowSteps();
        },
        beforeUnmount() {
            this.workflow = null;
            this.workflowSteps = [];
            this.workflowForm = null;
            this.isSuccessful = false;
            this.isLoadingWorkflow = false;
            this.unsavedWorkflowSteps = [];
            this.originalWorkflowSteps = [];
            this.uncreatedWorkflowSteps = [];
            this.resetableWorkflowSteps = [];
            this.originalWorkflowForm = null;
            this.updateWorkflowStepArrangement = null;
        },
        setWorkflowForm(workflow = null) {

            if(workflow) {

                this.workflowForm = {
                    name: workflow.name,
                    active: workflow.active,
                    trigger: workflow.trigger,
                    resource: workflow.resource,
                };

            }else{

                this.workflowForm = {
                    name: '',
                    active: true,
                    resource: 'order',
                    trigger: 'waiting'
                };

            }

            this.setOriginalWorkflowForm();

        },
        setWorkflow(workflow) {
            this.workflow = workflow;
        },
        setIsSuccessful(status) {
            this.isSuccessful = status;
        },
        setIsLoadingWorkflow(status) {
            this.isLoadingWorkflow = status;
        },
        setIsSubmittingWorkflow(status) {
            this.isSubmittingWorkflow = status;
        },
        setIsUpdatingWorkflowArrangement(status) {
            this.isUpdatingWorkflowArrangement = status;
        },
        setOriginalWorkflowForm() {
            this.originalWorkflowForm = cloneDeep(this.workflowForm);
        },
        addUnsavedWorkflowStep(step) {
            if(!this.unsavedWorkflowSteps.includes(step)) {
                this.unsavedWorkflowSteps.push(step);
            }
        },
        removeUnsavedWorkflowStep(step) {
            const index = this.unsavedWorkflowSteps.indexOf(step);
            if(index > -1) {
                this.unsavedWorkflowSteps.splice(index, 1);
            }
        },
        addUncreatedWorkflowStep(step) {
            if(!this.uncreatedWorkflowSteps.includes(step)) {
                this.uncreatedWorkflowSteps.push(step);
            }
        },
        removeUncreatedWorkflowStep(step) {
            const index = this.uncreatedWorkflowSteps.indexOf(step);
            if(index > -1) {
                this.uncreatedWorkflowSteps.splice(index, 1);
            }
        },
        addResetableWorkflowStep(step) {
            if(!this.resetableWorkflowSteps.includes(step)) {
                this.resetableWorkflowSteps.push(step);
            }
        },
        removeResetableWorkflowStep(step) {
            const index = this.resetableWorkflowSteps.indexOf(step);
            if(index > -1) {
                this.resetableWorkflowSteps.splice(index, 1);
            }
        },
        async updateWorkflowSteps() {
            // Wait for all updates to complete
            await Promise.all(this.unsavedWorkflowSteps.map(async (updateWorkflowStep) => {
                await updateWorkflowStep();
            }));
        },
        async createWorkflowSteps() {
            // Wait for all creations to complete
            await Promise.all(this.uncreatedWorkflowSteps.map(async (createWorkflowStep) => {
                await createWorkflowStep();
            }));
        },
        async resetWorkflowSteps() {
            this.resetableWorkflowSteps.map((reset) => reset());
        },
    },
    getters: {
        isCreating() {
            return this.route.name === 'create-store-workflow';
        },
        isEditting() {
            return this.route.name === 'show-store-workflow';
        },
        mustCreate() {
            return this.isCreating && this.workflowFormHasChanged && !this.isLoadingWorkflow && !this.isSubmittingWorkflow && this.hasWorkflowSteps;
        },
        mustSaveChanges() {
            return this.isEditting && this.workflowFormHasChanged && !this.isLoadingWorkflow && !this.isSubmittingWorkflow && this.hasWorkflowSteps;
        },
        hasWorkflow() {
            return this.workflow != null;
        },
        hasWorkflowSteps() {
            return this.totalWorkflowSteps > 0;
        },
        totalWorkflowSteps() {
            return this.workflowSteps.length;
        },
        hasUnsavedWorkflowSteps() {
            return this.unsavedWorkflowSteps.length > 0;
        },
        hasUncreatedWorkflowSteps() {
            return this.uncreatedWorkflowSteps.length > 0;
        },
        workflowFormHasName() {
            return this.workflowForm.name != '';
        },
        workflowFormHasChanged() {
            var a = cloneDeep(this.workflowForm);
            var b = cloneDeep(this.originalWorkflowForm);
            return !isEqual(a, b);
        },
    }
});
