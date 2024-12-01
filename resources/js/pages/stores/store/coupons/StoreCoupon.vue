<template>

    <div>

        <div class="flex justify-start items-center border-dashed py-6">

            <!-- Back Button -->
            <BackButton class="w-16 mr-4" :action="goBack"></BackButton>

            <div v-if="isLoadingCoupon" class="flex items-center space-x-2">
                <ShineEffect class="flex space-x-2">
                    <LineSkeleton width="w-40 mt-2"></LineSkeleton>
                    <LineSkeleton width="w-4 mt-2"></LineSkeleton>
                </ShineEffect>
            </div>

            <template v-else>

                <TextHeader>{{ isCreating ? 'Add Coupon' : form.name }}</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Coupons are promotional incentives that customers can claim while placing orders, such as discounts or free delivery. This encourages purchases and enhances the customer shopping experience." placement="top"></MoreInfoPopover>

            </template>
        </div>

        <!-- Coupon Form -->
        <form class="relative" action="#" method="POST">

            <!-- General Error Info Alert -->
            <Alert v-if="mustCreate || mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{{ isCreating ? 'Create your coupon' : 'Please save your changes'}}</span>
                </div>

                <!-- Create Coupon / Save Changes Button -->
                <PrimaryButton :action="isCreating ? createCoupon : updateCoupon" :loading="isSubmitting" class="w-40">
                    {{ isCreating ? 'Create Coupon' : 'Save Changes' }}
                </PrimaryButton>

            </Alert>

            <div class="grid grid-cols-12 gap-4 mb-8">

                <div class="col-span-8 relative">

                    <!-- Loading Backdrop -->
                    <LoadingBackdrop v-if="isLoadingCoupon || isSubmitting" class="rounded-lg"></LoadingBackdrop>

                    <div class="space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4">

                        <!-- General Error Info Alert -->
                        <Alert v-if="getFormError('general')" type="warning">
                            {{ getFormError('general') }}
                        </Alert>

                        <!-- Name Input -->
                        <TextInput
                            v-model="form.name"
                            :errorText="getFormError('name')"
                            labelPopoverTitle="What Is This?"
                            label="Name" placeholder="10% off"
                            labelPopoverDescription="The name of your coupon e.g 10% off">
                        </TextInput>

                        <!-- Description Textarea -->
                        <TextareaInput
                            :rows="2"
                            v-model="form.description"
                            labelPopoverTitle="What Is This?"
                            :errorText="getFormError('description')"
                            label="Description" placeholder="Offer 10% discount"
                            labelPopoverDescription="Sweet and short description of your coupon (for internal use) e.g Offer 10% discount">
                        </TextareaInput>

                    </div>

                    <div class="bg-white shadow-lg rounded-lg border p-4 mb-4">

                        <div :class="['space-y-4', form.offerDiscount ? 'mb-8' : 'mb-4']">

                            <p class="font-bold text-sm">Offers</p>

                            <p class="text-sm text-gray-400">Set the offers that this coupon will apply</p>

                            <!-- Offer Discount Toggle Switch -->
                            <ToogleSwitch
                                labelPopoverTitle="What Is This?"
                                v-model="form.offerDiscount" size="md"
                                :errorText="getFormError('offerDiscount')"
                                labelPopoverDescription="Turn on to offer a discount using this coupon">
                                Offer Discount
                            </ToogleSwitch>

                            <div v-if="form.offerDiscount" class="flex items-center space-x-8">

                                <!-- Discount Type Select -->
                                <SelectInput
                                    label="Discount Type"
                                    v-model="form.discountType"
                                    labelPopoverTitle="What Is This?"
                                    :errorText="getFormError('discountType')"
                                    labelPopoverDescription="Select the discount type e.g Is this a fixed amount or an amount that is calculated based on a percetange of the total cart amount?">
                                    <option value="Percentage">Percentage</option>
                                    <option value="Fixed">Fixed</option>
                                </SelectInput>

                                <!-- Percentage Discount Rate Input -->
                                <TextInput
                                    placeholder="100"
                                    label="Percentage Rate"
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.discountPercentageRate"
                                    v-if="form.discountType == 'Percentage'"
                                    :errorText="getFormError('discountPercentageRate')"
                                    labelPopoverDescription="Set the percentage discount amount (This is the percentage amount of the entire order that will be applied as a discount e.g 50%)">
                                </TextInput>

                                <!-- Fixed Discount Rate Money Input -->
                                <MoneyInput
                                    label="Fixed Rate"
                                    v-model="form.discountFixedRate"
                                    labelPopoverTitle="What Is This?"
                                    v-if="form.discountType == 'Fixed'"
                                    :errorText="getFormError('discountFixedRate')"
                                    labelPopoverDescription="Set the fixed discount amount (This is the fixed amount that will be applied as a discount e.g P50.00)">
                                </MoneyInput>

                            </div>

                        </div>

                        <!-- Offer Free Delivery Toggle Switch -->
                        <ToogleSwitch
                            labelPopoverTitle="What Is This?"
                            v-model="form.offerFreeDelivery" size="md"
                            :errorText="getFormError('offerFreeDelivery')"
                            labelPopoverDescription="Turn on to offer free delivery using this coupon">
                            Offer Free Delivery
                        </ToogleSwitch>

                    </div>

                    <div class="bg-white shadow-lg rounded-lg border p-4">

                        <div :class="['space-y-4', form.offerDiscount ? 'mb-8' : 'mb-4']">

                            <p class="font-bold text-sm">Activation Rules</p>

                            <p class="text-sm text-gray-400">Set how this coupon will be activated</p>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Activation Code Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingCode" size="md"
                                    :errorText="getFormError('activateUsingCode')"
                                    labelPopoverDescription="Turn on if you want customers to provide a code to claim this coupon">
                                    Activate on code
                                </ToogleSwitch>


                                <!-- Activation Code Input -->
                                <TextInput
                                    v-model="form.code"
                                    v-if="form.activateUsingCode"
                                    :errorText="getFormError('code')"
                                    labelPopoverTitle="What Is This?"
                                    label="Activation Code" placeholder="1234"
                                    labelPopoverDescription="The activation code of your coupon e.g 1234">
                                </TextInput>

                            </div>

                            <!-- Activate Using Usage Limit Toggle Switch -->
                            <ToogleSwitch
                                labelPopoverTitle="What Is This?"
                                v-model="form.activateForNewCustomer" size="md"
                                :errorText="getFormError('activateForNewCustomer')"
                                labelPopoverDescription="Turn on if you want customers to claim this coupon only if they are a new customer (have never placed orders in the past)">
                                <span class="whitespace-nowrap">Activate for new customer</span>
                            </ToogleSwitch>

                            <!-- Activate Using Usage Limit Toggle Switch -->
                            <ToogleSwitch
                                labelPopoverTitle="What Is This?"
                                v-model="form.activateForExistingCustomer" size="md"
                                :errorText="getFormError('activateForExistingCustomer')"
                                labelPopoverDescription="Turn on if you want customers to claim this coupon only if they are an existing customer (have placed orders in the past)">
                                <span class="whitespace-nowrap">Activate for existing customer</span>
                            </ToogleSwitch>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Minimum Grand Total Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingMinimumGrandTotal" size="md"
                                    :errorText="getFormError('activateUsingMinimumGrandTotal')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only after reaching the specified grand total or more">
                                    <span class="whitespace-nowrap">Activate on minimum grand total</span>
                                </ToogleSwitch>

                                <!-- Minimum Grand Total Text Input -->
                                <MoneyInput
                                    label="Grand Total"
                                    v-model="form.minimumGrandTotal"
                                    labelPopoverTitle="What Is This?"
                                    v-if="form.activateUsingMinimumGrandTotal"
                                    :errorText="getFormError('minimumGrandTotal')"
                                    labelPopoverDescription="Set the minimum grand total amount e.g Must have selected items amounting to P50.00 or more">
                                </MoneyInput>

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Minimum Total Products Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingMinimumTotalProducts" size="md"
                                    :errorText="getFormError('activateUsingMinimumTotalProducts')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only after selecting the specified number of different products or more e.g Must have selected 2 different products or more">
                                    <span class="whitespace-nowrap">Activate on minimum total products</span>
                                </ToogleSwitch>

                                <!-- Minimum Total Products Input -->
                                <NumberInput
                                    placeholder="100"
                                    label="Minimum Products"
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.minimumTotalProducts"
                                    v-if="form.activateUsingMinimumTotalProducts"
                                    :errorText="getFormError('minimumTotalProducts')"
                                    labelPopoverDescription="Set the minimum total products e.g Must have selected 2 different products or more">
                                </NumberInput>

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Minimum Total Product Quantities Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingMinimumTotalProductQuantities" size="md"
                                    :errorText="getFormError('activateUsingMinimumTotalProductQuantities')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only after selecting the specified number of product quantities or more e.g Must have selected 10 quantities of all items combined or more">
                                    <span class="whitespace-nowrap">Activate on minimum total product quantities</span>
                                </ToogleSwitch>

                                <!-- Minimum Total Product Quantities Input -->
                                <NumberInput
                                    placeholder="100"
                                    label="Minimum Products"
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.minimumTotalProductQuantities"
                                    :errorText="getFormError('minimumTotalProducts')"
                                    v-if="form.activateUsingMinimumTotalProductQuantities"
                                    labelPopoverDescription="Set the minimum total product quantities e.g Must have selected 10 quantities of all items combined or more">
                                    <template #suffix>%</template>
                                </NumberInput>

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Start Datetime Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingStartDatetime" size="md"
                                    :errorText="getFormError('activateUsingStartDatetime')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only after the specified date has been reached e.g Must have reached 01 Jan 2024">
                                    <span class="whitespace-nowrap">Activate from start datetime</span>
                                </ToogleSwitch>

                                <!-- Start Date Input -->
                                <Datepicker
                                    v-if="form.activateUsingStartDatetime"
                                    v-model="form.startDatetime" :key="form.startDatetime">
                                </Datepicker>

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using End Datetime Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingEndDatetime" size="md"
                                    :errorText="getFormError('activateUsingEndDatetime')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only before the specified date has been reached e.g Must not have reached 01 Feb 2024">
                                    <span class="whitespace-nowrap">Activate from end datetime</span>
                                </ToogleSwitch>

                                <!-- End Date Input -->
                                <Datepicker
                                    v-if="form.activateUsingEndDatetime"
                                    v-model="form.endDatetime" :key="form.endDatetime">
                                </Datepicker>

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Hours Of The Day Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingHoursOfDay" size="md"
                                    :errorText="getFormError('activateUsingHoursOfDay')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only on the specified hours of the day e.g 08:00, 09:00, 10:00, etc">
                                    <span class="whitespace-nowrap">Activate on hours of the day</span>
                                </ToogleSwitch>


                                <!-- Hours Of The Day Input Tags -->
                                <SelectInputTags
                                    v-if="form.activateUsingHoursOfDay"
                                    :tags="form.hoursOfDay" :selectableTags="hoursOfDay" @onTagsChanged="(newValues) => form.hoursOfDay = newValues"
                                    label="Hours Of Day" labelPopoverTitle="What Is This?" :errorText="getFormError('hoursOfDay')"
                                    labelPopoverDescription="Set the hours of the day e.g 08:00, 09:00, 10:00, etc" class="w-full"
                                />

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Days Of The Week Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingDaysOfTheWeek" size="md"
                                    :errorText="getFormError('activateUsingDaysOfTheWeek')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only on the specified days of the week e.g Monday, Tuesday, Wednesday, etc">
                                    <span class="whitespace-nowrap">Activate on days of the week</span>
                                </ToogleSwitch>

                                <!-- Days Of The Week Input Tags -->
                                <SelectInputTags
                                    v-if="form.activateUsingDaysOfTheWeek"
                                    :tags="form.daysOfTheWeek" :selectableTags="daysOfTheWeek" @onTagsChanged="(newValues) => form.daysOfTheWeek = newValues"
                                    label="Days Of The Week" labelPopoverTitle="What Is This?" :errorText="getFormError('daysOfTheWeek')"
                                    labelPopoverDescription="Set the days of the week e.g Monday, Tuesday, Wednesday, etc" class="w-full"
                                />

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Days Of The Month Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingDaysOfTheMonth" size="md"
                                    :errorText="getFormError('activateUsingDaysOfTheMonth')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only on the specified days of the month e.g 01, 02, 03, etc">
                                    <span class="whitespace-nowrap">Activate on days of the month</span>
                                </ToogleSwitch>

                                <!-- Days Of The Month Input Tags -->
                                <SelectInputTags
                                    v-if="form.activateUsingDaysOfTheMonth"
                                    :tags="form.daysOfTheMonth" :selectableTags="daysOfTheMonth" @onTagsChanged="(newValues) => form.daysOfTheMonth = newValues"
                                    label="Days Of The Month" labelPopoverTitle="What Is This?" :errorText="getFormError('daysOfTheMonth')"
                                    labelPopoverDescription="Set the days of the month e.g 01, 02, 03, etc" class="w-full"
                                />

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Months Of The Year Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingMonthsOfTheYear" size="md"
                                    :errorText="getFormError('activateUsingMonthsOfTheYear')"
                                    labelPopoverDescription="Turn on if you want customers to claim this coupon only on the specified months of the year e.g January, February, March, etc">
                                    <span class="whitespace-nowrap">Activate on months of the year</span>
                                </ToogleSwitch>

                                <!-- Months Of The Year Input Tags -->
                                <SelectInputTags
                                    v-if="form.activateUsingMonthsOfTheYear"
                                    :tags="form.monthsOfTheYear" :selectableTags="monthsOfTheYear" @onTagsChanged="(newValues) => form.monthsOfTheYear = newValues"
                                    label="Months Of The Year" labelPopoverTitle="What Is This?" :errorText="getFormError('monthsOfTheYear')"
                                    labelPopoverDescription="Set the months of the year e.g January, February, March, etc" class="w-full"
                                />

                            </div>

                            <div class="flex items-end space-x-8">

                                <!-- Activate Using Usage Limit Toggle Switch -->
                                <ToogleSwitch
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.activateUsingUsageLimit" size="md"
                                    :errorText="getFormError('activateUsingUsageLimit')"
                                    labelPopoverDescription="Turn on if you want to set a usage limit for how many times this coupon can be claimed e.g Must be claimed no more than 10 times">
                                    <span class="whitespace-nowrap">Activate on usage limit</span>
                                </ToogleSwitch>

                                <!-- Remaining Quantity Input -->
                                <NumberInput
                                    placeholder="100"
                                    label="Remaining Quantity"
                                    labelPopoverTitle="What Is This?"
                                    v-model="form.remainingQuantity"
                                    v-if="form.activateUsingUsageLimit"
                                    :errorText="getFormError('remainingQuantity')"
                                    labelPopoverDescription="Set the remaining quantity e.g 10 means that this coupon can only be claimed 10 times">
                                </NumberInput>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="col-span-4">

                    <div class="flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 mb-4 relative">

                        <!-- Loading Backdrop -->
                        <LoadingBackdrop v-if="isLoadingCoupon || isSubmitting" :showSpiningLoader="false" class="rounded-lg"></LoadingBackdrop>

                        <div class="space-y-4">

                            <!-- Active Toggle Switch -->
                            <ToogleSwitch
                                v-model="form.active" size="md"
                                labelPopoverTitle="What Is This?"
                                :errorText="getFormError('active')"
                                labelPopoverDescription="Turn on if you want your coupon to be active (Made available to customers)">
                                Activate Coupon
                            </ToogleSwitch>

                            <!-- Info Alert -->
                            <Alert v-if="!form.active" type="warning">
                                This coupon has been <span class="font-bold">hidden</span> from customers visiting your store. <hr class="my-4">This means that customers will not be able to claim this coupon.
                            </Alert>

                        </div>

                    </div>

                    <div v-if="coupon && hasInstructions" class="flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 relative">

                        <!-- Loading Backdrop -->
                        <LoadingBackdrop v-if="isLoadingCoupon || isSubmitting" :showSpiningLoader="false" class="rounded-lg"></LoadingBackdrop>

                        <!-- Activation Rules Title -->
                        <div class="flex items-center space-x-4 mb-2">
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <p class="font-bold text-lg">Activation Rules</p>
                            </div>

                            <BadgeIndicator type="primary" :text="totalInstructions" :showDot="false"></BadgeIndicator>
                        </div>

                        <!-- Activation Rules Description -->
                        <p class="text-sm text-gray-400 border-b border-dashed pb-2 mb-4">Learn how this coupon will be activated</p>

                        <!-- Save Changes Alert -->
                        <Alert v-if="mustSaveChanges" type="info">
                            Save changes to apply activation rules
                        </Alert>

                        <!-- Instructions -->
                        <div v-else class="space-y-2">
                            <div v-for="(instruction, index) in instructions" :key="index" class="flex space-x-2 px-2 border-l-4 border-green-300">
                                <p class="text-xs">{{ instruction }}</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div v-if="coupon" :class="['space-y-4 shadow-lg rounded-lg border p-4', isLoadingCoupon ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

                <!-- Delete Coupon Info -->
                <p>Do you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>? Once this coupon is deleted you will not be able to recover it.</p>

                <div class="flex justify-end">

                    <ConfirmModal approveText="Delete Coupon" :approveAction="deleteCoupon" :isLoading="isDeleting">

                        <template #content>
                            <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                            <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>?</p>
                        </template>

                        <template #trigger="triggerProps">

                            <!-- Delete Coupon Button - Triggers Confirmation Modal -->
                            <PrimaryButton @click="triggerProps.showModal" :loading="isDeleting" class="w-40" type="danger">
                                Delete Coupon
                            </PrimaryButton>

                        </template>


                    </ConfirmModal>

                </div>

            </div>

        </form>

    </div>

