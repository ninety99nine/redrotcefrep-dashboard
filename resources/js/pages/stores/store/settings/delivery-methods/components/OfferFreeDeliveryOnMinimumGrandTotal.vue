<template>

    <div :class="[{ 'border border-dashed rounded-lg': form.offerFreeDeliveryOnMinimumGrandTotal }]">
        <div :class="[{ 'bg-blue-50 p-4 rounded-lg': form.offerFreeDeliveryOnMinimumGrandTotal }, 'transition-all duration-500']">

            <!-- Offer Free Delivery On Minimum Grand Total Checkbox -->
            <Checkbox
                size="xs"
                v-model="form.offerFreeDeliveryOnMinimumGrandTotal"
                :errorText="getFormError('offerFreeDeliveryOnMinimumGrandTotal')">
                <div class="space-y-1 mt-0.5">
                    <p class="font-bold text-sm mx-2">Offer free delivery on minimum grand total</p>
                    <p class="text-sm text-gray-500 mx-2">Customer carts must qualify with a minimum grand total to claim free delivery.</p>
                </div>
            </Checkbox>

            <!-- Offer Free Delivery On Minimum Grand Total Input -->
            <div :class="[form.offerFreeDeliveryOnMinimumGrandTotal ? 'h-24 p-0.5' : 'h-0 mb-0 p-0', 'transition-all duration-500 overflow-hidden']">

                <NumberInput
                    min="1"
                    placeholder="100"
                    class="max-w-80 mt-4"
                    label="Minimum Grand Total"
                    labelPopoverTitle="What Is This?"
                    v-model="form.freeDeliveryMinimumGrandTotal"
                    v-if="form.offerFreeDeliveryOnMinimumGrandTotal"
                    :errorText="getFormError('minimumGrandTotal')"
                    labelPopoverDescription="Customer carts must qualify with a minimum grand total to claim free delivery">
                </NumberInput>

            </div>

        </div>
    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';

    export default {
        mixins: [FormMixin],
        components: {
            Checkbox, NumberInput
        },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
