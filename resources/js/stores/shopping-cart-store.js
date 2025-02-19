import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import { useApiState } from '@Stores/api-store.js';
import { useAuthState } from '@Stores/auth-store.js';
import { useFormState } from '@Stores/form-store.js';
import { useStoreState } from '@Stores/store-store.js';
import { getApi, postApi } from '@Repositories/api-repository.js';
import { useNotificationState } from '@Stores/notification-store.js';

export const TIP_TYPES = {
    NONE: { type: 'none', value: 'none' },
    FIXED: { type: 'fixed', value: 'specify' },
    PERCENTAGE: (value) => ({ type: 'percentage', value }),
};

export const useShoppingCartState = defineStore('shoppingCart', {
    state: () => {
        return {
            products: [],
            searchTerm: '',
            shoppingCart: null,
            tip: TIP_TYPES.NONE,
            deliveryMethod: null,
            deliveryMethods: [],
            customizeDrawer: null,
            shoppingCartForm: null,
            mappedCartProducts: {},
            isCreatingOrder: false,
            apiState: useApiState(),
            nonSelectedProducts: [],
            productsPagination: null,
            isLoadingProducts: false,
            shoppingCartDrawer: null,
            authState: useAuthState(),
            isSearchingProducts: false,
            originalShoppingCartForm: null,
            isInspectingShoppingCart: false,
            isLoadingDeliveryMethods: false,
            deliveryMethodsPagination: null,
            nonSelectedProductsPagination: null,
            isLoadingNonSelectedProducts: false,
            isSearchingNonSelectedProducts: false,
            delayedInspectStoreShoppingCart: null,
        };
    },
    actions: {
        reset() {
            this.shoppingCart = null;
            this.setShoppingCartForm();
            this.isInspectingShoppingCart = false;
        },
        clearSearch() {
            this.searchTerm = '';
            this.showShoppingProducts();
        },
        openCustomizeDrawer() {
            this.closeShoppingCartDrawer();
            this.customizeDrawer.showDrawer();
        },
        closeCustomizeDrawer() {
            this.customizeDrawer.hideDrawer();
        },
        openShoppingCartDrawer() {
            this.closeCustomizeDrawer();
            this.shoppingCartDrawer.showDrawer();
        },
        toggleShoppingCartDrawer() {
            this.closeCustomizeDrawer();
            this.shoppingCartDrawer.toggleDrawer();
        },
        closeShoppingCartDrawer() {
            this.shoppingCartDrawer.hideDrawer();
        },
        addToCart(product, quantity = '1', mappedCartProducts = null) {
            var mappedCartProducts = mappedCartProducts ? mappedCartProducts : this.mappedCartProducts;

            if (!mappedCartProducts[product.id]) {
                mappedCartProducts[product.id] = {
                    ...product,
                    quantity: quantity
                };
            } else {
                this.increaseQuantity(product.id, quantity, mappedCartProducts);
            }
        },
        removeFromCart(productId, mappedCartProducts = null) {
            var mappedCartProducts = mappedCartProducts ? mappedCartProducts : this.mappedCartProducts;

            if (mappedCartProducts[productId]) {
                delete mappedCartProducts[productId];
            }
        },
        increaseQuantity(productId, quantity = '1', mappedCartProducts = null) {
            var mappedCartProducts = mappedCartProducts ? mappedCartProducts : this.mappedCartProducts;

            if (mappedCartProducts[productId]) {
                let currentQuantity = parseInt(mappedCartProducts[productId].quantity);

                if (isNaN(currentQuantity) || currentQuantity < 0) {
                    mappedCartProducts[productId].quantity = '0';
                }else{
                    mappedCartProducts[productId].quantity = (currentQuantity + parseInt(quantity)).toString();
                }
            }
        },
        decreaseQuantity(productId, quantity = '1', mappedCartProducts = null) {
            var mappedCartProducts = mappedCartProducts ? mappedCartProducts : this.mappedCartProducts;

            if (mappedCartProducts[productId]) {
                let currentQuantity = parseInt(mappedCartProducts[productId].quantity);

                if (isNaN(currentQuantity) || currentQuantity <= 1) {
                    mappedCartProducts[productId].quantity = '0';
                }else{
                    const newQuantity = currentQuantity - parseInt(quantity);

                    if(newQuantity < 0 ) {
                        mappedCartProducts[productId].quantity = '0';
                    }else{
                        mappedCartProducts[productId].quantity = newQuantity.toString();
                    }
                }
            }
        },
        isAddedToCart(productId, mappedCartProducts = null) {
            var mappedCartProducts = mappedCartProducts ? mappedCartProducts : this.mappedCartProducts;

            return !!mappedCartProducts[productId];
        },
        hasQuantity(productId, mappedCartProducts = null) {
            var mappedCartProducts = mappedCartProducts ? mappedCartProducts : this.mappedCartProducts;

            return this.isAddedToCart(productId, mappedCartProducts) && mappedCartProducts[productId].quantity > 0;
        },
        setShoppingCart(shoppingCart) {
            this.shoppingCart = shoppingCart;
        },
        setDeliveryMethod(deliveryMethod) {
            this.deliveryMethod = deliveryMethod;
            this.shoppingCartForm.deliveryMethodId = deliveryMethod.id;
            this.inspectStoreShoppingCartWithDelay();
        },
        setAddress(address) {
            this.shoppingCartForm.address = address;
        },
        isSelectedDeliveryMethod(deliveryMethod) {
            return (this.deliveryMethod || {}).id == deliveryMethod.id;
        },
        setTip(tip) {
            this.tip = tip;

            switch (tip.type) {
                case 'none':
                    this.shoppingCartForm.tipFlatRate = null;
                    this.shoppingCartForm.tipPercentageRate = null;
                    break;
                case 'fixed':
                    this.shoppingCartForm.tipFlatRate = '0.00';
                    this.shoppingCartForm.tipPercentageRate = null;
                    break;
                case 'percentage':
                    this.shoppingCartForm.tipFlatRate = null;
                    this.shoppingCartForm.tipPercentageRate = tip.value;
                    break;
            }

            this.inspectStoreShoppingCartWithDelay();
        },
        isSelectedTip(tip) {
            return this.tip && this.tip.value === tip.value;
        },
        setShoppingCartForm() {

            const store = useStoreState().store;

            this.shoppingCartForm = {
                address: null,
                cartProducts: [],
                deliveryDate: '',
                promotionCode: '',
                storeId: store.id,
                tipFlatRate: '0.00',
                deliveryTimeslot: '',
                deliveryMethodId: null,
                tipPercentageRate: null,
                tipType: TIP_TYPES.NONE.value,
                customer: {
                    lastName: 'Tabona',
                    firstName: 'Julian',
                    birthday: '1994-01-13',
                    mobileNumber: '26772882239',
                    email: 'brandontabona@gmail.com',
                },
            };

            if(!this.authState.hasAuthUser) this.shoppingCartForm.guestId = uuidv4();

            this.setOriginalShoppingCartForm();

        },
        setOriginalShoppingCartForm() {
            this.originalShoppingCartForm = cloneDeep(this.shoppingCartForm);
        },
        setIsCreatingOrder(status) {
            this.isCreatingOrder = status;
        },
        setIsLoadingProducts(status) {
            this.isLoadingProducts = status;
        },
        setIsLoadingNonSelectedProducts(status) {
            this.isLoadingNonSelectedProducts = status;
        },
        setIsLoadingDeliveryMethods(status) {
            this.isLoadingDeliveryMethods = status;
        },
        setIsSearchingProducts(status) {
            this.isSearchingProducts = status;
        },
        setIsSearchingNonSelectedProducts(status) {
            this.isSearchingNonSelectedProducts = status;
        },
        setIsInspectingShoppingCart(status) {
            this.isInspectingShoppingCart = status;
        },
        showShoppingProducts() {

            const store = useStoreState().store;

            //  Start loader
            this.setIsLoadingProducts(true);

            //  Set the query params
            const params = {}

            //  If the search term has been provided, then add to the query params
            if(this.hasSearchTerm) params['search'] = this.searchTerm;

            getApi(store._links.showStoreShoppingProducts, params).then(response => {

                if(response.status == 200) {
                    this.productsPagination = response.data;
                    this.products = this.productsPagination.data;
                }

                //  Stop loader
                this.setIsSearchingProducts(false);
                this.setIsLoadingProducts(false);

            }).catch(errorException => {

                //  Stop loader
                this.setIsSearchingProducts(false);
                this.setIsLoadingProducts(false);

                useFormState().setServerFormErrors(errorException);

            });

        },
        showNonSelectedShoppingProducts() {

            const store = useStoreState().store;

            //  Start loader
            this.setIsLoadingNonSelectedProducts(true);

            const cartProductIds = this.cartProducts().map((cartProduct) => cartProduct.id).join(',');
            const filters = (this.hasCartProducts() ? `id:not_in:${cartProductIds}` : '');

            //  Set the query params
            const params = {}
            if(filters != '') params['_filters'] = filters;

            //  If the search term has been provided, then add to the query params
            if(this.hasSearchTerm) params['search'] = this.searchTerm;

            getApi(store._links.showStoreShoppingProducts, params).then(response => {

                if(response.status == 200) {
                    this.nonSelectedProductsPagination = response.data;
                    this.nonSelectedProducts = this.nonSelectedProductsPagination.data;
                }

                //  Stop loader
                this.setIsSearchingNonSelectedProducts(false);
                this.setIsLoadingNonSelectedProducts(false);

            }).catch(errorException => {

                //  Stop loader
                this.setIsSearchingNonSelectedProducts(false);
                this.setIsLoadingNonSelectedProducts(false);

                useFormState().setServerFormErrors(errorException);

            });

        },
        async showShoppingDeliveryMethods() {

            const store = useStoreState().store;

            //  Start loader
            this.setIsLoadingDeliveryMethods(true);

            //  Set the query params
            const params = {
                '_filters': 'active:eq:1'
            }

            //  If the search term has been provided, then add to the query params
            if(this.hasSearchTerm) params['search'] = this.searchTerm;

            await getApi(store._links.showStoreShoppingDeliveryMethods, params).then(response => {

                if(response.status == 200) {
                    this.deliveryMethodsPagination = response.data;
                    this.deliveryMethods = this.deliveryMethodsPagination.data;

                    if(this.hasDeliveryMethods) {
                        this.setDeliveryMethod(this.deliveryMethods[0]);
                    }
                }

                //  Stop loader
                this.setIsLoadingDeliveryMethods(false);

            }).catch(errorException => {

                //  Stop loader
                this.setIsLoadingDeliveryMethods(false);

                useFormState().setServerFormErrors(errorException);

            });

        },
        parseForm() {
            var data = cloneDeep(this.shoppingCartForm);
            data.return = true;

            // Helper function to recursively remove empty or null fields
            const cleanData = (obj) => {
                for (let key in obj) {
                    if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
                        delete obj[key];
                    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                        cleanData(obj[key]); // Recurse for nested objects
                    }
                }
            };

            cleanData(data);


            return data;
        },
        inspectStoreShoppingCartWithDelay() {
            this.setIsInspectingShoppingCart(true);
            this.inspectStoreShoppingCartDelayed();
        },
        inspectStoreShoppingCartDelayed: debounce(function () {
            this.inspectStoreShoppingCart();
        }, 1000),
        inspectStoreShoppingCart() {
            this.shoppingCartForm.cartProducts = this.cartProducts()
                .map(product => ({
                    id: product.id,
                    quantity: product.quantity
                }));

            postApi(this.apiState.apiHome['_links']['inspectShoppingCart'], this.parseForm()).then(response => {
                if (response.status === 200) {
                    this.setShoppingCart(response.data);
                }
                this.setIsInspectingShoppingCart(false);
            }).catch(errorException => {
                this.setIsInspectingShoppingCart(false);
                useFormState().setServerFormErrors(errorException);
            });
        },
        createStoreOrder() {

            if(this.isCreatingOrder) return;

            //  Start loader
            this.setIsCreatingOrder(true);

            this.shoppingCartForm.cartProducts = this.cartProducts()
                .map(product => ({
                    id: product.id,
                    quantity: product.quantity
                }));

            postApi(useApiState().apiHome['_links']['createOrder'], this.parseForm()).then(response => {

                if(response.status == 200) {

                    if(response.data.created) {

                        useNotificationState().addSuccessNotification('Order placed');

                    }else{

                        useFormState().setGeneralFormError(response.data.message);
                        useNotificationState().addWarningNotification(response.data.message);

                    }

                }

                //  Stop loader
                this.setIsCreatingOrder(false);

            }).catch(errorException => {

                //  Stop loader
                this.setIsCreatingOrder(false);

                useFormState().setServerFormErrors(errorException);

            });

        },
    },
    getters: {
        hasProducts() {
            return this.products.length > 0;
        },
        hasNonSelectedProducts() {
            return this.nonSelectedProducts.length > 0;
        },
        hasDeliveryMethods() {
            return this.totalDeliveryMethods > 0;
        },
        totalDeliveryMethods() {
            return this.deliveryMethods.length;
        },
        hasSearchTerm() {
            return this.searchTerm != null && this.searchTerm.trim() != '';
        },
        cartProducts: (state) => {
          return (mappedCartProducts = null) => {
            const products = mappedCartProducts || state.mappedCartProducts;
            return Object.values(products);
          };
        },
        totalCartProducts: (state) => {
          return (mappedCartProducts = null) => {
            return Object.values(mappedCartProducts || state.mappedCartProducts).length;
          };
        },
        hasCartProducts: (state) => {
          return (mappedCartProducts = null) => {
            return state.totalCartProducts(mappedCartProducts) > 0;
          };
        },
        canCheckout() {
            return this.shoppingCartHasChanged && hasShoppingCartProducts && !this.isInspectingShoppingCart;
        },
        hasShoppingCart() {
            return this.shoppingCart != null;
        },
        hasDiscounts() {
            return this.hasShoppingCart && Object.keys(this.shoppingCart.totals.discounts).length > 0;
        },
        hasAdditionalFees() {
            return this.hasShoppingCart && Object.keys(this.shoppingCart.totals.additionalFees).length > 0;
        },
        hasShoppingCartProducts() {
            return this.hasShoppingCart && this.shoppingCart.totalsSummary.productLines.totalUncancelled > 0;
        },
        matchingShoppingCartProductLines() {
            if(!this.hasShoppingCart) return [];
            const productIds = Object.keys(this.mappedCartProducts);
            return this.shoppingCart.productLines.filter((productLine) => productIds.includes(productLine.productId));
        },
        totalMatchingShoppingCartProductLines() {
            return this.matchingShoppingCartProductLines.length;
        },
        hasMatchingShoppingCartProductLines() {
            return this.totalMatchingShoppingCartProductLines > 0;
        },
        shoppingCartHasChanged() {
            var a = cloneDeep(this.shoppingCartForm);
            var b = cloneDeep(this.originalShoppingCartForm);
            return !isEqual(a, b);
        },
    }
});
