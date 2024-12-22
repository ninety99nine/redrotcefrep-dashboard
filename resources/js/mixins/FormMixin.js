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
        setServerFormErrors(errorException) {
            this.formState.setServerFormErrors(errorException);
        },
        setGeneralFormError(errorMessage) {
            this.formState.setGeneralFormError(errorMessage);
        },
        setFormError(errorName, errorMessage) {
            this.formState.setFormError(errorName, errorMessage);
        },
        getFormError(errorName) {
            return this.formState.getFormError(errorName);
        },
        hideFormErrors() {
            this.formState.hideFormErrors();
        }
    }
};
