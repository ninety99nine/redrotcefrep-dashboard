<template>

    <div class="select-none bg-white rounded-lg p-4 mb-4">

        <div class="flex justify-between items-center">

            <div class="flex items-center space-x-4">

                <!-- Back Button -->
                <BackButton></BackButton>

                <div v-if="isLoadingStore || isLoadingOrder || (isEditting && !hasOrder)" class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <span class="text-2xl font-bold tracking-tight text-gray-300">Order #</span>
                        <LineSkeleton width="w-12" :shine="true"></LineSkeleton>
                        <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                    </div>
                    <div class="flex space-x-1">
                        <LineSkeleton width="w-16" :shine="true"></LineSkeleton>
                        <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                    </div>
                    <div class="flex space-x-1">
                        <LineSkeleton width="w-24" :shine="true"></LineSkeleton>
                        <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                    </div>
                </div>

                <!-- Heading -->
                <h1 v-else class="text-xl text-gray-700 font-semibold">
                    {{ isCreating ? 'Add Order' : 'Order #'+order._attributes.number }}
                </h1>

                <template v-if="hasOrder">

                    <!-- Status -->
                    <Status></Status>

                    <!-- Payment Status -->
                    <PaymentStatus></PaymentStatus>

                </template>

            </div>

            <template v-if="!isEditting && !isCreating">

                <div class="flex space-x-2 items-center">

                    <!-- Whatsapp Button -->
                    <WhatsappButton></WhatsappButton>

                    <!-- Edit Button -->
                    <EditButton></EditButton>

                    <!-- Print Button -->
                    <PrintButton></PrintButton>

                    <!-- Download Button -->
                    <DownloadButton></DownloadButton>

                    <!-- Navigation Arrows -->
                    <NavigationArrows></NavigationArrows>

                </div>

            </template>

            <template v-else>

                <div class="flex items-center space-x-8">

                    <!-- Change History Navigation -->
                    <ChangeHistoryNavigation></ChangeHistoryNavigation>

                    <!-- Create Order Button -->
                    <CreateOrderButton v-if="isCreating"></CreateOrderButton>

                    <!-- Save Changes Button -->
                    <SaveChangesButton v-else></SaveChangesButton>

                </div>

            </template>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import Status from '@Pages/stores/store/orders/order/components/order-header/Status.vue';
    import BackButton from '@Pages/stores/store/orders/order/components/order-header/BackButton.vue';
    import EditButton from '@Pages/stores/store/orders/order/components/order-header/EditButton.vue';
    import PrintButton from '@Pages/stores/store/orders/order/components/order-header/PrintButton.vue';
    import PaymentStatus from '@Pages/stores/store/orders/order/components/order-header/PaymentStatus.vue';
    import DownloadButton from '@Pages/stores/store/orders/order/components/order-header/DownloadButton.vue';
    import WhatsappButton from '@Pages/stores/store/orders/order/components/order-header/WhatsappButton.vue';
    import NavigationArrows from '@Pages/stores/store/orders/order/components/order-header/NavigationArrows.vue';
    import CreateOrderButton from '@Pages/stores/store/orders/order/components/order-header/CreateOrderButton.vue';
    import SaveChangesButton from '@Pages/stores/store/orders/order/components/order-header/SaveChangesButton.vue';
    import ChangeHistoryNavigation from '@Pages/stores/store/orders/order/components/order-header/change-history-navigation/ChangeHistoryNavigation.vue';

    export default {
        inject: ['storeState', 'orderState'],
        components: {
            Button, LineSkeleton, Status, BackButton, EditButton, PrintButton, PaymentStatus,
            DownloadButton, WhatsappButton, NavigationArrows, CreateOrderButton,
            SaveChangesButton, ChangeHistoryNavigation
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
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            isEditting() {
                return this.$route.name === 'edit-store-order';
            },
            isCreating() {
                return this.$route.name === 'create-store-order';
            }
        }
    };

</script>
