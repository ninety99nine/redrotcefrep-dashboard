<template>

    <div>

        <div class="grid grid-cols-2 py-6">

            <div class="flex items-center border-dashed">

                <!-- Back Button -->
                <BackButton class="w-16 mr-4" :action="goBack"></BackButton>

                <LineSkeleton v-if="isLoadingCustomer" width="w-40" :shine="true"></LineSkeleton>

                <template v-else>

                    <TextHeader>{{ isCreating ? 'Add Customer' : customer._attributes.name }}</TextHeader>

                </template>

            </div>

            <div v-if="!isCreating && !isLoadingCustomer && !(mustCreate || mustSaveChanges)" class="flex justify-end items-center">

                <!-- Cancel Button -->
                <PrimaryButton v-if="showForm" :action="stopShowingForm" class="w-40" type="light">
                    <span>Cancel</span>
                </PrimaryButton>

                <!-- Edit Button -->
                <PrimaryButton v-else :action="() => showForm = true" class="w-40" type="light">
                    <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span>Edit</span>
                </PrimaryButton>

            </div>

        </div>

        <!-- Customer Form -->
        <form v-if="showForm" class="relative" action="#" method="POST">

            <!-- General Error Info Alert -->
            <Alert v-if="mustCreate || mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{{ isCreating ? 'Create your customer' : 'Please save your changes'}}</span>
                </div>

                <div class="flex justify-end items-center space-x-4">

                    <!-- Cancel Button -->
                    <PrimaryButton v-if="!isCreating" :action="stopShowingForm" class="w-40" type="light">
                        <span>Cancel</span>
                    </PrimaryButton>

                    <!-- Create Customer / Save Changes Button -->
                    <PrimaryButton :action="isCreating ? createCustomer : updateCustomer" :loading="isSubmitting" class="w-40">
                        {{ isCreating ? 'Create Customer' : 'Save Changes' }}
                    </PrimaryButton>

                </div>

            </Alert>

            <div class="grid grid-cols-12 gap-4 mb-8">

                <div class="col-span-8 col-start-3 relative">

                    <!-- Loading Backdrop -->
                    <BackdropLoader v-if="isLoadingCustomer || isSubmitting" class="rounded-lg"></BackdropLoader>

                    <div class="space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4">

                        <!-- First Name Input -->
                        <TextInput
                            label="First Name"
                            placeholder="John"
                            v-model="form.firstName"
                            labelPopoverTitle="What Is This?"
                            :errorText="getFormError('firstName')"
                            labelPopoverDescription="Customer's first name e.g John">
                        </TextInput>

                        <!-- Last Name Input -->
                        <TextInput
                            label="Last Name"
                            placeholder="Doe"
                            v-model="form.lastName"
                            labelPopoverTitle="What Is This?"
                            :errorText="getFormError('lastName')"
                            labelPopoverDescription="Customer's last name e.g Doe">
                        </TextInput>

                        <!-- Email -->
                        <TextInput
                            label="Email"
                            v-model="form.email"
                            placeholder="johndoe@gmail.com"
                            :errorText="getFormError('email')"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Customer's email e.g johndoe@gmail.com">
                        </TextInput>

                        <!-- Mobile Number Input -->
                        <MobileNumberInput
                            v-model="form.mobileNumber"
                            labelPopoverTitle="What Is This?"
                            :errorText="getFormError('mobileNumber')"
                            labelPopoverDescription="Customer's mobile number e.g +26772000001">
                        </MobileNumberInput>

                        <!-- Notes Textarea -->
                        <TextareaInput
                            :rows="2"
                            label="Notes"
                            v-model="form.notes"
                            labelPopoverTitle="What Is This?"
                            :errorText="getFormError('notes')"
                            placeholder="Very loyal customer"
                            labelPopoverDescription="Short notes about customer e.g Very loyal customer">
                        </TextareaInput>

                        <!-- Birthday Datepicker -->
                        <Datepicker
                            :key="form.birthday"
                            v-model="form.birthday"
                            :errorText="getFormError('birthday')"
                            label="Birthday" labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Customer's birthday 🥳">
                        </Datepicker>

                    </div>

                </div>

            </div>

        </form>

        <div v-else class="grid grid-cols-12 gap-4 mb-8">

            <div class="col-span-8 relative">

                <div class="grid grid-cols-3 gap-4 bg-white shadow-lg rounded-lg border p-4 mb-4">

                    <!-- Total Orders -->
                    <div class="flex flex-col items-center space-y-2">
                        <svg class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                        <div class="flex space-x-1 items-center">
                            <p class="text-gray-500 text-sm">Orders</p>
                            <MoreInfoPopover title="What Is This?" description="This is the number of orders placed by the customer" placement="top"></MoreInfoPopover>
                        </div>
                        <LineSkeleton v-if="isLoadingCustomer" width="w-24" :shine="true"></LineSkeleton>
                        <p v-else class="font-bold text-2xl">{{ customer.totalOrders }}</p>
                    </div>

                    <!-- Total Spend -->
                    <div class="flex flex-col items-center space-y-2">
                        <svg class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                        <div class="flex space-x-1 items-center">
                            <p class="text-gray-500 text-sm">Total Spend</p>
                            <MoreInfoPopover title="What Is This?" description="This is the total amount spent by the customer on their orders" placement="top"></MoreInfoPopover>
                        </div>
                        <LineSkeleton v-if="isLoadingCustomer" width="w-24" :shine="true"></LineSkeleton>
                        <p v-else class="font-bold text-2xl">{{ customer.totalSpend.amountWithCurrency }}</p>
                    </div>

                    <!-- Average Order Spend -->
                    <div class="flex flex-col items-center space-y-2">
                        <svg class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>

                        <div class="flex space-x-1 items-center">
                            <p class="text-gray-500 text-sm">Average Order Spend</p>
                            <MoreInfoPopover title="What Is This?" description="This is the average amount spent by the customer per order" placement="top"></MoreInfoPopover>
                        </div>
                        <LineSkeleton v-if="isLoadingCustomer" width="w-24" :shine="true"></LineSkeleton>
                        <p v-else class="font-bold text-2xl">{{ customer.totalAverageSpend.amountWithCurrency }}</p>
                    </div>


                    <div v-if="isLoadingCustomer || customer.lastOrderAt || customer.notes" class="col-span-3 px-4 border-t border-dashed"></div>

                    <!-- Last order -->
                    <div v-if="isLoadingCustomer || customer.lastOrderAt" class="col-span-3 flex space-x-2 items-center px-4">
                        <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="whitespace-nowrap text-gray-500 text-sm">Last order:</span>
                        <LineSkeleton v-if="isLoadingCustomer" width="w-24" :shine="true"></LineSkeleton>
                        <template v-else>
                            <span class="whitespace-nowrap text-sm font-bold">{{ formattedDatetime(customer.lastOrderAt) }}</span>
                            <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(customer.lastOrderAt)" placement="top"></MoreInfoPopover>
                        </template>
                    </div>

                    <!-- Notes -->
                    <div class="col-span-3 flex space-x-2 items-center px-4">
                        <template v-if="isLoadingCustomer">
                            <svg class="w-5 h-5 text-gray-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                            </svg>
                            <LineSkeleton v-if="isLoadingCustomer" width="w-24" :shine="true"></LineSkeleton>
                        </template>

                        <template v-else-if="customer.notes">
                            <svg class="w-5 h-5 text-gray-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                            </svg>
                            <div>
                                <span class="text-gray-500 text-sm">{{ customer.notes }}</span>
                            </div>
                        </template>
                    </div>

                </div>

            </div>

            <div class="col-span-4">

                <!-- Customer Card -->
                <div class="bg-white shadow-lg rounded-lg border space-y-3 p-4 mb-4">

                    <div class="flex items-center space-x-2">
                        <div class="p-1.5 bg-gray-100 rounded-full border border-gray-200">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        <LineSkeleton v-if="isLoadingCustomer" width="w-32" :shine="true"></LineSkeleton>
                        <span v-else class="font-bold">{{ customer._attributes.name }}</span>
                    </div>

                    <div class="space-y-2">

                        <!-- Mobile Number -->
                        <div v-if="isLoadingCustomer || customer.mobileNumber" class="flex items-center space-x-2 text-sm">
                            <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            <LineSkeleton v-if="isLoadingCustomer" width="w-32" :shine="true"></LineSkeleton>
                            <span v-else class="font-bold">{{ customer.mobileNumber.national }}</span>
                        </div>

                        <!-- Email -->
                        <div v-if="isLoadingCustomer || customer.email" class="flex items-center space-x-2 text-sm">
                            <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <LineSkeleton v-if="isLoadingCustomer" width="w-32" :shine="true"></LineSkeleton>
                            <span v-else class="font-bold">{{ customer.email }}</span>
                        </div>

                        <!-- Birthday -->
                        <div v-if="isLoadingCustomer || customer.birthday" class="flex items-center space-x-2 text-sm">
                            <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                            </svg>
                            <LineSkeleton v-if="isLoadingCustomer" width="w-32" :shine="true"></LineSkeleton>
                            <template v-else>
                                <span class="font-bold">{{ formattedDate(customer.birthday) }}</span>
                                <MoreInfoPopover title="What Is This?" description="This is the customers birthday 🥳" placement="top"></MoreInfoPopover>
                            </template>
                        </div>

                        <div v-if="!isLoadingCustomer && hasAddresses" class="border-t border-dashed pt-2"></div>

                        <!-- Addresses -->
                        <template v-if="isLoadingCustomer || hasAddresses">
                            <div v-if="isLoadingCustomer" class="flex items-center space-x-2 text-sm">
                                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <LineSkeleton width="w-32" :shine="true"></LineSkeleton>
                            </div>
                            <div v-else v-for="(address, index) in addresses" :key="index" class="flex items-center space-x-2 text-sm">
                                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <span>{{ address._attributes.completeAddress }}</span>
                            </div>
                        </template>

                    </div>

                </div>

            </div>

            <div class="col-span-12">
                <div class="bg-white shadow-lg rounded-lg border p-4">
                    <!-- Customer Orders -->
                    <CustomerOrders :customer="customer" :isLoadingCustomer="isLoadingCustomer" :refreshCustomer="getCustomer"></CustomerOrders>
                </div>
            </div>

            <div class="col-span-12">
                <div class="bg-white shadow-lg rounded-lg border p-4">
                    <!-- Customer Transactions -->
                    <CustomerTransactions :customer="customer" :isLoadingCustomer="isLoadingCustomer" :refreshCustomer="getCustomer"></CustomerTransactions>
                </div>
            </div>

        </div>

        <div v-if="customer" :class="['space-y-4 shadow-lg rounded-lg border p-4', isLoadingCustomer ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

            <!-- Delete Customer Info -->
            <p>Do you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>? Once this customer is deleted you will not be able to recover it.</p>

            <div class="flex justify-end">

                <ConfirmModal approveText="Delete Customer" :approveAction="deleteCustomer" :isLoading="isDeleting">

                    <template #content>
                        <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                        <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>?</p>
                    </template>

                    <template #trigger="triggerProps">

                        <!-- Delete Customer Button - Triggers Confirmation Modal -->
                        <PrimaryButton :action="triggerProps.showModal" :loading="isDeleting" class="w-40" type="danger">
                            Delete Customer
                        </PrimaryButton>

                    </template>


                </ConfirmModal>

            </div>

        </div>

    </div>

