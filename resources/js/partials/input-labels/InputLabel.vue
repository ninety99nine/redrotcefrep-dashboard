<template>

    <div class="flex items-center space-x-1">

        <!-- Label -->
        <label :for="_for" class="block text-sm font-medium leading-6 text-gray-900">
            <slot></slot>
        </label>

        <!-- More Info Popover -->
        <MoreInfoPopover v-if="labelPopoverTitle || labelPopoverDescription" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top"></MoreInfoPopover>

   </div>

</template>

<script>

    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';

    export default {
        props: {
            _for: {
                type: String,
                required: true,
                validator: validateId   // Custom validator function to validate id format
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

    function validateId(id) {
        // Simple validation to check if the id starts with a letter or underscore
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(id);
    }
</script>
