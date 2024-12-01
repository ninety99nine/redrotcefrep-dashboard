<template>

    <div>

        <div class="max-w-lg mx-auto pt-20 mb-8 px-4">

            <!-- Quick Start Guide (Heading) -->
            <h1 class="text-2xl font-bold">Create Your Store</h1>

            <!-- Quick Start Guide (Instructions) -->
            <p class="text-sm text-gray-500">
                <span class="mr-2">It only takes a minute to create one</span>
                <span class="text-lg">🙌</span>
            </p>

        </div>

        <div class="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow p-6 mb-8">

            <!-- Profile Form -->
            <form action="#" method="POST">

                <div class="space-y-4">

                    <!-- General Error Info Alert -->
                    <Alert v-if="getFormError('general')" type="warning">
                        {{ getFormError('general') }}
                    </Alert>

                    <!-- Name Input -->
                    <TextInput v-model="form.name"
                        label="Name"
                        @keyup="syncWithAlias"
                        placeholder="Baby Cakes 🧁"
                        autocomplete="organization"
                        :errorText="getFormError('name')"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="The name of your store e.g Baby Cakes 🧁">
                    </TextInput>

                    <!-- Description Textarea -->
                    <TextareaInput
                        :rows="2"
                        label="Description"
                        v-model="form.description"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('description')"
                        placeholder="The sweetest cakes in the world 🍰"
                        labelPopoverDescription="A short and sweet description of your store e.g The sweetest cakes in the world 🍰">
                    </TextareaInput>

                    <!-- Country Select Input -->
                    <CountrySelectInput
                        width="w-full"
                        label="Country"
                        v-model="form.country"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="The country that your store is operating from">
                    </CountrySelectInput>

                    <!-- Currency Select Input -->
                    <CurrencySelectInput
                        width="w-full"
                        label="Currency"
                        v-model="form.currency"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="The currency accepted by your store">
                    </CurrencySelectInput>

                    <!-- Website Link Input -->
                    <TextInput
                        v-model="form.alias"
                        label="Store Website"
                        placeholder="Baby Cakes 🧁"
                        @keyup="() => formatAlias(true)"
                        :errorText="getFormError('alias')"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="The website link that will be used by customers to visit your store, shop and place orders">
                        <template #prepend>
                            <div class="flex items-center space-x-1 py-1.5 pl-2 pr-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap">
                                <svg class="w-5 h-5 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                                </svg>
                                <span>perfectorder.me</span>
                                <span class="text-gray-400"> / </span>
                            </div>
                        </template>
                    </TextInput>

                    <!-- Whatsapp Number Input -->
                    <MobileNumberInput
                        label="WhatsApp Number"
                        labelPopoverTitle="What Is This?"
                        v-model="form.whatsappMobileNumber"
                        :errorText="getFormError('whatsappMobileNumber')"
                        labelPopoverDescription="The mobile number that will be used to send orders via whatsapp when customers checkout on your store website">

                        <template #prepend>
                            <svg class="w-6 h-6 mt-1" fill="#44c152" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve">
                                <g id="XMLID_468_">
                                    <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                    <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                                </g>
                            </svg>
                        </template>

                    </MobileNumberInput>

                    <!-- USSD Number Input -->
                    <MobileNumberInput
                        label="USSD Number"
                        v-model="form.ussdMobileNumber"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('ussdMobileNumber')"
                        labelPopoverDescription="The mobile number that will be used by customers to dial your store, shop and place orders">
                    </MobileNumberInput>

                </div>

                <div class="px-20 mt-8">

                    <!-- Create Store Button -->
                    <PrimaryButton :action="createStore" :loading="isSubmitting" class="w-full">
                        Create Store
                    </PrimaryButton>

                </div>

            </form>

        </div>

        <div class="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow p-6">


            <div class="space-y-2 border-b mb-2 pb-2">

                <h1 class="text-2xl font-bold">{{ form.name == '' ? 'My Store' : form.name }}</h1>

                <p class="text-sm text-gray-500">
                    <span class="mr-1">Make your store available everywhere</span>
                    <span class="text-lg">😍</span>
                </p>

            </div>

            <div class="space-y-2 border-b mb-2 py-2">

                <div class="flex space-x-2">
                    <svg class="w-8 h-8 mt-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <div class="text-sm">
                        <div class="font-bold">Shortcode: </div>
                        <div class="text-gray-500">Orders via your own shortcode on the <a href="https://www.orange.co.bw/" target="_blank" class="text-orange-500 font-bold underline decoration-dashed underline-offset-4">Orange Network</a></div>
                        <div class="font-bold text-xl mt-2">*250*{{ nationalMobileNumber }}#</div>
                    </div>
                </div>

            </div>

            <div class="space-y-2 border-b mb-2 py-2">

                <div class="flex space-x-2">
                    <svg class="w-8 h-8 mt-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                    </svg>
                    <div class="text-sm">
                        <div class="font-bold">Website: </div>
                        <div class="text-gray-500">Orders via your own website</div>
                        <div class="font-bold mt-2">https://perfectorder.shop/{{ form.alias }}</div>
                    </div>
                </div>

            </div>

            <div class="flex space-x-2">
                <img src="/images/qr-code-icon.png" class="w-6 h-6 mx-1 mt-2">
                <div class="text-sm">
                    <div class="font-bold">QR Code: </div>
                    <div class="text-gray-500">Customers scan to shop and place orders</div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    import { initFlowbite } from "flowbite";
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import { postApi } from '@Repositories/api-repository.js';
    import { parsePhoneNumberFromString } from 'libphonenumber-js';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import { useNotificationState } from '@Stores/notification-store.js';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import CountrySelectInput from '@Partials/inputs/CountrySelectInput.vue';
    import CurrencySelectInput from '@Partials/inputs/CurrencySelectInput.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            Alert, TextInput, TextareaInput, PrimaryButton, MobileNumberInput, CountrySelectInput, CurrencySelectInput
        },
        data() {
            return {
                form: {
                    name: '',
                    alias: '',
                    country: 'BW',
                    currency: 'BWP',
                    description: '',
                    ussdMobileNumber: '',
                    whatsappMobileNumber: '',
                },
                isSubmitting: false,
                aliasModified: false,
                apiState: useApiState(),
                authState: useAuthState(),
                notificationState: useNotificationState(),
            }
        },
        computed: {
            nationalMobileNumber() {
                if(this.form.ussdMobileNumber) {
                    const phoneNumber = parsePhoneNumberFromString(this.form.ussdMobileNumber);
                    let nationalNumber =  phoneNumber.formatNational();
                    return nationalNumber.replace(/\s+/g, '');
                }
                return '';
            }
        },
        methods: {
            syncWithAlias() {
                if(this.aliasModified == false) {
                    this.form.alias = this.form.name;
                    this.formatAlias();
                }
            },
            formatAlias(aliasModified = false) {
                if(this.form.alias.length) {
                    this.form.alias = this.form.alias.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').trim().toLowerCase();
                    this.aliasModified = aliasModified;

                }else{
                    this.aliasModified = false;
                }
            },
            createStore() {

                /**
                 *  Note: the hideFormErrors() method is part of the FormMixin methods
                 */
                this.hideFormErrors();

                /**
                 *  Note: the setFormError() method is part of the FormMixin methods
                 */
                if(this.form.name.trim() == '') {

                    this.setFormError('name', 'Enter store name');

                }else {

                    let data = {
                        name: this.form.name,
                        country: this.form.country,
                        currency: this.form.currency,
                        description: this.form.description,
                        ussdMobileNumber: this.form.ussdMobileNumber,
                        whatsappMobileNumber: this.form.whatsappMobileNumber
                    }

                    if(typeof this.form.description === 'string' && this.form.description.trim() == '') {
                        data['description'] = null;
                    }

                    if(typeof this.form.alias === 'string' && this.form.alias.trim() == '') {
                        data['alias'] = null;
                    }

                    //  Start loader
                    this.isSubmitting = true;

                    postApi(useApiState().apiHome._links['createStore'], data).then(response => {

                        if(response.status == 200) {

                            //  Stop loader
                            this.isSubmitting = false;

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Store created!');

                            //  Navigate to dashboard
                            this.$router.replace({ name: 'dashboard', query: { createdStore: true } });

                        }

                    }).catch(errorException => {

                        this.isSubmitting = false;

                        /**
                         *  Note: the setServerFormErrors() method is part of the FormMixin methods
                         */
                        this.setServerFormErrors(errorException);

                    });

                }
            }
        },
        mounted() {

            /**
             *  Flowbite javascript will not work unless we deliberately
             *  Initialize Flowbite on mount of the Vue component.
             *
             *  Reference: https://stackoverflow.com/questions/76043935/flowbite-is-not-working-with-inertia-laravel-app
             */
            initFlowbite();

        },
        created() {
            this.form.ussdMobileNumber = this.authState.user.mobileNumber.international;
            this.form.whatsappMobileNumber = this.authState.user.mobileNumber.international;
        }
    };

</script>
