<template>

    <div class="pt-8 px-4 bg-gray-50">

        <!-- Form Error Messages -->
        <FormErrorMessages></FormErrorMessages>

        <!-- Save Changes Alert -->
        <SaveChangesAlert></SaveChangesAlert>

        <!-- Store Settings -->
        <StoreSettings></StoreSettings>

        <!-- Theme Settings -->
        <ThemeSettings></ThemeSettings>

    </div>

</template>

<script>

import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
import StoreSettings from '@Pages/shopping/components/CustomizeDrawer/StoreSettings.vue';
import ThemeSettings from '@Pages/shopping/components/CustomizeDrawer/ThemeSettings.vue';
import SaveChangesAlert from '@Pages/stores/store/settings/general/components/SaveChangesAlert.vue';

export default {
    components: {
        FormErrorMessages, StoreSettings, ThemeSettings, SaveChangesAlert
    },
    props: {
        closeCustomizeDrawer: {
            type: Function
        }
    }
};

</script>