</template>

<script>
    import dayjs from 'dayjs';
    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
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
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import SelectInputTags from '@Partials/inputs/SelectInputTags.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import LoadingBackdrop from '@Partials/backdrops/LoadingBackdrop.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Alert, TextInput, TextHeader, MoneyInput, InputTags, BackButton, NumberInput,
            SelectInput, Datepicker, ConfirmModal, ShineEffect, TextareaInput, PrimaryButton,
            SpiningLoader, LineSkeleton, SelectInputTags, MoreInfoPopover, LoadingBackdrop,
            ToogleSwitch, BadgeIndicator
        },
        data() {
            return {
                form: {
                    name: '',
                    active: true,
                    description: '',

                    /// Offer Discount Information
                    offerDiscount: false,
                    discountType: 'Percentage',
                    discountPercentageRate: '50',
                    discountFixedRate: '50.00',

                    /// Offer Delivery Information
                    offerFreeDelivery: false,

                    /// Code Activation Information
                    activateUsingCode: false,
                    code: this.generateRandomNumber(4),

                    /// Grand Total Activation Information
                    activateUsingMinimumGrandTotal:  false,
                    minimumGrandTotal: '50.00',

                    /// Minimum Total Products Activation Information
                    activateUsingMinimumTotalProducts: false,
                    minimumTotalProducts: '2',

                    /// Minimum Total Product Quantities Activation Information
                    activateUsingMinimumTotalProductQuantities: false,
                    minimumTotalProductQuantities: '2',

                    /// Start Datetime Activation Information
                    activateUsingStartDatetime: false,
                    startDatetime: dayjs().format('DD MMM YYYY'),

                    /// End Datetime Activation Information
                    activateUsingEndDatetime: false,
                    endDatetime: dayjs().add(14, 'day').format('DD MMM YYYY'),

                    /// Hours Of Day Activation Information
                    activateUsingHoursOfDay: false,
                    hoursOfDay: [],

                    /// Days Of The Week Activation Information
                    activateUsingDaysOfTheWeek: false,
                    daysOfTheWeek: [],

                    /// Days Of The Month Activation Information
                    activateUsingDaysOfTheMonth: false,
                    daysOfTheMonth: [],

                    /// Months Of The Year Activation Information
                    activateUsingMonthsOfTheYear: false,
                    monthsOfTheYear: [],

                    /// Usage Activation Information
                    activateUsingUsageLimit: false,
                    remainingQuantity: '100',

                    /// Customer Activation Information
                    activateForExistingCustomer: false,
                    activateForNewCustomer: false,
                },
                coupon: null,
                isDeleting: false,
                originalForm: null,
                isSubmitting: false,
                isLoadingCoupon: false,
                apiState: useApiState(),
                storeState: useStoreState(),

                hoursOfDay: [],
                daysOfTheMonth: [],
                daysOfTheWeek: [
                    {"text": "Monday"},
                    {"text": "Tuesday"},
                    {"text": "Wednesday"},
                    {"text": "Thursday"},
                    {"text": "Friday"},
                    {"text": "Saturday"},
                    {"text": "Sunday"}
                ],
                monthsOfTheYear: [
                    {"text": "January"},
                    {"text": "February"},
                    {"text": "March"},
                    {"text": "April"},
                    {"text": "May"},
                    {"text": "June"},
                    {"text": "July"},
                    {"text": "August"},
                    {"text": "September"},
                    {"text": "October"},
                    {"text": "November"},
                    {"text": "December"}
                ],
            }
        },
        watch: {
            '$route.params.coupon_href'(newValue, oldValue) {

                // Scroll to the top whenever $route.params.coupon_href changes
                window.scrollTo(0, 0);

                //  Get the coupon matching the route coupon_href
                this.getCoupon();

            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isCreating() {
                return this.$route.name === 'create-store-coupon';
            },
            isEditting() {
                return this.$route.name === 'show-store-coupon';
            },
            instructions() {
                return (((this.coupon || {})._attributes || {}).instructions || []);
            },
            hasInstructions() {
                return this.totalInstructions > 0;
            },
            totalInstructions() {
                return this.instructions.length;
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.isEditting && this.formHasChanged && !this.isLoadingCoupon && !this.isSubmitting;
            },
            mustCreate() {
                return this.isCreating && this.formHasChanged && !this.isLoadingCoupon && !this.isSubmitting;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({ name: 'show-store-coupons', params: { 'store_href': this.store._links.showStore } });
            },
            populateHoursOfTheDay() {
                /**
                 *  Generating hours of day e.g 00:00 until 23:00
                 *
                 *  this.hoursOfDay = [
                 *      {
                 *          text: '00:00'
                 *      },
                 *      ...
                 * ];
                 */
                for (let i = 0; i < 24; i++) {
                    this.hoursOfDay.push({
                        text: `${i < 10 ? '0' : ''}${i}:00`
                    });
                }
            },
            populateDaysOfTheMonth() {
                /**
                 *  Generating days of month e.g 01 until 31
                 *
                 *  this.hoursOfDay = [
                 *      {
                 *          text: '01'
                 *      },
                 *      ...
                 * ];
                 */
                for (let i = 1; i <= 31; i++) {
                    this.daysOfTheMonth.push({
                        text: `${i < 10 ? '0' : ''}${i}`
                    });
                }
            },
            setCouponFields() {
                this.form.name = this.coupon.name;
                this.form.active = this.coupon.active.status;
                this.form.description = this.coupon.description;

                // Offer Discount Information
                this.form.offerDiscount = this.coupon.offerDiscount.status;
                this.form.discountType = this.coupon.discountType;
                this.form.discountPercentageRate = this.coupon.discountPercentageRate.value.toString();
                this.form.discountFixedRate = this.covertToValidMoney(this.coupon.discountFixedRate.amountWithoutCurrency);

                // Offer Delivery Information
                this.form.offerFreeDelivery = this.coupon.offerFreeDelivery.status;

                // Code Activation Information
                this.form.activateUsingCode = this.coupon.activateUsingCode.status;
                this.form.code = this.coupon.code;

                // Grand Total Activation Information
                this.form.activateUsingMinimumGrandTotal = this.coupon.activateUsingMinimumGrandTotal.status;
                this.form.minimumGrandTotal = this.covertToValidMoney(this.coupon.minimumGrandTotal.amountWithoutCurrency);

                // Minimum Total Products Activation Information
                this.form.activateUsingMinimumTotalProducts = this.coupon.activateUsingMinimumTotalProducts.status;
                this.form.minimumTotalProducts = this.coupon.minimumTotalProducts.toString();

                // Minimum Total Product Quantities Activation Information
                this.form.activateUsingMinimumTotalProductQuantities = this.coupon.activateUsingMinimumTotalProductQuantities.status;
                this.form.minimumTotalProductQuantities = this.coupon.minimumTotalProductQuantities.toString();

                // Start Datetime Activation Information
                this.form.activateUsingStartDatetime = this.coupon.activateUsingStartDatetime.status;
                this.form.startDatetime = dayjs(this.coupon.startDatetime).format('DD MMM YYYY');

                // End Datetime Activation Information
                this.form.activateUsingEndDatetime = this.coupon.activateUsingEndDatetime.status;
                this.form.endDatetime = dayjs(this.coupon.endDatetime).format('DD MMM YYYY');

                // Hours Of Day Activation Information
                this.form.activateUsingHoursOfDay = this.coupon.activateUsingHoursOfDay.status;
                this.form.hoursOfDay = this.coupon.hoursOfDay.map(hourOfDay => ({ text: hourOfDay }));

                // Days Of The Week Activation Information
                this.form.activateUsingDaysOfTheWeek = this.coupon.activateUsingDaysOfTheWeek.status;
                this.form.daysOfTheWeek = this.coupon.daysOfTheWeek.map(dayOfTheWeek => ({ text: dayOfTheWeek }));

                // Days Of The Month Activation Information
                this.form.activateUsingDaysOfTheMonth = this.coupon.activateUsingDaysOfTheMonth.status;
                this.form.daysOfTheMonth = this.coupon.daysOfTheMonth.map(dayOfTheMonth => ({ text: dayOfTheMonth }));

                // Months Of The Year Activation Information
                this.form.activateUsingMonthsOfTheYear = this.coupon.activateUsingMonthsOfTheYear.status;
                this.form.monthsOfTheYear = this.coupon.monthsOfTheYear.map(monthOfTheYear => ({ text: monthOfTheYear }));

                // Usage Activation Information
                this.form.activateUsingUsageLimit = this.coupon.activateUsingUsageLimit.status;
                this.form.remainingQuantity = this.coupon.remainingQuantity.toString();

                // Customer Activation Information
                this.form.activateForExistingCustomer = this.coupon.activateForExistingCustomer.status;
                this.form.activateForNewCustomer = this.coupon.activateForNewCustomer.status;

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            getCoupon() {

                //  Start loader
                this.isLoadingCoupon = true;

                getApi(this.$route.params.coupon_href).then(response => {

                    if(response.status == 200) {

                        if(response.data.exists) {

                            this.coupon = response.data.coupon;
                            this.setCouponFields();

                        }

                    }

                    //  Stop loader
                    this.isLoadingCoupon = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingCoupon = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            parseForm() {
                var data = cloneDeep(this.form);

                data.hoursOfDay = data.hoursOfDay.map(hourOfDay => hourOfDay.text );
                data.daysOfTheWeek = data.daysOfTheWeek.map(dayOfTheWeek => dayOfTheWeek.text );
                data.daysOfTheMonth = data.daysOfTheMonth.map(dayOfTheMonth => dayOfTheMonth.text );
                data.monthsOfTheYear = data.monthsOfTheYear.map(monthOfTheYear => monthOfTheYear.text );

                return data;
            },
            createCoupon() {

                if(this.form.offerDiscount == false && this.form.offerFreeDelivery == false) {
                    this.setFormError('offerFreeDelivery', 'Specify an offer e.g discount or free delivery');
                    this.notificationState.addWarningNotification('Specify an offer e.g discount or free delivery');
                    return;
                }

                //  Start loader
                this.isSubmitting = true;

                postApi(this.apiState.apiHome['_links']['createCoupon'], this.parseForm()).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Coupon created');

                        //  Navigate to show coupons
                        this.$router.push({ name: 'show-store-coupons', params: { 'store_href': this.store._links.showStore } });

                        // Scroll to the top
                        window.scrollTo(0, 0);

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
            updateCoupon() {

                //  Start loader
                this.isSubmitting = true;

                //  Return product after creation
                this.form.return = true;

                putApi(this.coupon._links.updateCoupon, this.parseForm()).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            this.originalForm = cloneDeep(this.form);

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Coupon updated');

                            this.editMode = false;

                        }else{

                            this.form = cloneDeep(this.originalForm);

                            this.setFormError('general', response.data.message);
                            this.notificationState.addWarningNotification(response.data.message);

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
            deleteCoupon() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.coupon._links.deleteCoupon).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Coupon deleted');

                        //  Navigate to show coupons
                        this.$router.push({ name: 'show-store-coupons', params: { 'store_href': this.store._links.showStore } });

                        // Scroll to the top
                        window.scrollTo(0, 0);

                    }else{

                        this.setFormError('general', response.data.message);
                        this.notificationState.addWarningNotification(response.data.message);

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
            this.populateHoursOfTheDay();
            this.populateDaysOfTheMonth();
        },
        created() {
            this.form.storeId = this.store.id;
            this.originalForm = cloneDeep(this.form);
            if(this.isEditting) this.getCoupon();
        }
    };

</script>
