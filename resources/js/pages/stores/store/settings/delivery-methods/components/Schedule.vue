<template>

    <div :class="[{ 'border border-dashed rounded-lg': form.setSchedule }]">

        <div :class="[{ 'bg-blue-50 p-4 rounded-lg': form.setSchedule }, 'transition-all duration-500']">

            <!-- Set Schedule Toggle Switch -->
            <SetScheduleToogleSwitch :form="form"></SetScheduleToogleSwitch>

            <div :class="[form.setSchedule ? 'h-20 mt-4 mb-2 p-0.5' : 'h-0 mb-0 p-0', 'transition-all duration-500 overflow-hidden']">

                <!-- Schedule Type Select -->
                <ScheduleTypeSelect :form="form"></ScheduleTypeSelect>

            </div>

            <template v-if="form.setSchedule">

                <div class="space-y-4 mb-8">

                    <div v-if="form.scheduleType == 'date and time'" class="flex space-x-8 items-end">

                        <!-- Auto Generate Time Slots Checkbox -->
                        <AutoGenerateTimeSlotsCheckbox :form="form"></AutoGenerateTimeSlotsCheckbox>

                        <div class="flex space-x-1 items-end">

                            <!-- Auto Generate Time Slots Number Input -->
                            <AutoGenerateTimeSlotsNumberInput :form="form"></AutoGenerateTimeSlotsNumberInput>

                            <!-- Auto Generate Time Slots Unit Select -->
                            <AutoGenerateTimeSlotsUnitSelect :form="form"></AutoGenerateTimeSlotsUnitSelect>

                        </div>

                    </div>

                    <p class="text-sm text-gray-500">Set the days and times that customers can expect delivery</p>

                    <!-- Operational Hours -->
                    <OperationalHours :form="form"></OperationalHours>

                </div>

                <div class="space-y-4">

                    <!-- Same Day Delivery Checkbox -->
                    <SameDayDeliveryCheckbox :form="form"></SameDayDeliveryCheckbox>

                    <template v-if="!form.sameDayDelivery">

                        <!-- Require Minimum Notice for Orders Checkbox -->
                        <RequireMinimumNoticeForOrdersCheckbox :form="form"></RequireMinimumNoticeForOrdersCheckbox>

                        <!-- Restrict Minimum Notice for Orders Checkbox -->
                        <RestrictMinimumNoticeForOrdersCheckbox :form="form"></RestrictMinimumNoticeForOrdersCheckbox>

                    </template>

                    <!-- Schedule Summary -->
                    <ScheduleSummary :form="form"></ScheduleSummary>

                </div>

            </template>

        </div>

    </div>

</template>

<script>

    import ScheduleSummary from '@Pages/stores/store/settings/delivery-methods/components/ScheduleSummary.vue';
    import OperationalHours from '@Pages/stores/store/settings/delivery-methods/components/OperationalHours.vue';
    import ScheduleTypeSelect from '@Pages/stores/store/settings/delivery-methods/components/ScheduleTypeSelect.vue';
    import SameDayDeliveryCheckbox from '@Pages/stores/store/settings/delivery-methods/components/SameDayDeliveryCheckbox.vue';
    import SetScheduleToogleSwitch from '@Pages/stores/store/settings/delivery-methods/components/SetScheduleToogleSwitch.vue';
    import AutoGenerateTimeSlotsCheckbox from '@Pages/stores/store/settings/delivery-methods/components/AutoGenerateTimeSlotsCheckbox.vue';
    import AutoGenerateTimeSlotsUnitSelect from '@Pages/stores/store/settings/delivery-methods/components/AutoGenerateTimeSlotsUnitSelect.vue';
    import AutoGenerateTimeSlotsNumberInput from '@Pages/stores/store/settings/delivery-methods/components/AutoGenerateTimeSlotsNumberInput.vue';
    import RequireMinimumNoticeForOrdersCheckbox from '@Pages/stores/store/settings/delivery-methods/components/RequireMinimumNoticeForOrdersCheckbox.vue';
    import RestrictMinimumNoticeForOrdersCheckbox from '@Pages/stores/store/settings/delivery-methods/components/RestrictMinimumNoticeForOrdersCheckbox.vue';

    export default {
        components: {
            ScheduleSummary, OperationalHours, ScheduleTypeSelect, SameDayDeliveryCheckbox, SetScheduleToogleSwitch,
            AutoGenerateTimeSlotsCheckbox, AutoGenerateTimeSlotsUnitSelect, AutoGenerateTimeSlotsNumberInput,
            RequireMinimumNoticeForOrdersCheckbox, RestrictMinimumNoticeForOrdersCheckbox
        },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
