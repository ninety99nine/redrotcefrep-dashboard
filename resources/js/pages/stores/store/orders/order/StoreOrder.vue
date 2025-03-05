<template>

    <div class="pt-24 px-4">

        <!-- Order Header -->
        <OrderHeader></OrderHeader>

        <div class="grid grid-cols-12 gap-4 mb-4">

            <div class="col-span-8">

                <div class="bg-white rounded-lg p-4 mb-4">

                    <div v-if="isLoadingOrder || hasOrder" class="flex justify-end">

                        <!-- Created At -->
                        <div class="flex space-x-1 items-center">
                            <div v-if="isLoadingOrder" class="flex space-x-2">
                                <LineSkeleton width="w-32" :shine="true"></LineSkeleton>
                                <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                            </div>
                            <template v-else>
                                <span class="text-gray-500 text-xs">{{ formattedDatetime(order.createdAt) }}</span>
                                <MoreInfoPopover :title="`Created ${formattedRelativeDate(order.createdAt)}`" placement="top"></MoreInfoPopover>
                            </template>
                        </div>

                    </div>

                    <div class="space-y-4">

                        <!-- Status Select Input -->
                        <div v-if="isLoadingOrder" class="space-y-2 mt-4">
                            <h1 class="text-sm font-medium leading-6 text-gray-900">Status</h1>
                            <LineSkeleton :shine="true"></LineSkeleton>
                        </div>
                        <SelectInput
                            v-else
                            width="w-full"
                            label="Status"
                            v-model="orderForm.status">
                            <option v-for="(status, index) in statuses" :value="status" :key="index">
                                {{ status }}
                            </option>
                        </SelectInput>

                        <!-- Payment Status Select Input -->
                        <div v-if="isLoadingOrder" class="space-y-2">
                            <h1 class="text-sm font-medium leading-6 text-gray-900">Payment Status</h1>
                            <LineSkeleton :shine="true"></LineSkeleton>
                        </div>
                        <SelectInput
                            v-else
                            width="w-full"
                            label="Payment Status"
                            v-model="orderForm.paymentStatus">
                            <option v-for="(paymentStatus, index) in paymentStatuses" :value="paymentStatus" :key="index">
                                {{ paymentStatus }}
                            </option>
                        </SelectInput>

                        <div class="flex space-x-4">

                            <!-- Courier Select Input -->
                            <div class="w-1/2 space-y-2">

                                <h1 class="text-sm font-medium leading-6 text-gray-900">Courier</h1>

                                <LineSkeleton v-if="isLoadingCouriers" :shine="true"></LineSkeleton>

                                <SelectInput
                                    v-else
                                    width="w-full"
                                    v-model="orderForm.courierId">
                                    <option v-for="(courier, index) in couriers" :value="courier.name" :key="index">
                                        {{ courier.name }}
                                    </option>
                                </SelectInput>

                            </div>

                            <!-- Tracking Number Text Input -->
                            <div class="w-1/2 space-y-2">

                                <h1 class="text-sm font-medium leading-6 text-gray-900">Tracking Number</h1>

                                <LineSkeleton v-if="isLoadingCouriers" :shine="true"></LineSkeleton>

                                <TextInput
                                    v-else
                                    v-model="orderForm.trackingNumber"
                                    :errorText="getFormError('trackingNumber')">
                                </TextInput>

                            </div>

                        </div>

                        <!-- Internal Note Textarea -->
                        <TextareaInput
                            :rows="2"
                            label="Internal Note"
                            :skeleton="isLoadingOrder"
                            v-model="orderForm.storeNote"
                            labelPopoverTitle="What Is This?"
                            :errorText="getFormError('storeNote')"
                            labelPopoverDescription="Internal information about this order only visible to you and other team members">
                        </TextareaInput>

                    </div>

                </div>

                <div class="bg-white overflow-hidden rounded-lg space-y-4 p-4 mb-4">

                    <!-- Order Products -->
                    <OrderProducts :order="order" :isLoadingOrder="isLoadingOrder"></OrderProducts>

                    <!-- Order Totals -->
                    <OrderTotals :order="order" :isLoadingOrder="isLoadingOrder"></OrderTotals>

                </div>

                <div class="bg-white overflow-hidden rounded-lg space-y-4 p-4">

                    <!-- Payments -->
                    <Payments :order="order" :isLoadingOrder="isLoadingOrder"></Payments>

                </div>

            </div>

            <div class="col-span-4">

                <!-- Payment Link -->
                <PaymentLink :order="order" :isLoadingOrder="isLoadingOrder"></PaymentLink>

                <!-- Customer Summary -->
                <CustomerSummary :order="order" :isLoadingOrder="isLoadingOrder"></CustomerSummary>

                <!-- Delivery Address -->
                <DeliveryAddress :order="order" :isLoadingOrder="isLoadingOrder"></DeliveryAddress>

                <!-- Team Member -->
                <TeamMember :order="order" :isLoadingOrder="isLoadingOrder"></TeamMember>

                <!-- Order History -->
                <OrderHistory :order="order" :isLoadingOrder="isLoadingOrder"></OrderHistory>

                <div class="bg-white rounded-lg p-4">

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import axios from 'axios';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import { useApiState } from '@Stores/api-store.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import { useOrderState } from '@Stores/order-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import Payments from '@Pages/stores/store/orders/order/components/Payments.vue';
    import TeamMember from '@Pages/stores/store/orders/order/components/TeamMember.vue';
    import PaymentLink from '@Pages/stores/store/orders/order/components/PaymentLink.vue';
    import OrderTotals from '@Pages/stores/store/orders/order/components/OrderTotals.vue';
    import OrderHistory from '@Pages/stores/store/orders/order/components/OrderHistory.vue';
    import OrderProducts from '@Pages/stores/store/orders/order/components/OrderProducts.vue';
    import DeliveryAddress from '@Pages/stores/store/orders/order/components/DeliveryAddress.vue';
    import CustomerSummary from '@Pages/stores/store/orders/order/components/CustomerSummary.vue';
    import NoOrderProducts from '@Pages/stores/store/orders/order/components/NoOrderProducts.vue';
    import OrderHeader from '@Pages/stores/store/orders/order/components/OrderHeader/OrderHeader.vue';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Button, TextInput, SelectInput, TextareaInput, LineSkeleton, MoreInfoPopover,
            Payments, TeamMember, PaymentLink, OrderTotals, OrderHistory, OrderProducts,
            DeliveryAddress, CustomerSummary, NoOrderProducts, OrderHeader
        },
        data() {
            return {
                couriers: [],
                apiState: useApiState(),
                isLoadingCouriers: false,
                orderState: useOrderState(),
                storeState: useStoreState(),
                paymentStatuses: ['Paid','Unpaid','Pending Payment','Partially Paid'],
                statuses: ['Waiting','Cancelled','Completed','On Its Way','Ready For Pickup'],
            }
        },
        watch: {
            isLoadingStore(newValue) {
                if(!newValue) {
                    if(this.isEditting) {
                        this.showOrder();
                    }
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            order() {
                return this.orderState.order;
            },
            hasOrder() {
                return this.orderState.hasOrder;
            },
            orderForm() {
                return this.orderState.orderForm;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            isEditting() {
                return this.$route.name === 'show-store-order';
            }
        },
        methods: {
            async showOrder() {

                this.orderState.setIsLoadingOrder(true);

                const url = this.$route.params.order_href;

                let config = {
                    params: {
                        '_relationships': 'courier,customer,deliveryAddress,orderFees,orderComments,orderProducts.product.photos,orderDiscounts,orderPromotions,orderHistory'
                    }
                }

                await axios.get(url, config).then(response => {

                    if(response.status == 200 && response.data.exists) {

                        const order = response.data.order;
                        this.orderState.setOrder(order);
                        this.orderState.setOrderForm(order);

                    }else{

                        if(response.data.exists) {
                            this.setFormError('general', response.data.message);
                        }else{
                            this.showUnsuccessfulNotification('This order does not exist');
                        }

                        this.$router.push({ name: 'show-store-orders', params: { 'store_href': this.store._links.showStore } });
                    }

                }).catch(errorException => {
                    this.setServerFormErrors(errorException);
                });

                this.orderState.setIsLoadingOrder(false);

            },
            async showCouriers() {

                if(this.couriers.length) return;

                this.isLoadingCouriers = true;

                const url = this.apiState.apiHome['_links']['showCouriers'];

                let config = {
                    params: {
                        'per_page': 100
                    }
                }

                await axios.get(url, config).then(response => {

                    if(response.status == 200) {
                        this.couriers = response.data.data;
                    }else{
                        this.setFormError('general', response.data.message);
                        this.showUnsuccessfulNotification(response.data.message);
                    }

                }).catch(errorException => {
                    this.setServerFormErrors(errorException);
                });

                this.isLoadingCouriers = false;

            }
        },
        created() {
            this.showCouriers();
            this.orderState.setEmptyOrderForm();
            if(this.isEditting) this.orderState.setIsLoadingOrder(true);
        }
    };

</script>
