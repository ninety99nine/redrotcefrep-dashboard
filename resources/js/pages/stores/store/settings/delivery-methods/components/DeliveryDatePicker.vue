<template>

    <div>

        <ShineEffect v-if="isLoading">

            <div class="flex items-center space-x-2">

                <!-- Calendar Icon -->
                <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>

                <LineSkeleton width="w-1/2"></LineSkeleton>

            </div>

        </ShineEffect>

        <!-- Datepicker -->
        <Datepicker
            v-else
            :key="key"
            v-model="localModelValue"
            :minDate="showAllDates ? null : minDate"
            :maxDate="showAllDates ? null : maxDate"
            @change="(value) => $emit('change', value)"
            :datesDisabled="showAllDates ? [] : datesDisabled"
            :daysOfWeekDisabled="showAllDates ? [] : daysOfWeekDisabled">
        </Datepicker>

    </div>

</template>

<script>

    import debounce from 'lodash/debounce';
    import { formattedDate } from '@Utils/dateUtils.js';
    import { postApi } from '@Repositories/api-repository.js';
    import Datepicker from '@Partials/datepicker/Datepicker.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        inject: ['apiState', 'formState'],
        components: {
            Datepicker, ShineEffect, LineSkeleton
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
            showAllDates: {
                type: Boolean,
                default: false
            }
        },
        emits: ['isLoading', 'update:modelValue', 'change', 'scheduleOptions'],
        data() {
            return {
                minDate: null,
                maxDate: null,
                isLoading: false,
                datesDisabled: [],
                apiRequestCounter: 0,
                daysOfWeekDisabled: [],
                debounceInstance: null,
                localModelValue: this.modelValue,
            };
        },
        watch: {
            modelValue(newValue) {
                this.localModelValue = newValue;
            },
            localModelValue(newValue) {
                this.$emit('update:modelValue', newValue);
            },
            ...[
                'scheduleType',
                'dailyOrderLimit',
                'sameDayDelivery',
                'setDailyOrderLimit',
                'timeSlotIntervalUnit',
                'autoGenerateTimeSlots',
                'timeSlotIntervalValue',
                'latestDeliveryTimeValue',
                'earliestDeliveryTimeUnit',
                'earliestDeliveryTimeValue',
                'requireMinimumNoticeForOrders',
                'restrictMaximumNoticeForOrders',
            ].reduce((watchers, field) => {
                watchers[`form.${field}`] = function () {
                    this.debouncedShowDeliveryMethodScheduleOptions();
                };
                return watchers;
            }, {}),
            'form.operationalHours': {
                handler() {
                    this.debouncedShowDeliveryMethodScheduleOptions();
                },
                deep: true,
            },
        },
        computed: {
            key() {
                return (
                    this.minDate +
                    this.maxDate +
                    this.showAllDates +
                    this.datesDisabled.length +
                    this.daysOfWeekDisabled.length
                );
            },
        },
        methods: {
            formattedDate: formattedDate,
            setIsLoading(status) {
                this.isLoading = status;
                this.$emit('isLoading', status);
            },
            parseForm() {
                return {
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
                            this.minDate = this.formattedDate(scheduleOptions.minDate);
                            this.daysOfWeekDisabled = scheduleOptions.daysOfWeekDisabled;
                            this.datesDisabled = scheduleOptions.datesDisabled.map((date) => this.formattedDate(date));
                            this.maxDate = scheduleOptions.maxDate ? this.formattedDate(scheduleOptions.maxDate) : null;

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

                // Start loader
                this.setIsLoading(true);

                // Create a new debounce instance
                this.debounceInstance = debounce(() => {
                    this.showDeliveryMethodScheduleOptions(); // Execute request
                }, 1000);

                // Trigger the debounce function
                this.debounceInstance();
            },
        },
        created() {
            // Start loader
            this.setIsLoading(true);
            this.showDeliveryMethodScheduleOptions();
        },
    };
</script>
