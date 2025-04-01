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
                    <Button type="danger" size="xs" :action="triggerProps.showModal" :loading="isDeleting" class="w-60">
                        Delete Workflow
                    </Button>

                </template>

            </ConfirmModal>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { deleteApi } from '@Repositories/api-repository.js';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';

    export default {
        inject: ['formState', 'storeState', 'workflowState', 'notificationState'],
        components: { Button, ConfirmModal },
        data() {
            return {
                isDeleting: false
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

                            this.notificationState.showSuccessNotification('Workflow deleted');

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }else{

                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);

                    }

                    //  Stop loader
                    this.isDeleting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeleting = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
        }
    };

</script>
