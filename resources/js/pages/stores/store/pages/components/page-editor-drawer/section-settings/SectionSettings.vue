<template>
    <div class="space-y-4">

        <template v-if="showingBasicTab">

            <!-- Visible -->
            <ToggleSwitch
                size="md"
                v-model="pageState.pageForm.sections[this.pageState.sectionIndex].visible"
                @change="saveStateDebounced(pageState.pageForm.sections[this.pageState.sectionIndex].visible ? 'Section visibility enabled' : 'Section visibility disabled')">
                Visible
            </ToggleSwitch>

            <!-- Name -->
            <TextInput
                label="Name"
                placeholder="Section"
                @input="saveStateDebounced('Section name changed')"
                v-model="pageState.pageForm.sections[this.pageState.sectionIndex].name">
            </TextInput>

            <!-- Background Color -->
            <div class="flex items-center">
                <Colorpicker
                    @change="saveStateDebounced('Section color changed')"
                    v-model="pageState.pageForm.sections[this.pageState.sectionIndex].backgroundColor" :disableHistory="true" :disableAlpha="true">
                </Colorpicker>
                <span class="text-sm">Background Color</span>
            </div>

            <div class="border-t border-dashed"></div>

            <div class="space-y-6">

                <!-- Top Divider -->
                <DividerSelectInput
                    label="Top Divider" type="top"
                    @change="saveStateDebounced('Section divider changed')"
                    :color="pageState.pageForm.sections[this.pageState.sectionIndex].topDividerColor"
                    v-model="pageState.pageForm.sections[this.pageState.sectionIndex].topDividerType">
                </DividerSelectInput>

                <template v-if="pageState.pageForm.sections[this.pageState.sectionIndex].topDividerType">

                    <!-- Top Divider Color -->
                    <div class="flex items-center">
                        <Colorpicker
                            @change="saveStateDebounced('Section divider color changed')"
                            v-model="pageState.pageForm.sections[this.pageState.sectionIndex].topDividerColor" :disableHistory="true" :disableAlpha="true">
                        </Colorpicker>
                        <span class="text-sm">Top Divider Color</span>
                    </div>

                    <!-- Top Divider Height -->
                    <RangeSlider
                        min="0"
                        max="500"
                        start="100"
                        label="Top Divider Height"
                        @change="saveStateDebounced('Section divider height changed')"
                        v-model="pageState.pageForm.sections[this.pageState.sectionIndex].topDividerHeight">
                        <template #suffix v-if="pageState.pageForm.sections[this.pageState.sectionIndex].topDividerHeight != null">
                            <div class="w-20 text-xs">{{ pageState.pageForm.sections[this.pageState.sectionIndex].topDividerHeight ?? '100' }} px</div>
                        </template>
                    </RangeSlider>

                </template>

            </div>

            <div class="border-t border-dashed"></div>

            <div class="space-y-6">

                <!-- Bottom Divider -->
                <DividerSelectInput
                    label="Bottom Divider"
                    type="bottom"
                    @change="saveStateDebounced('Section divider changed')"
                    :color="pageState.pageForm.sections[this.pageState.sectionIndex].bottomDividerColor"
                    v-model="pageState.pageForm.sections[this.pageState.sectionIndex].bottomDividerType">
                </DividerSelectInput>

                <template v-if="pageState.pageForm.sections[this.pageState.sectionIndex].bottomDividerType">

                    <!-- Bottom Divider Color -->
                    <div class="flex items-center">
                        <Colorpicker
                            @change="saveStateDebounced('Section divider color changed')"
                            v-model="pageState.pageForm.sections[this.pageState.sectionIndex].bottomDividerColor" :disableHistory="true" :disableAlpha="true">
                        </Colorpicker>
                        <span class="text-sm">Bottom Divider Color</span>
                    </div>

                    <!-- Bottom Divider Height -->
                    <RangeSlider
                        min="0"
                        max="500"
                        start="100"
                        label="Bottom Divider Height"
                        @change="saveStateDebounced('Section divider height changed')"
                        v-model="pageState.pageForm.sections[this.pageState.sectionIndex].bottomDividerHeight">
                        <template #suffix v-if="pageState.pageForm.sections[this.pageState.sectionIndex].bottomDividerHeight != null">
                            <div class="w-20 text-xs">{{ pageState.pageForm.sections[this.pageState.sectionIndex].bottomDividerHeight ?? '100' }} px</div>
                        </template>
                    </RangeSlider>

                </template>

            </div>

        </template>

        <template v-else-if="showingAdvancedTab">

        </template>

    </div>
</template>

<script>

    import TextInput from '@Partials/inputs/TextInput.vue';
    import Colorpicker from '@Partials/colorpicker/Colorpicker.vue';
    import RangeSlider from '@Partials/range-sliders/RangeSlider.vue';
    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';
    import DividerSelectInput from '@Pages/stores/store/pages/components/page-editor-drawer/section-settings/DividerSelectInput.vue';

    export default {
        inject: ['pageState'],
        components: { TextInput, Colorpicker, RangeSlider, ToggleSwitch, DividerSelectInput },
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
