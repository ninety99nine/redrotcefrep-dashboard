<template>

    <div class="bg-white shadow-lg border p-8 rounded-lg mb-4">

        <h1 class="text-lg font-bold mb-8">General Settings</h1>

        <div class="space-y-4">

            <!-- Form Error Messages -->
            <FormErrorMessages></FormErrorMessages>

            <!-- Save Changes Alert -->
            <SaveChangesAlert></SaveChangesAlert>

            <!-- Online Toggle Switch -->
            <OnlineToggleSwitch></OnlineToggleSwitch>

            <!-- Offline Message Textarea Input -->
            <OfflineMessageTextarea></OfflineMessageTextarea>

            <!-- Name Text Input -->
            <NameTextInput></NameTextInput>

            <!-- Description Textarea Input -->
            <DescriptionTextarea></DescriptionTextarea>

        </div>

    </div>

</template>

<script>

    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import NameTextInput from '@Pages/stores/store/settings/general/components/NameTextInput.vue';
    import AliasTextInput from '@Pages/stores/store/settings/general/components/AliasTextInput.vue';
    import EmailTextInput from '@Pages/stores/store/settings/general/components/EmailTextInput.vue';
    import SaveChangesAlert from '@Pages/stores/store/settings/general/components/SaveChangesAlert.vue';
    import OnlineToggleSwitch from '@Pages/stores/store/settings/general/components/OnlineToggleSwitch.vue';
    import DescriptionTextarea from '@Pages/stores/store/settings/general/components/DescriptionTextarea.vue';
    import StoreRollingNumbers from '@Pages/stores/store/settings/general/components/StoreRollingNumbers.vue';
    import WhatsAppNotifications from '@Pages/stores/store/settings/general/components/WhatsAppNotifications.vue';
    import SmsSenderNameTextInput from '@Pages/stores/store/settings/general/components/SmsSenderNameTextInput.vue';
    import OfflineMessageTextarea from '@Pages/stores/store/settings/general/components/OfflineMessageTextarea.vue';
    import UssdMobileNumberTextInput from '@Pages/stores/store/settings/general/components/UssdMobileNumberTextInput.vue';

    export default {
        components: {
            FormErrorMessages, NameTextInput, AliasTextInput, EmailTextInput, OnlineToggleSwitch, SaveChangesAlert,
            DescriptionTextarea, StoreRollingNumbers, WhatsAppNotifications, SmsSenderNameTextInput,
            OfflineMessageTextarea, UssdMobileNumberTextInput
        }
    };

</script>
