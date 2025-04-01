<template>

    <div :class="[{ 'border border-dashed rounded-lg': form.chargeFee }]">
        <div :class="[{ 'bg-blue-50 p-4 rounded-lg': form.chargeFee }, 'transition-all duration-500']">

            <!-- Charge Fee Toggle Switch -->
            <ChargeFeeToggleSwitch :form="form"></ChargeFeeToggleSwitch>

            <div :class="[form.chargeFee ? 'h-24 mt-4 p-0.5' : 'h-0 mb-0 p-0', 'transition-all duration-500 overflow-hidden']">

                <div class="flex justify-between items-center space-x-8">

                    <!-- Fee Type Select Input -->
                    <FeeTypeSelectInput :form="form"></FeeTypeSelectInput>

                    <!-- Flat Fee Money Input -->
                    <FlatFeeMoneyInput :form="form"></FlatFeeMoneyInput>

                    <!-- Percentage Fee Number Input -->
                    <PercentageFeeNumberInput :form="form"></PercentageFeeNumberInput>

                </div>

            </div>

            <!-- Fee By Weight Settings -->
            <FeeByWeight v-if="form.chargeFee && form.feeType == 'fee by weight'" :form="form"></FeeByWeight>

            <!-- Fee By Distance Settings -->
            <FeeByDistance v-if="form.chargeFee && form.feeType == 'fee by distance'" :form="form"></FeeByDistance>

            <!-- Fee By Postal Code Settings -->
            <FeeByPostalCode v-if="form.chargeFee && form.feeType == 'fee by postal code'" :form="form"></FeeByPostalCode>

        </div>
    </div>

</template>

<script>

    import FeeByWeight from '@Pages/stores/store/settings/delivery-methods/components/FeeByWeight.vue';
    import FeeByDistance from '@Pages/stores/store/settings/delivery-methods/components/FeeByDistance.vue';
    import FeeByPostalCode from '@Pages/stores/store/settings/delivery-methods/components/FeeByPostalCode.vue';
    import FlatFeeMoneyInput from '@Pages/stores/store/settings/delivery-methods/components/FlatFeeMoneyInput.vue';
    import FeeTypeSelectInput from '@Pages/stores/store/settings/delivery-methods/components/FeeTypeSelectInput.vue';
    import ChargeFeeToggleSwitch from '@Pages/stores/store/settings/delivery-methods/components/ChargeFeeToggleSwitch.vue';
    import PercentageFeeNumberInput from '@Pages/stores/store/settings/delivery-methods/components/PercentageFeeNumberInput.vue';

    export default {
        components: {
            FeeByWeight, FeeByDistance, FeeByPostalCode, FlatFeeMoneyInput, FeeTypeSelectInput,
            ChargeFeeToggleSwitch, PercentageFeeNumberInput
        },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
