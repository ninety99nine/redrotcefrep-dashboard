import { defineStore } from 'pinia';
import { useNotificationState } from '@Stores/notification-store.js';

export const useFormState = defineStore('form', {
    state: () => ({
        formErrors: {},
        formErrorsTimeout: null,
    }),
    getters: {
        // This getter returns only the error messages (values) from formErrors
        getFormErrors(state) {
            return Object.values(state.formErrors);
        }
    },
    actions: {
        setServerFormErrors(errorException, index) {
            // Clear any existing errors
            this.hideFormErrors();

            if((errorException.response ?? {}).status === 422) {
                const validationErrors = ((errorException.response ?? {}).data ?? {}).errors ?? {};

                // Map the validation errors to the formErrors state
                const errors = Object.keys(validationErrors).reduce((acc, key) => {
                    acc[key] = validationErrors[key][0];
                    return acc;
                }, {});

                if(index != null) {
                    this.formErrors[index] = errors;
                }else{
                    this.formErrors = errors;
                }

            } else {
                const errorMessage = ((errorException.response ?? {}).data ?? {}).message ?? errorException.message;

                this.setGeneralFormError(errorMessage);

                if(errorMessage != null) {
                    const notificationState = useNotificationState();
                    notificationState.addWarningNotification(errorMessage);
                }
            }

            // Set timeout to hide form errors
            this.setFormErrorsTimeout();
        },
        setGeneralFormError(errorMessage, index = null) {
            this.setFormError('general', errorMessage, index);
        },
        setFormError(errorName, errorMessage, index = null) {
            if(index != null) {
                this.formErrors[index] = {};
                this.formErrors[index][errorName] = errorMessage;
            }else{
                this.formErrors[errorName] = errorMessage;
            }
            this.setFormErrorsTimeout();
        },
        getFormError(errorName, index = null) {
            if(index != null) {
                return this.formErrors[index] ? this.formErrors[index][errorName] ?? null : null;
            }else{
                return this.formErrors[errorName] ?? null;
            }
        },
        hideFormErrors() {
            this.formErrors = {};
        },
        setFormErrorsTimeout() {
            this.clearFormErrorsTimeout();
            this.formErrorsTimeout = setTimeout(() => this.hideFormErrors(), 5000);
        },
        clearFormErrorsTimeout() {
            clearTimeout(this.formErrorsTimeout);
        }
    }
});
