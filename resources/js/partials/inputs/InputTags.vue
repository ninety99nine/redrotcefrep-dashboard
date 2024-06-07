<template>
    <!--
        Component Referece: https://vue3-tags-input.netlify.app/documents
     -->
    <div>

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <div class="mt-2">

            <div class="flex">
                <!-- Input Tags Field -->
                <vue3-tags-input :id="uniqueId" :name="uniqueId" :required="_required" :placeholder="_placeholder" :tags="localTags" @on-tags-changed="newTags => localTags = newTags" />

                <!-- More Info Popover -->
                <MoreInfoPopover v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-2"></MoreInfoPopover>
            </div>

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>

        </div>

    </div>

</template>

<script>

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
            label: {
                type: String,
                default: 'Label'
            },
            labelPopoverTitle: {
                type: String
            },
            labelPopoverDescription: {
                type: String
            },
            _placeholder: {
                type: String,
                default: 'Separate with comma , or press Enter ⏎'
            },
            _required: {
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
