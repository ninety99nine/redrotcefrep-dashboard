<template>

    <div class="flex items-center space-x-1">

        <!-- Label -->
        <label
            :for="_for"
            class="block text-sm font-medium leading-6 text-gray-900">
            <slot></slot>
            <span v-if="secondaryLabel" class="font-normal text-gray-400 ml-1">{{ secondaryLabel }}</span>
        </label>

        <!-- More Info Popover -->
        <MoreInfoPopover v-if="labelPopoverTitle || labelPopoverDescription" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top"></MoreInfoPopover>

        <!-- Asterisk -->
        <span v-if="showAsterisk" class="text-red-500">*</span>

   </div>

</template>

<script>

    import capitalize from '@Directives/capitalize.js';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';

    export default {
        directives: { capitalize },
        props: {
            _for: {
                type: [String, null],
                default: null
            },
            showAsterisk: {
                type: Boolean,
                default: false
            },
            secondaryLabel: {
                type: [String, null],
                default: null
            },
            labelPopoverTitle: {
                type: String
            },
            labelPopoverDescription: {
                type: String
            }
        },
        components: { MoreInfoPopover }
    };
</script>
