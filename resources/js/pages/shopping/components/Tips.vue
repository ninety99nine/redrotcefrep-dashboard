<template>
    <div v-if="hasTips" class="space-y-4 px-4 pb-4">
        <div class="flex flex-wrap gap-2">
            <Pill
                size="xs"
                :key="index"
                :showDot="false"
                :action="() => setTip(tip)"
                v-for="(tip, index) in tips"
                :type="isSelectedTip(tip) ? 'primary' : 'info'">
                {{ formatTipText(tip) }}
            </Pill>
        </div>
        <div v-if="isFlatTip" class="mt-4">
            <MoneyInput
                v-model="shoppingCartForm.tipFlatRate"
                :errorText="formState.getFormError('discountFlatRate')"
            />
        </div>
    </div>
</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import { TIP_TYPES } from '@Enums/enums.js';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';

    export default {
        inject: ['formState', 'storeState', 'shoppingCartState'],
        components: { MoneyInput, Pill },
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
            isFlatTip() {
                return this.selectedTip?.type === TIP_TYPES.FLAT.value;
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
                    return TIP_TYPES.FLAT;
                }
                return TIP_TYPES.PERCENTAGE(tip);
            },
        }
    };
</script>
