<template>

    <div>

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <div :class="[{ 'mt-2' : label != '' }]">

            <div class="flex">
                <!-- Select Input Tags Field -->
                <vue3-tags-input
                    v-model="tag"
                    v-model:tags="localTags"
                    :select="true" :select-items="selectableTags"
                    @on-select="addTag"
                    @on-tags-changed="newTags => localTags = newTags"
                    :placeholder="placeholder">
                    <template #item="{ tag, index }">
                        {{ tag.text }}
                    </template>
                    <template #no-data>
                        No Data
                    </template>
                    <template #select-item="tag">
                        <span :class="{'text-gray-300' : localTags.map((tag) => tag.text).includes(tag.text)}">{{ tag.text }}</span>
                    </template>
                </vue3-tags-input>

                <!-- More Info Popover -->
                <MoreInfoPopover v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-2"></MoreInfoPopover>
            </div>

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>

        </div>

    </div>

</template>

<script>
    /**
     * Component Reference: https://vue3-tags-input.netlify.app/documents
     */
    import Vue3TagsInput from 'vue3-tags-input';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        props: {
            tags: {
                type: Array
            },
            selectableTags: {
                type: Array,
                deafult: () => {
                    return [];
                }
            },
            label: {
                type: String,
                default: ''
            },
            labelPopoverTitle: {
                type: String
            },
            labelPopoverDescription: {
                type: String
            },
            placeholder: {
                type: String,
                default: 'Separate with comma , or press Enter ⏎'
            },
            required: {
                type: Boolean,
                default: true
            },
            errorText: {
                type: String
            }
        },
        mixins: [UtilsMixin],
        components: { Vue3TagsInput, InputLabel, MoreInfoPopover, InputErrorMessage },
        data() {
            return {
                tag: '',
                localTags: this.tags,
                uniqueId: this.generateUniqueId('input_tags')
            };
        },
        watch: {
            modelValue(newValue, oldValue) {
                this.localTags = newValue;
            },
            localTags(newValue, oldValue) {
                this.$emit('onTagsChanged', newValue);
            }
        },
        methods: {
            addTag(newTag) {
                if(this.localTags.map((tag) => tag.text).includes(newTag.text)) {

                    //  Tag has already been selected

                }else{

                    this.localTags.push(newTag);
                    this.$emit('onTagsChanged', this.localTags);

                }
            }
        }
    };
</script>

<style lang="css">

    /* Default styles for .v3ti */
    .v3ti {
        width: 100% !important;
        border: none !important;
        outline-style: solid !important;
        outline-color: #d1d5db !important;
        outline-width: 1px !important;
        font-size: 0.875rem !important;
        line-height: 1.25rem !important;
        box-shadow: 0px 0px 2px #444 !important;
    }

    /* Focus styles for .v3ti when focused */
    .v3ti--focus {
        outline-color: #1a56db !important;
        outline-width: 2px !important;
    }

    .v3ti ::placeholder {
        color: #9ca3af !important;
        opacity: 1; /* Firefox */
    }

    .v3ti ::-ms-input-placeholder { /* Edge 12 -18 */
        color: #9ca3af !important;
    }

    .v3ti .v3ti-tag {
        background: #1b64f2 !important;
    }

</style>
