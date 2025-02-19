import { useFormState } from '@Stores/form-store.js';
import { useNotificationState } from '@Stores/notification-store.js';

export const FormMixin = {
    computed: {
        formState() {
            return useFormState();
        },
        hasErrors() {
            return Object.keys(this.formState.formErrors).length > 0;
        },
        formErrors() {
            return this.formState.getFormErrors;
        },
        hasGeneralError() {
            return this.formState.formErrors.hasOwnProperty('general');
        },
        generalErrorText() {
            return this.hasGeneralError ? this.formState.formErrors.general : null;
        },
    },
    methods: {
        showSuccessfulNotification(notificationMessage) {
            const notificationState = useNotificationState();
            notificationState.addSuccessNotification(notificationMessage);
        },
        showUnsuccessfulNotification(notificationMessage) {
            const notificationState = useNotificationState();
            notificationState.addWarningNotification(notificationMessage);
        },
        setServerFormErrors(errorException, index = null) {
            this.formState.setServerFormErrors(errorException, index);
        },
        setGeneralFormError(errorMessage, index = null) {
            this.formState.setGeneralFormError(errorMessage, index);
        },
        setFormError(errorName, errorMessage, index = null) {
            this.formState.setFormError(errorName, errorMessage, index);
        },
        getFormError(errorName, index = null) {
            return this.formState.getFormError(errorName, index);
        },
        hideFormErrors() {
            this.formState.hideFormErrors();
        }
    }
};
