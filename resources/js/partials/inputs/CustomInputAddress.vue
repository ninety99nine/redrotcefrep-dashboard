<template>

    <CustomModal
        ref="modal"
        :showFooter="false"
        :scrollOnContent="false"
        :header="form.completeAddress ? 'Edit Address' : 'Add Address'">

        <template #content>

            <div class="grid grid-cols-2 gap-2">

                <template v-if="step == 1">

                    <div class="col-span-2 space-y-2">

                        <!-- Address Line Input -->
                        <LineSkeleton v-if="isLoadingCountryAddressOptions" :shine="true"></LineSkeleton>
                        <CustomInput
                            v-else
                            v-model="form.addressLine"
                            placeholder="Street address"
                            :errorText="formState.getFormError('addressLine')">
                        </CustomInput>

                        <!-- Address Line 2 Input -->
                        <LineSkeleton v-if="isLoadingCountryAddressOptions" :shine="true"></LineSkeleton>
                        <CustomInput
                            v-else
                            v-model="form.addressLine2"
                            :errorText="formState.getFormError('addressLine2')"
                            placeholder="Apartment, unit number, suite, etc. (optional)">
                        </CustomInput>

                    </div>

                    <!-- City Input -->
                    <div v-if="isLoadingCountryAddressOptions" class="col-span-2">
                        <LineSkeleton :shine="true"></LineSkeleton>
                    </div>
                    <div v-else-if="countryAddressOption.city.required" :class="cityWrapperClass">
                        <CustomInput
                            v-model="form.city"
                            :errorText="formState.getFormError('city')"
                            :placeholder="countryAddressOption.city.label">
                        </CustomInput>
                    </div>

                    <!-- State Input -->
                    <div v-if="isLoadingCountryAddressOptions" class="col-span-1">
                        <LineSkeleton :shine="true"></LineSkeleton>
                    </div>
                    <div v-else-if="countryAddressOption.state.required" class="col-span-1">
                        <CustomInput
                            v-model="form.state"
                            :errorText="formState.getFormError('state')"
                            :placeholder="countryAddressOption.state.label">
                        </CustomInput>
                    </div>

                    <!-- Postal Code Input -->
                    <div v-if="isLoadingCountryAddressOptions" class="col-span-1">
                        <LineSkeleton :shine="true"></LineSkeleton>
                    </div>
                    <div v-else-if="countryAddressOption.postal_code.required" class="col-span-1">
                        <CustomInput
                            v-model="form.postalCode"
                            :errorText="formState.getFormError('postalCode')"
                            :placeholder="countryAddressOption.postal_code.label">
                        </CustomInput>
                    </div>

                    <!-- Country Select Input -->
                    <div v-if="isLoadingCountryAddressOptions" class="col-span-1">
                        <LineSkeleton :shine="true"></LineSkeleton>
                    </div>
                    <div v-else :class="countryWrapperClass">
                        <CustomSelectCountry
                            v-model="form.country">
                        </CustomSelectCountry>
                    </div>

                </template>

                <template v-else-if="step == 2">

                    <div class="col-span-2">

                        <!-- Google Maps -->
                        <GoogleMaps
                            height="350px"
                            @markerMoved="markerMoved"
                            @addedMarker="addedMarker"
                            :address="googleMapsAddress"
                            :placeId="mustSaveChanges ? null : form.placeId"
                            :latitude="mustSaveChanges ? null : form.latitude"
                            :longitude="mustSaveChanges ? null : form.longitude">
                        </GoogleMaps>

                    </div>

                </template>

                <div class="col-span-2 flex space-x-2 mt-4">

                    <Button
                        size="sm"
                        type="danger"
                        :action="deleteAddress"
                        :disabled="isSubmitting"
                        v-if="step == 1 && form.completeAddress">
                        <span>Delete</span>
                    </Button>

                    <template v-if="step == 2">

                        <Button
                            size="sm"
                            type="light"
                            class="w-24"
                            :action="() => step = 1">
                            <span>Back</span>
                        </Button>

                    </template>

                    <Button
                        size="sm"
                        type="primary"
                        class="w-full"
                        :action="submit"
                        :disabled="isLoadingCountryAddressOptions || (!pinLocationOnMap && !mustSaveChanges)">
                        <span>{{ submitText }}</span>
                    </Button>

                </div>

            </div>

        </template>

        <template #trigger>

            <!-- Edit Address / Add Address Button - Triggers Modal -->
            <div>

                <slot name="heading">

                    <h1 v-if="heading" class="flex items-center font-lg font-bold mb-2">
                        <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>{{ heading }}</span>
                    </h1>

                </slot>

                <slot name="content">
                    <p v-if="content" class="text-sm text-gray-500 pb-2 border-b border-dashed">{{ content }}</p>
                </slot>

                <slot name="addressTrigger" :completeAddress="form.completeAddress" :showModal="showModal">

                    <div
                        v-if="form.completeAddress"
                        class="flex justify-between items-center space-x-20 my-4">
                        <span class="text-sm">{{ form.completeAddress }}</span>

                        <Button type="light" size="xs" :action="showModal">
                            <span class="whitespace-nowrap">Edit Address</span>
                        </Button>
                    </div>

                    <Button v-else type="light" size="xs" icon="add" :action="showModal" class="w-full mt-4">
                        <span>Add Address</span>
                    </Button>

                </slot>

                <!-- Google Maps -->
                <GoogleMaps
                    height="350px"
                    :gmpDraggable="false"
                    :latitude="previewLatitude"
                    :longitude="previewLongitude"
                    v-if="previewLatitude && previewLongitude">
                </GoogleMaps>

            </div>

        </template>

    </CustomModal>

