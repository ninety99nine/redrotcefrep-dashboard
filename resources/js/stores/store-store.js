import router from '@/router';
import { defineStore } from 'pinia';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { useFormState } from '@Stores/form-store.js';
import { putApi, deleteApi } from '@Repositories/api-repository.js';
import { useNotificationState } from '@Stores/notification-store.js';

export const useStoreState = defineStore('store', {
    state: () => {
        return {
            store: null,
            storeForm: null,
            shouldUpdate: false,
            quickStartGuide: null,
            isLoadingStore: false,
            isDeletingStore: false,
            originalStoreForm: null,
            isSubmittingStore: false,
            isLoadingQuickStartGuide: false
        }
    },
    actions: {
        setStore(store) {
            this.store = store;
        },
        setQuickStartGuide(quickStartGuide) {
            this.quickStartGuide = quickStartGuide;
        },
        setShouldUpdate(status) {
            this.shouldUpdate = status;
        },
        setIsLoadingStore(status) {
            this.isLoadingStore = status;
        },
        setIsDeletingStore(status) {
            this.isDeletingStore = status;
        },
        setIsSubmittingStore(status) {
            this.isSubmittingStore = status;
        },
        setIsLoadingQuickStartGuide(status) {
            this.isLoadingQuickStartGuide = status;
        },
        resetStoreForm() {
            this.setStoreForm(this.store);
        },
        setStoreForm(store = null) {

            if(store) {

                this.storeForm = {
                    name: store.name,
                    email: store.email,
                    alias: store.alias,
                    taxId: store.taxId,
                    online: store.online,
                    country: store.country,
                    language: store.language,
                    taxMethod: store.taxMethod,
                    weightUnit: store.weightUnit,
                    currency: store.currency.code,
                    description: store.description,
                    socialLinks: store.socialLinks,
                    distanceUnit: store.distanceUnit,
                    openingHours: store.openingHours,
                    smsSenderName: store.smsSenderName,
                    offlineMessage: store.offlineMessage,
                    showOpeningHours: store.showOpeningHours,
                    ussdMobileNumber: store.ussdMobileNumber?.international,
                    taxPercentageRate: store.taxPercentageRate.value.toString(),
                    allowCheckoutOnClosedHours: store.allowCheckoutOnClosedHours,
                    whatsappMobileNumber: store.whatsappMobileNumber?.international,

                    secondaryButtonTextColor: '#ffffff',
                    secondaryButtonColor: '#1f87e8',
                    primaryButtonTextColor: '#ffffff',
                    primaryButtonColor: '#1f87e8',
                    bannerTextColor: '#ffffff',
                    bannerColor: '#105294',
                    textColor: '#ffffff',
                    bgColor: '#1f87e8',

                    cardHeadingTextColor: '#000000',
                    cardSecondaryColor: '#ffffff',
                    cardPrimaryColor: '#f9fafb',

                    productBgColor: '#ffffff',
                    productNameColor: '#000000',
                    productPriceColor: '#000000',
                    productQuantityColor: '#000000',

                    productHoverBgColor: '#f3f4f6',
                    productHoverNameColor: '#000000',
                    productHoverPriceColor: '#000000',
                    productHoverQuantityColor: '#000000',
                };

            }else{

                this.storeForm = {
                    name: null,
                    taxId: null,
                    email: null,
                    alias: null,
                    online: null,
                    country: null,
                    currency: null,
                    language: null,
                    taxMethod: null,
                    socialLinks: [],
                    openingHours: [],
                    description: null,
                    weightUnit: null,
                    distanceUnit: null,
                    smsSenderName: null,
                    offlineMessage: null,
                    ussdMobileNumber: null,
                    taxPercentageRate: null,
                    showOpeningHours: false,
                    whatsappMobileNumber: null,
                    allowCheckoutOnClosedHours: false,

                    secondaryButtonTextColor: '#ffffff',
                    secondaryButtonColor: '#1f87e8',
                    primaryButtonTextColor: '#ffffff',
                    primaryButtonColor: '#1f87e8',
                    bannerTextColor: '#ffffff',
                    bannerColor: '#105294',
                    textColor: '#ffffff',
                    bgColor: '#1f87e8',

                    cardHeadingTextColor: '#000000',
                    cardSecondaryColor: '#ffffff',
                    cardPrimaryColor: '#f9fafb',

                    productBgColor: '#ffffff',
                    productNameColor: '#000000',
                    productPriceColor: '#000000',
                    productQuantityColor: '#000000',

                    productHoverBgColor: '#f3f4f6',
                    productHoverNameColor: '#000000',
                    productHoverPriceColor: '#000000',
                    productHoverQuantityColor: '#000000',
                };

            }

            if(this.storeForm.openingHours.length == 0) {
                this.storeForm.openingHours = this.generateOpeningHours();
            }

            this.setIfMissingSocialLinks();

            this.setOriginalStoreForm();

        },
        setOriginalStoreForm() {
            this.originalStoreForm = cloneDeep(this.storeForm);
        },
        setIfMissingSocialLinks() {
            this.setIfMissingSocialLink('Whatsapp');
            this.setIfMissingSocialLink('Telegram');
            this.setIfMissingSocialLink('Messenger');
            this.setIfMissingSocialLink('Facebook');
            this.setIfMissingSocialLink('Instagram');
            this.setIfMissingSocialLink('LinkedIn');
            this.setIfMissingSocialLink('YouTube');
            this.setIfMissingSocialLink('Snapchat');
            this.setIfMissingSocialLink('TikTok');
            this.setIfMissingSocialLink('Twitch');
            this.setIfMissingSocialLink('X');
        },
        setIfMissingSocialLink(name) {

            const exists = this.storeForm.socialLinks.some(link => link.name === name);

            if(!exists) {
                this.storeForm.socialLinks.push({
                    name: name,
                    link: ''
                });
            }
        },
        generateOpeningHours() {
            return Array(7).fill().map(() => ({
                available: true,
                hours: [
                    ['08:00', '16:00']
                ]
            }));
        },
        syncWithAlias() {
            if(this.aliasModified == false) {
                this.storeForm.alias = this.storeForm.name;
                this.formatAlias();
            }
        },
        formatAlias(aliasModified = false) {
            if(this.storeForm.alias.length) {
                this.storeForm.alias = this.storeForm.alias.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').trim().toLowerCase();
                this.aliasModified = aliasModified;

            }else{
                this.aliasModified = false;
            }
        },
        updateStore() {

            if(this.storeForm.name.trim() == '') {
                useFormState().setFormError('name', 'The store name is required');
                useNotificationState().addWarningNotification('The store name is required');
                return;
            }

            //  Start loader
            this.setIsSubmittingStore(true);

            const data = {
                ...this.storeForm,
                return: true
            }

            data.socialLinks = data.socialLinks.filter((socialLink) => socialLink.link != null && socialLink.link.trim() != '');

            putApi(this.store._links.updateStore, data).then(response => {

                if(response.status == 200) {

                    if(response.data.updated) {

                        this.setShouldUpdate(true);
                        this.setStoreForm(response.data.store);
                        useNotificationState().addSuccessNotification('Store updated');

                    }else{

                        useFormState().setGeneralFormError(response.data.message);
                        useNotificationState().addWarningNotification(response.data.message);

                    }

                }

                //  Stop loader
                this.setIsSubmittingStore(false);

            }).catch(errorException => {

                //  Stop loader
                this.setIsSubmittingStore(false);
                useFormState().setServerFormErrors(errorException);

            });

        },
        deleteStore() {

            //  Start loader
            this.setIsDeletingStore(true);

            deleteApi(this.store._links.deleteStore).then(response => {

                if(response.status == 200) {

                    if(response.data.deleted) {

                        useNotificationState().addSuccessNotification('Store deleted');

                        //  Navigate to show dashboard
                        router.replace({ name: 'dashboard' }).then(() => {
                            // Ensure scroll to top after route navigation
                            window.scrollTo(0, 0);
                        });

                    }else{

                        useFormState().setGeneralFormError(response.data.message);
                        useNotificationState().addWarningNotification(response.data.message);

                    }

                }

                //  Stop loader
                this.setIsDeletingStore(false);

            }).catch(errorException => {

                //  Stop loader
                this.setIsDeletingStore(false);
                useFormState().setServerFormErrors(errorException);

            });

        },
    },
    getters: {
        formHasChanged() {
            var a = cloneDeep(this.storeForm);
            var b = cloneDeep(this.originalStoreForm);
            return !isEqual(a, b);
        },
        mustSaveChanges() {
            return this.formHasChanged && !this.isSubmitting;
        },
        completedQuickStartGuide(state) {
            if(state.quickStartGuide == null) return false;
            return state.quickStartGuide.completedMilestones == this.quickStartGuide.totalMilestones;
        }
    },
})
