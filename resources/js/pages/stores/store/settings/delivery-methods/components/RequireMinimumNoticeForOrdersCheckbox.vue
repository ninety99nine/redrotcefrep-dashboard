<template>

    <Checkbox
        size="xs"
        v-model="form.requireMinimumNoticeForOrders"
        :errorText="getFormError('requireMinimumNoticeForOrders')">
        <div class="mt-0.5 mx-2">
            <p class="font-bold text-sm mb-1">Require minimum notice for orders</p>
            <p class="text-sm text-gray-500 max-w-96">Customers must place orders at least a few hours or days before the delivery date to allow for order processing</p>

            <div :class="[form.requireMinimumNoticeForOrders ? 'h-10 mt-4' : 'h-0 mt-0', 'text-gray-500 space-x-2 transition-all duration-500 overflow-hidden']">

                <span class="text-sm">
                    Accept orders at least
                </span>

                <!-- Earliest Delivery Time Input -->
                <NumberInput
                    min="1"
                    placeholder="1"
                    v-model="form.earliestDeliveryTimeValue"
                    :class="[form.scheduleType == 'date' ? 'w-32' : 'w-20', 'inline-block']">
                    <template v-if="form.scheduleType == 'date'" #suffix>{{ form.earliestDeliveryTimeValue == '1' ? 'day' : 'days'}}</template>
                </NumberInput>

                <!-- Earliest Delivery Time Select -->
                <SelectInput
                    width="w-24"
                    class="inline-block"
                    v-model="form.earliestDeliveryTimeUnit"
                    v-if="form.scheduleType == 'date and time'">
                    <option value="hour">{{ form.earliestDeliveryTimeValue == '1' ? 'Hour' : 'Hours'}}</option>
                    <option value="day">{{ form.earliestDeliveryTimeValue == '1' ? 'Day' : 'Days'}}</option>
                </SelectInput>

                <span class="text-sm">
                    before delivery date
                    <template v-if="form.scheduleType == 'date and time' && form.earliestDeliveryTimeUnit == 'hour'">({{ form.earliestDeliveryTimeValue }} {{ form.earliestDeliveryTimeValue == '1' ? 'hour' : 'hours'}} notice)</template>
                    <template v-else>({{ form.earliestDeliveryTimeValue }} {{ form.earliestDeliveryTimeValue == '1' ? 'day' : 'days'}} notice)</template>
                </span>

            </div>
        </div>
    </Checkbox>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        mixins: [FormMixin],
        components: { Checkbox, NumberInput, SelectInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
