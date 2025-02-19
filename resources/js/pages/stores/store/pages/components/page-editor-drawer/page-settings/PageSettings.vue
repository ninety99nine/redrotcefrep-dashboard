<template>
    <div class="space-y-4">

        <template v-if="showingBasicTab">

            <!-- Visible -->
            <ToogleSwitch
                size="md"
                v-model="pageState.pageForm.visible"
                @change="saveStateDebounced(pageState.pageForm.visible ? 'Page visibility enabled' : 'Page visibility disabled')">
                Visible
            </ToogleSwitch>

            <!-- Homepage -->
            <ToogleSwitch
                size="md"
                v-model="pageState.pageForm.homepage"
                @change="saveStateDebounced(pageState.pageForm.homepage ? 'Set as homepage' : 'Removed from homepage')">
                Homepage
            </ToogleSwitch>

            <!-- Title -->
            <TextInput
                label="Title"
                placeholder="Home"
                v-model="pageState.pageForm.title"
                @input="saveStateDebounced('Page title changed')">
            </TextInput>

            <div class="border-t border-dashed"></div>

            <!-- Background Color -->
            <div class="flex items-center">
                <Colorpicker
                    @change="saveStateDebounced('Page color changed')"
                    v-model="pageState.pageForm.backgroundColor" :disableHistory="true" :disableAlpha="true">
                </Colorpicker>
                <span class="text-sm">Background Color</span>
            </div>

        </template>

        <template v-else-if="showingAdvancedTab">

        </template>

    </div>
</template>

<script>
    import { usePageState } from "@Stores/page-store.js";
    import TextInput from '@Partials/inputs/TextInput.vue';
    import Colorpicker from '@Partials/colorpicker/Colorpicker.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';

    export default {
        components: { TextInput, Colorpicker, ToogleSwitch },
        data() {
            return {
                pageState: usePageState()
            };
        },
        computed: {
            showingBasicTab() {
                return this.pageState.showingBasicTab;
            },
            showingAdvancedTab() {
                return this.pageState.showingAdvancedTab;
            }
        },
        methods: {
            saveStateDebounced(actionName) {
                this.pageState.saveStateDebounced(actionName);
            },
        },
    };
</script>
