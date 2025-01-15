<template>

    <div class="bg-white shadow-lg border p-8 rounded-lg">

        <h1 class="flex items-center text-lg font-bold mb-2">

            <!-- Automation Icon -->
            <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>

            <!-- Title -->
            <span>Workflows</span>

        </h1>

        <!-- Description -->
        <p class="text-sm text-gray-500 mb-4">
            Automate repetitive tasks in your store to save time and focus on growing your business. Let the platform handle things like order processing, inventory updates, and customer notifications for you.
        </p>

        <div class="space-y-4">

            <!-- Search Input -->
            <SearchInput v-if="hasSearchTerm || hasWorkflows" v-model="searchTerm" :isSearching="isSearching"></SearchInput>

            <!-- Workflows (Loading Placeholder) -->
            <div v-if="isLoadingWorkflows" class="space-y-2">

                <div v-for="(_, index) in [1,2,3]" :key="index" class="border shadow-sm rounded-lg p-4 bg-gray-50">
                    <ShineEffect class="w-full flex items-center justify-between space-x-2">
                        <LineSkeleton width="w-32"></LineSkeleton>
                        <LineSkeleton width="w-16"></LineSkeleton>
                    </ShineEffect>
                </div>

            </div>

            <!-- Workflows -->
            <template v-else>

                <draggable
                    class="space-y-2"
                    v-model="workflows"
                    handle=".draggable-handle"
                    ghost-class="bg-yellow-50"
                    @change="updateWorkflowArrangement">
                    <div v-for="(workflow, index) in workflows" @click="() => onViewWorkflow(workflow)" :key="index" class="flex items-center justify-between space-x-4 border shadow-sm rounded-lg p-4 bg-gray-50 cursor-pointer hover:border-blue-200 hover:bg-blue-50 group">

                        <!-- Workflow -->
                        <div class="w-full flex items-center justify-between">

                            <div class="flex items-center space-x-2">

                                <!-- Whatsapp Icon -->
                                <svg class="w-6 h-6 mt-1 ml-3" fill="#44c152" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve">
                                    <g id="XMLID_468_">
                                        <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                        <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                                    </g>
                                </svg>

                                <!-- Name -->
                                <h1 class="text-sm font-semibold">{{ workflow.name }}</h1>

                             </div>

                            <div class="flex items-center space-x-2">

                                <!-- Active Status Badge -->
                                <BadgeIndicator :type="workflow.active ? 'success' : 'warning'" :text="workflow.active ? 'Active' : 'Inactive'" :showDot="false"></BadgeIndicator>

                            </div>
                        </div>

                        <!-- Deleting Loader -->
                        <SpinningLoader v-if="isDeleting(workflow)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpinningLoader>

                        <!-- Delete Button - Triggers Confirmation Modal -->
                        <svg v-else @click.stop.prevent="showDeleteConfirmationModal(workflow)" class="w-4 h-4 cursor-pointer hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        <!-- Drag & Drop Handle -->
                        <svg @click.stop class="draggable-handle w-4 h-4 cursor-grab hover:text-yellow-500 active:cursor-grabbing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>

                    </div>

                </draggable>

                <!-- No Workflows -->
                <div v-if="!hasWorkflows">

                    <div class="flex justify-between items-center space-x-8 px-16 py-4 border rounded-lg bg-gray-50">

                        <svg class="w-80 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>

                        <div class="space-y-2">
                            <p v-if="hasSearchTerm" class="font-bold">No workflows found.</p>
                            <p>Click the <BadgeIndicator type="primary" text="+ Add Workflow" :showDot="false" :clickable="true" :action="() => onAddWorkflow()"></BadgeIndicator> button to set up automations that will handle time-consuming tasks for you</p>
                        </div>
                    </div>

                </div>

            </template>

            <!-- Add Workflow Button Skeleton -->
            <ShineEffect v-if="isLoadingWorkflows">
                <ButtonSkeleton size="sm" class="w-full">
                    <span class="leading-none text-sm">&#65291;</span>
                    <span class="ml-2">Add Workflow</span>
                </ButtonSkeleton>
            </ShineEffect>

            <!-- Add Workflow Button -->
            <AddButton v-else :action="() => onAddWorkflow()" size="sm" type="light">
                <span class="ml-2">Add Workflow</span>
            </AddButton>

            <!-- Confirm Delete Workflow -->
            <ConfirmModal v-if="deletableWorkflow" approveText="Delete" :approveAction="(hideModal) => deleteWorkflow(hideModal)" :isLoading="isDeleting(deleteWorkflow)">

                <template #content>
                    <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                    <p class="mb-8">Are you sure you want to delete <span class="font-bold text-black">{{ deletableWorkflow.name }}</span>?</p>
                </template>

                <template #trigger="triggerProps">

                    <!-- Delete Workflow Button - Triggers Confirmation Modal -->
                    <PrimaryButton ref="confirmDeleteButton" :action="triggerProps.showModal" class="hidden" type="danger"></PrimaryButton>

                </template>

            </ConfirmModal>

        </div>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { useStoreState } from '@Stores/store-store.js';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import SearchInput from '@Partials/inputs/SearchInput.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import { useWorkflowState } from '@Stores/workflow-store.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import ButtonSkeleton from '@Partials/skeletons/ButtonSkeleton.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import { getApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [FormMixin],
        components: {
            draggable: VueDraggableNext, AddButton, SearchInput, ConfirmModal, ShineEffect,
            SpinningLoader, LineSkeleton, PrimaryButton, ButtonSkeleton, BadgeIndicator
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                workflows: [],
                searchTerm: '',
                apiState: useApiState(),
                deletableWorkflow: null,
                isDeletingWorkflowIds: [],
                isLoadingWorkflows: false,
                storeState: useStoreState(),
                workflowState: useWorkflowState()
            }
        },
        watch: {
            searchTerm(newValue, oldValue) {
                this.showWorkflows();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isSearching() {
                return this.hasSearchTerm && this.isLoadingWorkflows;
            },
            hasSearchTerm() {
                return this.searchTerm.length > 0;
            },
            hasWorkflows() {
                return this.workflows.length > 0;
            },
        },
        methods: {
            onViewWorkflow(workflow) {
                this.$router.push({
                    name: 'show-store-workflow',
                    params: { 'workflow_href': workflow._links.showWorkflow }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            onAddWorkflow() {
                this.$router.push({ name: 'create-store-workflow', params: { 'store_href': this.store._links.showStore } });
            },
            showDeleteConfirmationModal(workflow) {
                this.deletableWorkflow = workflow;
                /**
                 *  After setting the deletableWorkflow, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which opens the
                 *  confirmation modal dialog. This is so that when the dialog opens we don't
                 *  get an error trying to access the deletableWorkflow values. This
                 *  is only available on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(workflow) {
                return this.isDeletingWorkflowIds.findIndex((id) => id == workflow.id) != -1;
            },
            showWorkflows() {

                //  Start loader
                this.isLoadingWorkflows = true;

                const params = {
                    'storeId': this.store.id
                };

                if(this.searchTerm) params['search'] = this.searchTerm;

                getApi(this.store._links['showStoreWorkflows'], params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.workflows = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingWorkflows = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingWorkflows = false;

                    this.setServerFormErrors(errorException);

                });

            },
            updateWorkflowArrangement() {

                //  Start loader
                this.workflowState.setIsUpdatingWorkflowArrangement(true);

                //  Set the query params
                const params = {
                    'storeId': this.store.id,
                    'workflowIds': this.workflows.map((workflow) => workflow.id)
                }

                postApi(this.apiState.apiHome['_links']['updateWorkflowArrangement'], params).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Workflow arrangement updated');

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.workflowState.setIsUpdatingWorkflowArrangement(false);

                }).catch(errorException => {

                    //  Stop loader
                    this.workflowState.setIsUpdatingWorkflowArrangement(false);

                    this.setServerFormErrors(errorException);

                });

            },
            deleteWorkflow(hideModal) {

                //  Start loader
                this.isDeletingWorkflowIds.push(this.deletableWorkflow.id);

                deleteApi(this.deletableWorkflow._links.deleteWorkflow).then(response => {

                    hideModal();

                    //  Stop loader
                    this.isDeletingWorkflowIds.splice(this.isDeletingWorkflowIds.findIndex((id) => id == this.deleteWorkflow.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Workflow deleted');

                            //  If we are not deleting any other workflow, then refresh the workflow list
                            if(this.isDeletingWorkflowIds.length == 0) this.showWorkflows();

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingWorkflowIds.splice(this.isDeletingWorkflowIds.findIndex((id) => id == this.deleteWorkflow.id, 1));

                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showWorkflows();
        }
    };

</script>
