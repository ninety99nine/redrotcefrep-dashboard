<template>

    <div class="bg-white rounded-lg p-4 mb-4">

        <!-- Order Basics (Loading Placeholder) -->
        <div v-if="isLoadingStore || isLoadingOrder || !hasOrder" class="grid grid-cols-2 gap-4">

            <div class="col-span-2">

                <div class="flex items-center justify-end space-x-1">
                    <LineSkeleton width="w-32" :shine="true"></LineSkeleton>
                    <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                </div>

            </div>

            <div class="col-span-1 space-y-2">
                <span class="text-sm leading-6 font-medium text-gray-900">Status</span>
                <LineSkeleton width="w-full" height="h-8" rounded="rounded-md" :shine="true"></LineSkeleton>
            </div>

            <div class="col-span-1 space-y-2">
                <span class="text-sm leading-6 font-medium text-gray-900">Payment Status</span>
                <LineSkeleton width="w-full" height="h-8" rounded="rounded-md" :shine="true"></LineSkeleton>
            </div>

            <div class="col-span-1 space-y-2">
                <span class="text-sm leading-6 font-medium text-gray-900">Courier</span>
                <LineSkeleton width="w-full" height="h-8" rounded="rounded-md" :shine="true"></LineSkeleton>
            </div>

            <div class="col-span-1 space-y-2">
                <span class="text-sm leading-6 font-medium text-gray-900">Tracking Number</span>
                <LineSkeleton width="w-full" height="h-8" rounded="rounded-md" :shine="true"></LineSkeleton>
            </div>

            <div class="col-span-2 space-y-2">
                <span class="text-sm leading-6 font-medium text-gray-900">Internal Note</span>
                <LineSkeleton width="w-full" height="h-16" rounded="rounded-md" :shine="true"></LineSkeleton>
            </div>

            <div class="col-span-2 space-y-2">
                <span class="text-sm leading-6 font-medium text-gray-900">Remark</span>
                <LineSkeleton width="w-full" height="h-16" rounded="rounded-md" :shine="true"></LineSkeleton>
            </div>

        </div>

        <div v-else class="grid grid-cols-2 gap-4">

            <div class="col-span-2">

                <div class="flex items-center justify-end space-x-1">
                    <span class="text-gray-500 text-xs">{{ formattedDatetime(order.createdAt) }}</span>
                    <CustomPopover :content="`Created ${formattedRelativeDate(order.createdAt)}`"></CustomPopover>
                </div>

            </div>

            <!-- Status Select Input -->
            <div class="col-span-1">

                <CustomSelect
                    label="Status"
                    :search="false"
                    :options="statuses"
                    v-model="orderForm.status"
                    @change="(status) => updateOrder({ status: status }, 'status')">
                </CustomSelect>

            </div>

            <!-- Payment Status Select Input -->
            <div class="col-span-1">

                <CustomSelect
                    :search="false"
                    label="Payment Status"
                    :options="paymentStatuses"
                    v-model="orderForm.paymentStatus"
                    @change="(paymentStatus) => updateOrder({ paymentStatus: paymentStatus }, 'payment status')">
                </CustomSelect>

            </div>

            <!-- Courier Select Input -->
            <div class="col-span-1">

                <CustomSelect
                    :search="true"
                    label="Courier"
                    :options="couriers"
                    v-model="orderForm.courierId"
                    :errorText="formState.getFormError('courierId')"
                    @change="(courierId) => updateOrder({ courierId: courierId }, 'courier')">
                </CustomSelect>

            </div>

            <!-- Tracking Number Text Input -->
            <div class="col-span-1">

                <CustomInput
                    type="text"
                    label="Tracking Number"
                    v-model="orderForm.trackingNumber"
                    :errorText="formState.getFormError('trackingNumber')"
                    @blur="(trackingNumber) => updateOrder({ trackingNumber: trackingNumber }, 'tracking number')">
                </CustomInput>

            </div>

            <!-- Internal Note Textarea -->
            <div class="col-span-2">

                <CustomInput
                    rows="2"
                    type="textarea"
                    label="Internal Note"
                    v-model="orderForm.internalNote"
                    description="Visible to team members"
                    :errorText="formState.getFormError('internalNote')"
                    @blur="(internalNote) => updateOrder({ internalNote: internalNote }, 'internal note')"
                    tooltipContent="Internal information about this order only visible to you and other team members">
                </CustomInput>

            </div>

            <!-- Remark Textarea -->
            <div class="col-span-2">

                <CustomInput
                    rows="2"
                    type="textarea"
                    label="Remark"
                    placeholder="Optional"
                    v-model="orderForm.remark"
                    description="Visible to customer"
                    :errorText="formState.getFormError('remark')"
                    @blur="(remark) => updateOrder({ remark: remark }, 'remark')"
                    tooltipContent="Use the Remark field to add a note that will be visible to the customer, such as special instructions, order details, or personalized messages.">
                </CustomInput>

            </div>

        </div>

    </div>

