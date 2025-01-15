<template>

    <div v-if="hasDeliveryMethods" class="divide-y border-t">

        <!-- Delivery Methods -->
        <div
            :key="index"
            v-for="(deliveryMethod, index) in deliveryMethods"
            @click.stop="setDeliveryMethod(deliveryMethod)"
            :style="{ '--product-background': storeForm.productBgColor, '--product-background-hover': storeForm.productHoverBgColor }"
            :class="[itemClasses(index), 'flex justify-between items-center pl-4 pr-2 cursor-pointer bg-[var(--product-background)] hover:bg-[var(--product-background-hover)] transition-colors group']">

            <div class="flex items-center space-x-2">

                <transition name="fade-1" mode="out-in">
                    <svg v-if="isSelectedDeliveryMethod(deliveryMethod)" class="w-4 h-4 md:w-6 md:h-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                    </svg>

                    <div v-else class="w-4 h-4 md:w-6 md:h-6 flex-shrink-0 flex justify-center items-center">
                        <div class="w-4 h-4 bg-gray-100 border rounded-full"></div>
                    </div>
                </transition>

                <div>

                    <!-- Name -->
                    <p
                        class="font-bold text-xs md:text-sm text-[var(--product-name-color)] group-hover:text-[var(--product-name-color-hover)] transition-colors"
                        :style="{ '--product-name-color': storeForm.productNameColor, '--product-name-color-hover': storeForm.productHoverNameColor }">
                        {{ deliveryMethod.name }}
                    </p>

                    <template v-if="deliveryMethod.chargeFee">

                        <!-- Flat Fee Rate -->
                        <p
                            v-if="usesFlatFee(deliveryMethod)"
                            class="text-xs md:text-sm text-[var(--product-name-color)] group-hover:text-[var(--product-name-color-hover)] transition-colors"
                            :style="{ '--product-name-color': storeForm.productNameColor, '--product-name-color-hover': storeForm.productHoverNameColor }">
                            Flat fee of {{ deliveryMethod.flatFeeRate.amountWithCurrency }}
                        </p>

                        <!-- Percentage Fee Rate -->
                        <p
                            v-else-if="usesPercentageFee(deliveryMethod)"
                            class="text-xs md:text-sm text-[var(--product-name-color)] group-hover:text-[var(--product-name-color-hover)] transition-colors"
                            :style="{ '--product-name-color': storeForm.productNameColor, '--product-name-color-hover': storeForm.productHoverNameColor }">
                            Percentage fee of {{ deliveryMethod.percentageFeeRate.valueSymbol }}
                        </p>

                    </template>

                    <!-- Qualify On Minimum Grand Total -->
                    <p
                        v-if="deliveryMethod.qualifyOnMinimumGrandTotal"
                        class="text-xs md:text-sm text-[var(--product-name-color)] group-hover:text-[var(--product-name-color-hover)] transition-colors"
                        :style="{ '--product-name-color': storeForm.productNameColor, '--product-name-color-hover': storeForm.productHoverNameColor }">
                        Minimum order amount is {{ deliveryMethod.minimumGrandTotal.amountWithCurrency }}
                    </p>

                    <!-- Desctiption -->
                    <p
                        class="text-xs md:text-sm text-[var(--product-name-color)] group-hover:text-[var(--product-name-color-hover)] transition-colors"
                        :style="{ '--product-name-color': storeForm.productNameColor, '--product-name-color-hover': storeForm.productHoverNameColor }">
                        {{ deliveryMethod.description }}
                    </p>

                </div>

            </div>

        </div>

        <!-- Error Message -->
        <div
            :key="index"
            class="py-2 px-4"
            v-for="(deliveryMethodUnavailabilityReason, index) in deliveryMethodUnavailabilityReasons">
            <ShineEffect v-if="isInspectingShoppingCart">
                <LineSkeleton width="w-1/3"></LineSkeleton>
            </ShineEffect>

            <div v-else class="flex items-center space-x-1 md:space-x-2">
                <svg class="w-4 h-4 md:w-6 md:h-6 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span class="font-medium text-red-500 text-xs md:text-sm">{{ deliveryMethodUnavailabilityReason }}</span>
            </div>
        </div>

        <!-- Tip Message -->
        <template v-if="!hasDeliveryMethodUnavailabilityReasons">
            <div
                :key="index"
                class="py-2 px-4"
                v-for="(deliveryMethodTip, index) in deliveryMethodTips">
                <ShineEffect v-if="isInspectingShoppingCart">
                    <LineSkeleton width="w-1/3"></LineSkeleton>
                </ShineEffect>

                <div v-else class="flex items-center space-x-1 md:space-x-2">
                    <svg class="w-4 h-4 md:w-6 md:h-6 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span class="font-medium text-green-500 text-xs md:text-sm">{{ deliveryMethodTip }}</span>
                </div>
            </div>
        </template>

    </div>

