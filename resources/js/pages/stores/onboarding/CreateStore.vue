<template>

    <div class="min-h-screen flex flex-col items-center justify-center">

        <div class="w-full max-w-lg">

            <!-- Heading -->
            <h2 class="text-2xl font-semibold text-center">Start Your Store</h2>

            <!-- Instruction -->
            <p class="text-gray-500 text-center mb-6">Tell us a little about your store to get started</p>

        </div>

        <!-- Card -->
        <div class="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">

            <!-- Store Logo Upload -->
            <div class="flex flex-col items-center mb-6">

                <div
                    @click="triggerFileUpload"
                    class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all relative group">
                    <img :src="storeLogo ? storeLogo : '/images/logo-black-transparent.png'" alt="Store Logo" class="w-full h-full rounded-full" />

                    <!-- Edit Icon on Hover -->
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg v-if="storeLogo" class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                        <svg v-else class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>

                </div>

                <input
                    type="file"
                    class="hidden"
                    ref="fileInput"
                    @change="handleFileUpload"
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                />

                <button
                    @click="triggerFileUpload"
                    class="flex items-center space-x-2 mt-4 text-xs border rounded-lg px-4 py-2 hover:bg-gray-100 active:scale-95 transition-all">
                        <svg v-if="storeLogo" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                        <svg v-else class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>{{ storeLogo ? 'Add' : 'Change' }} store logo</span>
                </button>

            </div>

            <!-- Store Form -->
            <form @submit.prevent="createStore">

                <div class="space-y-4 mb-4">

                    <!-- Name Input -->
                    <TextInput
                        label="Name"
                        v-model="form.name"
                        :showAsterisk="true"
                        @keyup="syncWithAlias"
                        placeholder="Baby Cakes 🧁"
                        autocomplete="organization"
                        :errorText="getFormError('name')">
                    </TextInput>

                    <!-- Whatsapp Number Input -->
                    <MobileNumberInput
                        label="WhatsApp Number"
                        v-model="form.whatsappMobileNumber"
                        :errorText="getFormError('whatsappMobileNumber')"
                        description="Customers will send orders to this number after shopping">

                        <template #prepend>
                            <svg class="w-6 h-6 ml-2" fill="#44c152" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve">
                                <g id="XMLID_468_">
                                    <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                    <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                                </g>
                            </svg>
                        </template>

                    </MobileNumberInput>

                    <!-- Website Link Input -->
                    <TextInput
                        v-model="form.alias"
                        label="Store Link"
                        placeholder="baby-cakes"
                        @keyup="() => formatAlias(true)"
                        :errorText="getFormError('alias')"
                        description="Your store’s shopping link. Custom domains can be set later.">
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

                    <!-- Country Select Input -->
                    <CountrySelectInput
                        width="w-full"
                        label="Country"
                        v-model="form.country"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="Your store’s country of operation">
                    </CountrySelectInput>

                    <!-- Currency Select Input -->
                    <CurrencySelectInput
                        width="w-full"
                        label="Currency"
                        v-model="form.currency"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="Your store’s currency">
                    </CurrencySelectInput>

                    <!-- Form Error Messages -->
                    <FormErrorMessages></FormErrorMessages>

                </div>

                <!-- Create Store Button -->
                <Button
                    size="md"
                    class="w-full"
                    type="primary"
                    :action="createStore"
                    :loading="isCreatingStore"
                    :disabled="isCreatingStore">
                    <span>Create Store</span>
                </Button>

            </form>
        </div>

    </div>

  </template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import { useApiState } from '@Stores/api-store.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import { postApi } from '@Repositories/api-repository.js';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import CountrySelectInput from '@Partials/inputs/CountrySelectInput.vue';
    import CurrencySelectInput from '@Partials/inputs/CurrencySelectInput.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';

    export default {
        mixins: [FormMixin],
        components: {
            Button, TextInput, MobileNumberInput, CountrySelectInput, CurrencySelectInput, FormErrorMessages
        },
        data() {
            return {
                storeLogo: null,
                form: {
                    name: '',
                    alias: '',
                    country: 'BW',
                    currency: 'BWP',
                    whatsappMobileNumber: ''
                },
                aliasModified: false,
                isCreatingStore: false,
                apiState: useApiState(),
                authState: useAuthState(),
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
            triggerFileUpload() {
                this.$refs.fileInput.click();
            },
            handleFileUpload(event) {
                const file = event.target.files[0];
                if (file) {
                    this.storeLogo = URL.createObjectURL(file);
                }
            },
            async createStore() {
                if(this.isCreatingStore) return;

                this.hideFormErrors();

                if (!this.form.name?.trim()) {
                    this.setFormError('name', 'Enter store name');
                    return;
                }

                let formData = new FormData();
                formData.append('return', 1);
                formData.append('name', this.form.name);
                formData.append('country', this.form.country);
                formData.append('currency', this.form.currency);
                if (this.form.alias?.trim()) formData.append('alias', this.form.alias.trim());
                if (this.form.whatsappMobileNumber?.trim()) formData.append('whatsappMobileNumber', this.form.whatsappMobileNumber.trim());

                // Attach store logo if available
                if (this.$refs.fileInput.files[0]) {
                    formData.append('store_logo', this.$refs.fileInput.files[0]);
                }

                this.isCreatingStore = true;

                try {

                    const response = await postApi(this.apiState.apiHome._links['createStore'], formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });

                    if (response.status === 200) {

                        this.isCreatingStore = false;
                        this.showSuccessfulNotification('Store created!');

                        this.$router.push({
                            name: 'add-products',
                            params: { 'store_href': response.data.store._links.showStore }
                        });

                    } else {

                        this.setGeneralFormError(response.data.message);
                        this.showUnsuccessfulNotification(response.data.message);

                    }

                } catch (error) {
                    this.isCreatingStore = false;
                    this.setServerFormErrors(error);
                }
            }
        },
        created() {
            if(this.authState.user.mobileNumber) {
                this.form.whatsappMobileNumber = this.authState.user.mobileNumber.international;
            }
        }
    };

</script>
