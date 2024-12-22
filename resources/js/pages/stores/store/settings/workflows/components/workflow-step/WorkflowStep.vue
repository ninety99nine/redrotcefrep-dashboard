<template>

    <div>

        <!-- Dotted Separator Line -->
        <div v-if="index != 0" :class="[mustCreate ? 'border-gray-200' : 'border-blue-200', 'w-0 h-6 ml-8 border-l-2 border-dashed']"></div>

        <div :class="[mustCreate ? 'bg-gray-50 border-gray-200' : 'bg-blue-50/50 border-blue-200', 'border border-dashed rounded-lg shadow-sm p-4 relative']">

            <div class="relative">

                <div class="grid grid-cols-2 gap-x-4">

                    <div class="col-span-1 flex justify-end items-center space-x-4">

                        <!-- Number -->
                        <div class="flex items-center space-x-2">
                            <div :class="[ mustCreate ? 'text-gray-400 border bg-gray-50 border-gray-300' : 'text-blue-400 border bg-blue-50 border-blue-300', 'w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center']">
                                <span>{{ index + 1}}</span>
                            </div>
                        </div>

                        <span class="text-sm">Send</span>

                        <div class="w-full flex items-center space-x-2">

                            <svg v-if="sendWhatsapp" class="w-6 h-6 flex-shrink-0" fill="#44c152" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve">
                                <g id="XMLID_468_">
                                    <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                    <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                                </g>
                            </svg>
                            <svg v-else-if="sendSms" class="w-6 h-6 text-gray-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                            <svg v-else-if="sendEmail" class="w-6 h-6 text-gray-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>

                            <!-- Select Action -->
                            <SelectInput
                                class="w-full"
                                v-model="workflowStepForm.settings.action"
                                :errorText="getFormError('settingsAction')">
                                <option v-for="action in actions" :key="action" :value="action">
                                    {{ capitalize(action) }}
                                </option>
                            </SelectInput>

                        </div>

                    </div>

                    <div class="col-span-1 flex justify-start items-center space-x-4">

                        <span class="text-sm">to</span>

                        <!-- Select Recipient -->
                        <SelectInput
                            class="w-60"
                            v-model="workflowStepForm.settings.recipient"
                            :errorText="getFormError('settings.recipient')">
                            <option v-for="recipient in recipients" :key="recipient" :value="recipient">
                                {{ capitalize(recipient) }}
                            </option>
                        </SelectInput>

                    </div>

                    <div v-if="sendToCustomer && hasTemplates" class="col-span-1 flex justify-end items-center space-x-4 mt-4">

                        <span class="text-sm">to</span>

                        <!-- Select Template Template -->
                        <SelectInput
                            class="w-60"
                            v-model="workflowStepForm.settings.template"
                            :errorText="getFormError('settingsTemplate')">
                            <option v-for="template in templates" :key="template" :value="template">
                                {{ capitalize(template) }}
                            </option>
                        </SelectInput>

                    </div>

                </div>

                <div class="space-y-4 border-t border-dashed pt-4 mt-4">

                    <template v-if="sendToTeam">

                        <EmailTextInput v-if="sendEmail" :workflowStepForm="workflowStepForm"></EmailTextInput>

                        <!-- Bulk Mobile Number Input -->
                        <BulkMobileNumberInput
                            :isSubmitting="false"
                            v-if="sendWhatsapp || sendSms"
                            :showWhatsappIcon="sendWhatsapp"
                            :createMobileNumber="createMobileNumber"
                            :updateMobileNumber="updateMobileNumber"
                            :deleteMobileNumber="deleteMobileNumber"
                            :mobileNumbers="workflowStepForm.settings.mobileNumbers">
                        </BulkMobileNumberInput>

                    </template>

                    <template v-else-if="sendToCustomer">

                        <template v-if="sendWhatsapp || sendEmail">

                            <!-- Note Textarea Input -->
                            <NoteTextarea :workflowStepForm="workflowStepForm"></NoteTextarea>

                        </template>

                        <template v-if="requestAReview">

                            <!-- Review Link Text Input -->
                            <ReviewLinkTextInput :workflowStepForm="workflowStepForm"></ReviewLinkTextInput>

                        </template>

                        <template v-if="remindThemToPay">

                            <!-- Add Delay Checkbox -->
                            <AddDelayCheckbox :workflowStepForm="workflowStepForm"></AddDelayCheckbox>

                            <!-- Auto Cancel Checkbox -->
                            <AutoCancelCheckbox :workflowStepForm="workflowStepForm"></AutoCancelCheckbox>

                        </template>

                    </template>

                </div>

                <div class="flex items-center space-x-2 absolute top-1 right-0">

                    <!-- Deleting Loader -->
                    <SpiningLoader v-if="isDeleting" type="danger">
                        <span class="text-xs ml-2">Deleting...</span>
                    </SpiningLoader>

                    <!-- Delete Button - Triggers Confirmation Modal -->
                    <svg v-else-if="totalWorkflowSteps > 1" @click.stop.prevent="deleteWorkflowStep" class="w-4 h-4 cursor-pointer hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                    <!-- Drag & Drop Handle -->
                    <svg @click.stop class="draggable-handle w-4 h-4 cursor-grab hover:text-gray-500 active:cursor-grabbing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>

                </div>

            </div>

        </div>
    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import { useWorkflowState } from '@Stores/workflow-store.js';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import { postApi, putApi, deleteApi } from '@Repositories/api-repository.js';
    import BulkMobileNumberInput from '@Partials/inputs/BulkMobileNumberInput.vue';
    import NoteTextarea from '@Pages/stores/store/settings/workflows/components/workflow-step/NoteTextarea.vue';
    import EmailTextInput from '@Pages/stores/store/settings/workflows/components/workflow-step/EmailTextInput.vue';
    import AddDelayCheckbox from '@Pages/stores/store/settings/workflows/components/workflow-step/AddDelayCheckbox.vue';
    import AutoCancelCheckbox from '@Pages/stores/store/settings/workflows/components/workflow-step/AutoCancelCheckbox.vue';
    import ReviewLinkTextInput from '@Pages/stores/store/settings/workflows/components/workflow-step/ReviewLinkTextInput.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            Alert, TextHeader, UndoButton, SelectInput, SpiningLoader, PrimaryButton, MoreInfoPopover,
            FormErrorMessages, BulkMobileNumberInput, NoteTextarea, EmailTextInput, AddDelayCheckbox,
            AutoCancelCheckbox, ReviewLinkTextInput
        },
        props: {
            index: {
                type: Number
            },
            workflowStep: {
                type: [Object, null]
            }
        },
        emits: ['onCreated', 'onDeleted'],
        data() {
            return {
                isDeleting: false,
                isSubmitting: false,
                workflowStepForm: {},
                apiState: useApiState(),
                originalWorkflowStepForm: null,
                workflowState: useWorkflowState()
            }
        },
        watch: {
            mustSaveChanges(newValue) {
                if(newValue) {
                    useWorkflowState().addUnsavedWorkflowStep(this.updateWorkflowStep);
                } else {
                    useWorkflowState().removeUnsavedWorkflowStep(this.updateWorkflowStep);
                }
            },
            mustCreate(newValue) {
                if(newValue) {
                    useWorkflowState().addUncreatedWorkflowStep(this.createWorkflowStep);
                } else {
                    useWorkflowState().removeUncreatedWorkflowStep(this.createWorkflowStep);
                }
            },
            'workflowForm.trigger'(newValue) {
                this.autoSelectExistingOptions();
            },
            'workflowStepForm.settings.action'(newValue) {
                this.autoSelectExistingOptions();
            },
            'workflowStepForm.settings.recipient'() {
                this.autoSelectExistingOptions();
            }
        },
        computed: {
            workflow() {
                return this.workflowState.workflow;
            },
            workflowForm() {
                return this.workflowState.workflowForm;
            },
            totalWorkflowSteps() {
                return this.workflowState.totalWorkflowSteps;
            },
            actions() {
                if(['waiting','cancelled','completed','on its way','ready for pickup',
                    'paid','unpaid','partially paid','pending payment',
                    'low stock'].includes(this.workflowForm.trigger)) {

                    return ['whatsapp', 'email', 'sms'];

                } else {
                    return [];
                }
            },
            templates() {
                if(['completed', 'paid'].includes(this.workflowForm.trigger)) {
                    return ['show status', 'request a review'];
                }else if(['pending payment'].includes(this.workflowForm.trigger)) {
                    return ['show status', 'remind them to pay'];
                } else {
                    return [];
                }
            },
            hasTemplates() {
                return this.templates.length > 0;
            },
            recipients() {
                if(this.workflowForm.trigger == 'low stock') {
                    return ['team'];
                }else{
                    return ['customer', 'team'];
                }
            },
            remindThemToPay() {
                return this.workflowStepForm.settings.template == 'remind them to pay';
            },
            requestAReview() {
                return this.workflowStepForm.settings.template == 'request a review';
            },
            sendToCustomer() {
                return this.workflowStepForm.settings.recipient == 'customer';
            },
            sendToTeam() {
                return this.workflowStepForm.settings.recipient == 'team';
            },
            sendWhatsapp() {
                return this.workflowStepForm.settings.action == 'whatsapp';
            },
            sendEmail() {
                return this.workflowStepForm.settings.action == 'email';
            },
            sendSms() {
                return this.workflowStepForm.settings.action == 'sms';
            },
            isCreating() {
                return this.workflowStep?.id == null;
            },
            isEditting() {
                return this.workflowStep?.id != null;
            },
            mustSaveChanges() {
                return this.isEditting && this.workflowStepFormHasChanged && !this.isSubmitting;
            },
            mustCreate() {
                return this.isCreating && this.workflowStepFormHasChanged && !this.isSubmitting;
            },
            workflowStepFormHasChanged() {
                var a = cloneDeep(this.workflowStepForm);
                var b = cloneDeep(this.originalWorkflowStepForm);
                return !isEqual(a, b);
            },
        },
        methods: {
            setFormFields() {

                if(this.isEditting) {

                    this.workflowStepForm = {
                        settings: this.workflowStep.settings
                    };

                    if(this.workflowStepForm.settings.mobileNumbers) {
                        this.workflowStepForm.settings.mobileNumbers = this.workflowStepForm.settings.mobileNumbers.map((mobileNumber) => mobileNumber.international);
                    }

                    // Capture the original form before editing
                    this.originalWorkflowStepForm = cloneDeep(this.workflowStepForm);

                }else{

                    this.workflowStepForm = {
                        settings: {
                            notes : '',
                            email : '',
                            template : '',
                            reviewLink : '',
                            mobileNumbers : [],
                            action : 'whatsapp',
                            recipient : 'customer',

                            //  request a review (completed, paid)
                            useReviewLink: false,

                            //  remind them to pay (pending payment)
                            addDelay: false,
                            delayTimeValue: '1',
                            delayTimeUnit: 'hour',

                            autoCancel: false,
                            cancelTimeValue: '6',
                            cancelTimeUnit: 'hour',
                        }
                    };

                }

            },
            reset() {
                if(this.isCreating) {
                    this.$emit('onDeleted', this.index);
                }else{
                    this.workflowStepForm = cloneDeep(this.originalWorkflowStepForm);
                }
            },
            autoSelectExistingOptions() {
                // Check and reset 'action' only if the current value is invalid
                if (!this.actions.includes(this.workflowStepForm.settings.action)) {
                    if (this.actions.length > 0) {
                        this.workflowStepForm.settings.action = this.actions[0];
                    } else {
                        this.workflowStepForm.settings.action = null; // Optional: reset to null if no valid options
                    }
                }

                // Check and reset 'recipient' only if the current value is invalid
                if (!this.recipients.includes(this.workflowStepForm.settings.recipient)) {
                    if (this.recipients.length > 0) {
                        this.workflowStepForm.settings.recipient = this.recipients[0];
                    } else {
                        this.workflowStepForm.settings.recipient = null; // Optional: reset to null
                    }
                }

                // Check and reset 'template' only if the current value is invalid
                if (!this.templates.includes(this.workflowStepForm.settings.template)) {
                    if (this.templates.length > 0) {
                        this.workflowStepForm.settings.template = this.templates[0];
                    } else {
                        this.workflowStepForm.settings.template = null; // Optional: reset to null
                    }
                }
            },
            parseForm() {
                var data = cloneDeep(this.workflowStepForm);
                data['return'] = true;

                if(this.isCreating) {
                    data['workflow_id'] = this.workflow.id;
                }

                return data;
            },
            createMobileNumber(typedMobileNumber, resetForm, hideModal) {
                this.workflowStepForm.settings.mobileNumbers.push(typedMobileNumber);
                hideModal();
                resetForm();
            },
            updateMobileNumber(typedMobileNumber, mobileNumberIndex, resetForm, hideModal) {
                this.workflowStepForm.settings.mobileNumbers[mobileNumberIndex] = typedMobileNumber;
                hideModal();
                resetForm();
            },
            deleteMobileNumber(mobileNumberIndex, resetForm, hideModal) {
                this.workflowStepForm.settings.mobileNumbers.splice(mobileNumberIndex, 1);
                hideModal();
                resetForm();
            },
            async createWorkflowStep() {
                try {

                    this.hideFormErrors();

                    // Start loader
                    this.isSubmitting = true;

                    const response = await postApi(useApiState().apiHome._links['createWorkflowStep'], this.parseForm());

                    if(response.status === 200) {
                        if(response.data.created) {
                            this.$emit('onCreated', response.data.workflowStep, this.index);
                            this.originalWorkflowStepForm = cloneDeep(this.workflowStepForm);
                        } else {
                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);
                        }
                    }

                } catch (error) {

                    this.setServerFormErrors(error);

                } finally {

                    // Stop loader
                    this.isSubmitting = false;

                }
            },
            async updateWorkflowStep() {
                try {

                    // Start loader
                    this.isSubmitting = true;

                    const response = await putApi(this.workflowStep._links.updateWorkflowStep, this.parseForm());

                    if(response.status === 200) {
                        if(response.data.updated) {
                            // Workflow step updated
                        } else {
                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);
                        }

                        this.originalWorkflowStepForm = cloneDeep(this.workflowStepForm);
                    }

                } catch (error) {

                    this.setServerFormErrors(error);

                } finally {

                    // Stop loader
                    this.isSubmitting = false;

                }
            },
            deleteWorkflowStep() {

                if(this.isCreating) {

                    this.$emit('onDeleted', this.index);

                    useWorkflowState().uncreatedWorkflowSteps.splice(
                        useWorkflowState().uncreatedWorkflowSteps.indexOf(this.index), 1
                    );

                    return;
                }

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.workflowStep._links.deleteWorkflowStep).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.$emit('onDeleted', this.index);

                            useWorkflowState().unsavedWorkflowSteps.splice(
                                useWorkflowState().unsavedWorkflowSteps.indexOf(this.index), 1
                            );

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
        },
        beforeUnmount() {
            this.workflowState.removeResetableWorkflowStep();
            useWorkflowState().removeUncreatedWorkflowStep(this.createWorkflowStep);
        },
        created() {
            this.setFormFields();
            if(this.mustCreate) useWorkflowState().addUncreatedWorkflowStep(this.createWorkflowStep);
            useWorkflowState().addResetableWorkflowStep(this.reset);
        }
    };

</script>
