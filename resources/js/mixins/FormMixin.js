import { useNotificationState } from '@Stores/notification-store.js';

export const FormMixin = {
    data() {
        return {
            formErrors: {},
            formErrorsTimeout: null,
            notificationState: useNotificationState(),
        };
    },
    computed: {
        hasErrors() {
            return Object.keys(this.formErrors).length > 0;
        },
        generalErrorText() {
            this.formErrors.hasOwnProperty('general') ? this.formErrors.general : null;
        }
    },
    methods: {
        showSuccessfulNotification(notificationMessage) {
            this.notificationState.addSuccessNotification(notificationMessage);
        },
        showUnsuccessfulNotification(notificationMessage) {
            this.notificationState.addWarningNotification(notificationMessage);
        },
        setServerFormErrors(errorException) {

            // Hide the Form Errors
            this.hideFormErrors();

            if ((errorException.response ?? {}).status == 422) {

                var validationErrors = ((errorException.response ?? {}).data ?? {}).errors ?? {};

                // Set the validationErrors on this.formErrors
                this.formErrors = Object.keys(validationErrors).reduce((acc, key) => {
                    acc[key] = validationErrors[key][0];
                    return acc;
                }, {});

            } else {

                var errorMessage = ((errorException.response ?? {}).data ?? {}).message ?? errorException.message;

                this.setGeneralFormError(errorMessage);

                if (errorMessage != null) this.showUnsuccessfulNotification(errorMessage);

            }

            // Set the Form Errors Timeout
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
};
