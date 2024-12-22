<template>
    <div>

        <!-- Tools -->
        <div class="flex justify-end space-x-2 p-4 border rounded-lg bg-white">
            <BadgeIndicator type="primary" text="+ Bulk Add Timeslots" :showDot="false" :clickable="true" :action="showBulkAddTimeslotsModal"></BadgeIndicator>
            <BadgeIndicator type="primary" text="Reset Timeslots" :showDot="false" :clickable="true" :action="showBulkResetTimeslotsModal"></BadgeIndicator>
        </div>

        <div v-for="(operationalHour, index) in form.operationalHours" :key="index" :class="[{ 'border-t' : index != 0 }, index == form.operationalHours.length - 1 ? 'border-b pb-4' : 'pb-4', 'border-blue-200 border-dashed hover:bg-blue-100 pt-4 grid grid-cols-2 gap-4 items-start']">

            <div class="col-span-1 flex items-center space-x-2">

                <!-- Checkbox -->
                <Checkbox v-model="operationalHour.available" size="xs" class="mt-1"></Checkbox>

                <!-- Day -->
                <span>{{ days[index] }}</span>

            </div>

            <div v-if="operationalHour.available" class="col-span-1 space-y-2">

                <div v-for="(hour, index2) in operationalHour.hours" :key="index2">

                    <div class="flex items-center space-x-2">
                        <!-- Start & End Time Inputs -->
                        <TimeInput v-model="form.operationalHours[index].hours[index2][0]" :errorText="getFormError('operationalHours'+index+'Hours'+index2+'0')" class="w-24"></TimeInput>
                        <span>-</span>
                        <TimeInput v-model="form.operationalHours[index].hours[index2][1]" :errorText="getFormError('operationalHours'+index+'Hours'+index2+'1')" class="w-24"></TimeInput>

                        <!-- Add Operational Hour Icon -->
                        <div v-if="index2 == 0" @click="() => addOperationalHour(index)" class="flex-shrink-0 cursor-pointer rounded-md border border-blue-200 p-1 hover:bg-blue-100 transition-all">
                            <svg class="w-4 h-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>

                        <!-- Remove Operational Hour Icon -->
                        <div v-else @click="() => removeOperationalHour(index, index2)" class="flex-shrink-0 cursor-pointer rounded-md border p-1 bg-red-50 hover:bg-red-100 transition-all">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                            </svg>
                        </div>

                    </div>

                </div>

                <div class="flex space-x-1 items-center mt-2">

                    <!-- Total Timeslots Badge -->
                    <BadgeIndicator
                        type="success"
                        :showDot="false"
                        class="border border-green-200"
                        :text="timeslots[index].length+' '+(timeslots[index].length == 1 ? 'timeslot' : 'timeslots')">
                    </BadgeIndicator>

                    <!-- Timeslot Options -->
                    <MoreInfoPopover :title="days[index]+' timeslots'" placement="top">
                        <template #description>
                            <div class="space-y-2 border-t border-dashed pt-2 mt-2">
                                <p v-for="(timeslot, index) in timeslots[index]" :key="index" class="flex space-x-2 px-2 border-l-4 border-green-300">
                                    {{ timeslot }}
                                </p>
                            </div>
                        </template>
                    </MoreInfoPopover>
                </div>

            </div>

        </div>

        <!-- Bulk Add Timeslots -->
        <ConfirmModal approveText="Add Timeslots" :approveAction="(hideModal) => bulkAddTimeslots(hideModal)" :approveDisabled="hours.length == 0" approveType="primary">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Bulk Add Timeslots</p>
                <p class="text-sm mb-4">Set the timeslots to be created</p>

                <!-- Timeslots -->
                <div class="space-y-2 mb-8">
                    <div v-for="(hour, index) in hours" :key="index">

                        <div class="flex items-center space-x-2 mb-4">

                            <!-- Start & End Time Inputs -->
                            <TimeInput v-model="hours[index][0]" class="w-24"></TimeInput>
                            <span>-</span>
                            <TimeInput v-model="hours[index][1]" class="w-24"></TimeInput>

                            <!-- Add Hour Icon -->
                            <div v-if="index == 0" @click="() => addHour()" class="flex-shrink-0 cursor-pointer rounded-md border border-blue-200 p-1 hover:bg-blue-100 transition-all">
                                <svg class="w-4 h-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>

                            <!-- Remove Hour Icon -->
                            <div v-else @click="() => removeHour(index)" class="flex-shrink-0 cursor-pointer rounded-md border p-1 bg-red-50 hover:bg-red-100 transition-all">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                </svg>
                            </div>

                        </div>

                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div v-for="(availableDay, index) in availableDays" :key="index">

                            <!-- Day Checkbox -->
                            <Checkbox
                                size="xs"
                                v-model="availableDay.selected"
                                :disabled="availableDay.selected && totalSelectedDays === 1">
                                <span class="ml-1">{{ availableDay.name }}</span>
                            </Checkbox>

                        </div>
                    </div>

                </div>

            </template>

            <template #trigger="triggerProps">

                <!-- Bulk Add Timeslots Button - Triggers Confirmation Modal -->
                <PrimaryButton ref="bulkAddTimeslotsButton" @click="triggerProps.showModal" class="hidden" type="primary"></PrimaryButton>

            </template>

        </ConfirmModal>

        <!-- Bulk Reset Timeslots -->
        <ConfirmModal approveText="Reset Timeslots" :approveAction="(hideModal) => bulkResetTimeslots(hideModal)" approveType="primary">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Bulk Reset Timeslots</p>

                <div class="flex items-center space-x-2 mb-4">

                    <!-- Start & End Time Inputs -->
                    <TimeInput v-model="defaultTimeslot[0]" class="w-24"></TimeInput>
                    <span>-</span>
                    <TimeInput v-model="defaultTimeslot[1]" class="w-24"></TimeInput>

                </div>

                <p class="text-sm mb-4">Select days to reset timeslots</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div v-for="(availableDay, index) in availableDays" :key="index">

                        <!-- Day Checkbox -->
                        <Checkbox
                            size="xs"
                            v-model="availableDay.selected"
                            :disabled="availableDay.selected && totalSelectedDays === 1">
                            <span class="ml-1">{{ availableDay.name }}</span>
                        </Checkbox>

                    </div>
                </div>

            </template>

            <template #trigger="triggerProps">

                <!-- Bulk Reset Timeslots Button - Triggers Confirmation Modal -->
                <PrimaryButton ref="bulkResetTimeslotsButton" @click="triggerProps.showModal" class="hidden" type="primary"></PrimaryButton>

            </template>

        </ConfirmModal>

    </div>