</template>

<script>
    import dayjs from 'dayjs';
    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Pill from '@Partials/pills/Pill.vue';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import InputTags from '@Partials/inputs/InputTags.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import Datepicker from '@Partials/datepicker/Datepicker.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import SelectInputTags from '@Partials/inputs/SelectInputTags.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BackdropLoader from '@Partials/loaders/BackdropLoader.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import CustomerOrders from '@Components/customer/orders/CustomerOrders.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import CustomerTransactions from '@Components/customer/transactions/CustomerTransactions.vue';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Pill, Alert, TextInput, TextHeader, MoneyInput, InputTags, BackButton, NumberInput,
            SelectInput, Datepicker, ConfirmModal, TextareaInput, LineSkeleton, PrimaryButton,
            SpinningLoader, SelectInputTags, MoreInfoPopover, BackdropLoader, ToogleSwitch,
            MobileNumberInput, CustomerOrders, CustomerTransactions
        },
        data() {
            return {
                form: {
                    notes: '',
                    email: '',
                    birthday: '',
                    lastName: '',
                    firstName: '',
                    mobileNumber: '',
                },
                customer: null,
                showForm: false,
                isDeleting: false,
                originalForm: null,
                isSubmitting: false,
                isLoadingCustomer: false,
                apiState: useApiState(),
                storeState: useStoreState(),
            }
        },
        watch: {
            '$route.params.customer_href'(newValue, oldValue) {

                // Scroll to the top whenever $route.params.customer_href changes
                window.scrollTo(0, 0);

                //  Get the customer matching the route customer_href
                this.getCustomer();

            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isCreating() {
                return this.$route.name === 'create-store-customer';
            },
            isEditting() {
                return this.$route.name === 'show-store-customer';
            },
            addresses() {
                return (((this.customer || {})._relationships || {}).addresses || []);
            },
            hasAddresses() {
                return this.addresses.length > 0;
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.isEditting && this.formHasChanged && !this.isLoadingCustomer && !this.isSubmitting;
            },
            mustCreate() {
                return this.isCreating && this.formHasChanged && !this.isLoadingCustomer && !this.isSubmitting;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({ name: 'show-store-customers', params: { 'store_href': this.store._links.showStore } });
            },
            stopShowingForm() {
                this.form = cloneDeep(this.originalForm);
                this.showForm = false;
            },
            setCustomerFields() {
                this.form.email = this.customer.email;
                this.form.notes = this.customer.notes;
                this.form.lastName = this.customer.lastName;
                this.form.firstName = this.customer.firstName;
                this.form.mobileNumber = ((this.customer.mobileNumber || {}).international || '');
                if(this.customer.birthday) this.form.birthday = dayjs(this.customer.birthday).format('DD MMM YYYY');

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            getCustomer() {

                //  Start loader
                this.isLoadingCustomer = true;

                //  Set the query params
                const params = {
                    '_relationships': 'addresses'
                };

                getApi(this.$route.params.customer_href, params).then(response => {

                    if(response.status == 200) {

                        if(response.data.exists) {

                            this.customer = response.data.customer;
                            this.setCustomerFields();

                        }

                    }

                    //  Stop loader
                    this.isLoadingCustomer = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingCustomer = false;

                    this.setServerFormErrors(errorException);

                });

            },
            createCustomer() {

                //  Start loader
                this.isSubmitting = true;

                postApi(this.apiState.apiHome['_links']['createCustomer'], this.parseForm()).then(response => {

                    if(response.status == 200) {
                        this.showSuccessfulNotification('Customer created');

                        //  Navigate to show customers
                        this.$router.push({ name: 'show-store-customers', params: { 'store_href': this.store._links.showStore } });

                        // Scroll to the top
                        window.scrollTo(0, 0);

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.setServerFormErrors(errorException);

                });

            },
            updateCustomer() {

                //  Start loader
                this.isSubmitting = true;

                //  Return product after creation
                this.form.return = true;

                putApi(this.customer._links.showCustomer, this.parseForm()).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Customer updated');

                            this.showForm = false;

                            this.getCustomer();

                        }else{

                            this.form = cloneDeep(this.originalForm);

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.setServerFormErrors(errorException);

                });

            },
            deleteCustomer() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.customer._links.deleteCustomer).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Customer deleted');

                            //  Navigate to show customers
                            this.$router.push({ name: 'show-store-customers', params: { 'store_href': this.store._links.showStore } });

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

                    this.setServerFormErrors(errorException);

                });

            },
            parseForm() {
                var data = cloneDeep(this.form);

                if(this.form.birthday == '') delete data['birthday'];

                return data;
            },
        },
        created() {
            this.showForm = this.isCreating;
            this.form.storeId = this.store.id;
            this.originalForm = cloneDeep(this.form);
            if(this.isEditting) this.getCustomer();
        }
    };

</script>