</template>

<script>

    import axios from 'axios';
    import { capitalize } from '@Utils/stringUtils.js';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import CustomSelect from '@Partials/inputs/CustomSelect.vue';
    import CustomPopover from '@Partials/inputs/CustomPopover.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import { formattedDatetime, formattedRelativeDate } from '@Utils/dateUtils.js';

    export default {
        inject: ['apiState', 'formState', 'orderState', 'storeState', 'notificationState'],
        components: { CustomInput, CustomSelect, CustomPopover, LineSkeleton },
        data() {
            return {
                couriers: [],
                isLoadingCouriers: false
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
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isEditting() {
                return this.$route.name === 'edit-store-order';
            },
            statuses() {
                const options = ['waiting','cancelled','completed','on its way','ready for pickup'];

                return options.map((option) => {
                    return {
                        'label': capitalize(option),
                        'value': option
                    }
                });
            },
            paymentStatuses() {
                const options = ['paid','unpaid','pending payment','partially paid'];

                return options.map((option) => {
                    return {
                        'label': capitalize(option),
                        'value': option
                    }
                });
            }
        },
        methods: {
            formattedDatetime: formattedDatetime,
            formattedRelativeDate: formattedRelativeDate,
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
                        this.couriers = response.data.data.map((courier) => {
                            return {
                                'label': capitalize(courier.name),
                                'value': courier.id
                            }
                        });
                    }else{
                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);
                    }

                }).catch(errorException => {
                    this.formState.setServerFormErrors(errorException);
                });

                this.isLoadingCouriers = false;

            },
            async updateOrder(data, type) {

                const response = await this.orderState.updateOrder(data);

                if(response.status == 200 && response.data['updated']) {

                    if(type == 'status') {
                        this.notificationState.showSuccessNotification(`Order ${this.orderForm.status}`);
                    }else if(type == 'payment status') {
                        this.notificationState.showSuccessNotification(`Order ${this.orderForm.paymentStatus}`);
                    }else if(type == 'courier') {
                        if(this.orderForm.courierId) {
                            const courier = this.couriers.find(courier => courier.value === this.orderForm.courierId);
                            this.notificationState.showSuccessNotification(`Courier updated to ${courier.label}`);
                        }else{
                            this.notificationState.showSuccessNotification(`Courier removed`);
                        }
                    }else if(type == 'tracking number') {
                        if(this.orderForm.trackingNumber) {
                            this.notificationState.showSuccessNotification(`Tracking number updated to ${this.orderForm.trackingNumber}`);
                        }else{
                            this.notificationState.showSuccessNotification(`Tracking number removed`);
                        }
                    }else if(type == 'remark') {
                        if(this.orderForm.remark) {
                            this.notificationState.showSuccessNotification(`Remark updated`);
                        }else{
                            this.notificationState.showSuccessNotification(`Remark removed`);
                        }
                    }else if(type == 'internal note') {
                        if(this.orderForm.internalNote) {
                            this.notificationState.showSuccessNotification(`Internal note updated`);
                        }else{
                            this.notificationState.showSuccessNotification(`Internal note removed`);
                        }
                    }else {
                        this.notificationState.showSuccessNotification(`Order updated`);
                    }

                }

            }
        },
        created() {
            this.showCouriers();
        }
    };

</script>