</template>


<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Button from '@Partials/buttons/Button.vue';
    import GoogleMaps from '@Partials/maps/GoogleMaps.vue';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import CustomModal from '@Partials/inputs/CustomModal.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import CustomSelectCountry from '@Partials/inputs/CustomSelectCountry.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        inject: ['apiState', 'formState', 'notificationState'],
        components: {
            Button, GoogleMaps, CustomInput, CustomModal, LineSkeleton, CustomSelectCountry
        },
        props: {
            heading: {
                type: [String, null],
                default: null
            },
            content: {
                type: [String, null],
                default: null
            },
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
            pinLocationOnMap: {
                type: Boolean,
                default: true
            },
            onlyValidate: {
                type: Boolean,
                default: false
            }
        },
        emits: ['onValidated', 'onCreated', 'onUpdated', 'onDeleted'],
        data() {
            return {
                step: 1,
                form: {
                    city: null,
                    state: null,
                    country: 'BW',
                    placeId: null,
                    latitude: null,
                    longitude: null,
                    postalCode: null,
                    addressLine: null,
                    addressLine2: null,
                    completeAddress: null
                },
                originalForm: null,
                isSubmitting: false,
                previewLatitude: null,
                previewLongitude: null,
                countryAddressOptions: [],
                isLoadingCountryAddressOptions: false
            };
        },
        watch: {
            'address'(newValue) {
                this.setFields(newValue);
            }
        },
        computed: {
            submitText() {
                if(this.pinLocationOnMap && this.step == 1) {
                    return 'Next';
                }else if(this.form.completeAddress) {
                    return 'Save Address';
                }else{
                    return 'Add Address';
                }
            },
            cityWrapperClass() {
                const stateRequired = this.countryAddressOption.state.required;
                const postalCodeRequired = this.countryAddressOption.postal_code.required;

                return (stateRequired && postalCodeRequired) || (!stateRequired && !postalCodeRequired) ? 'col-span-1' : 'col-span-2';
            },
            countryWrapperClass() {
                const cityRequired = this.countryAddressOption.city.required;
                const stateRequired = this.countryAddressOption.state.required;
                const postalCodeRequired = this.countryAddressOption.postal_code.required;

                return cityRequired || stateRequired || postalCodeRequired ? 'col-span-1' : 'col-span-2';
            },
            hasCountryAddressOption() {
                return Object.keys(this.countryAddressOptions).length > 0;
            },
            countryAddressOption() {
                return this.hasCountryAddressOption ? this.countryAddressOptions[this.form.country] : null;
            },
            googleMapsAddress() {
                var googleMapsAddress = this.form.addressLine;

                if(this.form.addressLine2 && this.form.addressLine2.trim() !== '') googleMapsAddress += (', '+this.form.addressLine2);
                if(this.form.city && this.form.city.trim() !== '') googleMapsAddress += (', '+this.form.city);
                if(this.form.state && this.form.state.trim() !== '') googleMapsAddress += (', '+this.form.state);
                if(this.form.postalCode && this.form.postalCode.trim() !== '') googleMapsAddress += (', '+this.form.postalCode);
                if(this.form.country && this.form.country.trim() !== '') googleMapsAddress += (', '+this.form.country);

                return googleMapsAddress;
            },
            hasAddress() {
                return this.address != null;
            },
            validate() {
                return this.onlyValidate || (
                       this.address === null &&
                       this.userId === null &&
                       this.storeId === null &&
                       this.customerId === null &&
                       this.deliveryMethodId === null);
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
            showModal() {
                this.step = 1;
                this.copyOriginalForm();
                this.$refs.modal.showModal();
            },
            hideModal() {
                this.$refs.modal.hideModal();
            },
            markerMoved(location) {
                this.form.placeId = null;
                this.form.latitude = location.latitude;
                this.form.longitude = location.longitude;
            },
            addedMarker(location) {
                this.form.placeId = location.placeId;
                this.form.latitude = location.latitude;
                this.form.longitude = location.longitude;
            },
            setFields(address) {
                if(address) {
                    this.form.city = address.city;
                    this.form.state = address.state;
                    this.form.placeId = address.placeId;
                    this.form.country = address.country;
                    this.form.postalCode = address.postalCode;
                    this.form.addressLine = address.addressLine;
                    this.form.addressLine2 = address.addressLine2;
                    this.form.latitude = address.latitude ? parseFloat(address.latitude) : null;
                    this.form.longitude = address.longitude ? parseFloat(address.longitude) : null;
                    this.form.completeAddress = address._attributes?.completeAddress || address.completeAddress;

                    this.previewLatitude = this.form.latitude;
                    this.previewLongitude = this.form.longitude;
                }else{
                    this.form.city = null;
                    this.form.state = null;
                    this.form.country = 'BW';
                    this.form.placeId = null;
                    this.form.latitude = null;
                    this.form.longitude = null;
                    this.form.postalCode = null;
                    this.form.addressLine = null;
                    this.form.addressLine2 = null;
                    this.form.completeAddress = null;

                    this.previewLatitude = null;
                    this.previewLongitude = null;
                }

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            copyOriginalForm() {
                this.form = cloneDeep(this.originalForm);
            },
            submit() {
                if(this.pinLocationOnMap && this.step == 1) {
                    this.step = 2;
                }else if(this.validate) {
                    this.validateAddress();
                }else if(this.hasAddress) {
                    this.updateAddress();
                }else{
                    this.createAddress();
                }
            },
            showCountryAddressOptions() {

                //  Start loader
                this.isLoadingCountryAddressOptions = true;

                getApi(this.apiState.apiHome['_links']['showCountryAddressOptions']).then(response => {

                    if(response.status == 200) {
                        this.countryAddressOptions = response.data;
                    }

                    //  Stop loader
                    this.isLoadingCountryAddressOptions = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingCountryAddressOptions = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            validateAddress() {

                //  Start loader
                this.isSubmitting = true;

                postApi(this.apiState.apiHome['_links']['validateAddAddress'], this.form).then(response => {

                    if(response.status == 200) {

                        this.form.completeAddress = response.data.completeAddress;
                        this.$emit('onValidated', cloneDeep(this.form));
                        this.previewLongitude = this.form.longitude;
                        this.previewLatitude = this.form.latitude;
                        this.originalForm = cloneDeep(this.form);
                        this.hideModal();

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            createAddress() {

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

                        this.notificationState.showSuccessNotification('Address created');
                        this.$emit('onCreated', response.data.address);
                        this.setFields(response.data.address);
                        this.hideModal();

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            updateAddress() {

                //  Start loader
                this.isSubmitting = true;

                let data = {...this.form, return: '1'};

                putApi(this.address._links.updateAddress, data).then(response => {

                    if(response.status == 200) {

                        this.notificationState.showSuccessNotification('Address updated');
                        this.$emit('onUpdated', response.data.address);
                        this.setFields(response.data.address);
                        this.hideModal();

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deleteAddress() {

                if(!this.hasAddress || this.onlyValidate) {
                    this.$emit('onDeleted', this.form);
                    this.form.completeAddress = null;
                    this.setFields(null);
                    this.hideModal();
                    return;
                }

                //  Start loader
                this.isSubmitting = true;

                deleteApi(this.address._links.deleteAddress).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification('Address deleted');
                            this.$emit('onDeleted', response.data.address);
                            this.setFields(null);
                            this.hideModal();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
        },
        created() {
            this.setFields(this.address);
            this.showCountryAddressOptions();
        }
    };
</script>
