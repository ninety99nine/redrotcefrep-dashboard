<template>

    <div class="space-y-4">

         <div class="space-y-4 p-4 border rounded-lg shadow-lg bg-white">

            <!-- Show Distance In Invoice Checkbox -->
            <ShowDistanceInInvoiceCheckbox :form="form"></ShowDistanceInInvoiceCheckbox>

         </div>

        <!-- Address Information -->
        <AddressModal
            :address="address"
            title="Base location"
            @onCreated="setAddress"
            @onUpdated="setAddress"
            @onDeleted="onDeletedAddress"
            @onValidated="setValidatedAddressForm"
            :deliveryMethodId="hasDeliveryMethod ? deliveryMethod.id : null"
            subtitle="Set the starting point for calculating delivery distances">
        </AddressModal>

        <h1 class="text-md font-bold m-2">Zones</h1>

        <div v-for="(distanceZone, index) in form.distanceZones" :key="index" class="relative bg-gray-50 p-4 border rounded-lg">

            <div class="absolute top-2 right-2 flex items-center space-x-2">

                <svg class="w-6 h-6 cursor-pointer hover:opacity-50" @click="form.distanceZones[index].isEditable = !form.distanceZones[index].isEditable" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path v-if="form.distanceZones[index].isEditable" stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

                <!-- Delete Zone Button -->
                <DeleteButton :action="() => onRemoveDistanceZone(index)" size="xs" type="danger"></DeleteButton>

            </div>

            <div v-if="form.distanceZones[index].isEditable" class="space-y-4">

                <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span>Zone {{ index + 1 }}</span>
                </div>

                <div class="flex space-x-4">

                    <!-- Zone Distance Input -->
                    <NumberInput
                        min="1"
                        placeholder="10"
                        label="Delivery distance up to"
                        labelPopoverTitle="What Is This?"
                        v-model="form.distanceZones[index].distance"
                        :errorText="getFormError('distanceZones'+index+'distance')"
                        labelPopoverDescription="Set the maximum distance eligible for this delivery method">
                        <template #suffix>{{ store.distanceUnit }}</template>
                    </NumberInput>

                    <!-- Zone Fee Input -->
                    <MoneyInput
                        label="Delivery fee"
                        labelPopoverTitle="What Is This?"
                        v-model="form.distanceZones[index].fee"
                        :errorText="getFormError('distanceZones'+index+'fee')"
                        labelPopoverDescription="Specify the fee charged for deliveries within the set distance range">
                    </MoneyInput>

                </div>

            </div>

            <div v-else class="space-y-2 cursor-pointer" @click="form.distanceZones[index].isEditable = true">

                <!-- Delivery Distance -->
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>Zone {{ index + 1 }}</span>
                    </div>
                    <BadgeIndicator v-if="form.distanceZones[index].distance" type="info" :text="form.distanceZones[index].distance+' '+store.distanceUnit" :showDot="false"></BadgeIndicator>
                    <InputErrorMessage v-else errorText="No distance" margin="mt-0"></InputErrorMessage>

                    <BadgeIndicator v-if="form.distanceZones[index].fee" type="primary" :text="store.currency.symbol+form.distanceZones[index].fee" :showDot="false"></BadgeIndicator>
                    <InputErrorMessage v-else errorText="No fee" margin="mt-0"></InputErrorMessage>

                </div>

                <!-- Distance Input Error Message -->
                <InputErrorMessage v-if="getFormError('distanceZones'+index+'distance')" :errorText="getFormError('distanceZones'+index+'distance')"></InputErrorMessage>

                <!-- Fee Input Error Message -->
                <InputErrorMessage v-if="getFormError('distanceZones'+index+'fee')" :errorText="getFormError('distanceZones'+index+'fee')"></InputErrorMessage>

            </div>

        </div>

        <!-- No Zones -->
        <div v-if="!hasDistanceZones">

            <div class="flex items-center space-x-4 px-4 py-4 border rounded-lg bg-gray-50">

                <svg class="w-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

                <div class="text-sm space-y-2">
                    <BadgeIndicator type="primary" text="+ Add Zone" :showDot="false" :clickable="true" :action="onAddDistanceZone"></BadgeIndicator> to offer delivery within specific distances for a fee
                </div>
            </div>

        </div>

        <div class="flex justify-end space-x-2">

            <!-- Undo Button -->
            <UndoButton v-if="distanceZonesHaveChanged && hasOriginalDistanceZones" :action="onResetDistanceZones" size="xs">
                <span class="ml-1">Undo</span>
            </UndoButton>

            <div class="flex justify-end">

                <!-- Add Option Button -->
                <div class="relative">
                    <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <div v-if="!hasDistanceZones" class="animate-bounce text-4xl">👆</div>
                    </div>
                    <AddButton :action="onAddDistanceZone" class="w-40" size="xs">
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
    import AddButton from '@Partials/buttons/AddButton.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import DeleteButton from '@Partials/buttons/DeleteButton.vue';
    import AddressModal from '@Components/address/AddressModal.vue';
    import { useDeliveryMethodState } from '@Stores/delivery-method-store.js';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';
    import ShowDistanceInInvoiceCheckbox from '@Pages/stores/store/settings/delivery-methods/components/ShowDistanceInInvoiceCheckbox.vue';

    export default {
        mixins: [FormMixin],
        components: {
            AddButton, MoneyInput, UndoButton, NumberInput, DeleteButton, AddressModal,
            BadgeIndicator, InputErrorMessage, ShowDistanceInInvoiceCheckbox
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                originalDistanceZones: [],
                storeState: useStoreState(),
                deliveryMethodState: useDeliveryMethodState()
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            deliveryMethod() {
                return this.deliveryMethodState.deliveryMethod;
            },
            hasDeliveryMethod() {
                return this.deliveryMethod != null;
            },
            address() {
                return this.hasDeliveryMethod ? this.deliveryMethod._relationships.address : null;
            },
            hasAddress() {
                return this.address != null;
            },
            hasDistanceZones() {
                return this.form.distanceZones.length > 0;
            },
            hasOriginalDistanceZones() {
                return this.originalDistanceZones.length > 0;
            },
            distanceZonesHaveChanged() {
                // Clone the arrays to avoid modifying the original data
                var a = cloneDeep(this.form.distanceZones);
                var b = cloneDeep(this.originalDistanceZones);

                // Loop through each object in the array and delete the property
                a.forEach(obj => delete obj.isEditable);
                b.forEach(obj => delete obj.isEditable);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
        },
        methods: {
            setAddress(address) {
                useDeliveryMethodState().deliveryMethod._relationships.address = address;
            },
            setValidatedAddressForm(addressForm) {
                this.form.address = addressForm;
            },
            onDeletedAddress() {
                if(this.hasAddress) {
                    useDeliveryMethodState().deliveryMethod._relationships.address = null;
                }else{
                    delete this.form.address;
                }
            },
            onAddDistanceZone() {
                var totalZones = this.form.distanceZones.length;
                var fee = totalZones > 0 ? (this.form.distanceZones[totalZones - 1].fee * 2).toString() : '50.00';
                var distance = totalZones > 0 ? (this.form.distanceZones[totalZones - 1].distance * 2).toString() : '10';

                this.form.distanceZones.push({
                    'fee': fee,
                    'isEditable': true,
                    'distance': distance,
                });
            },
            onRemoveDistanceZone(index) {
                this.form.distanceZones.splice(index, 1);
            },
            onResetDistanceZones() {
                this.form.distanceZones = cloneDeep(this.originalDistanceZones);
            },
        }
    };

</script>
