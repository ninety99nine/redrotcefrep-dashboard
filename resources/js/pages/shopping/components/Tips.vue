<template>
    <div v-if="hasTips" class="space-y-4 px-4 pb-4">
        <div class="flex flex-wrap gap-2">
            <Pill
                :key="index"
                size="px-4 py-1"
                :showDot="false"
                :clickable="true"
                :text="formatTipText(tip)"
                :action="() => setTip(tip)"
                v-for="(tip, index) in tips"
                :type="isSelectedTip(tip) ? 'primary' : 'info'"
            />
        </div>
        <div v-if="isFixedTip" class="mt-4">
            <MoneyInput
                v-model="shoppingCartForm.tipFlatRate"
                :errorText="getFormError('discountFixedRate')"
            />
        </div>
    </div>
</template>

<script>
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import Pill from '@Partials/pills/Pill.vue';
    import { useShoppingCartState, TIP_TYPES } from '@Stores/shopping-cart-store.js';

    export default {
        mixins: [FormMixin],
        components: { MoneyInput, Pill },
        data() {
            return {
                storeState: useStoreState(),
                shoppingCartState: useShoppingCartState(),
            };
        },
        watch: {
            'shoppingCartForm.tipFlatRate'() {
                this.shoppingCartState.inspectStoreShoppingCartWithDelay();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            shoppingCartForm() {
                return this.shoppingCartState.shoppingCartForm;
            },
            tips() {
                return ['none', ...this.store.tips, 'specify'].map(this.formatTip);
            },
            hasTips() {
                return this.store.tips.length > 0;
            },
            isFixedTip() {
                return this.selectedTip?.type === 'fixed';
            },
            selectedTip() {
                return this.shoppingCartState.tip;
            },
        },
        methods: {
            setTip(tip) {
                this.shoppingCartState.setTip(tip);
            },
            isSelectedTip(tip) {
                return this.shoppingCartState.isSelectedTip(tip);
            },
            formatTipText(tip) {
                return tip.value + (tip.type === 'percentage' ? '%' : '');
            },
            formatTip(tip) {
                if (tip === 'none') {
                    return TIP_TYPES.NONE;
                }
                if (tip === 'specify') {
                    return TIP_TYPES.FIXED;
                }
                return TIP_TYPES.PERCENTAGE(tip);
            },
        }
    };
</script>
