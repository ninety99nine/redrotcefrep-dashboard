<template>
    <div class="w-full">

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :showAsterisk="showAsterisk" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <div :class="{ 'mt-2' : label != '' }">

            <Editor
                :id="uniqueId"
                :init="editorConfig"
                :disabled="disabled"
                v-model="localContent"
                :api-key="tinyMceApiKey"
            />

        </div>

    </div>
</template>

<script>

    import settings from '@Js/settings.js';
    import Editor from '@tinymce/tinymce-vue';
    import { generateUniqueId } from '@Utils/generalUtils.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';

    export default {
        components: {
            Editor, InputLabel
        },
        props: {
            modelValue: {
                type: String,
                default: ""
            },
            showAsterisk: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: "Text Editor"
            },
            labelPopoverTitle: {
                type: String
            },
            labelPopoverDescription: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                localContent: this.modelValue,
                tinyMceApiKey: settings.tinyMceApiKey,
                uniqueId: generateUniqueId('editor'),
                editorConfig: {
                    menubar: false,
                    branding: false,
                    skin_url: "https://cdn.tiny.cloud/1/no-api-key/tinymce/5/skins/ui/oxide",
                    content_css: false,
                    toolbar_mode: "sliding",
                    content_style: "body { font-size: 12px; line-height: 1.2; }",
                    toolbar: [
                        "blocks formatselect fontsize fontfamily forecolor backcolor bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent link table checklist removeformat undo redo"
                    ],
                    plugins: [],
                }
            };
        },
        watch: {
            modelValue(newValue) {
                this.localContent = newValue;
            },
            localContent(newValue) {
                this.$emit("update:modelValue", newValue);
                if(newValue != this.modelValue) {
                    this.$emit("change", newValue);
                }
            }
        }
    };
</script>
