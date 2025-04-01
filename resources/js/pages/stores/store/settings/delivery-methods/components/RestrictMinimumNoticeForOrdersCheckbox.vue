<template>

    <Checkbox
        size="xs"
        v-model="form.restrictMaximumNoticeForOrders"
        :errorText="formState.getFormError('restrictMaximumNoticeForOrders')">
        <div class="mt-0.5 mx-2">
            <p class="font-bold text-sm mb-1">Restrict maximum notice for orders</p>
            <p class="text-sm text-gray-500 max-w-96">Customers can only place orders if the delivery date is within a reasonable timeframe</p>

            <div :class="[form.restrictMaximumNoticeForOrders ? 'h-10 mt-4' : 'h-0 mt-0', 'text-gray-500 space-x-2 transition-all duration-500 overflow-hidden']">

                <span class="text-sm">
                    Restrict orders more than
                </span>

                <!-- Latest Delivery Time Input -->
                <NumberInput
                    min="1"
                    placeholder="1"
                    class="w-32 inline-block"
                    v-model="form.latestDeliveryTimeValue">
                    <template #suffix>Days</template>
                </NumberInput>

                <span class="text-sm">
                    from the delivery date
                </span>

            </div>
        </div>
    </Checkbox>

</template>

<script>

    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';

    export default {
        inject: ['formState'],
        components: { Checkbox, NumberInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
