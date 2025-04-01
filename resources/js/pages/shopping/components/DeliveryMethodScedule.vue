<template>

    <div v-if="deliveryMethodRequiresSchedule" class="border-t-2 bg-gray-50 space-y-4 p-4">

        <div class="space-y-2">
            <p class="font-bold text-md">Schedule</p>
            <div>
                <p class="text-sm text-gray-500">
                    <template v-if="deliveryMethod.scheduleType == 'date'">Specify the delivery date for your order</template>
                    <template v-else-if="deliveryMethod.scheduleType == 'date and time'">Specify the delivery date and time for your order</template>
                </p>
            </div>
        </div>

        <!-- Date Picker -->
        <div>
            <DeliveryDatePicker
                :deliveryMethod="deliveryMethod"
                @isLoading="onIsLoadingDateOptions"
                @scheduleOptions="setScheduleOptions"
                v-model="shoppingCartForm.deliveryDate">
            </DeliveryDatePicker>
        </div>

        <!-- Time Picker -->
        <div v-if="shoppingCartForm.deliveryDate && !isLoadingDateOptions && deliveryMethod.scheduleType == 'date and time'">
            <DeliveryTimePicker
            class="w-full"
                :deliveryMethod="deliveryMethod"
                @isLoading="onIsLoadingTimeOptions"
                @scheduleOptions="setScheduleOptions"
                v-model="shoppingCartForm.deliveryTimeslot"
                :deliveryDate="shoppingCartForm.deliveryDate">
            </DeliveryTimePicker>
        </div>

        <div v-if="shoppingCartForm.deliveryDate || shoppingCartForm.deliveryTimeslot" class="space-y-2 border-t border-dashed pt-4">
            <div v-if="shoppingCartForm.deliveryDate" class="text-sm">
                <span>Delivery date: </span>
                <span class="font-bold">
                    {{ shoppingCartForm.deliveryDate }} ({{ formattedShortWeekday(shoppingCartForm.deliveryDate) }})
                </span>
            </div>

            <div v-if="shoppingCartForm.deliveryTimeslot" class="text-sm">
                <span>Delivery time: </span>
                <span class="font-bold">
                    {{ shoppingCartForm.deliveryTimeslot }}
                </span>
            </div>
        </div>

        <!-- Error Message -->
        <div
            :key="index"
            v-for="(deliveryMethodScheduleIncompleteReason, index) in deliveryMethodScheduleIncompleteReasons">

            <LineSkeleton v-if="isInspectingShoppingCart" width="w-1/3" :shine="true"></LineSkeleton>
            <div v-else class="flex items-center space-x-1 md:space-x-2">
                <svg class="w-4 h-4 md:w-6 md:h-6 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span class="font-medium text-red-500 text-xs md:text-sm">{{ deliveryMethodScheduleIncompleteReason }}</span>
            </div>

        </div>

    </div>

</template>

<script>

    import { formattedShortWeekday } from '@Utils/dateUtils.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import DeliveryDatePicker from '@Pages/stores/store/settings/delivery-methods/components/DeliveryDatePicker.vue';
    import DeliveryTimePicker from '@Pages/stores/store/settings/delivery-methods/components/DeliveryTimePicker.vue';

    export default {
        inject: ['shoppingCartState'],
        components: {
            LineSkeleton, DeliveryDatePicker, DeliveryTimePicker
        },
        data() {
            return {
                scheduleOptions: {},
                showScheduleSummary: true,
                isLoadingDateOptions: false,
                isLoadingTimeOptions: false
            }
        },
        watch: {
            'shoppingCartForm.deliveryDate'() {
                this.inspectStoreShoppingCartWithDelay();
            },
            'shoppingCartForm.deliveryTimeslot'() {
                this.inspectStoreShoppingCartWithDelay();
            }
        },
        computed: {
            shoppingCart() {
                return this.shoppingCartState.shoppingCart;
            },
            deliveryMethod() {
                return this.shoppingCartState.deliveryMethod;
            },
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            },
            isInspectingShoppingCart() {
                return this.shoppingCartState.isInspectingShoppingCart;
            },
            scheduleKeyPoints() {
                return this.scheduleOptions.scheduleKeyPoints || [];
            },
            deliveryMethodRequiresSchedule() {
                return this.deliveryMethod && this.deliveryMethod.setSchedule;
            },
            deliveryMethodScheduleIncompleteReasons() {
                return (((this.shoppingCart || {}).schedule || {}).incompleteReasons || []);
            },
        },
        methods: {
            formattedShortWeekday: formattedShortWeekday,
            inspectStoreShoppingCartWithDelay() {
                return this.shoppingCartState.inspectStoreShoppingCartWithDelay();
            },
            setScheduleOptions(scheduleOptions) {
                this.scheduleOptions = scheduleOptions;
            },
            onIsLoadingDateOptions(isLoading) {
                this.shoppingCartForm.deliveryDate = null;
                this.shoppingCartForm.deliveryTimeslot = null;
                this.isLoadingDateOptions = isLoading;
            },
            onIsLoadingTimeOptions(isLoading) {
                this.shoppingCartForm.deliveryTimeslot = null;
                this.isLoadingTimeOptions = isLoading;
            },
            toggleScheduleSummary() {
                this.showScheduleSummary = !this.showScheduleSummary;
                this.shoppingCartForm.deliveryDate = null;
                this.shoppingCartForm.deliveryTimeslot = null;
            }
        }
    };

</script>
