<template>

    <div class="space-y-4 pb-4 mb-4 border-b border-dashed">

        <!-- Online Toggle Switch -->
        <OnlineToggleSwitch></OnlineToggleSwitch>

        <!-- Offline Message Textarea -->
        <OfflineMessageTextarea></OfflineMessageTextarea>

        <!-- Name Input -->
        <NameTextInput></NameTextInput>

        <!-- Description Textarea -->
        <DescriptionTextarea></DescriptionTextarea>

    </div>

</template>

<script>

import NameTextInput from '@Pages/stores/store/settings/general/components/NameTextInput.vue';
import OnlineToggleSwitch from '@Pages/stores/store/settings/general/components/OnlineToggleSwitch.vue';
import DescriptionTextarea from '@Pages/stores/store/settings/general/components/DescriptionTextarea.vue';
import OfflineMessageTextarea from '@Pages/stores/store/settings/general/components/OfflineMessageTextarea.vue';

export default {
    components: {
        NameTextInput, OnlineToggleSwitch, DescriptionTextarea, OfflineMessageTextarea
    }
};

</script>
