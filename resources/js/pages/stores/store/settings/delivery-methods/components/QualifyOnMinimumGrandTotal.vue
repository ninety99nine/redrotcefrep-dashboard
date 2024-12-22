<template>

    <div :class="[{ 'border border-dashed rounded-lg': form.qualifyOnMinimumGrandTotal }]">
        <div :class="[{ 'bg-blue-50 p-4 rounded-lg': form.qualifyOnMinimumGrandTotal }, 'transition-all duration-500']">

            <!-- Qualify On Minimum Grand Total Checkbox -->
            <Checkbox
                size="xs"
                v-model="form.qualifyOnMinimumGrandTotal"
                :errorText="getFormError('qualifyOnMinimumGrandTotal')">
                <div class="space-y-1 mt-0.5">
                    <p class="font-bold text-sm mx-2">Qualify on minimum grand total</p>
                    <p class="text-sm text-gray-500 mx-2">Customer carts must qualify with a minimum grand total before placing an order.</p>
                </div>
            </Checkbox>

            <!-- Minimum Grand Total Input -->
            <div :class="[form.qualifyOnMinimumGrandTotal ? 'h-24 p-0.5' : 'h-0 mb-0 p-0', 'transition-all duration-500 overflow-hidden']">
                <NumberInput
                    min="1"
                    placeholder="100"
                    class="max-w-80 mt-4"
                    label="Minimum Grand Total"
                    labelPopoverTitle="What Is This?"
                    v-model="form.minimumGrandTotal"
                    v-if="form.qualifyOnMinimumGrandTotal"
                    :errorText="getFormError('minimumGrandTotal')"
                    labelPopoverDescription="Customer carts must qualify with a minimum grand total before placing an order">
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
