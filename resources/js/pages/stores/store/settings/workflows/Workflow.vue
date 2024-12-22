<template>

    <div class="bg-white shadow-lg border p-8 rounded-lg relative">

        <!-- Loading Backdrop -->
        <BackdropLoader v-if="isLoadingWorkflow || isSubmitting" class="rounded-lg"></BackdropLoader>

        <form class="space-y-4" action="#" method="POST">

            <div class="flex justify-start items-center border-dashed py-6">

                <!-- Back Button -->
                <BackButton class="w-16 mr-4" :action="goBack"></BackButton>

                <div v-if="isLoadingWorkflow" class="flex items-center space-x-2">
                    <ShineEffect class="flex space-x-2">
                        <LineSkeleton width="w-40 mt-2"></LineSkeleton>
                        <LineSkeleton width="w-4 mt-2"></LineSkeleton>
                    </ShineEffect>
                </div>

                <template v-else>

                    <TextHeader>{{ isCreating ? 'Add Workflow' : workflowForm.name }}</TextHeader>

                    <!-- More Info Popover -->
                    <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Workflows are automated processes that manage tasks like order alerts, payment links, and delivery updates for smooth operations and a seamless customer experience" placement="top"></MoreInfoPopover>

                </template>

            </div>

            <div :class="[workflowFormHasName && (mustSaveChanges || mustCreate || hasUnsavedWorkflowSteps || hasUncreatedWorkflowSteps) ? 'h-20 mb-8' : 'h-0 mb-0 p-0', 'transition-all duration-500 overflow-hidden']">

                <!-- Save Changes Info Alert -->
                <Alert type="warning" class="flex justify-between items-center border border-dashed">

                    <div class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>{{ isEditting ? 'Please save your changes' : 'Create your workflow' }}</span>
                    </div>

                    <div class="flex items-center space-x-2">

                        <!-- Undo Button -->
                        <UndoButton :action="workflowState.reset" type="light" size="xs">
                            <span class="ml-1">Undo</span>
                        </UndoButton>

                        <!-- Create / Save Changes Button -->
                        <PrimaryButton @click="submit" :loading="isSubmitting" type="dark">
                            <span>{{ isEditting ? 'Save Changes' : 'Create' }}</span>
                        </PrimaryButton>

                    </div>

                </Alert>

            </div>

            <!-- Form Error Messages -->
            <FormErrorMessages></FormErrorMessages>

            <!-- Active Toggle Switch -->
            <ActiveToggleSwitch></ActiveToggleSwitch>

            <!-- Name Input -->
            <NameTextInput></NameTextInput>

            <!-- Trigger -->
            <Trigger></Trigger>

            <!-- Workflow Steps -->
            <WorkflowSteps v-if="!isLoadingWorkflow"></WorkflowSteps>

            <!-- Set Form Name Info Alert -->
            <Alert v-if="!workflowFormHasName && (hasUnsavedWorkflowSteps || hasUncreatedWorkflowSteps)" type="warning" class="flex justify-between items-center mb-4">

                <div class="flex items-center space-x-2">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>Give your workflow a name</span>
                </div>

            </Alert>

            <!-- Create / Save Changes Button -->
            <PrimaryButton @click="submit" :disabled="isSubmitting || !(workflowFormHasName && (mustSaveChanges || mustCreate || hasUnsavedWorkflowSteps || hasUncreatedWorkflowSteps))" type="dark" class="w-full">
                <span>{{ isEditting || hasUnsavedWorkflowSteps ? 'Save Changes' : 'Create' }}</span>
            </PrimaryButton>

            <div>

                <!-- Delete Workflow -->
                <DeleteWorkflow class="mt-16"></DeleteWorkflow>

            </div>

        </form>
    </div>

</template>

