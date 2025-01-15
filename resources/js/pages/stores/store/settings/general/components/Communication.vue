<template>

    <div class="bg-white mb-4 p-8 rounded-lg space-y-4">

        <!-- Website Link Input -->
        <AliasTextInput></AliasTextInput>

        <!-- USSD Number Input -->
        <UssdMobileNumberTextInput></UssdMobileNumberTextInput>

        <!-- Email Input -->
        <EmailTextInput></EmailTextInput>

        <!-- SMS Sender Name Input -->
        <SmsSenderNameTextInput></SmsSenderNameTextInput>

        <!-- Address Input -->
        <AddressInput></AddressInput>

        <!-- WhatsApp Notifications Information -->
        <WhatsAppNotifications></WhatsAppNotifications>

        <!-- Store Rolling Numbers -->
        <StoreRollingNumbers></StoreRollingNumbers>

    </div>

</template>

<script>

    import AddressInput from '@Pages/stores/store/settings/general/components/AddressInput.vue';
    import AliasTextInput from '@Pages/stores/store/settings/general/components/AliasTextInput.vue';
    import EmailTextInput from '@Pages/stores/store/settings/general/components/EmailTextInput.vue';
    import StoreRollingNumbers from '@Pages/stores/store/settings/general/components/StoreRollingNumbers.vue';
    import WhatsAppNotifications from '@Pages/stores/store/settings/general/components/WhatsAppNotifications.vue';
    import SmsSenderNameTextInput from '@Pages/stores/store/settings/general/components/SmsSenderNameTextInput.vue';
    import UssdMobileNumberTextInput from '@Pages/stores/store/settings/general/components/UssdMobileNumberTextInput.vue';

    export default {
        components: {
            AddressInput, AliasTextInput, EmailTextInput, StoreRollingNumbers, WhatsAppNotifications,
            SmsSenderNameTextInput, UssdMobileNumberTextInput
        }
    };

</script>
