<template>

    <div>

        <!-- Down Pointing Arrow Separator -->
        <div v-if="hasWorkflowSteps" class="flex justify-center">
            <svg class="w-6 h-6 text-blue-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
            </svg>
        </div>

        <!-- Draggable Workflow Steps -->
        <draggable
            class="mb-8"
            handle=".draggable-handle"
            ghost-class="bg-yellow-50"
            v-model="workflowState.workflowSteps"
            @change="updateWorkflowStepArrangement">

            <WorkflowStep
                :index="index"
                @onCreated="onCreated"
                @onDeleted="onDeleted"
                :workflowStep="workflowStep"
                :key="workflowStep.id ?? workflowStep.tempId"
                v-for="(workflowStep, index) in workflowSteps">
            </WorkflowStep>

        </draggable>

        <div v-if="totalWorkflowSteps < maxWorkflowSteps" class="flex justify-center mb-16">

            <Pill
                size="sm"
                type="primary"
                :showDot="false"
                :action="() => addWorkflowStep()">
                {{ hasWorkflowSteps ? (totalWorkflowSteps == (maxWorkflowSteps - 1) ? '+ Finally this' : '+ Then this') : '+ Do this' }}
            </Pill>

        </div>

        <!-- General Error Info Alert -->
        <Alert v-if="totalWorkflowSteps == maxWorkflowSteps" type="info" class="flex justify-between items-center mb-4">

            <div class="flex items-center space-x-2">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <span>You can only add up to <span class="font-bold">{{ maxWorkflowSteps }} tasks</span> per workflow</span>
            </div>

        </Alert>

    </div>

</template>


<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { generateUniqueId } from '@Utils/generalUtils.js';
    import { getApi, postApi } from '@Repositories/api-repository.js';
    import WorkflowStep from '@Pages/stores/store/settings/workflows/components/workflow-step/WorkflowStep.vue';

    export default {
        inject: ['apiState', 'formState', 'workflowState', 'notificationState'],
        components: { Pill, Alert, draggable: VueDraggableNext, WorkflowStep },
        data() {
            return {
                maxWorkflowSteps: 5,
                isLoadingWorkflowSteps: false,
                isUpdatingWorkflowArrangement: false,
            };
        },
        computed: {
            workflow() {
                return this.workflowState.workflow;
            },
            isEditting() {
                return this.workflowState.isEditting;
            },
            workflowSteps() {
                return this.workflowState.workflowSteps;
            },
            hasWorkflowSteps() {
                return this.workflowState.hasWorkflowSteps;
            },
            totalWorkflowSteps() {
                return this.workflowState.totalWorkflowSteps;
            }
        },
        methods: {
            addWorkflowStep() {
                this.workflowState.workflowSteps.push({
                    tempId: generateUniqueId()
                });
            },
            onCreated(workflowStep, index) {
                this.workflowState.workflowSteps[index] = workflowStep;
            },
            onDeleted(index) {
                this.workflowState.workflowSteps.splice(index, 1);
                const hasUncreatedWorkflowSteps = this.workflowState.uncreatedWorkflowSteps.length > 0;
                const hasCreatedWorkflowSteps = this.workflowState.workflowSteps.filter(step => step.id).length > 0;

                if(this.isEditting && !hasCreatedWorkflowSteps && hasUncreatedWorkflowSteps) {
                    this.workflowState.createWorkflowSteps();
                }
            },
            showWorkflowSteps() {

                //  Start loader
                this.isLoadingWorkflowSteps = true;

                getApi(this.workflow._links['showWorkflowSteps']).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.workflowState.workflowSteps = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingWorkflowSteps = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingWorkflowSteps = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            async updateWorkflowStepArrangement(notify = true) {

                if(this.workflow == null) return;

                // Start loader
                this.isUpdatingWorkflowArrangement = true;

                // Set the query params
                const params = {
                    'workflowId': this.workflow.id,
                    'workflowStepIds': this.workflowSteps
                        .filter((workflowStep) => !workflowStep.tempId)
                        .map((workflowStep) => workflowStep.id)
                };

                if(params.workflowStepIds.length === 0) {
                    this.isUpdatingWorkflowArrangement = false;
                    return;
                }

                try {

                    const response = await postApi(this.apiState.apiHome['_links']['updateWorkflowStepArrangement'], params);

                    if(response.status === 200) {

                        if(response.data.updated) {

                           if(notify) this.notificationState.showSuccessNotification('Workflow arrangement updated');

                        } else {

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                } catch (errorException) {

                    this.formState.setServerFormErrors(errorException);

                } finally {

                    // Stop loader
                    this.isUpdatingWorkflowArrangement = false;

                }
            }
        },
        created() {
            if(this.workflow) this.showWorkflowSteps();
            this.workflowState.updateWorkflowStepArrangement = this.updateWorkflowStepArrangement;
        }
    };
</script>
