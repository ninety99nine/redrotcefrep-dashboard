<template>

    <div
        @click.stop="selectDeliveryMethod"
        class="flex justify-between items-center cursor-pointer p-4 bg-gray-50 border rounded-lg transition-colors group">

        <div class="flex items-center space-x-2">

            <transition name="fade-1" mode="out-in">
                <svg v-if="isSelectedDeliveryMethod" class="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                </svg>
                <div v-else class="w-6 h-6 flex justify-center items-center">
                    <div class="w-4 h-4 bg-gray-100 border rounded-full"></div>
                </div>
            </transition>

            <div>

                <!-- Name -->
                <p
                    class="font-bold text-sm transition-colors">
                    {{ deliveryMethod.name }}
                </p>

                <template v-if="deliveryMethod.chargeFee">

                    <!-- Flat Fee Rate -->
                    <p
                        v-if="usesFlatFee"
                        class="text-sm transition-colors">
                        Flat fee of {{ deliveryMethod.flatFeeRate.amountWithCurrency }}
                    </p>

                    <!-- Percentage Fee Rate -->
                    <p
                        v-else-if="usesPercentageFee"
                        class="text-sm transition-colors">
                        Percentage fee of {{ deliveryMethod.percentageFeeRate.valueSymbol }}
                    </p>

                </template>

                <!-- Desctiption -->
                <p
                    class="text-sm transition-colors">
                    {{ deliveryMethod.description }}
                </p>

            </div>

        </div>

    </div>

</template>

<script>

    import CustomInput from '@Partials/inputs/CustomInput.vue';

    export default {
        inject: ['orderState'],
        components: { CustomInput },
        props: {
            index: {
                type: Number
            },
            deliveryMethod: {
                type: Object
            }
        },
        computed: {
            order() {
                return this.orderState.order;
            },
            usesFlatFee() {
                return this.deliveryMethod.feeType.toLowerCase() == 'flat fee';
            },
            usesPercentageFee() {
                return this.deliveryMethod.feeType.toLowerCase() == 'percentage fee';
            },
            usesFeeByDistance() {
                return this.deliveryMethod.feeType.toLowerCase() == 'fee by distance';
            },
            isSelectedDeliveryMethod() {
                return this.orderState.orderForm.deliveryMethodId === this.deliveryMethod.id;
            }
        },
        methods: {
            selectDeliveryMethod() {
                this.orderState.orderForm.deliveryMethodId = this.deliveryMethod.id;
                this.orderState.saveStateDebounced('Delivery method changed');
            }
        }
    };

</script>
