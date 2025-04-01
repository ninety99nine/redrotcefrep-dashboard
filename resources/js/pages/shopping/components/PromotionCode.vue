<template>

    <div class="space-y-4 px-4 pb-4">
        <div class="flex items-center space-x-4">
            <TextInput
                class="w-full"
                placeholder="Enter promotion code"
                v-model="shoppingCartForm.promotionCode"
                :errorText="formState.getFormError('promotionCode')">
            </TextInput>

            <transition name="fade-1" mode="out-in">
                <svg v-if="false" class="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                </svg>
            </transition>
        </div>
        <LineSkeleton v-if="isInspectingShoppingCart && shoppingCartForm.promotionCode" width="w-1/3" :shine="true"></LineSkeleton>
        <div v-else-if="hasShoppingCart && promotionCode.applied" class="p-2 border-l-4 border-green-300 bg-green-50">
            <p class="text-sm">{{ promotionCode.message }}</p>
        </div>
    </div>

</template>

<script>

import TextInput from '@Partials/inputs/TextInput.vue';
import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

export default {
    inject: ['formState', 'storeState', 'shoppingCartState'],
    components: { TextInput, LineSkeleton },
    watch: {
        'shoppingCartForm.promotionCode'() {
            this.shoppingCartState.inspectStoreShoppingCartWithDelay();
        }
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
        promotionCode() {
            return this.shoppingCart.promotionCode;
        },
        shoppingCartForm() {
            return this.shoppingCartState.shoppingCartForm;
        },
        isInspectingShoppingCart() {
            return this.shoppingCartState.isInspectingShoppingCart;
        }
    }
};
</script>
