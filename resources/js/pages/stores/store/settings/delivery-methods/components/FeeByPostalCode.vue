<template>

    <div class="space-y-4">

        <h1 class="text-md font-bold m-2">Zones</h1>

        <div v-for="(postalCodeZone, index) in form.postalCodeZones" :key="index" class="relative bg-gray-50 p-4 border rounded-lg">

            <div class="absolute top-2 right-2 flex items-center space-x-2">

                <svg class="w-6 h-6 cursor-pointer hover:opacity-50" @click="form.postalCodeZones[index].isEditable = !form.postalCodeZones[index].isEditable" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path v-if="form.postalCodeZones[index].isEditable" stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

                <!-- Delete Zone Button -->
                <DeleteButton :action="() => onRemovePostalCodeZone(index)" size="xs" type="danger"></DeleteButton>

            </div>

            <div v-if="form.postalCodeZones[index].isEditable" class="space-y-4">

                <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span>Zone {{ index + 1 }}</span>
                </div>

                <div class="space-y-4">

                    <div class="flex space-x-4">

                        <!-- Area Name Input -->
                        <TextInput
                            label="Area Name"
                            placeholder="Nairobi"
                            labelPopoverTitle="What Is This?"
                            v-model="form.postalCodeZones[index].name"
                            :errorText="getFormError('postalCodeZones'+index+'name')"
                            labelPopoverDescription="Set the area name for this delivery method">
                        </TextInput>

                        <!-- Zone Fee Input -->
                        <MoneyInput
                            label="Delivery fee"
                            labelPopoverTitle="What Is This?"
                            v-model="form.postalCodeZones[index].fee"
                            :errorText="getFormError('postalCodeZones'+index+'fee')"
                            labelPopoverDescription="Specify the fee charged for deliveries within the area">
                        </MoneyInput>

                    </div>

                    <!-- Zone Postal Codes Value Tags -->
                    <InputTags
                        label="Postal Codes"
                        labelPopoverTitle="What Is This?"
                        :key="form.postalCodeZones[index].postalCodes"
                        :tags="form.postalCodeZones[index].postalCodes"
                        :errorText="getFormError('postalCodeZones'+index+'value')"
                        @onTagsChanged="(newValues) => form.postalCodeZones[index].postalCodes = newValues"
                        labelPopoverDescription="The postal codes supported by this area e.g 10001, 00100 or SW1A 1AA" />

                </div>

            </div>

            <div v-else class="space-y-2 cursor-pointer" @click="form.postalCodeZones[index].isEditable = true">

                <!-- Postal Zone Area Name -->
                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>Zone {{ index + 1 }}</span>
                    </div>
                    <BadgeIndicator v-if="form.postalCodeZones[index].name" type="info" :text="form.postalCodeZones[index].name" :showDot="false"></BadgeIndicator>
                    <InputErrorMessage v-else errorText="No name" margin="mt-0"></InputErrorMessage>

                    <BadgeIndicator v-if="form.postalCodeZones[index].fee" type="primary" :text="store.currency.symbol+form.postalCodeZones[index].fee" :showDot="false"></BadgeIndicator>
                    <InputErrorMessage v-else errorText="No fee" margin="mt-0"></InputErrorMessage>
                </div>

                <div v-if="form.postalCodeZones[index].postalCodes.length" class="flex space-x-2">
                    <span v-for="(postalCode, index) in form.postalCodeZones[index].postalCodes" :key="index" class="py-0.5 px-2 bg-gray-100 border text-gray-500 text-xs rounded-lg">
                        {{ postalCode }}
                    </span>
                </div>
                <InputErrorMessage v-else errorText="No postal codes" margin="mt-0"></InputErrorMessage>

                <!-- Area Name Error Message -->
                <InputErrorMessage v-if="getFormError('postalCodeZones'+index+'name')" :errorText="getFormError('postalCodeZones'+index+'name')"></InputErrorMessage>

                <!-- Area Fee Input Error Message -->
                <InputErrorMessage v-if="getFormError('postalCodeZones'+index+'fee')" :errorText="getFormError('postalCodeZones'+index+'fee')"></InputErrorMessage>

            </div>

        </div>

        <!-- No Zones -->
        <div v-if="!hasPostalCodeZones">

            <div class="flex items-center space-x-4 px-4 py-4 border rounded-lg bg-gray-50">

                <svg class="w-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

                <div class="text-sm space-y-2">
                    <p><BadgeIndicator type="primary" text="+ Add Zone" :showDot="false" :clickable="true" :action="onAddPostalCodeZone"></BadgeIndicator> to offer delivery to specific postal codes for a fee</p>
                </div>
            </div>

        </div>

        <div class="flex justify-end space-x-2">

            <!-- Undo Button -->
            <UndoButton v-if="postalCodeZonesHaveChanged && hasOriginalPostalCodeZones" :action="onResetPostalCodeZones" size="xs">
                <span class="ml-1">Undo</span>
            </UndoButton>

            <div class="flex justify-end">

                <!-- Add Option Button -->
                <div class="relative">
                    <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <div v-if="!hasPostalCodeZones" class="animate-bounce text-4xl">👆</div>
                    </div>
                    <AddButton :action="onAddPostalCodeZone" class="w-40" size="xs">
                        <span class="ml-2">Add Zone</span>
                    </AddButton>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import InputTags from '@Partials/inputs/InputTags.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import DeleteButton from '@Partials/buttons/DeleteButton.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        mixins: [FormMixin],
        components: {
            TextInput, InputTags, AddButton, MoneyInput, UndoButton, DeleteButton, BadgeIndicator, InputErrorMessage
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                originalPostalCodeZones: [],
                storeState: useStoreState()
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            hasPostalCodeZones() {
                return this.form.postalCodeZones.length > 0;
            },
            hasOriginalPostalCodeZones() {
                return this.originalPostalCodeZones.length > 0;
            },
            postalCodeZonesHaveChanged() {
                // Clone the arrays to avoid modifying the original data
                var a = cloneDeep(this.form.postalCodeZones);
                var b = cloneDeep(this.originalPostalCodeZones);

                // Loop through each object in the array and delete the property
                a.forEach(obj => delete obj.isEditable);
                b.forEach(obj => delete obj.isEditable);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
        },
        methods: {
            onAddPostalCodeZone() {

                var totalZones = this.form.postalCodeZones.length;
                var fee = totalZones > 0 ? (this.form.postalCodeZones[totalZones - 1].fee * 2).toString() : '50.00';

                this.form.postalCodeZones.push({
                    'fee': fee,
                    'name': '',
                    'postalCodes': [],
                    'isEditable': true,
                });
            },
            onRemovePostalCodeZone(index) {
                this.form.postalCodeZones.splice(index, 1);
            },
            onResetPostalCodeZones() {
                this.form.postalCodeZones = cloneDeep(this.originalPostalCodeZones);
            },
        }
    };

</script>
