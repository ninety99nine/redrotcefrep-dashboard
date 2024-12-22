<template>

    <div class="bg-white border rounded-lg space-y-4">

        <!-- Schedule Summary -->
        <div @click="showScheduleSummary = !showScheduleSummary" :class="['space-y-2 p-4 cursor-pointer rounded-lg hover:bg-gray-50', { 'border-b border-dashed pb-4' : showScheduleSummary }]">

            <div :class="['flex justify-between', { 'mb-4' : showScheduleSummary }]">
                <p class="font-bold text-md">Schedule Summary</p>

                <div class="hover:text-gray-500 active:text-gray-400">
                    <svg v-if="showScheduleSummary" class="w-6 h-6 cursor-pointer" @click="showScheduleSummary = false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                    <svg v-else @click="showScheduleSummary = true" class="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>

            </div>

            <template v-if="showScheduleSummary">
                <div v-for="(scheduleKeyPoint, index) in scheduleKeyPoints" :key="index" class="flex space-x-2 px-2 border-l-4 border-green-300">
                    <p class="text-xs">{{ scheduleKeyPoint }}</p>
                </div>
            </template>
        </div>

        <div v-if="showScheduleSummary" class="space-y-4 px-4 pb-4">

            <p class="font-bold text-md mb-2">Test Schedule</p>
            <div>
                <p class="text-sm text-gray-500">This is how the delivery days<template v-if="form.scheduleType == 'date and time'"> and times</template> will appear for customers shopping today.</p>
                <p class="text-sm text-gray-500">Go ahead and try it! 🫣</p>
            </div>

            <!-- Test Date Datepicker -->
            <Datepicker
                :minDate="minDate"
                :maxDate="maxDate"
                v-model="testDate"
                :datesDisabled="datesDisabled"
                :daysOfWeekDisabled="daysOfWeekDisabled"
                :key="daysOfWeekDisabled.length+datesDisabled.length+minDate+maxDate">
            </Datepicker>

            <p v-if="testDate" class="text-sm text-green-500">Your order will be delivered on <span class="font-bold">{{ testDate }} ({{ customFormattedDate(testDate, 'ddd') }})</span>, just {{ formattedRelativeDate(testDate, true) }} from now.</p>

            <!-- Test Timeslots -->
            <template v-if="form.scheduleType == 'date and time'">
                <div class="border rounded-lg">
                    <div class="flex space-x-2 font-bold text-sm p-4">
                        <span>Available Delivery Time<template v-if="availableTimeSlots.length != 1">s</template></span>
                        <BadgeIndicator type="info" :text="availableTimeSlots.length+' '+(availableTimeSlots.length == 1 ? 'option' : 'options')" :showDot="false"></BadgeIndicator>
                    </div>
                    <div class="overflow-y-auto max-h-60 border-t">
                        <p v-for="(availableTimeSlot, index) in availableTimeSlots" :key="index" class="text-sm text-gray-500 hover:bg-gray-100 p-4">
                            {{ availableTimeSlot }}
                        </p>
                        <p v-if="availableTimeSlots.length == 0" class="text-sm text-gray-500 p-4">
                            <template v-if="testDate">
                                No delivery times available for {{ testDate }}
                            </template>
                            <template v-else>Pick a date to see available delivery times</template>
                        </p>
                    </div>
                </div>
            </template>

        </div>

    </div>

</template>

