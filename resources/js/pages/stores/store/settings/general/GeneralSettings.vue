<template>

    <div>
        <div class="bg-white shadow-lg border p-8 rounded-lg mb-4">

            <h1 class="text-lg font-bold">General Settings</h1>

            <!-- Form -->
            <form :class="mustSaveChanges ? 'mt-4' : 'mt-10'" action="#" method="POST">

                <div class="space-y-4">

                    <!-- Form Error Messages -->
                    <FormErrorMessages></FormErrorMessages>

                    <!-- Save Changes Info Alert -->
                    <Alert v-if="mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                        <div class="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            <span>Please save your changes</span>
                        </div>

                        <div class="flex items-center space-x-2">

                            <!-- Undo Button -->
                            <UndoButton :action="resetForm" type="light" size="xs">
                                <span class="ml-1">Undo</span>
                            </UndoButton>

                            <!-- Save Changes Button -->
                            <PrimaryButton :action="updateStore" :loading="isSubmitting" class="w-40">
                                Save Changes
                            </PrimaryButton>

                        </div>

                    </Alert>

                    <!-- Online Toggle Switch -->
                    <ToogleSwitch
                        size="md"
                        v-model="form.online"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('online')"
                        labelPopoverDescription="Turn on so that your store is online (Made available to customers). Turn off so that your store is offline (Not available to customers)">
                        Online
                    </ToogleSwitch>

                    <!-- Offline Message Textarea -->
                    <TextareaInput
                        :rows="2"
                        v-if="!form.online"
                        label="Offline Message"
                        v-model="form.offlineMessage"
                        labelPopoverTitle="What Is This?"
                        placeholder="Closed for the holidays"
                        :errorText="getFormError('offlineMessage')"
                        labelPopoverDescription="The message to show to customers who visit your store while its offline (Not available to customers)">
                    </TextareaInput>

                    <!-- Name Input -->
                    <TextInput
                        label="Name"
                        v-model="form.name"
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

                </div>

            </form>

        </div>

        <div class="bg-white mb-4 p-8 rounded-lg">

            <!-- Form -->
            <form action="#" method="POST">

                <div class="space-y-4">

                    <!-- Website Link Input -->
                    <TextInput
                        v-model="form.alias"
                        label="Store Website"
                        placeholder="Baby Cakes 🧁"
                        @keyup="() => formatAlias(true)"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('alias')"
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

                    <!-- USSD Number Input -->
                    <MobileNumberInput
                        label="USSD Number"
                        v-model="form.ussdMobileNumber"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('ussdMobileNumber')"
                        labelPopoverDescription="The mobile number that will be used by customers to dial your store, shop and place orders">
                    </MobileNumberInput>

                    <!-- Email Input -->
                    <EmailInput
                        label="Email"
                        v-model="form.email"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('email')"
                        :placeholder="'sales@'+(form.alias || 'example')+'.com'"
                        :labelPopoverDescription="'The store email address e.g sales@'+(form.alias || 'example')+'.com'">
                    </EmailInput>

                    <!-- SMS Sender Name Input -->
                    <TextInput
                        maxlength="11"
                        label="SMS Sender Name"
                        placeholder="Baby Cakes"
                        v-model="form.smsSenderName"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('smsSenderName')"
                        labelPopoverDescription="The name given to SMS messages sent to the customer by your store e.g Baby Cakes">
                        <template #prepend>
                            <div class="flex items-center space-x-1 py-1.5 px-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                            </div>
                        </template>
                    </TextInput>

                    <!-- Address Information -->
                    <AddressModal :address="address" :storeId="store.id" @onCreated="setAddress" @onUpdated="setAddress" @onDeleted="setAddress"></AddressModal>

                    <!-- WhatsApp Notifications Information -->
                    <div class="space-y-4 p-4 border rounded-lg shadow-lg">

                        <h1 class="flex items-center font-lg font-bold">
                            <svg class="w-6 h-6 mr-4 flex-shrink-0" fill="#44c152" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve">
                                <g id="XMLID_468_">
                                    <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                    <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                                </g>
                            </svg>
                            <span>WhatsApp Notifications</span>
                        </h1>

                        <p class="text-sm text-gray-500">Set the primary WhatsApp number that your store will use to automatically send updates and notifications using <BadgeIndicator type="primary" text="workflows" :showDot="false" :clickable="true" @action="() => {}"></BadgeIndicator>, ensuring clear and timely communication</p>

                        <!-- WhatsApp Number Input -->
                        <MobileNumberInput
                            label="WhatsApp Number"
                            labelPopoverTitle="What Is This?"
                            v-model="form.whatsappMobileNumber"
                            :errorText="getFormError('whatsappMobileNumber')"
                            labelPopoverDescription="The Whatsapp mobile number that will be used to send notifications via whatsapp to customers or team members">
                        </MobileNumberInput>

                    </div>

                    <!-- Store Rolling Numbers -->
                    <StoreRollingNumbers></StoreRollingNumbers>

                </div>

            </form>

        </div>

        <div class="bg-white mb-4 p-8 rounded-lg">

            <!-- Form -->
            <form action="#" method="POST">

                <div class="space-y-4">

                    <h1 class="flex items-center font-lg font-bold">
                        <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                        </svg>
                        <span>Localization</span>
                    </h1>

                    <p class="text-sm text-gray-500">Set your store's country, currency, language, and preferred distance unit (Km/Mile) to align with your local market and ensure a seamless shopping experience for your customers.</p>

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

                    <!-- Language Select Input -->
                    <LanguageSelectInput
                        width="w-full"
                        label="Language"
                        v-model="form.language"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="The language accepted by your store">
                    </LanguageSelectInput>

                    <!-- Distance Unit Select -->
                    <SelectInput
                        width="w-full"
                        label="Distance Unit"
                        v-model="form.distanceUnit"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('distanceUnit')"
                        labelPopoverDescription="Choose the unit of measurement for distances used in your store. For example, kilometers (km) for metric systems or miles for imperial systems. This setting affects shipping calculations and location-based features.">
                        <option value="km">Kilometer (km)</option>
                        <option value="mile">Mile</option>
                    </SelectInput>

                </div>

            </form>

        </div>

        <div class="bg-white mb-4 p-8 rounded-lg">

            <!-- Form -->
            <form action="#" method="POST">

                <div class="space-y-4">

                    <h1 class="flex items-center font-lg font-bold">
                        <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.121 7.629A3 3 0 0 0 9.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 0 1-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 0 1 1.422 0l.655.218a2.25 2.25 0 0 0 1.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>Tax</span>
                    </h1>

                    <p class="text-sm text-gray-500">Set your store's tax rate and method (Inclusive/Exclusive) to ensure accurate pricing and compliance with local tax regulations.</p>

                    <div class="grid grid-cols-2 gap-4">

                        <div class="col-span-1">

                            <!-- Tax Method Select -->
                            <SelectInput
                                width="w-full"
                                label="Tax Method"
                                v-model="form.taxMethod"
                                labelPopoverTitle="What Is This?"
                                :errorText="getFormError('taxMethod')"
                                labelPopoverDescription="Choose whether taxes are included in your prices (inclusive) or added on top of prices (exclusive).">
                                <option value="inclusive">Inclusive (Prices include tax)</option>
                                <option value="exclusive">Exclusive (Prices exclude tax)</option>
                            </SelectInput>

                        </div>

                        <div class="col-span-1">

                            <!-- Tax ID Input -->
                            <TextInput
                                label="Tax ID"
                                v-model="form.taxId"
                                placeholder="12-3456789"
                                :errorText="getFormError('taxId')"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Provide your tax identification number (e.g. EIN for US, VAT for UK).">
                            </TextInput>

                        </div>

                        <div class="col-span-2">

                            <!-- Tax Rate Input -->
                            <TextInput
                                placeholder="10"
                                label="Tax Rate (%)"
                                v-model="form.taxPercentageRate"
                                labelPopoverTitle="What Is This?"
                                :errorText="getFormError('taxPercentageRate')"
                                labelPopoverDescription="Enter the percentage rate for taxes applied to sales. For example, 15 for a 15% VAT or 7.5 for a 7.5% Sales Tax. This rate will be used to calculate taxes on transactions.">
                            </TextInput>

                        </div>

                    </div>

                </div>

            </form>

        </div>

        <div class="bg-white mb-4 p-8 rounded-lg">

            <!-- Form -->
            <form action="#" method="POST">

                <div class="space-y-4">

                    <h1 class="flex items-center font-lg font-bold">
                        <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <span>Opening Hours</span>
                    </h1>

                    <p class="text-sm text-gray-500">Set your store's operating hours, including availability and time slots for each day. Indicate if the store is open or closed on any specific day.</p>

                    <!-- Show Opening Hours Toggle Switch -->
                    <ToogleSwitch
                        size="md"
                        v-model="form.showOpeningHours"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('showOpeningHours')"
                        labelPopoverDescription="Turn on if you would like your store to showcase its open or closed hours">
                        Show opening hours
                    </ToogleSwitch>

                    <template v-if="form.showOpeningHours">

                        <!-- Allow Checkout On Closed Hours Toggle Switch -->
                        <ToogleSwitch
                            size="md"
                            labelPopoverTitle="What Is This?"
                            v-model="form.allowCheckoutOnClosedHours"
                            :errorText="getFormError('allowCheckoutOnClosedHours')"
                            labelPopoverDescription="Turn on to allow customers to place orders during closed hours">
                            Allow checkout during closed hours
                        </ToogleSwitch>

                        <Alert v-if="!form.allowCheckoutOnClosedHours" type="warning" class="flex items-center space-x-2">
                            <svg class="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <span>Customers cannot place orders during closed hours</span>
                        </Alert>

                        <div v-for="(openingHour, index) in form.openingHours" :key="index" class="border-t border-dashed pt-4 grid grid-cols-2 gap-4 items-start">

                            <div class="col-span-1 flex items-center space-x-2">

                                <!-- Checkbox -->
                                <Checkbox v-model="openingHour.available" size="xs" class="mt-1"></Checkbox>

                                <!-- Day -->
                                <span>{{ days[index] }}</span>

                            </div>

                            <div class="col-span-1 space-y-2">

                                <div v-for="(hour, index2) in openingHour.hours" :key="index2">
                                    <div class="flex items-center space-x-2">

                                        <!-- Time Input -->
                                        <TimeInput v-model="hour[0]" :errorText="getFormError('openingHours')" class="w-24"></TimeInput>
                                        <span>-</span>
                                        <TimeInput v-model="hour[1]" :errorText="getFormError('openingHours')" class="w-24"></TimeInput>

                                        <div v-if="index2 == 0" @click="() => addOpeningHour(index)" class="flex-shrink-0 cursor-pointer rounded-md border p-1 hover:bg-blue-50 transition-all">
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>

                                        <div v-else @click="() => removeOpeningHour(index, index2)" class="flex-shrink-0 cursor-pointer rounded-md border p-1 bg-red-50 hover:bg-red-100 transition-all">
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </template>

                </div>

            </form>

        </div>

        <div class="space-y-4 shadow-lg rounded-lg border p-4 border-red-300 bg-red-50">

            <h1 class="text-lg font-bold">Danger</h1>

            <!-- Delete Store Info -->
            <p class="text-justify">
                Do you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>? Once this store is deleted you will not be able to recover it.
                All orders, products, customers, and store-related settings will be permanently deleted and cannot be recovered. Enter the store name to confirm this action.
            </p>

            <!-- Confirm Input -->
            <TextInput
                class="mb-8"
                label="Confirm"
                v-model="storeName"
                :placeholder="form.name"
                :errorText="getFormError('name')"
                labelPopoverTitle="What Is This?"
                :labelPopoverDescription="'Type the store name ('+form.name+') to confirm deleting this store'">
            </TextInput>

            <div class="flex justify-end">

                <!-- Delete Store Button -->
                <PrimaryButton @click="deleteStore" :loading="isDeleting" :disabled="storeName != form.name || isDeleting" class="w-40" type="danger">
                    Delete Store
                </PrimaryButton>

            </div>

        </div>
    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import TimeInput from '@Partials/inputs/TimeInput.vue';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import EmailInput from '@Partials/inputs/EmailInput.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import AddressModal from '@Components/address/AddressModal.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import CountrySelectInput from '@Partials/inputs/CountrySelectInput.vue';
    import CurrencySelectInput from '@Partials/inputs/CurrencySelectInput.vue';
    import LanguageSelectInput from '@Partials/inputs/LanguageSelectInput.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import { getApi, putApi, postApi, postFileApi, deleteApi } from '@Repositories/api-repository.js';
    import StoreRollingNumbers from '@Pages/stores/store/settings/general/components/StoreRollingNumbers.vue';

    export default {
        mixins: [FormMixin],
        components: {
            Alert, TimeInput, TextInput, TextHeader, StoreLogo, EmailInput, Checkbox, UndoButton, SelectInput, ConfirmModal, TextareaInput,
            AddressModal, PrimaryButton, ToogleSwitch, MobileNumberInput, CountrySelectInput, CurrencySelectInput,
            LanguageSelectInput, BadgeIndicator, FormErrorMessages, StoreRollingNumbers
        },
        data() {
            return {
                form: {
                    name: null,
                    taxId: null,
                    email: null,
                    alias: null,
                    online: null,
                    country: null,
                    currency: null,
                    language: null,
                    taxMethod: null,
                    openingHours: [],
                    description: null,
                    distanceUnit: null,
                    smsSenderName: null,
                    offlineMessage: null,
                    ussdMobileNumber: null,
                    taxPercentageRate: null,
                    showOpeningHours: false,
                    whatsappMobileNumber: null,
                    allowCheckoutOnClosedHours: false
                },
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                storeState: useStoreState(),
                aliasModified: false,
                isSubmitting: false,
                originalForm: null,
                isDeleting: false,
                storeName: ''
            }
        },
        watch: {

        },
        computed: {
            store() {
                return this.storeState.store;
            },
            address() {
                return this.store._relationships.address;
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
            setStoreFields() {
                this.form.name = this.store.name;
                this.form.email = this.store.email;
                this.form.alias = this.store.alias;
                this.form.taxId = this.store.taxId;
                this.form.online = this.store.online;
                this.form.country = this.store.country;
                this.form.language = this.store.language;
                this.form.taxMethod = this.store.taxMethod;
                this.form.currency = this.store.currency.code;
                this.form.description = this.store.description;
                this.form.distanceUnit = this.store.distanceUnit;
                this.form.openingHours = this.store.openingHours;
                this.form.smsSenderName = this.store.smsSenderName;
                this.form.offlineMessage = this.store.offlineMessage;
                this.form.showOpeningHours = this.store.showOpeningHours;
                this.form.ussdMobileNumber = this.store.ussdMobileNumber.international;
                this.form.taxPercentageRate = this.store.taxPercentageRate.value.toString();
                this.form.allowCheckoutOnClosedHours = this.store.allowCheckoutOnClosedHours;
                this.form.whatsappMobileNumber = this.store.whatsappMobileNumber.international;

                if(this.form.openingHours.length == 0) this.generateOpeningHours();

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);
            },
            resetForm() {
                this.form = cloneDeep(this.originalForm);
            },
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
            setAddress(address) {
                useStoreState().store._relationships.address = address;
            },
            getDefaultOpeningHour() {
                return {
                    available: true,
                    hours: [
                        ['08:00', '16:00']
                    ]
                };
            },
            generateOpeningHours() {
                this.form.openingHours = Array(7).fill().map(() => ({ ...this.getDefaultOpeningHour() }));
            },
            addOpeningHour(index) {
                this.form.openingHours[index].hours.push(['08:00', '16:00']);
            },
            removeOpeningHour(index, index2) {
                this.form.openingHours[index].hours.splice(index2, 1);
            },
            updateStore() {

                if(this.form.name.trim() == '') {
                    this.setFormError('name', 'The store name is required');
                    this.showUnsuccessfulNotification('The store name is required');
                    return;
                }

                //  Start loader
                this.isSubmitting = true;

                putApi(this.store._links.updateStore, this.form).then(response => {

                    if(response.status == 200) {

                        useStoreState().shouldUpdate = true;
                        this.originalForm = cloneDeep(this.form);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Store updated');

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
            deleteStore() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.store._links.deleteStore).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Store deleted');

                            //  Navigate to show dashboard
                            this.$router.replace({ name: 'dashboard' });

                            // Scroll to the top
                            window.scrollTo(0, 0);

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

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
        mounted() {

        },
        created() {
            this.setStoreFields();
        }
    };

</script>
