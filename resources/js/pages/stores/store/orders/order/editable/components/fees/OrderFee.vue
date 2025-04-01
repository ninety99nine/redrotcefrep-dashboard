<template>

    <div class="space-y-2 bg-gray-50 p-2 border rounded-lg">

        <!-- Name Input -->
        <CustomInput
            type="text"
            class="w-full"
            v-model="cartFee.name"
            placeholder="Packaging"
            @input="orderState.saveStateDebounced('Fee name changed')">
        </CustomInput>

        <div class="flex items-center space-x-2">

            <CustomSelect
                class="w-60"
                :search="false"
                :options="feeTypes"
                v-model="cartFee.rateType"
                placeholder="Select fee type"
                @change="orderState.saveStateDebounced('Fee type changed')">
            </CustomSelect>

            <CustomInput
                type="money"
                class="w-60"
                v-model="cartFee.flatRate"
                :currency="store.currency.code"
                v-if="cartFee.rateType == RATE_TYPES.FLAT"
                @input="orderState.saveStateDebounced('Fee amount changed')">
            </CustomInput>

            <CustomInput
                v-else
                class="w-60"
                type="percentage"
                v-model="cartFee.percentageRate"
                @input="orderState.saveStateDebounced('Fee amount changed')">
            </CustomInput>

            <!-- Remove Button -->
            <div class="w-full flex justify-end">

                <Button
                    v-if="cartFee.removable"
                    :action="() => orderState.removeCartFee(index)" type="danger" size="xs" icon="delete">
                    <span>Remove Fee</span>
                </Button>

                <CustomSwitch
                    v-else
                    size="xs"
                    prefixText="Apply fee"
                    v-model="cartFee.active"
                    @change="orderState.saveStateDebounced('Apply fee status changed')"
                />

            </div>

        </div>

    </div>

</template>

<script>

    import { RATE_TYPES } from '@Enums/enums.js';
    import Button from '@Partials/buttons/Button.vue';
    import { capitalize } from '@Utils/stringUtils.js';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import CustomSelect from '@Partials/inputs/CustomSelect.vue';
    import CustomSwitch from '@Partials/inputs/CustomSwitch.vue';

    export default {
        inject: ['storeState', 'orderState'],
        components: { Button, CustomInput, CustomSelect, CustomSwitch },
        props: {
            index: {
                type: Number
            },
            cartFee: {
                type: Object
            }
        },
        data() {
            return {
                RATE_TYPES,
                feeTypes: Object.entries(RATE_TYPES).map(([key, value]) => ({
                    label: capitalize(value),
                    value: value
                }))
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            }
        }
    };

</script>
