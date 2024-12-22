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
        setServerFormErrors(errorException) {
            // Clear any existing errors
            this.hideFormErrors();

            if((errorException.response ?? {}).status === 422) {
                const validationErrors = ((errorException.response ?? {}).data ?? {}).errors ?? {};

                // Map the validation errors to the formErrors state
                this.formErrors = Object.keys(validationErrors).reduce((acc, key) => {
                    acc[key] = validationErrors[key][0];
                    return acc;
                }, {});
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
        setGeneralFormError(errorMessage) {
            this.setFormError('general', errorMessage);
        },
        setFormError(errorName, errorMessage) {
            this.formErrors[errorName] = errorMessage;
            this.setFormErrorsTimeout();
        },
        getFormError(errorName) {
            return this.formErrors[errorName] ?? null;
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
