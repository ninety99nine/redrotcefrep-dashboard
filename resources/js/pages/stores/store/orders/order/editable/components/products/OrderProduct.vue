<template>

    <div class="rounded-lg overflow-hidden border py-2 px-4 bg-gray-50">

        <div class="w-full flex space-x-4">

            <div :class="['flex items-center justify-center w-16 h-16', { 'border border-dashed border-gray-200 rounded-lg' : !hasPhotoFilePath }]">

                <img v-if="hasPhotoFilePath" class="w-full object-contain rounded-lg bg-red-200 flex-shrink-0" :src="photoFilePath">

                <svg v-else class="w-6 h-6 text-gray-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>

            </div>

            <div class="w-full space-y-4">

                <!-- Name Input -->
                <CustomInput
                    type="text"
                    label="Name"
                    v-model="cartProduct.name"
                    placeholder="Standard Ticket"
                    @input="orderState.saveStateDebounced('Product name changed')">
                </CustomInput>

                <table class="w-full text-sm text-left">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap align-top px-2 pr-2">
                                <span class="text-gray-700 text-xs font-normal uppercase">Regular Price</span>
                            </th>
                            <th class="whitespace-nowrap align-top px-2">
                                <span class="text-gray-700 text-xs font-normal uppercase">Sale Price</span>
                            </th>
                            <th class="whitespace-nowrap align-top px-2 pl-2">
                                <span class="text-gray-700 text-xs font-normal uppercase">Quantity</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="whitespace-nowrap align-top py-2 pr-2">

                                <!-- Unit Regular Price Input -->
                                <CustomInput
                                    type="money"
                                    :currency="store.currency.code"
                                    v-model="cartProduct.unitRegularPrice"
                                    @input="orderState.saveStateDebounced('Product regular price changed')">
                                </CustomInput>

                            </td>
                            <td class="whitespace-nowrap align-top p-2">

                                <!-- Unit Sale Price Input -->
                                <CustomInput
                                    type="money"
                                    :currency="store.currency.code"
                                    v-model="cartProduct.unitSalePrice"
                                    @input="orderState.saveStateDebounced('Product sale price changed')">
                                </CustomInput>

                            </td>
                            <td class="whitespace-nowrap align-top py-2 pl-2">

                                <!-- Quantity Input -->
                                <CustomInput
                                    type="number"
                                    v-model="cartProduct.quantity"
                                    @input="orderState.saveStateDebounced('Product quantity changed')">
                                </CustomInput>

                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>

        <div class="grid grid-cols-3 my-4">

            <div class="col-span-1 col-start-2 flex items-center justify-center space-x-2">

                    <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                    <span class="text-gray-700 text-center">{{ store.currency.symbol }}{{ grandTotal }}</span>

            </div>

            <div class="col-span-1">

                <div class="flex justify-end">

                    <Button :action="() => orderState.removeCartProduct(index)" type="danger" size="xs" icon="delete">
                        <span>Remove Product</span>
                    </Button>

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import { convertToValidMoney } from '@Utils/numberUtils.js';

    export default {
        inject: ['orderState', 'storeState'],
        components: { Button, CustomInput },
        props: {
            index: {
                type: Number
            },
            cartProduct: {
                type: Object
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            hasPhotoFilePath() {
                return this.photoFilePath != null;
            },
            photoFilePath() {
                return this.cartProduct.photoFilePath;
            },
            grandTotal() {
                const unitRegularPrice = parseFloat(this.cartProduct.unitRegularPrice);
                const unitSalePrice = parseFloat(this.cartProduct.unitSalePrice);
                const quantity = parseInt(this.cartProduct.quantity);
                const currency = this.store.currency.code;

                if(unitSalePrice > 0 && unitSalePrice < unitRegularPrice) {
                    return convertToValidMoney(unitSalePrice * quantity, currency);
                }else{
                    return convertToValidMoney(unitRegularPrice * quantity, currency);
                }
            }
        }
    };

</script>
