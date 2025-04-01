<template>

    <div class="bg-white mb-4 p-8 rounded-lg space-y-4">

        <h1 class="flex items-center font-lg font-bold">
            <svg class="w-6 h-6 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Opening Hours</span>
        </h1>

        <p class="text-sm text-gray-500">Set your store's operating hours, including availability and time slots for each day. Indicate if the store is open or closed on any specific day.</p>

        <!-- Show Opening Hours Toggle Switch -->
        <ShowOpeningHoursToggleSwitch></ShowOpeningHoursToggleSwitch>

        <template v-if="storeForm.showOpeningHours">

            <!-- Allow Checkout On Closed Hours Toggle Switch -->
            <AllowCheckoutOnClosedHoursToggleSwitch></AllowCheckoutOnClosedHoursToggleSwitch>

            <Alert v-if="!storeForm.allowCheckoutOnClosedHours" type="warning" class="flex items-center space-x-2">
                <svg class="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <span>Customers cannot place orders during closed hours</span>
            </Alert>

            <div v-for="(openingHour, index) in storeForm.openingHours" :key="index" class="border-t border-dashed pt-4 grid grid-cols-2 gap-4 items-start">

                <div class="col-span-1 flex items-center space-x-2">

                    <!-- Checkbox -->
                    <Checkbox v-model="openingHour.available" size="xs" class="mt-1"></Checkbox>

                    <!-- Day -->
                    <span>{{ days[index] }}</span>

                </div>

                <div class="col-span-1 space-y-2">

                    <div v-for="(hour, index2) in openingHour.hours" :key="index2">
                        <div class="flex items-center space-x-2">

                            <!-- Time Input -->
                            <TimeInput v-model="hour[0]" :errorText="formState.getFormError('openingHours')" class="w-24"></TimeInput>
                            <span>-</span>
                            <TimeInput v-model="hour[1]" :errorText="formState.getFormError('openingHours')" class="w-24"></TimeInput>

                            <div v-if="index2 == 0" @click="() => addOpeningHour(index)" class="flex-shrink-0 cursor-pointer rounded-md border p-1 hover:bg-blue-50 transition-all">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>

                            <div v-else @click="() => removeOpeningHour(index, index2)" class="flex-shrink-0 cursor-pointer rounded-md border p-1 bg-red-50 hover:bg-red-100 transition-all">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                </svg>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </template>

    </div>

</template>

<script>

    import Alert from '@Partials/alerts/Alert.vue';
    import TimeInput from '@Partials/inputs/TimeInput.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import ShowOpeningHoursToggleSwitch from '@Pages/stores/store/settings/general/components/ShowOpeningHoursToggleSwitch.vue';
    import AllowCheckoutOnClosedHoursToggleSwitch from '@Pages/stores/store/settings/general/components/AllowCheckoutOnClosedHoursToggleSwitch.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: {
            Alert, TimeInput, Checkbox, ShowOpeningHoursToggleSwitch, AllowCheckoutOnClosedHoursToggleSwitch
        },
        data() {
            return {
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            }
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        },
        methods: {
            addOpeningHour(index) {
                this.storeForm.openingHours[index].hours.push(['08:00', '16:00']);
            },
            removeOpeningHour(index, index2) {
                this.storeForm.openingHours[index].hours.splice(index2, 1);
            },
        }
    };

</script>
