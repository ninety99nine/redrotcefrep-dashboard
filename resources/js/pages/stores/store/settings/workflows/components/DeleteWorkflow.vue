<template>

    <div v-if="workflow" :class="['space-y-4 shadow-lg rounded-lg border p-4', isLoadingWorkflow ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

        <!-- Delete Workflow Info -->
        <p>Do you want to permanently delete <span class="font-bold text-black">{{ workflowForm.name }}</span>? Once this workflow is deleted you will not be able to recover it.</p>

        <div class="flex justify-end">

            <ConfirmModal approveText="Delete Workflow" :approveAction="deleteWorkflow" :isLoading="isDeleting">

                <template #content>
                    <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                    <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ workflowForm.name }}</span>?</p>
                </template>

                <template #trigger="triggerProps">

                    <!-- Delete Workflow Button - Triggers Confirmation Modal -->
                    <PrimaryButton :action="triggerProps.showModal" :loading="isDeleting" class="w-60" type="danger">
                        Delete Workflow
                    </PrimaryButton>

                </template>

            </ConfirmModal>

        </div>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import { deleteApi } from '@Repositories/api-repository.js';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import { useWorkflowState } from '@Stores/workflow-store.js';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';

    export default {
        mixins: [FormMixin],
        components: { ConfirmModal, PrimaryButton },
        data() {
            return {
                isDeleting: false,
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
            workflowForm() {
                return this.workflowState.workflowForm;
            },
            isLoadingWorkflow() {
                return this.workflowState.isLoadingWorkflow;
            },
        },
        methods: {
            deleteWorkflow() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.workflow._links.deleteWorkflow).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            //  Navigate to show workflows
                            this.$router.push({
                                name: 'show-store-workflows',
                                params: { 'store_href': this.store._links.showStore }
                            }).then(() => {
                                // Ensure scroll to top after route navigation
                                window.scrollTo(0, 0);
                            });

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Workflow deleted');

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }else{

                        this.setFormError('general', response.data.message);
                        this.showUnsuccessfulNotification(response.data.message);

                    }

                    //  Stop loader
                    this.isDeleting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeleting = false;

                    this.setServerFormErrors(errorException);

                });

            },
        }
    };

</script>