<script>

    import cloneDeep from 'lodash/cloneDeep';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import { useWorkflowState } from '@Stores/workflow-store.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import BackdropLoader from '@Partials/loaders/BackdropLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, postApi, putApi } from '@Repositories/api-repository.js';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import Trigger from '@Pages/stores/store/settings/workflows/components/trigger/Trigger.vue';
    import NameTextInput from '@Pages/stores/store/settings/workflows/components/NameTextInput.vue';
    import WorkflowSteps from '@Pages/stores/store/settings/workflows/components/WorkflowSteps.vue';
    import DeleteWorkflow from '@Pages/stores/store/settings/workflows/components/DeleteWorkflow.vue';
    import ActiveToggleSwitch from '@Pages/stores/store/settings/workflows/components/ActiveToggleSwitch.vue';

    export default {
        mixins: [FormMixin],
        components: {
            Alert, TextHeader, BackButton, UndoButton, ShineEffect, PrimaryButton, LineSkeleton, BackdropLoader, MoreInfoPopover,
            FormErrorMessages, Trigger, NameTextInput, WorkflowSteps, DeleteWorkflow, ActiveToggleSwitch
        },
        data() {
            return {
                apiState: useApiState(),
                storeState: useStoreState(),
                workflowState: useWorkflowState()
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            workflow() {
                return this.workflowState.workflow;
            },
            isCreating() {
                return this.workflowState.isCreating;
            },
            isEditting() {
                return this.workflowState.isEditting;
            },
            mustCreate() {
                return this.workflowState.mustCreate;
            },
            workflowForm() {
                return this.workflowState.workflowForm;
            },
            isSubmitting() {
                return this.workflowState.isSubmitting;
            },
            mustSaveChanges() {
                return this.workflowState.mustSaveChanges;
            },
            isLoadingWorkflow() {
                return this.workflowState.isLoadingWorkflow;
            },
            workflowFormHasName() {
                return this.workflowState.workflowFormHasName;
            },
            workflowFormHasChanged() {
                return this.workflowState.workflowFormHasChanged;
            },
            hasUnsavedWorkflowSteps() {
                return this.workflowState.hasUnsavedWorkflowSteps;
            },
            hasUncreatedWorkflowSteps() {
                return this.workflowState.hasUncreatedWorkflowSteps;
            }
        },
        methods: {
            goBack() {
                //  Navigate to show workflows
                this.$router.push({
                    name: 'show-store-workflows',
                    params: { 'store_href': this.store._links.showStore }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            parseForm() {
                var data = cloneDeep(this.workflowForm);
                data['return'] = true;

                if(this.isCreating) {
                    data['store_id'] = this.store.id;
                }

                return data;
            },
            getWorkflow() {

                //  Start loader
                this.workflowState.setIsLoadingWorkflow(true);

                //  Set the query params
                const params = {
                    //  '_relationships': 'workflowSteps'
                }

                getApi(this.$route.params.workflow_href, params).then(response => {

                    if(response.status == 200) {

                        if(response.data.exists) {

                            this.workflowState.setWorkflow(response.data.workflow);
                            this.workflowState.setWorkflowForm(response.data.workflow);

                        }

                    }

                    //  Stop loader
                    this.workflowState.setIsLoadingWorkflow(false);

                }).catch(errorException => {

                    //  Stop loader
                    this.workflowState.setIsLoadingWorkflow(false);

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            submit: async function() {

                const mustCreate = this.mustCreate;
                this.workflowState.setIsSuccessful(false);
                const mustSaveChanges = this.mustSaveChanges;

                if(this.isEditting) {
                    await this.updateWorkflow();
                } else {
                    await this.createWorkflow();
                }

                if(!this.workflowState.hasWorkflow) return;

                if(this.hasUnsavedWorkflowSteps) {
                    await this.workflowState.updateWorkflowSteps();
                } else {
                    await this.workflowState.createWorkflowSteps();
                }

                await this.workflowState.updateWorkflowStepArrangement(false);

                if(mustCreate) {
                    this.showSuccessfulNotification('Workflow created');
                }

                if(mustSaveChanges) {
                    this.showSuccessfulNotification('Workflow updated');
                }

                if(this.workflowState.hasWorkflowSteps) {

                    this.$router.push({
                        name: 'show-store-workflows',
                        params: { 'store_href': this.store._links.showStore }
                    }).then(() => {
                        // Ensure scroll to top after route navigation
                        window.scrollTo(0, 0);
                    });

                }

                if(mustCreate || mustSaveChanges) {

                    // Stop loader
                    this.workflowState.setIsSubmittingWorkflow(false);

                }
            },
            createWorkflow: async function() {

                this.hideFormErrors();

                if(this.workflowForm.name.trim() == '') {
                    this.setFormError('name', 'Enter workflow name');
                } else {

                    if(!this.mustCreate) return;

                    // Start loader
                    this.workflowState.setIsSubmittingWorkflow(true);

                    try {

                        const response = await postApi(useApiState().apiHome._links['createWorkflow'], this.parseForm());

                        if(response.status == 200) {

                            if(response.data.created) {

                                this.workflowState.setIsSuccessful(true);
                                this.workflowState.setWorkflowForm(this.workflowForm);
                                this.workflowState.setWorkflow(response.data.workflow);

                            } else {

                                this.setFormError('general', response.data.message);
                                this.showUnsuccessfulNotification(response.data.message);

                            }
                        }

                    } catch (errorException) {

                        // Stop loader
                        this.workflowState.setIsSubmittingWorkflow(false);

                        this.setServerFormErrors(errorException);

                    }
                }
            },
            updateWorkflow: async function() {

                this.hideFormErrors();

                if(this.workflowForm.name.trim() == '') {
                    this.setFormError('name', 'Enter workflow name');
                } else {

                    if(!this.mustSaveChanges) return;

                    // Start loader
                    this.workflowState.setIsSubmittingWorkflow(true);

                    try {

                        const response = await putApi(this.workflow._links.updateWorkflow, this.parseForm());

                        if(response.status == 200) {

                            if(response.data.updated) {

                                this.workflowState.setIsSuccessful(true);
                                this.workflowState.setWorkflowForm(this.workflowForm);
                                this.workflowState.setWorkflow(response.data.workflow);

                            } else {

                                this.setFormError('general', response.data.message);
                                this.showUnsuccessfulNotification(response.data.message);

                            }
                        }

                    } catch (errorException) {

                        // Stop loader
                        this.workflowState.setIsSubmittingWorkflow(false);

                        this.setServerFormErrors(errorException);

                    }
                }
            }
        },
        beforeUnmount() {
            this.workflowState.beforeUnmount();
        },
        created() {
            this.workflowState.setWorkflowForm();

            if(this.isEditting) {
                this.getWorkflow();
            }else{

            }
        }
    };

</script>
