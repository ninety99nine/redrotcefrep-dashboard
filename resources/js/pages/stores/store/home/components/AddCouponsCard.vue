<template>

    <div class="animated-border-blue bg-white space-y-4 py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <h1 class="flex items-center space-x-2 text-sm text-gray-700 font-bold">
            <span class="text-xl">🥰</span>
            <span class="mt-1">Add Coupons</span>
        </h1>

        <p class="text-xs text-center text-gray-600">
            Create amazing incentives for your customers, such as offering discounts or free delivery while determining who can claim them and when.
        </p>

        <Button type="primary" size="xs" icon="add" :skeleton="isLoadingStore" :action="onAddCoupon">
            <span>Add Coupons</span>
        </Button>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        inject: ['storeState'],
        components: {
            Button
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            }
        },
        methods: {
            onAddCoupon() {
                this.$router.push({ name: 'create-store-coupon', params: { 'store_href': this.store._links.showStore } });
            }
        }
    };

</script>