</template>

<script>

import { useStoreState } from '@Stores/store-store.js';
import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
import { useShoppingCartState } from '@Stores/shopping-cart-store.js';
import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

export default {
    components: { ShineEffect, LineSkeleton, InputErrorMessage },
    data() {
        return {
            storeState: useStoreState(),
            shoppingCartState: useShoppingCartState()
        };
    },
    computed: {
        storeForm() {
            return this.storeState.storeForm;
        },
        shoppingCart() {
            return this.shoppingCartState.shoppingCart;
        },
        hasShoppingCart() {
            return this.shoppingCartState.hasShoppingCart;
        },
        shoppingCartForm() {
            return this.shoppingCartState.shoppingCartForm;
        },
        deliveryMethods() {
            return this.shoppingCartState.deliveryMethods;
        },
        totalDeliveryMethods() {
            return this.shoppingCartState.totalDeliveryMethods;
        },
        hasDeliveryMethods() {
            return this.shoppingCartState.hasDeliveryMethods;
        },
        deliveryMethodTips() {
            return ((((this.shoppingCart || {}).delivery || {}).method || {}).tips || []);
        },
        hasDeliveryMethodUnavailabilityReasons() {
            return this.deliveryMethodUnavailabilityReasons.length > 0;
        },
        deliveryMethodUnavailabilityReasons() {
            return ((((this.shoppingCart || {}).delivery || {}).method || {}).unavailabilityReasons || []);
        },
        isInspectingShoppingCart() {
            return this.shoppingCartState.isInspectingShoppingCart;
        },
        selectedDeliveryMethod() {
            return this.deliveryMethods.find((deliveryMethod) => deliveryMethod.id == this.shoppingCartForm.deliveryMethodId);
        }
    },
    methods: {
        async showDeliveryMethods() {
            await this.shoppingCartState.showDeliveryMethods();
        },
        inspectStoreShoppingCart() {
            return this.shoppingCartState.inspectStoreShoppingCart();
        },
        itemClasses(index) {
            if(this.isFirstItem(index)) {
                return 'pt-4 pb-2';
            }else if(this.isLastItem(index)) {
                return 'pt-2 pb-4';
            }else{
                return 'py-2';
            }
        },
        isFirstItem(index) {
            return index == 0;
        },
        isLastItem(index) {
            return index == (this.totalDeliveryMethods - 1);
        },
        usesFlatFee(deliveryMethod) {
            return deliveryMethod.feeType.toLowerCase() == 'flat fee';
        },
        usesPercentageFee(deliveryMethod) {
            return deliveryMethod.feeType.toLowerCase() == 'percentage fee';
        },
        usesFeeByDistance(deliveryMethod) {
            return deliveryMethod.feeType.toLowerCase() == 'fee by distance';
        },
        setDeliveryMethod(deliveryMethod) {
            this.shoppingCartState.setDeliveryMethod(deliveryMethod);
        },
        isSelectedDeliveryMethod(deliveryMethod) {
            return this.shoppingCartState.isSelectedDeliveryMethod(deliveryMethod);
        },
    },
    created() {
        this.showDeliveryMethods();
    }
};
</script>
