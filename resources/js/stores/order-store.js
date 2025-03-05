import { defineStore } from 'pinia';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export const useOrderState = defineStore('order', {
    state: () => {
        return {
            order: null,
            orderForm: null,
            isLoadingOrder: false,
            isCreatingOrder: false,
            isUpdatingOrder: false,
            isDeletingOrder: false,
            originalOrderForm: null
        }
    },
    actions: {
        setOrder(order) {
            this.order = order;
        },
        setIsLoadingOrder(status) {
            this.isLoadingOrder = status;
        },
        setIsCreatingOrder(status) {
            this.isCreatingOrder = status;
        },
        setIsUpdatingOrder(status) {
            this.isUpdatingOrder = status;
        },
        setIsDeletingOrder(status) {
            this.isDeletingOrder = status;
        },
        setEmptyOrderForm() {

            this.orderForm = {
                storeNote: null,
                courierId: null,
                status: 'Waiting',
                trackingNumber: null,
                paymentStatus: 'Unpaid'
            };

            this.setOriginalOrderForm();

        },
        setOrderForm(order) {

            this.orderForm = {
                status: order.status.name,
                storeNote: order.storeNote,
                courierId: order.status.courierId,
                trackingNumber: order.trackingNumber,
                paymentStatus: order.paymentStatus.name
            };

            this.setOriginalOrderForm();

        },
        setOriginalOrderForm() {
            this.originalOrderForm = cloneDeep(this.orderForm);
        }
    },
    getters: {
        hasOrder() {
            return this.order != null;
        },
        formHasChanged() {
            var a = cloneDeep(this.orderForm);
            var b = cloneDeep(this.originalOrderForm);
            return !isEqual(a, b);
        },
        mustSaveChanges() {
            return this.formHasChanged && !this.isSubmitting;
        }
    },
})
