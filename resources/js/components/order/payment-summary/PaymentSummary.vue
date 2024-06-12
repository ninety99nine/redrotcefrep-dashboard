<template>

    <div class="mb-4">

        <div class="bg-white shadow-lg rounded-lg border p-4">

            <div class="space-y-3">

                <p class="font-bold text-lg">Payment</p>

                <!-- Amount Paid -->
                <div class="flex items-center space-x-2 text-sm">
                    <span>Amount Paid: </span>
                    <LineSkeleton v-if="isLoadingOrder" width="w-32"></LineSkeleton>
                    <span v-else class="font-bold">{{ order.amountPaid.amountWithCurrency }}</span>
                </div>

                <!-- Amount Paid Progress Bar -->
                <LineSkeleton v-if="isLoadingOrder" width="w-full"></LineSkeleton>
                <div v-else class="w-3/4 flex items-center space-x-4">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div class="bg-green-500 h-2.5 rounded-full" :style="'width: '+order.amountPaidPercentage.value+'%'"></div>
                    </div>
                    <span class="text-xs">{{ order.amountPaidPercentage.valueSymbol }}</span>
                </div>

            </div>

        </div>

        <div  v-if="!isLoadingOrder" class="bg-white shadow-lg rounded-lg border p-4 mt-4">

            <!-- Order Transactions -->
            <OrderTransactions :order="order" :refreshOrder="refreshOrder">

                <template #actionButtons>

                    <slot name="actionButtons"></slot>

                </template>

            </OrderTransactions>

        </div>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { getApi } from '@Repositories/api-repository.js';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import OrderTransactions from '@Components/order/transactions/OrderTransactions.vue';
    import PayingUserTransaction from '@Components/order/payment-summary/PayingUserTransaction.vue';

    export default {
        mixins: [FormMixin],
        components: { LineSkeleton, MoreInfoPopover, BadgeIndicator, OrderTransactions, PayingUserTransaction },
        props: {
            order: {
                type: Object
            },
            isLoadingOrder: {
                type: Boolean
            },
            refreshOrder: {
                type: Function
            }
        },
        data() {
            return {
                payingUsers: [],
                isLoadingPayingUsers: false
            }
        },
        watch: {
            order(newValue, oldValue) {
                if(newValue != null) {
                    this.showPayingUsers();
                }
            },
        },
        methods: {

            showPayingUsers() {

                //  Start loader
                this.isLoadingPayingUsers = true;

                //  Set the query params
                const params = {
                    'withPaymentMethod': '1',
                    'withLatestTransaction': '1',
                    'withTransactionsCount': '1',
                    'withPaidTransactionsCount': '1',
                };

                getApi(this.order._links.showOrderPayingUsers, params).then(response => {

                    if(response.status == 200) {

                        this.payingUsers = response.data.data;

                    }

                    //  Stop loader
                    this.isLoadingPayingUsers = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingPayingUsers = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
        }
    };

</script>
