<template>

    <div class="rounded-lg overflow-hidden border border-fuchsia-300 py-2 px-4 bg-fuchsia-50">

        <div class="w-full space-y-4">

            <!-- Name Input -->
            <CustomInput
                type="text"
                label="Name"
                v-model="cartPromotion.name"
                placeholder="Standard Ticket"
                @input="orderState.saveStateDebounced('Promotion name changed')">
            </CustomInput>

            <div class="grid grid-cols-3 gap-1">

                <CustomSwitch
                    size="xs"
                    suffixText="Offer discount"
                    v-model="cartPromotion.offerDiscount"
                    @input="orderState.saveStateDebounced('Promotion discount offer changed')"
                />

                <template v-if="cartPromotion.offerDiscount">

                    <CustomSelect
                        class="w-full"
                        :search="false"
                        :options="discountRateTypes"
                        placeholder="Select discount type"
                        v-model="cartPromotion.discountRateType"
                        @change="orderState.saveStateDebounced('Promotion discount type changed')">
                    </CustomSelect>

                    <CustomInput
                        type="money"
                        :currency="store.currency.code"
                        v-model="cartPromotion.discountFlatRate"
                        v-if="cartPromotion.discountRateType == RATE_TYPES.FLAT"
                        @input="orderState.saveStateDebounced('Promotion discount amount changed')">
                    </CustomInput>

                    <CustomInput
                        v-else
                        type="percentage"
                        v-model="cartPromotion.discountPercentageRate"
                        @input="orderState.saveStateDebounced('Promotion discount amount changed')">
                    </CustomInput>

                </template>

            </div>

        </div>

        <div class="flex justify-between my-4">

            <CustomSwitch
                size="xs"
                suffixText="Offer free delivery"
                v-model="cartPromotion.offerFreeDelivery"
                @input="orderState.saveStateDebounced('Promotion fee delivery offer changed')"
            />

            <Button :action="() => orderState.removeCartPromotion(index)" type="danger" size="xs" icon="delete">
                <span>Remove Promotion</span>
            </Button>

        </div>

    </div>

</template>

<script>

    import { RATE_TYPES } from '@Enums/enums.js';
    import Button from '@Partials/buttons/Button.vue';
    import { capitalize } from '@Utils/stringUtils.js';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import CustomSwitch from '@Partials/inputs/CustomSwitch.vue';
    import CustomSelect from '@Partials/inputs/CustomSelect.vue';

    export default {
        inject: ['orderState', 'storeState'],
        components: { Button, CustomInput, CustomSwitch, CustomSelect },
        props: {
            index: {
                type: Number
            },
            cartPromotion: {
                type: Object
            }
        },
        data() {
            return {
                RATE_TYPES,
                discountRateTypes: Object.entries(RATE_TYPES).map(([key, value]) => ({
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
