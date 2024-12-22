<template>

    <div class="bg-white shadow-lg border p-8 rounded-lg">

        <h1 class="flex items-center text-lg font-bold mb-2">

            <!-- Truck Icon -->
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>

            <!-- Title -->
            <span>Delivery / Pickup Methods</span>

        </h1>

        <!-- Description -->
        <p class="text-sm text-gray-500 mb-4">
            Set up how your customers can get their orders, whether through delivery or pickup, to make it easy and convenient for them.
        </p>

        <div class="space-y-4">

            <!-- Search Input -->
            <SearchInput v-if="hasSearchTerm || hasDeliveryMethods" v-model="searchTerm" :isSearching="isSearching"></SearchInput>

            <!-- Delivery Methods (Loading Placeholder) -->
            <div v-if="isLoadingDeliveryMethods" class="space-y-2">

                <div v-for="(_, index) in [1,2,3]" :key="index" class="border shadow-sm rounded-lg p-4 bg-gray-50">
                    <ShineEffect class="w-full flex items-center justify-between space-x-2">
                        <LineSkeleton width="w-32"></LineSkeleton>
                        <LineSkeleton width="w-16"></LineSkeleton>
                    </ShineEffect>
                </div>

            </div>

            <!-- Delivery Methods -->
            <template v-else>

                <draggable
                    class="space-y-2"
                    v-model="deliveryMethods"
                    handle=".draggable-handle"
                    ghost-class="bg-yellow-50"
                    @change="updateDeliveryMethodArrangement">
                    <div v-for="(deliveryMethod, index) in deliveryMethods" @click="() => onViewDeliveryMethod(deliveryMethod)" :key="index" class="flex items-center justify-between space-x-4 border shadow-sm rounded-lg p-4 bg-gray-50 cursor-pointer hover:border-blue-200 hover:bg-blue-50 group">

                        <!-- Delivery Method -->
                        <div class="w-full flex items-center justify-between">

                            <!-- Name -->
                            <h1 class="text-sm font-semibold">{{ deliveryMethod.name }}</h1>

                            <div class="flex items-center space-x-2">

                                <!-- Active Status Badge -->
                                <BadgeIndicator :type="deliveryMethod.active ? 'success' : 'warning'" :text="deliveryMethod.active ? 'Active' : 'Inactive'" :showDot="false"></BadgeIndicator>

                            </div>
                        </div>

                        <!-- Deleting Loader -->
                        <SpiningLoader v-if="isDeleting(deliveryMethod)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpiningLoader>

                        <!-- Delete Button - Triggers Confirmation Modal -->
                        <svg v-else @click.stop.prevent="showDeleteConfirmationModal(deliveryMethod)" class="w-4 h-4 cursor-pointer hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        <!-- Drag & Drop Handle -->
                        <svg @click.stop class="draggable-handle w-4 h-4 cursor-grab hover:text-yellow-500 active:cursor-grabbing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>

                    </div>

                </draggable>

                <!-- No Delivery Methods -->
                <div v-if="!hasDeliveryMethods">

                    <div class="flex justify-between items-center space-x-8 px-16 py-4 border rounded-lg bg-gray-50">

                        <svg class="w-80 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>

                        <div class="space-y-2">
                            <p v-if="hasSearchTerm" class="font-bold">No delivery methods found.</p>
                            <p>Click the <BadgeIndicator type="primary" text="+ Add Delivery Method" :showDot="false" :clickable="true" :action="() => onAddDeliveryMethod()"></BadgeIndicator> button to offer your customers convenient delivery methods on your store</p>
                        </div>
                    </div>

                </div>

            </template>

            <!-- Add Delivery Method Button Skeleton -->
            <ShineEffect v-if="isLoadingDeliveryMethods">
                <ButtonSkeleton size="sm" class="w-full">
                    <span class="leading-none text-sm">&#65291;</span>
                    <span class="ml-2">Add Delivery Method</span>
                </ButtonSkeleton>
            </ShineEffect>

            <!-- Add Delivery Method Button -->
            <AddButton v-else @click="() => onAddDeliveryMethod()" size="sm" type="light">
                <span class="ml-2">Add Delivery Method</span>
            </AddButton>

            <!-- Confirm Delete Delivery Method -->
            <ConfirmModal v-if="deletableDeliveryMethod" approveText="Delete" :approveAction="(hideModal) => deleteDeliveryMethod(hideModal)" :isLoading="isDeleting(deleteDeliveryMethod)">

                <template #content>
                    <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                    <p class="mb-8">Are you sure you want to delete <span class="font-bold text-black">{{ deletableDeliveryMethod.name }}</span>?</p>
                </template>

                <template #trigger="triggerProps">

                    <!-- Delete Delivery Method Button - Triggers Confirmation Modal -->
                    <PrimaryButton ref="confirmDeleteButton" @click="triggerProps.showModal" class="hidden" type="danger"></PrimaryButton>

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
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import ButtonSkeleton from '@Partials/skeletons/ButtonSkeleton.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import { getApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [FormMixin],
        components: {
            draggable: VueDraggableNext, AddButton, SearchInput, ConfirmModal, ShineEffect,
            SpiningLoader, LineSkeleton, PrimaryButton, ButtonSkeleton, BadgeIndicator
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                searchTerm: '',
                deliveryMethods: [],
                apiState: useApiState(),
                storeState: useStoreState(),
                deletableDeliveryMethod: null,
                isDeletingDeliveryMethodIds: [],
                isLoadingDeliveryMethods: false,
                isUpdatingDeliveryMethodArrangement: false,
            }
        },
        watch: {
            searchTerm(newValue, oldValue) {
                this.showDeliveryMethods();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isSearching() {
                return this.hasSearchTerm && this.isLoadingDeliveryMethods;
            },
            hasSearchTerm() {
                return this.searchTerm.length > 0;
            },
            hasDeliveryMethods() {
                return this.deliveryMethods.length > 0;
            },
        },
        methods: {
            onViewDeliveryMethod(deliveryMethod) {
                this.$router.push({
                    name: 'show-store-delivery-method',
                    params: { 'delivery_method_href': deliveryMethod._links.showDeliveryMethod }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            onAddDeliveryMethod() {
                this.$router.push({ name: 'create-store-delivery-method', params: { 'store_href': this.store._links.showStore } });
            },
            showDeleteConfirmationModal(deliveryMethod) {
                this.deletableDeliveryMethod = deliveryMethod;
                /**
                 *  After setting the deletableDeliveryMethod, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which opens the
                 *  confirmation modal dialog. This is so that when the dialog opens we don't
                 *  get an error trying to access the deletableDeliveryMethod values. This
                 *  is only available on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(deliveryMethod) {
                return this.isDeletingDeliveryMethodIds.findIndex((id) => id == deliveryMethod.id) != -1;
            },
            showDeliveryMethods() {

                //  Start loader
                this.isLoadingDeliveryMethods = true;

                const params = {
                    'storeId': this.store.id
                };

                if(this.searchTerm) params['search'] = this.searchTerm;

                getApi(this.store._links['showStoreDeliveryMethods'], params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.deliveryMethods = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingDeliveryMethods = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingDeliveryMethods = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            updateDeliveryMethodArrangement() {

                //  Start loader
                this.isUpdatingDeliveryMethodArrangement = true;

                //  Set the query params
                const params = {
                    'storeId': this.store.id,
                    'deliveryMethodIds': this.deliveryMethods.map((deliveryMethod) => deliveryMethod.id)
                }

                postApi(this.apiState.apiHome['_links']['updateDeliveryMethodArrangement'], params).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Delivery method arrangement updated');

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.isUpdatingDeliveryMethodArrangement = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isUpdatingDeliveryMethodArrangement = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteDeliveryMethod(hideModal) {

                //  Start loader
                this.isDeletingDeliveryMethodIds.push(this.deletableDeliveryMethod.id);

                deleteApi(this.deletableDeliveryMethod._links.deleteDeliveryMethod).then(response => {

                    hideModal();

                    //  Stop loader
                    this.isDeletingDeliveryMethodIds.splice(this.isDeletingDeliveryMethodIds.findIndex((id) => id == this.deleteDeliveryMethod.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Delivery method deleted');

                            //  If we are not deleting any other delivery method, then refresh the delivery method list
                            if(this.isDeletingDeliveryMethodIds.length == 0) this.showDeliveryMethods();

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingDeliveryMethodIds.splice(this.isDeletingDeliveryMethodIds.findIndex((id) => id == this.deleteDeliveryMethod.id, 1));

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            }
        },
        created() {
            this.showDeliveryMethods();
        }
    };

</script>
