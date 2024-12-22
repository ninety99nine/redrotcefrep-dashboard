<template>

    <BasicModal>

        <template #content="triggerProps">

            <div class="grid grid-cols-2 gap-2">

                <h1 class="font-lg font-bold">{{ completeAddress ? 'Edit Address' : 'Add Address' }}</h1>

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
                        :errorText="getFormError('addressLine2')"
                        placeholder="Apartment, unit number, suite, etc. (optional)">
                    </TextInput>

                </div>

                <div class="col-span-1">

                    <!-- City Input -->
                    <TextInput
                        v-model="form.city"
                        placeholder="City/Town"
                        :errorText="getFormError('city')">
                    </TextInput>

                </div>

                <div class="col-span-1">

                    <!-- State Input -->
                    <TextInput
                        v-model="form.state"
                        placeholder="State/Province/Region"
                        :errorText="getFormError('state')">
                    </TextInput>

                </div>

                <div class="col-span-1">

                    <!-- Postal Code Input -->
                    <TextInput
                        placeholder="Postal/ZIP code"
                        v-model="form.postalCode"
                        :errorText="getFormError('postalCode')">
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
                        v-if="completeAddress"
                        :disabled="isSubmitting"
                        @click="() => deleteAddress(triggerProps.hideModal)" size="xs" type="danger">
                        <span class="ml-2">Delete</span>
                    </DeleteButton>

                    <PrimaryButton
                        @click="() => submit(triggerProps.hideModal)"
                        :disabled="!mustSaveChanges" size="xs" type="success"
                        class="w-full">
                        {{ completeAddress ? 'Save Address' : 'Add Address' }}
                    </PrimaryButton>

                </div>

            </div>

        </template>

        <template #trigger="triggerProps">

            <!-- Edit Address / Add Address Button - Triggers Modal -->
            <slot name="trigger" :showModal="triggerProps.showModal">

                <div class="space-y-4 p-4 border rounded-lg shadow-lg bg-white">

                    <h1 class="flex items-center font-lg font-bold">
                        <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>{{ title }}</span>
                    </h1>

                    <p class="text-sm text-gray-500 mb-2 pb-4 border-b border-dashed">{{ subtitle }}</p>

                    <div v-if="completeAddress" class="flex justify-between items-center space-x-20">
                        <span class="text-sm">{{ completeAddress }}</span>

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
            },
            deliveryMethodId: {
                type: [String, null],
                default: null
            },
            title: {
                type: String,
                default: 'Address'
            },
            subtitle: {
                type: String,
                default: 'Address used by customers to know your store location.'
            }
        },
        emits: ['onValidated', 'onCreated', 'onUpdated', 'onDeleted'],
        data() {
            return {
                form: {
                    city: '',
                    state: '',
                    country: 'BW',
                    placeId: null,
                    addressLine: '',
                    postalCode: '',
                    addressLine2: '',
                },
                originalForm: null,
                isSubmitting: false,
                completeAddress: null,
                apiState: useApiState()
            };
        },
        watch: {
            'address'(newValue, oldValue) {
                if(newValue) {
                    this.setAddressFields();
                    this.completeAddress = newValue._attributes.completeAddress;
                }else{
                    this.completeAddress = null;
                    this.resetFormFields();
                }
            }
        },
        computed: {
            hasAddress() {
                return this.address != null;
            },
            validate() {
                return this.address === null &&
                       this.userId === null &&
                       this.storeId === null &&
                       this.customerId === null &&
                       this.deliveryMethodId === null;
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
                this.form.city = this.address.city;
                this.form.state = this.address.state;
                this.form.placeId = this.address.placeId;
                this.form.country = this.address.country;
                this.form.postalCode = this.address.postalCode;
                this.form.addressLine = this.address.addressLine;
                this.form.addressLine2 = this.address.addressLine2;

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            resetFormFields() {
                this.form.city = '';
                this.form.state = '';
                this.form.country = 'BW';
                this.form.placeId = null;
                this.form.postalCode = '';
                this.form.addressLine = '';
                this.form.addressLine2 = '';

                this.originalForm = cloneDeep(this.form);
            },
            submit(hideModal) {
                if(this.validate) {
                    this.validateAddress(hideModal);
                }else if(this.hasAddress) {
                    this.updateAddress(hideModal);
                }else{
                    this.createAddress(hideModal);
                }
            },
            validateAddress(hideModal) {

                //  Start loader
                this.isSubmitting = true;

                postApi(this.apiState.apiHome['_links']['validateAddAddress'], this.form).then(response => {

                    if(response.status == 200) {

                        hideModal();
                        this.$emit('onValidated', this.form);
                        this.completeAddress = response.data.completeAddress;

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
                }else if(this.deliveryMethodId) {
                    data['deliveryMethodId'] = this.deliveryMethodId;
                }

                postApi(this.apiState.apiHome['_links']['createAddress'], data).then(response => {

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

                let data = {...this.form, return: '1'};

                putApi(this.address._links.updateAddress, data).then(response => {

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
            deleteAddress(hideModal) {

                if(!this.hasAddress) {
                    this.$emit('onDeleted', this.form);
                    this.completeAddress = null;
                    this.resetFormFields();
                    hideModal();
                    return;
                }

                //  Start loader
                this.isSubmitting = true;

                deleteApi(this.address._links.deleteAddress).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            hideModal();
                            this.resetFormFields();
                            this.$emit('onDeleted', response.data.address);

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Address deleted');

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

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
                this.completeAddress = this.address._attributes.completeAddress;
            }else{
                this.originalForm = cloneDeep(this.form);
            }
        }
    };
</script>
