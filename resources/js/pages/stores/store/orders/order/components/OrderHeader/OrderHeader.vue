<template>

    <div class="bg-white rounded-lg p-4 mb-4">

        <div class="flex justify-between items-center">

            <div class="flex items-center space-x-4">

                <!-- Back Button -->
                <BackButton></BackButton>

                <div v-if="isLoadingOrder" class="flex items-center space-x-2">
                    <span class="text-2xl font-bold tracking-tight text-gray-300">Order #</span>
                    <div class="flex space-x-2">
                        <LineSkeleton width="w-12" :shine="true"></LineSkeleton>
                        <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                    </div>
                </div>

                <!-- Heading -->
                <h1 v-else class="text-xl text-gray-700 font-semibold">
                    {{ isCreating ? 'Add Order' : 'Order #'+order._attributes.number }}
                </h1>

                <template v-if="isLoadingOrder || hasOrder">

                    <!-- Status -->
                    <Status></Status>

                    <!-- Payment Status -->
                    <PaymentStatus></PaymentStatus>

                </template>

            </div>

            <div v-if="isLoadingOrder || hasOrder" class="flex space-x-2 items-center">

                <!-- Whatsapp Button -->
                <WhatsappButton></WhatsappButton>

                <!-- Edit Button -->
                <Button type="light" size="xs" :skeleton="isLoadingOrder" :action="null">
                    <span>Edit</span>
                </Button>

                <!-- Print Button -->
                <PrintButton></PrintButton>

                <!-- Download Button -->
                <DownloadButton></DownloadButton>

                <div class="flex space-x-2 items-center">

                    <!-- Next Order -->
                    <Button type="light" size="xs" :skeleton="isLoadingOrder" :action="null" icon="chevron-left-arrow"></Button>

                    <!-- Previous Order -->
                    <Button type="light" size="xs" :skeleton="isLoadingOrder" :action="null" icon="chevron-right-arrow"></Button>

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { useOrderState } from '@Stores/order-store.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import Status from '@Pages/stores/store/orders/order/components/OrderHeader/Status.vue';
    import BackButton from '@Pages/stores/store/orders/order/components/OrderHeader/BackButton.vue';
    import PrintButton from '@Pages/stores/store/orders/order/components/OrderHeader/PrintButton.vue';
    import PaymentStatus from '@Pages/stores/store/orders/order/components/OrderHeader/PaymentStatus.vue';
    import DownloadButton from '@Pages/stores/store/orders/order/components/OrderHeader/DownloadButton.vue';
    import WhatsappButton from '@Pages/stores/store/orders/order/components/OrderHeader/WhatsappButton.vue';

    export default {
        components: {
            Button, LineSkeleton, Status, BackButton, PrintButton, PaymentStatus,
            DownloadButton, WhatsappButton
        },
        data() {
            return {
                orderState: useOrderState()
            }
        },
        computed: {
            order() {
                return this.orderState.order;
            },
            hasOrder() {
                return this.orderState.hasOrder;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isCreating() {
                return this.$route.name === 'create-store-order';
            }
        }
    };

</script>
