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
                    <PrimaryButton @click="triggerProps.showModal" :loading="isDeleting" class="w-60" type="danger">
                        Delete Delivery Method
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
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import { useDeliveryMethodState } from '@Stores/delivery-method-store.js';

    export default {
        mixins: [FormMixin],
        components: { ConfirmModal, PrimaryButton },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                isDeleting: false,
                storeState: useStoreState(),
                deliveryMethodState: useDeliveryMethodState()
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

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Delivery method deleted');

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

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
        }
    };

</script>
