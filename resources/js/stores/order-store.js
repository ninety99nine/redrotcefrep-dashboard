import { defineStore } from 'pinia';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import { useApiState } from '@Stores/api-store.js';
import { formattedDate } from '@Utils/dateUtils.js';
import { useFormState } from '@Stores/form-store.js';
import { useStoreState } from '@Stores/store-store.js';
import { useNotificationState } from '@Stores/notification-store.js';
import { useChangeHistoryState } from '@Stores/change-history-store.js';

export const useOrderState = defineStore('order', {
    state: () => {
        return {
            order: null,
            orderForm: null,
            shoppingCart: null,
            isLoadingOrder: false,
            isCreatingOrder: false,
            isUpdatingOrder: false,
            isDeletingOrder: false,
            originalOrderForm: null,
            isInspectingShoppingCart: false
        }
    },
    actions: {
        saveState(actionName) {
            useChangeHistoryState().saveState(actionName, this.orderForm);
        },
        saveStateDebounced(actionName) {
            useChangeHistoryState().saveStateDebounced(actionName, this.orderForm);
        },
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
        setIsInspectingShoppingCart(status) {
            this.isInspectingShoppingCart = status;
        },
        setEmptyOrderForm() {

            useChangeHistoryState().resetHistory();

            this.orderForm = {
                cartFees: [],
                remark: null,
                courierId: null,
                adjustment: null,
                cartProducts: [],
                deliveryDate: '',
                status: 'waiting',
                internalNote: null,
                cartPromotions: [],
                trackingNumber: null,
                deliveryAddress: null,
                deliveryTimeslot: null,
                deliveryMethodId: null,
                assignedToUserId: null,
                paymentStatus: 'unpaid',
                customer: {
                    email: null,
                    lastName: null,
                    firstName: null,
                    mobileNumber: null,
                    updateProfile: true
                },
                schedule: {
                    showAllDates: false,
                    showAllTimeslots: false,
                    changeDeliverySchedule: false
                }
            };

            useStoreState().store.checkoutFees.forEach((checkoutFee) => {
                this.addCartFeeUsingCheckoutFee(checkoutFee);
            });

            useChangeHistoryState().resetHistory();
            this.saveState('Original order');
            this.setOriginalOrderForm();

        },
        setOrderForm(order) {

            useChangeHistoryState().resetHistory();

            this.orderForm = {
                cartFees: [],
                cartProducts: [],
                cartPromotions: [],
                remark: order.remark,
                courierId: order.courierId,
                internalNote: order.internalNote,
                trackingNumber: order.trackingNumber,
                status: order.status.name.toLowerCase(),
                assignedToUserId: order.assignedToUserId,
                deliveryTimeslot: order.deliveryTimeslot,
                deliveryMethodId: order.deliveryMethodId,
                deliveryAddress: order._relationships.deliveryAddress,
                paymentStatus: order.paymentStatus.name.toLowerCase(),
                adjustment: order.adjustmentTotal.amountWithoutCurrency,
                deliveryDate: order.deliveryDate ? formattedDate(order.deliveryDate) : null,
                customer: {
                    updateProfile: true,
                    email: order.customerEmail,
                    lastName: order.customerLastName,
                    firstName: order.customerFirstName,
                    mobileNumber: order.customerMobileNumber ? order.customerMobileNumber.international : null
                },
                schedule: {
                    showAllDates: true,
                    showAllTimeslots: true,
                    changeDeliverySchedule: false
                }
            };

            order._relationships.orderProducts.forEach((orderProduct) => {
                this.addCartProductUsingOrderProduct(orderProduct);
            });

            order._relationships.orderPromotions.forEach((orderPromotion) => {
                this.addCartPromotionUsingOrderPromotion(orderPromotion);
            });

            order._relationships.orderFees.forEach((orderFee) => {
                this.addCartFeeUsingOrderFee(orderFee);
            });

            useStoreState().store.checkoutFees.forEach((checkoutFee) => {
                const exists = this.orderForm.cartFees.some((cartFee) => cartFee.name === checkoutFee.name);
                if(!exists) this.addCartFeeUsingCheckoutFee(checkoutFee, false);
            });

            this.saveState('Original order');
            this.setOriginalOrderForm();
        },
        setOriginalOrderForm() {
            this.originalOrderForm = cloneDeep(this.orderForm);
        },
        addCartCustomer(customer) {

            const hasCustomerDetails = this.hasCustomerDetails;

            this.orderForm.customer.email = customer.email;
            this.orderForm.customer.lastName = customer.lastName;
            this.orderForm.customer.firstName = customer.firstName;
            this.orderForm.customer.mobileNumber = customer.mobileNumber.international;

            if(hasCustomerDetails) {
                this.saveState('Customer changed');
            }else{
                this.saveState('Customer added');
            }
        },
        addCartProductUsingOrderProduct(orderProduct) {

            const photo = orderProduct._relationships?.photo;

            // Convert numeric values to numbers to prevent issues with decimal formatting
            const unitSalePrice = Number(orderProduct.unitSalePrice.amount);
            const unitRegularPrice = Number(orderProduct.unitRegularPrice.amount);

            const existingProduct = this.orderForm.cartProducts.find(p =>
                p.name === orderProduct.name &&
                Number(p.unitSalePrice) === unitSalePrice &&
                Number(p.unitRegularPrice) === unitRegularPrice
            );

            if (existingProduct) {

                // Increase quantity if product already exists
                existingProduct.quantity = (parseInt(existingProduct.quantity) + 1).toString();

            } else {

                // Add as a new product
                this.orderForm.cartProducts.push({
                    'name': orderProduct.name,
                    'id': orderProduct.productId,
                    'isFree': orderProduct.isFree.status,
                    'quantity': orderProduct.quantity.toString(),
                    'photoFilePath': photo ? photo.filePath : null,
                    'unitWeight': orderProduct.unitWeight.toString(),
                    'unitSalePrice': orderProduct.unitSalePrice.amount,
                    'unitRegularPrice': orderProduct.unitRegularPrice.amount
                });

            }
        },
        addCartProductUsingProduct(product = null) {

            const photo = product._relationships.photo;

            // Convert numeric values to numbers for consistent comparison
            const unitSalePrice = Number(product.unitSalePrice.amount);
            const unitRegularPrice = Number(product.unitRegularPrice.amount);

            const existingProduct = this.orderForm.cartProducts.find(p =>
                p.name === product.name &&
                Number(p.unitSalePrice) === unitSalePrice &&
                Number(p.unitRegularPrice) === unitRegularPrice
            );

            if (existingProduct) {

                // Increase quantity if product already exists
                existingProduct.quantity = (parseInt(existingProduct.quantity) + 1).toString();

            } else {

                // Add as a new product
                this.orderForm.cartProducts.push({
                    'quantity': '1',
                    'id': product.id,
                    'name': product.name,
                    'isFree': product.isFree.status,
                    'unitWeight': product.unitWeight.toString(),
                    'photoFilePath': photo ? photo.filePath : null,
                    'unitSalePrice': product.unitSalePrice.amount,
                    'unitRegularPrice': product.unitRegularPrice.amount
                });

            }

            this.saveState('Product added');
        },
        addCartProduct() {

            this.orderForm.cartProducts.push({
                'name': '',
                'isFree': false,
                'quantity': '1',
                'unitWeight': '0',
                'photoFilePath': null,
                'unitSalePrice': '0.00',
                'unitRegularPrice': '0.00'
            });

            this.saveState('Product added');

        },
        removeCartProduct(index) {
            this.orderForm.cartProducts.splice(index, 1);
            this.saveState('Product removed');
        },
        addCartPromotionUsingOrderPromotion(orderPromotion) {

            const discountPercentageRate = Number(orderPromotion.discountPercentageRate.value);
            const discountFlatRate = Number(orderPromotion.discountFlatRate.amountWithoutCurrency);

            const existingPromotion = this.orderForm.cartPromotions.find(p =>
                p.name === orderPromotion.name &&
                Number(p.discountFlatRate) === discountFlatRate &&
                p.discountRateType === orderPromotion.discountRateType &&
                p.offerDiscount === orderPromotion.offerDiscount.status &&
                Number(p.discountPercentageRate) === discountPercentageRate &&
                p.offerFreeDelivery === orderPromotion.offerFreeDelivery.status
            );

            if (!existingPromotion) {

                // Add as a new promotion
                this.orderForm.cartPromotions.push({
                    'name': orderPromotion.name,
                    'discountRateType': orderPromotion.discountRateType,
                    'offerDiscount': orderPromotion.offerDiscount.status,
                    'offerFreeDelivery': orderPromotion.offerFreeDelivery.status,
                    'discountFlatRate': orderPromotion.discountFlatRate.amountWithoutCurrency,
                    'discountPercentageRate': orderPromotion.discountPercentageRate.value.toString()
                });

            }
        },
        addCartPromotionUsingPromotion(promotion = null) {

            const discountPercentageRate = Number(promotion.discountPercentageRate.value);
            const discountFlatRate = Number(promotion.discountFlatRate.amountWithoutCurrency);

            const existingPromotion = this.orderForm.cartPromotions.find(p =>
                p.name === promotion.name &&
                Number(p.discountFlatRate) === discountFlatRate &&
                p.discountRateType === promotion.discountRateType &&
                p.offerDiscount === promotion.offerDiscount.status &&
                Number(p.discountPercentageRate) === discountPercentageRate &&
                p.offerFreeDelivery === promotion.offerFreeDelivery.status
            );

            if (!existingPromotion) {

                // Add as a new promotion
                this.orderForm.cartPromotions.push({
                    'name': promotion.name,
                    'discountRateType': promotion.discountRateType,
                    'offerDiscount': promotion.offerDiscount.status,
                    'offerFreeDelivery': promotion.offerFreeDelivery.status,
                    'discountFlatRate': promotion.discountFlatRate.amountWithoutCurrency,
                    'discountPercentageRate': promotion.discountPercentageRate.value.toString()
                });

            }

            this.saveState('Promotion added');
        },
        addCartPromotion() {

            this.orderForm.cartPromotions.push({
                'name': '',
                'offerDiscount': false,
                'discountFlatRate': '0',
                'discountRateType': 'flat',
                'offerFreeDelivery': false,
                'discountPercentageRate': '0'
            });

            this.saveState('Promotion added');

        },
        removeCartPromotion(index) {
            this.orderForm.cartPromotions.splice(index, 1);
            this.saveState('Promotion removed');
        },
        addCartFeeUsingOrderFee(orderFee) {
            this.orderForm.cartFees.push({
                'active': true,
                'removable': false,
                'name': orderFee.name,
                'rateType': orderFee.rateType,
                'flatRate': orderFee.amount.amountWithoutCurrency,
                'percentageRate': orderFee.percentageRate.value.toString()
            });
        },
        addCartFeeUsingCheckoutFee(checkoutFee, active = true) {
            this.orderForm.cartFees.push({
                'active': active,
                'removable': false,
                'name': checkoutFee.name,
                'rateType': checkoutFee.rateType,
                'flatRate': checkoutFee.flatRate.amountWithoutCurrency,
                'percentageRate': checkoutFee.percentageRate.value.toString(),
            });
        },
        addCartFee() {
            this.orderForm.cartFees.push({
                'name': '',
                'active': true,
                'flatRate': '0',
                'removable': true,
                'rateType': 'flat',
                'percentageRate': '0',
            });
            this.saveState('Fee added');
        },
        removeCartFee(index) {
            this.orderForm.cartFees.splice(index, 1);
            this.saveState('Fee removed');
        },
        inspectStoreShoppingCartDelayed: debounce(function () {
            this.inspectStoreShoppingCart();
        }, 1000),
        async inspectStoreShoppingCart() {

            this.setIsInspectingShoppingCart(true);

            const url = useApiState().apiHome['_links']['inspectShoppingCart'];

            const data = {
                ...this.orderForm,
                'association': 'team member',
                storeId: useStoreState().store.id
            };

            return await axios.post(url, data).then(response => {

                if(response.status == 200) {
                    this.shoppingCart = response.data;
                }else{
                    useFormState().setGeneralFormError(response.data.message);
                    useNotificationState().showWarningNotification(response.data.message);
                }

                return response;

            }).catch(errorException => {
                useFormState().setServerFormErrors(errorException);
                useNotificationState().showWarningNotification(errorException.response.data.message);
            }).finally(() => {
                this.setIsInspectingShoppingCart(false);
            });
        },
        async showOrder(url, params) {

            this.setIsLoadingOrder(true);

            let config = {
                params: params
            }

            return await axios.get(url, config).then(response => {

                if(response.status == 200 && response.data.exists) {

                    const order = response.data.order;
                    this.setOrderForm(order);
                    this.setOrder(order);

                }else{

                    if(response.data.exists) {
                        useFormState().setGeneralFormError(response.data.message);
                    }else{
                        useNotificationState().showWarningNotification('This order does not exist');
                    }

                }

                return response;

            }).catch(errorException => {
                useFormState().setServerFormErrors(errorException);
            }).finally(() => {
                this.setIsLoadingOrder(false);
            });

        },
        async updateOrder(data) {

            this.setIsUpdatingOrder(true);

            const url = this.order._links.updateOrder;

            return await axios.put(url, data).then(response => {

                if(response.status == 200 && response.data['updated']) {

                }else{

                    useFormState().setGeneralFormError(response.data.message);
                    useNotificationState().showWarningNotification(response.data.message);

                }

                return response;

            }).catch(errorException => {
                useFormState().setServerFormErrors(errorException);
            }).finally(() => {
                this.setIsUpdatingOrder(false);
            });

        },
        async deleteOrder() {

            this.setIsDeletingOrder(true);

            const url = this.order._links.showOrder;

            return await axios.delete(url).then(response => {

                if(response.status == 200 && response.data['deleted']) {

                }else{

                    useFormState().setGeneralFormError(response.data.message);
                    useNotificationState().showWarningNotification(response.data.message);

                }

                return response;

            }).catch(errorException => {
                useFormState().setServerFormErrors(errorException);
            }).finally(() => {
                this.setIsDeletingOrder(false);
            });

        },
    },
    getters: {
        hasOrder() {
            return this.order != null;
        },
        formHasChanged() {
            return !isEqual(this.orderForm, this.originalOrderForm);
        },
        canSaveChanges() {
            return this.formHasChanged && !this.isSubmitting;
        },
        hasCustomerEmail() {
            return !!(this.orderForm.customer?.email?.trim());
        },
        hasCustomerMobileNumber() {
            return !!(this.orderForm.customer?.mobileNumber?.trim());
        },
        hasCustomerDetails() {
            return !!(
                this.orderForm?.customer &&
                (
                    this.orderForm.customer.email?.trim() ||
                    this.orderForm.customer.firstName?.trim() ||
                    this.orderForm.customer.lastName?.trim() ||
                    this.orderForm.customer.mobileNumber?.trim()
                )
            );
        }
    }
})
