import { defineStore } from 'pinia';

export const useFormState = defineStore('form', {
    state: () => ({
        formErrors: {},
        formErrorsTimeout: null,
    }),
    getters: {
        getFormErrors(state) {
            return Object.values(state.formErrors);
        },
        hasErrors(state) {
            return Object.keys(state.formErrors).length > 0;
        },
        hasGeneralError(state) {
            return state.formErrors.hasOwnProperty('general');
        },
        generalErrorText(state) {
            return state.hasGeneralError ? state.formErrors.general : null;
        }
    },
    actions: {
        setServerFormErrors(errorException, index) {
            this.hideFormErrors();

            if ((errorException.response ?? {}).status === 422) {
                const validationErrors = ((errorException.response ?? {}).data ?? {}).errors ?? {};

                const errors = Object.keys(validationErrors).reduce((acc, key) => {
                    acc[key] = validationErrors[key][0];
                    return acc;
                }, {});

                if (index != null) {
                    this.formErrors[index] = errors;
                } else {
                    this.formErrors = errors;
                }

            } else {
                const errorMessage = ((errorException.response ?? {}).data ?? {}).message ?? errorException.message;
                this.setGeneralFormError(errorMessage);
            }

            this.setFormErrorsTimeout();
        },
        setGeneralFormError(errorMessage, index = null) {
            this.setFormError('general', errorMessage, index);
        },
        setFormError(errorName, errorMessage, index = null) {
            if (index != null) {
                this.formErrors[index] = {};
                this.formErrors[index][errorName] = errorMessage;
            } else {
                this.formErrors[errorName] = errorMessage;
            }
            this.setFormErrorsTimeout();
        },
        getFormError(errorName, index = null) {
            if (index != null) {
                return this.formErrors[index] ? this.formErrors[index][errorName] ?? null : null;
            } else {
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
