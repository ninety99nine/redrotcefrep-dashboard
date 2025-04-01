<template>

    <div>

        <ShineEffect v-if="isLoading">

            <div class="flex items-center space-x-2">

                <!-- Clock Icon -->
                <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <LineSkeleton width="w-1/2"></LineSkeleton>

            </div>

        </ShineEffect>

        <!-- Timeslot Select Input -->
        <SelectInput
            v-else
            width="w-full"
            v-model="localModelValue">
            <option v-for="(availableTimeSlot, index) in availableTimeSlots" :key="index" :value="availableTimeSlot">{{ availableTimeSlot }}</option>
        </SelectInput>

    </div>

</template>

<script>

    import dayjs from 'dayjs';
    import debounce from 'lodash/debounce';
    import { postApi } from '@Repositories/api-repository.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        inject: ['apiState', 'formState'],
        components: {
            SelectInput, ShineEffect, LineSkeleton
        },
        props: {
            modelValue: {
                type: String,
            },
            form: {
                type: Object,
            },
            deliveryMethod: {
                type: Object,
            },
            deliveryDate: {
                type: String,
            },
            showAllDates: {
                type: Boolean,
                default: false
            },
            showAllTimeslots: {
                type: Boolean,
                default: false
            },
            autoSelectFirstTimeslot: {
                type: Boolean,
                value: true
            }
        },
        emits: ['isLoading', 'update:modelValue', 'change', 'scheduleOptions'],
        data() {
            return {
                isLoading: false,
                apiRequestCounter: 0,
                debounceInstance: null,
                availableTimeSlots: null,
                localModelValue: this.modelValue,
            };
        },
        watch: {
            modelValue(newValue) {
                this.localModelValue = newValue;
            },
            localModelValue(newValue) {
                this.$emit('update:modelValue', newValue);
                this.$emit('change', newValue);
            },
            deliveryDate(newValue) {
                if(newValue) this.debouncedShowDeliveryMethodScheduleOptions();
            }
        },
        methods: {
            setIsLoading(status) {
                this.isLoading = status;
                this.$emit('isLoading', status);
            },
            parseForm() {
                return {
                    showAllDates: this.showAllDates,
                    showAllTimeslots: this.showAllTimeslots,
                    deliveryDate: dayjs(this.deliveryDate).format('YYYY-MM-DD'),
                    scheduleType: this.form ? this.form.scheduleType : this.deliveryMethod.scheduleType,
                    dailyOrderLimit: this.form ? this.form.dailyOrderLimit : this.deliveryMethod.dailyOrderLimit,
                    sameDayDelivery: this.form ? this.form.sameDayDelivery : this.deliveryMethod.sameDayDelivery,
                    operationalHours: this.form ? this.form.operationalHours : this.deliveryMethod.operationalHours,
                    setDailyOrderLimit: this.form ? this.form.setDailyOrderLimit : this.deliveryMethod.setDailyOrderLimit,
                    timeSlotIntervalUnit: this.form ? this.form.timeSlotIntervalUnit : this.deliveryMethod.timeSlotIntervalUnit,
                    autoGenerateTimeSlots: this.form ? this.form.autoGenerateTimeSlots : this.deliveryMethod.autoGenerateTimeSlots,
                    timeSlotIntervalValue: this.form ? this.form.timeSlotIntervalValue : this.deliveryMethod.timeSlotIntervalValue,
                    latestDeliveryTimeValue: this.form ? this.form.latestDeliveryTimeValue : this.deliveryMethod.latestDeliveryTimeValue,
                    earliestDeliveryTimeUnit: this.form ? this.form.earliestDeliveryTimeUnit : this.deliveryMethod.earliestDeliveryTimeUnit,
                    earliestDeliveryTimeValue: this.form ? this.form.earliestDeliveryTimeValue : this.deliveryMethod.earliestDeliveryTimeValue,
                    requireMinimumNoticeForOrders: this.form ? this.form.requireMinimumNoticeForOrders : this.deliveryMethod.requireMinimumNoticeForOrders,
                    restrictMaximumNoticeForOrders: this.form ? this.form.restrictMaximumNoticeForOrders : this.deliveryMethod.restrictMaximumNoticeForOrders,
                };
            },
            showDeliveryMethodScheduleOptions() {

                const currentRequest = ++this.apiRequestCounter;

                postApi(this.apiState.apiHome['_links']['showDeliveryMethodScheduleOptions'], this.parseForm())
                    .then((response) => {
                        if (currentRequest !== this.apiRequestCounter) {
                            return;
                        }

                        if (response.status == 200) {
                            const scheduleOptions = response.data;
                            this.availableTimeSlots = scheduleOptions.availableTimeSlots;

                            if (this.autoSelectFirstTimeslot && this.availableTimeSlots.length && !this.availableTimeSlots.includes(this.localModelValue)) {
                                this.localModelValue = this.availableTimeSlots[0];
                            }

                            this.$emit('scheduleOptions', scheduleOptions);
                        }

                        // Stop loader
                        this.setIsLoading(false);
                    })
                    .catch((errorException) => {
                        // Stop loader
                        this.setIsLoading(false);

                        this.formState.setServerFormErrors(errorException);
                    });
            },
            debouncedShowDeliveryMethodScheduleOptions() {
                // If debounce instance already exists, cancel it
                if (this.debounceInstance) {
                    this.debounceInstance.cancel();
                }

                this.setIsLoading(true);
                this.availableTimeSlots = [];

                // Create a new debounce instance
                this.debounceInstance = debounce(() => {
                    this.showDeliveryMethodScheduleOptions(); // Execute request
                }, 1000);

                // Trigger the debounce function
                this.debounceInstance();
            },
            debouncedShowDeliveryMethodScheduleOptions: function() {
                this.setIsLoading(true);
                this.availableTimeSlots = [];
                debounce(function() {
                    this.showDeliveryMethodScheduleOptions();
                }.bind(this), 1000)();
            }
        },
        created() {
            // Start loader
            this.setIsLoading(true);
            this.showDeliveryMethodScheduleOptions();
        },
    };
</script>