</template>

<script>

    import cloneDeep from 'lodash/cloneDeep';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import TimeInput from '@Partials/inputs/TimeInput.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        mixins: [FormMixin],
        components: {
            TimeInput, Checkbox, ConfirmModal, PrimaryButton, MoreInfoPopover, BadgeIndicator
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                hours: [],
                availableDays: [],
                defaultTimeslot: ['08:00', '16:00'],
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            }
        },
        watch: {
            'form.autoGenerateTimeSlots'(newValue, oldValue) {

                if(newValue) {

                    const totalAutoGeneratedTimeslots = this.timeslots.map((day) => day.length).reduce((sum, length) => sum + length, 0);
                    const totalUserProvidedTimeslots = this.form.operationalHours.map((day) => day.hours.length).reduce((sum, length) => sum + length, 0);
                    const totalDiff = totalAutoGeneratedTimeslots - totalUserProvidedTimeslots;

                    /**
                     *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                     */
                    this.showSuccessfulNotification(`Added ${totalDiff} ${totalDiff == 1 ? 'timeslot' : 'timeslots'}`);

                }

            }
        },
        computed: {
            totalSelectedDays() {
                return this.availableDays.filter((availableDay) => availableDay.selected).length;
            },
            timeslots() {
                const timeslots = [];

                // Helper function to parse time into minutes since midnight
                const timeToMinutes = (time) => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes;
                };

                // Helper function to convert minutes back to a readable time format
                const minutesToTime = (minutes) => {
                    const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
                    const mins = (minutes % 60).toString().padStart(2, '0');
                    return `${hours}:${mins}`;
                };

                // Iterate over the operational hours for each day
                this.form.operationalHours.forEach((day, index) => {
                    const dayTimeslots = new Set();  // Using a Set to avoid duplicates

                    if(day.available) {
                        day.hours.forEach((range) => {
                            const [startTime, endTime] = range;
                            const [startTimeInMinutes, endTimeInMinutes] = range.map(timeToMinutes);

                            if(this.form.autoGenerateTimeSlots) {
                                // Generate timeslots based on the selected interval if autoGenerateTimeSlots is true
                                const interval = this.form.timeSlotIntervalUnit === 'hour'
                                    ? this.form.timeSlotIntervalValue * 60
                                    : this.form.timeSlotIntervalValue;

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

                                    // Add the formatted timeslot to the Set (no duplicates)
                                    dayTimeslots.add(`${currentStartTime} - ${currentEndTime}`);
                                }
                            } else {
                                // If autoGenerateTimeSlots is false, use the existing timeslots without modification
                                dayTimeslots.add(`${startTime} - ${endTime}`);
                            }
                        });
                    }

                    // Convert the Set to an array and sort the timeslots in order (from earliest to latest)
                    const sortedTimeslots = [...dayTimeslots].sort((a, b) => {
                        const [startA] = a.split(' - ');
                        const [startB] = b.split(' - ');
                        return timeToMinutes(startA) - timeToMinutes(startB);
                    });

                    // Push the day's sorted timeslots to the main timeslot array
                    timeslots.push(sortedTimeslots);
                });

                return timeslots;
            },
        },
        methods: {
            addHour() {
                this.hours.push(cloneDeep(this.defaultTimeslot));
            },
            removeHour(index) {
                this.hours.splice(index, 1);
            },
            addOperationalHour(index) {
                this.form.operationalHours[index].hours.push(cloneDeep(this.defaultTimeslot));
            },
            removeOperationalHour(index, index2) {
                this.form.operationalHours[index].hours.splice(index2, 1);
            },
            showBulkAddTimeslotsModal() {

                if(this.hours.length == 0) {
                    this.addHour();
                }

                this.$nextTick(() => {
                    this.$refs.bulkAddTimeslotsButton.$el.click();
                });
            },
            showBulkResetTimeslotsModal() {
                this.$nextTick(() => {
                    this.$refs.bulkResetTimeslotsButton.$el.click();
                });
            },
            bulkAddTimeslots(hideModal) {

                // Remove duplicates from this.hours (array of arrays)
                const uniqueHours = Array.from(
                    new Set(this.hours.map((range) => JSON.stringify(range)))
                ).map((range) => JSON.parse(range));


                this.form.operationalHours.forEach((day, index) => {

                    if(this.availableDays[index].selected) {
                        day.hours = cloneDeep(uniqueHours);
                    }

                    if(this.availableDays[index].selected && !day.available) {
                        day.available = true;
                    }
                });

                /**
                 *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                 */
                this.showSuccessfulNotification('Timeslots added');

                hideModal();
            },
            bulkResetTimeslots(hideModal) {

                this.form.operationalHours.forEach((day, index) => {

                    if(this.availableDays[index].selected) {
                        day.hours = [cloneDeep(this.defaultTimeslot)];
                    }

                    if(this.availableDays[index].selected && !day.available) {
                        day.available = true;
                    }
                });

                /**
                 *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                 */
                this.showSuccessfulNotification('Timeslots reset');

                hideModal();
            },
        },
        created() {
            this.availableDays = this.form.operationalHours.map((day, index) => {
                return {
                    name: this.days[index],
                    selected: true
                };
            });
        }
    };

</script>
