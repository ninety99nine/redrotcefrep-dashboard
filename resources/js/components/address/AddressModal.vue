<template>

    <BasicModal>

        <template #content="triggerProps">

            <div class="grid grid-cols-2 gap-2">

                <h1 class="font-lg font-bold">{{ hasAddress ? 'Edit Address' : 'Add Address' }}</h1>

                <div class="col-span-2 space-y-2">

                    <!-- Address Line Input -->
                    <TextInput
                        v-model="form.addressLine"
                        placeholder="Street address"
                        :errorText="getFormError('addressLine')">
                    </TextInput>

                    <!-- Address Line 2 Input -->
                    <TextInput
                        v-model="form.addressLine2"
                        placeholder="Apartment, unit number, suite, etc. (optional)"
                        :errorText="getFormError('addressLine2')">
                    </TextInput>

                </div>

                <div class="col-span-1">

                    <!-- City Input -->
                    <TextInput
                        v-model="form.city"
                        placeholder="City"
                        :errorText="getFormError('city')">
                    </TextInput>

                </div>

                <div class="col-span-1">

                    <!-- State Input -->
                    <TextInput
                        v-model="form.state"
                        placeholder="State"
                        :errorText="getFormError('state')">
                    </TextInput>

                </div>

                <div class="col-span-1">

                    <!-- Zip Input -->
                    <TextInput
                        v-model="form.zip"
                        placeholder="Zip"
                        :errorText="getFormError('zip')">
                    </TextInput>

                </div>

                <div class="col-span-1">

                    <!-- Country Select Input -->
                    <CountrySelectInput
                        width="w-full"
                        v-model="form.country">
                    </CountrySelectInput>

                </div>

                <div class="col-span-2 flex space-x-2 mt-4">

                    <DeleteButton
                        v-if="hasAddress"
                        :disabled="isSubmitting"
                        @click="() => removeAddress(triggerProps.hideModal)" size="xs" type="danger">
                        <span class="ml-2">Delete</span>
                    </DeleteButton>

                    <PrimaryButton
                        @click="() => hasAddress ? updateAddress(triggerProps.hideModal) : createAddress(triggerProps.hideModal)"
                        :disabled="!mustSaveChanges" size="xs" type="success"
                        class="w-full">
                        {{ hasAddress ? 'Save Address' : 'Add Address' }}
                    </PrimaryButton>

                </div>

            </div>

        </template>

        <template #trigger="triggerProps">

            <!-- Edit Address / Add Address Button - Triggers Modal -->
            <slot name="trigger" :showModal="triggerProps.showModal">

                <div class="space-y-4 p-4 border rounded-lg shadow-lg">

                    <h1 class="flex items-center font-lg font-bold">
                        <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>Address</span>
                    </h1>

                    <p class="text-sm text-gray-500 mb-2 pb-4 border-b border-dashed">Address used by customers to know your store location.</p>

                    <div v-if="hasAddress" class="flex justify-between items-center space-x-20">
                        <span class="text-sm">{{ address._attributes.completeAddress }}</span>

                        <PrimaryButton @click="triggerProps.showModal" size="xs" type="light">
                            <span class="whitespace-nowrap">Edit Address</span>
                        </PrimaryButton>
                    </div>

                    <AddButton v-else @click="triggerProps.showModal" size="sm" type="light">
                        <span class="ml-2">Add Address</span>
                    </AddButton>

                </div>
            </slot>

        </template>

    </BasicModal>

</template>


<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicModal from '@Partials/modals/BasicModal.vue';
    import DeleteButton from '@Partials/buttons/DeleteButton.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import CountrySelectInput from '@Partials/inputs/CountrySelectInput.vue';
    import { putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [FormMixin],
        components: { TextInput, AddButton, BasicModal, DeleteButton, ShineEffect, PrimaryButton, LineSkeleton, CountrySelectInput },
        props: {
            address: {
                type: [Object, null],
                default: null
            },
            userId: {
                type: [String, null],
                default: null
            },
            storeId: {
                type: [String, null],
                default: null
            },
            customerId: {
                type: [String, null],
                default: null
            }
        },
        emits: ['onCreated', 'onUpdated', 'onDeleted'],
        data() {
            return {
                form: {
                    zip: '',
                    city: '',
                    state: '',
                    country: 'BW',
                    placeId: null,
                    addressLine: '',
                    addressLine2: '',
                },
                originalForm: null,
                isSubmitting: false,
                apiState: useApiState()
            };
        },
        computed: {
            hasAddress() {
                return this.address != null;
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.formHasChanged && !this.isSubmitting;
            },
        },
        methods: {
            setAddressFields() {
                this.form.zip = this.address.zip;
                this.form.city = this.address.city;
                this.form.state = this.address.state;
                this.form.placeId = this.address.placeId;
                this.form.country = this.address.country;
                this.form.addressLine = this.address.addressLine;
                this.form.addressLine2 = this.address.addressLine2;

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            resetFormFields() {
                this.form.zip = '';
                this.form.city = '';
                this.form.state = '';
                this.form.country = 'BW';
                this.form.placeId = null;
                this.form.addressLine = '';
                this.form.addressLine2 = '';

                this.originalForm = cloneDeep(this.form);
            },
            createAddress(hideModal) {

                //  Start loader
                this.isSubmitting = true;

                let data = {...this.form, return: '1'};

                if(this.userId) {
                    data['userId'] = this.userId;
                }else if(this.storeId) {
                    data['storeId'] = this.storeId;
                }else if(this.customerId) {
                    data['customerId'] = this.customerId;
                }

                postApi(this.apiState.apiHome['_links']['addAddress'], data).then(response => {

                    if(response.status == 200) {

                        hideModal();
                        this.$emit('onCreated', response.data.address);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Address created');

                        //  Capture the original form before editting.
                        this.originalForm = cloneDeep(this.form);

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            updateAddress(hideModal) {

                //  Start loader
                this.isSubmitting = true;

                putApi(this.address._links.updateAddress, {...this.form, return: '1'}).then(response => {

                    if(response.status == 200) {

                        hideModal();
                        this.$emit('onUpdated', response.data.address);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Address updated');

                        //  Capture the original form before editting.
                        this.originalForm = cloneDeep(this.form);

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            removeAddress(hideModal) {

                //  Start loader
                this.isSubmitting = true;

                deleteApi(this.address._links.removeAddress).then(response => {

                    if(response.status == 200) {

                        hideModal();
                        this.resetFormFields();
                        this.$emit('onDeleted', response.data.address);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Address deleted');

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
        },
        created() {
            if(this.address) {
                this.setAddressFields();
            }else{
                this.originalForm = cloneDeep(this.form);
            }
        }
    };
</script>
