<template>

    <BasicModal :onHide="resetForm">

        <template #content="triggerProps">

            <div>

                <h1 class="font-lg font-bold mb-8">{{ mobileNumber ? 'Edit Mobile Number' : 'Add Mobile Number' }}</h1>

                <!-- Form Error Messages -->
                <FormErrorMessages></FormErrorMessages>

                <!-- Mobile Number Input -->
                <MobileNumberInput
                    label="Mobile Number"
                    v-model="form.mobileNumber"
                    labelPopoverTitle="What Is This?"
                    :errorText="formState.getFormError('mobileNumber')"
                    labelPopoverDescription="The mobile number that will be used to receive orders via whatsapp when customers checkout on your store website">

                    <template v-if="showWhatsappIcon" #prepend>
                        <svg class="w-6 h-6 ml-3" fill="#44c152" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve">
                            <g id="XMLID_468_">
                                <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                            </g>
                        </svg>
                    </template>

                </MobileNumberInput>

                <div class="flex space-x-2 mt-4">

                    <!-- Delete Button -->
                    <Button
                        size="xs"
                        type="danger"
                        v-if="mobileNumber"
                        :disabled="isSubmitting"
                        :action="() => _deleteMobileNumber(triggerProps.hideModal)">
                        <span>Delete</span>
                    </Button>

                    <!-- Save Changes / Add Mobile Number Button -->
                    <Button
                        size="xs"
                        type="success"
                        class="w-full"
                        :disabled="!mustSaveChanges"
                        :action="() => mobileNumber ? _updateMobileNumber(triggerProps.hideModal) : _createMobileNumber(triggerProps.hideModal)">
                        <span>{{ mobileNumber ? 'Save Changes' : 'Add Mobile Number' }}</span>
                    </Button>

                </div>

            </div>

        </template>

        <template #trigger="triggerProps">

            <!-- Edit Mobile Number / Add Mobile Number Button - Triggers Modal -->
            <slot name="trigger" :showModal="triggerProps.showModal">

                <div :class="bodyClass">

                    <!-- Content -->
                    <slot name="content"></slot>

                    <template v-if="hasMobileNumbers">

                        <div class="flex flex-wrap gap-2">

                            <!-- Prefix content -->
                            <slot name="prefix"></slot>

                            <Pill
                                size="xs"
                                :key="index"
                                type="primary"
                                :showDot="false"
                                v-for="(mobileNumber, index) in mobileNumbers"
                                :action="() => showMobileNumber(triggerProps.showModal, mobileNumber, index)">

                                <div class="flex items-center space-x-2">
                                    <span>{{ mobileNumber }}</span>
                                    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </div>

                            </Pill>

                            <Button :action="() => showMobileNumber(triggerProps.showModal, null, null)" class="w-48">
                                <span class="text-xs">Add Mobile Number</span>
                            </Button>

                        </div>

                    </template>

                    <Button v-else type="light" size="xs" :action="() => showMobileNumber(triggerProps.showModal, null, null)" class="w-48">
                        <span class="whitespace-nowrap ml-2">Add Mobile Number</span>
                    </Button>

                </div>

            </slot>

        </template>

    </BasicModal>

</template>


<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import BasicModal from '@Partials/modals/BasicModal.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';

    export default {
        inject: ['formState'],
        components: { Pill, Button, BasicModal, MobileNumberInput, FormErrorMessages },
        props: {
            isSubmitting: {
                type: Boolean,
                default: false
            },
            mobileNumbers: {
                type: Array,
                default: () => {
                    return []
                }
            },
            createMobileNumber: {
                type: Function,
                default: null
            },
            updateMobileNumber: {
                type: Function,
                default: null
            },
            deleteMobileNumber: {
                type: Function,
                default: null
            },
            bodyClass: {
                type: String,
                default: null
            },
            showWhatsappIcon: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                form: {
                    mobileNumber: ''
                },
                originalForm: null,
                mobileNumber: null,
                mobileNumberIndex: null,
            };
        },
        computed: {
            hasMobileNumbers() {
                return this.mobileNumbers.length > 0;
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
            showMobileNumber(showModal, mobileNumber, mobileNumberIndex) {
                this.mobileNumberIndex = mobileNumberIndex;
                this.mobileNumber = mobileNumber;

                if(this.mobileNumber) this.setForm();
                showModal();
            },
            setForm() {
                this.form.mobileNumber = this.mobileNumber;

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            resetForm() {
                this.form = {
                    mobileNumber: ''
                };

                this.originalForm = cloneDeep(this.form);
            },
            _createMobileNumber(hideModal) {

                // Check if the mobile number already exists
                const mobileNumberExists = this.mobileNumbers.some(
                    (number) => number === this.form.mobileNumber
                );

                // If it exists, prevent adding and possibly show a warning
                if(mobileNumberExists) {
                    this.notificationState.showWarningNotification('Mobile number already exists');
                    hideModal();
                    return;
                }

                if(this.createMobileNumber) this.createMobileNumber(
                    this.form.mobileNumber, this.resetForm, hideModal
                );

            },
            _updateMobileNumber(hideModal) {

                // Check if the mobile number already exists
                const mobileNumberExists = this.mobileNumbers.some(
                    (number) => number === this.form.mobileNumber
                );

                // If it exists, prevent adding and possibly show a warning
                if(mobileNumberExists) {
                    this.notificationState.showWarningNotification('Mobile number already exists');
                    hideModal();
                    return;
                }

                if(this.updateMobileNumber) this.updateMobileNumber(
                    this.form.mobileNumber, this.mobileNumberIndex, this.resetForm, hideModal
                );

            },
            _deleteMobileNumber(hideModal) {

                if(this.deleteMobileNumber) this.deleteMobileNumber(
                    this.mobileNumberIndex, this.resetForm, hideModal
                );

            },
        }
    };

</script>
