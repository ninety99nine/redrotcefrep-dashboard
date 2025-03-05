<template>

    <div class="min-h-screen flex flex-col items-center pt-20 pb-40">

        <div class="w-full max-w-lg">

            <!-- Store Logo -->
            <StoreLogo :showButton="false" class="flex justify-center mb-4"></StoreLogo>

            <!-- Heading -->
            <h2 class="text-2xl font-semibold text-center mb-2">Unlock More Possibilities</h2>

            <!-- Instruction -->
            <p class="text-gray-500 text-center mb-6">Enhance your store’s functionality with optional upgrades</p>

        </div>

        <div class="w-full max-w-lg">

            <div class="mb-4">

                <!-- Additional Features (Loading Placeholder) -->
                <div v-if="isLoading" class="space-y-2">

                    <div v-for="(_, index) in [1,2,3]" :key="index" class="border shadow-sm rounded-lg p-4 bg-gray-50">
                        <div class="flex justify-between">
                            <div>
                                <div class="w-full flex items-center space-x-2">
                                    <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                                    <LineSkeleton width="w-40" :shine="true"></LineSkeleton>
                                </div>
                            </div>
                            <div>
                                <LineSkeleton width="w-8" :shine="true"></LineSkeleton>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Additional Features -->
                <div v-else class="space-y-3 mb-4">

                    <!-- Add Delivery option -->
                    <div class="bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                        <div class="flex justify-between space-x-4 items-center">

                            <div class="flex items-center space-x-2">

                                <!-- Icon -->
                                <svg class="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>

                                <!-- Name -->
                                <p class="text-sm">
                                    Add Delivery option
                                </p>

                            </div>

                            <!-- Add Delivery Option Toogle Switch -->
                            <ToogleSwitch
                                size="md"
                                v-model="additionalFeatures.delivery.active">
                            </ToogleSwitch>

                        </div>

                        <!-- Delivery Settings -->
                        <div
                            class="w-full space-y-4 mt-4"
                            v-if="additionalFeatures.delivery.active">

                            <MoneyInput
                                label="Delivery fee"
                                :errorText="getFormError('flatFeeRate')"
                                v-model="additionalFeatures.delivery.flatFeeRate"
                                description="You can set more detailed settings in Settings » Delivery Methods">
                            </MoneyInput>

                        </div>

                    </div>

                    <!-- Add Self Pick-up option -->
                    <div class="bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                        <div class="flex justify-between space-x-4 items-center">

                            <div class="flex items-center space-x-2">

                                <!-- Icon -->
                                <svg class="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>

                                <!-- Name -->
                                <p class="text-sm">
                                    Add Self Pick-up option
                                </p>

                            </div>

                            <!-- Add Self Pick-up Option Toogle Switch -->
                            <ToogleSwitch
                                size="md"
                                v-model="additionalFeatures.selfPickUpDelivery.active">
                            </ToogleSwitch>

                        </div>

                    </div>

                    <!-- Loyalty & Rewards -->
                    <div class="bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                        <div class="flex justify-between space-x-4 items-center">

                            <div class="flex space-x-2">

                                <!-- Icon -->
                                <svg class="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>

                                <div class="space-y-1">

                                    <!-- Name -->
                                    <p class="text-sm">
                                        Loyalty & Rewards
                                    </p>

                                    <!-- Description -->
                                    <p class="text-xs text-gray-400">
                                        Reward your customers with store credits calculated as a percentage of their total purchase amount
                                    </p>

                                </div>

                            </div>

                            <!-- Loyalty & Rewards Toogle Switch -->
                            <ToogleSwitch
                                size="md"
                                v-model="additionalFeatures.rewards.active">
                            </ToogleSwitch>

                        </div>

                        <!-- Delivery Settings -->
                        <div
                            class="w-full space-y-4 mt-4"
                            v-if="additionalFeatures.rewards.active">

                            <PercentageInput
                                placeholder="10"
                                label="Rewards (%)"
                                :errorText="getFormError('rewardPercentageRate')"
                                v-model="additionalFeatures.rewards.percentageRate">
                            </PercentageInput>

                        </div>

                    </div>

                    <!-- WhatsApp Bot notifications -->
                    <div class="bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                        <div class="flex justify-between space-x-4 items-center">

                            <div class="flex space-x-2">

                                <!-- Icon -->
                                <svg class="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                </svg>

                                <div class="space-y-1">

                                    <!-- Name -->
                                    <p class="text-sm">
                                        Automated WhatsApp notifications
                                    </p>

                                    <!-- Description -->
                                    <p class="text-xs text-gray-400">
                                        {{ appName }} will automatically send you Whatsapp notifications when you receive orders
                                    </p>

                                </div>

                            </div>

                            <!-- Automated WhatsApp Notifications Toogle Switch -->
                            <ToogleSwitch
                                size="md"
                                v-model="additionalFeatures.automatedWhatsappNotifications.active">
                            </ToogleSwitch>

                        </div>

                        <!-- Automated WhatsApp Notifications Settings -->
                        <div
                            class="w-full space-y-4 mt-4 border-t border-dashed pt-4"
                            v-if="additionalFeatures.automatedWhatsappNotifications.active">

                            <!-- Bulk Mobile Number Input -->
                            <BulkMobileNumberInput
                                :isSubmitting="false"
                                :showWhatsappIcon="true"
                                :createMobileNumber="createMobileNumber"
                                :updateMobileNumber="updateMobileNumber"
                                :deleteMobileNumber="deleteMobileNumber"
                                :mobileNumbers="additionalFeatures.automatedWhatsappNotifications.mobileNumbers">
                            </BulkMobileNumberInput>

                        </div>

                    </div>

                    <!-- Available on USSD -->
                    <div class="bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                        <div class="flex justify-between space-x-4 items-center">

                            <div class="flex space-x-2">

                                <!-- Icon -->
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>

                                <div class="space-y-1">

                                    <!-- Name -->
                                    <p class="text-sm">
                                        Available on USSD
                                    </p>

                                    <!-- Description -->
                                    <p class="text-xs text-gray-400">
                                        Your store will be available on {{ appName }} supported Mobile Networks
                                    </p>

                                </div>

                            </div>

                            <!-- Available On USSD Toogle Switch -->
                            <ToogleSwitch
                                size="md"
                                v-model="additionalFeatures.ussd.active">
                            </ToogleSwitch>

                        </div>

                        <!-- USSD Settings -->
                        <div
                            class="w-full space-y-4 mt-4"
                            v-if="additionalFeatures.ussd.active">

                            <!-- Mobile Number Input -->
                            <MobileNumberInput
                                label="Mobile Number"
                                v-model="additionalFeatures.ussd.mobileNumber"
                                :errorText="getFormError('ussdMobileNumber')"
                                :description="ussdMobileNumberWithoutExtension ? `Customers dial *250*${ussdMobileNumberWithoutExtension}# to access your store` : 'Enter your mobile number to create your shortcode'">
                            </MobileNumberInput>

                            <!-- Call To Action Input -->
                            <TextInput
                                maxlength="20"
                                label="Call To Action"
                                placeholder="Order pizza"
                                :errorText="getFormError('callToAction')"
                                v-model="additionalFeatures.ussd.callToAction"
                                description="The call to action to start the shopping experience on USSD">
                            </TextInput>

                        </div>

                    </div>

                    <div class="bg-white p-4 shadow-sm rounded-xl">

                        <p class="text-sm font-bold mb-4">What Else Can I Do?</p>

                        <div class="space-y-2">

                            <div
                                :key="index"
                                v-for="(option, index) in options"
                                class="flex items-center space-x-2">

                                <!-- Icon -->
                                <svg class="w-4 h-4 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                <!-- Name -->
                                <p class="text-xs">
                                    {{ option.name }}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <!-- Form Error Messages -->
            <FormErrorMessages class="mb-4"></FormErrorMessages>

            <div class="flex justify-end">

                <transition name="fade-1" mode="out-in">

                    <!-- Continue -->
                    <Button
                        size="md"
                        class="w-full"
                        type="primary"
                        :loading="isSubmitting"
                        :disabled="isSubmitting"
                        :action="addAdvancedFeatures"
                        v-if="additionalFeaturesHaveChanged">
                        <span>Continue</span>
                    </Button>

                    <!-- Skip -->
                    <Button
                        v-else
                        size="md"
                        class="w-40"
                        type="light"
                        icon="short-right-arrow"
                        :action="navigateToShare">
                        <span>Skip</span>
                    </Button>

                </transition>

            </div>

        </div>

    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import settings from '@Js/settings.js';
    import cloneDeep from 'lodash/cloneDeep';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import { useApiState } from '@Stores/api-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import { parsePhoneNumberFromString } from 'libphonenumber-js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PercentageInput from '@Partials/inputs/PercentageInput.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import { getApi, postApi, putApi } from '@Repositories/api-repository.js';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import BulkMobileNumberInput from '@Partials/inputs/BulkMobileNumberInput.vue';

    export default {
        mixins: [FormMixin],
        components: {
            Button, TextInput, StoreLogo, MoneyInput, LineSkeleton, PercentageInput,
            ToogleSwitch, MobileNumberInput, FormErrorMessages, BulkMobileNumberInput
        },
        data() {
            return {
                workflows: [],
                isLoading: false,
                deliveryMethods: [],
                isSubmitting: false,
                additionalFeatures: {
                    delivery: {
                        active: false,
                        name: 'Delivery',
                        flatFeeRate: '0.00',
                    },
                    selfPickUpDelivery: {
                        active: false,
                        name: 'Self-Pickup',
                    },
                    rewards: {
                        active: false,
                        percentageRate: '0'
                    },
                    automatedWhatsappNotifications: {
                        active: false,
                        mobileNumbers: [],
                        name: 'Whatsapp a waiting order to the team',
                    },
                    ussd: {
                        active: false,
                        callToAction: '',
                        mobileNumber: ''
                    },
                },
                workflow: null,
                delivery: null,
                selfPickUpDelivery: null,
                originalAdditionalFeatures: null,
                options: [
                    {
                        name: 'Accept credit cards'
                    },
                    {
                        name: 'Buy or connect existing domains'
                    },
                    {
                        name: 'Receive order notifications using SMS'
                    },
                ],
                apiState: useApiState(),
                appName: settings.appName,
                storeState: useStoreState(),
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            ussdMobileNumberWithoutExtension() {
                if(this.additionalFeatures.ussd.mobileNumber) {
                    const phoneNumber = parsePhoneNumberFromString(this.additionalFeatures.ussd.mobileNumber);
                    let nationalNumber =  phoneNumber.formatNational();
                    return nationalNumber.replace(/\s+/g, '');
                }
                return '';
            },
            additionalFeaturesHaveChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.additionalFeatures);
                var b = cloneDeep(this.originalAdditionalFeatures);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
        },
        methods: {
            async setup() {

                this.isLoading = true;

                try {

                    // Fire all async functions simultaneously
                    await Promise.all([this.showWorkflows(), this.showDeliveryMethods()]);

                    // Set rewards
                    this.additionalFeatures.rewards.active = this.store.offerRewards;

                    if (this.store.offerRewards) {
                        this.additionalFeatures.rewards.percentageRate = this.store.rewardPercentageRate.value.toString();
                    }

                    // Set Automated Whatsapp Notifications
                    if (this.workflow) {
                        const workflowSteps = this.workflow._relationships.workflowSteps;

                        if(workflowSteps.length) {
                            const workflowStep = workflowSteps[0];
                            this.additionalFeatures.automatedWhatsappNotifications.mobileNumbers = workflowStep.settings.mobileNumbers.map((mobileNumber) => mobileNumber.international);
                        }
                    }else if(this.store.whatsappMobileNumber) {
                        this.additionalFeatures.automatedWhatsappNotifications.mobileNumbers.push(this.store.whatsappMobileNumber.international);
                    }

                    // Set USSD
                    if (this.store.ussdMobileNumber) {
                        this.additionalFeatures.ussd.active = true;
                        this.additionalFeatures.ussd.callToAction = this.store.callToAction;
                        this.additionalFeatures.ussd.mobileNumber = this.store.ussdMobileNumber.international;
                    }

                    this.originalAdditionalFeatures = cloneDeep(this.additionalFeatures);

                } catch (error) {

                    console.error("Error in setup():", error);

                } finally {

                    this.isLoading = false;

                }
            },
            createMobileNumber(typedMobileNumber, resetForm, hideModal) {
                this.additionalFeatures.automatedWhatsappNotifications.mobileNumbers.push(typedMobileNumber);
                hideModal();
                resetForm();
            },
            updateMobileNumber(typedMobileNumber, mobileNumberIndex, resetForm, hideModal) {
                this.additionalFeatures.automatedWhatsappNotifications.mobileNumbers[mobileNumberIndex] = typedMobileNumber;
                hideModal();
                resetForm();
            },
            deleteMobileNumber(mobileNumberIndex, resetForm, hideModal) {
                this.additionalFeatures.automatedWhatsappNotifications.mobileNumbers.splice(mobileNumberIndex, 1);
                hideModal();
                resetForm();
            },
            async addAdvancedFeatures() {
                this.isSubmitting = true;

                try {

                    const promises = [];

                    if (this.delivery) {
                        promises.push(this.updateDeliveryOption());
                    } else if (this.additionalFeatures.delivery.active) {
                        promises.push(this.addDeliveryOption());
                    }

                    if (this.selfPickUpDelivery) {
                        promises.push(this.updateSelfPickUpOption());
                    } else if (this.additionalFeatures.selfPickUpDelivery.active) {
                        promises.push(this.addSelfPickUpOption());
                    }

                    if (this.workflow) {
                        promises.push(this.updateAutomatedWhatsAppNotifications());
                    } else if (this.additionalFeatures.automatedWhatsappNotifications.active) {
                        promises.push(this.addAutomatedWhatsAppNotifications());
                    }

                    promises.push(this.loyaltyAndRewards());
                    promises.push(this.availableOnUSSD());

                    await Promise.all(promises);

                } catch (error) {

                    console.error("Error in addAdvancedFeatures:", error);

                } finally {

                    this.isSubmitting = false;
                    this.originalAdditionalFeatures = cloneDeep(this.additionalFeatures);

                    this.navigateToShare();

                }
            },
            async addDeliveryOption() {

                try {

                    const data = {
                        'active': true,
                        'chargeFee': true,
                        'feeType': 'flat fee',
                        'storeId': this.store.id,
                        'description': 'We deliver to you',
                        'name': this.additionalFeatures.delivery.name,
                        'flatFeeRate': this.additionalFeatures.delivery.flatFeeRate
                    };

                    const response = await postApi(useApiState().apiHome._links['createDeliveryMethod'], data);

                    if(response.status == 200 && response.data['created']) {

                        this.delivery = response.data.deliveryMethod;

                    }else{

                        this.setFormError('general', response.data.message);

                    }

                } catch (errorException) {

                    this.setServerFormErrors(errorException);

                }

            },
            async updateDeliveryOption() {

                try {

                    const data = {
                        'chargeFee': true,
                        'feeType': 'flat fee',
                        'description': 'We deliver to you',
                        'name': this.additionalFeatures.delivery.name,
                        'active': this.additionalFeatures.delivery.active,
                        'flatFeeRate': this.additionalFeatures.delivery.flatFeeRate
                    };

                    const response = await putApi(this.delivery._links['updateDeliveryMethod'], data);

                    if(response.status == 200 && response.data['updated']) {

                        this.delivery = response.data.deliveryMethod;

                    }else{

                        this.setFormError('general', response.data.message);

                    }

                } catch (errorException) {

                    this.setServerFormErrors(errorException);

                }

            },
            async addSelfPickUpOption() {

                try {

                    const data = {
                        'active': true,
                        'storeId': this.store.id,
                        'description': 'You collect the order yourself',
                        'name': this.additionalFeatures.selfPickUpDelivery.name
                    };

                    const response = await postApi(useApiState().apiHome._links['createDeliveryMethod'], data);

                    if(response.status == 200 && response.data['created']) {

                        this.selfPickUpDelivery = response.data.deliveryMethod;

                    }else{

                        this.setFormError('general', response.data.message);

                    }

                } catch (errorException) {

                    this.setServerFormErrors(errorException);

                }

            },
            async updateSelfPickUpOption() {

                try {

                    const data = {
                        'description': 'You collect the order yourself',
                        'name': this.additionalFeatures.selfPickUpDelivery.name,
                        'active': this.additionalFeatures.selfPickUpDelivery.active,
                    };

                    const response = await putApi(this.selfPickUpDelivery._links['updateDeliveryMethod'], data);

                    if(response.status == 200 && response.data['updated']) {

                        this.selfPickUpDelivery = response.data.deliveryMethod;

                    }else{

                        this.setFormError('general', response.data.message);

                    }

                } catch (errorException) {

                    this.setServerFormErrors(errorException);

                }

            },
            async loyaltyAndRewards() {

                try {

                    const data = {
                        'return': '1',
                        'offerRewards': this.additionalFeatures.rewards.active,
                        'rewardPercentageRate': this.additionalFeatures.rewards.percentageRate
                    };

                    const response = await putApi(this.store._links.updateStore, data);

                    if(response.status == 200 && response.data['updated']) {

                        const store = response.data.store;

                    }else{

                        this.setFormError('general', response.data.message);

                    }

                } catch (errorException) {

                    this.setServerFormErrors(errorException);

                }

            },
            async addAutomatedWhatsAppNotifications() {

                try {

                    let data = {
                        'return': '1',
                        'active': '1',
                        'resource': 'order',
                        'trigger': 'waiting',
                        'storeId': this.store.id,
                        'name': this.additionalFeatures.automatedWhatsappNotifications.name
                    };

                    let response = await postApi(useApiState().apiHome._links['createWorkflow'], data);

                    if (response.status == 200 && response.data['created']) {

                        this.workflow = response.data.workflow;

                        let workflowStepData = {
                            return: true,
                            settings: {
                                recipient: "team",
                                action: "whatsapp",
                                mobileNumbers: this.additionalFeatures.automatedWhatsappNotifications.mobileNumbers
                            },
                            workflowId: this.workflow.id
                        };

                        response = await postApi(useApiState().apiHome._links['createWorkflowStep'], workflowStepData);

                        if (response.status == 200 && response.data['created']) {

                            const workflowStep = response.data.workflow;

                        } else {

                            this.setFormError('general', response.data.message);

                        }

                    } else {

                        this.setFormError('general', response.data.message);

                    }

                } catch (errorException) {

                    this.setServerFormErrors(errorException);

                }
            },
            async updateAutomatedWhatsAppNotifications() {

                try {

                    let data = {
                        'return': '1',
                        'resource': 'order',
                        'trigger': 'waiting',
                        'name': this.additionalFeatures.automatedWhatsappNotifications.name,
                        'active': this.additionalFeatures.automatedWhatsappNotifications.active,
                    };

                    const response = await putApi(this.workflow._links['updateWorkflow'], data);

                    if (response.status == 200 && response.data['updated']) {

                        this.workflow = response.data.workflow;

                    } else {

                        this.setFormError('general', response.data.message);

                    }

                } catch (errorException) {

                    this.setServerFormErrors(errorException);

                }
            },
            async availableOnUSSD() {

                try {

                    var data = {
                        'return': '1'
                    };

                    if(this.additionalFeatures.ussd.active) {

                        data = {
                            ...data,
                            'callToAction': this.additionalFeatures.ussd.callToAction,
                            'ussdMobileNumber': this.additionalFeatures.ussd.mobileNumber
                        }

                    }else{

                        data = {
                            ...data,
                            'callToAction': null,
                            'ussdMobileNumber': null
                        }

                    }

                    const response = await putApi(this.store._links.updateStore, data);

                    if(response.status == 200 && response.data['updated']) {

                        const store = response.data.store;

                    }else{

                        this.setFormError('general', response.data.message);

                    }

                } catch (errorException) {

                    this.setServerFormErrors(errorException);

                }

            },
            async showWorkflows() {

                const params = {
                    '_relationships': 'workflowSteps'
                }

                return await getApi(this.store._links['showStoreWorkflows'], params).then(response => {

                    if(response.status == 200) {

                        this.workflows = response.data.data;
                        this.workflow = this.workflows.find((workflow) => workflow.name == this.additionalFeatures.automatedWhatsappNotifications.name);

                        if(this.workflow) {
                            this.additionalFeatures.automatedWhatsappNotifications.active = this.workflow.active;
                        }

                    }

                }).catch(errorException => {

                    this.setServerFormErrors(errorException);

                });

            },
            async showDeliveryMethods() {

                return await getApi(this.store._links['showStoreDeliveryMethods']).then(response => {

                    if(response.status == 200) {

                        this.deliveryMethods = response.data.data;
                        this.delivery = this.deliveryMethods.find((deliveryMethod) => deliveryMethod.name == this.additionalFeatures.delivery.name);
                        this.selfPickUpDelivery = this.deliveryMethods.find((deliveryMethod) => deliveryMethod.name == this.additionalFeatures.selfPickUpDelivery.name);

                        if(this.delivery) {
                            this.additionalFeatures.delivery.active = this.delivery.active;
                            this.additionalFeatures.delivery.flatFeeRate = this.delivery.flatFeeRate.amountWithoutCurrency;
                        }

                        if(this.selfPickUpDelivery) {
                            this.additionalFeatures.selfPickUpDelivery.active = this.selfPickUpDelivery.active;
                        }

                    }

                }).catch(errorException => {

                    this.setServerFormErrors(errorException);

                });

            },
            navigateToShare() {
                this.$router.push({
                    name: 'share',
                    params: { 'store_href': this.store._links.showStore }
                });
            }
        },
        beforeRouteLeave(to, from, next) {

            if (this.isSubmitting || this.additionalFeaturesHaveChanged) {

                const answer = window.confirm("You have unsaved changes. Are you sure you want to leave?");

                if (!answer) {
                    return next(false);
                }

            }

            next();
        },
        created() {
            this.setup();
        }
    };

</script>
