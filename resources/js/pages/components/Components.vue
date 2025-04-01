<template>

    <div class="space-y-10 pt-20 pb-80">


        <h1 class="font-semibold text-2xl text-center">Inputs</h1>

        <form @submit.prevent class="grid grid-cols-2 gap-4 w-2/3 mx-auto">

            <div class="space-y-2">

                <CustomAlert
                    type="success"
                    title="Operation Successful"
                    description="Your changes have been saved successfully."
                    dismissable
                />

                <CustomAlert
                    type="primary"
                    title="New Feature Available"
                    description="We've added new analytics tools to your dashboard."
                    dismissable
                />

                <CustomAlert type="warning" dismissable>
                    <template #title>
                        <span>Storage Almost Full</span>
                    </template>
                    <template #description>
                        <span>
                            Your storage is at 90% capacity.
                            <a href="#" class="text-blue-500 underline">Upgrade now</a> to avoid interruptions.
                        </span>
                    </template>
                </CustomAlert>

                <CustomAlert
                    type="danger"
                    title="Payment Failed"
                    description="Your recent transaction could not be processed. Please check your payment method."
                    dismissable
                />

                <CustomAlert
                    type="light"
                    title="Scheduled Maintenance"
                    description="The system will be undergoing maintenance on Sunday at 3 AM UTC."
                />

                <CustomAlert
                    type="primary"
                    title="Welcome to the new dashboard!"
                    dismissable
                />


                <CustomInputMobileNumbers
                    v-model="mobileInput"
                    :mobileNumbers="mobileNumbers"
                    class="space-y-4 p-4 border rounded-lg shadow-lg bg-white">

                    <template #content>

                        <h1 class="flex items-center font-lg font-bold mb-2">
                            <svg class="w-6 h-6 mr-4 flex-shrink-0" fill="#44c152" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve">
                                <g id="XMLID_468_">
                                    <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                    <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                                </g>
                            </svg>
                            <span>WhatsApp Notifications</span>
                        </h1>

                        <p class="text-sm text-gray-500 pb-2 mb-4 border-b border-dashed">
                            Set the primary WhatsApp number that your store will use
                            to automatically send updates and notifications using
                            <Pill
                                size="xs"
                                type="primary"
                                :showDot="false"
                                :action="() => {}">
                                workflows
                            </Pill>,
                            ensuring clear and timely communication
                        </p>

                    </template>
                </CustomInputMobileNumbers>

                <CustomInputAddress
                    heading="Address"
                    content="Add the address to deliver your order"
                    class="p-4 border rounded-lg shadow-lg bg-white">
                </CustomInputAddress>

                <div class="bg-white border border-gray-300 shadow space-y-2 p-4 rounded-lg overflow-hidden">

                    <div class="flex items-center space-x-1">
                        <span class="text-sm text-gray-500">Tooltip</span>
                        <CustomTooltip
                            trigger="hover"
                            position="bottom"
                            content="This is a message broadcast to the world">
                        </CustomTooltip>
                    </div>

                    <div class="flex items-center space-x-1">
                        <span class="text-sm text-gray-500">Popover</span>
                        <CustomPopover
                            trigger="hover"
                            position="bottom"
                            content="This is a message broadcast to the world">
                        </CustomPopover>
                    </div>

                    <CustomDrawer
                        trigger="Drawer"
                        header="Hello World"
                        content="This is a message broadcast to the world">
                    </CustomDrawer>

                    <CustomModal
                        trigger="Modal"
                        header="Hello World"
                        content="This is a message broadcast to the world">
                    </CustomModal>

                    <CustomDropdown
                        triggerText="Options"
                        :options="dropdownOptions">
                    </CustomDropdown>

                    <CustomSwitch
                        size="xs"
                        :disabled="true"
                        v-model="switchChecked"
                    />

                    <CustomSwitch
                        size="xs"
                        v-model="switchChecked"
                        suffixText="Extra small"
                    />

                    <CustomSwitch
                        size="sm"
                        suffixText="Small"
                        v-model="switchChecked"
                    />

                    <CustomSwitch
                        size="md"
                        suffixText="Medium"
                        v-model="switchChecked"
                    />

                    <CustomSwitch
                        size="lg"
                        prefixText="On"
                        suffixText="Off"
                        v-model="switchChecked"
                    />

                    <CustomSwitch
                        size="sm"
                        type="success"
                        suffixText="Success"
                        v-model="switchChecked"
                    />

                    <CustomSwitch
                        size="sm"
                        type="warning"
                        suffixText="Warning"
                        v-model="switchChecked"
                    />

                    <CustomSwitch
                        size="sm"
                        type="danger"
                        suffixText="Danger"
                        v-model="switchChecked"
                    />

                </div>

                <div class="bg-white border border-gray-300 shadow space-y-2 p-4 rounded-lg">

                    <CustomInput
                        type="radio"
                        name="group1"
                        radioValue="option1"
                        inputLabel="Radio label"
                        v-model="selectedRadioOption">
                    </CustomInput>

                    <CustomInput
                        type="radio"
                        name="group1"
                        :disabled="true"
                        radioValue="option2"
                        inputLabel="Radio label"
                        v-model="selectedRadioOption">
                    </CustomInput>

                    <CustomInput
                        type="radio"
                        name="group1"
                        radioValue="option3"
                        inputLabel="Radio label"
                        v-model="selectedRadioOption"
                        inputDescription="This is the radio description">
                    </CustomInput>

                    <CustomInput
                        type="radio"
                        name="group1"
                        radioValue="option4"
                        inputLabel="Radio label"
                        v-model="selectedRadioOption">
                        <template #inputLabel>
                            <span class="font-semibold text-gray-900 mb-1">Radio label</span>
                        </template>
                        <template #inputDescription>
                            <div class="flex space-x-1 items-center">
                                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                </svg>
                                <span class="text-xs text-gray-500">Notify me when this action happens.</span>
                            </div>
                        </template>
                    </CustomInput>
                </div>

                <div class="bg-white border border-gray-300 shadow space-y-2 p-4 rounded-lg">

                    <CustomInput
                        label="Basic"
                        type="checkbox"
                        v-model="checkboxChecked"
                        inputLabel="Checkbox label">
                    </CustomInput>

                    <CustomInput
                        type="checkbox"
                        label="Advanced"
                        v-model="checkboxChecked"
                        inputLabel="Checkbox label"
                        inputDescription="This is the checkbox description">
                    </CustomInput>

                    <CustomInput
                        type="checkbox"
                        label="Disabled"
                        :disabled="true"
                        v-model="checkboxChecked"
                        inputLabel="Checkbox label"
                        inputDescription="This is the checkbox description">
                    </CustomInput>

                    <CustomInput
                        type="checkbox"
                        v-model="checkboxChecked"
                        label="Custom Template">
                        <template #inputLabel>
                            <span class="font-semibold text-gray-900 mb-1">Delete</span>
                        </template>
                        <template #inputDescription>
                            <div class="flex space-x-1 items-center">
                                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                </svg>
                                <span class="text-xs text-gray-500">Notify me when this action happens.</span>
                            </div>
                        </template>
                    </CustomInput>

                </div>

                <CustomSelectTags
                    :search="true"
                    label="Select tags"
                    v-model="selectTagOption"
                    v-model:options="selectTagOptions"
                    placeholder="Select a tag"
                    noResultsText="No tags found">
                </CustomSelectTags>

                <CustomSelectCountry
                    label="Country"
                    v-model="selectOption">
                </CustomSelectCountry>

                <CustomSelectCurrency
                    label="Currency"
                    v-model="selectOption">
                </CustomSelectCurrency>

                <CustomSelectLanguage
                    label="Language"
                    v-model="selectOption">
                </CustomSelectLanguage>

                <CustomSelect
                    label="Basic"
                    :search="false"
                    v-model="selectOption"
                    :options="selectOptions"
                    placeholder="Select an option"
                    noResultsText="No results found">
                </CustomSelect>

                <CustomSelect
                    :search="true"
                    label="With Search"
                    v-model="selectOption"
                    :options="selectOptions"
                    placeholder="Select an option"
                    noResultsText="No results found">
                </CustomSelect>

                <CustomSelect
                    v-model="selectOption"
                    :options="selectOptions"
                    label="With Custom Templates"
                    noResultsText="No team members found"
                    :searchableFields="['label', 'value', 'email']">

                    <!-- Custom Styled Selected Option -->
                    <template #selectedOption="{ selectedOption }">
                        <div v-if="selectedOption">
                            <p class="text-gray-700 text-sm">{{ selectedOption.label }}</p>
                            <p class="text-gray-400 text-xs">{{ selectedOption.email }}</p>
                        </div>
                        <span v-else class="text-gray-700 text-sm">Select a team member</span>
                    </template>

                    <!-- Custom Styled Dropdown Select Option -->
                    <template #option="{ option }">
                        <div class="w-full">
                            <p class="text-gray-700 truncate">
                                {{ option.label }}
                            </p>
                            <p class="text-gray-400 truncate">{{ option.email }}</p>
                        </div>
                    </template>

                </CustomSelect>

                <CustomSelect
                    :search="false"
                    label="Disabled"
                    :disabled="true"
                    v-model="selectOption"
                    :options="selectOptions"
                    placeholder="Select an option"
                    noResultsText="No results found">
                </CustomSelect>

                <CustomInput
                    type="text"
                    label="Text"
                    minLength="1"
                    maxLength="10"
                    v-model="textInput"
                    :showAsterisk="true"
                    secondaryLabel="(optional)"
                    externalLinkName="Learn more"
                    placeholder="Enter your text"
                    externalLinkUrl="https://www.google.com"
                    tooltipContent="This is useful information"
                    description="Enter your short and sweet text.">
                </CustomInput>

                <CustomInput
                    type="textarea"
                    label="Textarea"
                    v-model="textareaInput"
                    placeholder="Enter your short and sweet text.">
                </CustomInput>

                <CustomInput
                    type="password"
                    label="Password"
                    v-model="passwordInput"
                    placeholder="Enter your password">
                </CustomInput>

                <CustomInput
                    type="email"
                    label="Email"
                    v-model="emailInput"
                    placeholder="Enter your email">
                </CustomInput>

                <CustomInput
                    min="1"
                    max="10"
                    label="Number"
                    type="number"
                    v-model="numberInput"
                    placeholder="Enter your number">
                </CustomInput>

                <CustomInput
                    min="0"
                    max="100"
                    label="Percentage"
                    type="percentage"
                    v-model="percentageInput"
                    placeholder="Enter your percentage">
                </CustomInput>

                <CustomInput
                    type="money"
                    label="Money"
                    currency="BHD"
                    v-model="moneyInput">
                </CustomInput>

                <CustomInput
                    type="mobile"
                    label="Mobile"
                    v-model="mobileInput"
                    placeholder="Enter your mobile">
                </CustomInput>

                <CustomInput
                    type="tel"
                    label="Tel"
                    v-model="telInput"
                    placeholder="Enter your tel">
                </CustomInput>

                <CustomInput
                    type="url"
                    label="Url"
                    v-model="urlInput"
                    placeholder="https://www.google.com">
                </CustomInput>

                <CustomInput
                    type="search"
                    label="Search"
                    v-model="searchInput"
                    placeholder="Enter your search">
                </CustomInput>

                <CustomInput
                    type="date"
                    label="Date"
                    v-model="dateInput"
                    placeholder="Enter your date">
                </CustomInput>

                <CustomInput
                    v-model="datetimeLocalInput"
                    type="datetime-local"
                    label="Datetime local"
                    placeholder="Enter your datetime-local">
                </CustomInput>

                <CustomInput
                    type="month"
                    label="Month"
                    v-model="monthInput"
                    placeholder="Enter your month">
                </CustomInput>

                <CustomInput
                    type="week"
                    label="Week"
                    v-model="weekInput"
                    placeholder="Enter your week">
                </CustomInput>

                <CustomInput
                    type="time"
                    label="Time"
                    v-model="timeInput"
                    placeholder="Enter your time">
                </CustomInput>

                <CustomInput
                    type="color"
                    label="Color"
                    v-model="colorInput"
                    placeholder="Enter your color">
                </CustomInput>

                <CustomInput
                    type="file"
                    label="File"
                    v-model="fileInput"
                    placeholder="Enter your file"
                    :onUploadCallback="(data) => console.log(data)">
                </CustomInput>

                {{ fileInput }}

            </div>

            <div class="space-y-2">

                <TextInput
                    label="Label"
                    placeholder="Text"
                    v-model="textInput"
                    :showAsterisk="true"
                    learnMoreLabel="Learn more"
                    errorText="This is the error"
                    secondaryLabel="Secondary Label"
                    learnMoreLink="http://google.com"
                    labelPopoverTitle="Popover title"
                    description="This is a short description"
                    labelPopoverDescription="This is the popover description">
                </TextInput>

                <SearchInput v-model="searchInput"></SearchInput>
                <EmailInput v-model="emailInput"></EmailInput>
                <NumberInput v-model="numberInput"></NumberInput>
                <PercentageInput v-model="percentageInput"></PercentageInput>
                <MobileNumberInput v-model="mobileNumberInput"></MobileNumberInput>
                <CurrentPasswordInput v-model="currentPasswordInput"></CurrentPasswordInput>
                <ConfirmPasswordInput v-model="confirmPasswordInput"></ConfirmPasswordInput>
                <TextareaInput v-model="textareaInput"></TextareaInput>

                <TimeInput v-model="timeInput"></TimeInput>
                <MoneyInput v-model="moneyInput"></MoneyInput>
                <SelectInput v-model="selectInput">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </SelectInput>
                <AddressInput
                    title="Address"
                    subtitle="Add the address to deliver your order">
                </AddressInput>
                <PasswordInput v-model="passwordInput"></PasswordInput>

                <SelectInputTags v-model="selectInputTags"></SelectInputTags>
                <CountrySelectInput v-model="countrySelectInput"></CountrySelectInput>

                <CurrencySelectInput v-model="currencySelectInput"></CurrencySelectInput>
                <LanguageSelectInput v-model="languageSelectInput"></LanguageSelectInput>
                <BulkMobileNumberInput :mobileNumbers="mobileNumbers"></BulkMobileNumberInput>
            </div>

        </form>

        <h1 class="font-semibold text-2xl text-center">Buttons</h1>
        <div class="w-full flex justify-evenly">

            <div
                :key="index"
                class="space-y-2"
                v-for="(type, index) in buttonTypes">

                <div
                    :key="index"
                    v-for="(size, index) in ['xs', 'sm', 'md', 'lg']">

                    <Button :type="type.toLowerCase()" :size="size">
                        {{ type }}
                    </Button>

                </div>

            </div>

        </div>

        <h1 class="font-semibold text-2xl text-center">Pills</h1>
        <div class="w-full flex justify-evenly">
            <div
                :key="index"
                class="space-y-2"
                v-for="(type, index) in pillTypes">

                <div
                    :key="index"
                    v-for="(size, index) in ['xs', 'sm', 'md', 'lg']">

                    <Pill :type="type.toLowerCase()" :size="size">{{ type }}</Pill>

                </div>

            </div>
        </div>
        <div class="w-full flex justify-evenly">
            <div
                :key="index"
                class="space-y-2"
                v-for="(type, index) in pillTypes">

                <div
                    :key="index"
                    v-for="(size, index) in ['xs', 'sm', 'md', 'lg']">

                    <Pill :type="type.toLowerCase()" :size="size" :showDot="true">{{ type }}</Pill>

                </div>

            </div>
        </div>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';

    import CustomAlert from '@Partials/inputs/CustomAlert.vue';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import CustomModal from '@Partials/inputs/CustomModal.vue';
    import CustomDrawer from '@Partials/inputs/CustomDrawer.vue';
    import CustomSelect from '@Partials/inputs/CustomSelect.vue';
    import CustomSwitch from '@Partials/inputs/CustomSwitch.vue';
    import CustomPopover from '@Partials/inputs/CustomPopover.vue';
    import CustomTooltip from '@Partials/inputs/CustomTooltip.vue';
    import CustomDropdown from '@Partials/inputs/CustomDropdown.vue';
    import CustomSelectTags from '@Partials/inputs/CustomSelectTags.vue';
    import CustomInputAddress from '@Partials/inputs/CustomInputAddress.vue';
    import CustomSelectCountry from '@Partials/inputs/CustomSelectCountry.vue';
    import CustomSelectCurrency from '@Partials/inputs/CustomSelectCurrency.vue';
    import CustomSelectLanguage from '@Partials/inputs/CustomSelectLanguage.vue';
    import CustomInputMobileNumbers from '@Partials/inputs/CustomInputMobileNumbers.vue';

    import TextInput from '@Partials/inputs/TextInput.vue';
    import TimeInput from '@Partials/inputs/TimeInput.vue';
    import EmailInput from '@Partials/inputs/EmailInput.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import SearchInput from '@Partials/inputs/SearchInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import AddressInput from '@Partials/inputs/AddressInput.vue';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import SelectInputTags from '@Partials/inputs/SelectInputTags.vue';
    import PercentageInput from '@Partials/inputs/PercentageInput.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import CountrySelectInput from '@Partials/inputs/CountrySelectInput.vue';
    import CurrencySelectInput from '@Partials/inputs/CurrencySelectInput.vue';
    import LanguageSelectInput from '@Partials/inputs/LanguageSelectInput.vue';
    import CurrentPasswordInput from '@Partials/inputs/CurrentPasswordInput.vue';
    import ConfirmPasswordInput from '@Partials/inputs/ConfirmPasswordInput.vue';
    import BulkMobileNumberInput from '@Partials/inputs/BulkMobileNumberInput.vue';

    export default {
        components: {
            Pill, Button,
            CustomAlert, CustomInput, CustomModal, CustomDrawer, CustomSelect, CustomSelectCountry, CustomSelectCurrency, CustomSelectLanguage,
            CustomSelectTags, CustomSwitch, CustomTooltip, CustomDropdown, CustomPopover, CustomSelectTags, CustomInputAddress,
            CustomInputMobileNumbers, TextInput, TimeInput, EmailInput, MoneyInput, SearchInput, SelectInput,
            NumberInput, AddressInput, PasswordInput, TextareaInput, SelectInputTags, PercentageInput,
            MobileNumberInput, CountrySelectInput, CurrencySelectInput, LanguageSelectInput,
            CurrentPasswordInput, ConfirmPasswordInput, BulkMobileNumberInput,
        },
        data() {
            return {
                buttonTypes: [
                    'Light', 'Primary', 'Success', 'Warning', 'Danger', 'Dark', 'Info', 'Outline', 'Gradient', 'Glass'
                ],
                pillTypes: [
                    'Light', 'Primary', 'Success', 'Warning', 'Danger', 'Dark', 'Info', 'Outline', 'Gradient', 'Glass'
                ],
                urlInput: null,
                telInput: null,
                dateInput: null,
                textInput: 'Julian',
                textareaInput: null,
                mobileInput: null,
                fileInput: [],
                timeInput: null,
                weekInput: null,
                moneyInput: null,
                colorInput: null,
                monthInput: null,
                emailInput: null,
                moneyInput: null,
                numberInput: null,
                searchInput: null,
                selectInput: null,
                addressInput: null,
                passwordInput: null,
                textareaInput: null,
                selectInputTags: null,
                percentageInput: null,
                mobileNumberInput: null,
                datetimeLocalInput: null,
                countrySelectInput: null,
                currencySelectInput: null,
                languageSelectInput: null,
                currentPasswordInput: null,
                confirmPasswordInput: null,
                mobileNumbers: ['+26772882239', '+26777479083'],
                targetFiles: [],

                switchChecked: false,

                selectedRadioOption: 'option2',
                checkboxChecked: true,

                selectOption: null,
                selectOptions: [
                    { label: "Wade Cooper", value: "wade cooper", email: "wade@gmail.com" },
                    { label: "Arlene Mccoy", value: "arlene mccoy", email: "arlene@yahoo.com" },
                    { label: "Devon Webb", value: "devon webb", email: "devon@yahoo.com", disabled: true },
                    { label: "Tom Cook", value: "tom cook", email: "tom@gmail.com" },
                    { label: "Tanya Fox", value: "tanya fox", email: "tanya@hotmail.com" }
                ],
                selectTagOption: [],
                selectTagOptions: [
                    { avatar: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80', label: "Wade Cooper", value: "wade cooper", email: "wade@gmail.com" },
                    { avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80', label: "Arlene Mccoy", value: "arlene mccoy", email: "arlene@yahoo.com" },
                    { avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80', label: "Devon Webb", value: "devon webb", email: "devon@yahoo.com", disabled: true },
                    { avatar: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80', label: "Tom Cook", value: "tom cook", email: "tom@gmail.com" }
                ],
                dropdownOptions: [
                    { label: 'Edit', action: () => console.log('Edit clicked') },
                    { label: 'Delete', action: () => console.log('Delete clicked') }
                ]
            }
        }
    };

</script>
