<template>

    <div v-if="deliveryMethodRequiresSchedule" class="space-y-4 pt-4 px-4">

        <div class="space-y-2">
            <p class="font-bold text-md">Schedule</p>
            <div>
                <p class="text-sm text-gray-500">
                    <template v-if="deliveryMethod.scheduleType == 'date'">
                        <template v-if="isCreating">Specify the delivery date for this order</template>
                        <template v-else>The delivery date for this order</template>
                    </template>
                    <template v-else-if="deliveryMethod.scheduleType == 'date and time'">
                        <template v-if="isCreating">Specify the delivery date and time for this order</template>
                        <template v-else>The delivery date and time for this order</template>
                    </template>
                </p>
            </div>
        </div>

        <div v-if="originalDeliveryDate" class="space-y-2">

            <div class="flex items-center space-x-4">

                <CustomSwitch
                    size="xs"
                    suffixText="Change delivery schedule"
                    v-model="orderForm.schedule.changeDeliverySchedule"
                    @change="orderState.saveStateDebounced(`Change delivery schedule (${ orderForm.schedule.changeDeliverySchedule ? 'On' : 'Off' })`)">
                </CustomSwitch>

                <CustomInput
                    type="checkbox"
                    v-model="orderForm.schedule.showAllDates"
                    v-if="orderForm.schedule.changeDeliverySchedule"
                    :inputLabel="deliveryMethod.scheduleType == 'date' ? 'Show all dates' : 'Show all dates and timeslots'"
                    @change="orderState.saveStateDebounced(`Show all ${ deliveryMethod.scheduleType == 'date' ? 'dates' : 'dates and timeslots' } (${ orderForm.schedule.showAllDates ? 'On' : 'Off' })`)">
                </CustomInput>

            </div>

            <CustomAlert
                type="warning"
                :dismissable="true"
                title="Delivery date passed"
                v-if="orderForm.schedule.changeDeliverySchedule && deliveryDateIsPast"
                description="Update the delivery date to a future date unless the order has already been delivered"
            />

        </div>

        <template v-if="!originalDeliveryDate || (originalDeliveryDate && orderForm.schedule.changeDeliverySchedule)">

            <!-- Date Picker -->
            <div>
                <DeliveryDatePicker
                    :deliveryMethod="deliveryMethod"
                    v-model="orderForm.deliveryDate"
                    @isLoading="onIsLoadingDateOptions"
                    :showAllDates="orderForm.schedule.showAllDates"
                    @change="this.orderState.saveStateDebounced('Delivery date changed')">
                </DeliveryDatePicker>
            </div>

            <!-- Time Picker -->
            <div v-if="orderForm.deliveryDate && !isLoadingDateOptions && deliveryMethod.scheduleType == 'date and time'">
                <DeliveryTimePicker
                    class="w-full"
                    :deliveryMethod="deliveryMethod"
                    v-model="orderForm.deliveryTimeslot"
                    :autoSelectFirstTimeslot="isCreating"
                    :deliveryDate="orderForm.deliveryDate"
                    :showAllDates="orderForm.schedule.showAllDates"
                    :showAllTimeslots="orderForm.schedule.showAllTimeslots"
                    @change="this.orderState.saveStateDebounced('Delivery time changed')">
                </DeliveryTimePicker>
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

        </template>

        <div v-if="orderForm.deliveryDate || orderForm.deliveryTimeslot" class="space-y-2 border-t border-b border-dashed py-4">
            <div v-if="orderForm.deliveryDate" class="text-sm">
                <span>Delivery date: </span>
                <span class="font-bold">
                    {{ orderForm.deliveryDate }} ({{ formattedShortWeekday(orderForm.deliveryDate) }})
                </span>
            </div>

            <div v-if="orderForm.deliveryTimeslot" class="text-sm">
                <span>Delivery time: </span>
                <span class="font-bold">
                    {{ orderForm.deliveryTimeslot }}
                </span>
            </div>
        </div>

    </div>

</template>

<script>

    import { isPastDate } from '@Utils/dateUtils.js';
    import CustomAlert from '@Partials/inputs/CustomAlert.vue';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import { formattedShortWeekday } from '@Utils/dateUtils.js';
    import CustomSwitch from '@Partials/inputs/CustomSwitch.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import DeliveryDatePicker from '@Pages/stores/store/settings/delivery-methods/components/DeliveryDatePicker.vue';
    import DeliveryTimePicker from '@Pages/stores/store/settings/delivery-methods/components/DeliveryTimePicker.vue';

    export default {
        inject: ['orderState'],
        components: {
            CustomAlert, CustomInput, CustomSwitch, LineSkeleton, DeliveryDatePicker, DeliveryTimePicker
        },
        props: {
            index: {
                type: Number
            },
            deliveryMethod: {
                type: Object
            }
        },
        data() {
            return {
                originalDeliveryDate: null,
                isLoadingDateOptions: false,
                originalDeliveryTimeslot: null,
                originalDeliveryDateIsPast: false
            }
        },
        watch: {
            'orderForm.schedule.changeDeliverySchedule'(newVal) {
                if(newVal) {
                    if(this.originalDeliveryDateIsPast && !this.orderForm.schedule.showAllDates) {
                        this.orderForm.deliveryDate = null;
                        this.orderForm.deliveryTimeslot = null;
                    }
                }else{
                    this.orderForm.deliveryDate = this.originalDeliveryDate;
                    this.orderForm.deliveryTimeslot = this.originalDeliveryTimeslot;
                }
            },
            'orderForm.schedule.showAllDates'(newVal) {
                if(newVal) {
                    this.orderForm.deliveryDate = this.originalDeliveryDate;
                    this.orderForm.deliveryTimeslot = this.originalDeliveryTimeslot;
                }else if(this.originalDeliveryDateIsPast) {
                    this.orderForm.deliveryDate = null;
                    this.orderForm.deliveryTimeslot = null;
                }
                this.orderForm.schedule.showAllTimeslots = newVal;
            }
        },
        computed: {
            orderForm() {
                return this.orderState.orderForm;
            },
            shoppingCart() {
                return this.orderState.shoppingCart;
            },
            isEditting() {
                return this.$route.name === 'edit-store-order';
            },
            isCreating() {
                return this.$route.name === 'create-store-order';
            },
            deliveryDateIsPast() {
                return this.orderForm.deliveryDate && isPastDate(this.orderForm.deliveryDate);
            },
            isInspectingShoppingCart() {
                return this.orderState.isInspectingShoppingCart;
            },
            deliveryMethodRequiresSchedule() {
                return this.deliveryMethod.setSchedule;
            },
            deliveryMethodScheduleIncompleteReasons() {
                return (((this.shoppingCart || {}).schedule || {}).incompleteReasons || []);
            },
        },
        methods: {
            formattedShortWeekday: formattedShortWeekday,
            onIsLoadingDateOptions(isLoading) {
                this.isLoadingDateOptions = isLoading;
            }
        },
        created() {
            this.originalDeliveryDate = this.orderForm.deliveryDate;
            this.originalDeliveryTimeslot = this.orderForm.deliveryTimeslot;
            this.originalDeliveryDateIsPast = this.originalDeliveryDate && isPastDate(this.originalDeliveryDate);
        }
    };

</script>
