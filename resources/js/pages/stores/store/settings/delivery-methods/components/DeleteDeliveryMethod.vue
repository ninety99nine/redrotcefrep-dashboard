<template>

    <div v-if="deliveryMethod" :class="['space-y-4 shadow-lg rounded-lg border p-4', isLoadingDeliveryMethod ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

        <!-- Delete Delivery Method Info -->
        <p>Do you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>? Once this delivery method is deleted you will not be able to recover it.</p>

        <div class="flex justify-end">

            <ConfirmModal approveText="Delete Delivery Method" :approveAction="deleteDeliveryMethod" :isLoading="isDeleting">

                <template #content>
                    <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                    <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>?</p>
                </template>

                <template #trigger="triggerProps">

                    <!-- Delete Delivery Method Button - Triggers Confirmation Modal -->
                    <Button type="danger" size="xs" :action="triggerProps.showModal" :loading="isDeleting" class="w-60">
                        Delete Delivery Method
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
        inject: ['formState', 'storeState', 'deliveryMethodState', 'notificationState'],
        components: { Button, ConfirmModal },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                isDeleting: false
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            deliveryMethod() {
                return this.deliveryMethodState.deliveryMethod;
            },
            isLoadingDeliveryMethod() {
                return this.deliveryMethodState.isLoadingDeliveryMethod;
            },
        },
        methods: {
            deleteDeliveryMethod() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.deliveryMethod._links.deleteDeliveryMethod).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            //  Navigate to show delivery methods
                            this.$router.push({
                                name: 'show-store-delivery-methods',
                                params: { 'store_href': this.store._links.showStore }
                            }).then(() => {
                                // Ensure scroll to top after route navigation
                                window.scrollTo(0, 0);
                            });

                            this.notificationState.showSuccessNotification('Delivery method deleted');

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