<script>

    import dayjs from 'dayjs';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import Datepicker from '@Partials/datepicker/Datepicker.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        mixins: [UtilsMixin],
        components: {
            Datepicker, BadgeIndicator
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                testDate: null,
                testTime: null,
                showScheduleSummary: true,
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            }
        },
        computed: {
            minDate() {
                const today = new Date();

                if(this.form.requireMinimumNoticeForOrders && this.form.earliestDeliveryTimeValue > 0) {

                    const minDate = dayjs(today).add(
                        this.form.earliestDeliveryTimeValue,
                        this.form.scheduleType == 'date' ? 'day' : this.form.earliestDeliveryTimeUnit
                    );

                    if(minDate.isAfter(today)) {
                        return this.formattedDate(minDate);
                    }

                }

                return this.formattedDate(dayjs(today));
            },
            maxDate() {
                if(!this.form.restrictMaximumNoticeForOrders || this.form.latestDeliveryTimeValue == 0) return null;

                const today = new Date();
                const maxDate = dayjs(today).add(this.form.latestDeliveryTimeValue, 'day');

                return this.formattedDate(maxDate);
            },
            datesDisabled() {
                const today = new Date();
                const dayOfWeek = today.getDay();

                // Get operational hours for today
                const operationalHours = this.form.operationalHours[dayOfWeek];

                // If today is marked unavailable, disable it
                if(!operationalHours?.available) {
                    return [this.formattedDate(today)];
                }

                // Check if the current time falls within the supported time slots
                const currentTime = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
                const isWithinTimeSlot = operationalHours.hours.some(([startTime, endTime]) => {
                    return currentTime >= startTime && currentTime <= endTime;
                });

                // If no valid time slots, disable today
                if(!isWithinTimeSlot) {
                    return [this.formattedDate(today)];
                }

                // If today is supported, return an empty array
                return [];
            },
            daysOfWeekDisabled() {
                return this.form.operationalHours.map((day, index) => (!day.available ? index : null)).filter(index => index !== null);
            },
            availableTimeSlots() {

                // Ensure the selected date is valid
                if(!this.testDate) {
                    return [];
                }

                const now = dayjs();

                // Parse the selected date with Day.js
                const selectedDate = dayjs(this.testDate);

                // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
                const dayOfWeek = selectedDate.day();

                // Retrieve operational hours for the given day of the week
                const operationalHours = this.form.operationalHours[dayOfWeek];

                // Return an empty array if there are no operational hours
                if(!operationalHours.available || operationalHours.hours.length === 0) {
                    return [];
                }

                // Helper: Parse time into minutes since midnight
                const timeToMinutes = (time) => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes;
                };

                // Helper: Convert minutes back to a readable time format
                const minutesToTime = (minutes) => {
                    const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
                    const mins = (minutes % 60).toString().padStart(2, '0');
                    return `${hours}:${mins}`;
                };

                // Create a Set to store unique timeslots
                const uniqueTimeSlots = new Set();

                // Iterate over the operational hours for the chosen day
                operationalHours.hours.forEach((range) => {

                    const today = new Date();
                    const [startTime, endTime] = range;
                    const [startTimeInMinutes, endTimeInMinutes] = range.map(timeToMinutes);

                    // Generate timeslots based on the configuration
                    if(this.form.autoGenerateTimeSlots) {

                        const interval =
                            this.form.timeSlotIntervalUnit === 'hour'
                                ? parseInt(this.form.timeSlotIntervalValue) * 60
                                : parseInt(this.form.timeSlotIntervalValue);

                        for (let currentStartTimeInMinutes = startTimeInMinutes; currentStartTimeInMinutes + interval <= endTimeInMinutes; currentStartTimeInMinutes += interval) {

                            const currentEndTimeInMinutes = currentStartTimeInMinutes + interval;
                            const currentStartTime = minutesToTime(currentStartTimeInMinutes);

                            let currentEndTime;
                            const isLastItem = currentStartTimeInMinutes + interval >= endTimeInMinutes;

                            if(isLastItem) {
                                // For the last item, use the full end time
                                currentEndTime = minutesToTime(currentEndTimeInMinutes);
                            } else {
                                // For other items, use the end time minus 1 minute
                                currentEndTime = minutesToTime(currentEndTimeInMinutes - 1);
                            }

                            const endAt = dayjs(`${selectedDate.format('YYYY-MM-DD')} ${currentEndTime}`, 'YYYY-MM-DD HH:mm');

                            // Do not consider the timeslot if the timeslot is not in the past
                            if(endAt.isBefore(now)) {
                                continue;
                            }

                            if(this.form.requireMinimumNoticeForOrders && this.form.earliestDeliveryTimeValue > 0) {

                                const minDate = dayjs(today).add(
                                    this.form.earliestDeliveryTimeValue,
                                    this.form.scheduleType == 'date' ? 'day' : this.form.earliestDeliveryTimeUnit
                                );

                                // Do not consider the timeslot if the timeslot is not in the past of the minimum notice for orders
                                if(endAt.isBefore(minDate)) {
                                    continue;
                                }

                            }

                            // Add the timeslot to the Set (duplicates will be ignored)
                            uniqueTimeSlots.add(`${currentStartTime} - ${currentEndTime}`);

                        }

                    } else {

                        const endAt = dayjs(`${selectedDate.format('YYYY-MM-DD')} ${endTime}`, 'YYYY-MM-DD HH:mm');

                        // Ensure the timeslot is not in the past
                        if(endAt.isAfter(now)) {
                            uniqueTimeSlots.add(`${startTime} - ${endTime}`);
                        }

                    }

                });

                // Convert the Set to an array and sort the timeslots in order (from earliest to latest)
                const sortedTimeSlots = [...uniqueTimeSlots].sort((a, b) => {
                    const [startA] = a.split(' - ');
                    const [startB] = b.split(' - ');
                    return timeToMinutes(startA) - timeToMinutes(startB);
                });

                // Return the sorted timeslots
                return sortedTimeSlots;
            },
            scheduleKeyPoints() {

                let explanations = [];

                const availableDays = this.form.operationalHours.map((day, index) => (day.available ? this.days[index] : null)).filter(day => day !== null);

                if(availableDays.length == 0) {
                    explanations.push('Orders are allowed on any day of the week' );
                }else if(availableDays.length == 7) {
                    explanations.push('Orders are allowed on all days of the week' );
                }else{
                    const formattedDays = availableDays.length > 1
                        ? availableDays.slice(0, -1).join(', ') + ' and ' + availableDays.slice(-1)
                        : availableDays[0];

                    explanations.push(`Orders are allowed on ${availableDays.length} ${availableDays.length === 1 ? 'day' : 'days'} of the week: ${formattedDays}`);
                }

                if(this.form.scheduleType == 'date') {
                    explanations.push('Customers must specify only date without the time for delivery');
                }else{
                    explanations.push('Customers must specify both date and time for delivery');
                }

                if(this.form.scheduleType == 'date and time' && this.form.autoGenerateTimeSlots) {
                    explanations.push(`Auto generate additional time options between the specified timeslots for each day of the week`);
                }

                if(this.form.requireMinimumNoticeForOrders && this.form.earliestDeliveryTimeValue > 0) {

                    if(this.form.scheduleType == 'date' || (this.form.scheduleType == 'date and time' && this.form.earliestDeliveryTimeUnit == 'day')) {
                        explanations.push(`Orders must be placed at least ${this.form.earliestDeliveryTimeValue} ${this.form.earliestDeliveryTimeValue == 1 ? 'day' : 'days'} before the delivery date (${this.form.earliestDeliveryTimeValue} ${this.form.earliestDeliveryTimeValue == 1 ? 'day' : 'days'} notice)`);
                    }else{
                        explanations.push(`Orders must be placed at least ${this.form.earliestDeliveryTimeValue} ${this.form.earliestDeliveryTimeValue == 1 ? 'hour' : 'hours'} before the delivery date (${this.form.earliestDeliveryTimeValue} ${this.form.earliestDeliveryTimeValue == 1 ? 'hour' : 'hours'} notice)`);
                    }

                }

                if(this.form.restrictMaximumNoticeForOrders && this.form.latestDeliveryTimeValue > 0) {
                    explanations.push(`Orders cannot be scheduled for delivery more than ${this.form.latestDeliveryTimeValue} ${this.form.latestDeliveryTimeValue == 1 ? 'day' : 'days'} in advance`);
                }

                return explanations;
            },
        }
    };

</script>
